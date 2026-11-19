'use client';

import { useEffect, useState } from 'react';
import { classStyleById } from '../content/classes';
import { rooms, timetable } from '../content/timetable';
import { findNextSession } from '../lib/schedule';
import { site } from '../lib/site';
import { SiteLink } from './site-link';

const NEUTRAL_COPY = 'Classes run every day; see the week below.';

/**
 * Browser-computed "Next class" chip (Home Hero) and pill banner (Timetable).
 * Static / no-JS HTML stays strictly neutral. In the browser it computes the next
 * scheduled (non-cancelled) class in `America/Los_Angeles` and refreshes every minute.
 */
export function NextClassChip({
  variant = 'chip',
}: {
  variant?: 'chip' | 'banner';
}) {
  const [live, setLive] = useState<{
    label: string;
    dayHref: string;
  } | null>(null);

  useEffect(() => {
    const update = () => {
      const next = findNextSession(timetable, site.timeZone || 'America/Los_Angeles');
      if (!next) {
        setLive(null);
        return;
      }
      const cls = classStyleById.get(next.session.classId);
      const room = rooms[next.session.room];
      setLive({
        label: `Next class: ${cls?.name ?? next.session.classId} · ${next.whenLabel} at ${next.session.start} (${room.name})`,
        dayHref: `/timetable/#${next.session.day}`,
      });
    };
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, []);

  const sunIcon = (
    <svg viewBox="0 0 24 24" className="size-4 shrink-0" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="5" fill="var(--saffron)" stroke="var(--art-ink)" strokeWidth="1.5" />
      <path
        d="M12 2.5 V4.5 M12 19.5 V21.5 M2.5 12 H4.5 M19.5 12 H21.5 M5.3 5.3 L6.8 6.8 M17.2 17.2 L18.7 18.7 M18.7 5.3 L17.2 6.8 M6.8 17.2 L5.3 18.7"
        stroke="var(--art-ink)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );

  if (variant === 'banner') {
    return (
      <div className="inline-flex flex-wrap items-center gap-2.5 rounded-full border border-line bg-surface px-4 py-2 text-sm text-ink">
        {sunIcon}
        <span className="tabular font-medium">{live ? live.label : NEUTRAL_COPY}</span>
      </div>
    );
  }

  return (
    <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-line bg-surface/90 px-3.5 py-1.5 text-xs font-medium text-ink sm:text-sm">
      {sunIcon}
      {live ? (
        <SiteLink href={live.dayHref} className="tabular text-ink no-underline hover:text-accent-ink hover:underline">
          {live.label}
        </SiteLink>
      ) : (
        <span>{NEUTRAL_COPY}</span>
      )}
    </div>
  );
}
