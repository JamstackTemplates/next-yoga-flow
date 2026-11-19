import type { CSSProperties, ReactNode } from 'react';
import { business } from '../content/business';
import { classStyles } from '../content/classes';
import { formatUsd, introOffer } from '../content/pricing';
import { teachers } from '../content/teachers';
import { asset } from '../lib/paths';
import { ClassGlyph, IntensityPetals } from './art/class-glyphs';
import { PergolaHorizon, PetalRow, RippleRings, Strata } from './art/dividers';
import { TeacherMedallion } from './art/teacher-medallions';
import { NextClassChip } from './next-class-chip';
import { OpenBadge } from './open-badge';
import { RisingSun } from './rising-sun';
import { SiteLink } from './site-link';
import { TimeZoneNote } from './time-zone-note';

type ChildrenProps = { children: ReactNode };

function HeroRoot({ children }: ChildrenProps) {
  const artwork = {
    '--hero-light': `url("${asset('/yoga-light.webp')}")`,
    '--hero-dark': `url("${asset('/yoga-dark.webp')}")`,
  } as CSSProperties;

  return (
    <section
      aria-labelledby="home-hero-heading"
      className="relative isolate overflow-hidden bg-(--hero-backdrop) lg:grid lg:min-h-[clamp(37rem,51vw,55rem)] lg:items-center print:bg-white print:text-black"
      style={artwork}
    >
      <div className="wrap-wide relative z-10 pt-10 pb-6 text-ink sm:pt-16 sm:pb-10 lg:py-20 print:text-black">
        <div className="max-w-[34rem] lg:max-w-[46%]">{children}</div>
      </div>
      <div
        aria-hidden="true"
        className="home-hero-art print-hide aspect-[2/1] lg:absolute lg:inset-0 lg:aspect-auto"
      />
    </section>
  );
}

function HeroHeading({ children }: ChildrenProps) {
  return (
    <h1 id="home-hero-heading" className="display-hero max-w-[11ch]">
      {children}
    </h1>
  );
}

function HeroIntroduction({ children }: ChildrenProps) {
  return (
    <p className="mt-6 max-w-[34rem] text-[1.06rem] leading-relaxed sm:text-[1.25rem]">{children}</p>
  );
}

function HeroActions({ children }: ChildrenProps) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8">{children}</div>
  );
}

function HeroPrimary({ href, children }: { href: string; children: ReactNode }) {
  return (
    <SiteLink href={href} className="button button-lg">
      {children}
    </SiteLink>
  );
}

function HeroSecondary({ href, children }: { href: string; children: ReactNode }) {
  return (
    <SiteLink href={href} className="button button-quiet button-lg">
      {children}
    </SiteLink>
  );
}

function HeroFooter({ addressNote }: { addressNote: ReactNode }) {
  return (
    <div className="mt-7 max-w-[34rem] space-y-3 sm:mt-9">
      <NextClassChip variant="chip" />
      <p className="text-sm font-medium tracking-wide opacity-80">{addressNote}</p>
    </div>
  );
}

export const HomeHero = Object.assign(HeroRoot, {
  Heading: HeroHeading,
  Introduction: HeroIntroduction,
  Actions: HeroActions,
  Primary: HeroPrimary,
  Secondary: HeroSecondary,
  Footer: HeroFooter,
});

/* ==========================================================================
   Shared section heading: eyebrow on a short horizon, large Marcellus title, ripples behind
   ========================================================================== */

function SectionTitle({
  id,
  eyebrow,
  heading,
  intro,
  link,
  align = 'between',
}: {
  id: string;
  eyebrow: ReactNode;
  heading: ReactNode;
  intro?: ReactNode;
  link?: ReactNode;
  align?: 'between' | 'start';
}) {
  return (
    <div
      className={`flex flex-wrap items-end gap-x-10 gap-y-5 ${align === 'between' ? 'justify-between' : ''}`}
    >
      <div className="ripple-behind max-w-3xl">
        <p className="eyebrow eyebrow-horizon">{eyebrow}</p>
        <h2 id={id} className="display-xl mt-4 text-ink">
          {heading}
        </h2>
        {intro ? <p className="mt-5 max-w-xl text-[1.08rem] leading-relaxed text-muted">{intro}</p> : null}
      </div>
      {link}
    </div>
  );
}

/* ==========================================================================
   3. Nine ways to slow down — notched lily pads drifting on the pond
   ========================================================================== */

/** Desktop drift: left (% of the row), top and diameter, checked so no two pads touch. */
const PAD_DRIFT = [
  { x: '2%', y: '0rem', s: '18rem', notch: '28deg' },
  { x: '30%', y: '4.5rem', s: '15.5rem', notch: '200deg' },
  { x: '55%', y: '0rem', s: '17rem', notch: '320deg' },
  { x: '80%', y: '5rem', s: '15rem', notch: '110deg' },
  { x: '12%', y: '19.5rem', s: '16rem', notch: '250deg' },
  { x: '38%', y: '22rem', s: '18rem', notch: '40deg' },
  { x: '66%', y: '18rem', s: '15rem', notch: '160deg' },
  { x: '20%', y: '36rem', s: '16.5rem', notch: '300deg' },
  { x: '62%', y: '35rem', s: '17rem', notch: '70deg' },
] as const;

export function ClassLilyPads({
  eyebrow,
  heading,
  intro,
  allLinkLabel,
}: {
  eyebrow: ReactNode;
  heading: ReactNode;
  intro: ReactNode;
  allLinkLabel: ReactNode;
}) {
  return (
    <>
    <Strata from="var(--day-sunrise)" to="var(--day-pond-1)" variant={2} />
    <section aria-labelledby="classes-pond-heading" className="paper-band sky-pond relative overflow-hidden pt-10 pb-20 sm:pt-14 sm:pb-28">
      {/* Fine ripple lines across the whole pond */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'repeating-linear-gradient(179deg, transparent 0 41px, color-mix(in srgb, var(--water-glint) 45%, transparent) 41px 42.5px), repeating-linear-gradient(181.4deg, transparent 0 67px, color-mix(in srgb, var(--water-glint) 30%, transparent) 67px 68.5px)',
          maskImage: 'linear-gradient(180deg, transparent, #000 18%, #000 85%, transparent)',
        }}
      />
      <div className="wrap relative">
        <SectionTitle
          id="classes-pond-heading"
          eyebrow={eyebrow}
          heading={heading}
          intro={intro}
          link={
            <SiteLink href="/classes/" className="text-link text-base font-medium">
              {allLinkLabel}
            </SiteLink>
          }
        />

        <ul className="relative mt-14 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-8 sm:gap-y-10 xl:mt-20 xl:block xl:h-[53rem]">
          {classStyles.map((cls, index) => {
            const drift = PAD_DRIFT[index % PAD_DRIFT.length];
            return (
              <li
                key={cls.id}
                className={`lily-bob w-[min(17.5rem,80vw)] sm:w-64 xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--s) ${
                  index % 2 === 0 ? 'self-start' : 'self-end'
                } ${index > 0 ? '-mt-8 sm:mt-0' : ''}`}
                style={{ '--x': drift.x, '--y': drift.y, '--s': drift.s } as CSSProperties}
              >
                <SiteLink
                  href={`/classes/#${cls.id}`}
                  className="lily lily-pad-drift group w-full px-9 text-center text-ink no-underline hover:no-underline"
                  style={{ '--notch': drift.notch } as CSSProperties}
                >
                  <span aria-hidden="true" className="lily-leaf" />
                  <span className="flex flex-col items-center">
                    <span className="flex size-14 items-center justify-center rounded-full border-[1.5px] border-ink/30 bg-surface">
                      <ClassGlyph classId={cls.id} className="size-11" />
                    </span>
                    <span className="mt-2.5 font-display text-[1.6rem] leading-tight text-ink group-hover:text-accent-ink">
                      {cls.name}
                    </span>
                    <span className="mt-1.5 flex items-center gap-2.5 text-xs text-muted">
                      <IntensityPetals level={cls.intensity} />
                      <span className="tabular font-semibold">{cls.durationMinutes} min</span>
                    </span>
                    <span className="mt-2 max-w-[12rem] text-[0.83rem] leading-snug text-muted">{cls.summary}</span>
                  </span>
                </SiteLink>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
    </>
  );
}

/* ==========================================================================
   4. The Sunrise Fortnight — the sun at full height: an enormous disc holding "$45"
   ========================================================================== */

export function IntroOfferBand({
  eyebrow,
  heading,
  subline,
  ctaLabel,
  note,
}: {
  eyebrow: ReactNode;
  heading: ReactNode;
  subline: ReactNode;
  ctaLabel: ReactNode;
  note: ReactNode;
}) {
  return (
    <>
    <Strata from="var(--day-pond-2)" to="var(--day-sun-2)" />
    <section aria-labelledby="sunrise-fortnight-heading" className="paper-band sky-sun relative overflow-hidden pt-16 pb-14 sm:pt-24 sm:pb-20">
      <div className="wrap-wide grid items-center gap-x-10 gap-y-12 lg:grid-cols-12">
        <div className="flex justify-center lg:col-span-6 lg:justify-start">
          <RisingSun className="w-[min(90vw,40rem)]">
            <span className="text-[0.72rem] font-semibold tracking-[0.3em] uppercase sm:text-sm">
              Intro offer
            </span>
            <span className="tabular mt-1 font-display text-[clamp(6rem,17vw,12.5rem)] leading-[0.9] tracking-[-0.04em]">
              {formatUsd(introOffer.price)}
            </span>
            <span className="mt-2 text-xs font-semibold tracking-[0.24em] uppercase sm:text-sm">
              {introOffer.days} days · unlimited
            </span>
          </RisingSun>
        </div>

        <div className="lg:col-span-6">
          <p className="eyebrow eyebrow-horizon text-ink/75">{eyebrow}</p>
          <h2 id="sunrise-fortnight-heading" className="display-xl mt-4 text-ink">
            {heading}
          </h2>
          <p className="display-md mt-3 text-accent-ink">{subline}</p>

          <ul className="mt-8 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
            {introOffer.terms.map((term) => (
              <li key={term} className="flex items-start gap-3 text-[1.02rem] text-ink">
                <span
                  aria-hidden="true"
                  className="mt-1.5 inline-block size-3.5 shrink-0 rotate-45 rounded-[0.9rem_0.15rem_0.9rem_0.15rem] border-[1.5px] border-ink bg-lotus"
                />
                <span>{term}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3">
            <SiteLink href="/new-here/" className="button button-lg">
              {ctaLabel}
            </SiteLink>
            <p className="text-sm text-ink/75">{note}</p>
          </div>
        </div>
      </div>
    </section>
    <Strata from="var(--day-sun-1)" to="var(--day-midday)" variant={1} />
    </>
  );
}

/* ==========================================================================
   5. Your teachers — six medallions travelling the sun's path across the midday sky
   ========================================================================== */

/** Lift from the horizon for each medallion, tracing the arc drawn behind them. */
const ARC_OFFSETS = ['lg:translate-y-36', 'lg:translate-y-15', 'lg:translate-y-2', 'lg:translate-y-2', 'lg:translate-y-15', 'lg:translate-y-36'] as const;

export function TeachersArc({
  eyebrow,
  heading,
  intro,
  ctaLabel,
}: {
  eyebrow: ReactNode;
  heading: ReactNode;
  intro: ReactNode;
  ctaLabel: ReactNode;
}) {
  return (
    <section aria-labelledby="teachers-arc-heading" className="sky-midday relative overflow-hidden pt-20 pb-16 sm:pt-28">
      <div className="wrap">
        <SectionTitle
          id="teachers-arc-heading"
          eyebrow={eyebrow}
          heading={heading}
          intro={intro}
          link={
            <SiteLink href="/teachers/" className="text-link text-base font-medium">
              {ctaLabel}
            </SiteLink>
          }
        />

        <p className="mt-8 flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase text-muted lg:hidden">
          <span>Swipe to meet all six teachers</span>
          <span aria-hidden="true">→</span>
        </p>

        <div className="relative mt-5 lg:mt-16">
          {/* The sun's path, meeting the horizon at both ends */}
          <svg
            viewBox="0 0 1200 320"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 hidden h-80 w-full lg:block"
          >
            <path d="M0 300 Q600 -110 1200 300" stroke="var(--saffron)" strokeWidth="1.5" strokeDasharray="2 9" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            <path d="M0 312 Q600 -86 1200 312" stroke="var(--peach)" strokeWidth="1.5" opacity="0.55" vectorEffect="non-scaling-stroke" />
            <line x1="0" y1="319" x2="1200" y2="319" stroke="var(--horizon)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          </svg>

          <ul className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-6 lg:mx-0 lg:grid lg:grid-cols-6 lg:gap-4 lg:overflow-visible lg:px-0 lg:pb-0">
            {teachers.map((teacher, index) => (
              <li key={teacher.id} className={`w-48 shrink-0 snap-center lg:w-auto ${ARC_OFFSETS[index]}`}>
                <SiteLink
                  href={`/teachers/#${teacher.id}`}
                  className="group flex flex-col items-center text-center no-underline hover:no-underline"
                >
                  <TeacherMedallion
                    teacherId={teacher.id}
                    medallion={teacher.medallion}
                    name={teacher.name}
                    className="size-44 transition-transform duration-500 group-hover:-translate-y-2"
                  />
                  <span className="mt-4 font-display text-[1.45rem] leading-tight text-ink group-hover:text-accent-ink">
                    {teacher.name}
                  </span>
                  <span className="mt-1 text-[0.8rem] leading-snug text-muted">{teacher.role}</span>
                </SiteLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-16 lg:mt-48">
        <PetalRow />
      </div>
    </section>
  );
}

/* ==========================================================================
   6. Your first morning — a winding path from the studio door to the mat
   ========================================================================== */

export interface MorningStep {
  numeral: string;
  title: string;
  detail: string;
}

export function FirstMorningPath({
  eyebrow,
  heading,
  steps,
}: {
  eyebrow: ReactNode;
  heading: ReactNode;
  steps: readonly MorningStep[];
}) {
  return (
    <section aria-labelledby="first-morning-heading" className="sky-midday relative pt-12 pb-20 sm:pt-16 sm:pb-28">
      <div className="wrap">
        <SectionTitle id="first-morning-heading" eyebrow={eyebrow} heading={heading} align="start" />

        <div className="relative mt-14">
          <svg
            viewBox="0 0 1200 220"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-6 hidden h-56 w-full lg:block"
          >
            <path
              d="M40 80 C200 10 300 190 450 130 C600 70 680 200 850 120 C980 60 1080 120 1180 96"
              stroke="var(--accent-ink)"
              strokeWidth="1.75"
              strokeDasharray="3 9"
              strokeLinecap="round"
              opacity="0.6"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <ol className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {steps.map((step, index) => (
              <li key={step.numeral} className={`relative flex flex-col items-start ${index % 2 === 1 ? 'lg:mt-24' : ''}`}>
                <div className="relative flex size-40 items-center justify-center">
                  <RippleRings className="absolute inset-0 size-40" />
                  <span className="relative font-display text-[7.5rem] leading-none text-accent-ink">{step.numeral}</span>
                </div>
                <h3 className="mt-4 font-display text-[1.75rem] leading-tight text-ink">{step.title}</h3>
                <p className="mt-2.5 max-w-xs text-[0.95rem] leading-relaxed text-muted">{step.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   7. Find the studio — late afternoon at the Pergola, turning to dusk
   ========================================================================== */

export function VisitStudioBand({
  eyebrow,
  heading,
  landmarkNote,
  contactCta,
}: {
  eyebrow: ReactNode;
  heading: ReactNode;
  landmarkNote: ReactNode;
  contactCta: ReactNode;
}) {
  return (
    <section aria-labelledby="find-studio-heading" className="ends-dusk relative">
      <Strata from="var(--day-midday)" to="var(--day-dusk-1)" variant={1} />
      <div className="paper-band relative overflow-hidden pt-10 pb-20 sm:pt-14 sm:pb-28" style={{ background: 'linear-gradient(180deg, var(--day-dusk-1), var(--day-dusk-2))' }}>
        <div className="wrap grid items-center gap-x-10 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionTitle id="find-studio-heading" eyebrow={eyebrow} heading={heading} align="start" />
            <p className="display-md mt-6 text-ink">{business.address.formatted}</p>
            <p className="mt-2 text-[1.05rem] text-ink/80">{landmarkNote}</p>

            <ul className="mt-6 space-y-2.5 text-[0.98rem] text-ink">
              {business.gettingThere.map((note) => (
                <li key={note} className="flex items-start gap-3">
                  <span aria-hidden="true" className="mt-2 size-2 shrink-0 rounded-full bg-leaf" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-[2.2rem_3rem_2.4rem_2.8rem] bg-surface/80 p-6 ring-[1.5px] ring-line">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="eyebrow">Studio hours</h3>
                <span className="inline-flex items-center gap-2 rounded-full border border-line bg-band/70 px-3 py-1 text-xs font-medium text-ink">
                  <span className="size-2 rounded-full bg-saffron" aria-hidden="true" />
                  <OpenBadge hours={business.hours} />
                </span>
              </div>
              <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-8 gap-y-1.5 text-[0.98rem]">
                <dt className="font-medium text-ink">Monday – Friday</dt>
                <dd className="tabular text-muted">06:00 – 20:30</dd>
                <dt className="font-medium text-ink">Saturday</dt>
                <dd className="tabular text-muted">07:00 – 18:00</dd>
                <dt className="font-medium text-ink">Sunday</dt>
                <dd className="tabular text-muted">07:30 – 13:00</dd>
              </dl>
              <TimeZoneNote />
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="-mx-4 sm:mx-0 lg:-mr-24 xl:-mr-40">
              <PergolaHorizon className="h-auto w-full" />
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              <SiteLink href="/contact/" className="button button-lg">
                {contactCta}
              </SiteLink>
              <a href={`mailto:${business.email}`} className="text-link font-medium">
                {business.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

