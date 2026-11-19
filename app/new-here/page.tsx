import type { Metadata } from 'next';
import { CtaBand } from '../../components/cta-band';
import {
  BringAndProvideBand,
  NewHereFaq,
  NewHereHero,
  PassesStrataBand,
  UnrolledMatBand,
  type FaqEntry,
} from '../../components/inner-sections';
import { introOffer } from '../../content/pricing';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'New here',
  description:
    'Start with the $45 Sunrise Fortnight at Sunrise Lotus Yoga: 14 days of unlimited gentle classes by Lake Merritt, passes and prices, what to bring and answers for first-timers.',
  alternates: { canonical: absoluteUrl('/new-here/') },
};

const BRING_ITEMS = [
  'Comfortable clothes you can stretch and breathe in—socks and a light layer are lovely for yin and yoga nidra.',
  'A refillable water bottle if you like; we keep filtered water by the desk.',
  'Just yourself—you are welcome to bring your own mat, though our cleaned studio mats are always waiting.',
] as const;

const FAQ_ENTRIES: readonly FaqEntry[] = [
  {
    question: 'Never done yoga?',
    answer:
      'You are in the right room. Every regular class on our timetable is beginner-friendly, with clear cues and zero pressure to match anyone else’s shape. Gentle Hatha, Yin, Restorative, Chair Yoga and Yoga Nidra are especially easy starting points.',
  },
  {
    question: 'Pregnant?',
    answer:
      'Elena’s Prenatal classes welcome students from 12 weeks onward with bolsters, chairs and gentle pelvic support. Please check with your midwife or doctor before beginning prenatal yoga—our teachers offer movement variations rather than medical advice, and we’re happy to talk through options if you enquire ahead of time.',
  },
  {
    question: 'Injury or limited mobility?',
    answer:
      'Please check with your doctor or physiotherapist about what feels safe for you, then let your teacher know before class starts. Between cork blocks, bolsters, straps and our Tuesday and Thursday Chair Yoga classes, we can almost always adapt poses so you move comfortably without floor transitions.',
  },
  {
    question: 'Running late?',
    answer:
      'We lock the front door gently five minutes after class begins so the quiet opening stays peaceful for everyone inside. Aim to arrive ten minutes early for your first visit; if BART or traffic delays you, we’ll happily welcome you at the next session instead.',
  },
  {
    question: 'Showers and lockers?',
    answer:
      'We have two spacious changing rooms, open cubbies inside the hallway where your bag stays in sight of the desk, and warm face towels after morning flow. We don’t have full showers, so early risers heading straight to work often bring a fresh shirt.',
  },
  {
    question: 'Parking and transit?',
    answer:
      'There is metered and residential street parking along Lakeshore Avenue, a covered bike rack right by our door, and an easy 15-minute walk around Lake Merritt from 19th Street Oakland BART. If you’d like to ask whether a mat can be held for a first morning, send us an enquiry and we’ll reply to confirm what’s possible.',
  },
];

export default function NewHerePage() {
  return (
    <>
      <NewHereHero
        eyebrow="Welcome to Sunrise Lotus"
        ctaLabel="Ask about your first class"
        secondaryLabel="See this week’s timetable"
      />

      <UnrolledMatBand heading="What’s included" items={introOffer.terms} />

      <PassesStrataBand
        eyebrow="After your fortnight"
        heading="Passes and prices"
        intro="Simple whole-dollar pricing with no annual contracts or surprise auto-renewals."
      />

      <BringAndProvideBand
        heading="What to bring, what we provide"
        bringHeading="What to bring"
        bringItems={BRING_ITEMS}
        provideHeading="What we provide on the house"
      />

      <NewHereFaq eyebrow="First-visit questions" heading="Before you step onto the mat" entries={FAQ_ENTRIES} />

      <CtaBand>
        <CtaBand.Copy>
          <CtaBand.Heading>Still deciding which class to try first?</CtaBand.Heading>
          <CtaBand.Note>
            Write to us with a line about your schedule or experience and we’ll reply with a couple
            of calm suggestions—usually the same day.
          </CtaBand.Note>
        </CtaBand.Copy>
        <CtaBand.Actions>
          <CtaBand.Primary href="/contact/">Ask about your first class</CtaBand.Primary>
          <CtaBand.Secondary href="/classes/">Browse the nine styles</CtaBand.Secondary>
        </CtaBand.Actions>
      </CtaBand>
    </>
  );
}
