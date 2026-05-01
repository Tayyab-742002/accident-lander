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

// Capture fbclid once at module load (page arrival time) so all events
// in the same session share the same fbc timestamp.
const _fbclidAtLanding = (() => {
  if (typeof window === "undefined") return null;
  const fbclid = new URLSearchParams(window.location.search).get("fbclid");
  if (!fbclid) return null;
  // Format: fb.1.{ms_timestamp}.{fbclid}  — Meta requires milliseconds
  return `fb.1.${Date.now()}.${fbclid}`;
})();

function getFBCookies(): { fbp?: string; fbc?: string } {
  if (typeof document === "undefined") return {};
  const cookies = Object.fromEntries(
    document.cookie.split("; ").map((c) => {
      const i = c.indexOf("=");
      return [c.slice(0, i), c.slice(i + 1)];
    }),
  );

  // Prefer URL-captured fbc (original case, correct timestamp).
  // Fall back to _fbc cookie only when user has no fbclid in current URL.
  const fbc = _fbclidAtLanding ?? cookies["_fbc"];

  return {
    fbp: cookies["_fbp"],
    fbc,
  };
}

export interface CAPIUserData {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  zipcode?: string;
  city?: string;
  state?:string;
  ip?: string; // pass result of getVisitorIp() from lib/leadpost.ts
}

/**
 * Fire a CAPI event from the browser → /api/capi → Meta Graph API.
 * This function is fire-and-forget — it never throws.
 */
export async function sendCAPIEvent(
  eventName: string,
  eventId: string,
  userData: CAPIUserData = {},
): Promise<void> {
  try {
    const { fbp, fbc } = getFBCookies();
    await fetch("/api/capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
