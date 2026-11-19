import assert from 'node:assert/strict';
import { test } from 'node:test';
import { timetable } from '../content/timetable.ts';
import {
  classesForTeacher,
  findNextSession,
  teachersForClass,
  timeOfDayBucket,
} from '../lib/schedule.ts';

const ZONE = 'America/Los_Angeles';

test('findNextSession finds a mid-week session in Pacific Time', () => {
  // Wednesday 2026-06-10 08:00 PDT (UTC-7 -> 15:00Z)
  const next = findNextSession(timetable, ZONE, new Date('2026-06-10T15:00:00Z'));
  assert.ok(next);
  assert.equal(next.session.id, 'wed-0930-gentle-hatha');
  assert.equal(next.whenLabel, 'today');
});

test('findNextSession wraps from after the last Sunday class to Monday 06:30', () => {
  // Sunday 2026-06-14 11:16 PDT (UTC-7 -> 18:16Z), right after Sunday 11:15 Yoga Nidra
  const next = findNextSession(timetable, ZONE, new Date('2026-06-14T18:16:00Z'));
  assert.ok(next);
  assert.equal(next.session.id, 'mon-0630-sunrise-flow');
  assert.equal(next.session.start, '06:30');
  assert.equal(next.whenLabel, 'tomorrow');
});

test('findNextSession includes a session starting at the exact current minute', () => {
  // Monday 2026-06-15 06:30 PDT (UTC-7 -> 13:30Z)
  const next = findNextSession(timetable, ZONE, new Date('2026-06-15T13:30:00Z'));
  assert.ok(next);
  assert.equal(next.session.id, 'mon-0630-sunrise-flow');
  assert.equal(next.whenLabel, 'today');
});

test('findNextSession skips cancelled sessions', () => {
  const modified = timetable.map((s) =>
    s.id === 'thu-1900-yin' ? { ...s, status: 'cancelled' as const, note: 'Cancelled for rest' } : s,
  );
  // Thursday 2026-06-11 18:30 PDT (UTC-7 -> 2026-06-12T01:30:00Z)
  const next = findNextSession(modified, ZONE, new Date('2026-06-12T01:30:00Z'));
  assert.ok(next);
  assert.equal(next.session.id, 'fri-0630-sunrise-flow');
  assert.equal(next.whenLabel, 'tomorrow');
});

test('findNextSession respects America/Los_Angeles DST spring-forward on 2026-03-08', () => {
  // 2026-03-08 02:00 PST jumps to 03:00 PDT (UTC-7).
  // 07:59 PDT = 14:59Z -> Sunday 08:00 Slow Flow
  const before = findNextSession(timetable, ZONE, new Date('2026-03-08T14:59:00Z'));
  assert.ok(before);
  assert.equal(before.session.id, 'sun-0800-slow-flow');
  assert.equal(before.whenLabel, 'today');

  // 08:01 PDT = 15:01Z -> Sunday 09:30 Restorative
  const after = findNextSession(timetable, ZONE, new Date('2026-03-08T15:01:00Z'));
  assert.ok(after);
  assert.equal(after.session.id, 'sun-0930-restorative');
  assert.equal(after.whenLabel, 'today');
});

test('findNextSession respects America/Los_Angeles DST fall-back on 2026-11-01', () => {
  // 2026-11-01 02:00 PDT falls back to 01:00 PST (UTC-8).
  // 07:59 PST = 15:59Z -> Sunday 08:00 Slow Flow
  const before = findNextSession(timetable, ZONE, new Date('2026-11-01T15:59:00Z'));
  assert.ok(before);
  assert.equal(before.session.id, 'sun-0800-slow-flow');
  assert.equal(before.whenLabel, 'today');

  // 08:01 PST = 16:01Z -> Sunday 09:30 Restorative
  const after = findNextSession(timetable, ZONE, new Date('2026-11-01T16:01:00Z'));
  assert.ok(after);
  assert.equal(after.session.id, 'sun-0930-restorative');
  assert.equal(after.whenLabel, 'today');
});

test('timeOfDayBucket classifies Dawn (<09:00), Midday (09:00-16:59) and Evening (17:00+)', () => {
  assert.equal(timeOfDayBucket('06:30'), 'dawn');
  assert.equal(timeOfDayBucket('08:59'), 'dawn');
  assert.equal(timeOfDayBucket('09:00'), 'midday');
  assert.equal(timeOfDayBucket('16:59'), 'midday');
  assert.equal(timeOfDayBucket('17:00'), 'evening');
  assert.equal(timeOfDayBucket('19:00'), 'evening');
});

test('teacher and class relationships are derived from the timetable', () => {
  const elenaClasses = classesForTeacher('elena-brooks').map((c) => c.id);
  assert.deepEqual(elenaClasses, ['prenatal', 'chair-yoga']);

  const sunriseTeachers = teachersForClass('sunrise-flow').map((t) => t.id);
  assert.deepEqual(sunriseTeachers, ['maya-okafor', 'daniel-reyes']);
});
