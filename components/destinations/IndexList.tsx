"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { destinationsByContinent } from "@/lib/data";

/**
 * IndexList — the "table of contents" of the collection.
 *
 * Destinations grouped by continent, in a quiet typographic index.
 * Hovering a row raises the destination's image in a floating frame
 * that trails the cursor — the collection, held in the hand.
 */
export function IndexList() {
  const groups = destinationsByContinent();

  /* — floating preview frame (Y-locked, follows the cursor horizontally) — */
  const frame = useRef<HTMLDivElement>(null);
  const [preview, setPreview] = useState<{
    src: string;
    name: string;
    description: string;
  } | null>(null);

  /* — three-level tree: index → continents → destinations — */
  const [indexOpen, setIndexOpen] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const toggleIndex = () => setIndexOpen((cur) => !cur);
  const toggle = (continent: string) =>
    setOpen((cur) => (cur === continent ? null : continent));

  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    if (prefersReducedMotion()) return;
    if (window.matchMedia("(hover: none)").matches) return;

    // Y is locked to the viewport centre — the frame only travels horizontally.
    const lockY = () => gsap.set(el, { y: (window.innerHeight - el.offsetHeight) / 2 });
    lockY();

    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const onMove = (e: MouseEvent) => {
      const maxX = window.innerWidth - el.offsetWidth - 16;
      xTo(Math.min(e.clientX + 40, maxX));
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", lockY);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", lockY);
    };
  }, []);

  /* — entrance/exit: the card grows out of the row — */
  const reduced = typeof window !== "undefined" && prefersReducedMotion();
  const showFrame = (d: { image: string; name: string; description: string }) => {
    setPreview({ src: d.image, name: d.name, description: d.description });
    const el = frame.current;
    if (!el) return;
    gsap.killTweensOf(el);
    gsap.fromTo(
      el,
      { scale: reduced ? 1 : 0.82, autoAlpha: 0 },
      {
        scale: 1,
        autoAlpha: 1,
        duration: reduced ? 0 : 0.55,
        ease: "power3.out",
        overwrite: "auto",
      }
    );
  };
  const hideFrame = () => {
    setPreview(null);
    const el = frame.current;
    if (!el) return;
    gsap.to(
      el,
      {
        scale: 0.92,
        autoAlpha: 0,
        duration: reduced ? 0 : 0.3,
        ease: "power2.in",
        overwrite: "auto",
      }
    );
  };

  /* Image settle: runs after React has committed the new <Image> */
  const imgRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!preview || reduced) return;
    const img = imgRef.current?.querySelector("img");
    if (img) gsap.fromTo(img, { scale: 1.14 }, { scale: 1, duration: 1, ease: "power3.out" });
  }, [preview, reduced]);

  /* Continuous index across groups, computed once. */
  const numberFor = new Map<string, number>();
  let n = 0;
  for (const { items } of groups) for (const d of items) numberFor.set(d.slug, ++n);

  return (
    <div className="relative">
      {/* Floating frame — follows the cursor horizontally, locked in Y.
          A full card: picture, name, a line of description. */}
      <div
        ref={frame}
        style={{ visibility: "hidden" }}
        className="pointer-events-none fixed left-0 top-0 z-40 h-[26rem] w-[22rem] overflow-hidden shadow-[0_32px_80px_-24px_rgba(28,27,25,0.55)] ring-1 ring-charcoal/10 md:h-96 md:w-[26rem]"
        aria-hidden
      >
        {preview && (
          <div ref={imgRef} className="relative h-full w-full">
            <Image
              src={preview.src}
              alt=""
              fill
              sizes="416px"
              className="object-cover will-change-transform"
              priority={false}
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/85 via-charcoal/40 to-transparent px-6 pb-5 pt-20">
              <span className="text-[0.6rem] uppercase tracking-luxe text-gold">
                The Collection
              </span>
              <h4 className="mt-1.5 font-serif text-2xl leading-tight text-ivory">
                {preview.name}
              </h4>
              <p className="mt-2 line-clamp-3 text-[0.8rem] leading-relaxed text-ivory/75">
                {preview.description}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Level 1 — The Index (matches the page's section headers, starts closed) */}
      <button
        type="button"
        onClick={toggleIndex}
        aria-expanded={indexOpen}
        className="group mb-2 flex w-full items-end justify-between gap-6 border-b border-line pb-6 text-left"
      >
        <h2 className="font-serif text-3xl text-charcoal md:text-4xl">
          The Index
        </h2>
        <span className="flex items-center gap-4 text-right text-xs uppercase tracking-luxe text-ink/40">
          Eighteen destinations, in the order we keep them
          <span
            className={`text-base leading-none text-gold transition-transform duration-500 [transition-timing-function:cubic-bezier(0.19,1,0.22,1)] ${
              indexOpen ? "rotate-180" : "rotate-0"
            }`}
          >
            ⌄
          </span>
        </span>
      </button>

      {/* Level 2 — Continents (inside the index) */}
      <div
        className={`grid ${
          reduced
            ? ""
            : "transition-[grid-template-rows] duration-500 [transition-timing-function:cubic-bezier(0.19,1,0.22,1)]"
        } ${indexOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <div className="pt-10">
            {groups.map(({ continent, items }) => {
              const isOpen = open === continent;
              return (
                <div key={continent} className="mb-8 last:mb-0">
                  <button
                    type="button"
                    onClick={() => toggle(continent)}
                    aria-expanded={isOpen}
                    className="flex w-full items-end justify-between gap-6 border-b border-line pb-4 text-left"
                  >
                    <h3 className="font-serif text-xl text-charcoal md:text-2xl">
                      {continent}
                    </h3>
                    <span className="flex items-center gap-4 text-right text-[0.6rem] uppercase tracking-luxe text-ink/40">
                      {items.length} {items.length === 1 ? "place" : "places"}
                      <span
                        className={`text-base leading-none text-gold transition-transform duration-500 [transition-timing-function:cubic-bezier(0.19,1,0.22,1)] ${
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                      >
                        ⌄
                      </span>
                    </span>
                  </button>

                  {/* Level 3 — Destinations (inside the continent) */}
                  <div
                    className={`grid ${
                      reduced
                        ? ""
                        : "transition-[grid-template-rows] duration-500 [transition-timing-function:cubic-bezier(0.19,1,0.22,1)]"
                    } ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                  >
                    <div className="overflow-hidden">
                      <div className="border-b border-line/80">
                        {items.map((d) => {
                          const num = String(numberFor.get(d.slug) ?? 0).padStart(2, "0");
                          return (
                            <Link
                              key={d.slug}
                              href={`/destinations/${d.slug}`}
                              className="idx-row group flex items-baseline gap-4 border-t border-line/80 px-2 py-4 transition-colors duration-300 first:border-t-0 hover:bg-cream/70 md:gap-6 md:py-5"
                              onMouseEnter={() => showFrame(d)}
                              onMouseLeave={hideFrame}
                            >
                              <span className="w-6 shrink-0 font-serif text-sm italic text-gold/70 md:w-8">
                                {num}
                              </span>
                              <span className="min-w-0 flex-1 truncate font-serif text-xl leading-snug text-charcoal transition-transform duration-500 [transition-timing-function:cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-1.5 md:text-2xl">
                                {d.name}
                              </span>
                              <span className="hidden w-40 shrink-0 text-left text-[0.6rem] uppercase tracking-luxe text-ink/45 sm:block">
                                {d.region}
                              </span>
                              <span className="hidden w-40 shrink-0 text-left text-[0.6rem] uppercase tracking-luxe text-ink/45 lg:block">
                                {d.season}
                              </span>
                              <span className="shrink-0 text-[0.6rem] uppercase tracking-luxe text-gold">
                                {d.price}
                              </span>
                              <span className="-mr-1 shrink-0 text-lg text-gold opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100">
                                →
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
