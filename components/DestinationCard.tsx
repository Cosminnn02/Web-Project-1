"use client";

import Link from "next/link";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useReveal } from "@/hooks/useReveal";
import { DUR, EASE } from "@/lib/motion";
import type { Destination } from "@/lib/data";

interface DestinationCardProps {
  d: Destination;
  index: number;
}

/**
 * Editorial destination card — a tall photograph in a quiet ivory frame,
 * with the name, region, and price set beneath in the site's type system.
 *
 * Hover: the whole card glides sideways (X only — no vertical drift),
 * the frame swells a touch, and an ivory detail sheet rises out of the
 * photograph carrying the name, a line of copy, and the price. A larger
 * box, opening — not a swap.
 */
export function DestinationCard({ d, index }: DestinationCardProps) {
  const ref = useReveal<HTMLElement>((scope) => {
    gsap.fromTo(
      scope,
      { y: 48, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: DUR.standard,
        ease: EASE.out,
        delay: (index % 3) * 0.09,
        scrollTrigger: {
          trigger: scope,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      }
    );

    /* ——— Hover choreography ——— */
    const box = scope.querySelector<HTMLElement>(".dc-box");
    const img = scope.querySelector<HTMLElement>(".dc-img");
    const panel = scope.querySelector<HTMLElement>(".dc-panel");

    // Rest state for the sheet: parked below the frame.
    gsap.set(panel, { yPercent: 104, autoAlpha: 0 });

    const enter = () => {
      // Glide — horizontal axis only.
      gsap.to(scope, { x: 12, duration: DUR.long, ease: EASE.luxury, overwrite: "auto" });
      gsap.to(box, { scale: 1.035, duration: DUR.long, ease: EASE.luxury, overwrite: "auto" });
      gsap.to(img, { scale: 1.09, duration: DUR.long, ease: EASE.luxury, overwrite: "auto" });
      // The detail sheet rises into the photograph.
      gsap.to(panel, {
        yPercent: 0,
        autoAlpha: 1,
        duration: DUR.standard * 1.2,
        ease: EASE.luxury,
        overwrite: "auto",
      });
    };

    const leave = () => {
      gsap.to(scope, { x: 0, duration: DUR.long, ease: EASE.luxury, overwrite: "auto" });
      gsap.to(box, { scale: 1, duration: DUR.long, ease: EASE.luxury, overwrite: "auto" });
      gsap.to(img, { scale: 1, duration: DUR.long, ease: EASE.luxury, overwrite: "auto" });
      gsap.to(panel, {
        yPercent: 104,
        autoAlpha: 0,
        duration: DUR.standard * 0.7,
        ease: EASE.inOut,
        overwrite: "auto",
      });
    };

    scope.addEventListener("mouseenter", enter);
    scope.addEventListener("mouseleave", leave);
  });

  return (
    <Link
      href={`/destinations/${d.slug}`}
      className="group block outline-none focus-visible:ring-1 focus-visible:ring-gold/70"
    >
      <article ref={ref} data-cursor className="block will-change-transform">
        {/* Photograph + rising detail sheet */}
        <div className="dc-box relative overflow-hidden bg-cream ring-1 ring-charcoal/5 will-change-transform">
          <div className="relative aspect-[16/10]">
            <Image
              src={d.image}
              alt={d.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="dc-img object-cover will-change-transform"
            />
            {/* Quiet veil so the sheet reads on any photograph */}
            <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-700 group-hover:bg-charcoal/25" />
          </div>

          {/* The expanding box — name, a line of copy, the price */}
          <div
            className="dc-panel absolute inset-x-0 bottom-0 z-10 flex h-[76%] translate-y-full flex-col justify-end bg-ivory/95 px-6 pb-6 opacity-0 backdrop-blur-[2px]"
          >
            <p className="text-[0.55rem] uppercase tracking-luxe text-gold">
              {d.continent} · {d.region}
            </p>
            <h3 className="mt-2.5 font-serif text-3xl leading-tight text-charcoal">
              {d.name}
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/70">
              {d.description}
            </p>
            <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
              <span className="text-[0.6rem] uppercase tracking-luxe text-gold">
                {d.price}
              </span>
              <span className="text-[0.6rem] uppercase tracking-luxe text-ink/60 transition-colors duration-300 group-hover:text-gold">
                View itinerary →
              </span>
            </div>
          </div>
        </div>

        {/* Caption */}
        <div className="mt-4 flex items-baseline justify-between gap-4">
          <div className="min-w-0">
            <h3 className="font-serif text-xl leading-tight text-charcoal">
              {d.name}
            </h3>
            <p className="mt-1 text-[0.65rem] uppercase tracking-luxe text-ink/50">
              {d.region}
            </p>
          </div>
          <span className="shrink-0 font-serif text-sm italic text-gold">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink/65">
          {d.description}
        </p>
      </article>
    </Link>
  );
}
