"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Refined dot + trailing ring cursor. Grows over interactive elements.
 * Skipped on touch devices and under reduced motion.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (prefersReducedMotion()) return;

    const pos = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    let visible = false;

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (!visible) {
        visible = true;
        if (dot.current) dot.current.style.opacity = "1";
        if (ring.current) ring.current.style.opacity = "1";
      }
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const loop = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.18;
      ringPos.y += (pos.y - ringPos.y) * 0.18;
      if (dot.current)
        dot.current.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
      if (ring.current)
        ring.current.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    const grow = (on: boolean) => {
      if (!ring.current) return;
      ring.current.style.width = on ? "56px" : "28px";
      ring.current.style.height = on ? "56px" : "28px";
      ring.current.style.borderColor = on
        ? "rgba(176,141,87,0.9)"
        : "rgba(176,141,87,0.5)";
    };
    const bind = (el: Element) => {
      el.addEventListener("mouseenter", () => grow(true));
      el.addEventListener("mouseleave", () => grow(false));
    };
    document.querySelectorAll("a, button, [data-cursor]").forEach(bind);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-gold opacity-0"
      />
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-7 w-7 rounded-full border border-gold/50 opacity-0 transition-[width,height,border-color] duration-300"
      />
    </>
  );
}
