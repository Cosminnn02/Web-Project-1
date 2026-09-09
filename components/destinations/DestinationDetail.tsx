"use client";

import Link from "next/link";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useReveal } from "@/hooks/useReveal";
import { DUR, EASE, STAGGER } from "@/lib/motion";
import { RevealText } from "@/components/effects/RevealText";
import { Reveal } from "@/components/effects/Reveal";
import { CTA } from "@/components/shared/CTA";
import { DestinationCard } from "./DestinationCard";
import { DESTINATIONS, type Destination } from "@/lib/data";

interface DestinationDetailProps {
  d: Destination;
  related: Destination[];
}

/** One of the day's three acts — a composed caption for the frames. */
const FRAMES = [
  { n: "01", caption: "The first light — before anyone else arrives" },
  { n: "02", caption: "The long hours — the day, held" },
  { n: "03", caption: "The last light — evenings, unhurried" },
];

/**
 * One destination, told slowly — the cover, the place, the light in three
 * frames, what we arrange, the file, the note, and the rest of the
 * collection. Every section composed the way the site composes everything:
 * a statement, a pause, a detail.
 */
export function DestinationDetail({ d, related }: DestinationDetailProps) {
  const no = DESTINATIONS.findIndex((x) => x.slug === d.slug) + 1;

  /* ——— Hero: settle + slow drift, copy rises in ——— */
  const heroRef = useReveal<HTMLElement>((scope) => {
    const img = scope.querySelector<HTMLElement>(".dt-hero-img");
    if (img) {
      gsap.fromTo(
        img,
        { scale: 1.08 },
        { scale: 1.02, duration: DUR.cinematic, ease: EASE.luxury, delay: 0.15 }
      );
      gsap.to(img, {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: scope,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }
    const copy = scope.querySelectorAll<HTMLElement>(".dt-hero-copy > *");
    if (copy.length) {
      gsap.fromTo(
        copy,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: DUR.standard,
          ease: EASE.out,
          stagger: 0.09,
          delay: 0.45,
        }
      );
    }
  });

  /* ——— The place: the index column rises, the story masks in ——— */
  const stmtRef = useReveal<HTMLDivElement>((scope) => {
    const idx = scope.querySelector<HTMLElement>(".dt-stmt-index");
    if (idx) {
      gsap.fromTo(
        idx,
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: DUR.long,
          ease: EASE.luxury,
          scrollTrigger: {
            trigger: scope,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
    const lead = scope.querySelector<HTMLElement>(".dt-stmt-lead");
    if (lead) {
      gsap.fromTo(
        lead,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: DUR.standard,
          ease: EASE.out,
          delay: 0.15,
          scrollTrigger: {
            trigger: scope,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  });

  /* ——— Interlude: one full-bleed frame, slow drift on scroll ——— */
  const interRef = useReveal<HTMLElement>((scope) => {
    const img = scope.querySelector<HTMLElement>(".dt-interlude-img");
    if (img) {
      gsap.fromTo(
        img,
        { yPercent: -5, scale: 1.06 },
        {
          yPercent: 5,
          scale: 1.02,
          ease: "none",
          scrollTrigger: {
            trigger: scope,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    }
    const cap = scope.querySelector<HTMLElement>(".dt-interlude-cap");
    if (cap) {
      gsap.fromTo(
        cap,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: DUR.standard,
          ease: EASE.out,
          scrollTrigger: {
            trigger: scope,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  });

  /* ——— Three frames: staggered wipe, quiet drift on scroll ——— */
  const galRef = useReveal<HTMLElement>((scope) => {
    const frames = Array.from(scope.querySelectorAll<HTMLElement>(".dt-frame"));
    frames.forEach((f, i) => {
      gsap.fromTo(
        f,
        { autoAlpha: 0, y: 48 },
        {
          autoAlpha: 1,
          y: 0,
          duration: DUR.long,
          ease: EASE.luxury,
          delay: i * 0.12,
          scrollTrigger: {
            trigger: f,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });
    scope.querySelectorAll<HTMLElement>(".dt-frame-img").forEach((img) => {
      const fig = img.closest<HTMLElement>(".dt-frame");
      if (!fig) return;
      gsap.fromTo(
        img,
        { yPercent: -5 },
        {
          yPercent: 5,
          ease: "none",
          scrollTrigger: {
            trigger: fig,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    });
  });

  /* ——— What we arrange: the list arrives one line at a time ——— */
  const listRef = useReveal<HTMLOListElement>((scope) => {
    const rows = Array.from(scope.querySelectorAll<HTMLElement>("li"));
    gsap.fromTo(
      rows,
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: DUR.standard,
        ease: EASE.out,
        stagger: STAGGER.standard,
        scrollTrigger: {
          trigger: scope,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  /* ——— The file: the hairline draws, the facts settle ——— */
  const fileRef = useReveal<HTMLElement>((scope) => {
    const items = Array.from(scope.querySelectorAll<HTMLElement>(".dt-fact"));
    gsap.fromTo(
      items,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: DUR.standard,
        ease: EASE.out,
        stagger: 0.1,
        scrollTrigger: {
          trigger: scope,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  return (
    <>
      {/* ——— The cover ——— */}
      <header ref={heroRef} className="relative">
        <div className="relative aspect-[22/9] w-full overflow-hidden">
          <Image
            src={d.image}
            alt={d.name}
            fill
            priority
            sizes="100vw"
            className="dt-hero-img h-full w-full object-cover object-center will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/40 to-charcoal/10" />

          <div className="absolute inset-0 flex items-center pl-16 pr-6 md:pl-28 md:pr-10">
            <div className="dt-hero-copy">
              <Link
                href="/destinations"
                className="group inline-flex items-center gap-3 text-xs uppercase tracking-luxe text-ivory/80 transition-colors duration-300 hover:text-gold"
              >
                <span className="inline-block h-px w-8 bg-ivory/40 transition-all duration-500 group-hover:w-12 group-hover:bg-gold" />
                All destinations
              </Link>
              <p className="mt-6 text-xs uppercase tracking-luxe text-gold">
                Nº {String(no).padStart(2, "0")} · {d.continent} · {d.region}
              </p>
              <h1 className="mt-4 font-serif text-[clamp(3rem,5.5vw,5.75rem)] leading-[1.05] text-ivory">
                <RevealText text={d.name} />
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* ——— The place ——— */}
      <section className="px-6 py-28 md:px-10 md:py-44">
        <div
          ref={stmtRef}
          className="mx-auto grid max-w-[94vw] items-start gap-16 lg:grid-cols-12 lg:gap-24"
        >
          {/* The index */}
          <div className="dt-stmt-index lg:col-span-4">
            <p className="text-xs uppercase tracking-luxe text-gold">
              The place
            </p>
            <p
              aria-hidden
              className="mt-6 font-serif text-7xl leading-none text-charcoal/10 md:text-8xl"
            >
              {String(no).padStart(2, "0")}
            </p>
            <div className="mt-10 space-y-6 border-t border-line pt-8">
              <div>
                <p className="text-[0.6rem] uppercase tracking-luxe text-ink/50">
                  Continent
                </p>
                <p className="mt-1.5 font-serif text-lg text-charcoal">
                  {d.continent}
                </p>
              </div>
              <div>
                <p className="text-[0.6rem] uppercase tracking-luxe text-ink/50">
                  Region
                </p>
                <p className="mt-1.5 font-serif text-lg text-charcoal">
                  {d.region}
                </p>
              </div>
              <div>
                <p className="text-[0.6rem] uppercase tracking-luxe text-ink/50">
                  From
                </p>
                <p className="mt-1.5 font-serif text-lg text-gold">{d.price}</p>
              </div>
            </div>
          </div>

          {/* The story */}
          <div className="lg:col-span-8">
            <p className="dt-stmt-lead max-w-xl text-lg leading-relaxed text-ink/70">
              {d.description}
            </p>
            <RevealText
              className="mt-10 block max-w-4xl font-serif text-2xl leading-[1.5] text-charcoal md:text-4xl md:leading-[1.4]"
              text={d.story}
            />
          </div>
        </div>
      </section>

      {/* ——— Interlude: one full-bleed frame ——— */}
      <section
        ref={interRef}
        className="relative aspect-[28/9] w-full overflow-hidden bg-cream"
      >
        <Image
          src={d.gallery[1]}
          alt={`${d.name} — an unhurried hour`}
          fill
          priority
          sizes="100vw"
          className="dt-interlude-img h-full w-full object-cover will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/45 via-transparent to-charcoal/15" />
        <div className="dt-interlude-cap absolute inset-x-0 bottom-0 px-6 pb-10 md:px-10">
          <p className="text-[0.6rem] uppercase tracking-luxe text-ivory/85">
            {d.name} — an unhurried hour
          </p>
        </div>
      </section>

      {/* ——— The light, in three frames ——— */}
      <section
        ref={galRef}
        className="border-y border-line bg-cream px-6 py-24 md:px-10 md:py-32"
      >
        <div className="mx-auto max-w-[94vw]">
          <Reveal className="mb-14 flex items-end justify-between gap-6 border-b border-line pb-6">
            <h2 className="font-serif text-3xl text-charcoal md:text-4xl">
              The light, in three frames
            </h2>
            <span className="hidden text-right text-xs uppercase tracking-luxe text-ink/40 md:block">
              A day in {d.name}, roughly
            </span>
          </Reveal>

          <div className="grid gap-10 md:gap-14 lg:grid-cols-12">
            {/* Left column — the first light, then a note on the place */}
            <div className="flex flex-col gap-10 md:gap-14 lg:col-span-5">
            <figure className="dt-frame">
              <div className="bg-ivory p-4 shadow-[0_1px_2px_rgba(28,27,25,0.06),0_14px_34px_-14px_rgba(28,27,25,0.28)] ring-1 ring-charcoal/5">
                <div className="relative overflow-hidden bg-cream" style={{ aspectRatio: "3 / 4" }}>
                  <Image
                    src={d.gallery[0]}
                    alt={`${d.name} — the first light`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="dt-frame-img h-full w-full object-cover will-change-transform"
                  />
                </div>
                <div className="flex items-baseline justify-between gap-3 px-1 pt-3.5 pb-1">
                  <span className="font-serif text-sm italic text-charcoal">
                    {FRAMES[0].caption}
                  </span>
                  <span className="shrink-0 text-[0.6rem] uppercase tracking-luxe text-gold">
                    {FRAMES[0].n}
                  </span>
                </div>
              </div>
            </figure>

            {/* A note on the place — the experiences copy structure */}
            <div className="flex flex-1 flex-col justify-center px-1">
              <p className="mb-6 text-sm uppercase tracking-luxe text-gold">
                {d.region}
              </p>
              <h3 className="font-serif text-4xl leading-[1.08] text-charcoal md:text-5xl">
                {d.name}
              </h3>
              <p className="mt-7 max-w-lg text-base leading-relaxed text-ink/75 md:text-lg">
                {d.story}
              </p>
              <ul className="mt-10 space-y-4 border-l border-gold/30 pl-7">
                {d.facts.map((f) => (
                  <li key={f} className="text-base leading-relaxed text-ink/70 md:text-lg">
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            </div>

            {/* Two frames — the hours, the last light */}
            <div className="flex flex-col gap-10 md:gap-14 lg:col-span-7">
              {[1, 2].map((i) => (
                <figure key={i} className="dt-frame">
                  <div className="bg-ivory p-4 shadow-[0_1px_2px_rgba(28,27,25,0.06),0_14px_34px_-14px_rgba(28,27,25,0.28)] ring-1 ring-charcoal/5">
                    <div className="relative overflow-hidden bg-cream" style={{ aspectRatio: "3 / 2" }}>
                      <Image
                        src={d.gallery[i]}
                        alt={`${d.name} — ${i === 1 ? "the long hours" : "the last light"}`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 58vw"
                        className="dt-frame-img h-full w-full object-cover will-change-transform"
                      />
                    </div>
                    <div className="flex items-baseline justify-between gap-3 px-1 pt-3.5 pb-1">
                      <span className="font-serif text-sm italic text-charcoal">
                        {FRAMES[i].caption}
                      </span>
                      <span className="shrink-0 text-[0.6rem] uppercase tracking-luxe text-gold">
                        {FRAMES[i].n}
                      </span>
                    </div>
                  </div>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ——— What we arrange ——— */}
      <section className="px-6 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-[94vw]">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <p className="text-xs uppercase tracking-luxe text-gold">
                  Composed privately
                </p>
                <h2 className="mt-5 font-serif text-3xl text-charcoal md:text-4xl">
                  What we arrange
                </h2>
                <p className="mt-6 max-w-xs text-sm leading-relaxed text-ink/60">
                  Each one held for a single guest. Nothing shared, nothing
                  scheduled.
                </p>
              </div>
            </div>
            <ol ref={listRef} className="border-t border-charcoal/10 lg:col-span-8">
            {d.highlights.map((h, i) => (
              <li
                key={i}
                className="group/row flex items-baseline gap-6 border-b border-charcoal/10 py-6 transition-colors duration-500 hover:bg-charcoal/[0.03] md:gap-10 md:py-7"
              >
                <span className="w-10 shrink-0 font-serif text-sm italic text-gold/60 transition-colors duration-500 group-hover/row:text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-base leading-relaxed text-ink/85 transition-colors duration-500 group-hover/row:text-charcoal md:text-lg">
                  {h}
                </span>
                <span className="ml-auto hidden shrink-0 text-[0.6rem] uppercase tracking-luxe text-transparent transition-colors duration-500 group-hover/row:text-gold md:inline">
                  Held for you →
                </span>
              </li>
            ))}
          </ol>
          </div>
        </div>
      </section>

      {/* ——— The file ——— */}
      <section
        ref={fileRef}
        className="border-y border-line bg-ivory px-6 py-20 md:px-10 md:py-28"
      >
        <div className="mx-auto max-w-[94vw]">
          <p className="mb-12 max-w-md font-serif text-2xl leading-[1.4] text-charcoal md:text-3xl">
            A few facts, for the file.
          </p>
          <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Season", value: d.season },
              { label: "Duration", value: d.duration },
              { label: "From", value: d.price },
              { label: "Region", value: d.region },
            ].map((f) => (
              <div key={f.label} className="dt-fact border-t border-line pt-5">
                <dt className="text-[0.6rem] uppercase tracking-luxe text-ink/50">
                  {f.label}
                </dt>
                <dd className="mt-2 font-serif text-lg text-charcoal md:text-xl">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ——— A note from the atelier ——— */}
      <section className="bg-charcoal px-6 py-32 text-center md:px-10 md:py-44">
        <div className="mx-auto max-w-3xl">
          <Reveal className="flex flex-col items-center gap-10">
            <p className="text-xs uppercase tracking-luxe text-gold">
              A note from the atelier
            </p>
            <p className="font-serif text-2xl italic leading-relaxed text-ivory md:text-3xl md:leading-relaxed">
              &ldquo;{d.note}&rdquo;
            </p>
            <div className="h-px w-16 bg-gold/50" />
          </Reveal>
        </div>
      </section>

      {/* ——— Elsewhere in the collection ——— */}
      <section className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[94vw]">
          <Reveal className="mb-14 flex items-end justify-between gap-6 border-b border-line pb-6">
            <h2 className="font-serif text-3xl text-charcoal md:text-4xl">
              Elsewhere in the collection
            </h2>
            <span className="hidden text-right text-xs uppercase tracking-luxe text-ink/40 md:block">
              Three more, in the same spirit
            </span>
          </Reveal>
          <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r, i) => (
              <DestinationCard key={r.slug} d={r} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ——— Closing ——— */}
      <section className="bg-charcoal px-6 py-32 md:px-10 md:py-48">
        <div className="mx-auto max-w-[94vw]">
          <Reveal className="flex flex-col items-center gap-10 text-center">
            <p className="text-xs uppercase tracking-luxe text-gold">
              A private conversation
            </p>
            <p className="max-w-2xl font-serif text-3xl leading-snug text-ivory md:text-4xl">
              {d.name}, in the order you want it.
            </p>
            <CTA light variant="ghost">
              Begin the Conversation
            </CTA>
          </Reveal>
        </div>
      </section>
    </>
  );
}
