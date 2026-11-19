/**
 * Studio intro offer and regular pass pricing.
 * All prices are in whole US dollars (`USD`). Changing `introOffer.price` updates Home,
 * `/new-here/` and the JSON-LD Offer automatically while keeping the OG image stable.
 */
export interface IntroOffer {
  /** Stable lowercase URL-safe identifier. */
  id: string;
  /** Public name of the introductory offer. */
  name: string;
  /** Whole-dollar USD price (must be below `monthly-unlimited`). */
  price: number;
  /** Duration of the introductory offer in calendar days. */
  days: number;
  /** One-sentence description shown on Home, New here and structured data. */
  summary: string;
  /** Short list of offer terms shown beside the price. */
  terms: readonly string[];
}

export interface PassOption {
  /** Stable lowercase URL-safe identifier. */
  id: string;
  /** Pass title. */
  name: string;
  /** Whole-dollar USD price. */
  price: number;
  /** Short explanation of what the pass covers. */
  detail: string;
  /** Optional expiry or billing period note. */
  validity?: string;
}

export const introOffer: IntroOffer = {
  id: 'sunrise-fortnight',
  name: 'Sunrise Fortnight',
  price: 45,
  days: 14,
  summary: 'Unlimited classes for 14 days from your first class.',
  terms: [
    'New students only, one per person.',
    'Starts the day of your first class.',
    'Mats, props and after-class tea included.',
    'Bought at the front desk before your first class.',
  ],
};

export const passes: readonly PassOption[] = [
  {
    id: 'drop-in',
    name: 'Drop-in class',
    price: 26,
    detail: 'Any one class',
    validity: 'Same day',
  },
  {
    id: 'ten-class',
    name: 'Ten-class pass',
    price: 220,
    detail: 'Shareable with one household member',
    validity: '6 months',
  },
  {
    id: 'monthly-unlimited',
    name: 'Monthly unlimited',
    price: 149,
    detail: 'Every class, every day we’re open',
    validity: '1 month, no lock-in',
  },
  {
    id: 'community',
    name: 'Community class',
    price: 12,
    detail: 'Sunday 8:00 Slow Flow only',
    validity: 'Same day',
  },
];

/** Policy statement required on New here so visitors know passes are bought in person. */
export const frontDeskRule =
  'Passes and the intro offer are bought at the studio’s front desk. This website takes enquiries only and does not sell or reserve anything.';

/** Format a whole-dollar USD amount consistently. */
export function formatUsd(amount: number): string {
  return `$${amount}`;
}
