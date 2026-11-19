import { business } from '../content/business.ts';
import { introOffer } from '../content/pricing.ts';
import { absoluteUrl } from './paths.ts';

/**
 * Schema.org `ExerciseGym` structured data derived from studio content.
 * Updating `business` or `introOffer.price` automatically updates this payload.
 */
export function businessStructuredData() {
  const url = absoluteUrl('/');
  const offerUrl = absoluteUrl('/new-here/');
  const openingHoursSpecification = business.hours
    .filter((entry) => entry.opens && entry.closes)
    .map((entry) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: entry.day,
      opens: entry.opens,
      closes: entry.closes,
    }));

  return {
    '@context': 'https://schema.org',
    '@type': 'ExerciseGym',
    name: business.name,
    description: business.metaDescription,
    email: business.email,
    ...(business.phone ? { telephone: business.phone } : {}),
    ...(url ? { url } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.state,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    openingHoursSpecification,
    makesOffer: {
      '@type': 'Offer',
      name: introOffer.name,
      description: introOffer.summary,
      price: introOffer.price,
      priceCurrency: 'USD',
      ...(offerUrl ? { url: offerUrl } : {}),
    },
  };
}

/** Prevent content containing a closing script tag from escaping JSON-LD. */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
