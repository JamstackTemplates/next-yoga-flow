import type { ReactNode } from 'react';
import { classStyles, propsCatalog } from '../content/classes';
import { formatUsd, frontDeskRule, introOffer, passes } from '../content/pricing';
import { teachers } from '../content/teachers';
import { WEEKDAY_NAMES } from '../content/timetable';
import { classesForTeacher, sessionsForClass, teachersForClass } from '../lib/schedule';
import { ClassGlyph, IntensityPetals } from './art/class-glyphs';
import { PetalRow, RippleRings, Strata } from './art/dividers';
import { PropIcon } from './art/prop-icons';
import { TeacherMedallion } from './art/teacher-medallions';
import { RisingSun } from './rising-sun';
import { SiteLink } from './site-link';

/* ==========================================================================
   Classes page: Intensity Key, Zig-Zag Almanac, Stepping Stones
   ========================================================================== */

export function IntensityKeyBand({
  heading,
  descriptions,
}: {
  heading: ReactNode;
  descriptions: readonly [string, string, string];
}) {
  return (
    <section aria-labelledby="intensity-key-heading" className="border-b border-line bg-band/50 py-8">
      <div className="wrap">
        <h2 id="intensity-key-heading" className="eyebrow">
          {heading}
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {([1, 2, 3] as const).map((level, idx) => (
            <div
              key={level}
              className="flex items-start gap-3 rounded-2xl border border-line bg-surface/90 px-4 py-3.5"
            >
              <div className="mt-0.5 shrink-0">
                <IntensityPetals level={level} />
              </div>
              <p className="text-sm leading-snug text-muted">{descriptions[idx]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ClassAlmanac() {
  return (
    <section aria-label="Class styles almanac" className="wrap py-12 sm:py-16">
      <div className="space-y-14">
        {classStyles.map((cls, index) => {
          const sessions = sessionsForClass(cls.id);
          const leadingTeachers = teachersForClass(cls.id);
          const flipped = index % 2 === 1;

          return (
            <div key={cls.id}>
              <article
                id={cls.id}
                className="grid scroll-mt-24 items-center gap-8 lg:grid-cols-12"
              >
                {/* Enlarged glyph inside sun disc on alternating sides */}
                <div
                  className={`flex justify-center lg:col-span-4 ${
                    flipped ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="relative flex size-56 items-center justify-center rounded-full border-[1.5px] border-ink/60 bg-saffron/35 sm:size-72">
                    <RippleRings className="pointer-events-none absolute -inset-8 size-72 opacity-70 sm:size-88" />
                    <div className="relative z-10 flex size-36 items-center justify-center rounded-full border-[1.5px] border-ink bg-surface sm:size-48">
                      <ClassGlyph classId={cls.id} className="size-28 sm:size-36" />
                    </div>
                  </div>
                </div>

                {/* Text column */}
                <div
                  className={`lg:col-span-8 ${flipped ? 'lg:order-1' : 'lg:order-2'}`}
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <IntensityPetals level={cls.intensity} showLabel />
                    <span className="tabular rounded-full border border-line bg-surface px-3 py-0.5 text-xs font-medium text-muted">
                      Usually {cls.durationMinutes} min
                    </span>
                    {cls.beginnerFriendly ? (
                      <span className="rounded-full border border-line bg-band px-3 py-0.5 text-xs font-medium text-ink">
                        Beginner-friendly
                      </span>
                    ) : null}
                  </div>

                  <h2 className="display-lg mt-4 text-ink">{cls.name}</h2>
                  <p className="mt-4 max-w-2xl text-[1.1rem] leading-relaxed text-muted">
                    {cls.description}
                  </p>

                  {/* Good for chips & Prop icons */}
                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    <div>
                      <h3 className="eyebrow">Good for</h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {cls.goodFor.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-ink"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="eyebrow">Props we set out</h3>
                      <ul className="mt-2 flex flex-wrap gap-3">
                        {cls.props.map((propId) => (
                          <li
                            key={propId}
                            className="inline-flex items-center gap-1.5 text-xs text-muted"
                          >
                            <PropIcon propId={propId} className="size-6" />
                            <span>{propsCatalog[propId].label.replace(/^Cork & rubber |^Cotton |^Woven |^Unscented |^Folding yoga |^Cork /i, '')}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Derived timetable times & teachers */}
                  <div className="mt-6 grid gap-4 border-t border-line pt-4 text-sm sm:grid-cols-2">
                    <div>
                      <h3 className="eyebrow">On the timetable</h3>
                      <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 tabular text-ink">
                        {sessions.map((s) => (
                          <li key={s.id}>
                            <SiteLink href={`/timetable/#${s.day}`} className="text-link">
                              {WEEKDAY_NAMES[s.day].short} {s.start}
                            </SiteLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="eyebrow">Led by</h3>
                      <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                        {leadingTeachers.map((teacher) => (
                          <li key={teacher.id}>
                            <SiteLink href={`/teachers/#${teacher.id}`} className="text-link">
                              {teacher.name}
                            </SiteLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </article>

              {index < classStyles.length - 1 ? (
                <div className="mt-14">
                  <PetalRow />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export interface SteppingStone {
  prompt: string;
  classId: string;
  className: string;
  note: string;
}

export function WhichClassSteppingStones({
  eyebrow,
  heading,
  stones,
}: {
  eyebrow: ReactNode;
  heading: ReactNode;
  stones: readonly SteppingStone[];
}) {
  return (
    <section
      aria-labelledby="stepping-stones-heading"
      className="paper-band pond-surface-band border-y border-line py-14 sm:py-20"
    >
      <div className="wrap">
        <p className="eyebrow eyebrow-horizon">{eyebrow}</p>
        <h2 id="stepping-stones-heading" className="display-lg mt-4 text-ink">
          {heading}
        </h2>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {stones.map((stone, idx) => (
            <SiteLink
              key={stone.prompt}
              href={`/classes/#${stone.classId}`}
              className={`lily-pad-drift flex flex-col justify-between rounded-[2rem_2.6rem_2rem_2.4rem] border-[1.5px] border-line bg-surface p-5 no-underline hover:no-underline ${
                idx % 2 === 1 ? 'lg:translate-y-6' : ''
              }`}
            >
              <div>
                <p className="text-sm font-medium text-muted">{stone.prompt}</p>
                <p className="mt-2 font-display text-2xl text-accent-ink">{stone.className}</p>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted">{stone.note}</p>
            </SiteLink>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   Teachers page: Asymmetric Zig-Zag Entries + Founder's Quote Band
   ========================================================================== */

export function TeachersAlmanac() {
  return (
    <section aria-label="Studio teachers" className="wrap overflow-x-clip py-14 sm:py-20">
      <div className="space-y-16">
        {teachers.map((teacher, index) => {
          const ledClasses = classesForTeacher(teacher.id);
          const flipped = index % 2 === 1;

          return (
            <div key={teacher.id}>
              <article
                id={teacher.id}
                className="relative grid scroll-mt-24 items-center gap-8 lg:grid-cols-12"
              >
                {/* Medallion overlapping a soft horizon band */}
                <div
                  className={`relative flex justify-center lg:col-span-4 ${
                    flipped ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-[-50vw] top-[62%] h-[38%] border-t-[1.5px] border-(--horizon) bg-band/45"
                  />
                  <TeacherMedallion
                    teacherId={teacher.id}
                    medallion={teacher.medallion}
                    name={teacher.name}
                    className="relative z-10 size-60 sm:size-72"
                  />
                </div>

                {/* Bio, training, teaching since, favourite pose & derived "Leads" links */}
                <div className={`relative z-10 lg:col-span-8 ${flipped ? 'lg:order-1' : 'lg:order-2'}`}>
                  <p className="eyebrow">
                    {teacher.role} · Teaching since{' '}
                    <span className="tabular">{teacher.teachingSince}</span>
                  </p>
                  <h2 className="display-lg mt-4 text-ink">{teacher.name}</h2>
                  <p className="mt-4 max-w-2xl text-[1.1rem] leading-relaxed text-muted">
                    {teacher.bio}
                  </p>

                  <dl className="mt-5 grid gap-4 border-t border-line pt-4 text-sm sm:grid-cols-3">
                    <div>
                      <dt className="eyebrow">Training</dt>
                      <dd className="mt-1 text-ink">{teacher.training}</dd>
                    </div>
                    <div>
                      <dt className="eyebrow">Favourite pose</dt>
                      <dd className="mt-1 text-ink">{teacher.favouritePose}</dd>
                    </div>
                    <div>
                      <dt className="eyebrow">Leads</dt>
                      <dd className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
                        {ledClasses.map((cls) => (
                          <SiteLink key={cls.id} href={`/classes/#${cls.id}`} className="text-link">
                            {cls.name}
                          </SiteLink>
                        ))}
                      </dd>
                    </div>
                  </dl>
                </div>
              </article>

              {index < teachers.length - 1 ? (
                <div className="mt-14">
                  <PetalRow />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function FounderQuoteBand({
  quote,
  attribution,
}: {
  quote: ReactNode;
  attribution: ReactNode;
}) {
  return (
    <section
      aria-label="Founder quote"
      className="paper-band lilac-peach-band relative overflow-hidden py-20 sm:py-32"
    >
      <RippleRings className="pointer-events-none absolute top-1/2 left-1/2 size-[44rem] -translate-x-1/2 -translate-y-1/2 opacity-40" />
      <div className="wrap max-w-5xl text-center">
        <blockquote className="display-lg text-ink">
          “{quote}”
        </blockquote>
        <p className="mt-5 text-sm font-semibold tracking-[0.16em] uppercase text-muted">
          — {attribution}
        </p>
      </div>
    </section>
  );
}

/* ==========================================================================
   New here page: Sun Disc Hero, Unrolled Mat, Rising Pass Strata, Props, Native FAQ
   ========================================================================== */

export function NewHereHero({
  eyebrow,
  ctaLabel,
  secondaryLabel,
}: {
  eyebrow: ReactNode;
  ctaLabel: ReactNode;
  secondaryLabel: ReactNode;
}) {
  return (
    <>
    <header className="paper-band sky-sun relative overflow-hidden pt-14 pb-12 sm:pt-20 sm:pb-16">
      <div className="wrap-wide grid items-center gap-x-10 gap-y-10 lg:grid-cols-12">
        <div className="flex justify-center lg:order-2 lg:col-span-6 lg:justify-end">
          <RisingSun className="w-[min(90vw,40rem)]">
            <span className="text-[0.72rem] font-semibold tracking-[0.3em] uppercase sm:text-sm">
              {introOffer.name}
            </span>
            <span className="tabular mt-1 font-display text-[clamp(6rem,17vw,12.5rem)] leading-[0.9] tracking-[-0.04em]">
              {formatUsd(introOffer.price)}
            </span>
            <span className="mt-2 text-xs font-semibold tracking-[0.24em] uppercase sm:text-sm">
              {introOffer.days} days unlimited
            </span>
          </RisingSun>
        </div>

        <div className="lg:order-1 lg:col-span-6">
          <p className="eyebrow eyebrow-horizon text-ink/75">{eyebrow}</p>
          <h1 className="display-xl mt-4 text-ink">{introOffer.name}</h1>
          <p className="mt-5 max-w-xl text-[1.2rem] leading-relaxed text-ink/85">{introOffer.summary}</p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <SiteLink href="/contact/" className="button button-lg">
              {ctaLabel}
            </SiteLink>
            <SiteLink href="/timetable/" className="button button-quiet button-lg">
              {secondaryLabel}
            </SiteLink>
          </div>
        </div>
      </div>
    </header>
    <Strata from="var(--day-sun-1)" to="var(--bg)" line={false} variant={1} />
    </>
  );
}

export function UnrolledMatBand({
  heading,
  items,
}: {
  heading: ReactNode;
  items: readonly string[];
}) {
  return (
    <section aria-labelledby="whats-included-heading" className="wrap py-14 sm:py-18">
      <h2 id="whats-included-heading" className="display-lg text-ink">
        {heading}
      </h2>

      {/* Unrolled horizontal yoga mat graphic with inclusions printed along it */}
      <div className="mt-8 flex items-stretch">
        {/* Rolled mat end cap */}
        <div
          aria-hidden="true"
          className="hidden w-12 shrink-0 flex-col items-center justify-center rounded-l-full border-[1.5px] border-r-0 border-ink bg-lotus sm:flex"
        >
          <span className="size-6 rounded-full border-[1.5px] border-ink bg-band" />
        </div>

        {/* Unrolled mat body */}
        <ul className="grid flex-1 gap-4 rounded-[1.75rem] border-[1.5px] border-ink bg-band/80 p-6 sm:grid-cols-2 sm:rounded-l-none sm:rounded-r-[2rem] sm:p-8 lg:grid-cols-4">
          {items.map((item, idx) => (
            <li
              key={item}
              className="flex flex-col justify-between gap-3 border-b border-line pb-4 last:border-b-0 last:pb-0 sm:border-r sm:border-b-0 sm:pr-4 sm:pb-0 sm:last:border-r-0"
            >
              <span className="tabular font-display text-2xl text-accent-ink">0{idx + 1}</span>
              <p className="text-sm leading-relaxed text-ink">{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function PassesStrataBand({
  eyebrow,
  heading,
  intro,
}: {
  eyebrow: ReactNode;
  heading: ReactNode;
  intro: ReactNode;
}) {
  // Order passes rising from Community ($12) -> Drop-in ($26) -> Ten-class ($220) -> Monthly unlimited ($149)
  const order = ['community', 'drop-in', 'ten-class', 'monthly-unlimited'];
  const orderedPasses = [
    ...order.map((id) => passes.find((p) => p.id === id)).filter((p): p is (typeof passes)[number] => Boolean(p)),
    ...passes.filter((p) => !order.includes(p.id)),
  ];

  const strataBg = [
    'bg-lilac/30',
    'bg-peach/35',
    'bg-lotus/30',
    'bg-saffron/40',
  ];

  return (
    <section aria-labelledby="passes-heading" className="wrap py-10 sm:py-14">
      <div className="max-w-xl">
        <p className="eyebrow eyebrow-horizon">{eyebrow}</p>
        <h2 id="passes-heading" className="display-lg mt-4 text-ink">
          {heading}
        </h2>
        <p className="mt-2 text-muted">{intro}</p>
      </div>

      {/* Stacked rising horizon strata, one full-bleed band per pass */}
      <div className="relative left-1/2 mt-10 w-screen -translate-x-1/2">
        {orderedPasses.map((pass, idx) => (
          <div key={pass.id} className={`border-t-[1.5px] border-(--horizon) last:border-b-[1.5px] ${strataBg[idx % strataBg.length]}`}>
            <div className="wrap flex flex-wrap items-end justify-between gap-x-6 gap-y-2 py-7 sm:py-9">
              <div>
                <h3 className="display-md text-ink">{pass.name}</h3>
                <p className="mt-1.5 text-[0.98rem] text-muted">
                  {pass.detail}
                  {pass.validity ? ` · ${pass.validity}` : ''}
                </p>
              </div>
              <p className="tabular font-display text-[clamp(3.25rem,8vw,6.5rem)] leading-[0.85] tracking-[-0.03em] text-ink">
                {formatUsd(pass.price)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Mandatory front-desk copy rule */}
      <p className="mt-5 rounded-2xl border border-line bg-surface px-5 py-4 text-sm text-muted">
        {frontDeskRule}
      </p>
    </section>
  );
}

export function BringAndProvideBand({
  heading,
  bringHeading,
  bringItems,
  provideHeading,
}: {
  heading: ReactNode;
  bringHeading: ReactNode;
  bringItems: readonly string[];
  provideHeading: ReactNode;
}) {
  const allProps = Object.values(propsCatalog);

  return (
    <section aria-labelledby="bring-provide-heading" className="wrap py-12 sm:py-16">
      <h2 id="bring-provide-heading" className="display-lg text-ink">
        {heading}
      </h2>

      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        {/* What to bring */}
        <div className="petal-pad p-6 sm:p-8 lg:col-span-5">
          <h3 className="font-display text-2xl text-ink">{bringHeading}</h3>
          <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted">
            {bringItems.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-1.5 size-2.5 shrink-0 rotate-45 rounded-[0.6rem_0.1rem_0.6rem_0.1rem] bg-accent"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What we provide with all seven bespoke prop icons */}
        <div className="petal-pad p-6 sm:p-8 lg:col-span-7">
          <h3 className="font-display text-2xl text-ink">{provideHeading}</h3>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {allProps.map((prop) => (
              <li key={prop.id} className="flex items-start gap-3">
                <PropIcon propId={prop.id} className="mt-0.5 size-8 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-ink">{prop.label}</p>
                  <p className="text-xs text-muted">{prop.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export interface FaqEntry {
  question: string;
  answer: string;
}

/**
 * Native <details>/<summary> FAQ accordion (per modern-web-guidance `accordion` guide:
 * never place headings inside <summary>, keep petal marker right beside label text).
 */
export function NewHereFaq({
  eyebrow,
  heading,
  entries,
}: {
  eyebrow: ReactNode;
  heading: ReactNode;
  entries: readonly FaqEntry[];
}) {
  return (
    <section aria-labelledby="faq-heading" className="lotus-faq wrap max-w-4xl py-12 sm:py-16">
      <p className="eyebrow eyebrow-horizon">{eyebrow}</p>
      <h2 id="faq-heading" className="display-lg mt-4 text-ink">
        {heading}
      </h2>

      <div className="mt-8">
        {entries.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <div className="pt-3 pl-6 text-[0.98rem] leading-relaxed text-muted">
              <p>{item.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
