"use client";

import { useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useReveal } from "@/hooks/useReveal";
import { DUR, EASE } from "@/lib/motion";
import { ITINERARY } from "@/lib/data";
import { RevealText } from "./RevealText";
import { CTA } from "./CTA";

const GALLERY = [
  { src: ITINERARY.imageMain, alt: "Positano at golden hour" },
  { src: ITINERARY.imageLeft, alt: "A quiet coastal detail" },
  { src: ITINERARY.imageRight, alt: "A quiet coastal detail" },
  { src: ITINERARY.imageExtra1, alt: "A quiet coastal detail" },
  { src: ITINERARY.imageExtra2, alt: "A quiet coastal detail" },
];

/**
 * Ring positions, keyed by signed offset from the active image.
 * 0 = center (big, front) · ±1 = sides · ±2 = behind (small, dim, lifted).
 * left/top/width are % of the ring container; s = scale; z = depth; o = opacity.
 */
const POS: Record<
  number,
  { left: number; w: number; top: number; s: number; z: number; o: number; ry: number }
> = {
  0: { left: 50, w: 66, top: 14, s: 1, z: 30, o: 1, ry: 0 },
  1: { left: 84, w: 34, top: 36, s: 1, z: 20, o: 0.85, ry: 22 },
  [-1]: { left: 16, w: 34, top: 36, s: 1, z: 20, o: 0.85, ry: -22 },
  2: { left: 66, w: 26, top: 29, s: 0.9, z: 10, o: 0.5, ry: 40 },
  [-2]: { left: 34, w: 26, top: 29, s: 0.9, z: 10, o: 0.5, ry: -40 },
};

/**
 * Featured itinerary — the pinned "dark act". A full-bleed image with parallax
 * behind a composed itinerary: title, duration, highlights, CTA.
 */
export function FeaturedItinerary() {
  const [active, setActive] = useState(0);
  const n = GALLERY.length;
  const go = (dir: number) => setActive((a) => (a + dir + n) % n);

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

    // Framed image: clip-path wipe from the right + a gentle parallax drift.
    const frame = scope.querySelector(".it-frame");
    if (frame) {
      gsap.fromTo(
        frame,
        { autoAlpha: 0, clipPath: "inset(0% 0% 0% 100%)", xPercent: 6 },
        {
          autoAlpha: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          xPercent: 0,
          duration: DUR.long,
          ease: EASE.luxury,
          scrollTrigger: {
            trigger: scope,
            start: "top 55%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  });

  return (
    <section
      id="itinerary"
      ref={ref}
      className="relative flex min-h-[70svh] items-center overflow-hidden bg-charcoal px-6 py-28 text-ivory md:px-10 md:py-40"
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

      <div className="mx-auto grid w-full max-w-[94vw] items-center gap-14 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-4">
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
            <CTA>View Full Itinerary</CTA>
          </div>
        </div>

        {/* Foreground gallery — a 5-image ring: center big, 2 sides, 2 behind */}
        <div className="it-frame md:col-span-8">
          <div
            className="relative w-full mt-20"
            style={{ aspectRatio: "2.4 / 1", perspective: "1200px" }}
          >
            {GALLERY.map((img, i) => {
              let off = (i - active) % n;
              if (off > n / 2) off -= n;
              if (off < -n / 2) off += n;
              const p = POS[off];
              return (
                <div
                  key={i}
                  className="absolute overflow-hidden shadow-[0_1px_2px_rgba(28,27,25,0.06),0_24px_60px_-20px_rgba(0,0,0,0.6)] transition-all duration-700 [transition-timing-function:cubic-bezier(0.19,1,0.22,1)]"
                  style={{
                    left: `${p.left}%`,
                    width: `${p.w}%`,
                    top: `${p.top}%`,
                    transform: `translateX(-50%) scale(${p.s}) rotateY(${p.ry}deg)`,
                    zIndex: p.z,
                    opacity: p.o,
                  }}
                >
                  <div className="relative aspect-video overflow-hidden bg-cream">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="40vw"
                      className="h-full w-full scale-110 object-cover"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Arrows */}
          <div className="mt-14 flex items-center justify-center gap-4">
            <button
              onClick={() => go(-1)}
              aria-label="Previous image"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-ivory/25 text-lg text-ivory/80 transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              ←
            </button>
            <div className="h-px w-40 bg-gradient-to-r from-gold/40 via-gold/20 to-gold/40" />
            <button
              onClick={() => go(1)}
              aria-label="Next image"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-ivory/25 text-lg text-ivory/80 transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
