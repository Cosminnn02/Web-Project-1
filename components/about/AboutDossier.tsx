"use client";

import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useReveal } from "@/hooks/useReveal";

const LETTER = [
  "You will not find a team page here, or a list of destinations. An atelier is not a catalogue. It is a way of keeping things: a limited number of houses, a longer list of people, and a calendar with room in it.",
  "The work has an old name. In the trade, the concierge is remembered as the “door opener” — the one whose value is not in what they can book, but in the doors they are trusted to open. We keep that definition, and we add one: we open fewer doors than we are offered, and we say so.",
  "The letter you receive is the whole of our first act: the route, the houses, the people, the price — in one document, before the first reservation is made. If it is wrong, it is amended by hand, and the amendment is kept.",
  "We are small on purpose. Eighteen houses, one guest at a time, a single number at any hour. Not because we cannot hold more — because the holding is the work.",
  "The rest of this dossier is in evidence. Read it, and write to us if any of it is missing.",
];

const OBJECTS = [
  {
    src: "/images/atelier/letter-1906.jpg",
    alt: "A handwritten travel letter, 1906",
    caption: "A letter from a journey, 1906. Ours arrive the same way: in writing, and signed.",
    ref: "Handwritten letter from Tsingtao, 1906 — public record",
  },
  {
    src: "/images/atelier/baggage-1909.jpg",
    alt: "A vintage suitcase, 1909",
    caption: "1909, “I’m coming, bag and baggage.” The departure is the last thing we arrange, and the first thing you feel.",
    ref: "I’m coming, bag and baggage, 1909 — public record",
  },
  {
    src: "/images/atelier/case-leather.jpg",
    alt: "An old leather suitcase that carried a family's journeys",
    caption: "A case that carried a family’s journeys, and keeps them. So do the houses — the key stays, and the route improves the second time.",
    ref: "A family’s travel case, kept — public record",
  },
];

const KEEP = [
  "One voice, from the first call to the last night",
  "One guest at a time, in every house and at every table",
  "The full price, before the first reservation",
  "One document, amended by hand, and kept",
  "A refusal, given early and without ceremony",
  "The key, held for the next time",
];

const NEVER = [
  "A handover — there is no second person to be passed to",
  "A shared room, a shared boat, a group departure",
  "A second figure, after the promise",
  "A supplement, or a “final” price",
  "A yes that was really a no",
  "A first meeting, on a return visit",
];

const QUESTIONS = [
  {
    q: "Where does it begin?",
    a: "With a long call. Not a form, not a questionnaire — a conversation, about what you want and, more often, what you do not. The journey is built around the answer.",
  },
  {
    q: "How does the letter arrive?",
    a: "In writing, within a week: the route, the houses, the people, the price. One document. You may amend it by hand, and it will hold.",
  },
  {
    q: "What does “private” actually mean?",
    a: "One guest at a time. No shared tables, no shared boats, no schedule that belongs to anyone else. If a door cannot be opened for two, we will say so before you pay.",
  },
  {
    q: "Why so few houses?",
    a: "Because each one is held, not listed. A house is kept when its people treat a single guest as the only guest — and when it can be reached by a single number, at any hour.",
  },
  {
    q: "And when the plan changes?",
    a: "The number is answered by the person who wrote the letter. The amendment is made by hand, and it is kept with the rest.",
  },
];

/**
 * About — "the dossier". A full redesign: no hero image, no sections
 * borrowed from the other pages, no site components reused.
 *
 * Research behind it:
 *  - The concierge trade: the "door opener" role, the personal-concierge
 *    model, and Les Clefs d'Or — the century-old body of luxury concierges,
 *    two crossed gold keys as its mark, members in ~80 countries, five
 *    years of hall service before membership (Wikipedia: Concierge).
 *  - Black Tomato's agency page (structure only): evidence-led sections,
 *    a kept standard, people, story — adapted, not copied.
 *
 * New devices (none exist elsewhere on the site): a typographic masthead
 * with line-mask reveal, a sticky two-column letter, a clip-reveal strip
 * of archival photographs, a kept/never ledger table, a question ledger,
 * and two crossed keys drawn in on scroll. Transform/opacity/stroke only;
 * every animation is skipped under reduced motion, and the markup already
 * sits in its final state.
 */
export function About() {
  /* ——— Masthead: the title rises out of its mask, the rules draw ——— */
  const mastRef = useReveal<HTMLElement>((scope) => {
    const line = scope.querySelector<HTMLElement>(".ab-m-line");
    if (line) {
      gsap.fromTo(line, { y: "110%" }, { y: 0, duration: 1, ease: "power4.out", delay: 0.15 });
    }
    const rules = Array.from(scope.querySelectorAll<HTMLElement>(".ab-m-rule"));
    rules.forEach((r, i) => {
      gsap.fromTo(
        r,
        { scaleX: 0 },
        { scaleX: 1, transformOrigin: "left center", duration: 0.8, ease: "power3.out", delay: 0.4 + i * 0.12 }
      );
    });
    const meta = scope.querySelector<HTMLElement>(".ab-m-meta");
    if (meta) {
      gsap.fromTo(meta, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.7 });
    }
  });

  /* ——— The letter: the paragraphs step in, the signature draws ——— */
  const letterRef = useReveal<HTMLElement>((scope) => {
    const paras = Array.from(scope.querySelectorAll<HTMLElement>("[data-letter-p]"));
    paras.forEach((p, i) => {
      gsap.fromTo(
        p,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          delay: i * 0.08,
          scrollTrigger: { trigger: scope, start: "top 70%", toggleActions: "play none none reverse" },
        }
      );
    });
    const sig = scope.querySelector<HTMLElement>(".ab-sig-rule");
    if (sig) {
      gsap.fromTo(
        sig,
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left center",
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: scope, start: "top 70%", toggleActions: "play none none reverse" },
        }
      );
    }
  });

  /* ——— The objects: each photograph opens like a file ——— */
  const objectsRef = useReveal<HTMLElement>((scope) => {
    const items = Array.from(scope.querySelectorAll<HTMLElement>("[data-object]"));
    items.forEach((el, i) => {
      const frame = el.querySelector<HTMLElement>(".ab-obj-frame");
      if (frame) {
        gsap.fromTo(
          frame,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.1,
            ease: "power3.inOut",
            delay: i * 0.15,
            scrollTrigger: { trigger: el, start: "top 78%", toggleActions: "play none none reverse" },
          }
        );
      }
      const cap = el.querySelector<HTMLElement>(".ab-obj-cap");
      if (cap) {
        gsap.fromTo(
          cap,
          { y: 12, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            delay: 0.5 + i * 0.15,
            scrollTrigger: { trigger: el, start: "top 78%", toggleActions: "play none none reverse" },
          }
        );
      }
    });
  });

  /* ——— The standard: the rows arrive one by one ——— */
  const stdRef = useReveal<HTMLElement>((scope) => {
    const rows = Array.from(scope.querySelectorAll<HTMLElement>("[data-row]"));
    rows.forEach((el, i) => {
      gsap.fromTo(
        el,
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          delay: (i % 6) * 0.06,
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" },
        }
      );
    });
  });

  /* ——— The questions ——— */
  const qRef = useReveal<HTMLElement>((scope) => {
    const items = Array.from(scope.querySelectorAll<HTMLElement>("[data-qa]"));
    items.forEach((el, i) => {
      gsap.fromTo(
        el,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          delay: i * 0.08,
          scrollTrigger: { trigger: el, start: "top 86%", toggleActions: "play none none reverse" },
        }
      );
    });
  });

  /* ——— The mark: two crossed keys, drawn ——— */
  const markRef = useReveal<HTMLElement>((scope) => {
    const strokes = Array.from(scope.querySelectorAll<SVGElement>("[data-key]"));
    strokes.forEach((s, i) => {
      gsap.fromTo(
        s,
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          duration: 1.6,
          ease: "power2.inOut",
          delay: 0.2 + i * 0.5,
          scrollTrigger: { trigger: scope, start: "top 72%", toggleActions: "play none none reverse" },
        }
      );
    });
    const copy = scope.querySelectorAll<HTMLElement>("[data-mark-copy]");
    copy.forEach((c, i) => {
      gsap.fromTo(
        c,
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          delay: 0.6 + i * 0.2,
          scrollTrigger: { trigger: scope, start: "top 72%", toggleActions: "play none none reverse" },
        }
      );
    });
  });

  return (
    <div className="bg-ivory">
      {/* ————————————————— The masthead ————————————————— */}
      <header ref={mastRef} className="border-b border-line px-6 pb-14 pt-24 md:px-10 md:pb-20 md:pt-32">
        <div className="mx-auto max-w-[94vw]">
          <div className="flex items-center justify-between">
            <p className="text-[0.65rem] uppercase tracking-luxe text-ink/50">About the atelier</p>
            <p className="text-[0.65rem] uppercase tracking-luxe text-ink/50">Geneva</p>
          </div>

          <div className="mt-8 overflow-hidden md:mt-10">
            <h1 className="ab-m-line font-serif text-[13.5vw] leading-[0.95] text-charcoal md:text-[7.5vw]">
              Maison Voyage
            </h1>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <span className="ab-m-rule h-px w-full origin-left bg-charcoal" />
            <span className="ab-m-rule h-px w-full origin-left bg-gold" />
          </div>

          <div className="ab-m-meta mt-6 flex flex-wrap items-baseline justify-between gap-3">
            <p className="max-w-2xl font-serif text-xl leading-relaxed text-ink/80 md:text-2xl">
              A dossier on the house — what it keeps, what it refuses, and
              what a guest receives.
            </p>
            <p className="text-[0.65rem] uppercase tracking-luxe text-ink/50">No. I · By appointment</p>
          </div>
        </div>
      </header>

      {/* ————————————————— The letter ————————————————— */}
      <section ref={letterRef} className="px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-[94vw] gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <div className="md:sticky md:top-24">
              <p className="text-xs uppercase tracking-luxe text-gold">Before anything else</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight text-charcoal md:text-4xl">
                A letter
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-ink/60">
                Written in the house’s own voice, in the present, for the
                person reading it.
              </p>
            </div>
          </div>

          <div className="md:col-span-8">
            <div className="space-y-8">
              {LETTER.map((p, i) => (
                <p key={i} data-letter-p className="font-serif text-xl leading-[1.7] text-ink/85 md:text-2xl">
                  {p}
                </p>
              ))}
              <div className="pt-4">
                <p className="font-serif text-lg text-charcoal">— The atelier, Geneva</p>
                <div className="ab-sig-rule mt-4 h-px w-24 origin-left bg-gold" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ————————————————— The objects of the trade ————————————————— */}
      <section ref={objectsRef} className="bg-charcoal px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[94vw]">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-luxe text-gold">In the house file</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight text-ivory md:text-4xl">
                The objects of the trade
              </h2>
            </div>
            <p className="hidden max-w-xs text-right text-xs leading-relaxed text-ivory/50 md:block">
              Kept as objects of reference — the letter, the departure, the
              journey that returns.
            </p>
          </div>

          <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {OBJECTS.map((o) => (
              <figure key={o.src} data-object>
                <div className="ab-obj-frame relative aspect-[4/5] overflow-hidden bg-ink/20">
                  <Image
                    src={o.src}
                    alt={o.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
                </div>
                <figcaption className="ab-obj-cap mt-5">
                  <p className="font-serif text-lg leading-relaxed text-ivory/85">{o.caption}</p>
                  <p className="mt-2 text-[0.6rem] uppercase tracking-luxe text-ivory/40">{o.ref}</p>
                </figcaption>
              </figure>
            ))}
          </div>

          <p className="mt-12 max-w-2xl text-xs leading-relaxed text-ivory/40">
            Photographs from the public record (Wikimedia Commons), kept here
            as references for the trade, not as scenery.
          </p>
        </div>
      </section>

      {/* ————————————————— The standard ————————————————— */}
      <section ref={stdRef} className="px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[94vw]">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-luxe text-gold">The standard</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight text-charcoal md:text-4xl">
                What we keep — what you will never see
              </h2>
            </div>
            <p className="hidden text-right text-xs uppercase tracking-luxe text-ink/40 md:block">
              Six rows, held together
            </p>
          </div>

          <div className="mt-14 border-t border-line">
            <div className="hidden grid-cols-2 border-b border-line py-4 md:grid">
              <p className="text-[0.65rem] uppercase tracking-luxe text-gold">Kept</p>
              <p className="text-[0.65rem] uppercase tracking-luxe text-ink/40">Never</p>
            </div>
            {KEEP.map((k, i) => (
              <div key={k} data-row className="grid grid-cols-1 gap-2 border-b border-line py-6 md:grid-cols-2 md:gap-8">
                <p className="font-serif text-lg leading-relaxed text-charcoal md:text-xl">
                  <span className="mr-3 text-sm text-gold md:hidden">Kept —</span>
                  {k}
                </p>
                <p className="font-serif text-lg leading-relaxed text-ink/55 md:text-xl">
                  <span className="mr-3 text-sm text-ink/35 md:hidden">Never —</span>
                  {NEVER[i]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ————————————————— The questions, answered ————————————————— */}
      <section ref={qRef} className="bg-cream px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[94vw]">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-luxe text-gold">In evidence</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight text-charcoal md:text-4xl">
                The questions, answered
              </h2>
            </div>
          </div>

          <div className="mt-14 max-w-4xl border-t border-line">
            {QUESTIONS.map((item) => (
              <div key={item.q} data-qa className="border-b border-line py-8">
                <h3 className="font-serif text-xl leading-snug text-charcoal md:text-2xl">
                  {item.q}
                </h3>
                <p className="mt-3 max-w-2xl leading-relaxed text-ink/70">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ————————————————— The mark ————————————————— */}
      <section ref={markRef} className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto flex max-w-[94vw] flex-col items-center text-center">
          <svg
            viewBox="0 0 200 200"
            className="h-28 w-28 text-gold md:h-32 md:w-32"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            aria-hidden="true"
          >
            <g data-key transform="rotate(45 100 100)">
              <circle pathLength="1" cx="100" cy="62" r="20" strokeDasharray="1" />
              <line pathLength="1" x1="100" y1="82" x2="100" y2="150" strokeDasharray="1" />
              <line pathLength="1" x1="100" y1="132" x2="114" y2="132" strokeDasharray="1" />
              <line pathLength="1" x1="100" y1="144" x2="118" y2="144" strokeDasharray="1" />
            </g>
            <g data-key transform="rotate(-45 100 100)">
              <circle pathLength="1" cx="100" cy="62" r="20" strokeDasharray="1" />
              <line pathLength="1" x1="100" y1="82" x2="100" y2="150" strokeDasharray="1" />
              <line pathLength="1" x1="100" y1="132" x2="86" y2="132" strokeDasharray="1" />
              <line pathLength="1" x1="100" y1="144" x2="82" y2="144" strokeDasharray="1" />
            </g>
          </svg>

          <p className="mt-8 text-xs uppercase tracking-luxe text-ink/50">The mark of the trade</p>
          <h2 className="mt-4 font-serif text-3xl leading-tight text-charcoal md:text-4xl">
            Two crossed keys
          </h2>
          <div className="mt-8 max-w-2xl space-y-5">
            <p data-mark-copy className="leading-relaxed text-ink/75">
              Every trade keeps its mark. Ours is borrowed, and we are glad of
              it: two crossed keys, the insignia of the concierges who have
              held the trade to its standard for over a century — a body of
              four thousand members in eighty countries, with a rule that no
              one joins on fewer than five years of hall service.
            </p>
            <p data-mark-copy className="leading-relaxed text-ink/75">
              We do not wear it. We answer to it: the doors, the trust, the
              long memory of a single guest.
            </p>
          </div>
        </div>
      </section>

      {/* ————————————————— The turn ————————————————— */}
      <section className="bg-charcoal px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto flex max-w-[94vw] flex-col items-start gap-8 md:items-center md:text-center">
          <p className="text-xs uppercase tracking-luxe text-gold">The turn</p>
          <h2 className="max-w-3xl font-serif text-4xl leading-[1.1] text-ivory md:text-5xl">
            The next letter is addressed to you.
          </h2>
          <p className="max-w-xl leading-relaxed text-ivory/70">
            Write when the year is ready to be spent. Geneva answers.
          </p>
          <a
            href="/contact"
            className="group mt-2 inline-flex items-center gap-3 border border-ivory/30 px-8 py-4 text-xs uppercase tracking-luxe text-ivory transition-colors duration-500 hover:border-gold hover:text-gold"
          >
            Begin the letter
            <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
          </a>
          <p className="mt-10 text-[0.6rem] uppercase tracking-luxe text-ivory/35">
            Maison Voyage · A private travel atelier, Geneva
          </p>
        </div>
      </section>
    </div>
  );
}
