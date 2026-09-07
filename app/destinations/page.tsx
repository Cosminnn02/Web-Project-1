import type { Metadata } from "next";
import Image from "next/image";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import { Cursor } from "@/components/effects/Cursor";
import { Navigation } from "@/components/shared/Navigation";
import { DestinationCard } from "@/components/destinations/DestinationCard";
import { RevealText } from "@/components/effects/RevealText";
import { Reveal } from "@/components/effects/Reveal";
import { CTA } from "@/components/shared/CTA";
import { Footer } from "@/components/shared/Footer";
import { IndexList } from "@/components/destinations/IndexList";
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
        <section className="relative">
          <div className="relative aspect-[28/9] w-full overflow-hidden">
            <Image
              src="/images/destinations/BG.png"
              alt="A compilation of the collection — Santorini, Kyoto, the Maldives, the Swiss Alps, the Serengeti, Patagonia"
              fill
              priority
              sizes="100vw"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/40 to-charcoal/10" />

            <div className="absolute inset-0 flex items-center pl-16 pr-6 md:pl-28 md:pr-10">
              <div>
                <p className="mb-6 text-[clamp(0.65rem,0.8vw,0.9rem)] uppercase tracking-luxe text-ivory/70">
                  The Collection
                </p>
                <h1 className="max-w-6xl font-serif text-[clamp(3rem,5.5vw,5.75rem)] leading-[1.05] text-ivory">
                  <RevealText text="Everywhere, quietly." />
                </h1>
                <p className="mt-7 max-w-xl text-[clamp(0.95rem,1.1vw,1.15rem)] leading-relaxed text-ivory/80">
                  Eighteen places across six continents and one frozen continent —
                  each one held privately, each one different. Read the index, or
                  take the collection in the order we keep it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ——— The Index ——— */}
        <section id="index" className="px-6 pb-4 pt-20 md:px-10 md:pb-6 md:pt-28">
          <div className="mx-auto max-w-[94vw]">
            <IndexList />
          </div>
        </section>

        {/* ——— The Collection ——— */}
        <section id="collection" className="px-6 pb-24 pt-12 md:px-10 md:pb-32 md:pt-16">
          <div className="mx-auto max-w-[94vw]">
            <div className="mb-12 flex flex-col items-center gap-3 text-center">
              <p className="mb-6 text-xs uppercase tracking-luxe text-gold">
                The Collection
              </p>
              <h2 className="mx-auto max-w-4xl font-serif text-4xl leading-[1.1] text-charcoal md:text-6xl">
                The world, held one place at a time.
              </h2>
            </div>

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
