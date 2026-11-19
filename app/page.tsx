import type { Metadata } from 'next';
import {
  ClassLilyPads,
  FirstMorningPath,
  HomeHero,
  IntroOfferBand,
  TeachersArc,
  VisitStudioBand,
} from '../components/home-sections';
import { TodayOnMat } from '../components/today-on-mat';
import { business } from '../content/business';
import { formatUsd, introOffer } from '../content/pricing';
import { absoluteUrl } from '../lib/paths';
import { businessStructuredData, jsonLd } from '../lib/structured-data';

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl('/') },
};

const FIRST_MORNING_STEPS = [
  {
    numeral: '1',
    title: 'Arrive ten minutes early.',
    detail: 'Slip off your shoes by the door, say hello at the desk and settle into the room before the bell rings.',
  },
  {
    numeral: '2',
    title: 'Mats, props and blankets are here.',
    detail: 'Cork mats, bolsters, blocks, straps and warm woven blankets are laid out cleanly for every session at no extra charge.',
  },
  {
    numeral: '3',
    title: 'Tell your teacher about any injuries.',
    detail: 'A quick word before class helps us offer comfortable variations for knees, wrists, backs or pregnancy.',
  },
  {
    numeral: '4',
    title: 'Stay for tea.',
    detail: 'There is always a fresh pot of ginger-mint tea waiting by the front window so you never have to rush straight back into traffic.',
  },
] as const;

export default function HomePage() {
  return (
    <>
      {/* 1. Theme-aware illustrated hero */}
      <HomeHero>
        <HomeHero.Heading>Gentle yoga for the first light of the day.</HomeHero.Heading>
        <HomeHero.Introduction>
          Slow classes by Lake Merritt, from 6:30 sunrise flow to Sunday yoga nidra. Mats, props and
          tea are on us; just bring yourself.
        </HomeHero.Introduction>
        <HomeHero.Actions>
          <HomeHero.Primary href="/new-here/">
            Start the {formatUsd(introOffer.price)} {introOffer.name}
          </HomeHero.Primary>
          <HomeHero.Secondary href="/timetable/">
            See this week’s timetable
          </HomeHero.Secondary>
        </HomeHero.Actions>
        <HomeHero.Footer
          addressNote={`${business.address.formatted} · ${business.address.landmark}`}
        />
      </HomeHero>

      {/* 2. Full-bleed sun-arc strip: Today on the mat */}
      <TodayOnMat
        eyebrow="On the sun-arc sky"
        heading="Today on the mat"
        intro="Every class runs across our east-facing Sunroom and quiet Lotus Room, paced to the light from 6:30 dawn to evening dusk."
        ctaLabel="Open the full week timetable →"
      />

      {/* 3. Floating lily pads: Nine ways to slow down */}
      <ClassLilyPads
        eyebrow="Class styles"
        heading="Nine ways to slow down"
        intro="Every class is beginner-friendly, unheated and propped for real bodies. Tap any lily pad for full details and weekly times."
        allLinkLabel="Explore all nine styles →"
      />

      {/* 4. Giant rising sun-disc band: The Sunrise Fortnight */}
      <IntroOfferBand
        eyebrow="New to the studio"
        heading={`The ${introOffer.name}`}
        subline={`${introOffer.days} days, unlimited classes`}
        ctaLabel={`Explore the ${formatUsd(introOffer.price)} ${introOffer.name}`}
        note="Bought at the front desk before your first class — no lock-in."
      />

      {/* 5. Arcing sun-path medallions: Your teachers */}
      <TeachersArc
        eyebrow="Small-room teachers"
        heading="Your teachers"
        intro="Six warm, unhurried teachers who learn your name, know their props and never ask anyone to force a shape."
        ctaLabel="Meet all six teachers →"
      />

      {/* 6. Winding dotted path: Your first morning */}
      <FirstMorningPath
        eyebrow="No experience needed"
        heading="Your first morning"
        steps={FIRST_MORNING_STEPS}
      />

      {/* 7. Two-column visit section: Find the studio */}
      <VisitStudioBand
        eyebrow="By the water"
        heading="Find the studio"
        landmarkNote={`Just ${business.address.landmark}, with morning light pouring across Lakeshore Avenue.`}
        contactCta="Map & say hello"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(businessStructuredData()) }}
      />
    </>
  );
}
