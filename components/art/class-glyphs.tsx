import type { SVGProps } from 'react';

/**
 * Nine bespoke 48px line-and-fill class glyphs, one per class style.
 * Shared craft: flat palette fills + 1.5px plum-ink outlines.
 */
export function ClassGlyph({
  classId,
  className = 'size-12',
  ...props
}: SVGProps<SVGSVGElement> & { classId: string }) {
  switch (classId) {
    case 'sunrise-flow':
      // Half sun with a rising arc
      return (
        <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={className} {...props}>
          <path d="M8 32 C12 18 36 18 40 32" stroke="var(--peach)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 4" />
          <path d="M13 33 A11 11 0 0 1 35 33 Z" fill="var(--saffron)" stroke="var(--art-ink)" strokeWidth="1.5" strokeLinejoin="round" />
          <line x1="7" y1="33" x2="41" y2="33" stroke="var(--art-ink)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M24 14 V9 M14 18 L11 14 M34 18 L37 14" stroke="var(--art-ink)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M16 38 Q24 41 32 38" stroke="var(--leaf)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'gentle-hatha':
      // Single calm standing figure
      return (
        <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={className} {...props}>
          <circle cx="24" cy="24" r="16" fill="var(--band)" opacity="0.7" />
          <circle cx="24" cy="11" r="4" fill="var(--peach)" stroke="var(--art-ink)" strokeWidth="1.5" />
          <path
            d="M24 16 C20 16 17 20 17 25 L16 31 M24 16 C28 16 31 20 31 25 L32 31 M20 28 L19 40 M28 28 L29 40"
            stroke="var(--art-ink)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M20 18 H28 L27 29 H21 Z" fill="var(--lotus)" stroke="var(--art-ink)" strokeWidth="1.5" strokeLinejoin="round" />
          <line x1="13" y1="40" x2="35" y2="40" stroke="var(--art-ink)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'slow-flow':
      // Wave line flowing through a glowing dot
      return (
        <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={className} {...props}>
          <path d="M6 27 C13 15 18 15 24 24 C30 33 35 33 42 21" stroke="var(--peach)" strokeWidth="6" strokeLinecap="round" opacity="0.55" />
          <path d="M6 27 C13 15 18 15 24 24 C30 33 35 33 42 21" stroke="var(--art-ink)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M10 35 C18 28 30 28 38 35" stroke="var(--leaf)" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="24" cy="24" r="5" fill="var(--saffron)" stroke="var(--art-ink)" strokeWidth="1.5" />
        </svg>
      );

    case 'yin':
      // Crescent moon resting on a bolster
      return (
        <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={className} {...props}>
          <path
            d="M27 10 C20 11 16 17 17 23 C18 28 24 31 30 29 C25 27 23 22 24 17 C24.5 14 26 12 27 10 Z"
            fill="var(--lilac)"
            stroke="var(--art-ink)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <rect x="9" y="30" width="30" height="10" rx="5" fill="var(--peach)" stroke="var(--art-ink)" strokeWidth="1.5" />
          <ellipse cx="14" cy="35" rx="3" ry="5" fill="var(--band)" stroke="var(--art-ink)" strokeWidth="1.5" />
          <circle cx="34" cy="14" r="1.4" fill="var(--saffron)" />
        </svg>
      );

    case 'restorative':
      // Bolster with a soft folded blanket
      return (
        <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={className} {...props}>
          <rect x="8" y="27" width="32" height="11" rx="5.5" fill="var(--lotus)" stroke="var(--art-ink)" strokeWidth="1.5" />
          <ellipse cx="35" cy="32.5" rx="3.2" ry="5.5" fill="var(--band)" stroke="var(--art-ink)" strokeWidth="1.5" />
          <path
            d="M12 27 V18 C12 15.8 13.8 14 16 14 H30 C32.2 14 34 15.8 34 18 V27 Z"
            fill="var(--lilac)"
            stroke="var(--art-ink)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <line x1="12" y1="20.5" x2="34" y2="20.5" stroke="var(--art-ink)" strokeWidth="1.5" />
        </svg>
      );

    case 'prenatal':
      // Curved seated silhouette holding belly gently
      return (
        <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={className} {...props}>
          <circle cx="24" cy="25" r="16" fill="var(--leaf)" opacity="0.22" />
          <circle cx="22" cy="12" r="4" fill="var(--peach)" stroke="var(--art-ink)" strokeWidth="1.5" />
          <path
            d="M19 17 C16 22 16 31 20 35 H31 C35 35 36 31 33 29 C32 23 28 18 23 17 Z"
            fill="var(--lotus)"
            stroke="var(--art-ink)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M13 38 C16 35 32 35 36 38" stroke="var(--art-ink)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M23 23 C26 24 28 27 27 30" stroke="var(--art-ink)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'chair-yoga':
      // Sturdy chair with seated figure
      return (
        <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={className} {...props}>
          <path d="M14 14 V38 M14 28 H32 V38 M32 28 L34 38" stroke="var(--art-ink)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="14" y="25" width="18" height="3.5" rx="1.5" fill="var(--peach)" stroke="var(--art-ink)" strokeWidth="1.5" />
          <circle cx="23" cy="12" r="3.6" fill="var(--saffron)" stroke="var(--art-ink)" strokeWidth="1.5" />
          <path d="M22 16 L21 25 H29 L33 35" stroke="var(--art-ink)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 19 L30 16" stroke="var(--art-ink)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'yoga-nidra':
      // Closed serene eye with tiny stars
      return (
        <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={className} {...props}>
          <circle cx="24" cy="24" r="16" fill="var(--lilac)" opacity="0.3" />
          <path d="M10 24 C15 31 33 31 38 24" stroke="var(--art-ink)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M15 28 L13 31 M21 30 L20 34 M27 30 L28 34 M33 28 L35 31" stroke="var(--art-ink)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M24 11 L25 14 L28 15 L25 16 L24 19 L23 16 L20 15 L23 14 Z" fill="var(--saffron)" stroke="var(--art-ink)" strokeWidth="1" />
          <circle cx="34" cy="16" r="1.5" fill="var(--saffron)" />
          <circle cx="14" cy="17" r="1.3" fill="var(--peach)" />
        </svg>
      );

    case 'breathwork':
    default:
      // Three rising breath curves
      return (
        <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={className} {...props}>
          <circle cx="24" cy="24" r="16" fill="var(--peach)" opacity="0.22" />
          <path d="M15 36 C12 29 18 25 15 17 C14 14 15 12 17 10" stroke="var(--art-ink)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M24 38 C21 30 27 25 24 16 C23 13 24 10 26 8" stroke="var(--accent-ink)" strokeWidth="1.75" strokeLinecap="round" />
          <path d="M33 36 C30 29 36 25 33 17 C32 14 33 12 35 10" stroke="var(--art-ink)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
  }
}

/**
 * Intensity petals: 1 to 3 filled lotus petals out of 3, with accessible description.
 */
export function IntensityPetals({
  level,
  showLabel = false,
}: {
  level: 1 | 2 | 3;
  showLabel?: boolean;
}) {
  const label =
    level === 1 ? '1 of 3 petals — very gentle' : level === 2 ? '2 of 3 petals — slow warmth' : '3 of 3 petals — steady flow';

  return (
    <span className="inline-flex items-center gap-1.5" aria-label={label} title={label}>
      <svg viewBox="0 0 46 18" className="h-4 w-11 shrink-0" fill="none" aria-hidden="true">
        {[1, 2, 3].map((idx) => {
          const filled = idx <= level;
          const x = 8 + (idx - 1) * 15;
          return (
            <path
              key={idx}
              d={`M${x} 16 C${x - 5} 11 ${x - 5} 5 ${x} 2 C${x + 5} 5 ${x + 5} 11 ${x} 16 Z`}
              fill={filled ? 'var(--accent)' : 'transparent'}
              stroke="var(--art-ink)"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          );
        })}
      </svg>
      {showLabel ? (
        <span className="text-xs font-medium tracking-wide uppercase text-muted">
          {level === 1 ? 'Very gentle' : level === 2 ? 'Slow warmth' : 'Steady flow'}
        </span>
      ) : null}
    </span>
  );
}
