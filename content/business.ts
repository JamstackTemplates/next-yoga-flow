import type { OpeningHours } from '../lib/hours.ts';

/**
 * Shared business details for Sunrise Lotus Yoga.
 * Used across pages, metadata, opening-hours badges, Google Maps and schema.org JSON-LD.
 * When renaming the studio, also update `site.config.json`'s `name`.
 */
export interface BusinessAddress {
  /** Street number and name. */
  street: string;
  /** City name. */
  city: string;
  /** Two-letter state or region code. */
  state: string;
  /** Postal or ZIP code. */
  postalCode: string;
  /** Two-letter ISO country code. */
  country: string;
  /** Single-line formatted address used for display and map links. */
  formatted: string;
  /** Nearby public landmark phrase shown in location copy. */
  landmark: string;
}

export interface Business {
  /** Public display name; keep in sync with site.config.json. */
  name: string;
  /** Short headline for the home page and fallback metadata. */
  tagline: string;
  /** Plain-text studio introduction. */
  introduction: string;
  /** Public meta description used for search and social previews. */
  metaDescription: string;
  /** Public enquiry email, always visible on Contact and in the footer. */
  email: string;
  /** Public telephone number. */
  phone: string;
  /** Studio street address and nearby landmark. */
  address: BusinessAddress;
  /** Arrival, parking, bike and transit details. */
  gettingThere: readonly string[];
  /** Seven same-day studio opening intervals; never crossing midnight. */
  hours: readonly OpeningHours[];
  /** Contact copy; the hosted Jamstacks form supports name, email and message only. */
  enquiries: {
    /** Contact page heading. */
    title: string;
    /** Enquiry guidance without implying a reservation or payment. */
    introduction: string;
    /** Prompt ideas for the visitor's message text. */
    usefulToInclude: readonly string[];
  };
}

export const business: Business = {
  name: 'Sunrise Lotus Yoga',
  tagline: 'Gentle yoga for the first light of the day.',
  introduction:
    'Slow classes by Lake Merritt, from 6:30 sunrise flow to Sunday yoga nidra. Mats, props and tea are on us; just bring yourself.',
  metaDescription:
    'Gentle yoga by Lake Merritt, Oakland: sunrise flow, yin, restorative and prenatal classes, a weekly timetable, kind teachers and a $45 intro fortnight.',
  email: 'hello@sunriselotus.yoga',
  phone: '(510) 555-0147',
  address: {
    street: '1420 Lakeshore Avenue',
    city: 'Oakland',
    state: 'CA',
    postalCode: '94606',
    country: 'US',
    formatted: '1420 Lakeshore Avenue, Oakland, CA 94606',
    landmark: 'a short walk from the Lake Merritt Pergola',
  },
  gettingThere: [
    'Street parking along Lakeshore Avenue right outside the studio.',
    'Covered bike rack beside the front door.',
    'About 15 minutes’ walk around the lake from 19th Street Oakland BART.',
  ],
  hours: [
    { day: 'Monday', opens: '06:00', closes: '20:30' },
    { day: 'Tuesday', opens: '06:00', closes: '20:30' },
    { day: 'Wednesday', opens: '06:00', closes: '20:30' },
    { day: 'Thursday', opens: '06:00', closes: '20:30' },
    { day: 'Friday', opens: '06:00', closes: '20:30' },
    { day: 'Saturday', opens: '07:00', closes: '18:00' },
    { day: 'Sunday', opens: '07:30', closes: '13:00' },
  ],
  enquiries: {
    title: 'Say hello before your first class',
    introduction:
      'Not sure where to start? Tell us a little about yourself and we’ll suggest a class. Sending a message doesn’t reserve a mat or buy a pass; we reply by email, usually the same day.',
    usefulToInclude: [
      'The class and day you’re thinking of',
      'How much yoga you’ve done before, if any',
      'Any injury, condition or pregnancy the teacher should know about',
      'The best time to reach you',
    ],
  },
};
