/**
 * lib/fbq.ts  (updated)
 *
 * Safe Meta Pixel event helper.
 * Calls window.fbq only if the pixel script has loaded.
 * Accepts an optional eventId for CAPI deduplication.
 *
 * DEDUPLICATION RULE:
 *   When you also fire a CAPI event for the same action, pass the
 *   SAME eventId to both trackEvent() and sendCAPIEvent().
 *   Meta matches them up and counts only one conversion.
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// Standard Meta events — must use 'track'. Everything else uses 'trackCustom'.
const STANDARD_META_EVENTS = new Set([
  "PageView", "ViewContent", "Search", "AddToCart", "AddToWishlist",
  "InitiateCheckout", "AddPaymentInfo", "Purchase", "Lead",
  "CompleteRegistration", "Contact", "CustomizeProduct", "Donate",
  "FindLocation", "Schedule", "StartTrial", "SubmitApplication", "Subscribe",
]);

export function trackEvent(
  eventName: string,
  params?:   Record<string, unknown>,
  eventId?:  string,
) {
  if (typeof window === 'undefined') return;

  const method = STANDARD_META_EVENTS.has(eventName) ? 'track' : 'trackCustom';
  const options = eventId ? { eventID: eventId } : undefined;

  // The Meta Pixel loads `afterInteractive`, so window.fbq may not exist yet
  // when an early event (e.g. SubmitApplication on the first quiz click) fires.
  // Without this wait the pixel event is silently dropped while CAPI still
  // sends — breaking deduplication. Retry until fbq is defined (~5s cap).
  let attempts = 0;
  const send = () => {
    if (typeof window.fbq === 'function') {
      if (params && options) {
        window.fbq(method, eventName, params, options);
      } else if (params) {
        window.fbq(method, eventName, params);
      } else if (options) {
        window.fbq(method, eventName, {}, options);
      } else {
        window.fbq(method, eventName);
      }
      return;
    }
    if (attempts++ < 50) {
      window.setTimeout(send, 100);
    }
  };
  send();
}