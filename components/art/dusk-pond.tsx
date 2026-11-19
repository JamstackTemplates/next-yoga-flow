import type { SVGProps } from 'react';

/**
 * 404 illustration: "Dusk Pond".
 * The sun already set beneath layered twilight strata, a crescent moon reflected in calm ripples,
 * a single closed lotus bud on its pad, and an empty mat waiting on the wooden deck.
 */
export function DuskPond({ className = 'w-full h-auto', ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 960 360"
      fill="none"
      role="img"
      aria-label="Illustration of a quiet dusk pond: twilight horizon strata, a crescent moon reflected in ripples, a single closed lotus bud, and an empty yoga mat on a wooden deck."
      className={className}
      {...props}
    >
      {/* Dusk sky strata */}
      <rect x="0" y="0" width="960" height="186" fill="var(--strata-1)" />
      <path d="M0 58 Q260 40 520 58 T960 50 L960 186 L0 186 Z" fill="var(--strata-2)" />
      <path d="M0 112 Q280 96 560 114 T960 106 L960 186 L0 186 Z" fill="var(--strata-3)" />
      <path d="M0 156 Q280 146 560 158 T960 152 L960 186 L0 186 Z" fill="var(--strata-4)" />

      {/* Residual glow below the horizon */}
      <ellipse cx="480" cy="186" rx="220" ry="42" fill="var(--lotus)" opacity="0.26" />

      {/* Crescent moon & quiet evening stars */}
      <path
        d="M668 42 C652 46 644 61 649 76 C654 90 670 97 685 91 C672 87 664 74 665 60 C666 53 667 47 668 42 Z"
        fill="var(--saffron)"
        stroke="var(--art-ink)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <g fill="var(--art-ink)" opacity="0.55">
        <circle cx="172" cy="48" r="1.8" />
        <circle cx="294" cy="72" r="1.4" />
        <circle cx="430" cy="40" r="2" />
        <circle cx="548" cy="64" r="1.5" />
        <circle cx="776" cy="52" r="1.8" />
        <circle cx="842" cy="88" r="1.4" />
      </g>

      {/* Distant hills */}
      <path
        d="M0 186 L0 168 C130 150 260 156 390 170 C540 184 680 144 820 152 C884 156 926 164 960 168 L960 186 Z"
        fill="var(--hills)"
      />

      {/* Still pond water */}
      <rect x="0" y="186" width="960" height="174" fill="var(--pond-water)" />
      <line x1="0" y1="186" x2="960" y2="186" stroke="var(--art-ink)" strokeWidth="1.5" />

      {/* Moon's broken reflection in ripples */}
      <g fill="var(--saffron)" opacity="0.72">
        <rect x="636" y="202" width="52" height="5" rx="2.5" />
        <rect x="644" y="216" width="38" height="4.5" rx="2.25" opacity="0.82" />
        <rect x="650" y="230" width="26" height="4" rx="2" opacity="0.65" />
        <rect x="656" y="244" width="14" height="3.5" rx="1.75" opacity="0.5" />
      </g>

      {/* Horizontal pond ripples */}
      <g stroke="var(--pond-ripple)" strokeWidth="1.5" strokeLinecap="round" opacity="0.7">
        <path d="M120 218 Q220 214 328 220" />
        <path d="M412 246 Q518 242 618 248" />
        <path d="M726 232 Q812 228 896 234" />
        <path d="M460 302 Q580 296 712 304" />
      </g>

      {/* Single closed lotus bud on its pad */}
      <g transform="translate(566, 268)">
        <ellipse cx="0" cy="10" rx="68" ry="18" stroke="var(--art-ink)" strokeWidth="1.2" opacity="0.22" />
        <path
          d="M-46 6 C-48 -7 -22 -15 6 -14 C32 -13 49 -4 47 8 C45 19 20 24 -9 22 C-28 21 -42 15 -46 6 L-14 4 Z"
          fill="var(--leaf)"
          stroke="var(--art-ink)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <g transform="translate(4, -6)">
          <path d="M0 8 C-11 -2 -12 -18 -5 -28 C0 -19 0 -6 0 8 Z" fill="var(--lotus)" stroke="var(--art-ink)" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M0 8 C11 -2 12 -18 5 -28 C0 -19 0 -6 0 8 Z" fill="var(--lotus)" stroke="var(--art-ink)" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M0 8 C-5 -5 -5 -20 0 -32 C5 -20 5 -5 0 8 Z" fill="var(--peach)" stroke="var(--art-ink)" strokeWidth="1.5" strokeLinejoin="round" />
        </g>
      </g>

      {/* Wooden deck with an empty mat waiting */}
      <g>
        <path d="M0 294 L322 294 L360 338 L360 352 L0 352 Z" fill="var(--deck)" stroke="var(--art-ink)" strokeWidth="1.5" />
        <path d="M0 258 L294 258 L360 338 L0 338 Z" fill="var(--band)" stroke="var(--art-ink)" strokeWidth="1.5" />
        <line x1="0" y1="284" x2="314" y2="284" stroke="var(--art-ink)" strokeWidth="1.2" opacity="0.45" />
        <line x1="0" y1="312" x2="338" y2="312" stroke="var(--art-ink)" strokeWidth="1.2" opacity="0.45" />
        {/* Empty unrolled mat */}
        <path d="M64 274 L256 274 L292 318 L86 318 Z" fill="var(--lotus)" stroke="var(--art-ink)" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M78 282 L248 282" stroke="var(--surface)" strokeWidth="1.2" opacity="0.6" />
        <path d="M96 310 L278 310" stroke="var(--surface)" strokeWidth="1.2" opacity="0.6" />
      </g>
    </svg>
  );
}
