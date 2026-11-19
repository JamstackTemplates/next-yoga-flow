import type { SVGProps } from 'react';

/**
 * Contact page head artwork: front desk still life.
 * A low wooden table holding a steaming tea bowl, folded blanket, small brass bell,
 * and a sprig of lotus in a ceramic jar.
 */
export function FrontDeskStillLife({ className = 'w-full max-w-xs h-auto', ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 320 200"
      fill="none"
      role="img"
      aria-label="Illustration of the studio front desk: a low wooden table with a steaming tea bowl, folded blanket, small brass bell and a lotus sprig in a ceramic jar."
      className={className}
      {...props}
    >
      {/* Soft sunrise halo behind the still life */}
      <circle cx="172" cy="116" r="78" fill="var(--peach)" opacity="0.24" />
      <circle cx="172" cy="116" r="54" stroke="var(--saffron)" strokeWidth="1.5" opacity="0.55" />

      {/* Low wooden front desk table */}
      <rect x="26" y="138" width="268" height="14" rx="5" fill="var(--band)" stroke="var(--art-ink)" strokeWidth="1.5" />
      <rect x="46" y="152" width="14" height="32" rx="3" fill="var(--deck)" stroke="var(--art-ink)" strokeWidth="1.5" />
      <rect x="260" y="152" width="14" height="32" rx="3" fill="var(--deck)" stroke="var(--art-ink)" strokeWidth="1.5" />
      <line x1="16" y1="184" x2="304" y2="184" stroke="var(--line)" strokeWidth="1.5" strokeLinecap="round" />

      {/* Folded blanket stack (left) */}
      <g>
        <rect x="42" y="122" width="84" height="16" rx="7" fill="var(--lilac)" stroke="var(--art-ink)" strokeWidth="1.5" />
        <rect x="46" y="108" width="76" height="14" rx="6" fill="var(--peach)" stroke="var(--art-ink)" strokeWidth="1.5" />
        <line x1="58" y1="115" x2="110" y2="115" stroke="var(--art-ink)" strokeWidth="1.2" strokeDasharray="3 4" opacity="0.6" />
      </g>

      {/* Steaming tea bowl (center-left) */}
      <g>
        <path
          d="M142 114 H184 L179 131 C177 136 149 136 147 131 Z"
          fill="var(--surface)"
          stroke="var(--art-ink)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <rect x="154" y="134" width="18" height="4" rx="2" fill="var(--band)" stroke="var(--art-ink)" strokeWidth="1.5" />
        {/* Warm steam wisps */}
        <path d="M155 106 C151 98 158 92 154 84" stroke="var(--art-ink)" strokeWidth="1.5" strokeLinecap="round" opacity="0.65" />
        <path d="M164 104 C160 95 168 88 164 78" stroke="var(--accent-ink)" strokeWidth="1.5" strokeLinecap="round" opacity="0.75" />
        <path d="M173 107 C170 100 176 94 173 88" stroke="var(--art-ink)" strokeWidth="1.5" strokeLinecap="round" opacity="0.55" />
      </g>

      {/* Small brass singing bell (center-right) */}
      <g>
        <path
          d="M198 138 C198 124 205 117 213 117 C221 117 228 124 228 138 Z"
          fill="var(--saffron)"
          stroke="var(--art-ink)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle cx="213" cy="113" r="3.5" fill="var(--saffron)" stroke="var(--art-ink)" strokeWidth="1.5" />
        <line x1="194" y1="138" x2="232" y2="138" stroke="var(--art-ink)" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* Ceramic jar with a sprig of lotus (right) */}
      <g>
        {/* Stem & leaf */}
        <path d="M258 96 Q254 74 260 54" stroke="var(--leaf)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M258 96 Q254 74 260 54" stroke="var(--art-ink)" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M256 84 C244 82 238 74 240 67 C248 68 254 75 256 84 Z" fill="var(--leaf)" stroke="var(--art-ink)" strokeWidth="1.5" />
        {/* Lotus bloom sprig */}
        <g transform="translate(260, 52)">
          <path d="M0 4 C-11 2 -16 -5 -16 -13 C-8 -11 -3 -4 0 4 Z" fill="var(--peach)" stroke="var(--art-ink)" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M0 4 C11 2 16 -5 16 -13 C8 -11 3 -4 0 4 Z" fill="var(--peach)" stroke="var(--art-ink)" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M0 4 C-6 -4 -6 -16 0 -24 C6 -16 6 -4 0 4 Z" fill="var(--lotus)" stroke="var(--art-ink)" strokeWidth="1.5" strokeLinejoin="round" />
        </g>
        {/* Ceramic jar */}
        <path
          d="M248 96 H268 L272 112 C275 124 270 138 258 138 C246 138 241 124 244 112 Z"
          fill="var(--surface)"
          stroke="var(--art-ink)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M244 116 Q258 120 272 116" stroke="var(--lotus)" strokeWidth="1.5" />
      </g>
    </svg>
  );
}
