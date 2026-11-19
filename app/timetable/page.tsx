import type { Metadata } from 'next';
import { CtaBand } from '../../components/cta-band';
import { NextClassChip } from '../../components/next-class-chip';
import { PageHead } from '../../components/page-head';
import { TimeZoneNote } from '../../components/time-zone-note';
import { WeekTimetable } from '../../components/week-timetable';
import { formatUsd, introOffer } from '../../content/pricing';
import { rooms, timetableNotice } from '../../content/timetable';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Timetable',
  description:
    'Weekly recurring yoga timetable at Sunrise Lotus Yoga by Lake Merritt: sunrise flow, gentle hatha, slow flow, yin, restorative, prenatal, chair yoga, yoga nidra and breathwork.',
  alternates: { canonical: absoluteUrl('/timetable/') },
};

export default function TimetablePage() {
  return (
    <>
      <PageHead eyebrow="Weekly schedule" title="This week on the mat" motif="sun-arc">
        <p>
          Thirty calm classes across the Sunroom and Lotus Room each week. Filter by class style,
          teacher or time of day, or print this page for your fridge.
        </p>
      </PageHead>

      <div className="wrap pt-8 pb-6">
        {/* Next-class pill banner */}
        <div className="print-hide mb-6 flex flex-wrap items-center justify-between gap-4">
          <NextClassChip variant="banner" />
          <TimeZoneNote />
        </div>

        {/* Interactive week sun-arc grid + mobile day lists + print table */}
        <WeekTimetable />

        {/* Rooms key & practical notes */}
        <section
          aria-labelledby="rooms-key-heading"
          className="mt-12 grid gap-6 rounded-[2rem] border-[1.5px] border-line bg-band/55 p-6 sm:p-8 lg:grid-cols-12"
        >
          <div className="lg:col-span-6">
            <h2 id="rooms-key-heading" className="font-display text-2xl text-ink">
              Our two rooms
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-1.5 size-3 shrink-0 rounded-full border border-ink/60 bg-saffron"
                />
                <span>
                  <strong className="font-semibold text-ink">
                    {rooms.sunroom.name} ({rooms.sunroom.capacity} mats):
                  </strong>{' '}
                  <span className="text-muted">{rooms.sunroom.description}</span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-1.5 size-3 shrink-0 rounded-full border border-ink/60 bg-leaf"
                />
                <span>
                  <strong className="font-semibold text-ink">
                    {rooms['lotus-room'].name} ({rooms['lotus-room'].capacity} mats):
                  </strong>{' '}
                  <span className="text-muted">{rooms['lotus-room'].description}</span>
                </span>
              </li>
            </ul>
          </div>

          <div className="space-y-3 border-t border-line pt-5 text-sm text-muted lg:col-span-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
            <h2 className="font-display text-2xl text-ink">Good to know</h2>
            <p>
              <strong className="font-medium text-ink">Arrive ten minutes early:</strong> doors open
              half an hour before the first morning class so you can grab props and settle in without
              rushing.
            </p>
            <p>
              <strong className="font-medium text-ink">Cover teachers &amp; updates:</strong> when a
              regular teacher is away on retreat or training, cover teachers are named directly on the
              session petal.
            </p>
            <p>{timetableNotice}</p>
          </div>
        </section>
      </div>

      <CtaBand>
        <CtaBand.Copy>
          <CtaBand.Heading>Ready for your first fortnight?</CtaBand.Heading>
          <CtaBand.Note>
            Try any combination of classes for {introOffer.days} days with the{' '}
            {formatUsd(introOffer.price)} {introOffer.name}, bought at the front desk before class.
          </CtaBand.Note>
        </CtaBand.Copy>
        <CtaBand.Actions>
          <CtaBand.Primary href="/new-here/">
            Start the {formatUsd(introOffer.price)} {introOffer.name}
          </CtaBand.Primary>
          <CtaBand.Secondary href="/contact/">Ask a question</CtaBand.Secondary>
        </CtaBand.Actions>
      </CtaBand>
    </>
  );
}
