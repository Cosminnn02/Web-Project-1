"use client";

import { useState } from "react";
import { gsap } from "@/lib/gsap";
import { useReveal } from "@/hooks/useReveal";
import { DUR, EASE, STAGGER } from "@/lib/motion";
import { BRAND } from "@/lib/data";
import { RevealText } from "@/components/effects/RevealText";

/**
 * Contact — "begin the conversation".
 *
 * Composed fresh for this page (not lifted from another): a typographic
 * opening, a quiet two-column act — the letter (form) beside the atelier's
 * particulars — and a dark closing line. Fields use the site's `.field`
 * classes; motion runs through `useReveal` and is skipped under reduced
 * motion. No new colors, no new input styles.
 */
export function Contact() {
  const [sent, setSent] = useState(false);

  /* ——— Opening: the statement rises, the rule draws ——— */
  const openRef = useReveal<HTMLElement>((scope) => {
    const rule = scope.querySelector<HTMLElement>(".ct-rule");
    if (rule) {
      gsap.fromTo(
        rule,
        { scaleX: 0 },
        { scaleX: 1, transformOrigin: "left center", duration: DUR.long, ease: EASE.luxury, delay: 0.5 }
      );
    }
    const meta = scope.querySelector<HTMLElement>(".ct-meta");
    if (meta) {
      gsap.fromTo(
        meta,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: DUR.standard, ease: EASE.out, delay: 0.7 }
      );
    }
  });

  /* ——— The act: form and particulars step in, staggered ——— */
  const actRef = useReveal<HTMLElement>((scope) => {
    const items = Array.from(scope.querySelectorAll<HTMLElement>(".ct-item"));
    gsap.fromTo(
      items,
      { y: 28, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: DUR.standard,
        ease: EASE.out,
        stagger: STAGGER.loose,
        scrollTrigger: {
          trigger: scope,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  });

  return (
    <div className="bg-ivory">
      {/* ——— Opening ——— */}
      <section ref={openRef} className="px-6 pb-20 pt-28 md:px-10 md:pb-28 md:pt-44">
        <div className="mx-auto max-w-[94vw]">
          <p className="text-xs uppercase tracking-luxe text-gold">
            Begin the conversation
          </p>
          <h1 className="mt-8 max-w-5xl font-serif text-6xl leading-[1.05] text-charcoal md:text-8xl">
            <RevealText text="Write to the atelier." />
          </h1>
          <div className="ct-rule mt-12 h-px w-full bg-line" />
          <p className="ct-meta mt-8 max-w-2xl text-lg leading-relaxed text-ink/70 md:text-xl">
            A few lines are enough — where, when, and what you are hoping for.
            The rest is a conversation, not a form. Geneva answers within a
            day or two.
          </p>
        </div>
      </section>

      {/* ——— The act: the letter, beside the particulars ——— */}
      <section ref={actRef} className="relative border-t border-line bg-cream px-6 py-20 md:px-10 md:py-28">
        {/* Top edge dissolves into the ivory opening — no hard jump */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-ivory to-transparent md:h-40" />
        <div className="mx-auto grid max-w-[94vw] gap-14 md:gap-20 lg:grid-cols-12">
          {/* The letter */}
          <div className="lg:col-span-7">
            <p className="ct-item mb-10 text-xs uppercase tracking-luxe text-ink/50">
              The letter
            </p>

            {sent ? (
              <div className="ct-item">
                <p className="font-serif text-3xl leading-[1.15] text-charcoal md:text-4xl">
                  Received, and kept.
                </p>
                <p className="mt-6 max-w-md leading-relaxed text-ink/70">
                  Someone in Geneva will write back within a day or two. Until
                  then, the letter is in good hands.
                </p>
              </div>
            ) : (
              <form
                className="ct-item space-y-9"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <div className="grid gap-9 sm:grid-cols-2">
                  <div className="field">
                    <label htmlFor="ct-name">Name</label>
                    <input id="ct-name" name="name" type="text" required />
                  </div>
                  <div className="field">
                    <label htmlFor="ct-email">Email</label>
                    <input id="ct-email" name="email" type="email" required />
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="ct-window">When, roughly</label>
                  <input
                    id="ct-window"
                    name="window"
                    type="text"
                    placeholder="A season, a month, a feeling of time"
                  />
                </div>

                <div className="field">
                  <label htmlFor="ct-message">The journey</label>
                  <textarea
                    id="ct-message"
                    name="message"
                    rows={4}
                    placeholder="Where, and what you are hoping for"
                  />
                </div>

                <div className="flex items-center justify-between gap-6 pt-2">
                  <button
                    type="submit"
                    className="group inline-flex items-center gap-3 border border-charcoal/25 px-8 py-4 text-xs uppercase tracking-luxe text-charcoal transition-colors duration-500 hover:border-gold hover:text-gold"
                  >
                    Send the letter
                    <span className="transition-transform duration-500 group-hover:translate-x-1">
                      →
                    </span>
                  </button>
                  <p className="hidden text-[0.6rem] uppercase tracking-luxe text-ink/40 sm:block">
                    Answered by hand
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* The particulars */}
          <div className="lg:col-span-5">
            <p className="ct-item mb-10 text-xs uppercase tracking-luxe text-ink/50">
              The atelier
            </p>
            <dl className="ct-item space-y-9">
              <div>
                <dt className="text-[0.6rem] uppercase tracking-luxe text-ink/45">
                  Write
                </dt>
                <dd className="mt-2">
                  <a
                    href={`mailto:${BRAND.email}`}
                    className="font-serif text-xl text-charcoal transition-colors hover:text-gold md:text-2xl"
                  >
                    {BRAND.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[0.6rem] uppercase tracking-luxe text-ink/45">
                  Call
                </dt>
                <dd className="mt-2 font-serif text-xl text-charcoal md:text-2xl">
                  {BRAND.phone}
                </dd>
              </div>
              <div>
                <dt className="text-[0.6rem] uppercase tracking-luxe text-ink/45">
                  The house
                </dt>
                <dd className="mt-2 max-w-xs leading-relaxed text-ink/75">
                  {BRAND.address}
                </dd>
              </div>
            </dl>

            <div className="ct-item mt-12 border-t border-line pt-8">
              <p className="text-[0.6rem] uppercase tracking-luxe text-ink/45">
                Hours
              </p>
              <p className="mt-3 leading-relaxed text-ink/70">
                Monday to Friday, 9 to 6, Geneva time. The number is answered
                by the person who wrote the letter — at any hour, once the
                journey is underway.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ——— The close ——— */}
      <section className="bg-charcoal px-6 py-14 md:px-10 md:py-20">
        <div className="mx-auto flex max-w-[94vw] flex-col items-start gap-4 md:items-center md:text-center">
          <p className="text-xs uppercase tracking-luxe text-gold">The close</p>
          <p className="max-w-2xl font-serif text-2xl leading-[1.15] text-ivory md:text-3xl">
            Write when the year is ready to be spent.
          </p>
          <p className="mt-1 text-[0.6rem] uppercase tracking-luxe text-ivory/35">
            {BRAND.name} · {BRAND.tagline}, Geneva
          </p>
        </div>
      </section>
    </div>
  );
}
