"use client";

import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useReveal } from "@/hooks/useReveal";
import { DUR, EASE } from "@/lib/motion";
import { ITINERARY } from "@/lib/data";
import { RevealText } from "./RevealText";
import { CTA } from "./CTA";

/**
 * Featured itinerary — the pinned "dark act". A full-bleed image with parallax
 * behind a composed itinerary: title, duration, highlights, CTA.
 */
export function FeaturedItinerary() {
  const ref = useReveal<HTMLElement>((scope) => {
    // Parallax on the background image
    gsap.to(scope.querySelector(".it-img"), {
      yPercent: 18,
      ease: "none",
      scrollTrigger: {
        trigger: scope,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // Staggered content reveal
    const items = Array.from(scope.querySelectorAll(".it-item"));
    gsap.fromTo(
      items,
      { y: 36, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: DUR.standard,
        ease: EASE.out,
        stagger: 0.09,
        scrollTrigger: {
          trigger: scope,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  return (
    <section
      id="itinerary"
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-charcoal px-6 py-28 text-ivory md:px-10 md:py-40"
    >
      {/* Parallax image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={ITINERARY.image}
          alt="The Amalfi coast at dusk"
          fill
          sizes="100vw"
          className="it-img h-full w-full scale-110 object-cover opacity-40 will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-charcoal/40" />
      </div>

      <div className="mx-auto w-full max-w-[94vw]">
        <div className="max-w-2xl">
          <p className="it-item mb-6 text-xs uppercase tracking-luxe text-gold">
            {ITINERARY.eyebrow}
          </p>

          <h2 className="it-item font-serif text-5xl leading-[1.05] md:text-7xl">
            <RevealText text={ITINERARY.title} />
          </h2>

          <p className="it-item mt-6 text-xs uppercase tracking-luxe text-ivory/60">
            {ITINERARY.duration}
          </p>

          <p className="it-item mt-8 max-w-xl text-base leading-relaxed text-ivory/80">
            {ITINERARY.description}
          </p>

          <ul className="it-item mt-10 space-y-3 border-l border-gold/30 pl-6">
            {ITINERARY.highlights.map((h) => (
              <li key={h} className="text-sm text-ivory/75">
                {h}
              </li>
            ))}
          </ul>

          <div className="it-item mt-12">
            <CTA href="#inquiry">View Full Itinerary</CTA>
          </div>
        </div>
      </div>
    </section>
  );
}
