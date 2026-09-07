"use client";

import { useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { useReveal } from "@/hooks/useReveal";
import { EASE } from "@/lib/motion";
import { STEPS } from "@/lib/data";
import { RevealText } from "@/components/effects/RevealText";

/**
 * How it works — a calm, service-driven 3-step process.
 * Steps reveal in sequence; a hairline draws across to connect them.
 */
export function HowItWorks() {
  const ref = useReveal<HTMLDivElement>((scope) => {
    const circles = Array.from(scope.querySelectorAll<HTMLElement>(".step-circle"));
    const copies = Array.from(scope.querySelectorAll<HTMLElement>(".step-copy"));
    const line = scope.querySelector<HTMLElement>(".step-line");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scope,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Circle 1 lands
    tl.fromTo(circles[0], { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(1.7)" });
    tl.fromTo(copies[0], { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: EASE.out }, "-=0.15");

    // Line draws to circle 2
    tl.to(line, { scaleX: 1 / 3, duration: 0.45, ease: "power2.inOut" }, "+=0.15");

    // Circle 2 lands
    tl.fromTo(circles[1], { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(1.7)" });
    tl.fromTo(copies[1], { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: EASE.out }, "-=0.15");

    // Line draws to circle 3
    tl.to(line, { scaleX: 2 / 3, duration: 0.45, ease: "power2.inOut" }, "+=0.15");

    // Circle 3 lands
    tl.fromTo(circles[2], { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(1.7)" });
    tl.fromTo(copies[2], { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: EASE.out }, "-=0.15");

    // Line draws to circle 4
    tl.to(line, { scaleX: 1, duration: 0.45, ease: "power2.inOut" }, "+=0.15");

    // Circle 4 — the Get Started button — lands
    tl.fromTo(circles[3], { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(1.7)" });
    tl.fromTo(copies[3], { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: EASE.out }, "-=0.15");
  });

  // Keep the connecting line sized to the real circle centers, and re-measure
  // on resize so it never overflows on a smaller screen.
  useEffect(() => {
    const scope = ref.current;
    if (!scope) return;

    const measure = () => {
      const line = scope.querySelector<HTMLElement>(".step-line");
      const steps = Array.from(scope.querySelectorAll<HTMLElement>(".step"));
      if (!line || steps.length < 2) return;

      // Measure the stable .step containers (not the circles, which animate
      // from scale 0). offsetLeft is layout-based, so it's correct regardless
      // of the entrance animation and updates on resize. The circle is 80px
      // (h-20 w-20) and sits at the left edge of each step, so its center is
      // step.offsetLeft + 40.
      const first = steps[0].offsetLeft;
      const last = steps[steps.length - 1].offsetLeft;
      line.style.left = `${first + 40}px`;
      line.style.width = `${last - first}px`;
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [ref]);

  return (
    <section className="relative overflow-hidden bg-cream px-6 py-36 md:px-10 md:py-56">
      {/* Subtle radial glow for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(100% 80% at 50% 50%, rgba(201,174,134,0.10) 0%, rgba(239,234,225,0) 65%)",
        }}
      />
      <div ref={ref} className="relative mx-auto max-w-[94vw]">
        <div className="mb-28 max-w-3xl">
          <p className="mb-8 text-xs uppercase tracking-luxe text-gold">
            How It Works
          </p>
          <h2 className="font-serif text-5xl leading-[1.1] text-charcoal md:text-7xl">
            <RevealText text="Three quiet steps. Nothing more." />
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink/70">
            No forms, no pressure. Just a conversation, a considered plan, and
            the journey itself.
          </p>
        </div>

        <div className="step-grid relative grid gap-16 md:grid-cols-4 md:gap-12">
          {/* Connecting line — left/width set from measured circle centers in JS */}
          <div className="step-line absolute top-10 hidden h-px origin-left scale-x-0 bg-gradient-to-r from-gold/40 via-gold/20 to-gold/40 md:block" />

          {STEPS.map((s) => (
            <div key={s.n} className="step relative">
              <div className="step-circle mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-gold/40 bg-ivory font-serif text-2xl text-gold shadow-sm">
                {s.n}
              </div>
              <div className="step-copy">
                <h3 className="font-serif text-3xl text-charcoal md:text-4xl">
                  {s.title}
                </h3>
                <p className="mt-5 max-w-sm text-base leading-relaxed text-ink/70">
                  {s.description}
                </p>
              </div>
            </div>
          ))}

          {/* Step 4 — the Get Started button */}
          <div className="step relative">
            <a
              href="/contact"
              className="step-circle mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-gold/40 bg-ivory font-serif text-2xl text-gold shadow-sm transition-colors duration-500 hover:bg-gold hover:text-ivory"
            >
              Go
            </a>
            <div className="step-copy">
              <h3 className="font-serif text-3xl text-charcoal md:text-4xl">
                Get Started
              </h3>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-ink/70">
                Begin the conversation — a few quiet details are all it takes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
