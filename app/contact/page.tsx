import type { Metadata } from 'next';
import { RippleRings } from '../../components/art/dividers';
import { CopyEmail } from '../../components/copy-email';
import { GoogleMap } from '../../components/google-map';
import { JamstacksSupportForm } from '../../components/jamstacks-support-form';
import { OpenBadge } from '../../components/open-badge';
import { PageHead } from '../../components/page-head';
import { TimeZoneNote } from '../../components/time-zone-note';
import { business } from '../../content/business';
import { mapDirectionsUrl, mapSearchUrl } from '../../lib/maps';
import { absoluteUrl } from '../../lib/paths';
import { site } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: business.enquiries.introduction,
  alternates: { canonical: absoluteUrl('/contact/') },
};

export default function ContactPage() {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);

  return (
    <>
      <PageHead eyebrow="Contact & enquiries" title={business.enquiries.title} motif="front-desk">
        <p>{business.enquiries.introduction}</p>
      </PageHead>

      <div className="wrap py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Left: hosted enquiry form OR visible email fallback on a ripple-ringed surface pad */}
          <section aria-label="Enquiry form" className="relative lg:col-span-7">
            <RippleRings className="pointer-events-none absolute -top-10 -left-10 size-44 opacity-50" />
            <div className="petal-pad relative z-10 p-6 sm:p-9">
              {hosted ? (
                <>
                  <h2 className="font-display text-2xl text-ink">Send an enquiry</h2>
                  <p className="mt-2 mb-6 text-sm text-muted">
                    Ask about the Sunrise Fortnight, help choosing a first class, prenatal or
                    accessibility notes, or whether a mat can be held for your first visit. We’ll
                    reply by email to confirm what’s possible.
                  </p>
                  <JamstacksSupportForm
                    siteId={site.jamstacksSite}
                    embedUrl={site.jamstacksEmbedUrl}
                    email={business.email}
                  />
                </>
              ) : (
                <div>
                  <p className="eyebrow">Direct email enquiry</p>
                  <h2 className="mt-2 font-display text-3xl text-ink">Write to us directly</h2>
                  <p className="mt-3 text-muted">
                    Our online enquiry form is not connected right now, so please email us directly
                    at{' '}
                    <a className="text-link font-medium" href={`mailto:${business.email}`}>
                      {business.email}
                    </a>{' '}
                    or call{' '}
                    <a
                      className="text-link tabular font-medium"
                      href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}
                    >
                      {business.phone}
                    </a>
                    . We reply by email, usually the same day, to confirm what’s possible.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <a className="button" href={`mailto:${business.email}`}>
                      Email {business.email}
                    </a>
                    <CopyEmail email={business.email} />
                  </div>
                </div>
              )}

              <div className="mt-8 border-t border-line pt-6">
                <h3 className="eyebrow">Useful to include in your message</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted">
                  {business.enquiries.usefulToInclude.map((tip) => (
                    <li key={tip} className="flex items-start gap-2.5">
                      <span
                        aria-hidden="true"
                        className="mt-1.5 size-2 shrink-0 rotate-45 rounded-[0.5rem_0.1rem_0.5rem_0.1rem] bg-lotus"
                      />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Right: studio details panel */}
          <aside aria-label="Studio details" className="grid content-start gap-6 lg:col-span-5">
            <div className="rounded-[2rem] border-[1.5px] border-line bg-band/55 p-6 sm:p-7">
              <h2 className="font-display text-2xl text-ink">Studio details</h2>

              <dl className="mt-5 space-y-5 text-sm">
                <div>
                  <dt className="eyebrow">Email</dt>
                  <dd className="mt-1.5 flex flex-wrap items-center gap-3">
                    <a
                      className="text-link text-base font-medium wrap-anywhere"
                      href={`mailto:${business.email}`}
                    >
                      {business.email}
                    </a>
                    {hosted ? <CopyEmail email={business.email} /> : null}
                  </dd>
                </div>

                <div>
                  <dt className="eyebrow">Phone</dt>
                  <dd className="mt-1">
                    <a
                      className="text-link tabular text-base font-medium"
                      href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}
                    >
                      {business.phone}
                    </a>
                  </dd>
                </div>

                <div>
                  <dt className="eyebrow">Address</dt>
                  <dd className="mt-1 text-ink">
                    <p className="font-medium">{business.address.formatted}</p>
                    <p className="mt-0.5 text-muted">
                      Located {business.address.landmark}.
                    </p>
                    <div className="mt-2 flex flex-wrap gap-4 text-xs font-medium">
                      <a
                        href={mapDirectionsUrl(business.address.formatted)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-link"
                      >
                        Directions
                      </a>
                      <a
                        href={mapSearchUrl(business.address.formatted)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-link"
                      >
                        Open in Google Maps
                      </a>
                    </div>
                  </dd>
                </div>

                <div>
                  <dt className="eyebrow">Getting here</dt>
                  <dd className="mt-1.5">
                    <ul className="space-y-1.5 text-muted">
                      {business.gettingThere.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="rounded-[2rem] border-[1.5px] border-line bg-surface p-6 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-display text-2xl text-ink">Studio hours</h2>
                <span className="inline-flex items-center gap-2 rounded-full border border-line bg-band/70 px-3 py-1 text-xs font-medium text-ink">
                  <span className="size-2 rounded-full bg-saffron" aria-hidden="true" />
                  <OpenBadge hours={business.hours} />
                </span>
              </div>
              <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
                <dt className="font-medium text-ink">Monday – Friday</dt>
                <dd className="tabular text-muted">06:00 – 20:30</dd>
                <dt className="font-medium text-ink">Saturday</dt>
                <dd className="tabular text-muted">07:00 – 18:00</dd>
                <dt className="font-medium text-ink">Sunday</dt>
                <dd className="tabular text-muted">07:30 – 13:00</dd>
              </dl>
              <TimeZoneNote />
            </div>
          </aside>
        </div>

        {/* Full-width GoogleMap below */}
        <section aria-labelledby="studio-map-heading" className="mt-12">
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
            <h2 id="studio-map-heading" className="font-display text-2xl text-ink">
              By Lake Merritt &amp; the Pergola
            </h2>
            <p className="text-sm text-muted">{business.address.formatted}</p>
          </div>
          <div className="overflow-hidden rounded-[2rem] border-[1.5px] border-line bg-surface p-2">
            <GoogleMap
              address={business.address.formatted}
              title="Sunrise Lotus Yoga near the Lake Merritt Pergola"
            />
          </div>
        </section>
      </div>
    </>
  );
}
