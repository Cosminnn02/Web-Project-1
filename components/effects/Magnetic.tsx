"use client";

import { useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Magnetic wrapper — gently pulls its child toward the cursor, then springs back.
 * Keep strength low (0.2–0.3) so it reads as a nudge, not a grab.
 */
export function Magnetic({
  children,
  strength = 0.25,
}: {
  children: React.ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.5s cubic-bezier(0.19,1,0.22,1)";
    el.style.transform = "translate(0,0)";
    window.setTimeout(() => {
      el.style.transition = "";
    }, 500);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="inline-block will-change-transform"
    >
      {children}
    </div>
  );
}
