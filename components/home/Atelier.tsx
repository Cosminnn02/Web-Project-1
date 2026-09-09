"use client";

import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useReveal } from "@/hooks/useReveal";
import { DUR, EASE, STAGGER } from "@/lib/motion";
import { ATELIER } from "@/lib/data";
import { CTA } from "@/components/shared/CTA";

/**
 * The Atelier — alternating image / text rows.
 * Each row's copy rises in as it enters the viewport.
 */
export function Atelier() {
  const ref = useReveal<HTMLElement>((scope) => {
    const rows = Array.from(scope.querySelectorAll<HTMLElement>(".at-row"));
    rows.forEach((row) => {
      const items = Array.from(row.querySelectorAll<HTMLElement>(".at-item"));
      gsap.fromTo(
        items,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: DUR.standard,
          ease: EASE.out,
          stagger: STAGGER.standard,
          scrollTrigger: {
            trigger: row,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  });

  return (
    <section ref={ref} className="relative bg-ivory">
      {/* Rows stack edge-to-edge — full-bleed image, half the viewport each */}
      <div className="flex flex-col gap-10">
        {ATELIER.map((row, i) => {
          const isLast = i === ATELIER.length - 1;
          return (
          <div
            key={row.title}
            className="at-row grid items-stretch md:grid-cols-2"
          >
            {/* Image — full-bleed, tall */}
            <div
              className={`relative aspect-[4/3] w-full overflow-hidden bg-cream shadow-[0_2px_4px_rgba(28,27,25,0.08),0_40px_100px_-12px_rgba(0,0,0,0.5)] md:aspect-auto md:min-h-[55vh] ${
                row.imageLeft ? "md:order-1" : "md:order-2"
              }`}
            >
              <Image
                src={row.image}
                alt={row.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Copy */}
            <div
              className={`relative flex flex-col justify-center px-6 py-14 md:px-16 lg:px-24 ${
                row.imageLeft ? "md:order-2" : "md:order-1"
              }`}
            >
              {isLast && (
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-cream to-transparent md:h-72" />
              )}
              <p className="at-item mb-5 text-sm uppercase tracking-luxe text-gold">
                {row.eyebrow}
              </p>
              <h2 className="at-item font-serif text-5xl leading-[1.08] text-charcoal md:text-6xl">
                {row.title}
              </h2>
              <div className="at-item mt-8 space-y-5">
                {row.body.map((p, i) => (
                  <p key={i} className="max-w-xl text-lg leading-relaxed text-ink/75">
                    {p}
                  </p>
                ))}
              </div>
              {row.cta && (
                <div className="at-item mt-10">
                  <CTA href={row.cta.href}>{row.cta.label}</CTA>
                </div>
              )}
            </div>
          </div>
          );
        })}
      </div>
    </section>
  );
}
