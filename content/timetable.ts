/** Ordered weekday keys matching the recurring weekly timetable. */
export const WEEKDAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;

export type Weekday = (typeof WEEKDAYS)[number];

export const WEEKDAY_NAMES: Record<Weekday, { short: string; full: string }> = {
  mon: { short: 'Mon', full: 'Monday' },
  tue: { short: 'Tue', full: 'Tuesday' },
  wed: { short: 'Wed', full: 'Wednesday' },
  thu: { short: 'Thu', full: 'Thursday' },
  fri: { short: 'Fri', full: 'Friday' },
  sat: { short: 'Sat', full: 'Saturday' },
  sun: { short: 'Sun', full: 'Sunday' },
};

export type RoomId = 'sunroom' | 'lotus-room';

export interface StudioRoom {
  id: RoomId;
  name: string;
  capacity: number;
  description: string;
}

/** The studio's two practice rooms and their mat capacities. */
export const rooms: Record<RoomId, StudioRoom> = {
  sunroom: {
    id: 'sunroom',
    name: 'Sunroom',
    capacity: 18,
    description: 'East-facing main room overlooking the trees toward Lake Merritt.',
  },
  'lotus-room': {
    id: 'lotus-room',
    name: 'Lotus Room',
    capacity: 12,
    description: 'Smaller, quieter inner room set up for prenatal, chair, nidra and breathwork.',
  },
};

export type SessionStatus = 'scheduled' | 'cancelled';

export interface TimetableSession {
  /** Stable URL-safe identifier in the form `<day>-<HHMM>-<classId>`. */
  id: string;
  /** Recurring weekday (`mon`–`sun`). */
  day: Weekday;
  /** 24-hour local start time (`HH:MM`) in `America/Los_Angeles`. */
  start: string;
  /** Session duration in minutes (30–120). */
  durationMinutes: number;
  /** Reference to a class style in `content/classes.ts`. */
  classId: string;
  /** Reference to the regular teacher in `content/teachers.ts`. */
  teacherId: string;
  /** Practice room (`sunroom` or `lotus-room`). */
  room: RoomId;
  /** Set to `'cancelled'` with an optional `note` to strike through a session and skip it in Next Class. */
  status: SessionStatus;
  /** Optional substitute teacher ID (must differ from `teacherId`). */
  coverTeacherId?: string;
  /** Optional short public note shown on the timetable tile. */
  note?: string;
  /** Marks the $12 community class. */
  community?: boolean;
}

/** Public notice printed beneath the recurring weekly schedule. */
export const timetableNotice =
  'The timetable runs every week except the studio’s two rest weeks, which are posted here a month ahead.';

/**
 * Recurring weekly timetable.
 * Owner quick-edit guide:
 * - Cover teacher: add `coverTeacherId` and `note` to a session.
 * - Cancel a session: change `status: 'scheduled'` to `status: 'cancelled'` and add a `note`.
 * - Add a session: follow `<day>-<HHMM>-<classId>` within the day's opening hours and without room overlap.
 */
export const timetable: readonly TimetableSession[] = [
  // Monday
  { id: 'mon-0630-sunrise-flow', day: 'mon', start: '06:30', durationMinutes: 60, classId: 'sunrise-flow', teacherId: 'maya-okafor', room: 'sunroom', status: 'scheduled' },
  { id: 'mon-0930-gentle-hatha', day: 'mon', start: '09:30', durationMinutes: 75, classId: 'gentle-hatha', teacherId: 'priya-nair', room: 'sunroom', status: 'scheduled' },
  { id: 'mon-1215-breathwork', day: 'mon', start: '12:15', durationMinutes: 30, classId: 'breathwork', teacherId: 'theo-lindqvist', room: 'lotus-room', status: 'scheduled' },
  { id: 'mon-1730-slow-flow', day: 'mon', start: '17:30', durationMinutes: 60, classId: 'slow-flow', teacherId: 'daniel-reyes', room: 'sunroom', status: 'scheduled' },
  { id: 'mon-1900-yin', day: 'mon', start: '19:00', durationMinutes: 75, classId: 'yin', teacherId: 'hana-sato', room: 'sunroom', status: 'scheduled' },

  // Tuesday
  { id: 'tue-0630-sunrise-flow', day: 'tue', start: '06:30', durationMinutes: 60, classId: 'sunrise-flow', teacherId: 'daniel-reyes', room: 'sunroom', status: 'scheduled' },
  { id: 'tue-1000-chair-yoga', day: 'tue', start: '10:00', durationMinutes: 45, classId: 'chair-yoga', teacherId: 'elena-brooks', room: 'lotus-room', status: 'scheduled' },
  { id: 'tue-1215-slow-flow', day: 'tue', start: '12:15', durationMinutes: 45, classId: 'slow-flow', teacherId: 'priya-nair', room: 'sunroom', status: 'scheduled' },
  { id: 'tue-1745-prenatal', day: 'tue', start: '17:45', durationMinutes: 60, classId: 'prenatal', teacherId: 'elena-brooks', room: 'lotus-room', status: 'scheduled' },
  { id: 'tue-1900-restorative', day: 'tue', start: '19:00', durationMinutes: 75, classId: 'restorative', teacherId: 'hana-sato', room: 'sunroom', status: 'scheduled' },

  // Wednesday
  { id: 'wed-0630-sunrise-flow', day: 'wed', start: '06:30', durationMinutes: 60, classId: 'sunrise-flow', teacherId: 'maya-okafor', room: 'sunroom', status: 'scheduled' },
  { id: 'wed-0930-gentle-hatha', day: 'wed', start: '09:30', durationMinutes: 75, classId: 'gentle-hatha', teacherId: 'daniel-reyes', room: 'sunroom', status: 'scheduled' },
  { id: 'wed-1215-breathwork', day: 'wed', start: '12:15', durationMinutes: 30, classId: 'breathwork', teacherId: 'theo-lindqvist', room: 'lotus-room', status: 'scheduled' },
  { id: 'wed-1730-slow-flow', day: 'wed', start: '17:30', durationMinutes: 60, classId: 'slow-flow', teacherId: 'priya-nair', room: 'sunroom', status: 'scheduled' },
  { id: 'wed-1900-yoga-nidra', day: 'wed', start: '19:00', durationMinutes: 45, classId: 'yoga-nidra', teacherId: 'theo-lindqvist', room: 'lotus-room', status: 'scheduled' },

  // Thursday
  { id: 'thu-0630-sunrise-flow', day: 'thu', start: '06:30', durationMinutes: 60, classId: 'sunrise-flow', teacherId: 'daniel-reyes', room: 'sunroom', status: 'scheduled' },
  { id: 'thu-1000-chair-yoga', day: 'thu', start: '10:00', durationMinutes: 45, classId: 'chair-yoga', teacherId: 'elena-brooks', room: 'lotus-room', status: 'scheduled' },
  {
    id: 'thu-1215-slow-flow',
    day: 'thu',
    start: '12:15',
    durationMinutes: 45,
    classId: 'slow-flow',
    teacherId: 'maya-okafor',
    coverTeacherId: 'priya-nair',
    note: 'Priya covers while Maya is on retreat',
    room: 'sunroom',
    status: 'scheduled',
  },
  { id: 'thu-1745-prenatal', day: 'thu', start: '17:45', durationMinutes: 60, classId: 'prenatal', teacherId: 'elena-brooks', room: 'lotus-room', status: 'scheduled' },
  { id: 'thu-1900-yin', day: 'thu', start: '19:00', durationMinutes: 75, classId: 'yin', teacherId: 'hana-sato', room: 'sunroom', status: 'scheduled' },

  // Friday
  { id: 'fri-0630-sunrise-flow', day: 'fri', start: '06:30', durationMinutes: 60, classId: 'sunrise-flow', teacherId: 'maya-okafor', room: 'sunroom', status: 'scheduled' },
  { id: 'fri-0930-gentle-hatha', day: 'fri', start: '09:30', durationMinutes: 75, classId: 'gentle-hatha', teacherId: 'priya-nair', room: 'sunroom', status: 'scheduled' },
  { id: 'fri-1730-restorative', day: 'fri', start: '17:30', durationMinutes: 75, classId: 'restorative', teacherId: 'hana-sato', room: 'sunroom', status: 'scheduled' },

  // Saturday
  { id: 'sat-0730-sunrise-flow', day: 'sat', start: '07:30', durationMinutes: 75, classId: 'sunrise-flow', teacherId: 'maya-okafor', room: 'sunroom', status: 'scheduled' },
  { id: 'sat-0930-gentle-hatha', day: 'sat', start: '09:30', durationMinutes: 75, classId: 'gentle-hatha', teacherId: 'daniel-reyes', room: 'sunroom', status: 'scheduled' },
  { id: 'sat-1100-prenatal', day: 'sat', start: '11:00', durationMinutes: 60, classId: 'prenatal', teacherId: 'elena-brooks', room: 'lotus-room', status: 'scheduled' },
  { id: 'sat-1600-yin', day: 'sat', start: '16:00', durationMinutes: 75, classId: 'yin', teacherId: 'hana-sato', room: 'sunroom', status: 'scheduled' },

  // Sunday
  {
    id: 'sun-0800-slow-flow',
    day: 'sun',
    start: '08:00',
    durationMinutes: 60,
    classId: 'slow-flow',
    teacherId: 'theo-lindqvist',
    room: 'sunroom',
    status: 'scheduled',
    community: true,
    note: 'Community class, $12',
  },
  { id: 'sun-0930-restorative', day: 'sun', start: '09:30', durationMinutes: 75, classId: 'restorative', teacherId: 'priya-nair', room: 'sunroom', status: 'scheduled' },
  { id: 'sun-1115-yoga-nidra', day: 'sun', start: '11:15', durationMinutes: 45, classId: 'yoga-nidra', teacherId: 'hana-sato', room: 'lotus-room', status: 'scheduled' },
];
