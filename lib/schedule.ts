import { business, type Business } from '../content/business.ts';
import { classStyles, PROP_IDS, type ClassStyle, type PropId } from '../content/classes.ts';
import { introOffer, passes, type IntroOffer, type PassOption } from '../content/pricing.ts';
import { MEDALLION_KEYS, teachers, type Teacher } from '../content/teachers.ts';
import {
  rooms,
  timetable,
  WEEKDAY_NAMES,
  WEEKDAYS,
  type RoomId,
  type StudioRoom,
  type TimetableSession,
  type Weekday,
} from '../content/timetable.ts';
import { DAYS, validateHours } from './hours.ts';

export type TimeOfDay = 'dawn' | 'midday' | 'evening';

export const SKY_START_MINUTES = 6 * 60; // 06:00
export const SKY_END_MINUTES = 21 * 60; // 21:00
export const SKY_SPAN_MINUTES = SKY_END_MINUTES - SKY_START_MINUTES; // 900 mins

const CLOCK_RE = /^([01]\d|2[0-3]):[0-5]\d$/;
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const WEEKDAY_LONG_TO_KEY: Record<string, Weekday> = {
  Monday: 'mon',
  Tuesday: 'tue',
  Wednesday: 'wed',
  Thursday: 'thu',
  Friday: 'fri',
  Saturday: 'sat',
  Sunday: 'sun',
};

/** Parse an `HH:MM` 24-hour string into minutes since midnight. */
export function parseClockMinutes(clock: string): number {
  if (!CLOCK_RE.test(clock)) throw new Error(`Invalid clock time: ${clock}`);
  return Number(clock.slice(0, 2)) * 60 + Number(clock.slice(3, 5));
}

/** Format minutes since midnight as `HH:MM`. */
export function formatMinutesAsClock(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

/** End time of a session in `HH:MM`. */
export function sessionEndClock(session: Pick<TimetableSession, 'start' | 'durationMinutes'>): string {
  return formatMinutesAsClock(parseClockMinutes(session.start) + session.durationMinutes);
}

/** Classify a start time (`HH:MM`) into Dawn (<09:00), Midday (09:00–16:59) or Evening (17:00+). */
export function timeOfDayBucket(start: string): TimeOfDay {
  const mins = parseClockMinutes(start);
  if (mins < 9 * 60) return 'dawn';
  if (mins < 17 * 60) return 'midday';
  return 'evening';
}

/** Position percentage (0–100) along the 06:00–21:00 sun-arc axis. */
export function skyPercent(minutes: number): number {
  return Math.max(0, Math.min(100, ((minutes - SKY_START_MINUTES) / SKY_SPAN_MINUTES) * 100));
}

/** Width percentage along the 06:00–21:00 sun-arc axis. */
export function skyWidthPercent(durationMinutes: number): number {
  return Math.max(0, Math.min(100, (durationMinutes / SKY_SPAN_MINUTES) * 100));
}

/** Current local weekday and minute-of-day in the given IANA time zone. */
export function zonedNow(timeZone: string, now = new Date()): { day: Weekday; dayIndex: number; minutes: number } | null {
  if (!timeZone) return null;
  let parts: Intl.DateTimeFormatPart[];
  try {
    parts = new Intl.DateTimeFormat('en-US', {
      timeZone,
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      hourCycle: 'h23',
    }).formatToParts(now);
  } catch {
    return null;
  }
  const part = (type: string) => parts.find((entry) => entry.type === type)?.value ?? '';
  const day = WEEKDAY_LONG_TO_KEY[part('weekday')];
  if (!day) return null;
  const hour = Number(part('hour')) % 24;
  const minute = Number(part('minute'));
  return {
    day,
    dayIndex: WEEKDAYS.indexOf(day),
    minutes: hour * 60 + minute,
  };
}

export interface NextClassResult {
  session: TimetableSession;
  /** Relative day wording for UI: `'today'`, `'tomorrow'`, or the weekday name. */
  whenLabel: string;
  /** Number of calendar days ahead (0 = today, 1 = tomorrow, up to 7). */
  dayOffset: number;
}

/**
 * Find the next scheduled (non-cancelled) session at or after the current minute in `timeZone`.
 * Wraps cleanly from Sunday evening into Monday morning.
 */
export function findNextSession(
  sessions: readonly TimetableSession[],
  timeZone: string,
  now = new Date(),
): NextClassResult | null {
  const current = zonedNow(timeZone, now);
  if (!current) return null;
  const active = sessions.filter((s) => s.status === 'scheduled');
  if (active.length === 0) return null;

  let best: { session: TimetableSession; deltaMinutes: number; dayOffset: number } | null = null;

  for (const session of active) {
    const sessionDayIndex = WEEKDAYS.indexOf(session.day);
    if (sessionDayIndex < 0) continue;
    const sessionMinutes = parseClockMinutes(session.start);

    let dayOffset = (sessionDayIndex - current.dayIndex + 7) % 7;
    if (dayOffset === 0 && sessionMinutes < current.minutes) {
      dayOffset = 7;
    }
    const deltaMinutes = dayOffset * 1440 + (sessionMinutes - current.minutes);
    if (!best || deltaMinutes < best.deltaMinutes) {
      best = { session, deltaMinutes, dayOffset };
    }
  }

  if (!best) return null;
  const whenLabel =
    best.dayOffset === 0
      ? 'today'
      : best.dayOffset === 1
        ? 'tomorrow'
        : WEEKDAY_NAMES[best.session.day].full;

  return { session: best.session, whenLabel, dayOffset: best.dayOffset };
}

/** Return the active teacher ID for a session (cover teacher if set, else regular teacher). */
export function activeTeacherId(session: TimetableSession): string {
  return session.coverTeacherId ?? session.teacherId;
}

/** Sessions on a given weekday sorted chronologically. */
export function sessionsForDay(day: Weekday, sessions: readonly TimetableSession[] = timetable): TimetableSession[] {
  return sessions
    .filter((s) => s.day === day)
    .sort((a, b) => parseClockMinutes(a.start) - parseClockMinutes(b.start));
}

/** Sessions for a given class style sorted by weekday then start time. */
export function sessionsForClass(classId: string, sessions: readonly TimetableSession[] = timetable): TimetableSession[] {
  return sessions
    .filter((s) => s.classId === classId)
    .sort((a, b) => {
      const dayDiff = WEEKDAYS.indexOf(a.day) - WEEKDAYS.indexOf(b.day);
      return dayDiff !== 0 ? dayDiff : parseClockMinutes(a.start) - parseClockMinutes(b.start);
    });
}

/** Distinct teachers who lead a given class style (derived from regular or cover slots). */
export function teachersForClass(
  classId: string,
  sessions: readonly TimetableSession[] = timetable,
  allTeachers: readonly Teacher[] = teachers,
): Teacher[] {
  const ids = new Set<string>();
  for (const s of sessions) {
    if (s.classId === classId) {
      ids.add(s.teacherId);
      if (s.coverTeacherId) ids.add(s.coverTeacherId);
    }
  }
  return allTeachers.filter((t) => ids.has(t.id));
}

/** Distinct class styles led by a teacher (derived from the timetable, not stored on teacher). */
export function classesForTeacher(
  teacherId: string,
  sessions: readonly TimetableSession[] = timetable,
  allClasses: readonly ClassStyle[] = classStyles,
): ClassStyle[] {
  const ids = new Set<string>();
  for (const s of sessions) {
    if (s.teacherId === teacherId || s.coverTeacherId === teacherId) {
      ids.add(s.classId);
    }
  }
  return allClasses.filter((c) => ids.has(c.id));
}

export interface StudioDataset {
  business: Business;
  classes: readonly ClassStyle[];
  teachers: readonly Teacher[];
  sessions: readonly TimetableSession[];
  rooms: Record<RoomId, StudioRoom>;
  introOffer: IntroOffer;
  passes: readonly PassOption[];
}

function assertUniqueSlugIds(kind: string, items: readonly { id: string }[]): Set<string> {
  const seen = new Set<string>();
  for (const item of items) {
    if (!item.id || !SLUG_RE.test(item.id)) {
      throw new Error(`${kind} "${item.id}": id must be lowercase and URL-safe`);
    }
    if (seen.has(item.id)) {
      throw new Error(`${kind} "${item.id}": duplicate id`);
    }
    seen.add(item.id);
  }
  return seen;
}

function assertWholePositivePrice(label: string, price: number): void {
  if (typeof price !== 'number' || !Number.isInteger(price) || price <= 0) {
    throw new Error(`${label}: price must be a positive whole dollar amount (got ${price})`);
  }
}

/**
 * Validate all studio content collections and cross-references.
 * Throws an actionable, item-specific error for any broken owner edit.
 */
export function validateStudioContent(data: StudioDataset = {
  business,
  classes: classStyles,
  teachers,
  sessions: timetable,
  rooms,
  introOffer,
  passes,
}): void {
  // Business & hours
  for (const key of ['name', 'tagline', 'introduction', 'metaDescription', 'email'] as const) {
    if (!data.business[key].trim()) throw new Error(`business.${key}: required`);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.business.email)) {
    throw new Error(`business.email "${data.business.email}": valid public email required`);
  }
  if (!data.business.address.formatted.trim()) throw new Error('business.address.formatted: required');
  if (!data.business.enquiries.title.trim()) throw new Error('business.enquiries.title: required');
  if (!data.business.enquiries.introduction.trim()) throw new Error('business.enquiries.introduction: required');
  if (!data.business.enquiries.usefulToInclude.length) throw new Error('business.enquiries.usefulToInclude: required');
  validateHours(data.business.hours);

  // Classes
  const classIds = assertUniqueSlugIds('class', data.classes);
  const validProps = new Set<string>(PROP_IDS);
  for (const cls of data.classes) {
    if (!cls.name.trim()) throw new Error(`class "${cls.id}": name is required`);
    if (!cls.summary.trim()) throw new Error(`class "${cls.id}": summary is required`);
    if (!cls.description.trim()) throw new Error(`class "${cls.id}": description is required`);
    if (!Number.isInteger(cls.intensity) || cls.intensity < 1 || cls.intensity > 3) {
      throw new Error(`class "${cls.id}": intensity must be 1, 2 or 3 (got ${cls.intensity})`);
    }
    if (!Number.isInteger(cls.durationMinutes) || cls.durationMinutes < 30 || cls.durationMinutes > 120) {
      throw new Error(`class "${cls.id}": durationMinutes must be between 30 and 120 (got ${cls.durationMinutes})`);
    }
    for (const prop of cls.props) {
      if (!validProps.has(prop as PropId)) {
        throw new Error(`class "${cls.id}": unknown prop "${prop}"`);
      }
    }
  }

  // Teachers
  const teacherIds = assertUniqueSlugIds('teacher', data.teachers);
  const validMedallions = new Set<string>(MEDALLION_KEYS);
  for (const teacher of data.teachers) {
    if (!teacher.name.trim()) throw new Error(`teacher "${teacher.id}": name is required`);
    if (!teacher.role.trim()) throw new Error(`teacher "${teacher.id}": role is required`);
    if (!teacher.bio.trim()) throw new Error(`teacher "${teacher.id}": bio is required`);
    if (!teacher.training.trim()) throw new Error(`teacher "${teacher.id}": training is required`);
    if (!teacher.favouritePose.trim()) throw new Error(`teacher "${teacher.id}": favouritePose is required`);
    if (!validMedallions.has(teacher.medallion)) {
      throw new Error(`teacher "${teacher.id}": unknown medallion colour "${teacher.medallion}"`);
    }
  }

  // Rooms
  const roomIds = new Set<string>(Object.keys(data.rooms));
  for (const [key, room] of Object.entries(data.rooms)) {
    if (room.id !== key) throw new Error(`room "${key}": mismatched id "${room.id}"`);
    if (!Number.isInteger(room.capacity) || room.capacity <= 0) {
      throw new Error(`room "${key}": capacity must be a positive whole number`);
    }
  }

  // Timetable sessions
  assertUniqueSlugIds('session', data.sessions);
  const hoursByWeekday = new Map<Weekday, { opens: number; closes: number }>();
  for (let i = 0; i < WEEKDAYS.length; i++) {
    const weekdayKey = WEEKDAYS[i];
    const entry = data.business.hours.find((h) => h.day === DAYS[i]);
    if (entry?.opens && entry.closes) {
      hoursByWeekday.set(weekdayKey, {
        opens: parseClockMinutes(entry.opens),
        closes: parseClockMinutes(entry.closes),
      });
    }
  }

  const usedClasses = new Set<string>();
  const usedTeachers = new Set<string>();
  const intervalsByDayRoom = new Map<string, Array<{ id: string; start: number; end: number }>>();

  for (const session of data.sessions) {
    if (!WEEKDAYS.includes(session.day)) {
      throw new Error(`session "${session.id}": invalid day "${session.day}"`);
    }
    if (!CLOCK_RE.test(session.start)) {
      throw new Error(`session "${session.id}": invalid start time "${session.start}"`);
    }
    if (!Number.isInteger(session.durationMinutes) || session.durationMinutes < 30 || session.durationMinutes > 120) {
      throw new Error(`session "${session.id}": durationMinutes must be between 30 and 120 (got ${session.durationMinutes})`);
    }
    if (!classIds.has(session.classId)) {
      throw new Error(`session "${session.id}": unknown classId "${session.classId}"`);
    }
    if (!teacherIds.has(session.teacherId)) {
      throw new Error(`session "${session.id}": unknown teacherId "${session.teacherId}"`);
    }
    if (session.coverTeacherId !== undefined) {
      if (!teacherIds.has(session.coverTeacherId)) {
        throw new Error(`session "${session.id}": unknown coverTeacherId "${session.coverTeacherId}"`);
      }
      if (session.coverTeacherId === session.teacherId) {
        throw new Error(`session "${session.id}": coverTeacherId "${session.coverTeacherId}" cannot equal teacherId`);
      }
    }
    if (!roomIds.has(session.room)) {
      throw new Error(`session "${session.id}": unknown room "${session.room}"`);
    }
    if (session.status !== 'scheduled' && session.status !== 'cancelled') {
      throw new Error(`session "${session.id}": invalid status "${session.status}"`);
    }

    const startMin = parseClockMinutes(session.start);
    const endMin = startMin + session.durationMinutes;
    const dayHours = hoursByWeekday.get(session.day);
    if (!dayHours) {
      throw new Error(`session "${session.id}": studio is closed on ${WEEKDAY_NAMES[session.day].full}`);
    }
    if (startMin < dayHours.opens || endMin > dayHours.closes) {
      throw new Error(
        `session "${session.id}": ${session.start}–${formatMinutesAsClock(endMin)} falls outside ${WEEKDAY_NAMES[session.day].full} opening hours (${formatMinutesAsClock(dayHours.opens)}–${formatMinutesAsClock(dayHours.closes)})`,
      );
    }

    const bucketKey = `${session.day}:${session.room}`;
    const existing = intervalsByDayRoom.get(bucketKey) ?? [];
    for (const other of existing) {
      if (startMin < other.end && endMin > other.start) {
        throw new Error(
          `session "${session.id}": overlaps with "${other.id}" in room "${session.room}" on ${WEEKDAY_NAMES[session.day].full}`,
        );
      }
    }
    existing.push({ id: session.id, start: startMin, end: endMin });
    intervalsByDayRoom.set(bucketKey, existing);

    usedClasses.add(session.classId);
    usedTeachers.add(session.teacherId);
    if (session.coverTeacherId) usedTeachers.add(session.coverTeacherId);
  }

  for (const cls of data.classes) {
    if (!usedClasses.has(cls.id)) {
      throw new Error(`class "${cls.id}": unused by the timetable`);
    }
  }
  for (const teacher of data.teachers) {
    if (!usedTeachers.has(teacher.id)) {
      throw new Error(`teacher "${teacher.id}": leads no session on the timetable`);
    }
  }

  // Pricing
  if (!data.introOffer.id || !SLUG_RE.test(data.introOffer.id)) {
    throw new Error(`introOffer "${data.introOffer.id}": id must be lowercase and URL-safe`);
  }
  assertWholePositivePrice(`introOffer "${data.introOffer.id}"`, data.introOffer.price);
  if (!Number.isInteger(data.introOffer.days) || data.introOffer.days <= 0) {
    throw new Error(`introOffer "${data.introOffer.id}": days must be a positive whole number`);
  }
  if (!data.introOffer.terms.length) {
    throw new Error(`introOffer "${data.introOffer.id}": terms are required`);
  }

  assertUniqueSlugIds('pass', data.passes);
  for (const pass of data.passes) {
    if (!pass.name.trim()) throw new Error(`pass "${pass.id}": name is required`);
    if (!pass.detail.trim()) throw new Error(`pass "${pass.id}": detail is required`);
    assertWholePositivePrice(`pass "${pass.id}"`, pass.price);
  }

  const monthly = data.passes.find((p) => p.id === 'monthly-unlimited');
  if (!monthly) {
    throw new Error('passes: expected a "monthly-unlimited" pass');
  }
  if (data.introOffer.price >= monthly.price) {
    throw new Error(
      `introOffer "${data.introOffer.id}": price ($${data.introOffer.price}) must be below monthly-unlimited ($${monthly.price})`,
    );
  }
}
