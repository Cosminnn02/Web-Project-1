"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useReveal } from "@/hooks/useReveal";
import { STEPS } from "@/lib/data";
import { RevealText } from "./RevealText";
import { Reveal } from "./Reveal";
import { Testimonial } from "./Testimonial";
import { CTA } from "./CTA";
import { prefersReducedMotion } from "@/lib/motion";
import { scrollTo } from "@/lib/lenis";

/** The word each step keeps — the ghosted watermark on the card's back. */
const WORDS = ["Listen", "Write", "Hold"];

/** The fine detail — the back of each card. */
const BACKS: string[][] = [
  [
    "Forty minutes, at most — longer if the story deserves it.",
    "A second call only if you ask for one.",
    "By its end we know your name, your season, and your no's.",
  ],
  [
    "One document, not a deck.",
    "Houses named — not “a selection of villas”.",
    "You amend it by hand; version two only if you ask.",
  ],
  [
    "One number. It is a person, not a desk.",
    "Reachable at any hour, for the whole length of the trip.",
    "Afterwards, a single quiet letter. Nothing else, ever.",
  ],
];

/** The other side of the ledger — what the three steps remove. */
const NEVER_SEEN = [
  "A quote, printed for comparison",
  "A confirmation email you must chase",
  "An invoice from a third agency",
  "A shared table, a shared boat",
  "A group departure at seven in the morning",
  "An upsell, at any point, by anyone",
];

/**
 * The Process — told as three cards that live under your hand.
 * Each card tilts in 3D toward the cursor, a quiet spotlight follows it,
 * and a flip turns it over to reveal the fine detail. No pinning, no
 * scrubbing — the cards simply sit there and wait to be touched.
 * Tilt and scramble skip under reduced motion; the flip stays available
 * as an instant state change.
 */
export function Process() {
  const stepsRef = useRef<HTMLElement>(null);
  /** Which step the index is pointing at — drives the ghost word. */
  const [active, setActive] = useState(0);

  /* ——— Tilt + spotlight, one handler per card ——— */
  useEffect(() => {
    const root = stepsRef.current;
    if (!root || prefersReducedMotion()) return;

    const cards = Array.from(root.querySelectorAll<HTMLElement>(".pr-step"));
    const MAX = 7; // degrees
    const disposers: Array<() => void> = [];

    cards.forEach((card) => {
      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        card.style.setProperty("--rx", `${(0.5 - py) * MAX}deg`);
        card.style.setProperty("--ry", `${(px - 0.5) * MAX}deg`);
        card.style.setProperty("--mx", `${px * 100}%`);
        card.style.setProperty("--my", `${py * 100}%`);
      };
      const onLeave = () => {
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
        card.style.setProperty("--mx", "50%");
        card.style.setProperty("--my", "50%");
      };
      card.addEventListener("pointermove", onMove);
      card.addEventListener("pointerleave", onLeave);
      disposers.push(
        () => {
          card.removeEventListener("pointermove", onMove);
          card.removeEventListener("pointerleave", onLeave);
        }
      );
    });

    return () => disposers.forEach((d) => d());
  }, []);

  /* ——— Flip state (click / Enter / Space on either face) ——— */
  useEffect(() => {
    const root = stepsRef.current;
    if (!root) return;
    const toggle = (face: HTMLElement) => {
      const card = face.closest<HTMLElement>(".pr-step");
      if (!card) return;
      const flipped = card.toggleAttribute("data-flip");
      const front = card.querySelector<HTMLElement>(".pr-front");
      if (front) front.setAttribute("aria-pressed", String(flipped));
    };
    const onClick = (e: MouseEvent) => {
      const face = (e.target as HTMLElement).closest<HTMLElement>(
        ".pr-front, .pr-back"
      );
      if (face) toggle(face);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const face = (e.target as HTMLElement).closest<HTMLElement>(".pr-front");
      if (face) {
        e.preventDefault();
        toggle(face);
      }
    };
    root.addEventListener("click", onClick);
    root.addEventListener("keydown", onKey);
    return () => {
      root.removeEventListener("click", onClick);
      root.removeEventListener("keydown", onKey);
    };
  }, []);

  /* ——— What you never see: one line at a time ——— */
  const neverRef = useReveal<HTMLDivElement>((scope) => {
    const rows = Array.from(scope.querySelectorAll<HTMLElement>(".ns-row"));
    if (!rows.length) return;
    gsap.fromTo(
      rows,
      { y: 26, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.14,
        scrollTrigger: {
          trigger: scope,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  return (
    <>
      {/* ——— The words + the index ——— */}
      <section className="relative overflow-hidden bg-cream px-6 py-28 md:px-10 md:py-40">
        <span
          aria-hidden
          className="pointer-events-none absolute -top-4 right-2 select-none font-serif leading-none text-ink/[0.06] md:right-10"
          style={{ fontSize: "clamp(6rem, 18vw, 14rem)" }}
        >
          <span key={active} className="ghost-swap inline-block">
            {WORDS[active]}
          </span>
        </span>
        <div className="relative mx-auto max-w-4xl">
          <p className="text-xs uppercase tracking-luxe text-gold">
            The Process
          </p>
          <h1 className="mt-6 max-w-2xl font-serif text-4xl leading-[1.1] text-charcoal md:text-6xl">
            <RevealText text="Three quiet steps. Nothing more." />
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-ink/70">
            There is no funnel, no tier, no fine print. A conversation, a
            document, and the journey itself — held in that order, and in
            that order only.
          </p>

          {/* The index — hover a row, the big word turns with you; click to go. */}
          <nav
            aria-label="The three steps"
            className="mt-20 border-t border-line"
          >
            <ul>
              {STEPS.map((s, i) => (
                <li key={s.n}>
                  <a
                    href={`#pr-step-${i + 1}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(`#pr-step-${i + 1}`);
                    }}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group flex items-baseline justify-between gap-6 border-b border-line py-5"
                  >
                    <span className="flex items-baseline gap-6">
                      <span className="text-[0.6rem] tracking-luxe text-gold">
                        {s.n}
                      </span>
                      <span className="font-serif text-xl leading-tight text-charcoal transition-transform duration-500 ease-out group-hover:translate-x-2 md:text-2xl">
                        {s.title}
                      </span>
                    </span>
                    <span className="shrink-0 text-[0.6rem] uppercase tracking-luxe text-ink/40 transition-colors duration-300 group-hover:text-gold">
                      {WORDS[i]}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <p className="mt-10 text-[0.6rem] uppercase tracking-luxe text-ink/40">
            Touch a card — it will turn over
          </p>
        </div>
      </section>

      {/* ——— The cards ——— */}
      <section
        ref={stepsRef}
        className="space-y-8 bg-ivory px-6 py-16 md:space-y-12 md:px-10 md:py-24"
      >
        {STEPS.map((s, i) => (
          <article
            key={s.n}
            id={`pr-step-${i + 1}`}
            className="pr-step"
            style={{ perspective: "1100px" }}
          >
            <div className="pr-flip">
              <div className="pr-flip-inner relative h-[64svh] min-h-[520px] md:h-[70svh]">
                {/* ——— Front ——— */}
                <div
                  className="pr-face pr-front absolute inset-0 cursor-pointer overflow-hidden bg-charcoal"
                  role="button"
                  tabIndex={0}
                  aria-pressed={false}
                  aria-label={`Step ${s.n}: ${s.title}. Flip to read the fine detail.`}
                >
                  <div className="absolute inset-0">
                    <Image
                      src={s.image}
                      alt=""
                      fill
                      sizes="100vw"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-charcoal/40" />
                    <div className="pr-glow" aria-hidden />
                  </div>

                  <span
                    aria-hidden
                    className="pr-word pointer-events-none absolute right-4 top-10 select-none font-serif leading-none text-ivory/[0.08] md:right-10 md:top-14"
                  >
                    {WORDS[i]}
                  </span>

                  <div className="relative flex h-full flex-col justify-end px-6 pb-9 md:px-16 md:pb-14">
                    <p className="text-[0.7rem] uppercase tracking-luxe text-gold">
                      Step {s.n}
                    </p>
                    <h2 className="mt-4 max-w-3xl font-serif text-3xl leading-[1.08] text-ivory md:text-5xl">
                      {s.title}
                    </h2>
                    <p className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-ivory/75">
                      {s.description}
                    </p>
                    <div className="mt-8 flex items-center gap-3 text-[0.6rem] uppercase tracking-luxe text-ivory/40">
                      <span className="inline-block h-px w-8 bg-gold/60" aria-hidden />
                      Flip — the fine detail
                    </div>
                  </div>
                </div>

                {/* ——— Back ——— */}
                <div className="pr-face pr-back absolute inset-0 overflow-hidden bg-charcoal">
                  <div className="pr-glow" aria-hidden />
                  <span
                    aria-hidden
                    className="pr-word pointer-events-none absolute right-2 top-8 select-none font-serif leading-none text-ivory/[0.07] md:right-10 md:top-12"
                  >
                    {WORDS[i]}
                  </span>
                  <div className="relative flex h-full flex-col justify-center px-6 md:px-16 lg:px-24">
                    <p className="text-xs uppercase tracking-luxe text-gold">
                      Step {s.n} — the fine detail
                    </p>
                    <ul className="mt-9 max-w-2xl space-y-6">
                      {BACKS[i].map((line) => (
                        <li
                          key={line}
                          className="border-l border-gold/40 pl-6 font-serif text-xl leading-snug text-ivory/90 md:text-2xl"
                        >
                          {line}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-12 flex items-center gap-3 text-[0.6rem] uppercase tracking-luxe text-ivory/40">
                      <span className="inline-block h-px w-8 bg-gold/60" aria-hidden />
                      Tap to turn it back
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* ——— What you never see ——— */}
      <section className="bg-charcoal px-6 py-28 text-ivory md:px-10 md:py-40">
        <div ref={neverRef} className="mx-auto max-w-[94vw]">
          <Reveal className="mb-16 flex items-end justify-between gap-6">
            <h2 className="max-w-xl font-serif text-3xl leading-tight md:text-4xl">
              What you never see
            </h2>
            <span className="hidden text-right text-xs uppercase tracking-luxe text-ivory/40 md:block">
              The other side of the three steps
            </span>
          </Reveal>
          <div className="border-t border-ivory/15">
            {NEVER_SEEN.map((line) => (
              <p
                key={line}
                className="ns-row border-b border-ivory/15 py-6 font-serif text-xl italic text-ivory/70 md:py-7 md:text-2xl"
              >
                {line}
              </p>
            ))}
          </div>
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
              The first step is the only one that has to happen. The rest, we
              arrange — quietly, and in order.
            </p>
            <CTA href="/contact">Begin the Conversation</CTA>
          </Reveal>
        </div>
      </section>
    </>
  );
}
