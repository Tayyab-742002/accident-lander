/**
 * LeadsProsper "Lead Sold" webhook → Meta CAPI Lead event
 *
 * LeadsProsper fires this when a lead is sold.
 * We forward a Lead event to Meta with the sale value for ROAS tracking.
 */

import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { log } from "@/lib/logger";

const PIXEL_ID = process.env.META_PIXEL_ID!;
const GRAPH_URL = `https://graph.facebook.com/v21.0/${PIXEL_ID}/events`;

function hash(value: string): string {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

interface LeadSoldBody {
  secret: string;
  value: string; // e.g. "45.00"
  currency: string; // "USD"
  email?: string;
  phone?: string;
  fullName?: string;
  city?: string;
  state?: string;
  zip?: string;
  leadId?: string;
  fbp?: string;
  fbc?: string;
  user_agent?: string;
  ip_address?: string;
}

async function parseLeadSoldBody(req: NextRequest): Promise<LeadSoldBody> {
  const contentType = req.headers.get("content-type")?.toLowerCase() ?? "";

  if (contentType.includes("application/json")) {
    return (await req.json()) as LeadSoldBody;
  }

  if (contentType.includes("application/x-www-form-urlencoded")) {
    const raw = await req.text();
    const params = new URLSearchParams(raw);
    return Object.fromEntries(params.entries()) as unknown as LeadSoldBody;
  }

  // Fallback: many webhook senders omit/incorrectly set content-type.
  const raw = await req.text();
  try {
    return JSON.parse(raw) as LeadSoldBody;
  } catch {
    const params = new URLSearchParams(raw);
    if ([...params.keys()].length > 0) {
      return Object.fromEntries(params.entries()) as unknown as LeadSoldBody;
    }
    throw new Error("Unsupported or invalid payload format");
  }
}

function getRequestIp(req: NextRequest): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? "";
  }

  return (
    req.headers.get("x-real-ip") ??
    req.headers.get("cf-connecting-ip") ??
    ""
  ).trim();
}

export async function POST(req: NextRequest) {
  // Log every incoming request immediately — before any validation —
  // so we can confirm in Axiom that LeadProsper is actually hitting us.
  log("info", {
    type: "lead_sold_received",
    contentType: req.headers.get("content-type") ?? null,
    userAgent: req.headers.get("user-agent") ?? null,
    ip: getRequestIp(req) || null,
  });

  const token = process.env.META_CAPI_TOKEN;
  const WEBHOOK_SECRET = process.env.LEADSPROSPER_WEBHOOK_SECRET ?? "";
  if (!token) {
    log("warn", { type: "lead_sold_skipped", reason: "META_CAPI_TOKEN not set" });
    return NextResponse.json({ skipped: true });
  }

  let body: LeadSoldBody;
  try {
    body = await parseLeadSoldBody(req);
  } catch (err) {
    log("error", {
      type: "lead_sold_invalid_body",
      error: err instanceof Error ? err.message : String(err),
    });
    return NextResponse.json(
      {
        error: "Invalid request body",
        details:
          err instanceof Error
            ? err.message
            : "Body must be valid JSON or x-www-form-urlencoded payload",
      },
      { status: 400 },
    );
  }

  // Verify the shared secret so random people can't hit this endpoint
  if (!body.secret) {
    log("warn", { type: "lead_sold_missing_secret", leadId: body.leadId ?? null });
    return NextResponse.json(
      { error: "Missing required field: secret" },
      { status: 400 },
    );
  }
  if (WEBHOOK_SECRET && body.secret !== WEBHOOK_SECRET) {
    log("warn", { type: "lead_sold_unauthorized", reason: "Invalid secret", leadId: body.leadId ?? null });
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!body.value) {
    log("warn", { type: "lead_sold_missing_value", leadId: body.leadId ?? null });
    return NextResponse.json(
      { error: "Missing required field: value" },
      { status: 400 },
    );
  }
  if (!body.currency) {
    log("warn", { type: "lead_sold_missing_currency", leadId: body.leadId ?? null });
    return NextResponse.json(
      { error: "Missing required field: currency" },
      { status: 400 },
    );
  }

  const user_data: Record<string, string> = {};
  const requestIp = getRequestIp(req);
  const clientIpAddress = body.ip_address?.trim() || requestIp;

  if (body.email) user_data.em = hash(body.email);
  if (body.phone) {
    const digits = body.phone.replace(/\D/g, "");
    if (digits.length >= 10) user_data.ph = hash(digits);
  }
  if (body.fullName) {
    const [firstName, ...rest] = body.fullName.trim().split(" ");
    if (firstName) user_data.fn = hash(firstName);
    if (rest.length > 0) user_data.ln = hash(rest.join(" "));
  }
  if (body.city) user_data.ct = hash(body.city);
  if (body.state) user_data.st = hash(body.state);
  if (body.zip) user_data.zp = hash(body.zip);
  if (body.user_agent) user_data.client_user_agent = body.user_agent;
  if (body.fbp) user_data.fbp = body.fbp;
  if (body.fbc) user_data.fbc = body.fbc;
  if (clientIpAddress) user_data.client_ip_address = clientIpAddress;

  // country — your leads are US-only
  user_data.country = hash("us");

  const saleValue = parseFloat(body.value);
  if (Number.isNaN(saleValue)) {
    log("warn", {
      type: "lead_sold_invalid_value",
      leadId: body.leadId ?? null,
      raw_value: body.value,
    });
    return NextResponse.json(
      {
        error: "Invalid value field",
        details: "value must be a numeric string, e.g. \"45.00\"",
      },
      { status: 400 },
    );
  }

  const payload = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: `lead-sold-${body.leadId ?? Date.now()}`,
        event_source_url: "https://casesettlementnow.com",
        action_source: "website",
        user_data,
        custom_data: {
          value: saleValue,
          currency: body.currency ?? "USD",
        },
      },
    ],
  };

  log("info", {
    type: "lead_sold_request",
    leadId: body.leadId ?? null,
    value: saleValue,
    currency: body.currency,
    state: body.state ?? null,
    has_email: !!body.email,
    has_phone: !!body.phone,
    has_fbp: !!body.fbp,
    has_fbc: !!body.fbc,
    has_ip: !!clientIpAddress,
  });

  try {
    const res = await fetch(`${GRAPH_URL}?access_token=${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (!res.ok) {
      log("error", { type: "lead_sold_meta_error", leadId: body.leadId ?? null, meta_error: data });
      return NextResponse.json({ error: data }, { status: 502 });
    }

    log("info", { type: "lead_sold_success", leadId: body.leadId ?? null, events_received: data.events_received });
    return NextResponse.json({
      ok: true,
      events_received: data.events_received,
    });
  } catch (err) {
    log("error", { type: "lead_sold_network_error", leadId: body.leadId ?? null, error: err instanceof Error ? err.message : String(err) });
    return NextResponse.json({ error: "Network error" }, { status: 502 });
  }
}
