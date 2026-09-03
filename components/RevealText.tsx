"use client";

import { gsap } from "@/lib/gsap";
import { useReveal } from "@/hooks/useReveal";
import { DUR, EASE, STAGGER } from "@/lib/motion";

interface RevealTextProps {
  text: string;
  className?: string;
  delay?: number;
}

/**
 * Word-by-word mask reveal — the signature editorial reveal.
 * Each word rises out of an overflow-hidden mask, staggered.
 */
export function RevealText({ text, className, delay = 0 }: RevealTextProps) {
  const ref = useReveal<HTMLSpanElement>((scope) => {
    const words = Array.from(scope.querySelectorAll<HTMLElement>(".rv-word"));
    gsap.fromTo(
      words,
      { yPercent: 110 },
      {
        yPercent: 0,
        duration: DUR.standard,
        ease: EASE.out,
        stagger: STAGGER.tight,
        delay,
        scrollTrigger: {
          trigger: scope,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  const words = text.split(" ");
  return (
    <span ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <span className="rv-word inline-block will-change-transform">
            {w}
            {"\u00A0"}
          </span>
        </span>
      ))}
    </span>
  );
}
