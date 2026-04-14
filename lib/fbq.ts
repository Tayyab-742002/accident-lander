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

export function trackEvent(
  eventName: string,
  params?:   Record<string, unknown>,
  eventId?:  string,
) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    // Build the options object — eventID is the deduplication key for CAPI
    const options = eventId ? { eventID: eventId } : undefined;

    if (params && options) {
      window.fbq('track', eventName, params, options);
    } else if (params) {
      window.fbq('track', eventName, params);
    } else if (options) {
      window.fbq('track', eventName, {}, options);
    } else {
      window.fbq('track', eventName);
    }
  }
}