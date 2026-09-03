"use client";

import { gsap } from "@/lib/gsap";
import { useReveal } from "@/hooks/useReveal";
import { DUR, EASE, STAGGER } from "@/lib/motion";
import { STEPS } from "@/lib/data";
import { RevealText } from "./RevealText";

/**
 * How it works — a calm, service-driven 3-step process.
 * Steps reveal in sequence; a hairline draws across to connect them.
 */
export function HowItWorks() {
  const ref = useReveal<HTMLDivElement>((scope) => {
    const steps = Array.from(scope.querySelectorAll(".step"));
    gsap.fromTo(
      steps,
      { y: 32, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: DUR.standard,
        ease: EASE.out,
        stagger: STAGGER.loose,
        scrollTrigger: {
          trigger: scope,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
    // Connecting line draws in
    gsap.fromTo(
      scope.querySelector(".step-line"),
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: DUR.long,
        ease: EASE.luxury,
        scrollTrigger: {
          trigger: scope,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  return (
    <section className="relative bg-cream px-6 py-28 md:px-10 md:py-40">
      <div ref={ref} className="mx-auto max-w-[94vw]">
        <div className="mb-20 max-w-2xl">
          <p className="mb-6 text-xs uppercase tracking-luxe text-gold">
            How It Works
          </p>
          <h2 className="font-serif text-4xl leading-tight text-charcoal md:text-5xl">
            <RevealText text="Three quiet steps. Nothing more." />
          </h2>
        </div>

        <div className="relative grid gap-12 md:grid-cols-3 md:gap-8">
          {/* Connecting line (desktop) */}
          <div className="step-line absolute left-0 top-7 hidden h-px w-full origin-left scale-x-0 bg-line md:block" />

          {STEPS.map((s) => (
            <div key={s.n} className="step relative">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-ivory font-serif text-lg text-gold">
                {s.n}
              </div>
              <h3 className="font-serif text-2xl text-charcoal">{s.title}</h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink/70">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
