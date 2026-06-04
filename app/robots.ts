import type { MetadataRoute } from 'next';

/**
 * Paid-ads lander — block all crawlers from the entire site.
 * Served at /robots.txt.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        disallow: '/',
      },
    ],
  };
}
