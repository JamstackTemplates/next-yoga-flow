import { DuskPond } from '../components/art/dusk-pond';
import { SiteLink } from '../components/site-link';

export default function NotFound() {
  return (
    <section className="paper-band pb-16">
      <div className="w-full overflow-hidden border-b border-line">
        <DuskPond className="mx-auto h-[min(34rem,60vw)] min-h-64 w-full" preserveAspectRatio="xMidYMid slice" />
      </div>

      <div className="wrap max-w-4xl pt-14 text-center">
        <p className="eyebrow eyebrow-horizon">404 · Quiet water</p>
        <h1 className="display-xl mt-4 text-ink">
          The sun hasn’t risen on this page
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-[1.1rem] leading-relaxed text-muted">
          The page you looked for isn’t here—perhaps it moved, or the address has a small typo. The
          mat is still waiting back on the home page or this week’s timetable.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <SiteLink href="/" className="button">
            Back to Home
          </SiteLink>
          <SiteLink href="/timetable/" className="button button-quiet">
            See this week’s timetable
          </SiteLink>
        </div>
      </div>
    </section>
  );
}
