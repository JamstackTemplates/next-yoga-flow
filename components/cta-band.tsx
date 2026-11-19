import type { ReactNode } from 'react';
import { Strata } from './art/dividers';
import { HeroSun, HeroSunReflection } from './art/lotus-sunrise';
import { SiteLink } from './site-link';

type ContentProps = { children: ReactNode };

/**
 * Closing call to action: a warm sky with the sun lifting off the horizon, then a strip of
 * water that the footer's evening pond picks up from.
 */
function Band({ children }: ContentProps) {
  return (
    <section className="ends-water relative mt-16 [--sun-x:82%] [--sun-size:clamp(24rem,46vw,40rem)]">
      <Strata from="var(--bg)" to="var(--day-sun-2)" />
      <div className="paper-band sky-sun relative overflow-hidden">
        <div aria-hidden="true" className="absolute bottom-0 left-(--sun-x) w-(--sun-size) -translate-x-1/2 translate-y-1/2">
          <HeroSun className="hero-sun-rise block h-auto w-full" />
        </div>
        <div className="wrap-wide relative flex flex-col items-start justify-between gap-8 pt-14 pb-12 md:flex-row md:items-end sm:pt-20 sm:pb-16">
          {children}
        </div>
      </div>
      <div aria-hidden="true" className="horizon-line" />
      <div aria-hidden="true" className="water relative h-20 overflow-hidden sm:h-28">
        <HeroSunReflection className="absolute top-2 left-(--sun-x) w-[calc(var(--sun-size)*0.42)] -translate-x-1/2" />
      </div>
    </section>
  );
}

function Copy({ children }: ContentProps) {
  return <div className="max-w-2xl space-y-4">{children}</div>;
}

function Heading({ children }: ContentProps) {
  return <h2 className="display-lg text-ink">{children}</h2>;
}

function Note({ children }: ContentProps) {
  return <p className="max-w-xl text-[1.08rem] leading-relaxed text-ink/80">{children}</p>;
}

function Actions({ children }: ContentProps) {
  return <div className="flex flex-wrap items-center gap-3">{children}</div>;
}

function Primary({ href, children }: { href: string; children: ReactNode }) {
  return (
    <SiteLink href={href} className="button button-lg">
      {children}
    </SiteLink>
  );
}

function Secondary({ href, children }: { href: string; children: ReactNode }) {
  return (
    <SiteLink href={href} className="button button-quiet button-lg">
      {children}
    </SiteLink>
  );
}

export const CtaBand = Object.assign(Band, { Copy, Heading, Note, Actions, Primary, Secondary });
