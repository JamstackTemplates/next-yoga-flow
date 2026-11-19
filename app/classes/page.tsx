import type { Metadata } from 'next';
import { CtaBand } from '../../components/cta-band';
import {
  ClassAlmanac,
  IntensityKeyBand,
  WhichClassSteppingStones,
  type SteppingStone,
} from '../../components/inner-sections';
import { PageHead } from '../../components/page-head';
import { formatUsd, introOffer } from '../../content/pricing';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Classes',
  description:
    'Nine gentle yoga styles at Sunrise Lotus Yoga: Sunrise Flow, Gentle Hatha, Slow Flow, Yin, Restorative, Prenatal, Chair Yoga, Yoga Nidra and Breathwork.',
  alternates: { canonical: absoluteUrl('/classes/') },
};

const STEPPING_STONES: readonly SteppingStone[] = [
  {
    prompt: 'Brand new?',
    classId: 'gentle-hatha',
    className: 'Gentle Hatha',
    note: 'One shape at a time with clear cues and pauses to breathe.',
  },
  {
    prompt: 'Can’t sleep?',
    classId: 'yoga-nidra',
    className: 'Yoga Nidra',
    note: 'Lying down in a cosy nest of blankets; no poses at all.',
  },
  {
    prompt: 'Stiff from a desk?',
    classId: 'yin',
    className: 'Yin',
    note: 'Long, propped floor holds that gently unravel tight hips and spines.',
  },
  {
    prompt: 'Waking up early?',
    classId: 'sunrise-flow',
    className: 'Sunrise Flow',
    note: 'Unhurried sun salutations as morning light crosses Lake Merritt.',
  },
  {
    prompt: 'Prefer not to get on the floor?',
    classId: 'chair-yoga',
    className: 'Chair Yoga',
    note: 'Seated and supported standing movement with a sturdy chair beside you.',
  },
];

export default function ClassesPage() {
  return (
    <>
      <PageHead eyebrow="Class almanac" title="Nine ways to slow down" motif="petal-row">
        <p>
          Every class here is unheated, unhurried and welcoming to complete beginners. We grade pace
          with one to three lotus petals rather than levels, so you can choose what your body needs
          today.
        </p>
      </PageHead>

      <IntensityKeyBand
        heading="Petal intensity key"
        descriptions={[
          'One petal — very gentle. Floor holds, chair support, breath or deeply propped rest.',
          'Two petals — slow warmth. Linked breath-led movement at an unhurried conversational pace.',
          'Three petals — steady flow. Saved for occasional workshops; every regular class stays at one or two petals.',
        ]}
      />

      <ClassAlmanac />

      <WhichClassSteppingStones
        eyebrow="Not sure where to begin?"
        heading="Which class for me?"
        stones={STEPPING_STONES}
      />

      <CtaBand>
        <CtaBand.Copy>
          <CtaBand.Heading>Try a few styles over two unhurried weeks</CtaBand.Heading>
          <CtaBand.Note>
            The {formatUsd(introOffer.price)} {introOffer.name} gives new students {introOffer.days}{' '}
            days of unlimited classes so you can discover your favourite room and teacher.
          </CtaBand.Note>
        </CtaBand.Copy>
        <CtaBand.Actions>
          <CtaBand.Primary href="/new-here/">
            Start the {formatUsd(introOffer.price)} {introOffer.name}
          </CtaBand.Primary>
          <CtaBand.Secondary href="/timetable/">See this week’s timetable</CtaBand.Secondary>
        </CtaBand.Actions>
      </CtaBand>
    </>
  );
}
