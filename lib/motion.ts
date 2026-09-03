/**
 * Motion system — centralized tokens so every animation shares one "hand".
 * Golden rule: fewer, slower, more deliberate.
 */

export const EASE = {
  /** Gentle, luxurious settle — most reveals. */
  out: "power3.out",
  /** Symmetric — transitions between states. */
  inOut: "power2.inOut",
  /** Long, cinematic — hero + section transitions. */
  luxury: "power4.out",
  /** Subtle drift — parallax / ambient. */
  drift: "sine.inOut",
  /** CSS equivalents (for Tailwind arbitrary values / transitions). */
  cssOut: "cubic-bezier(0.215, 0.61, 0.355, 1)",
  cssLuxury: "cubic-bezier(0.19, 1, 0.22, 1)",
} as const;

export const DUR = {
  /** Hover states, cursor. */
  micro: 0.25,
  /** Text / image reveals. */
  standard: 0.7,
  /** Hero, section transitions. */
  long: 1.4,
  /** Preloader, big moments. */
  cinematic: 2.4,
} as const;

export const STAGGER = {
  /** Word / char reveals. */
  tight: 0.05,
  /** List items, cards. */
  standard: 0.08,
  /** Section blocks. */
  loose: 0.12,
} as const;

export const TRIGGER = {
  start: "top 75%",
  end: "bottom 25%",
  toggleActions: "play none none reverse",
  scrub: 1,
} as const;

/** True when the user prefers reduced motion. Guard every animation with this. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
