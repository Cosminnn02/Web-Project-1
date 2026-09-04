import type { Metadata } from "next";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor } from "@/components/Cursor";
import { Navigation } from "@/components/Navigation";
import { DestinationCard } from "@/components/DestinationCard";
import { RevealText } from "@/components/RevealText";
import { Reveal } from "@/components/Reveal";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { DESTINATIONS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Destinations — Maison Voyage",
  description:
    "The places we know well, and keep to ourselves — eighteen destinations across every continent, each one held privately.",
};

// Group destinations by continent, preserving the order they appear in the data.
const CONTINENTS = DESTINATIONS.reduce<Record<string, typeof DESTINATIONS>>(
  (acc, d) => {
    (acc[d.continent] ??= []).push(d);
    return acc;
  },
  {}
);

export default function DestinationsPage() {
  let runningIndex = 0;

  return (
    <>
      <SmoothScroll />
      <Cursor />
      <Navigation />
      <main>
        {/* Intro */}
        <section className="px-6 pb-16 pt-36 md:px-10 md:pb-24 md:pt-48">
          <div className="mx-auto max-w-[94vw]">
            <p className="mb-6 text-xs uppercase tracking-luxe text-gold">
              Signature Destinations
            </p>
            <h1 className="max-w-4xl font-serif text-5xl leading-[1.08] text-charcoal md:text-7xl">
              <RevealText text="Places we know well, and keep to ourselves." />
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink/70">
              Eighteen places across every continent — each one held privately,
              each one different. A few of the places we return to, and a few we
              keep to ourselves.
            </p>
          </div>
        </section>

        {/* Continent groups */}
        {Object.entries(CONTINENTS).map(([continent, list]) => (
          <section key={continent} className="px-6 pb-24 md:px-10 md:pb-32">
            <div className="mx-auto max-w-[94vw]">
              <Reveal className="mb-12 flex items-end justify-between gap-6 border-b border-line pb-6">
                <div className="flex items-baseline gap-5">
                  <h2 className="font-serif text-3xl text-charcoal md:text-4xl">
                    {continent}
                  </h2>
                  <span className="text-xs uppercase tracking-luxe text-ink/40">
                    {list.length} {list.length === 1 ? "place" : "places"}
                  </span>
                </div>
              </Reveal>

              <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((d) => {
                  const i = runningIndex++;
                  return <DestinationCard key={d.name} d={d} index={i} />;
                })}
              </div>
            </div>
          </section>
        ))}

        {/* Closing CTA */}
        <section className="px-6 pb-32 md:px-10 md:pb-48">
          <div className="mx-auto max-w-[94vw]">
            <Reveal className="flex flex-col items-center gap-8 text-center">
              <p className="max-w-md font-serif text-2xl leading-snug text-charcoal md:text-3xl">
                Wherever you are drawn, we will compose the rest.
              </p>
              <CTA>Begin the Conversation</CTA>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
