import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import { classStyles, type PropId } from '../content/classes.ts';
import { frontDeskRule, introOffer, passes } from '../content/pricing.ts';
import { teachers } from '../content/teachers.ts';
import { rooms, timetable, type RoomId, type TimetableSession } from '../content/timetable.ts';
import { validateStudioContent, type StudioDataset } from '../lib/schedule.ts';
import { businessStructuredData, jsonLd } from '../lib/structured-data.ts';

type MutableDataset = {
  [K in keyof StudioDataset]: StudioDataset[K] extends readonly (infer T)[] ? T[] : StudioDataset[K];
};

function baseData(): MutableDataset {
  return {
    business,
    classes: [...classStyles],
    teachers: [...teachers],
    sessions: timetable.map((s) => ({ ...s })),
    rooms: { ...rooms },
    introOffer: { ...introOffer },
    passes: passes.map((p) => ({ ...p })),
  };
}

test('studio content passes full validation', () => {
  assert.doesNotThrow(() => validateStudioContent(baseData()));
});

test('non-unique or non-URL-safe IDs fail with item-specific errors', () => {
  const dupClass = baseData();
  dupClass.classes = [...dupClass.classes, { ...dupClass.classes[0] }];
  assert.throws(() => validateStudioContent(dupClass), /class "sunrise-flow": duplicate id/);

  const badTeacher = baseData();
  badTeacher.teachers = badTeacher.teachers.map((t, i) => (i === 0 ? { ...t, id: 'Maya Okafor!' } : t));
  assert.throws(() => validateStudioContent(badTeacher), /teacher "Maya Okafor!": id must be lowercase and URL-safe/);

  const dupSession = baseData();
  dupSession.sessions = [...dupSession.sessions, { ...dupSession.sessions[0] }];
  assert.throws(() => validateStudioContent(dupSession), /session "mon-0630-sunrise-flow": duplicate id/);
});

test('unknown classId, teacherId, coverTeacherId or room fails with item-specific error', () => {
  const badClassRef = baseData();
  badClassRef.sessions[0] = { ...badClassRef.sessions[0], classId: 'hot-power' };
  assert.throws(() => validateStudioContent(badClassRef), /mon-0630-sunrise-flow.*unknown classId "hot-power"/);

  const badTeacherRef = baseData();
  badTeacherRef.sessions[0] = { ...badTeacherRef.sessions[0], teacherId: 'unknown-teacher' };
  assert.throws(() => validateStudioContent(badTeacherRef), /mon-0630-sunrise-flow.*unknown teacherId "unknown-teacher"/);

  const badCoverRef = baseData();
  badCoverRef.sessions[0] = { ...badCoverRef.sessions[0], coverTeacherId: 'ghost-cover' };
  assert.throws(() => validateStudioContent(badCoverRef), /mon-0630-sunrise-flow.*unknown coverTeacherId "ghost-cover"/);

  const badRoom = baseData();
  badRoom.sessions[0] = { ...badRoom.sessions[0], room: 'courtyard' as RoomId };
  assert.throws(() => validateStudioContent(badRoom), /mon-0630-sunrise-flow.*unknown room "courtyard"/);
});

test('coverTeacherId equal to teacherId fails with item-specific error', () => {
  const data = baseData();
  data.sessions[0] = { ...data.sessions[0], coverTeacherId: data.sessions[0].teacherId };
  assert.throws(() => validateStudioContent(data), /mon-0630-sunrise-flow.*cannot equal teacherId/);
});

test('sessions outside day opening or closing hours fail with item-specific error', () => {
  const tooEarly = baseData();
  tooEarly.sessions[0] = { ...tooEarly.sessions[0], start: '05:45' };
  assert.throws(() => validateStudioContent(tooEarly), /mon-0630-sunrise-flow.*outside Monday opening hours/);

  const tooLate = baseData();
  // Sunday closes at 13:00; 12:15 + 60m = 13:15
  const sunIdx = tooLate.sessions.findIndex((s) => s.id === 'sun-1115-yoga-nidra');
  tooLate.sessions[sunIdx] = { ...tooLate.sessions[sunIdx], start: '12:15', durationMinutes: 60 };
  assert.throws(() => validateStudioContent(tooLate), /sun-1115-yoga-nidra.*outside Sunday opening hours/);
});

test('overlapping sessions in the same room fail with item-specific error', () => {
  const data = baseData();
  const overlap: TimetableSession = {
    id: 'mon-0700-slow-flow',
    day: 'mon',
    start: '07:00',
    durationMinutes: 45,
    classId: 'slow-flow',
    teacherId: 'daniel-reyes',
    room: 'sunroom',
    status: 'scheduled',
  };
  data.sessions.push(overlap);
  assert.throws(() => validateStudioContent(data), /mon-0700-slow-flow.*overlaps with "mon-0630-sunrise-flow"/);
});

test('durations outside 30-120 and intensities outside 1-3 fail', () => {
  const shortSession = baseData();
  shortSession.sessions[0] = { ...shortSession.sessions[0], durationMinutes: 20 };
  assert.throws(() => validateStudioContent(shortSession), /mon-0630-sunrise-flow.*between 30 and 120/);

  const longSession = baseData();
  longSession.sessions[0] = { ...longSession.sessions[0], durationMinutes: 135 };
  assert.throws(() => validateStudioContent(longSession), /mon-0630-sunrise-flow.*between 30 and 120/);

  const badIntensity = baseData();
  badIntensity.classes[0] = { ...badIntensity.classes[0], intensity: 4 as 1 | 2 | 3 };
  assert.throws(() => validateStudioContent(badIntensity), /class "sunrise-flow".*intensity must be 1, 2 or 3/);
});

test('unused class styles or teachers with no sessions fail', () => {
  const unusedClass = baseData();
  unusedClass.sessions = unusedClass.sessions.filter((s) => s.classId !== 'breathwork');
  assert.throws(() => validateStudioContent(unusedClass), /class "breathwork": unused by the timetable/);

  const unusedTeacher = baseData();
  unusedTeacher.sessions = unusedTeacher.sessions.map((s) =>
    s.teacherId === 'elena-brooks' ? { ...s, teacherId: 'maya-okafor' } : s,
  );
  assert.throws(() => validateStudioContent(unusedTeacher), /teacher "elena-brooks": leads no session/);
});

test('prices must be positive whole dollars and intro offer must be below monthly unlimited', () => {
  const fractional = baseData();
  fractional.passes[0] = { ...fractional.passes[0], price: 26.5 };
  assert.throws(() => validateStudioContent(fractional), /pass "drop-in".*positive whole dollar/);

  const zeroPrice = baseData();
  zeroPrice.introOffer.price = 0;
  assert.throws(() => validateStudioContent(zeroPrice), /introOffer "sunrise-fortnight".*positive whole dollar/);

  const tooHighIntro = baseData();
  tooHighIntro.introOffer.price = 149;
  assert.throws(() => validateStudioContent(tooHighIntro), /introOffer "sunrise-fortnight".*below monthly-unlimited/);
});

test('unknown prop IDs fail with item-specific error', () => {
  const badProp = baseData();
  badProp.classes[0] = { ...badProp.classes[0], props: ['mat', 'hammock' as PropId] };
  assert.throws(() => validateStudioContent(badProp), /class "sunrise-flow": unknown prop "hammock"/);
});

test('cancelling Thursday 19:00 Yin keeps content validation passing', () => {
  const data = baseData();
  const idx = data.sessions.findIndex((s) => s.id === 'thu-1900-yin');
  assert.ok(idx >= 0);
  data.sessions[idx] = { ...data.sessions[idx], status: 'cancelled', note: 'Hana is away this Thursday' };
  assert.doesNotThrow(() => validateStudioContent(data));
});

test('structured data derives ExerciseGym, hours, address and USD Offer from content and escapes <', () => {
  const schema = businessStructuredData();
  assert.equal(schema['@type'], 'ExerciseGym');
  assert.equal(schema.name, business.name);
  assert.equal(schema.email, business.email);
  assert.equal(schema.telephone, business.phone);
  assert.equal(schema.address.streetAddress, business.address.street);
  assert.equal(schema.openingHoursSpecification.length, 7);
  assert.equal(schema.makesOffer['@type'], 'Offer');
  assert.equal(schema.makesOffer.price, introOffer.price);
  assert.equal(schema.makesOffer.priceCurrency, 'USD');

  const value = { name: '</script><script>alert(1)</script>', text: '< & >' };
  const encoded = jsonLd(value);
  assert.ok(!encoded.includes('<'), 'JSON-LD must escape <');
  assert.deepEqual(JSON.parse(encoded), value);
});

test('enquiry copy never promises a mat, class or pass is booked, reserved or confirmed', () => {
  assert.match(frontDeskRule, /front desk/i);
  assert.match(frontDeskRule, /enquiries only/i);

  const filesToCheck = [
    '../app/page.tsx',
    '../app/timetable/page.tsx',
    '../app/classes/page.tsx',
    '../app/teachers/page.tsx',
    '../app/new-here/page.tsx',
    '../app/contact/page.tsx',
    '../content/business.ts',
    '../content/pricing.ts',
  ];
  for (const rel of filesToCheck) {
    const text = readFileSync(new URL(rel, import.meta.url), 'utf8');
    assert.doesNotMatch(text, /\b(booked|reserved|confirmed)\b/i, `${rel} must not use booked/reserved/confirmed`);
  }

  const prenatal = classStyles.find((c) => c.id === 'prenatal')!;
  assert.match(prenatal.description, /midwife or doctor/i);
  const newHerePage = readFileSync(new URL('../app/new-here/page.tsx', import.meta.url), 'utf8');
  assert.match(newHerePage, /midwife or doctor/i);
});
