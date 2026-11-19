import type { ReactNode } from 'react';
import { HeroSunReflection } from './art/lotus-sunrise';

/**
 * A huge saffron sun disc rising out of a horizon. The bottom of the disc is hidden below the
 * horizon line; whatever is passed as children (an oversized price, for example) is set inside
 * the visible part. Text inside always uses the fixed `--sun-ink` so it stays readable on
 * saffron in both colour schemes.
 */
export function RisingSun({
  children,
  className = 'w-[min(88vw,38rem)]',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      {/* Disc and halos, clipped vertically at the horizon but free to spill sideways */}
      <div className="relative aspect-[1/0.74] [clip-path:inset(-60rem_-60rem_0_-60rem)]">
        <div aria-hidden="true" className="pointer-events-none absolute top-[4%] left-1/2 aspect-square w-[150%] -translate-x-1/2 -translate-y-[21.33%]">
          <span className="hero-halo-ring hero-halo-ring-3 absolute inset-0 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--saffron)_34%,transparent)_48%,transparent_70%)]" />
          <span className="hero-halo-ring hero-halo-ring-2 absolute inset-[10%] rounded-full border-[1.5px] border-sun-ink/15 bg-saffron/25" />
          <span className="hero-halo-ring absolute inset-[18%] rounded-full border-[1.5px] border-dashed border-sun-ink/30" />
        </div>
        <div className="hero-sun-rise absolute top-[4%] left-1/2 flex aspect-square w-[86%] -translate-x-1/2 flex-col items-center rounded-full border-[1.5px] border-sun-ink bg-saffron pt-[17%] text-center text-sun-ink">
          {children}
        </div>
      </div>
      <div className="horizon-line relative" />
      <HeroSunReflection className="mx-auto mt-2 block w-[70%]" />
    </div>
  );
}
