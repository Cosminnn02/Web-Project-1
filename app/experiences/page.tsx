import type { Metadata } from "next";
import Image from "next/image";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import { Cursor } from "@/components/effects/Cursor";
import { Navigation } from "@/components/shared/Navigation";
import { Experiences } from "@/components/experiences/Experiences";
import { RevealText } from "@/components/effects/RevealText";
import { Reveal } from "@/components/effects/Reveal";
import { CTA } from "@/components/shared/CTA";
import { Footer } from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "Experiences — Maison Voyage",
  description:
    "Three quiet steps: a conversation, a proposal in writing, and the journey, held.",
};

export default function ExperiencesPage() {
  return (
    <>
      <SmoothScroll />
      <Cursor />
      <Navigation />
      <main>
        {/* ——— Hero ——— */}
        <section className="relative">
          <div className="relative aspect-[28/9] w-full overflow-hidden">
            <Image
              src="/images/experiences/hero.jpg"
              alt="A quiet beach at golden hour, the tide drawing back over pale sand"
              fill
              priority
              sizes="100vw"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/40 to-charcoal/10" />

            <div className="absolute inset-0 flex items-center pl-16 pr-6 md:pl-28 md:pr-10">
              <div>
                <p className="mb-6 text-[clamp(0.65rem,0.8vw,0.9rem)] uppercase tracking-luxe text-ivory/70">
                  Curated Experiences
                </p>
                <h1 className="max-w-6xl font-serif text-[clamp(3rem,5.5vw,5.75rem)] leading-[1.05] text-ivory">
                  <RevealText text="The world, arranged quietly." />
                </h1>
                <p className="mt-7 max-w-xl text-[clamp(0.95rem,1.1vw,1.15rem)] leading-relaxed text-ivory/80">
                  A private travel atelier. We compose the moments that cannot
                  be found on any itinerary — and hold them, end to end, for a
                  small circle of guests.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ——— The scrollshow ——— */}
        <Experiences />

        {/* ——— Beyond the list ——— */}
        <section className="relative">
          <div className="relative aspect-[28/9] w-full overflow-hidden">
            <Image
              src="/images/experiences/beyond.jpg"
              alt="A private cove, seen from above, with boats moored in turquoise water"
              fill
              sizes="100vw"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/40 to-charcoal/20" />
            <div className="absolute inset-0 flex items-end px-6 pb-16 md:px-10 md:pb-24">
              <div className="max-w-3xl">
                <p className="mb-6 text-xs uppercase tracking-luxe text-gold">
                  Beyond the list
                </p>
                <h2 className="font-serif text-4xl leading-[1.1] text-ivory md:text-6xl">
                  <RevealText text="The ones we cannot show you." />
                </h2>
                <p className="mt-7 max-w-xl text-lg leading-relaxed text-ivory/80">
                  Some of the finest things we arrange have no name, no address,
                  and no photograph. A house that opens for one guest. A table
                  that exists for a single evening. These are the moments we
                  describe in a room, not on a page.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ——— A table that doesn't exist ——— */}
        <section className="bg-cream pt-28 md:pt-40">
          <div className="mx-auto max-w-[94vw] px-6 md:px-10">
            <div className="grid items-center gap-14 md:grid-cols-2 md:gap-20">
            <Reveal>
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/images/experiences/table.jpg"
                  alt="A private dining room, set for a single table"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mb-6 text-xs uppercase tracking-luxe text-gold">
                Private dining
              </p>
              <h2 className="font-serif text-4xl leading-[1.1] text-charcoal md:text-5xl">
                A table that does not exist.
              </h2>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink/70">
                We do not book restaurants. We open them. A chef who has never
                cooked for the public, a cellar that is not on any list, a room
                that closes the moment you are seated. The menu is written for
                you, and only for you.
              </p>
              <ul className="mt-10 space-y-4">
                {[
                  "A chef, working privately for one table",
                  "A cellar opened that is not on any list",
                  "A room that closes the moment you are seated",
                ].map((line) => (
                  <li
                    key={line}
                    className="flex items-start gap-4 border-t border-line pt-4 text-base text-ink/80"
                  >
                    <span className="mt-2 h-px w-6 shrink-0 bg-gold" />
                    {line}
                  </li>
                ))}
              </ul>
            </Reveal>
            </div>
          </div>
          <div className="mt-24 h-24 bg-gradient-to-b from-transparent to-ivory md:mt-32" />
        </section>

        {/* ——— The proposal, in writing ——— */}
        <section className="bg-ivory px-6 py-28 md:px-10 md:py-40">
          <div className="mx-auto grid max-w-[94vw] items-center gap-14 md:grid-cols-2 md:gap-20">
            <Reveal className="order-2 md:order-1">
              <p className="mb-6 text-xs uppercase tracking-luxe text-gold">
                The proposal
              </p>
              <h2 className="font-serif text-4xl leading-[1.1] text-charcoal md:text-5xl">
                In writing, before you commit.
              </h2>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink/70">
                Nothing is promised over a phone call. Within a week you receive
                a single document: the route, the houses, the people, the hours.
                You read it at your own pace, amend it by hand, and only then do
                we begin to arrange.
              </p>
              <ul className="mt-10 space-y-4">
                {[
                  "One document, not a brochure",
                  "Every name, hour, and price, in writing",
                  "Amended by hand, at your pace",
                ].map((line) => (
                  <li
                    key={line}
                    className="flex items-start gap-4 border-t border-line pt-4 text-base text-ink/80"
                  >
                    <span className="mt-2 h-px w-6 shrink-0 bg-gold" />
                    {line}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1} className="order-1 md:order-2">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/images/experiences/notes.jpg"
                  alt="A quiet riverside at dusk, the kind of place a proposal describes"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ——— Closing ——— */}
        <section className="bg-charcoal px-6 py-32 text-ivory md:px-10 md:py-48">
          <div className="mx-auto max-w-[94vw]">
            <Reveal className="flex flex-col items-center gap-10 text-center">
              <p className="text-xs uppercase tracking-luxe text-gold">
                A private conversation
              </p>
              <p className="max-w-2xl font-serif text-3xl leading-snug text-ivory md:text-4xl">
                Wherever you are drawn, we will compose the rest.
              </p>
              <CTA light variant="ghost">
                Begin the Conversation
              </CTA>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
