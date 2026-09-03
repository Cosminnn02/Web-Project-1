"use client";

import { useEffect } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useReveal } from "@/hooks/useReveal";
import { prefersReducedMotion } from "@/lib/motion";
import { EXPERIENCES } from "@/lib/data";
import { RevealText } from "./RevealText";

/**
 * Curated Experiences — a pinned, scroll-driven sequence.
 *
 * The section pins to the viewport for (N+1) screens of scroll. An intro
 * statement act plays first, then each experience takes the full viewport as
 * a split act: half full-bleed image, half composed copy. Acts rise up into
 * place as you scroll — a vertical, presentation-style sequence.
 *
 * Mobile: each act stacks (image top, copy bottom) and still fills the screen.
 */
export function Experiences() {
  const ref = useReveal<HTMLElement>((scope) => {
    const slides = Array.from(scope.querySelectorAll<HTMLElement>(".ex-slide"));
    const intro = scope.querySelector<HTMLElement>(".ex-intro");
    const total = EXPERIENCES.length;

    // Pacing: how many viewport-heights of scroll each act takes to play.
    // Bigger = slower. Computed in px because GSAP's "+=…vh" drops the unit
    // and treats the number as pixels.
    const PER_ACT = 0.8;
    const PIN = (total + 1) * PER_ACT * window.innerHeight;

    // How long each act holds fully in view (timeline units) before exiting.
    const HOLD = 3;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scope,
        start: "top top",
        end: `+=${PIN}px`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    // Intro act exits upward
    tl.to(intro, {
      autoAlpha: 0,
      yPercent: -8,
      duration: 1,
      ease: "none",
    });

    // Each experience act: rise in from below, settle, then exit upward.
    // The first act starts only AFTER the intro has fully exited (">"), so
    // the two never cross-fade on top of each other.
    slides.forEach((s, i) => {
      tl.fromTo(
        s,
        { autoAlpha: 0, yPercent: 10 },
        { autoAlpha: 1, yPercent: 0, duration: 1, ease: "none" },
        i === 0 ? ">" : "-=0.35"
      );
      // Watermark word: reveal top-to-bottom (clip-path wipe) as the act lands
      const word = s.querySelector<HTMLElement>(".ex-word");
      if (word) {
        tl.fromTo(
          word,
          { autoAlpha: 0, clipPath: "inset(0% 0% 100% 0%)", yPercent: -8 },
          { autoAlpha: 1, clipPath: "inset(0% 0% 0% 0%)", yPercent: 0, duration: 0.8, ease: "none" },
          "-=1.0"
        );
      }
      // Main copy: reveal left-to-right (clip-path wipe) sliding in from off-screen
      const copy = s.querySelector<HTMLElement>(".ex-copy");
      if (copy) {
        tl.fromTo(
          copy,
          { autoAlpha: 0, clipPath: "inset(0% 100% 0% 0%)", xPercent: -12 },
          { autoAlpha: 1, clipPath: "inset(0% 0% 0% 0%)", xPercent: 0, duration: 1.3, ease: "none" },
          "-=0.8"
        );
      }
      tl.to({}, { duration: HOLD }); // hold — act stays fully in view
      if (i < slides.length - 1) {
        tl.to(s, { autoAlpha: 0, yPercent: -10, duration: 1, ease: "none" });
      }
    });

    // Quiet parallax on each image while its act is on screen
    slides.forEach((s) => {
      const img = s.querySelector<HTMLElement>(".ex-img");
      if (!img) return;
      gsap.fromTo(
        img,
        { yPercent: -4 },
        {
          yPercent: 4,
          ease: "none",
          scrollTrigger: {
            trigger: scope,
            start: "top top",
            end: `+=${PIN}px`,
            scrub: true,
          },
        }
      );
    });
  });

  // Reduced motion: useReveal skips its setup, so flag the section here to
  // let CSS un-pin it and stack the acts as a normal scrolling page.
  useEffect(() => {
    if (prefersReducedMotion() && ref.current) {
      ref.current.setAttribute("data-reduced", "");
    }
  }, [ref]);

  // Preload every act image through the Next image-optimizer URL so the
  // sequence plays with images already cached — no mid-scroll loading.
  useEffect(() => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const supported = [320, 480, 640, 750, 828, 1080, 1200, 1920, 2048, 3840];
    const nearest = (w: number) =>
      supported.reduce((a, b) => (Math.abs(b - w) < Math.abs(a - w) ? b : a));
    const widths = new Set([
      nearest(window.innerWidth * dpr), // mobile: 100vw
      nearest(window.innerWidth * 0.5 * dpr), // desktop: 50vw
    ]);
    EXPERIENCES.forEach((x) => {
      widths.forEach((w) => {
        const img = new window.Image();
        img.src = `/_next/image?url=${encodeURIComponent(x.image)}&w=${w}&q=75`;
      });
    });
  }, []);

  return (
    <section
      id="experiences"
      ref={ref}
      className="relative h-[100svh] overflow-hidden bg-ivory"
    >
      {/* Intro act */}
      <div className="ex-intro absolute inset-0 flex items-start justify-center bg-cream">
        <div className="w-full max-w-3xl px-6 pt-24 text-center md:pt-32">
          <p className="mb-8 text-xs uppercase tracking-luxe text-gold">
            Curated Experiences
          </p>
          <h2 className="mx-auto max-w-4xl font-serif text-4xl leading-[1.1] text-charcoal md:text-6xl">
            <RevealText text="Moments that cannot be booked — only arranged." />
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-ink/70">
            A few of the things we arrange for our clients — each one private,
            each one impossible to find on any itinerary. Scroll, and we will
            show you.
          </p>
        </div>
      </div>

      {/* Experience acts — split: half image, half info (side by side) */}
      {EXPERIENCES.map((x, i) => {
        const imageLeft = i % 2 === 0;
        return (
          <div
            key={x.title}
            className="ex-slide absolute inset-0 flex flex-col md:flex-row"
          >
            {/* Image half */}
            <div
              className={`relative h-[46svh] w-full overflow-hidden bg-cream md:h-full md:w-1/2 ${
                imageLeft ? "" : "md:order-2"
              }`}
            >
              <Image
                src={x.image}
                alt={x.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="ex-img h-full w-full scale-110 object-cover will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/25 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-charcoal/10" />
            </div>

            {/* Copy half */}
            <div
              className={`relative flex flex-1 flex-col justify-center overflow-hidden px-6 py-10 md:px-16 lg:px-24 ${
                imageLeft ? "" : "md:order-1"
              }`}
            >
              {/* Soft radial glow for depth */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(120% 90% at 50% 45%, rgba(201,174,134,0.16) 0%, rgba(239,234,225,0) 60%)",
                }}
              />
              {/* Ghosted word watermark — top */}
              <span
                aria-hidden
                className="ex-word pointer-events-none absolute top-24 left-2 select-none font-serif leading-none text-charcoal/[0.05] lg:left-10"
              >
                {x.word}
              </span>
              {/* Thin gold hairline accent */}
              <span
                aria-hidden
                className="pointer-events-none absolute left-0 top-1/2 hidden h-24 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-gold/50 to-transparent md:block"
              />

              <div className="ex-copy relative">
                <p className="mb-7 text-sm uppercase tracking-luxe text-gold">
                  {x.eyebrow}
                </p>
                <h3 className="font-serif text-4xl leading-[1.08] text-charcoal md:text-6xl">
                  {x.title}
                </h3>
                <p className="mt-7 max-w-lg text-lg leading-relaxed text-ink/75">
                  {x.description}
                </p>
                <ul className="mt-12 space-y-4 border-l border-gold/30 pl-7">
                  {x.details.map((d) => (
                    <li key={d} className="text-base text-ink/70">
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}


    </section>
  );
}
