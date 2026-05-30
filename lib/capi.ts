/**
 * lib/capi.ts
 *
 * Client-side helper for firing a server-side CAPI event.
 * Call this ALONGSIDE window.fbq() — never instead of it.
 *
 * Pass the same eventId to both fbq() and sendCAPIEvent()
 * so Meta can deduplicate the two signals.
 *
 * ── fbp / fbc strategy ───────────────────────────────────────────
 *
 * fbp (Browser ID):
 *   - Prefer Meta Pixel's _fbp cookie when present.
 *   - Otherwise fall back to a localStorage-persisted copy from a
 *     previous visit.
 *   - As a last resort, self-generate a Meta-compatible value and
 *     write it to the _fbp cookie. Meta Pixel will reuse this cookie
 *     when fbevents.js eventually loads, so all signals match.
 *   - Result: 100% fbp coverage even when fbevents.js is blocked
 *     or hasn't finished loading.
 *
 * fbc (Click ID):
 *   - Capture fbclid from the URL on first paint and persist to
 *     localStorage so it survives refreshes/redirects within the
 *     session.
 *   - Fall back to the _fbc cookie set by fbevents.js when neither
 *     URL nor localStorage has a value.
 */

const FBP_STORAGE_KEY = "_lndr_fbp";
const FBC_STORAGE_KEY = "_lndr_fbc";
const COOKIE_DAYS = 90;

/** Simple unique ID for browser/CAPI event deduplication. */
export function generateEventId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function readCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}=([^;]*)`),
  );
  return match ? decodeURIComponent(match[1]) : undefined;
}

function writeCookie(name: string, value: string, days = COOKIE_DAYS): void {
  if (typeof document === "undefined") return;
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${maxAge}; path=/; SameSite=Lax`;
}

function readStorage(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* private browsing / quota — ignore */
  }
}

/** Meta-compatible fbp format: fb.{subdomain_idx}.{ms}.{random_10_digits} */
function generateFbp(): string {
  const random = Math.floor(Math.random() * 9_000_000_000) + 1_000_000_000;
  return `fb.1.${Date.now()}.${random}`;
}

/**
 * Module-load: capture fbc.
 * URL fbclid → localStorage backup (no fallback to _fbc cookie at module
 * load; we re-check the cookie at send-time inside getFbCookies()).
 */
const _initialFbc: string | null = (() => {
  if (typeof window === "undefined") return null;
  const fbclid = new URLSearchParams(window.location.search).get("fbclid");
  if (fbclid) {
    const fbc = `fb.1.${Date.now()}.${fbclid}`;
    writeStorage(FBC_STORAGE_KEY, fbc);
    return fbc;
  }
  return readStorage(FBC_STORAGE_KEY);
})();

/**
 * Module-load: capture/generate fbp.
 * Existing cookie → localStorage backup → self-generate.
 * Always writes back to both cookie and storage so subsequent reads
 * (and Meta Pixel itself) see the same value.
 */
const _initialFbp: string = (() => {
  if (typeof window === "undefined") return "";

  const cookieFbp = readCookie("_fbp");
  if (cookieFbp) {
    writeStorage(FBP_STORAGE_KEY, cookieFbp);
    return cookieFbp;
  }

  const storedFbp = readStorage(FBP_STORAGE_KEY);
  if (storedFbp) {
    writeCookie("_fbp", storedFbp);
    return storedFbp;
  }

  const newFbp = generateFbp();
  writeCookie("_fbp", newFbp);
  writeStorage(FBP_STORAGE_KEY, newFbp);
  return newFbp;
})();

/**
 * Read fbp/fbc at event-send time.
 * Re-reads the live _fbp cookie so we pick up any value Meta Pixel may
 * have set after module load (Meta normally reuses our cookie, but if
 * it ever overrides we want the latest).
 */
export function getFbCookies(): { fbp: string; fbc: string } {
  if (typeof window === "undefined") return { fbp: "", fbc: "" };
  const liveFbp = readCookie("_fbp") || _initialFbp;
  const liveFbc = _initialFbc ?? readCookie("_fbc") ?? "";
  return { fbp: liveFbp, fbc: liveFbc };
}

export interface CAPIUserData {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  zipcode?: string;
  city?: string;
  state?: string;
  ip?: string;
}

/**
 * Fire a CAPI event from the browser → /api/capi → Meta Graph API.
 * Fire-and-forget — never throws.
 */
export async function sendCAPIEvent(
  eventName: string,
  eventId: string,
  userData: CAPIUserData = {},
): Promise<void> {
  try {
    const { fbp, fbc } = getFbCookies();
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
          fbc: fbc || undefined,
        },
      }),
    });
  } catch {
    /* CAPI is best-effort; browser pixel already fired */
  }
}
