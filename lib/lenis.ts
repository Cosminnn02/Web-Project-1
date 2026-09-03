import type Lenis from "lenis";

let lenis: Lenis | null = null;

export function setLenis(l: Lenis | null) {
  lenis = l;
}

export function getLenis() {
  return lenis;
}

/** Smooth-scroll to a selector or pixel offset, accounting for the fixed nav. */
export function scrollTo(target: string | number) {
  if (lenis) {
    lenis.scrollTo(target, { offset: -72, duration: 1.4 });
  } else if (typeof target === "string") {
    const el = document.querySelector(target);
    el?.scrollIntoView({ behavior: "smooth" });
  }
}
