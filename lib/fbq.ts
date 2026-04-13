/**
 * Safe Meta Pixel event helper.
 * Calls window.fbq only if the pixel script has loaded.
 * Safe to call even if the pixel is not configured for this locale.
 */
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  eventName: string,
  params?: Record<string, unknown>,
) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    if (params) {
      window.fbq('track', eventName, params);
    } else {
      window.fbq('track', eventName);
    }
  }
}
