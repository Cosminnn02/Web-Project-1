"use client";

import { useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

/** Thin gold hairline at the top that fills as you scroll. */
export function ScrollProgress() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = document.querySelector(".scroll-progress");
    if (!el) return;

    const tween = gsap.to(el, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-0.5">
      <div className="scroll-progress h-full w-full origin-left scale-x-0 bg-gold" />
    </div>
  );
}
