import type { SVGProps } from 'react';
import type { PropId } from '../../content/classes';

/** Seven bespoke line-and-fill prop icons in the studio's 1.5px plum-ink illustration style. */
export function PropIcon({
  propId,
  className = 'size-7 shrink-0',
  ...props
}: SVGProps<SVGSVGElement> & { propId: PropId }) {
  switch (propId) {
    case 'mat':
      return (
        <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className} {...props}>
          <rect x="4" y="13" width="22" height="10" rx="5" fill="var(--lotus)" stroke="var(--art-ink)" strokeWidth="1.5" />
          <circle cx="24" cy="18" r="5" fill="var(--band)" stroke="var(--art-ink)" strokeWidth="1.5" />
          <circle cx="24" cy="18" r="2" stroke="var(--art-ink)" strokeWidth="1.5" />
        </svg>
      );

    case 'block':
      return (
        <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className} {...props}>
          <path d="M6 12 L15 7 L26 11 L17 16 Z" fill="var(--saffron)" stroke="var(--art-ink)" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M6 12 V22 L17 26 V16 Z" fill="var(--peach)" stroke="var(--art-ink)" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M17 16 V26 L26 21 V11 Z" fill="var(--band)" stroke="var(--art-ink)" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );

    case 'bolster':
      return (
        <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className} {...props}>
          <rect x="4" y="10" width="24" height="12" rx="6" fill="var(--lilac)" stroke="var(--art-ink)" strokeWidth="1.5" />
          <ellipse cx="9" cy="16" rx="3" ry="6" fill="var(--band)" stroke="var(--art-ink)" strokeWidth="1.5" />
          <path d="M16 10 V22" stroke="var(--art-ink)" strokeWidth="1.2" strokeDasharray="2 2" />
        </svg>
      );

    case 'blanket':
      return (
        <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className} {...props}>
          <rect x="5" y="8" width="22" height="6" rx="3" fill="var(--peach)" stroke="var(--art-ink)" strokeWidth="1.5" />
          <rect x="5" y="14" width="22" height="6" rx="3" fill="var(--band)" stroke="var(--art-ink)" strokeWidth="1.5" />
          <rect x="5" y="20" width="22" height="5" rx="2.5" fill="var(--lilac)" stroke="var(--art-ink)" strokeWidth="1.5" />
        </svg>
      );

    case 'strap':
      return (
        <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className} {...props}>
          <circle cx="15" cy="16" r="8" stroke="var(--leaf)" strokeWidth="4" />
          <circle cx="15" cy="16" r="8" stroke="var(--art-ink)" strokeWidth="1.5" />
          <rect x="20" y="12" width="6" height="8" rx="2" fill="var(--saffron)" stroke="var(--art-ink)" strokeWidth="1.5" />
        </svg>
      );

    case 'eye-pillow':
      return (
        <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className} {...props}>
          <rect x="4" y="11" width="24" height="10" rx="5" fill="var(--lotus)" stroke="var(--art-ink)" strokeWidth="1.5" />
          <path d="M10 16 Q16 18.5 22 16" stroke="var(--art-ink)" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="16" cy="7.5" r="1.4" fill="var(--saffron)" />
        </svg>
      );

    case 'chair':
      return (
        <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className} {...props}>
          <path d="M10 6 V26 M10 17 H22 V26 M22 17 L24 26" stroke="var(--art-ink)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="10" y="15" width="12" height="3" rx="1.5" fill="var(--saffron)" stroke="var(--art-ink)" strokeWidth="1.5" />
          <line x1="10" y1="9" x2="17" y2="9" stroke="var(--art-ink)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
  }
}
