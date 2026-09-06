"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useReveal } from "@/hooks/useReveal";
import { DUR, EASE, prefersReducedMotion } from "@/lib/motion";
import { DESTINATIONS } from "@/lib/data";
import { RevealText } from "./RevealText";
import { Reveal } from "./Reveal";
import { Testimonial } from "./Testimonial";
import { CTA } from "./CTA";

/** The hero keeps four houses turning, slowly, behind the statement. */
const SLIDES = [
  "/images/destinations/santorini-hero.jpg",
  "/images/destinations/swiss-alps-hero.jpg",
  "/images/destinations/maldives-hero.jpg",
  "/images/destinations/kyoto-hero.jpg",
];

/** The three pillars — the word each one keeps behind it. */
const PILLARS = [
  {
    word: "Houses",
    title: "We keep houses",
    copy: "A villa above the caldera, a rorbu above the fjord, a chalet above the snow. Each one held for a single guest — and only for you.",
    image: "/images/destinations/swiss-alps-hero.jpg",
  },
  {
    word: "People",
    title: "We know people",
    copy: "Captains, guides, chefs, keepers of the places. Chosen over years, not from a directory — and remembered by name.",
    image: "/images/pool/craft.jpg",
  },
  {
    word: "Hours",
    title: "We hold the hours",
    copy: "Mornings set by the light, tables set by the season. The schedule bends around the journey — never the other way round.",
    image: "/images/destinations/maldives-hero.jpg",
  },
];

/**
 * About — the atelier itself, told as an experience:
 * the houses turning behind a statement, then "what we keep" as a
 * drag-to-explore rail (you pull it; it resists, releases, and snaps —
 * no scroll involved), and the collection itself, passing by.
 */
export function About() {
  const reduced = typeof window !== "undefined" && prefersReducedMotion();

  /* ——— Hero: four houses, turning slowly ——— */
  const heroRef = useReveal<HTMLElement>((scope) => {
    const imgs = Array.from(scope.querySelectorAll<HTMLElement>(".ab-slide-img"));
    if (!reduced && imgs.length > 1) {
      const tl = gsap.timeline({ repeat: -1 });
      const STEP = 4.5;
      for (let i = 0; i < imgs.length; i++) {
        const t = 1.5 + (i + 1) * STEP;
        tl.to(imgs[i], { autoAlpha: 0, duration: 1.4, ease: "power2.inOut" }, t);
        tl.to(imgs[(i + 1) % imgs.length], { autoAlpha: 1, duration: 1.4, ease: "power2.inOut" }, t);
      }
    }
    const copy = scope.querySelectorAll<HTMLElement>(".ab-hero-copy > *");
    if (copy.length) {
      gsap.fromTo(
        copy,
        { y: 26, opacity: 0 },
        { y: 0, opacity: 1, duration: DUR.standard, ease: EASE.out, stagger: 0.12, delay: 0.4 }
      );
    }
  });

  /* ——— What we keep: the drag rail ———
     Direct manipulation: pull with the pointer (or touch), the track
     follows, and on release it coasts a little and snaps to the nearest
     pillar. Arrows work too. No pinning, no scrub. */
  const railRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = railRef.current;
    if (!root) return;
    const viewport = root.querySelector<HTMLElement>(".ab-viewport");
    if (!viewport) return;
    if (prefersReducedMotion()) {
      root.setAttribute("data-reduced", "");
      return;
    }

    const track = viewport.querySelector<HTMLElement>(".ab-track");
    const counter = root.querySelector<HTMLElement>(".ab-count-now");
    const prev = root.querySelector<HTMLElement>(".ab-prev");
    const next = root.querySelector<HTMLElement>(".ab-next");
    if (!track) return;

    const panels = Array.from(
      track.querySelectorAll<HTMLElement>(".ab-panel")
    );
    const padR = parseFloat(getComputedStyle(viewport).paddingRight) || 0;
    const clamp = (v: number, lo: number, hi: number) =>
      Math.max(lo, Math.min(hi, v));
    const minX = () => viewport.clientWidth - padR - track.scrollWidth;
    /** Snap target for each panel: its left edge at the rail's left edge. */
    const targets = () =>
      panels.map((p) => clamp(-p.offsetLeft, minX(), 0));
    const nearestIndex = (xPos: number) => {
      const t = targets();
      return t.reduce(
        (best, val, i) =>
          Math.abs(val - xPos) < Math.abs(t[best] - xPos) ? i : best,
        0
      );
    };
    const setCounter = (i: number) => {
      if (counter) counter.textContent = String(i + 1).padStart(2, "0");
    };

    let x = 0;
    let index = 0;
    const setX = (v: number) => {
      x = clamp(v, minX(), 0);
      track.style.transform = `translateX(${x}px)`;
      index = nearestIndex(x);
      setCounter(index);
    };
    /** Animate to a panel; the counter follows the track as it settles. */
    const go = (targetIndex: number) => {
      const t = targets();
      const i = clamp(targetIndex, 0, t.length - 1);
      gsap.to(track, {
        x: t[i],
        duration: 0.9,
        ease: "power3.out",
        onUpdate: () => {
          const cur = parseFloat(String(gsap.getProperty(track, "x"))) || 0;
          setCounter(nearestIndex(cur));
        },
      });
    };

    /* ——— Pointer drag ——— */
    let dragging = false;
    let startX = 0; // pointer position at drag start
    let originX = 0; // rail position at drag start
    let lastX = 0;
    let lastT = 0;
    let vx = 0;

    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      dragging = true;
      startX = e.clientX;
      originX = x;
      lastX = e.clientX;
      lastT = performance.now();
      vx = 0;
      gsap.killTweensOf(track);
      viewport.setPointerCapture(e.pointerId);
      viewport.classList.add("is-dragging");
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const now = performance.now();
      const dt = Math.max(1, now - lastT);
      vx = (e.clientX - lastX) / dt; // px per ms
      lastX = e.clientX;
      lastT = now;
      // position at drag start + total pointer travel (never cumulative)
      setX(originX + (e.clientX - startX));
    };
    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      viewport.classList.remove("is-dragging");
      const projected = clamp(x + vx * 260, minX(), 0);
      go(nearestIndex(projected));
    };

    const onPrev = () => go(index - 1);
    const onNext = () => go(index + 1);
    const onResize = () => setX(x); // re-measure (panel widths are vw-based)

    viewport.addEventListener("pointerdown", onDown);
    viewport.addEventListener("pointermove", onMove);
    viewport.addEventListener("pointerup", onUp);
    viewport.addEventListener("pointercancel", onUp);
    prev?.addEventListener("click", onPrev);
    next?.addEventListener("click", onNext);
    window.addEventListener("resize", onResize);

    setX(0);

    return () => {
      viewport.removeEventListener("pointerdown", onDown);
      viewport.removeEventListener("pointermove", onMove);
      viewport.removeEventListener("pointerup", onUp);
      viewport.removeEventListener("pointercancel", onUp);
      prev?.removeEventListener("click", onPrev);
      next?.removeEventListener("click", onNext);
      window.removeEventListener("resize", onResize);
      gsap.killTweensOf(track);
    };
  }, []);

  /* ——— The collection, passing by ——— */
  const rail2Ref = useReveal<HTMLDivElement>((scope) => {
    const track = scope.querySelector<HTMLElement>(".ab-rail-track");
    if (!track || reduced) return;
    gsap.to(track, {
      xPercent: -50,
      ease: "none",
      duration: 70,
      repeat: -1,
    });
  });

  return (
    <>
      {/* ——— The houses, turning behind the statement ——— */}
      <header
        ref={heroRef}
        className="relative flex h-svh min-h-[640px] items-end overflow-hidden"
      >
        <div className="absolute inset-0">
          {SLIDES.map((src, i) => (
            <div
              key={src}
              className="absolute inset-0"
              style={{ opacity: i === 0 ? 1 : 0, visibility: i === 0 ? "visible" : "hidden" }}
            >
              <Image
                src={src}
                alt=""
                fill
                priority={i === 0}
                sizes="100vw"
                className="ab-slide-img h-full w-full scale-105 object-cover"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/25 to-charcoal/45" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[94vw] px-6 pb-16 md:px-10 md:pb-20">
          <div className="ab-hero-copy">
            <p className="text-xs uppercase tracking-luxe text-gold">About</p>
            <h1 className="mt-6 max-w-4xl font-serif text-5xl leading-[1.08] text-ivory md:text-7xl">
              <RevealText text="A small atelier, a long memory of places." />
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-ivory/80">
              Maison Voyage is a private travel atelier in Geneva. We keep a
              limited number of houses, a longer list of people we trust, and a
              calendar with room in it.
            </p>
          </div>
        </div>
      </header>

      {/* ——— What we keep — the rail you pull ——— */}
      <section ref={railRef} className="ab-rail bg-ivory">
        <div className="flex flex-col gap-6 px-6 pt-20 md:flex-row md:items-end md:justify-between md:px-10 md:pt-28">
          <div>
            <p className="text-xs uppercase tracking-luxe text-gold">What we keep</p>
            <h2 className="mt-5 max-w-2xl font-serif text-4xl leading-[1.08] text-charcoal md:text-5xl">
              Three things, in that order.
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <span className="font-serif text-sm text-ink/70" aria-live="polite">
              <span className="ab-count-now">01</span>
              <span className="text-ink/35"> / 03</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="ab-prev flex h-10 w-10 items-center justify-center border border-line text-ink/60 transition-colors duration-300 hover:border-gold hover:text-charcoal"
                aria-label="Previous — what we keep"
              >
                ←
              </button>
              <button
                type="button"
                className="ab-next flex h-10 w-10 items-center justify-center border border-line text-ink/60 transition-colors duration-300 hover:border-gold hover:text-charcoal"
                aria-label="Next — what we keep"
              >
                →
              </button>
            </div>
          </div>
        </div>

        <div
          className="ab-viewport relative mt-10 select-none overflow-hidden px-6 md:mt-14 md:px-10"
          style={{ touchAction: "pan-y" }}
        >
          <div className="ab-track relative flex w-max items-stretch gap-6 will-change-transform">
            {PILLARS.map((p, i) => (
              <figure
                key={p.title}
                className="ab-panel relative flex h-[78svh] min-h-[540px] w-[86vw] shrink-0 flex-col overflow-hidden bg-cream ring-1 ring-charcoal/5 md:flex-row md:w-[100vw]"
              >
                {/* Image side */}
                <div className="pointer-events-none relative h-[46%] overflow-hidden md:h-full md:w-[55%]">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 55vw"
                    draggable={false}
                    className="h-full w-full scale-105 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/25 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-charcoal/10" />
                </div>

                {/* Copy side */}
                <figcaption className="relative flex flex-1 flex-col justify-center px-6 py-10 md:px-16 lg:px-24">
                  <span
                    aria-hidden
                    className="ab-word pointer-events-none absolute left-2 top-14 select-none font-serif leading-none text-charcoal/[0.06] lg:left-10"
                  >
                    {p.word}
                  </span>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-6 top-1/2 hidden h-24 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-gold/50 to-transparent md:block"
                  />
                  <div className="relative">
                    <p className="mb-7 text-[clamp(0.7rem,1.2vw,0.875rem)] uppercase tracking-luxe text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="font-serif text-[clamp(1.75rem,4.5vw,3.5rem)] leading-[1.08] text-charcoal">
                      {p.title}
                    </h3>
                    <p className="mt-7 max-w-lg text-[clamp(0.9rem,1.8vw,1.125rem)] leading-relaxed text-ink/75">
                      {p.copy}
                    </p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>

          {/* Quiet hint */}
          <span className="pointer-events-none absolute bottom-4 right-6 hidden text-[0.55rem] uppercase tracking-luxe text-ink/35 md:right-10 md:block">
            Drag — it listens
          </span>
        </div>
      </section>

      {/* ——— The collection, passing by ——— */}
      <section ref={rail2Ref} className="overflow-hidden bg-cream py-20 md:py-28">
        <div className="px-6 md:px-10">
          <div className="mb-12 flex items-end justify-between gap-6">
            <h2 className="font-serif text-3xl text-charcoal md:text-4xl">
              The places we keep
            </h2>
            <span className="hidden text-right text-xs uppercase tracking-luxe text-ink/40 md:block">
              Eighteen of them, passing by
            </span>
          </div>
        </div>
        <div className="ab-rail-track flex w-max gap-6 will-change-transform">
          {[...DESTINATIONS, ...DESTINATIONS].map((d, i) => (
            <div
              key={`${d.slug}-${i}`}
              className="relative h-64 w-80 shrink-0 overflow-hidden bg-ivory ring-1 ring-charcoal/5 md:h-72 md:w-96"
            >
              <Image
                src={d.image}
                alt={d.name}
                fill
                sizes="384px"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/80 to-transparent px-5 pb-4 pt-14">
                <p className="font-serif text-xl text-ivory">{d.name}</p>
                <p className="mt-0.5 text-[0.55rem] uppercase tracking-luxe text-ivory/60">
                  {d.region}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ——— The client's word ——— */}
      <Testimonial />

      {/* ——— The turn ——— */}
      <section className="px-6 py-28 md:px-10 md:py-44">
        <div className="mx-auto max-w-[94vw]">
          <Reveal className="flex flex-col items-center gap-10 text-center">
            <p className="text-xs uppercase tracking-luxe text-gold">
              A private conversation
            </p>
            <p className="max-w-2xl font-serif text-3xl leading-snug text-charcoal md:text-4xl">
              The rest of the story is yours. We would be glad to hear how it
              begins.
            </p>
            <CTA href="/contact">Begin the Conversation</CTA>
          </Reveal>
        </div>
      </section>
    </>
  );
}
