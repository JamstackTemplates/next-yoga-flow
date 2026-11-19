'use client';

import { useEffect, useMemo, useState } from 'react';
import { classStyleById, classStyles } from '../content/classes';
import { teacherById, teachers } from '../content/teachers';
import {
  rooms,
  timetable,
  WEEKDAY_NAMES,
  WEEKDAYS,
  type TimetableSession,
  type Weekday,
} from '../content/timetable';
import {
  activeTeacherId,
  parseClockMinutes,
  sessionEndClock,
  sessionsForDay,
  SKY_END_MINUTES,
  SKY_START_MINUTES,
  skyPercent,
  skyWidthPercent,
  timeOfDayBucket,
  zonedNow,
  type TimeOfDay,
} from '../lib/schedule';
import { site } from '../lib/site';
import { SiteLink } from './site-link';

const HOUR_TICKS = [6, 8, 10, 12, 14, 16, 18, 20, 21] as const;

const TIME_OPTIONS: ReadonlyArray<{ id: TimeOfDay; label: string; range: string }> = [
  { id: 'dawn', label: 'Dawn', range: 'before 09:00' },
  { id: 'midday', label: 'Midday', range: '09:00–16:59' },
  { id: 'evening', label: 'Evening', range: '17:00+' },
];

function skySpineColor(start: string): string {
  const bucket = timeOfDayBucket(start);
  if (bucket === 'dawn') return 'var(--lilac)';
  if (bucket === 'midday') return 'var(--saffron)';
  return 'var(--lotus)';
}

function layoutDayPetals(sessions: TimetableSession[]): Array<{
  session: TimetableSession;
  boxLeftPct: number;
  widthPct: number;
  lane: 0 | 1;
}> {
  const minWidthPct = 17.5;
  const laneEnds: [number, number] = [-10, -10];

  return sessions.map((session) => {
    const startPct = skyPercent(parseClockMinutes(session.start));
    const widthPct = Math.max(skyWidthPercent(session.durationMinutes), minWidthPct);
    const boxLeftPct = Math.min(startPct, Math.max(0, 100 - widthPct - 0.6));
    let lane: 0 | 1 = 0;
    if (boxLeftPct < laneEnds[0] + 1.1) {
      lane = 1;
    }
    laneEnds[lane] = boxLeftPct + widthPct;
    return { session, boxLeftPct, widthPct, lane };
  });
}

function matchesFilters(
  session: TimetableSession,
  selectedClass: string,
  selectedTeacher: string,
  selectedTime: TimeOfDay | '',
): boolean {
  if (selectedClass && session.classId !== selectedClass) return false;
  if (
    selectedTeacher &&
    session.teacherId !== selectedTeacher &&
    session.coverTeacherId !== selectedTeacher
  ) {
    return false;
  }
  if (selectedTime && timeOfDayBucket(session.start) !== selectedTime) return false;
  return true;
}

export function WeekTimetable() {
  const [hydrated, setHydrated] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedTime, setSelectedTime] = useState<TimeOfDay | ''>('');
  const [todayInfo, setTodayInfo] = useState<{ day: Weekday; minutes: number } | null>(null);

  // Hydrate initial filters from URL query string & start studio clock
  useEffect(() => {
    setHydrated(true);
    const params = new URLSearchParams(window.location.search);
    const qClass = params.get('class') ?? '';
    const qTeacher = params.get('teacher') ?? '';
    const qTime = params.get('time') ?? '';
    if (qClass && classStyleById.has(qClass)) setSelectedClass(qClass);
    if (qTeacher && teacherById.has(qTeacher)) setSelectedTeacher(qTeacher);
    if (qTime === 'dawn' || qTime === 'midday' || qTime === 'evening') setSelectedTime(qTime);

    const zone = site.timeZone || 'America/Los_Angeles';
    const update = () => {
      const now = zonedNow(zone);
      if (now) setTodayInfo({ day: now.day, minutes: now.minutes });
    };
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, []);

  // Mirror active filters to URL query string so a filtered week can be shared
  useEffect(() => {
    if (!hydrated) return;
    const url = new URL(window.location.href);
    if (selectedClass) url.searchParams.set('class', selectedClass);
    else url.searchParams.delete('class');
    if (selectedTeacher) url.searchParams.set('teacher', selectedTeacher);
    else url.searchParams.delete('teacher');
    if (selectedTime) url.searchParams.set('time', selectedTime);
    else url.searchParams.delete('time');
    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
  }, [hydrated, selectedClass, selectedTeacher, selectedTime]);

  const hasFilters = Boolean(selectedClass || selectedTeacher || selectedTime);

  const visibleCount = useMemo(
    () =>
      timetable.filter((s) =>
        matchesFilters(s, selectedClass, selectedTeacher, selectedTime),
      ).length,
    [selectedClass, selectedTeacher, selectedTime],
  );

  const clearFilters = () => {
    setSelectedClass('');
    setSelectedTeacher('');
    setSelectedTime('');
  };

  const showNowMarker =
    hydrated &&
    todayInfo !== null &&
    todayInfo.minutes >= SKY_START_MINUTES &&
    todayInfo.minutes <= SKY_END_MINUTES;
  const nowPct = todayInfo ? skyPercent(todayInfo.minutes) : 0;

  return (
    <div>
      {/* Client-only progressive-enhancement filters (absent without JS) */}
      {hydrated ? (
        <section
          aria-label="Filter timetable"
          className="print-hide mb-10 rounded-[2rem] border-[1.5px] border-line bg-surface p-5 sm:p-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="eyebrow">Filter the week</p>
            <div className="flex items-center gap-3">
              <p className="tabular text-sm font-medium text-muted" role="status" aria-live="polite">
                {visibleCount} {visibleCount === 1 ? 'class' : 'classes'} shown
              </p>
              {hasFilters ? (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="rounded-full border border-line bg-band px-3.5 py-1 text-xs font-semibold tracking-wider uppercase text-ink hover:border-accent-ink"
                >
                  Clear filters
                </button>
              ) : null}
            </div>
          </div>

          <div className="mt-4 grid gap-4">
            {/* Time of day */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 text-xs font-semibold tracking-[0.14em] uppercase text-muted">
                Time
              </span>
              {TIME_OPTIONS.map((opt) => {
                const pressed = selectedTime === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    aria-pressed={pressed}
                    onClick={() => setSelectedTime(pressed ? '' : opt.id)}
                    className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                      pressed
                        ? 'border-accent bg-accent text-on-accent'
                        : 'border-line bg-bg text-ink hover:border-accent-ink'
                    }`}
                  >
                    {opt.label} <span className="opacity-80">({opt.range})</span>
                  </button>
                );
              })}
            </div>

            {/* Class styles */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 text-xs font-semibold tracking-[0.14em] uppercase text-muted">
                Class
              </span>
              {classStyles.map((cls) => {
                const pressed = selectedClass === cls.id;
                return (
                  <button
                    key={cls.id}
                    type="button"
                    aria-pressed={pressed}
                    onClick={() => setSelectedClass(pressed ? '' : cls.id)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                      pressed
                        ? 'border-accent bg-accent text-on-accent'
                        : 'border-line bg-bg text-ink hover:border-accent-ink'
                    }`}
                  >
                    {cls.name}
                  </button>
                );
              })}
            </div>

            {/* Teachers */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 text-xs font-semibold tracking-[0.14em] uppercase text-muted">
                Teacher
              </span>
              {teachers.map((teacher) => {
                const pressed = selectedTeacher === teacher.id;
                return (
                  <button
                    key={teacher.id}
                    type="button"
                    aria-pressed={pressed}
                    onClick={() => setSelectedTeacher(pressed ? '' : teacher.id)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                      pressed
                        ? 'border-accent bg-accent text-on-accent'
                        : 'border-line bg-bg text-ink hover:border-accent-ink'
                    }`}
                  >
                    {teacher.name}
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {/* =================================================================
          Desktop 7-row Sun-Arc Week Grid (lg+)
         ================================================================= */}
      <div className="print-hide hidden overflow-hidden rounded-[2rem] border-[1.5px] border-line bg-surface lg:block">
        {/* Shared 06:00–21:00 hour axis header */}
        <div className="grid grid-cols-[5.5rem_1fr] border-b border-line bg-band/70">
          <div className="flex items-center justify-center border-r border-line px-2 py-3 text-[0.7rem] font-semibold tracking-[0.16em] uppercase text-muted">
            Day
          </div>
          <div className="relative h-10 px-4">
            {HOUR_TICKS.map((hour) => (
              <span
                key={hour}
                className="tabular absolute top-2.5 text-[0.72rem] font-semibold tracking-wider text-muted"
                style={{
                  left: `${skyPercent(hour * 60)}%`,
                  transform: hour === 6 ? 'translateX(0)' : hour === 21 ? 'translateX(-100%)' : 'translateX(-50%)',
                }}
              >
                {String(hour).padStart(2, '0')}:00
              </span>
            ))}
          </div>
        </div>

        {/* Seven weekday sky rows */}
        <div className="divide-y divide-line">
          {WEEKDAYS.map((day) => {
            const allDaySessions = sessionsForDay(day, timetable);
            const matching = allDaySessions.filter((s) =>
              matchesFilters(s, selectedClass, selectedTeacher, selectedTime),
            );
            const laidOut = layoutDayPetals(matching);
            const twoLanes = laidOut.some((item) => item.lane === 1);
            const isToday = hydrated && todayInfo?.day === day;

            return (
              <div
                key={day}
                id={`desktop-${day}`}
                className={`grid grid-cols-[5.5rem_1fr] ${isToday ? 'ring-2 ring-inset ring-accent/70' : ''}`}
              >
                {/* Day label column */}
                <div
                  className={`flex flex-col items-center justify-center border-r border-line px-2 py-4 text-center ${
                    isToday ? 'bg-accent text-on-accent' : 'bg-surface text-ink'
                  }`}
                >
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase">
                    {WEEKDAY_NAMES[day].short}
                  </span>
                  {isToday ? (
                    <span className="mt-1 rounded-full bg-saffron px-2 py-0.5 text-[0.62rem] font-semibold tracking-wider uppercase text-ink">
                      Today
                    </span>
                  ) : null}
                </div>

                {/* Sky gradient track */}
                <div
                  className={`sun-arc-sky relative px-4 py-3 ${
                    matching.length === 0 ? 'min-h-[4.5rem]' : twoLanes ? 'min-h-[12.6rem]' : 'min-h-[7rem]'
                  }`}
                >
                  {/* Hour hairlines */}
                  {HOUR_TICKS.map((hour) => (
                    <span
                      key={hour}
                      aria-hidden="true"
                      className="pointer-events-none absolute top-0 bottom-0 w-px bg-ink/12"
                      style={{ left: `${skyPercent(hour * 60)}%` }}
                    />
                  ))}

                  {/* Sun-disc "now" marker on today's row */}
                  {isToday && showNowMarker ? (
                    <div
                      className="now-sun-marker pointer-events-none absolute top-0 bottom-0 z-20"
                      style={{ left: `${nowPct}%` }}
                      aria-label="Current studio time"
                    >
                      <div className="h-full w-0.5 bg-accent" />
                      <span className="absolute top-1.5 -left-2.5 flex size-5 items-center justify-center rounded-full border-[1.5px] border-ink bg-saffron" />
                    </div>
                  ) : null}

                  {matching.length === 0 ? (
                    <p className="flex h-full items-center text-sm text-ink/75">
                      No classes match these filters on {WEEKDAY_NAMES[day].full}.
                    </p>
                  ) : (
                    laidOut.map(({ session, boxLeftPct, widthPct, lane }) => {
                      const cls = classStyleById.get(session.classId);
                      const regularTeacher = teacherById.get(session.teacherId);
                      const coverTeacher = session.coverTeacherId
                        ? teacherById.get(session.coverTeacherId)
                        : null;
                      const cancelled = session.status === 'cancelled';

                      return (
                        <article
                          key={session.id}
                          style={{
                            left: `${boxLeftPct}%`,
                            width: `${widthPct}%`,
                            top: lane === 0 ? '0.65rem' : '6.45rem',
                          }}
                          className={`absolute z-10 flex min-h-[5.35rem] flex-col justify-between rounded-[1.25rem_1.65rem_1.25rem_1.5rem] border-[1.5px] px-3 py-2 ${
                            cancelled
                              ? 'border-line bg-surface/85 text-muted'
                              : 'border-ink/45 bg-surface/96 text-ink'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-1.5">
                            <span className={`tabular text-xs font-semibold ${cancelled ? 'line-through text-muted' : 'text-accent-ink'}`}>
                              {session.start}
                              <span className="font-normal text-muted"> · {session.durationMinutes}m</span>
                            </span>
                            <span
                              className={`size-2.5 shrink-0 rounded-full border border-ink/55 ${
                                session.room === 'sunroom' ? 'bg-saffron' : 'bg-leaf'
                              }`}
                              title={rooms[session.room].name}
                              aria-label={rooms[session.room].name}
                            />
                          </div>

                          <h3 className={`mt-0.5 truncate font-display text-[0.98rem] leading-tight ${cancelled ? 'line-through text-muted' : 'text-ink'}`}>
                            <SiteLink
                              href={`/classes/#${session.classId}`}
                              className="text-inherit no-underline hover:text-accent-ink hover:underline"
                            >
                              {cls?.name ?? session.classId}
                            </SiteLink>
                          </h3>

                          <p className="truncate text-[0.72rem] leading-snug text-muted">
                            {cancelled ? (
                              <span className="font-semibold text-accent-ink no-underline">Cancelled</span>
                            ) : coverTeacher ? (
                              <span>
                                with{' '}
                                <SiteLink href={`/teachers/#${coverTeacher.id}`} className="text-ink underline">
                                  {coverTeacher.name}
                                </SiteLink>{' '}
                                (cover)
                              </span>
                            ) : (
                              <SiteLink
                                href={`/teachers/#${session.teacherId}`}
                                className="text-muted no-underline hover:text-accent-ink hover:underline"
                              >
                                {regularTeacher?.name ?? session.teacherId}
                              </SiteLink>
                            )}
                          </p>

                          {session.note ? (
                            <p
                              className="mt-0.5 truncate text-[0.68rem] font-medium text-accent-ink"
                              title={session.note}
                            >
                              {session.note}
                            </p>
                          ) : null}
                        </article>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =================================================================
          Mobile Sticky Day Strip + Sky-Spined Vertical Lists (< lg)
         ================================================================= */}
      <div className="print-hide lg:hidden">
        <nav
          aria-label="Jump to a day"
          className="sticky top-0 z-30 -mx-4 mb-6 flex gap-1.5 overflow-x-auto border-y border-line bg-bg/95 px-4 py-2.5 backdrop-blur-xs"
        >
          {WEEKDAYS.map((day) => {
            const isToday = hydrated && todayInfo?.day === day;
            return (
              <a
                key={day}
                href={`#${day}`}
                className={`inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-full border px-3.5 text-xs font-semibold tracking-[0.14em] uppercase no-underline ${
                  isToday
                    ? 'border-accent bg-accent text-on-accent'
                    : 'border-line bg-surface text-ink hover:border-accent-ink'
                }`}
              >
                {WEEKDAY_NAMES[day].short}
              </a>
            );
          })}
        </nav>

        <div className="space-y-8">
          {WEEKDAYS.map((day) => {
            const matching = sessionsForDay(day, timetable).filter((s) =>
              matchesFilters(s, selectedClass, selectedTeacher, selectedTime),
            );
            const isToday = hydrated && todayInfo?.day === day;

            return (
              <section key={day} id={day} aria-labelledby={`day-heading-${day}`} className="scroll-mt-20">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h2 id={`day-heading-${day}`} className="font-display text-2xl text-ink">
                    {WEEKDAY_NAMES[day].full}
                  </h2>
                  {isToday ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-accent bg-accent px-3 py-0.5 text-xs font-semibold tracking-wider uppercase text-on-accent">
                      <span className="size-1.5 rounded-full bg-saffron" aria-hidden="true" />
                      Today
                    </span>
                  ) : null}
                </div>

                {/* Mobile sun-arc sky overview strip for this day */}
                <div className="sun-arc-sky relative mb-3 h-7 rounded-full border border-line px-2">
                  {isToday && showNowMarker ? (
                    <span
                      className="now-sun-marker absolute top-1/2 z-20 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink bg-saffron"
                      style={{ left: `${nowPct}%` }}
                      aria-hidden="true"
                    />
                  ) : null}
                  {matching.map((session) => {
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

                {matching.length === 0 ? (
                  <p className="rounded-2xl border border-line bg-surface px-4 py-3 text-sm text-muted">
                    No classes match these filters.
                  </p>
                ) : (
                  <ul className="space-y-2.5">
                    {matching.map((session) => {
                      const cls = classStyleById.get(session.classId);
                      const regularTeacher = teacherById.get(session.teacherId);
                      const coverTeacher = session.coverTeacherId
                        ? teacherById.get(session.coverTeacherId)
                        : null;
                      const cancelled = session.status === 'cancelled';

                      return (
                        <li
                          key={session.id}
                          className="flex overflow-hidden rounded-[1.5rem] border-[1.5px] border-line bg-surface"
                        >
                          <span
                            aria-hidden="true"
                            className="w-2.5 shrink-0"
                            style={{ background: skySpineColor(session.start) }}
                          />
                          <div className="flex flex-1 flex-wrap items-start justify-between gap-3 px-4 py-3.5">
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                                <span
                                  className={`tabular font-display text-xl ${
                                    cancelled ? 'line-through text-muted' : 'text-accent-ink'
                                  }`}
                                >
                                  {session.start}
                                </span>
                                <span className="tabular text-xs text-muted">
                                  – {sessionEndClock(session)} ({session.durationMinutes} min)
                                </span>
                              </div>
                              <h3 className={`mt-1 font-display text-xl ${cancelled ? 'line-through text-muted' : 'text-ink'}`}>
                                <SiteLink
                                  href={`/classes/#${session.classId}`}
                                  className="text-inherit no-underline hover:text-accent-ink hover:underline"
                                >
                                  {cls?.name ?? session.classId}
                                </SiteLink>
                              </h3>
                              <p className="mt-0.5 text-sm text-muted">
                                {cancelled ? (
                                  <span className="font-semibold text-accent-ink">Cancelled</span>
                                ) : coverTeacher ? (
                                  <>
                                    with{' '}
                                    <SiteLink href={`/teachers/#${coverTeacher.id}`} className="text-link">
                                      {coverTeacher.name}
                                    </SiteLink>{' '}
                                    (cover)
                                  </>
                                ) : (
                                  <SiteLink href={`/teachers/#${session.teacherId}`} className="text-ink no-underline hover:underline">
                                    {regularTeacher?.name ?? session.teacherId}
                                  </SiteLink>
                                )}
                                {' · '}
                                <span className="inline-flex items-center gap-1.5">
                                  <span
                                    className={`inline-block size-2 rounded-full border border-ink/50 ${
                                      session.room === 'sunroom' ? 'bg-saffron' : 'bg-leaf'
                                    }`}
                                    aria-hidden="true"
                                  />
                                  {rooms[session.room].name}
                                </span>
                              </p>
                              {session.note ? (
                                <p className="mt-1.5 text-xs font-medium text-accent-ink">{session.note}</p>
                              ) : null}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </section>
            );
          })}
        </div>
      </div>

      {/* =================================================================
          Plain Print Timetable Table (hidden on screen, visible when printing)
         ================================================================= */}
      <table className="print-timetable-table hidden">
        <caption>Sunrise Lotus Yoga — Weekly Timetable</caption>
        <thead>
          <tr>
            <th scope="col">Day</th>
            <th scope="col">Time</th>
            <th scope="col">Class</th>
            <th scope="col">Teacher</th>
            <th scope="col">Room</th>
            <th scope="col">Notes</th>
          </tr>
        </thead>
        <tbody>
          {WEEKDAYS.flatMap((day) =>
            sessionsForDay(day, timetable).map((session) => {
              const cls = classStyleById.get(session.classId);
              const teacher = teacherById.get(activeTeacherId(session));
              const isCover = Boolean(session.coverTeacherId);
              const cancelled = session.status === 'cancelled';

              return (
                <tr key={`print-${session.id}`}>
                  <td>{WEEKDAY_NAMES[day].full}</td>
                  <td>
                    {session.start}–{sessionEndClock(session)} ({session.durationMinutes} min)
                  </td>
                  <td>
                    {cancelled ? <s>{cls?.name ?? session.classId}</s> : cls?.name ?? session.classId}
                  </td>
                  <td>
                    {teacher?.name ?? session.teacherId}
                    {isCover ? ' (cover)' : ''}
                  </td>
                  <td>{rooms[session.room].name}</td>
                  <td>
                    {cancelled ? 'Cancelled' : ''}
                    {cancelled && session.note ? ' — ' : ''}
                    {session.note ?? ''}
                  </td>
                </tr>
              );
            }),
          )}
        </tbody>
      </table>
    </div>
  );
}
