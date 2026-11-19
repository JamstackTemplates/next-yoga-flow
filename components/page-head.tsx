import type { CSSProperties, ReactNode } from 'react';
import { PetalRow } from './art/dividers';
import { HeroHills, HeroSkyStrata, HeroStars, HeroSun, HeroSunReflection } from './art/lotus-sunrise';
import { FrontDeskStillLife } from './art/front-desk-still-life';
import { TeacherMedallion } from './art/teacher-medallions';

export type PageHeadMotif = 'petal-row' | 'sun-arc' | 'medallions' | 'sun-disc' | 'front-desk';

function RightMotif({ motif }: { motif: PageHeadMotif }) {
  switch (motif) {
    case 'petal-row':
      return (
        <div className="flex flex-col items-end gap-2">
          <PetalRow className="h-10 w-64" />
        </div>
      );

    case 'sun-arc':
      return (
        <svg viewBox="0 0 260 110" fill="none" aria-hidden="true" className="h-24 w-60 sm:w-64">
          <defs>
            <linearGradient id="pagehead-sunarc" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--sky-dawn)" />
              <stop offset="30%" stopColor="var(--sky-sunrise)" />
              <stop offset="60%" stopColor="var(--sky-midday)" />
              <stop offset="100%" stopColor="var(--sky-dusk)" />
            </linearGradient>
          </defs>
          <rect x="8" y="34" width="244" height="44" rx="22" fill="url(#pagehead-sunarc)" stroke="var(--art-ink)" strokeWidth="1.5" />
          <path d="M28 56 Q130 10 232 56" stroke="var(--art-ink)" strokeWidth="1.5" strokeDasharray="3 4" />
          <circle cx="130" cy="34" r="12" fill="var(--saffron)" stroke="var(--art-ink)" strokeWidth="1.5" />
          <rect x="44" y="50" width="38" height="16" rx="8" fill="var(--surface)" stroke="var(--art-ink)" strokeWidth="1.5" />
          <rect x="112" y="48" width="46" height="18" rx="9" fill="var(--surface)" stroke="var(--art-ink)" strokeWidth="1.5" />
          <rect x="180" y="50" width="44" height="16" rx="8" fill="var(--surface)" stroke="var(--art-ink)" strokeWidth="1.5" />
        </svg>
      );

    case 'medallions':
      return (
        <div className="flex items-center -space-x-6">
          <TeacherMedallion idPrefix="pagehead" teacherId="maya-okafor" medallion="saffron" className="size-20 sm:size-24" />
          <TeacherMedallion idPrefix="pagehead" teacherId="hana-sato" medallion="lilac" className="relative z-10 size-24 -translate-y-2 sm:size-28" />
          <TeacherMedallion idPrefix="pagehead" teacherId="elena-brooks" medallion="leaf" className="size-20 sm:size-24" />
        </div>
      );

    case 'sun-disc':
      return (
        <svg viewBox="0 0 180 140" fill="none" aria-hidden="true" className="h-28 w-36">
          <circle cx="90" cy="82" r="64" stroke="var(--peach)" strokeWidth="1.5" opacity="0.55" />
          <circle cx="90" cy="82" r="46" fill="var(--saffron)" stroke="var(--art-ink)" strokeWidth="1.5" />
          <line x1="16" y1="82" x2="164" y2="82" stroke="var(--art-ink)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M44 96 Q90 102 136 96" stroke="var(--lotus)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M62 108 Q90 112 118 108" stroke="var(--leaf)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'front-desk':
      return <FrontDeskStillLife className="w-64 sm:w-72" />;
  }
}

/** Where the sun stands for each page, so every head is a slightly different hour. */
const SUN_X: Record<PageHeadMotif, string> = {
  'sun-arc': '82%',
  'petal-row': '70%',
  medallions: '78%',
  'sun-disc': '64%',
  'front-desk': '86%',
};

/**
 * Inner-page header: a short horizon panorama. Sky strata and a half-risen sun sit above a
 * full-bleed horizon; the Marcellus title rests on that horizon with the page's own motif
 * beside it, and the introduction floats on the water below.
 */
export function PageHead({
  eyebrow,
  title,
  children,
  id,
  motif = 'petal-row',
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  id?: string;
  motif?: PageHeadMotif;
}) {
  return (
    <header
      className="paper-band relative isolate overflow-hidden [--sun-size:clamp(22rem,52vw,46rem)]"
      style={{ '--sun-x': SUN_X[motif] } as CSSProperties}
    >
      {/* Sky */}
      <div className="relative">
        <div aria-hidden="true" className="hero-sky absolute inset-0 overflow-hidden">
          <HeroSkyStrata />
          <HeroStars />
          <div className="absolute bottom-0 left-(--sun-x) w-(--sun-size) -translate-x-1/2 translate-y-1/2">
            <div className="hero-sun-sink">
              <HeroSun className="hero-sun-rise block h-auto w-full" />
            </div>
          </div>
          <HeroHills className="absolute inset-x-0 bottom-0 h-10 w-full sm:h-14" />
        </div>

        <div className="wrap-wide relative grid items-end gap-x-10 gap-y-8 pt-14 sm:pt-20 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="eyebrow eyebrow-horizon text-ink/75">{eyebrow}</p>
            <h1 id={id} className="display-xl mt-4 max-w-[14ch] text-ink">
              {title}
            </h1>
          </div>
          <div className="hidden justify-end md:col-span-4 md:flex">
            <RightMotif motif={motif} />
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="horizon-line" />

      {/* Water */}
      <div className="water relative">
        <HeroSunReflection
          className="hero-sun-sink-reflection absolute top-2 left-(--sun-x) w-[calc(var(--sun-size)*0.4)] -translate-x-1/2"
        />
        <div className="wrap-wide relative pt-7 pb-12 sm:pt-9 sm:pb-16">
          {children ? (
            <div className="max-w-[40rem] text-[1.1rem] leading-relaxed text-ink sm:text-[1.2rem]">{children}</div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
