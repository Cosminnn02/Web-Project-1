"use client";

import { gsap } from "@/lib/gsap";
import { useReveal } from "@/hooks/useReveal";
import { DUR, EASE, STAGGER } from "@/lib/motion";
import { BRAND } from "@/lib/data";
import { RevealText } from "./RevealText";
import { Reveal } from "./Reveal";
import { Inquiry } from "./Inquiry";

const DETAILS = [
  {
    label: "Email",
    value: BRAND.email,
    href: `mailto:${BRAND.email}`,
    note: "The most direct way to reach the atelier.",
  },
  {
    label: "Telephone",
    value: BRAND.phone,
    href: "tel:+41220000000",
    note: "By appointment, Tuesday to Saturday.",
  },
  {
    label: "The atelier",
    value: BRAND.address,
    note: "Geneva — and, quietly, wherever the journey is.",
  },
  {
    label: "Hours",
    value: "By appointment",
    note: "Tuesday to Saturday, 09h00 – 18h00 CET.",
  },
];

/**
 * Contact — how to reach the atelier: the details, the quiet policy,
 * and the inquiry itself.
 */
export function Contact() {
  /* ——— Header: eyebrow, line-masked heading, invitation ——— */
  const headRef = useReveal<HTMLElement>((scope) => {
    const eyebrow = scope.querySelector<HTMLElement>(".ct-eyebrow");
    if (eyebrow) {
      gsap.fromTo(
        eyebrow,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: DUR.standard, ease: EASE.out }
      );
    }
    const copy = scope.querySelector<HTMLElement>(".ct-copy");
    if (copy) {
      gsap.fromTo(
        copy,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: DUR.standard, ease: EASE.out, delay: 0.35 }
      );
    }
  });

  /* ——— Details: four cells arrive in sequence ——— */
  const gridRef = useReveal<HTMLElement>((scope) => {
    const cells = Array.from(scope.querySelectorAll<HTMLElement>(".ct-cell"));
    gsap.fromTo(
      cells,
      { y: 28, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: DUR.standard,
        ease: EASE.out,
        stagger: STAGGER.standard,
        scrollTrigger: {
          trigger: scope,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  return (
    <>
      {/* ——— Header ——— */}
      <header
        ref={headRef}
        className="relative px-6 pb-24 pt-40 md:px-10 md:pb-32 md:pt-56"
      >
        <div className="mx-auto max-w-[94vw]">
          <p className="ct-eyebrow mb-8 text-xs uppercase tracking-luxe text-gold">
            Contact
          </p>
          <h1 className="max-w-3xl font-serif text-5xl leading-[1.08] text-charcoal md:text-7xl">
            <RevealText text="A conversation, before anything else." />
          </h1>
          <p className="ct-copy mt-8 max-w-xl text-lg leading-relaxed text-ink/70">
            By letter, by phone, or by the note below. Tell us what you are
            looking for — and, more often, what you are trying to leave behind.
          </p>
        </div>
      </header>

      {/* ——— Details ——— */}
      <section
        ref={gridRef}
        className="border-t border-line px-6 py-20 md:px-10 md:py-28"
      >
        <div className="mx-auto grid max-w-[94vw] gap-px overflow-hidden bg-line sm:grid-cols-2 lg:grid-cols-4">
          {DETAILS.map((d) => (
            <div key={d.label} className="ct-cell bg-ivory p-8">
              <p className="text-[0.6rem] uppercase tracking-luxe text-ink/50">
                {d.label}
              </p>
              {d.href ? (
                <a
                  href={d.href}
                  className="mt-3 block font-serif text-lg text-charcoal transition-colors duration-300 hover:text-gold"
                >
                  {d.value}
                </a>
              ) : (
                <p className="mt-3 font-serif text-lg text-charcoal">{d.value}</p>
              )}
              <p className="mt-4 text-sm leading-relaxed text-ink/60">{d.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ——— The quiet policy ——— */}
      <section className="px-6 pb-8 md:px-10">
        <Reveal className="mx-auto max-w-[94vw]">
          <div className="max-w-2xl border-l border-gold/50 pl-8">
            <p className="font-serif text-xl leading-[1.5] text-charcoal md:text-2xl">
              We reply personally, usually within a day. Each season we take on
              a limited number of journeys — and we say so, quietly, when the
              list is full.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ——— The inquiry itself ——— */}
      <div className="mt-16 border-t border-line md:mt-24">
        <Inquiry />
      </div>
    </>
  );
}
