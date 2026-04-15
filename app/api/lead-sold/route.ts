/**
 * LeadsProsper "Lead Sold" webhook → Meta CAPI Lead event
 *
 * LeadsProsper fires this when a lead is sold.
 * We forward a Lead event to Meta with the sale value for ROAS tracking.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';

const PIXEL_ID = process.env.META_PIXEL_ID!;
const GRAPH_URL = `https://graph.facebook.com/v21.0/${PIXEL_ID}/events`;

function hash(value: string): string {
  return createHash('sha256').update(value.trim().toLowerCase()).digest('hex');
}

interface LeadSoldBody {
  secret:   string;
  value:    string;   // e.g. "45.00"
  currency: string;   // "USD"
  email?:   string;
  phone?:   string;
  fullName?: string;
  city?:    string;
  state?:   string;
  zip?:     string;
  leadId?:  string;
  fbp?:     string;
  fbc?:     string;
  user_agent?: string;
}

export async function POST(req: NextRequest) {
  const token = process.env.META_CAPI_TOKEN;
  const WEBHOOK_SECRET = process.env.LEADSPROSPER_WEBHOOK_SECRET ?? '';
  if (!token) {
    console.warn('[lead-sold] META_CAPI_TOKEN not set. Skipping.');
    return NextResponse.json({ skipped: true });
  }

  let body: LeadSoldBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  // Verify the shared secret so random people can't hit this endpoint
  if (WEBHOOK_SECRET && body.secret !== WEBHOOK_SECRET) {
    console.warn('[lead-sold] Invalid secret.');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user_data: Record<string, string> = {};

  if (body.email)    user_data.em = hash(body.email);
  if (body.phone) {
    const digits = body.phone.replace(/\D/g, '');
    if (digits.length >= 10) user_data.ph = hash(digits);
  }
  if (body.fullName) {
    const [firstName, ...rest] = body.fullName.trim().split(' ');
    if (firstName)        user_data.fn = hash(firstName);
    if (rest.length > 0)  user_data.ln = hash(rest.join(' '));
  }
  if (body.city)  user_data.ct = hash(body.city);
  if (body.state) user_data.st = hash(body.state);
  if (body.zip)   user_data.zp = hash(body.zip);
  if (body.user_agent) user_data.client_user_agent = body.user_agent;
  if (body.fbp) user_data.fbp = body.fbp;
  if (body.fbc) user_data.fbc = body.fbc;

  // country — your leads are US-only
  user_data.country = hash('us');

  const saleValue = parseFloat(body.value);

  const payload = {
    data: [
      {
        event_name:       'Lead',
        event_time:       Math.floor(Date.now() / 1000),
        event_id:         `lead-sold-${body.leadId ?? Date.now()}`,
        event_source_url: 'https://casesettlementnow.com',
        action_source:    'website',
        user_data,
        custom_data: {
          value:    isNaN(saleValue) ? 0 : saleValue,
          currency: body.currency ?? 'USD',
        },
      },
    ],
  };

  try {
    const res = await fetch(`${GRAPH_URL}?access_token=${token}`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    });
    const data = await res.json();

    if (!res.ok) {
      console.error('[lead-sold] Meta API error:', data);
      return NextResponse.json({ error: data }, { status: 502 });
    }

    return NextResponse.json({ ok: true, events_received: data.events_received });
  } catch (err) {
    console.error('[lead-sold] Network error:', err);
    return NextResponse.json({ error: 'Network error' }, { status: 502 });
  }
}