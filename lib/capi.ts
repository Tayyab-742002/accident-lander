/**
 * lib/capi.ts
 *
 * Client-side helper for firing a server-side CAPI event.
 * Call this ALONGSIDE window.fbq() — never instead of it.
 *
 * Pass the same eventId to both fbq() and sendCAPIEvent()
 * so Meta can deduplicate the two signals.
 *
 * Usage:
 *   const id = generateEventId();
 *   trackEvent('CompleteRegistration', {}, id);
 *   await sendCAPIEvent('CompleteRegistration', id, { email, phone, firstName, lastName });
 */

/** Generate a simple unique ID for deduplication. */
export function generateEventId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

/** Read the _fbp and _fbc cookies (set by the Meta Pixel) for better match quality. */
function getFBCookies(): { fbp?: string; fbc?: string } {
  if (typeof document === 'undefined') return {};
  const cookies = Object.fromEntries(
    document.cookie.split('; ').map((c) => c.split('='))
  );
  return {
    fbp: cookies['_fbp'],
    fbc: cookies['_fbc'],
  };
}

export interface CAPIUserData {
  email?:     string;
  phone?:     string;
  firstName?: string;
  lastName?:  string;
  ip?:        string;   // pass result of getVisitorIp() from lib/leadpost.ts
}

/**
 * Fire a CAPI event from the browser → /api/capi → Meta Graph API.
 * This function is fire-and-forget — it never throws.
 */
export async function sendCAPIEvent(
  eventName: string,
  eventId:   string,
  userData:  CAPIUserData = {},
): Promise<void> {
  try {
    const { fbp, fbc } = getFBCookies();
    await fetch('/api/capi', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventName,
        eventId,
        sourceUrl: window.location.href,
        userData: {
          ...userData,
          userAgent: navigator.userAgent,
          fbp,
          fbc,
        },
      }),
    });
  } catch {
    // Silently ignore — CAPI is a best-effort enhancement.
    // The browser pixel already fired; this is redundant coverage.
  }
}