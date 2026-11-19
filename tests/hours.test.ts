import assert from 'node:assert/strict';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import { DAYS, openingLabel, validateHours, type OpeningHours } from '../lib/hours.ts';

const hours: OpeningHours[] = DAYS.map((day) =>
  day === 'Monday' ? { day } : { day, opens: '09:00', closes: '17:00' },
);
const at = (date: string, zone = 'America/New_York') => openingLabel(hours, zone, new Date(date));

test('opening inclusive, closing exclusive; business zone wins over visitor zone', () => {
  assert.equal(at('2026-11-17T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z'), 'Open now · until 17:00');
  assert.equal(at('2026-11-17T22:00:00Z'), 'Closed · opens Wednesday at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z', 'Asia/Tokyo'), 'Closed · opens Wednesday at 09:00');
});

test('closed weekdays and week wrap find the next service', () => {
  assert.equal(at('2026-11-16T18:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(at('2026-11-15T23:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(openingLabel(DAYS.map((day) => ({ day })), 'UTC'), 'Closed · see opening hours');
});

test('missing/invalid zones stay neutral and DST changes preserve local service times', () => {
  assert.equal(at('2026-11-17T14:00:00Z', ''), 'See opening hours');
  assert.equal(at('2026-11-17T14:00:00Z', 'Mars/Base'), 'See opening hours');
  assert.equal(at('2026-03-08T12:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-03-08T13:00:00Z'), 'Open now · until 17:00');
  assert.equal(at('2026-11-01T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-11-01T14:00:00Z'), 'Open now · until 17:00');
});

test('Sunrise Lotus Yoga studio hours cover every weekday boundary and America/Los_Angeles DST', () => {
  const studioAt = (iso: string) => openingLabel(business.hours, 'America/Los_Angeles', new Date(iso));

  // Monday–Friday (06:00–20:30 PDT in June, UTC-7)
  // Monday 2026-06-08 through Friday 2026-06-12
  const weekdayDates = ['2026-06-08', '2026-06-09', '2026-06-10', '2026-06-11', '2026-06-12'];
  const nextDayNames = ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const nextOpens = ['06:00', '06:00', '06:00', '06:00', '07:00'];

  weekdayDates.forEach((date, i) => {
    assert.equal(studioAt(`${date}T12:59:00Z`), 'Closed · opens today at 06:00', `${date} 05:59 PDT`);
    assert.equal(studioAt(`${date}T13:00:00Z`), 'Open now · until 20:30', `${date} 06:00 PDT`);
    // 20:29 PDT = next day 03:29Z; 20:30 PDT = next day 03:30Z
    const nextDate = new Date(`${date}T00:00:00Z`);
    nextDate.setUTCDate(nextDate.getUTCDate() + 1);
    const nextIsoDay = nextDate.toISOString().slice(0, 10);
    assert.equal(studioAt(`${nextIsoDay}T03:29:00Z`), 'Open now · until 20:30', `${date} 20:29 PDT`);
    assert.equal(
      studioAt(`${nextIsoDay}T03:30:00Z`),
      `Closed · opens ${nextDayNames[i]} at ${nextOpens[i]}`,
      `${date} 20:30 PDT`,
    );
  });

  // Saturday 2026-06-13 (07:00–18:00 PDT, UTC-7)
  assert.equal(studioAt('2026-06-13T13:59:00Z'), 'Closed · opens today at 07:00');
  assert.equal(studioAt('2026-06-13T14:00:00Z'), 'Open now · until 18:00');
  assert.equal(studioAt('2026-06-14T00:59:00Z'), 'Open now · until 18:00');
  assert.equal(studioAt('2026-06-14T01:00:00Z'), 'Closed · opens Sunday at 07:30');

  // Sunday 2026-06-14 (07:30–13:00 PDT, UTC-7)
  assert.equal(studioAt('2026-06-14T14:29:00Z'), 'Closed · opens today at 07:30');
  assert.equal(studioAt('2026-06-14T14:30:00Z'), 'Open now · until 13:00');
  assert.equal(studioAt('2026-06-14T19:59:00Z'), 'Open now · until 13:00');
  assert.equal(studioAt('2026-06-14T20:00:00Z'), 'Closed · opens Monday at 06:00');

  // DST spring-forward Sunday 2026-03-08 (UTC-7 after 02:00): 07:30 PDT = 14:30Z, 13:00 PDT = 20:00Z
  assert.equal(studioAt('2026-03-08T14:29:00Z'), 'Closed · opens today at 07:30');
  assert.equal(studioAt('2026-03-08T14:30:00Z'), 'Open now · until 13:00');
  assert.equal(studioAt('2026-03-08T20:00:00Z'), 'Closed · opens Monday at 06:00');

  // DST fall-back Sunday 2026-11-01 (UTC-8 after 02:00): 07:30 PST = 15:30Z, 13:00 PST = 21:00Z
  assert.equal(studioAt('2026-11-01T15:29:00Z'), 'Closed · opens today at 07:30');
  assert.equal(studioAt('2026-11-01T15:30:00Z'), 'Open now · until 13:00');
  assert.equal(studioAt('2026-11-01T21:00:00Z'), 'Closed · opens Monday at 06:00');
});

test('invalid/incomplete/overnight intervals name the weekday to fix', () => {
  assert.doesNotThrow(() => validateHours(hours));
  for (const opens of ['24:00', '9:00', '18:00']) {
    assert.throws(
      () => validateHours(hours.map((x) => (x.day === 'Tuesday' ? { ...x, opens } : x))),
      /Tuesday/,
    );
  }
  assert.throws(() => validateHours(hours.slice(1)), /Monday/);
  assert.throws(
    () => validateHours(hours.map((x) => (x.day === 'Tuesday' ? { ...x, closes: undefined } : x))),
    /Tuesday/,
  );
});
