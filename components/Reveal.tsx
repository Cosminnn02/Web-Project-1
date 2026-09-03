"use client";

import { gsap } from "@/lib/gsap";
import { useReveal } from "@/hooks/useReveal";
import { DUR, EASE } from "@/lib/motion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

/** Fade + rise into view on scroll. The workhorse reveal. */
export function Reveal({ children, className, delay = 0, y = 32 }: RevealProps) {
  const ref = useReveal<HTMLDivElement>((scope) => {
    gsap.fromTo(
      scope,
      { y, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: DUR.standard,
        ease: EASE.out,
        delay,
        scrollTrigger: {
          trigger: scope,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  return <div ref={ref} className={className}>{children}</div>;
}
