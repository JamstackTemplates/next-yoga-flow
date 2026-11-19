'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { classStyleById } from '../content/classes';
import { teacherById } from '../content/teachers';
import {
  rooms,
  timetable,
  WEEKDAY_NAMES,
  WEEKDAYS,
  type TimetableSession,
  type Weekday,
} from '../content/timetable';
import {
  parseClockMinutes,
  sessionsForDay,
  SKY_END_MINUTES,
  SKY_START_MINUTES,
  skyPercent,
  skyWidthPercent,
  timeOfDayBucket,
  zonedNow,
} from '../lib/schedule';
import { site } from '../lib/site';
import { Strata } from './art/dividers';
import { SiteLink } from './site-link';

const HOUR_TICKS = [6, 9, 12, 15, 18, 21] as const;

function skySpineColor(start: string): string {
  const bucket = timeOfDayBucket(start);
  if (bucket === 'dawn') return 'var(--lilac)';
  if (bucket === 'midday') return 'var(--saffron)';
  return 'var(--lotus)';
}

/** Assign non-overlapping vertical lanes so petals never collide on the horizontal sky track. */
function layoutPetals(sessions: TimetableSession[]): Array<{
  session: TimetableSession;
  startPct: number;
  widthPct: number;
  boxLeftPct: number;
  lane: 0 | 1;
}> {
  const minBoxWidthPct = 17.5;
  const laneEnds: [number, number] = [-10, -10];

  return sessions.map((session) => {
    const startMin = parseClockMinutes(session.start);
    const startPct = skyPercent(startMin);
    const naturalWidth = skyWidthPercent(session.durationMinutes);
    const visualWidth = Math.max(naturalWidth, minBoxWidthPct);
    const boxLeftPct = Math.min(startPct, Math.max(0, 100 - visualWidth - 0.8));

    let lane: 0 | 1 = 0;
    if (boxLeftPct < laneEnds[0] + 1.2) {
      lane = 1;
    }
    laneEnds[lane] = boxLeftPct + visualWidth;

    return {
      session,
      startPct,
      widthPct: visualWidth,
      boxLeftPct,
      lane,
    };
  });
}

export function TodayOnMat({
  eyebrow,
  heading,
  intro,
  ctaLabel,
}: {
  eyebrow: ReactNode;
  heading: ReactNode;
  intro: ReactNode;
  ctaLabel: ReactNode;
}) {
  const [hydrated, setHydrated] = useState(false);
  const [selectedDay, setSelectedDay] = useState<Weekday>('mon');
  const [todayInfo, setTodayInfo] = useState<{ day: Weekday; minutes: number } | null>(null);

  useEffect(() => {
    setHydrated(true);
    const zone = site.timeZone || 'America/Los_Angeles';
    const update = () => {
      const now = zonedNow(zone);
      if (now) {
        setTodayInfo({ day: now.day, minutes: now.minutes });
      }
    };
    const initial = zonedNow(zone);
    if (initial) {
      setSelectedDay(initial.day);
      setTodayInfo({ day: initial.day, minutes: initial.minutes });
    }
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, []);

  const daySessions = sessionsForDay(selectedDay, timetable);
  const laidOut = layoutPetals(daySessions);
  const hasTwoLanes = laidOut.some((item) => item.lane === 1);
  const isTodaySelected = hydrated && todayInfo?.day === selectedDay;
  const nowMinutes = todayInfo?.minutes ?? null;
  const showNowMarker =
    isTodaySelected &&
    nowMinutes !== null &&
    nowMinutes >= SKY_START_MINUTES &&
    nowMinutes <= SKY_END_MINUTES;
  const nowPct = nowMinutes !== null ? skyPercent(nowMinutes) : 0;

  const dayHeadingLabel = !hydrated
    ? 'A typical Monday'
    : isTodaySelected
      ? `Today · ${WEEKDAY_NAMES[selectedDay].full}`
      : WEEKDAY_NAMES[selectedDay].full;

  return (
    <>
    <Strata from="var(--water-2)" to="var(--day-sunrise)" />
    <section
      aria-labelledby="today-on-mat-heading"
      className="paper-band sky-sunrise relative pt-10 pb-4 sm:pt-14"
    >
      <div className="grid gap-8">
        {/* Intro block: label on a horizon, large title, and the day being shown */}
        <div className="wrap-wide grid gap-x-12 gap-y-5 lg:grid-cols-12 lg:items-end">
          <div className="ripple-behind lg:col-span-7">
            <p className="eyebrow eyebrow-horizon">{eyebrow}</p>
            <h2 id="today-on-mat-heading" className="display-xl mt-4 text-ink">
              {heading}
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <p className="text-[1.05rem] leading-relaxed text-muted">{intro}</p>
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
              <p className="text-xs font-semibold tracking-[0.16em] uppercase text-accent-ink">
                {dayHeadingLabel}
              </p>
              <SiteLink href={`/timetable/#${selectedDay}`} className="text-link text-sm font-medium">
                {ctaLabel}
              </SiteLink>
            </div>
          </div>
        </div>

        {/* Full-bleed sun-arc strip */}
        <div>
          {/* Day selector links: real links to /timetable/#<day> without JS; interactive preview with JS */}
          <div
            className="wrap-wide mb-5 flex flex-wrap items-center gap-2"
            role="navigation"
            aria-label="Choose a day of the week"
          >
            {WEEKDAYS.map((day) => {
              const active = day === selectedDay;
              const isToday = hydrated && todayInfo?.day === day;
              return (
                <SiteLink
                  key={day}
                  href={`/timetable/#${day}`}
                  onClick={(event) => {
                    if (!hydrated) return;
                    event.preventDefault();
                    setSelectedDay(day);
                  }}
                  aria-current={active ? 'true' : undefined}
                  className={`inline-flex min-h-10 items-center gap-1.5 rounded-full border px-4 text-xs font-semibold tracking-[0.14em] uppercase no-underline transition-colors ${
                    active
                      ? 'border-accent bg-accent text-on-accent hover:bg-accent-hover hover:no-underline'
                      : 'border-line bg-surface text-ink hover:border-accent-ink hover:bg-band hover:no-underline'
                  }`}
                >
                  <span>{WEEKDAY_NAMES[day].short}</span>
                  {isToday ? (
                    <span
                      className={`size-1.5 rounded-full ${active ? 'bg-saffron' : 'bg-accent'}`}
                      aria-label="(today)"
                    />
                  ) : null}
                </SiteLink>
              );
            })}
          </div>

          {/* Sun-arc sky strip (visible on both desktop and mobile!) */}
          <div className="border-y-[1.5px] border-(--horizon) bg-surface">
            {/* Hour axis */}
            <div className="sun-arc-sky relative px-4 pt-5 pb-6 sm:px-8 lg:px-12">
              <div className="relative h-5">
                {HOUR_TICKS.map((hour) => {
                  const pct = skyPercent(hour * 60);
                  return (
                    <span
                      key={hour}
                      className="tabular absolute top-0 text-xs font-semibold tracking-wider text-ink/80"
                      style={{
                        left: `${pct}%`,
                        transform: hour === 6 ? 'translateX(0)' : hour === 21 ? 'translateX(-100%)' : 'translateX(-50%)',
                      }}
                    >
                      {String(hour).padStart(2, '0')}:00
                    </span>
                  );
                })}
              </div>

              {/* Desktop horizontal proportional petal sky */}
              <div
                className={`relative mt-3 hidden md:block ${hasTwoLanes ? 'h-[13rem]' : 'h-[7rem]'}`}
              >
                {/* Vertical hour hairlines */}
                {HOUR_TICKS.map((hour) => (
                  <span
                    key={hour}
                    aria-hidden="true"
                    className="pointer-events-none absolute top-0 bottom-0 w-px bg-ink/15"
                    style={{ left: `${skyPercent(hour * 60)}%` }}
                  />
                ))}

                {/* Gliding "now" sun disc */}
                {showNowMarker ? (
                  <div
                    className="now-sun-marker pointer-events-none absolute top-0 bottom-0 z-20"
                    style={{ left: `${nowPct}%` }}
                    aria-label="Current studio time"
                  >
                    <div className="h-full w-0.5 bg-accent/70" />
                    <span className="absolute -top-2 -left-2 flex size-4 items-center justify-center rounded-full border-[1.5px] border-ink bg-saffron" />
                  </div>
                ) : null}

                {laidOut.map(({ session, widthPct, boxLeftPct, lane }) => {
                  const cls = classStyleById.get(session.classId);
                  const regularTeacher = teacherById.get(session.teacherId);
                  const coverTeacher = session.coverTeacherId ? teacherById.get(session.coverTeacherId) : null;
                  const cancelled = session.status === 'cancelled';

                  return (
                    <SiteLink
                      key={session.id}
                      href={`/classes/#${session.classId}`}
                      style={{
                        left: `${boxLeftPct}%`,
                        width: `${widthPct}%`,
                        top: lane === 0 ? '0.35rem' : '6.6rem',
                      }}
                      className={`group absolute z-10 flex min-h-[5.85rem] flex-col justify-between rounded-[1.5rem_2rem_1.5rem_1.8rem] border-[1.5px] px-3.5 py-2.5 no-underline transition-colors ${
                        cancelled
                          ? 'border-line bg-surface/80 text-muted line-through'
                          : 'border-ink/40 bg-surface/95 text-ink hover:border-accent hover:bg-surface hover:no-underline'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1.5">
                        <span className="tabular text-xs font-semibold text-accent-ink">
                          {session.start}
                        </span>
                        <span
                          className={`size-2 shrink-0 rounded-full border border-ink/50 ${
                            session.room === 'sunroom' ? 'bg-saffron' : 'bg-leaf'
                          }`}
                          title={rooms[session.room].name}
                        />
                      </div>
                      <p className="truncate font-display text-[1.2rem] leading-tight text-ink">
                        {cls?.name ?? session.classId}
                      </p>
                      <p className="truncate text-[0.73rem] text-muted">
                        {cancelled
                          ? 'Cancelled'
                          : coverTeacher
                            ? `${coverTeacher.name} (cover)`
                            : regularTeacher?.name ?? session.teacherId}
                      </p>
                    </SiteLink>
                  );
                })}
              </div>

              {/* Mobile sun-arc sky preview bar + petals */}
              <div className="mt-2 md:hidden">
                <div className="relative h-8 rounded-full border border-ink/20 bg-surface/35">
                  {showNowMarker ? (
                    <span
                      className="now-sun-marker absolute top-1/2 z-20 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink bg-saffron"
                      style={{ left: `${nowPct}%` }}
                      aria-hidden="true"
                    />
                  ) : null}
                  {daySessions.map((session) => {
                    const startPct = skyPercent(parseClockMinutes(session.start));
                    const wPct = Math.max(skyWidthPercent(session.durationMinutes), 7);
                    return (
                      <span
                        key={session.id}
                        aria-hidden="true"
                        className={`absolute top-1.5 bottom-1.5 rounded-full border border-ink/45 ${
                          session.status === 'cancelled'
                            ? 'bg-surface/40'
                            : session.room === 'sunroom'
                              ? 'bg-surface'
                              : 'bg-band'
                        }`}
                        style={{
                          left: `${Math.min(startPct, 100 - wPct)}%`,
                          width: `${wPct}%`,
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Mobile readable petal list beneath the sky bar */}
            <ul className="divide-y divide-line md:hidden">
              {daySessions.map((session) => {
                const cls = classStyleById.get(session.classId);
                const regularTeacher = teacherById.get(session.teacherId);
                const coverTeacher = session.coverTeacherId ? teacherById.get(session.coverTeacherId) : null;
                const cancelled = session.status === 'cancelled';

                return (
                  <li key={session.id} className="flex items-stretch">
                    <span
                      aria-hidden="true"
                      className="w-2 shrink-0"
                      style={{ background: skySpineColor(session.start) }}
                    />
                    <SiteLink
                      href={`/classes/#${session.classId}`}
                      className="flex flex-1 items-center justify-between gap-3 px-4 py-3 text-ink no-underline hover:bg-band/50 hover:no-underline"
                    >
                      <div className="min-w-0">
                        <p className={`font-display text-lg leading-snug ${cancelled ? 'line-through text-muted' : ''}`}>
                          {cls?.name ?? session.classId}
                          {cancelled ? ' (Cancelled)' : ''}
                        </p>
                        <p className="text-xs text-muted">
                          {coverTeacher
                            ? `with ${coverTeacher.name} (cover)`
                            : regularTeacher?.name}
                          {' · '}
                          {rooms[session.room].name}
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="tabular font-display text-lg text-accent-ink">{session.start}</p>
                        <p className="tabular text-xs text-muted">{session.durationMinutes} min</p>
                      </div>
                    </SiteLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
