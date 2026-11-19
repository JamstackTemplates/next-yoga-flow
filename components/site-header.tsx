'use client';

import { DarkModeToggle } from 'jamstacks';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useState } from 'react';
import { introOffer } from '../content/pricing';
import { LotusSunMark } from './art/lotus-sun-mark';
import { SiteLink } from './site-link';

const NAV_ITEMS = [
  { href: '/timetable/', label: 'Timetable' },
  { href: '/classes/', label: 'Classes' },
  { href: '/teachers/', label: 'Teachers' },
  { href: '/new-here/', label: 'New here' },
  { href: '/contact/', label: 'Contact' },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <header className="relative z-40 bg-(--strata-1)">
      <div className="wrap-wide flex min-h-20 items-center justify-between gap-3 py-2.5">
        <SiteLink
          href="/"
          className="group flex items-center gap-3 text-ink no-underline hover:no-underline"
        >
          <LotusSunMark className="size-10 shrink-0 sm:size-11" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-[1.2rem] tracking-tight text-ink sm:text-[1.35rem]">
              Sunrise Lotus
            </span>
            <span className="mt-0.5 text-[0.66rem] font-semibold tracking-[0.28em] uppercase text-muted">
              YOGA
            </span>
          </span>
        </SiteLink>

        {/* Wide inline navigation */}
        <nav aria-label="Main" className="hidden items-center gap-6 lg:flex">
          <ul className="flex items-center gap-6 text-[0.96rem] font-medium">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <SiteLink
                  href={item.href}
                  markCurrent="page"
                  className="text-ink no-underline hover:text-accent-ink hover:underline"
                >
                  {item.label}
                </SiteLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right controls: theme toggle, 768px+ CTA, and mobile/tablet menu disclosure */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <DarkModeToggle />
          <SiteLink href="/new-here/" className="button button-sm hidden md:inline-flex">
            {introOffer.name}
          </SiteLink>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-line bg-surface px-3.5 text-sm font-medium text-ink hover:border-accent-ink lg:hidden"
          >
            <svg viewBox="0 0 20 20" className="size-4" fill="none" aria-hidden="true">
              {menuOpen ? (
                <path d="M5 5 L15 15 M15 5 L5 15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              ) : (
                <path d="M3 6 H17 M3 10 H17 M3 14 H17" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              )}
            </svg>
            <span>{menuOpen ? 'Close' : 'Menu'}</span>
          </button>
        </div>
      </div>

      {/* Collapsible disclosure navigation for narrow viewports */}
      {menuOpen ? (
        <nav
          id={menuId}
          aria-label="Mobile navigation"
          className="border-t border-line bg-surface/95 backdrop-blur-xs lg:hidden"
        >
          <div className="wrap py-5">
            <ul className="grid gap-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <SiteLink
                    href={item.href}
                    markCurrent="page"
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-2xl px-3.5 py-2.5 font-display text-lg text-ink no-underline hover:bg-band"
                  >
                    {item.label}
                  </SiteLink>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-line md:hidden">
              <SiteLink
                href="/new-here/"
                onClick={() => setMenuOpen(false)}
                className="button w-full"
              >
                Start the ${introOffer.price} {introOffer.name}
              </SiteLink>
            </div>
          </div>
        </nav>
      ) : null}

    </header>
  );
}
