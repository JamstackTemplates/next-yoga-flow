import type { SVGProps } from 'react';

/**
 * Petal Row divider: seven small organic petals opening in sequence across a calm ripple line.
 * Animates open on scroll reveal when supported and motion is permitted.
 */
export function PetalRow({ className = 'w-full max-w-md mx-auto h-9', ...props }: SVGProps<SVGSVGElement>) {
  const petals = [
    { x: 56, scale: 0.65, rot: -26, fill: 'var(--lilac)' },
    { x: 96, scale: 0.78, rot: -16, fill: 'var(--peach)' },
    { x: 138, scale: 0.9, rot: -7, fill: 'var(--lotus)' },
    { x: 180, scale: 1.05, rot: 0, fill: 'var(--saffron)' },
    { x: 222, scale: 0.9, rot: 7, fill: 'var(--lotus)' },
    { x: 264, scale: 0.78, rot: 16, fill: 'var(--peach)' },
    { x: 304, scale: 0.65, rot: 26, fill: 'var(--lilac)' },
  ];

  return (
    <svg viewBox="0 0 360 36" fill="none" aria-hidden="true" className={className} {...props}>
      <path d="M10 26 Q180 30 350 26" stroke="var(--line)" strokeWidth="1.5" strokeLinecap="round" />
      {petals.map((p, i) => (
        <g key={i} transform={`translate(${p.x}, 25)`}>
          <g className="petal-row-petal">
            <g transform={`rotate(${p.rot}) scale(${p.scale})`}>
              <path
                d="M0 0 C-6 -6 -6 -16 0 -22 C6 -16 6 -6 0 0 Z"
                fill={p.fill}
                stroke="var(--art-ink)"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </g>
          </g>
        </g>
      ))}
    </svg>
  );
}

/**
 * Horizon Strata: three wavy stacked bands that gently start or end full-bleed sections.
 */
export function HorizonStrata({
  flip = false,
  className = 'w-full h-10 sm:h-14 block',
  ...props
}: SVGProps<SVGSVGElement> & { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 72"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
      className={className}
      style={flip ? { transform: 'scaleY(-1)' } : undefined}
      {...props}
    >
      <path d="M0 30 Q360 4 720 26 T1440 18 L1440 72 L0 72 Z" fill="var(--lilac)" opacity="0.24" />
      <path d="M0 44 Q420 24 840 42 T1440 34 L1440 72 L0 72 Z" fill="var(--peach)" opacity="0.28" />
      <path d="M0 56 Q360 44 740 58 T1440 50 L1440 72 L0 72 Z" fill="var(--band)" />
      <path d="M0 56 Q360 44 740 58 T1440 50" stroke="var(--line)" strokeWidth="1.5" />
    </svg>
  );
}

/**
 * Concentric ripple rings placed softly behind headings, numerals or contact pads.
 */
export function RippleRings({ className = 'w-44 h-44', ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 200" fill="none" aria-hidden="true" className={className} {...props}>
      <circle cx="100" cy="100" r="88" stroke="var(--line)" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.7" />
      <circle cx="100" cy="100" r="66" stroke="var(--peach)" strokeWidth="1.5" opacity="0.65" />
      <circle cx="100" cy="100" r="44" stroke="var(--lotus)" strokeWidth="1.5" opacity="0.55" />
      <circle cx="100" cy="100" r="24" fill="var(--saffron)" opacity="0.2" />
    </svg>
  );
}

/**
 * Pond-and-pergola vignette referencing the Lake Merritt Pergola for Home's "Find the studio".
 */
export function PondPergolaVignette({ className = 'w-full max-w-md h-auto', ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 420 300"
      fill="none"
      role="img"
      aria-label="Illustration of the Lake Merritt Pergola colonnade reflected in calm ripples beneath a sunrise sky."
      className={className}
      {...props}
    >
      {/* Background rounded arch frame */}
      <rect x="10" y="10" width="400" height="280" rx="44" fill="var(--surface)" stroke="var(--line)" strokeWidth="1.5" />

      {/* Concentric ripple rings in sky */}
      <circle cx="290" cy="130" r="96" stroke="var(--peach)" strokeWidth="1.2" opacity="0.45" />
      <circle cx="290" cy="130" r="66" stroke="var(--saffron)" strokeWidth="1.2" opacity="0.5" />

      {/* Sunrise horizon strata inside frame */}
      <clipPath id="pergola-clip">
        <rect x="18" y="18" width="384" height="264" rx="38" />
      </clipPath>
      <g clipPath="url(#pergola-clip)">
        <rect x="18" y="18" width="384" height="162" fill="var(--strata-2)" />
        <path d="M18 112 Q180 96 402 114 L402 180 L18 180 Z" fill="var(--strata-3)" />
        {/* Half sun */}
        <circle cx="290" cy="180" r="44" fill="var(--saffron)" stroke="var(--art-ink)" strokeWidth="1.5" />

        {/* Lake Merritt Pergola colonnade silhouette */}
        <g fill="var(--band)" stroke="var(--art-ink)" strokeWidth="1.5" strokeLinejoin="round">
          {/* Top beam */}
          <rect x="52" y="102" width="186" height="12" rx="3" />
          <rect x="44" y="96" width="202" height="7" rx="3" />
          {/* Columns */}
          {[68, 102, 136, 170, 204].map((x) => (
            <rect key={x} x={x} y="114" width="11" height="66" />
          ))}
          {/* Base balustrade */}
          <rect x="48" y="172" width="194" height="8" rx="2" />
        </g>

        {/* Foliage & lake water */}
        <path d="M18 180 C34 156 56 154 66 180 Z" fill="var(--leaf)" stroke="var(--art-ink)" strokeWidth="1.5" />
        <path d="M226 180 C240 158 262 162 272 180 Z" fill="var(--leaf)" stroke="var(--art-ink)" strokeWidth="1.5" />

        <rect x="18" y="180" width="384" height="102" fill="var(--pond-water)" />
        <line x1="18" y1="180" x2="402" y2="180" stroke="var(--art-ink)" strokeWidth="1.5" />

        {/* Sun & column ripples on the water */}
        <rect x="256" y="192" width="68" height="5" rx="2.5" fill="var(--saffron)" opacity="0.82" />
        <rect x="266" y="206" width="48" height="4.5" rx="2.25" fill="var(--peach)" opacity="0.78" />
        <rect x="276" y="220" width="28" height="4" rx="2" fill="var(--saffron)" opacity="0.6" />

        <g stroke="var(--pond-ripple)" strokeWidth="1.5" strokeLinecap="round">
          <path d="M62 204 Q138 200 218 205" />
          <path d="M84 224 Q148 220 202 225" />
          <path d="M116 248 Q206 243 324 250" />
        </g>

        {/* Small floating lotus pad */}
        <ellipse cx="110" cy="252" rx="26" ry="9" fill="var(--leaf)" stroke="var(--art-ink)" strokeWidth="1.5" />
        <path d="M110 250 C105 244 105 236 110 231 C115 236 115 244 110 250 Z" fill="var(--lotus)" stroke="var(--art-ink)" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

/**
 * Strata: the hand-over between two full-bleed sections. Three soft wavy bands blend the
 * colour above (`from`) into the colour below (`to`), finished with a 1.5px horizon line.
 * Pass CSS colours or tokens, for example `var(--day-sunrise)`.
 */
export function Strata({
  from,
  to,
  line = true,
  className = 'h-16 sm:h-24',
  variant = 0,
}: {
  from: string;
  to: string;
  line?: boolean;
  className?: string;
  variant?: 0 | 1 | 2;
}) {
  const waves = [
    ['M0 30 Q300 6 700 26 T1440 16', 'M0 54 Q420 32 860 52 T1440 44', 'M0 74 Q360 60 760 76 T1440 66'],
    ['M0 22 Q380 44 760 22 T1440 30', 'M0 50 Q340 30 720 50 T1440 42', 'M0 72 Q460 86 900 70 T1440 74'],
    ['M0 18 Q520 40 980 20 T1440 24', 'M0 46 Q300 62 680 44 T1440 52', 'M0 70 Q420 56 820 72 T1440 64'],
  ][variant];
  const close = ' L1440 96 L0 96 Z';
  return (
    <div aria-hidden="true" className={`relative -mb-px w-full ${className}`} style={{ background: from }}>
      <svg viewBox="0 0 1440 96" preserveAspectRatio="none" className="absolute inset-0 block h-full w-full">
        <path d={waves[0] + close} style={{ fill: `color-mix(in srgb, ${to} 34%, ${from})` }} />
        <path d={waves[1] + close} style={{ fill: `color-mix(in srgb, ${to} 68%, ${from})` }} />
        <path d={waves[2] + close} style={{ fill: to }} />
        {line ? (
          <path
            d={waves[2]}
            fill="none"
            stroke="var(--horizon)"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        ) : null}
      </svg>
    </div>
  );
}

/**
 * Lake Merritt Pergola on a wide late-afternoon horizon, unframed so it can bleed to the edge.
 */
export function PergolaHorizon({ className = 'w-full h-auto', ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 760 420"
      fill="none"
      role="img"
      aria-label="The Lake Merritt Pergola colonnade at the water's edge, with the afternoon sun lowering behind it and its reflection broken by ripples."
      className={className}
      {...props}
    >
      <defs>
        <linearGradient id="pergola-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--day-dusk-1)" stopOpacity="0" />
          <stop offset="100%" stopColor="var(--peach)" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <rect x="0" y="40" width="760" height="210" fill="url(#pergola-sky)" />
      {/* Lowering sun with halos */}
      <circle cx="560" cy="250" r="176" fill="var(--saffron)" opacity="0.12" />
      <circle cx="560" cy="250" r="128" fill="var(--peach)" opacity="0.3" />
      <circle cx="560" cy="250" r="88" fill="var(--saffron)" stroke="var(--art-ink)" strokeWidth="1.5" />
      {/* Far shore hills */}
      <path d="M0 250 L0 222 C90 206 170 214 260 226 C350 238 430 214 520 210 C610 206 690 222 760 230 L760 250 Z" fill="var(--hills)" opacity="0.55" />
      {/* Pergola colonnade */}
      <g fill="var(--surface)" stroke="var(--art-ink)" strokeWidth="1.5" strokeLinejoin="round">
        <rect x="96" y="128" width="356" height="12" rx="3" />
        <rect x="84" y="118" width="380" height="11" rx="4" />
        {[110, 152, 194, 236, 278, 320, 362, 404].map((x) => (
          <g key={x}>
            <rect x={x} y="140" width="16" height="102" />
            <rect x={x - 4} y="140" width="24" height="7" rx="2" />
            <rect x={x - 4} y="236" width="24" height="7" rx="2" />
          </g>
        ))}
        <rect x="88" y="242" width="372" height="8" rx="2" />
      </g>
      {/* Shore trees */}
      <path d="M0 250 C8 190 52 170 78 196 C96 176 132 196 124 250 Z" fill="var(--leaf)" stroke="var(--art-ink)" strokeWidth="1.5" />
      <path d="M470 250 C476 214 506 204 520 222 C534 210 556 226 548 250 Z" fill="var(--leaf)" stroke="var(--art-ink)" strokeWidth="1.5" />
      {/* Water */}
      <rect x="0" y="250" width="760" height="170" fill="var(--water-1)" />
      <line x1="0" y1="250" x2="760" y2="250" stroke="var(--horizon)" strokeWidth="1.5" />
      {/* Colonnade reflection */}
      <g opacity="0.22" fill="var(--art-ink)">
        {[110, 152, 194, 236, 278, 320, 362, 404].map((x, i) => (
          <rect key={x} x={x + (i % 2 ? 3 : -2)} y="256" width="14" height={58 - (i % 3) * 8} rx="7" />
        ))}
      </g>
      {/* Broken sun reflection */}
      <g className="reflection-glint">
        <rect x="486" y="262" width="148" height="7" rx="3.5" fill="var(--saffron)" />
        <rect x="502" y="280" width="116" height="6" rx="3" fill="var(--peach)" />
        <rect x="520" y="297" width="80" height="5" rx="2.5" fill="var(--saffron)" />
        <rect x="536" y="313" width="48" height="4.5" rx="2.25" fill="var(--peach)" />
        <rect x="548" y="328" width="24" height="4" rx="2" fill="var(--saffron)" />
      </g>
      <g stroke="var(--water-glint)" strokeWidth="1.5" strokeLinecap="round">
        <path d="M40 286 Q120 281 210 287" />
        <path d="M250 312 Q350 306 450 313" />
        <path d="M70 346 Q190 340 320 348" />
        <path d="M420 372 Q560 366 720 374" />
      </g>
      {/* A lone pad with a bud */}
      <g transform="translate(250 382)">
        <path d="M-46 4 C-46 -8 -20 -14 6 -13 C32 -12 48 -4 46 6 C44 16 20 21 -6 20 C-26 19 -40 13 -46 4 L-14 3 Z" fill="var(--leaf)" stroke="var(--art-ink)" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M2 -2 C-8 -10 -8 -24 0 -34 C8 -24 8 -10 2 -2 Z" fill="var(--lotus)" stroke="var(--art-ink)" strokeWidth="1.5" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
