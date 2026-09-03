"use client";

import { gsap } from "@/lib/gsap";
import { useReveal } from "@/hooks/useReveal";
import { DUR, EASE } from "@/lib/motion";
import { TESTIMONIAL } from "@/lib/data";

/**
 * A single, elegant client quote. No clutter — just the words, given room.
 */
export function Testimonial() {
  const ref = useReveal<HTMLElement>((scope) => {
    gsap.fromTo(
      scope.querySelector(".tq-quote"),
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: DUR.long,
        ease: EASE.luxury,
        scrollTrigger: {
          trigger: scope,
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
      }
    );
    gsap.fromTo(
      scope.querySelector(".tq-by"),
      { opacity: 0 },
      {
        opacity: 1,
        duration: DUR.standard,
        ease: EASE.out,
        delay: 0.3,
        scrollTrigger: {
          trigger: scope,
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  return (
    <section
      ref={ref}
      className="relative bg-charcoal px-6 py-12 text-ivory md:px-10 md:py-16"
    >
      <div className="mx-auto max-w-2xl text-center">
        <span className="mb-4 block font-serif text-4xl leading-none text-gold/50">
          &ldquo;
        </span>
        <blockquote className="tq-quote font-serif text-xl leading-[1.45] text-ivory md:text-2xl">
          {TESTIMONIAL.quote}
        </blockquote>
        <div className="tq-by mt-6">
          <p className="text-[0.65rem] uppercase tracking-luxe text-ivory/70">
            {TESTIMONIAL.author}
          </p>
          <p className="mt-1 text-[0.65rem] tracking-luxe text-ivory/40">
            {TESTIMONIAL.detail}
          </p>
        </div>
      </div>
    </section>
  );
}
