"use client";

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
 * Staggered entrance on scroll; the image breathes on hover.
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

    const img = scope.querySelector(".dc-img");
    const enter = () =>
      gsap.to(img, { scale: 1.05, duration: DUR.long, ease: EASE.luxury });
    const leave = () =>
      gsap.to(img, { scale: 1, duration: DUR.long, ease: EASE.luxury });
    scope.addEventListener("mouseenter", enter);
    scope.addEventListener("mouseleave", leave);
  });

  return (
    <article ref={ref} data-cursor className="group cursor-pointer">
      {/* Photograph */}
      <div className="relative aspect-[4/5] overflow-hidden bg-cream ring-1 ring-charcoal/5">
        <Image
          src={d.image}
          alt={d.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="dc-img object-cover will-change-transform"
        />
        {/* Quiet veil + price, revealed on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute inset-x-0 bottom-0 flex translate-y-2 items-center justify-between px-5 py-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="text-[0.6rem] uppercase tracking-luxe text-ivory/90">
            {d.continent}
          </span>
          <span className="text-[0.6rem] uppercase tracking-luxe text-gold">
            {d.price}
          </span>
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
  );
}
