"use client";

import { useEffect } from "react";
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
      // Main copy: clip-path wipe from the outer edge (opposite the image)
      const copy = s.querySelector<HTMLElement>(".ex-copy");
      if (copy) {
        const fromRight = s.dataset.imageLeft === "true";
        tl.fromTo(
          copy,
          {
            autoAlpha: 0,
            clipPath: fromRight ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)",
            xPercent: fromRight ? 12 : -12,
          },
          { autoAlpha: 1, clipPath: "inset(0% 0% 0% 0%)", xPercent: 0, duration: 1.3, ease: "none" },
          "-=0.8"
        );
      }
      tl.to({}, { duration: HOLD }); // hold — act stays fully in view
      if (i < slides.length - 1) {
        tl.to(s, { autoAlpha: 0, yPercent: -10, duration: 1, ease: "none" });
      }
    });

    // Quiet parallax on each media while its act is on screen
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

    // Play only the active slide's clip; pause the rest to avoid 5 decoders.
    const videos = Array.from(scope.querySelectorAll<HTMLVideoElement>(".ex-img"));
    let active = -1;
    const setPlaying = (i: number) => {
      if (i === active) return;
      active = i;
      videos.forEach((v, j) => {
        if (j === i) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      });
    };
    tl.eventCallback("onUpdate", () => {
      const p = tl.progress();
      const i = Math.min(slides.length - 1, Math.max(0, Math.floor(p * slides.length)));
      setPlaying(i);
    });
    // Pause everything when the section is out of view; resume the active one on return.
    gsap.to({}, {
      duration: 0.01,
      scrollTrigger: {
        trigger: scope,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => setPlaying(active),
        onEnterBack: () => setPlaying(active),
        onLeave: () => videos.forEach((v) => v.pause()),
        onLeaveBack: () => videos.forEach((v) => v.pause()),
      },
    });
  });

  // Reduced motion: useReveal skips its setup, so flag the section here to
  // let CSS un-pin it and stack the acts as a normal scrolling page.
  useEffect(() => {
    if (prefersReducedMotion() && ref.current) {
      ref.current.setAttribute("data-reduced", "");
    }
  }, [ref]);

  // Preload the clip files so the sequence plays without mid-scroll buffering.
  useEffect(() => {
    EXPERIENCES.forEach((x) => {
      const v = document.createElement("video");
      v.preload = "auto";
      v.muted = true;
      v.src = `/videos/${x.video}`;
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
            data-image-left={imageLeft}
            className="ex-slide absolute inset-0 flex flex-col md:flex-row"
          >
            {/* Image half */}
            <div
              className={`relative h-[46svh] w-full overflow-hidden bg-cream md:h-full md:w-[60%] ${
                imageLeft ? "" : "md:order-2"
              }`}
            >
              <video
                className="ex-img h-full w-full scale-110 object-cover will-change-transform"
                src={`/videos/${x.video}`}
                poster={x.image}
                muted
                loop
                playsInline
                preload="auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/25 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-charcoal/10" />
            </div>

            {/* Copy half */}
            <div
              className={`relative flex flex-1 flex-col justify-center overflow-hidden px-6 py-10 md:px-16 lg:px-24 ${
                imageLeft ? "md:items-end md:text-right" : "md:order-1"
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
              {/* Ghosted word watermark — top, hugging the edge that touches the image */}
              <span
                aria-hidden
                className={`ex-word pointer-events-none absolute top-24 select-none font-serif leading-none text-charcoal/[0.05] ${
                  imageLeft ? "left-2 lg:left-10" : "right-2 lg:right-10"
                }`}
              >
                {x.word}
              </span>
              {/* Thin gold hairline accent — outer edge, opposite the image */}
              <span
                aria-hidden
                className={`pointer-events-none absolute top-1/2 hidden h-24 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-gold/50 to-transparent md:block ${
                  imageLeft ? "right-0" : "left-0"
                }`}
              />

              <div className="ex-copy relative">
                <p className="mb-7 text-[clamp(0.7rem,1.2vw,0.875rem)] uppercase tracking-luxe text-gold">
                  {x.eyebrow}
                </p>
                <h3 className="font-serif text-[clamp(1.75rem,4.5vw,3.75rem)] leading-[1.08] text-charcoal">
                  {x.title}
                </h3>
                <p className="mt-7 max-w-lg text-[clamp(0.9rem,1.8vw,1.125rem)] leading-relaxed text-ink/75">
                  {x.description}
                </p>
                <ul
                  className={`mt-12 space-y-4 border-gold/30 ${
                    imageLeft ? "border-r pr-7" : "border-l pl-7"
                  }`}
                >
                  {x.details.map((d) => (
                    <li key={d} className="text-[clamp(0.85rem,1.5vw,1rem)] text-ink/70">
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
