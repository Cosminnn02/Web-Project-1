"use client";

import { useState } from "react";
import { gsap } from "@/lib/gsap";
import { useReveal } from "@/hooks/useReveal";
import { DUR, EASE } from "@/lib/motion";
import { RevealText } from "./RevealText";
import { Magnetic } from "./Magnetic";

const BUDGETS = [
  "Under $25,000",
  "$25,000 – $50,000",
  "$50,000 – $100,000",
  "$100,000 +",
  "Prefer not to say",
];

/**
 * Inquiry — a discreet, personal proposal request.
 * Underline fields, a calm submit transition. (Design build — no backend.)
 */
export function Inquiry() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const ref = useReveal<HTMLElement>((scope) => {
    gsap.fromTo(
      scope.querySelectorAll(".inq-item"),
      { y: 28, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: DUR.standard,
        ease: EASE.out,
        stagger: 0.06,
        scrollTrigger: {
          trigger: scope,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sending || sent) return;
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 1400);
  };

  return (
    <section id="inquiry" ref={ref} className="relative px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-[94vw] gap-16 md:grid-cols-12">
        {/* Left: invitation */}
        <div className="md:col-span-5">
          <p className="inq-item mb-6 text-xs uppercase tracking-luxe text-gold">
            Begin the Conversation
          </p>
          <h2 className="inq-item font-serif text-4xl leading-tight text-charcoal md:text-5xl">
            <RevealText text="Tell us what you're seeking." />
          </h2>
          <p className="inq-item mt-8 max-w-sm text-base leading-relaxed text-ink/70">
            A few quiet details are enough to begin. We respond personally,
            usually within a day, and only ever to those who write to us.
          </p>
        </div>

        {/* Right: form */}
        <div className="md:col-span-7">
          {sent ? (
            <div className="flex min-h-[320px] flex-col items-start justify-center border-t border-line pt-8">
              <p className="font-serif text-3xl text-charcoal">
                Thank you.
              </p>
              <p className="mt-4 max-w-sm text-base leading-relaxed text-ink/70">
                Your inquiry has been received. A member of the atelier will be
                in touch shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-8 sm:grid-cols-2">
              <div className="field inq-item sm:col-span-2">
                <label htmlFor="name">Full name</label>
                <input id="name" name="name" type="text" required placeholder="Your name" />
              </div>

              <div className="field inq-item">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" required placeholder="you@example.com" />
              </div>

              <div className="field inq-item">
                <label htmlFor="dest">Preferred destination</label>
                <input id="dest" name="dest" type="text" placeholder="Anywhere, or a place" />
              </div>

              <div className="field inq-item">
                <label htmlFor="dates">Travel dates</label>
                <input id="dates" name="dates" type="text" placeholder="Flexible / a season" />
              </div>

              <div className="field inq-item">
                <label htmlFor="guests">Number of guests</label>
                <input id="guests" name="guests" type="text" placeholder="2" />
              </div>

              <div className="field inq-item sm:col-span-2">
                <label htmlFor="budget">Estimated budget</label>
                <select id="budget" name="budget" defaultValue="">
                  <option value="" disabled>
                    Select a range
                  </option>
                  {BUDGETS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field inq-item sm:col-span-2">
                <label htmlFor="notes">Additional notes</label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  placeholder="Anything that would help us understand the journey you have in mind."
                />
              </div>

              <div className="inq-item sm:col-span-2">
                <Magnetic>
                  <button
                    type="submit"
                    disabled={sending}
                    className="group inline-flex items-center gap-3 bg-charcoal px-8 py-4 text-xs uppercase tracking-luxe text-ivory transition-colors duration-500 hover:bg-gold disabled:opacity-70"
                  >
                    <span>{sending ? "Sending…" : "Request Proposal"}</span>
                    <span className="transition-transform duration-500 group-hover:translate-x-1">
                      →
                    </span>
                  </button>
                </Magnetic>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
