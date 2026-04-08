export interface PixelConfig {
  metaPixelId: string | null;
  gtmId: string | null;
}

/**
 * Add pixel/GTM IDs per locale here.
 * This is the ONLY place you ever touch tracking config.
 * The layout reads this and injects scripts automatically for every lander.
 *
 * Example:
 *   en:    { metaPixelId: '1234567890', gtmId: 'GTM-XXXXXXX' },
 *   es:    { metaPixelId: '0987654321', gtmId: 'GTM-YYYYYYY' },
 *   'en-uk': { metaPixelId: '1111111111', gtmId: 'GTM-ZZZZZZZ' },
 */
const pixels: Record<string, PixelConfig> = {
  en: {
    metaPixelId: null, // Replace with your Meta Pixel ID e.g. '1234567890'
    gtmId: null,       // Replace with your GTM ID e.g. 'GTM-XXXXXXX'
  },
  es: {
    metaPixelId: null,
    gtmId: null,
  },
};

export function getPixelConfig(locale: string): PixelConfig {
  return pixels[locale] ?? pixels['en'];
}
