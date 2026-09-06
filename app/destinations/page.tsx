import type { Metadata } from "next";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor } from "@/components/Cursor";
import { Navigation } from "@/components/Navigation";
import { DestinationCard } from "@/components/DestinationCard";
import { RevealText } from "@/components/RevealText";
import { Reveal } from "@/components/Reveal";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { IndexList } from "@/components/IndexList";
import { destinationsByContinent } from "@/lib/data";

export const metadata: Metadata = {
  title: "Destinations — Maison Voyage",
  description:
    "Eighteen destinations across six continents and one frozen continent — each one held privately, each one composed as a single guest's journey.",
};

export default function DestinationsPage() {
  let runningIndex = 0;
  const groups = destinationsByContinent();

  return (
    <>
      <SmoothScroll />
      <Cursor />
      <Navigation />
      <main>
        {/* ——— Intro ——— */}
        <section className="px-6 pb-16 pt-36 md:px-10 md:pb-24 md:pt-48">
          <div className="mx-auto max-w-[94vw]">
            <p className="mb-6 text-xs uppercase tracking-luxe text-gold">
              The Collection
            </p>
            <h1 className="max-w-4xl font-serif text-5xl leading-[1.08] text-charcoal md:text-7xl">
              <RevealText text="Everywhere, quietly." />
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink/70">
              Eighteen places across six continents and one frozen continent —
              each one held privately, each one different. Read the index, or
              take the collection in the order we keep it.
            </p>
          </div>
        </section>

        {/* ——— The Index ——— */}
        <section id="index" className="px-6 pb-24 md:px-10 md:pb-32">
          <div className="mx-auto max-w-[94vw]">
            <Reveal className="mb-12 flex items-end justify-between gap-6 border-b border-line pb-6">
              <h2 className="font-serif text-3xl text-charcoal md:text-4xl">
                The Index
              </h2>
              <span className="text-right text-xs uppercase tracking-luxe text-ink/40">
                Eighteen destinations, in the order we keep them
              </span>
            </Reveal>
            <IndexList />
          </div>
        </section>

        {/* ——— The Collection ——— */}
        <section id="collection" className="px-6 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-[94vw]">
            <Reveal className="mb-12 flex items-end justify-between gap-6 border-b border-line pb-6">
              <h2 className="font-serif text-3xl text-charcoal md:text-4xl">
                The Collection
              </h2>
              <span className="text-right text-xs uppercase tracking-luxe text-ink/40">
                Each house, held for a single guest
              </span>
            </Reveal>

            {groups.map(({ continent, items }) => (
              <div key={continent} className="mb-20 last:mb-0">
                <Reveal className="mb-10 flex items-baseline gap-5">
                  <h3 className="font-serif text-xl italic text-ink/70">
                    {continent}
                  </h3>
                  <span className="h-px flex-1 bg-line" />
                  <span className="text-xs uppercase tracking-luxe text-ink/40">
                    {items.length} {items.length === 1 ? "place" : "places"}
                  </span>
                </Reveal>

                <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((d) => {
                    const i = runningIndex++;
                    return <DestinationCard key={d.slug} d={d} index={i} />;
                  })}
                </div>
              </div>
            ))}
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
