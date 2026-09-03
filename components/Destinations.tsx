"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useReveal } from "@/hooks/useReveal";
import { DUR, EASE } from "@/lib/motion";
import { DESTINATIONS } from "@/lib/data";
import { RevealText } from "./RevealText";

function DestinationCard({
  name,
  region,
  price,
  image,
  index,
  active,
}: (typeof DESTINATIONS)[number] & { index: number; active: number }) {
  const ref = useReveal<HTMLElement>((scope) => {
    // Staggered entrance
    gsap.fromTo(
      scope,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: DUR.standard,
        ease: EASE.out,
        delay: (index % 3) * 0.08,
        scrollTrigger: {
          trigger: scope,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Hover: image scale + label reveal
    const img = scope.querySelector(".dc-img");
    const label = scope.querySelector(".dc-label");
    const enter = () => {
      gsap.to(img, { scale: 1.06, duration: DUR.long, ease: EASE.luxury });
      gsap.to(label, { y: 0, opacity: 1, duration: DUR.standard * 0.7, ease: EASE.out });
    };
    const leave = () => {
      gsap.to(img, { scale: 1, duration: DUR.long, ease: EASE.luxury });
      gsap.to(label, { y: 10, opacity: 0, duration: DUR.standard * 0.5, ease: EASE.out });
    };
    scope.addEventListener("mouseenter", enter);
    scope.addEventListener("mouseleave", leave);
  });

  // Coverflow: center card at natural size; side cards shrink for depth
  const offset = Math.abs(index - active);
  const scale = offset === 0 ? 1 : offset === 1 ? 0.75 : offset === 2 ? 0.6 : 0.5;

  return (
    <article
      ref={ref}
      data-cursor
      className={`group shrink-0 cursor-pointer transition-[width] duration-700 [transition-timing-function:cubic-bezier(0.19,1,0.22,1)] ${index === active ? "w-[34vw]" : "w-[28vw]"}`}
    >
      <div
        className="transition-transform duration-700 [transition-timing-function:cubic-bezier(0.19,1,0.22,1)]"
        style={{ transform: `scale(${scale})` }}
      >
        {/* Polaroid frame */}
        <div className="bg-ivory p-2.5 shadow-[0_1px_2px_rgba(28,27,25,0.06),0_14px_34px_-14px_rgba(28,27,25,0.28)] ring-1 ring-charcoal/5 transition-shadow duration-500 group-hover:shadow-[0_2px_4px_rgba(28,27,25,0.08),0_22px_48px_-16px_rgba(28,27,25,0.38)]">
          {/* Photo — fixed height so the card only grows wider, never taller */}
          <div className="relative h-[21vw] overflow-hidden bg-cream">
            <Image
              src={image}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, 34vw"
              className="dc-img object-cover will-change-transform"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="dc-label absolute inset-x-0 bottom-0 translate-y-2.5 px-4 py-3 opacity-0">
              <span className="text-[0.65rem] uppercase tracking-luxe text-ivory/90">
                View Itinerary →
              </span>
            </div>
          </div>

          {/* Caption on the white strip — fixed width so it stays put while the photo grows */}
          <div className="mx-auto flex w-[calc(28vw-1.25rem)] items-end justify-between gap-3 px-1.5 pb-1 pt-3.5">
            <div className="min-w-0">
              <h3 className="truncate font-serif text-lg leading-tight text-charcoal">
                {name}
              </h3>
              <p className="mt-1 text-[0.6rem] uppercase tracking-luxe text-ink/45">
                {region}
              </p>
            </div>
            <span className="shrink-0 pb-0.5 text-[0.6rem] uppercase tracking-luxe text-gold">
              {price}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

/**
 * "View All Destinations" end-cap. Big serif text with a small arrow beneath,
 * sliding in from its side (left cap from the left, right cap from the right).
 */
function CtaSide({ side }: { side: "left" | "right" }) {
  const ref = useReveal<HTMLAnchorElement>((scope) => {
    gsap.fromTo(
      scope,
      { x: side === "left" ? -60 : 60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: DUR.standard,
        ease: EASE.out,
        scrollTrigger: {
          trigger: scope,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  return (
    <a
      ref={ref}
      href="#destinations"
      className="group/cta flex w-[33vw] shrink-0 flex-col items-center justify-center"
    >
      <span className="text-center font-serif text-4xl leading-tight text-charcoal transition-colors duration-300 group-hover/cta:text-gold md:text-5xl">
        Explore the rest
        <br />
        of our journey
      </span>
      <span className="mt-10 text-xs uppercase tracking-luxe text-ink/50 transition-colors duration-300 group-hover/cta:text-gold">
        View All Destinations
      </span>
      <span className="mt-2 text-2xl text-gold transition-transform duration-300 group-hover/cta:translate-x-1">
        →
      </span>
    </a>
  );
}

/**
 * Subtle film-strip backdrop that sits just behind the destination cards —
 * a quiet nod to the "camera roll" (sprocket holes top + bottom) without
 * competing with the polaroids. Static, very low-contrast, peeks out above
 * and below the cards.
 */
function FilmStrip() {
  const sprocket = {
    backgroundImage:
      "repeating-linear-gradient(to right, rgba(28,27,25,0.12) 0px, rgba(28,27,25,0.12) 7px, transparent 7px, transparent 15px)",
  };
  return (
    <div className="pointer-events-none absolute inset-x-0 -top-6 -bottom-6">
      <div className="relative h-full bg-charcoal/[0.035] ring-1 ring-inset ring-charcoal/[0.06]">
        <div className="h-3.5 w-full" style={sprocket} />
        <div className="absolute inset-x-0 bottom-0 h-3.5 w-full" style={sprocket} />
      </div>
    </div>
  );
}

/**
 * Signature destinations — an editorial grid. The "high" moment of the page.
 */
export function Destinations() {
  const rowRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(1);

  // Center card i. In the settled layout every card is 28vw + 2vw gap except
  // the active one (34vw), so card i's center sits at 33vw + 30vw·i + 17vw
  // and the scroll target is simply i · 30vw.
  const centerOn = (i: number) => {
    const el = rowRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth * 0.3, behavior: "smooth" });
  };

  // Start with the second card centered
  useEffect(() => {
    centerOn(1);
  }, []);

  const onScroll = () => {
    const el = rowRef.current;
    if (!el) return;
    const cards = Array.from(el.querySelectorAll("article"));
    const cx = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    cards.forEach((c, i) => {
      const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - cx);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setActive(best);
  };

  const scroll = (dir: number) => {
    centerOn(Math.max(0, Math.min(DESTINATIONS.length - 1, active + dir)));
  };

  return (
    <section id="destinations" className="relative bg-cream py-28 md:py-40">
      <div className="mx-auto max-w-[94vw] px-6 md:px-10">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-6 text-xs uppercase tracking-luxe text-gold">
              Signature Destinations
            </p>
            <h2 className="max-w-2xl font-serif text-4xl leading-tight text-charcoal md:text-5xl">
              <RevealText text="Places we know well, and keep to ourselves." />
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-ink/60">
            A few of the places we return to — each one held privately, each one
            different.
          </p>
        </div>
      </div>

      <div className="relative">
        <FilmStrip />
        <div ref={rowRef} onScroll={onScroll} className="relative z-10 flex w-full items-center gap-[2vw] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <CtaSide side="left" />
          {DESTINATIONS.map((d, i) => (
            <DestinationCard key={d.name} {...d} index={i} active={active} />
          ))}
          <CtaSide side="right" />
        </div>
      </div>

      {/* Edge arrows */}
      <button
        onClick={() => scroll(-1)}
        aria-label="Previous destination"
        className="absolute left-4 top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-charcoal/25 bg-ivory/70 text-xl text-charcoal backdrop-blur-sm transition-colors duration-300 hover:border-gold hover:text-gold md:left-8"
      >
        ←
      </button>
      <button
        onClick={() => scroll(1)}
        aria-label="Next destination"
        className="absolute right-4 top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-charcoal/25 bg-ivory/70 text-xl text-charcoal backdrop-blur-sm transition-colors duration-300 hover:border-gold hover:text-gold md:right-8"
      >
        →
      </button>
    </section>
  );
}
