export interface VariantConfig {
  sections: {
    hero: boolean;
    quiz: boolean;
    howItWorks: boolean;
    reviews: boolean;
    footer: boolean;
  };
}

/**
 * Control which sections appear on each locale/regional variant.
 * Add a new entry here when you need a region with different content rules.
 * The page component reads this — zero component changes needed.
 *
 * Example regional variant:
 *   'en-uk': {
 *     sections: {
 *       hero: true,
 *       quiz: true,
 *       howItWorks: true,
 *       reviews: false,   // removed per UK advertising standards
 *       footer: true,
 *     }
 *   }
 */
const variants: Record<string, VariantConfig> = {
  en: {
    sections: {
      hero: true,
      quiz: true,
      howItWorks: true,
      reviews: true,
      footer: true,
    },
  },
  es: {
    sections: {
      hero: true,
      quiz: true,
      howItWorks: true,
      reviews: true,
      footer: true,
    },
  },
};

export function getVariantConfig(locale: string): VariantConfig {
  return variants[locale] ?? variants['en'];
}
