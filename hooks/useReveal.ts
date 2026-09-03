"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Scoped GSAP setup with automatic cleanup.
 * `setup` receives the element and defines its animations (tweens + ScrollTriggers).
 * On unmount, `gsap.context.revert()` tears everything down cleanly.
 * Skips all animation when the user prefers reduced motion (content stays visible).
 */
export function useReveal<T extends HTMLElement>(
  setup: (scope: T) => void,
  deps: unknown[] = []
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => setup(el), el);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
