"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { DUR, EASE, prefersReducedMotion } from "@/lib/motion";
import { CTA } from "./CTA";
import { Magnetic } from "./Magnetic";

const HERO_IMG =
  "https://images.unsplash.com/photo-1604145195376-e2c8195adf29?auto=format&fit=crop&w=2200&q=80";

/**
 * The one big moment. Full-bleed imagery, parallax, word-mask headline,
 * magnetic CTAs. Entrance plays on mount.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });
      tl.fromTo(
        el.querySelectorAll(".hero-word"),
        { yPercent: 110 },
        { yPercent: 0, duration: DUR.long, ease: EASE.luxury, stagger: 0.06 }
      )
        .fromTo(
          el.querySelector(".hero-sub"),
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: DUR.standard, ease: EASE.out },
          "-=0.6"
        )
        .fromTo(
          el.querySelector(".hero-cta"),
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: DUR.standard, ease: EASE.out },
          "-=0.5"
        )
        .fromTo(
          el.querySelector(".hero-scroll"),
          { opacity: 0 },
          { opacity: 1, duration: DUR.standard, ease: EASE.out },
          "-=0.3"
        );

      // Subtle parallax on the hero image
      gsap.to(el.querySelector(".hero-img"), {
        yPercent: 14,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const headline = "Travel, composed like a private affair.";
  const words = headline.split(" ");

  return (
    <section
      id="top"
      ref={root}
      className="relative flex h-[100svh] min-h-[640px] items-center overflow-hidden"
    >
      {/* Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={HERO_IMG}
          alt="A private coastal estate at golden hour"
          fill
          priority
          sizes="100vw"
          className="hero-img h-full w-full scale-110 object-cover will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/10 to-transparent" />
      </div>

      {/* Content */}
      <div className="mx-auto w-full max-w-[94vw] px-6 md:px-10">
        <p className="mb-6 text-[clamp(0.7rem,0.9vw,1rem)] uppercase tracking-luxe text-ivory/70">
          A private travel atelier
        </p>

        <h1 className="max-w-7xl font-serif text-[clamp(2.75rem,6vw,6rem)] leading-[1.05] text-ivory">
          {words.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom">
              <span className="hero-word inline-block will-change-transform">
                {w}
                {"\u00A0"}
              </span>
            </span>
          ))}
        </h1>

        <p className="hero-sub mt-8 max-w-2xl text-[clamp(1rem,1.25vw,1.25rem)] leading-relaxed text-ivory/80">
          Bespoke journeys for a small circle of clients — quietly planned,
          carefully composed, and entirely your own.
        </p>

        <div className="hero-cta mt-12 flex flex-wrap items-center gap-4">
          <Magnetic>
            <a
              href="/private-travel"
              className="group inline-flex items-center gap-3 bg-ivory px-[clamp(1.5rem,2vw,2.5rem)] py-[clamp(0.9rem,1.1vw,1.4rem)] text-[clamp(0.7rem,0.85vw,0.95rem)] uppercase tracking-luxe text-charcoal transition-colors duration-500 hover:bg-gold hover:text-ivory"
            >
              Begin Inquiry
              <span className="transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </a>
          </Magnetic>
          <CTA href="#destinations" variant="ghost" light>
            Explore Destinations
          </CTA>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="hero-scroll absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
        <span className="text-[0.6rem] uppercase tracking-luxe text-ivory/60">
          Scroll
        </span>
        <span className="h-10 w-px bg-gradient-to-b from-ivory/60 to-transparent" />
      </div>
    </section>
  );
}
