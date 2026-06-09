export interface StateOption {
  value: string;
  label: string;
}

export interface VariantConfig {
  sections: {
    advDisclosureBar: boolean; // Gold advertising material bar (CA SB 37)
    firmHeader: boolean;       // Law firm branding header
    hero: boolean;
    quiz: boolean;
    howItWorks: boolean;
    reviews: boolean;
    trustedIndicator: boolean; // "Trusted by" badge with logos of review sites
    footer: boolean;
  };
  footerFirmBlock: boolean;  // Attorney identification block in footer
  footerCcpaLink: boolean;   // "Do Not Sell My Info (CCPA)" link
  footerAttAdvLink: boolean; // "Attorney Advertising Disclosure" link
  stateOptions: StateOption[];
}

const ALL_STATES: StateOption[] = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'IL', label: 'Illinois' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'WA', label: 'Washington' },
  { value: 'NY', label: 'New York' },
];

const variants: Record<string, VariantConfig> = {
  en: {
    sections: {
      advDisclosureBar: false,
      firmHeader: false,
      hero: false,
      quiz: true,
      howItWorks: false,
      reviews: false,
      trustedIndicator: false,
      footer: false,
    },
    footerFirmBlock: false,
    footerCcpaLink: false,
    footerAttAdvLink: false,
    stateOptions: ALL_STATES,
  },
  ca: {
    sections: {
      advDisclosureBar: false,
      firmHeader: false,
      hero: false,
      quiz: true,
      howItWorks: false,
      reviews: false,
      trustedIndicator: false,
      footer: false,
    },
    footerFirmBlock: true,
    footerCcpaLink: true,
    footerAttAdvLink: true,
    stateOptions: [{ value: 'CA', label: 'California' }],
  },
};

export function getVariantConfig(locale: string): VariantConfig {
  return variants[locale] ?? variants['en'];
}
