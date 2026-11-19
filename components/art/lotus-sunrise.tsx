/** Theme-aware sunrise layers for page headings and section illustrations. */

const INK = 'var(--art-ink)';

/** Five layered horizon bands, stretched to fill the sky. */
export function HeroSkyStrata({ className = 'absolute inset-0 h-full w-full' }: { className?: string }) {
  return (
    <svg viewBox="0 0 1600 600" preserveAspectRatio="none" aria-hidden="true" className={className}>
      <path d="M0 150 Q420 112 860 146 T1600 128 L1600 600 L0 600 Z" fill="var(--strata-2)" opacity="0.85" />
      <path d="M0 290 Q380 256 820 286 T1600 270 L1600 600 L0 600 Z" fill="var(--strata-3)" opacity="0.9" />
      <path d="M0 410 Q460 384 940 412 T1600 396 L1600 600 L0 600 Z" fill="var(--strata-4)" />
      <path d="M0 506 Q440 490 900 510 T1600 498 L1600 600 L0 600 Z" fill="var(--strata-5)" opacity="0.8" />
    </svg>
  );
}

/** Blue-hour stars, only visible in dark mode. */
export function HeroStars({ className = 'absolute inset-0 h-full w-full' }: { className?: string }) {
  const stars = [
    [90, 70, 1.6], [210, 150, 1.2], [330, 60, 2], [470, 120, 1.3], [610, 40, 1.7], [760, 110, 1.2],
    [880, 50, 1.9], [1010, 140, 1.4], [1130, 70, 1.6], [1270, 30, 1.2], [1390, 120, 2], [1520, 60, 1.4],
    [150, 230, 1.1], [560, 210, 1.2], [1210, 200, 1.1], [1460, 240, 1.3],
  ] as const;
  return (
    <svg
      viewBox="0 0 1600 600"
      preserveAspectRatio="xMidYMin slice"
      aria-hidden="true"
      className={`art-dark-only ${className}`}
    >
      <g fill="var(--pond-ink)">
        {stars.map(([x, y, r]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={r} opacity="0.85" />
        ))}
        <path d="M720 170 L723 179 L732 182 L723 185 L720 194 L717 185 L708 182 L717 179 Z" />
        <path d="M1340 160 L1342 166 L1348 168 L1342 170 L1340 176 L1338 170 L1332 168 L1338 166 Z" />
      </g>
    </svg>
  );
}

/**
 * The half-risen sun: a disc with three breathing halo rings. Centre it on the horizon;
 * the sky layer's overflow hides the lower half.
 */
export function HeroSun({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="-300 -300 600 600" aria-hidden="true" className={className}>
      <defs>
        <radialGradient id="hero-blue-hour-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--saffron)" stopOpacity="0.75" />
          <stop offset="45%" stopColor="var(--lotus)" stopOpacity="0.32" />
          <stop offset="100%" stopColor="var(--lilac)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle className="art-dark-only" r="300" fill="url(#hero-blue-hour-glow)" />
      <circle className="hero-halo-ring hero-halo-ring-3" r="292" fill="var(--saffron)" opacity="0.12" />
      <circle className="hero-halo-ring hero-halo-ring-2" r="224" fill="var(--peach)" opacity="0.26" />
      <circle className="hero-halo-ring" r="166" fill="var(--saffron)" opacity="0.36" />
      <circle r="118" fill="var(--saffron)" stroke={INK} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/** The Oakland hills as a soft far-shore silhouette, resting on the horizon. */
export function HeroHills({ className = 'absolute inset-x-0 bottom-0 h-[16%] min-h-12 w-full' }: { className?: string }) {
  return (
    <svg viewBox="0 0 1600 120" preserveAspectRatio="none" aria-hidden="true" className={className}>
      <path
        d="M0 120 L0 62 C120 36 250 18 400 40 C520 58 600 80 720 76 C880 70 980 20 1160 12 C1320 6 1460 40 1600 58 L1600 120 Z"
        fill="var(--hills)"
        opacity="0.55"
      />
      <path
        d="M0 120 L0 92 C200 64 400 90 620 84 C820 78 1010 56 1220 66 C1380 74 1500 86 1600 90 L1600 120 Z"
        fill="var(--hills)"
        opacity="0.9"
      />
    </svg>
  );
}

/** The sun's broken reflection: rounded bars narrowing as they move away from the horizon. */
export function HeroSunReflection({ className = '' }: { className?: string }) {
  const bars = [
    [0, 260, 'var(--saffron)', 0.9],
    [30, 214, 'var(--peach)', 0.85],
    [58, 170, 'var(--saffron)', 0.75],
    [84, 124, 'var(--peach)', 0.7],
    [108, 84, 'var(--saffron)', 0.6],
    [130, 50, 'var(--peach)', 0.5],
    [150, 24, 'var(--saffron)', 0.42],
  ] as const;
  return (
    <svg viewBox="-150 -6 300 170" aria-hidden="true" className={className}>
      <g className="reflection-glint">
        {bars.map(([y, w, fill, opacity], i) => (
          <rect
            key={y}
            x={-w / 2 + (i % 2 ? 6 : -4)}
            y={y}
            width={w}
            height={Math.max(4, 11 - i)}
            rx={Math.max(2, (11 - i) / 2)}
            fill={fill}
            opacity={opacity}
          />
        ))}
      </g>
    </svg>
  );
}
