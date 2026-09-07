"use client";

import { gsap } from "@/lib/gsap";
import { useReveal } from "@/hooks/useReveal";
import { DUR, EASE } from "@/lib/motion";
import { STATS } from "@/lib/data";
import { RevealText } from "@/components/effects/RevealText";

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useReveal<HTMLDivElement>((scope) => {
    const num = scope.querySelector(".stat-num");
    const obj = { val: 0 };
    gsap.to(obj, {
      val: value,
      duration: DUR.long,
      ease: EASE.out,
      scrollTrigger: { trigger: scope, start: "top 85%", once: true },
      onUpdate: () => {
        if (num) num.textContent = Math.floor(obj.val).toLocaleString();
      },
    });
  });

  return (
    <div ref={ref} className="border-t border-line pt-5">
      <div className="font-serif text-4xl text-charcoal md:text-5xl">
        <span className="stat-num">0</span>
        <span className="text-gold">{suffix}</span>
      </div>
      <p className="mt-2 text-xs uppercase tracking-luxe text-ink/60">{label}</p>
    </div>
  );
}

/**
 * Brand statement — the quiet introduction. Large serif statement on the left,
 * supporting copy + credibility counters on the right.
 */
export function BrandStatement() {
  return (
    <section id="about" className="relative px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-[94vw] gap-16 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="mb-8 text-xs uppercase tracking-luxe text-gold">
            The Atelier
          </p>
          <h2 className="font-serif text-3xl leading-[1.2] text-charcoal md:text-5xl">
            <RevealText text="We do not sell trips. We compose them — quietly, and only for those who value the difference." />
          </h2>
        </div>

        <div className="md:col-span-5 md:pt-2">
          <p className="max-w-md text-base leading-relaxed text-ink/80">
            Maison Voyage is a private travel atelier. Every journey is bespoke,
            considered, and held in confidence — a small number of clients, a
            long memory of the places we love, and nothing that could not be
            offered to a friend.
          </p>

          <div className="mt-14 grid grid-cols-3 gap-6">
            {STATS.map((s) => (
              <Stat key={s.label} {...s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
