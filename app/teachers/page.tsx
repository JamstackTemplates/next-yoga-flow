import type { Metadata } from 'next';
import { CtaBand } from '../../components/cta-band';
import { FounderQuoteBand, TeachersAlmanac } from '../../components/inner-sections';
import { PageHead } from '../../components/page-head';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Teachers',
  description:
    'Meet the six teachers at Sunrise Lotus Yoga by Lake Merritt: Maya Okafor, Daniel Reyes, Priya Nair, Hana Sato, Elena Brooks and Theo Lindqvist.',
  alternates: { canonical: absoluteUrl('/teachers/') },
};

export default function TeachersPage() {
  return (
    <>
      <PageHead eyebrow="Our teachers" title="The people holding the space" motif="medallions">
        <p>
          Six long-time East Bay teachers who keep rooms small, cues plain and props within arm’s
          reach. Every teacher is happy to chat for a few minutes before or after class.
        </p>
      </PageHead>

      <TeachersAlmanac />

      <FounderQuoteBand
        quote="Nobody needs to touch their toes here. We just need you to breathe a bit slower than when you came in."
        attribution="Maya Okafor, founder"
      />

      <CtaBand>
        <CtaBand.Copy>
          <CtaBand.Heading>See who is teaching this week</CtaBand.Heading>
          <CtaBand.Note>
            Filter the weekly timetable by teacher, class style or time of day to find a session that
            suits your morning or evening.
          </CtaBand.Note>
        </CtaBand.Copy>
        <CtaBand.Actions>
          <CtaBand.Primary href="/timetable/">See this week’s timetable</CtaBand.Primary>
          <CtaBand.Secondary href="/contact/">Write to the studio</CtaBand.Secondary>
        </CtaBand.Actions>
      </CtaBand>
    </>
  );
}
