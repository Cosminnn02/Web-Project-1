"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Slow, continuous ticker. Duplicated once and animated -50% for a seamless loop.
 * Pauses on hover. Skipped under reduced motion.
 */
export function Marquee({ items }: { items: string[] }) {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el || prefersReducedMotion()) return;

    const tween = gsap.to(el, {
      xPercent: -50,
      duration: 30,
      ease: "none",
      repeat: -1,
    });
    const pause = () => tween.pause();
    const play = () => tween.play();
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", play);

    return () => {
      tween.kill();
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", play);
    };
  }, []);

  return (
    <div className="overflow-hidden border-y border-line py-6">
      <div ref={track} className="flex w-max whitespace-nowrap will-change-transform">
        {[...items, ...items].map((t, i) => (
          <span
            key={i}
            className="mx-10 flex items-center gap-10 font-serif text-2xl text-ink/60"
          >
            {t}
            <span className="text-gold">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
