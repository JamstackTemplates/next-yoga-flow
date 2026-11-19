import { business } from '../content/business';
import { Strata } from './art/dividers';
import { LotusSunMark } from './art/lotus-sun-mark';
import { OpenBadge } from './open-badge';
import { SiteLink } from './site-link';
import { TimeZoneNote } from './time-zone-note';

const FOOTER_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/timetable/', label: 'Timetable' },
  { href: '/classes/', label: 'Classes' },
  { href: '/teachers/', label: 'Teachers' },
  { href: '/new-here/', label: 'New here' },
  { href: '/contact/', label: 'Contact' },
] as const;

export function SiteFooter() {
  return (
    <footer className="relative text-pond-ink">
      {/* Shoreline: the band above settles into the evening pond */}
      <Strata from="var(--footer-from, var(--bg))" to="var(--pond)" line={false} className="h-20 sm:h-28" variant={2} />

      <div className="paper-band relative overflow-hidden bg-pond">
      {/* Evening stars over the water */}
      <svg viewBox="0 0 1440 200" preserveAspectRatio="xMidYMin slice" aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-48 w-full">
        <g fill="var(--pond-ink)">
          {[[120, 40, 1.4], [300, 90, 1.1], [520, 30, 1.6], [760, 70, 1.2], [930, 24, 1.5], [1100, 96, 1.1], [1260, 44, 1.7], [1380, 120, 1.2]].map(([x, y, r]) => (
            <circle key={x} cx={x} cy={y} r={r} opacity="0.6" />
          ))}
        </g>
      </svg>

      {/* The sun setting at the right edge, its last light broken on the water */}
      <svg
        viewBox="0 0 520 320"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 h-auto w-[17rem] sm:w-[24rem]"
      >
        <circle cx="400" cy="230" r="210" stroke="var(--pond-line)" strokeWidth="1.5" />
        <circle cx="400" cy="230" r="158" stroke="var(--lotus)" strokeWidth="1.5" opacity="0.35" />
        <circle cx="400" cy="230" r="112" fill="var(--saffron)" opacity="0.14" />
        <path d="M318 230 A82 82 0 0 1 482 230 Z" fill="var(--saffron)" opacity="0.8" />
        <line x1="120" y1="230" x2="520" y2="230" stroke="var(--pond-line)" strokeWidth="1.5" />
        <g opacity="0.6">
          <rect x="330" y="242" width="140" height="5" rx="2.5" fill="var(--saffron)" />
          <rect x="352" y="258" width="100" height="4.5" rx="2.25" fill="var(--peach)" />
          <rect x="374" y="273" width="58" height="4" rx="2" fill="var(--saffron)" />
          <rect x="390" y="287" width="26" height="3.5" rx="1.75" fill="var(--peach)" />
        </g>
      </svg>

      <div className="wrap relative py-14 sm:pt-10">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand & address */}
          <div className="md:col-span-5">
            <SiteLink href="/" className="inline-flex items-center gap-3 text-pond-ink no-underline hover:no-underline">
              <LotusSunMark className="size-11 shrink-0" />
              <span className="flex flex-col leading-none">
                <span className="font-display text-xl text-pond-ink">Sunrise Lotus</span>
                <span className="mt-1 text-[0.68rem] font-semibold tracking-[0.28em] uppercase text-pond-muted">
                  YOGA · LAKE MERRITT
                </span>
              </span>
            </SiteLink>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-pond-muted">
              {business.address.formatted} — {business.address.landmark}.
            </p>
            <div className="mt-4 flex flex-col gap-1.5 text-sm">
              <a className="w-fit text-pond-accent underline hover:text-pond-ink" href={`mailto:${business.email}`}>
                {business.email}
              </a>
              <a className="w-fit tabular text-pond-ink/90 hover:text-pond-accent" href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}>
                {business.phone}
              </a>
            </div>
          </div>

          {/* Studio hours & live OpenBadge */}
          <div className="md:col-span-4">
            <h2 className="font-sans text-xs font-semibold tracking-[0.18em] uppercase text-pond-muted">
              Studio hours
            </h2>
            <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-pond-line bg-pond/80 px-3.5 py-1.5 text-xs font-medium text-pond-ink">
              <span className="size-2 rounded-full bg-saffron" aria-hidden="true" />
              <OpenBadge hours={business.hours} />
            </p>
            <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-5 gap-y-1.5 text-sm text-pond-muted">
              <dt className="text-pond-ink">Mon – Fri</dt>
              <dd className="tabular">06:00 – 20:30</dd>
              <dt className="text-pond-ink">Saturday</dt>
              <dd className="tabular">07:00 – 18:00</dd>
              <dt className="text-pond-ink">Sunday</dt>
              <dd className="tabular">07:30 – 13:00</dd>
            </dl>
            <TimeZoneNote className="text-pond-muted" />
          </div>

          {/* Site navigation */}
          <nav aria-label="Footer" className="md:col-span-3">
            <h2 className="font-sans text-xs font-semibold tracking-[0.18em] uppercase text-pond-muted">
              Explore
            </h2>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm md:grid-cols-1">
              {FOOTER_LINKS.map((item) => (
                <li key={item.href}>
                  <SiteLink href={item.href} className="text-pond-ink/90 no-underline hover:text-pond-accent hover:underline">
                    {item.label}
                  </SiteLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="relative mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-pond-line pt-6 pb-36 text-xs text-pond-muted sm:pb-0 lg:mr-60 xl:mr-52">
          <p>{business.name} · Gentle classes by Lake Merritt, Oakland</p>
          <span title="Made with love by jamstacks.net">
            with <span role="img" aria-label="love">❤️</span>{' '}
            <a className="text-pond-accent no-underline hover:underline" href="https://jamstacks.net">
              jamstacks.net
            </a>
          </span>
        </div>
      </div>
      </div>
    </footer>
  );
}
