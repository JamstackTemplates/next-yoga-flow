import type { SVGProps } from 'react';

/**
 * The Sunrise Lotus mark: a five-petal lotus in front of a half sun inside a circle,
 * resting over two calm pond ripples. Recolours cleanly across light and dark themes.
 */
export function LotusSunMark({ className = 'size-11', ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <circle cx="32" cy="32" r="29.5" fill="var(--surface)" stroke="var(--art-ink)" strokeWidth="1.5" />
      {/* Half sun */}
      <path d="M13 37 A19 19 0 0 1 51 37 Z" fill="var(--saffron)" stroke="var(--art-ink)" strokeWidth="1.5" />
      {/* Horizon line */}
      <line x1="10" y1="37" x2="54" y2="37" stroke="var(--art-ink)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Outer petals */}
      <path
        d="M32 37 C23 36 15.5 30 14.5 23.5 C21.5 24 27.5 29.5 32 37 Z"
        fill="var(--peach)"
        stroke="var(--art-ink)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M32 37 C41 36 48.5 30 49.5 23.5 C42.5 24 36.5 29.5 32 37 Z"
        fill="var(--peach)"
        stroke="var(--art-ink)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Mid petals */}
      <path
        d="M32 37 C25 32 21 24 23.5 16.5 C28.5 20.5 31 28 32 37 Z"
        fill="var(--lotus)"
        stroke="var(--art-ink)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M32 37 C39 32 43 24 40.5 16.5 C35.5 20.5 33 28 32 37 Z"
        fill="var(--lotus)"
        stroke="var(--art-ink)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Center petal */}
      <path
        d="M32 37 C27 29.5 27.2 20 32 13 C36.8 20 37 29.5 32 37 Z"
        fill="var(--accent)"
        stroke="var(--art-ink)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Subtle petal vein */}
      <path d="M32 36 V20" stroke="var(--surface)" strokeWidth="1" strokeLinecap="round" opacity="0.65" />
      {/* Pond ripples */}
      <path d="M18 44 Q32 47 46 44" stroke="var(--leaf)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M23 50 Q32 52 41 50" stroke="var(--leaf)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
