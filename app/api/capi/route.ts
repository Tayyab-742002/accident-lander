/**
 * Meta Conversions API — server-side event endpoint
 *
 * POST /api/capi
 * Body (JSON):
 *   {
 *     eventName: 'PageView' | 'SubmitApplication' | 'CompleteRegistration',
 *     eventId:   string,          // must match the browser fbq() call
 *     sourceUrl: string,          // window.location.href from the client
 *     userData?: {
 *       email?: string,           // will be SHA-256 hashed here
 *       phone?: string,           // will be SHA-256 hashed here
 *       firstName?: string,       // will be SHA-256 hashed here
 *       lastName?: string,        // will be SHA-256 hashed here
 *       ip?: string,              // sent as-is (not PII)
 *       userAgent?: string,       // sent as-is
 *       fbp?: string,             // _fbp cookie value (for matching)
 *       fbc?: string,             // _fbc cookie value (for matching)
 *     }
 *   }
 */

import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { log } from "@/lib/logger";

const PIXEL_ID = process.env.META_PIXEL_ID!;
const GRAPH_URL = `https://graph.facebook.com/v21.0/${PIXEL_ID}/events`;

/** SHA-256 hash a string and lowercase-trim it first (Meta's requirement). */
function hash(value: string): string {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

interface CAPIRequestBody {
  eventName: string;
  eventId: string;
  sourceUrl: string;
  userData?: {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    zipcode?: string;
    state?: string;
    city?: string;
    ip?: string;
    userAgent?: string;
    fbp?: string;
    fbc?: string;
  };
}

export async function POST(req: NextRequest) {
  const token = process.env.META_CAPI_TOKEN;
  if (!token) {
    log("warn", { type: "capi_skipped", reason: "META_CAPI_TOKEN not set" });
    return NextResponse.json({ skipped: true });
  }
  let body: CAPIRequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { eventName, eventId, sourceUrl, userData = {} } = body;

  const ALLOWED_EVENTS = [
    "PageView",
    "SubmitApplication",
    "CompleteRegistration",
    "Disqualified",
  ];
  if (!eventName || !eventId || !ALLOWED_EVENTS.includes(eventName)) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  // Build hashed user_data object — only include fields that were provided
  const user_data: Record<string, string> = {};

  if (userData.email) user_data.em = hash(userData.email);
  if (userData.phone) {
    // Strip all non-digits, then hash
    const digits = userData.phone.replace(/\D/g, "");
    if (digits.length >= 10) user_data.ph = hash(digits);
  }
  if (userData.firstName) user_data.fn = hash(userData.firstName);
  if (userData.lastName) user_data.ln = hash(userData.lastName);

  if (userData.zipcode) user_data.zp = hash(userData.zipcode);
  if (userData.city) user_data.ct = hash(userData.city);
  // Unhashed — Meta uses these for browser matching
  if (userData.ip) user_data.client_ip_address = userData.ip;
  if (userData.userAgent) user_data.client_user_agent = userData.userAgent;

  // fbp/fbc resolution order: client-provided → request cookie fallback.
  // The cookie layer catches edge cases where the client bundle failed
  // to capture (e.g. JS error during module init).
  const fbp = userData.fbp || req.cookies.get("_fbp")?.value;
  const fbc = userData.fbc || req.cookies.get("_fbc")?.value;
  if (fbp) user_data.fbp = fbp;
  if (fbc) user_data.fbc = fbc;

  if (userData.state) user_data.st = hash(userData.state); // lowercase auto-applied by hash()
  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        event_source_url: sourceUrl,
        action_source: "website",
        user_data,
      },
    ],
    // Uncomment to use test event tool in Events Manager:
    // test_event_code: 'TEST12345',
  };

  log("info", {
    type: "capi_request",
    eventName,
    eventId,
    sourceUrl,
    has_email: !!userData.email,
    has_phone: !!userData.phone,
    has_fbp: !!fbp,
    has_fbc: !!fbc,
    fbp_source: userData.fbp ? "client" : fbp ? "cookie" : "none",
    fbc_source: userData.fbc ? "client" : fbc ? "cookie" : "none",
    has_ip: !!userData.ip,
  });

  try {
    const res = await fetch(`${GRAPH_URL}?access_token=${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (!res.ok) {
      log("error", { type: "capi_meta_error", eventName, eventId, meta_error: data });
      return NextResponse.json({ error: data }, { status: 502 });
    }

    log("info", { type: "capi_success", eventName, eventId, events_received: data.events_received });
    return NextResponse.json({
      ok: true,
      events_received: data.events_received,
    });
  } catch (err) {
    log("error", { type: "capi_network_error", eventName, eventId, error: err instanceof Error ? err.message : String(err) });
    return NextResponse.json({ error: "Network error" }, { status: 502 });
  }
}
