"use client";

import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useReveal } from "@/hooks/useReveal";
import { DUR, EASE } from "@/lib/motion";
import { RevealText } from "@/components/effects/RevealText";
import { CTA } from "@/components/shared/CTA";

/* ————————————————— Content ————————————————— */

const STORY = [
  "You will not find a team page here, or a list of destinations. An atelier is not a catalogue. It is a way of keeping things: a limited number of houses, a longer list of people, and a calendar with room in it.",
  "The work has an old name. In the trade, the concierge is remembered as the “door opener” — the one whose value is not in what they can book, but in the doors they are trusted to open. We keep that definition, and we add one: we open fewer doors than we are offered, and we say so.",
  "We are small on purpose. Eighteen houses, one guest at a time, a single number at any hour. Not because we cannot hold more — because the holding is the work.",
];

const STATS = [
  { n: "18", label: "Houses, held — not listed" },
  { n: "1", label: "Guest at a time, in every house" },
  { n: "1", label: "Number, answered at any hour" },
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

const TABLE = [
  "The table is where a journey is judged. Not the view, not the wine list — the pace. A meal that waits for you, that is set and reset without being asked, that ends when the last of you is ready to leave it.",
  "We keep a short list of kitchens — a chef in the souks, a table in a working house in the Andes, a room above the sea where the only menu is the day’s catch. Each one is chosen for the same reason: they treat a single guest as the only guest.",
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
 * About — "the house, in its own words". A full visual-first redesign:
 * a full-bleed hero, a story split with parallax imagery, the kept/never
 * standard, a full-bleed interlude, the table, the objects of the trade,
 * the questions, the mark, and the turn.
 *
 * Composed in the site's own system: tokens, type, spacing, motion.
 * Every animation runs through `useReveal` and is skipped under reduced
 * motion; the markup already sits in its final state.
 */
export function About() {
  /* ——— Story: copy steps in, the image drifts ——— */
  const storyRef = useReveal<HTMLElement>((scope) => {
    const items = Array.from(scope.querySelectorAll<HTMLElement>(".ab-story-item"));
    items.forEach((el, i) => {
      gsap.fromTo(
        el,
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: DUR.standard,
          ease: EASE.out,
          delay: i * 0.08,
          scrollTrigger: { trigger: scope, start: "top 95%", toggleActions: "play none none reverse" },
        }
      );
    });
    const img = scope.querySelector<HTMLElement>(".ab-story-img");
    if (img) {
      gsap.fromTo(
        img,
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: "none",
          scrollTrigger: { trigger: scope, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
    }
  });

  /* ——— Standard: the rows arrive one by one ——— */
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
          delay: i * 0.08,
          scrollTrigger: { trigger: scope, start: "top 90%", toggleActions: "play none none reverse" },
        }
      );
    });
  });

  /* ——— Interlude: the image settles, the line rises ——— */
  const interRef = useReveal<HTMLElement>((scope) => {
    const img = scope.querySelector<HTMLElement>(".ab-inter-img");
    if (img) {
      gsap.fromTo(
        img,
        { scale: 1.12 },
        {
          scale: 1,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: scope, start: "top 90%", toggleActions: "play none none reverse" },
        }
      );
    }
    const line = scope.querySelector<HTMLElement>(".ab-inter-line");
    if (line) {
      gsap.fromTo(
        line,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: DUR.standard,
          ease: EASE.out,
          delay: 0.3,
          scrollTrigger: { trigger: scope, start: "top 90%", toggleActions: "play none none reverse" },
        }
      );
    }
  });

  /* ——— The table: copy steps in, the image drifts ——— */
  const tableRef = useReveal<HTMLElement>((scope) => {
    const items = Array.from(scope.querySelectorAll<HTMLElement>(".ab-table-item"));
    items.forEach((el, i) => {
      gsap.fromTo(
        el,
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: DUR.standard,
          ease: EASE.out,
          delay: i * 0.08,
          scrollTrigger: { trigger: scope, start: "top 90%", toggleActions: "play none none reverse" },
        }
      );
    });
    const img = scope.querySelector<HTMLElement>(".ab-table-img");
    if (img) {
      gsap.fromTo(
        img,
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: "none",
          scrollTrigger: { trigger: scope, start: "top bottom", end: "bottom top", scrub: true },
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
            scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none reverse" },
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
            scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none reverse" },
          }
        );
      }
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
          scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none reverse" },
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
          scrollTrigger: { trigger: scope, start: "top 90%", toggleActions: "play none none reverse" },
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
          scrollTrigger: { trigger: scope, start: "top 90%", toggleActions: "play none none reverse" },
        }
      );
    });
  });

  return (
    <div className="bg-ivory">
      {/* ————————————————— The hero ————————————————— */}
      <section className="relative">
        <div className="relative aspect-[28/9] w-full overflow-hidden">
          <Image
            src="/images/atelier/about-hero.jpg"
            alt="A private resort at dusk, the pool lit against the dark"
            fill
            priority
            sizes="100vw"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/40 to-charcoal/10" />

          <div className="absolute inset-0 flex items-center pl-16 pr-6 md:pl-28 md:pr-10">
            <div>
              <p className="mb-6 text-[clamp(0.65rem,0.8vw,0.9rem)] uppercase tracking-luxe text-ivory/70">
                About the atelier
              </p>
              <h1 className="max-w-6xl font-serif text-[clamp(3rem,5.5vw,5.75rem)] leading-[1.05] text-ivory">
                <RevealText text="The house, in its own words." />
              </h1>
              <p className="mt-7 max-w-xl text-[clamp(0.95rem,1.1vw,1.15rem)] leading-relaxed text-ivory/80">
                A private travel atelier in Geneva. What it keeps, what it refuses,
                and what a guest receives — written in the house’s own voice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ————————————————— The introduction ————————————————— */}
      <section className="bg-cream pt-20 md:pt-28">
        <div className="mx-auto max-w-[94vw] px-6 md:px-10">
          <div className="h-px w-full bg-line" />
          <div className="flex flex-col items-center gap-3 py-16 text-center md:py-20">
            <p className="mb-6 text-xs uppercase tracking-luxe text-gold">
              The dossier
            </p>
            <h2 className="mx-auto max-w-4xl font-serif text-4xl leading-[1.1] text-charcoal md:text-6xl">
              What the house keeps, and what it refuses.
            </h2>
          </div>
          <div className="h-px w-full bg-line" />
        </div>
        <div className="mt-16 h-24 bg-gradient-to-b from-transparent to-ivory md:mt-20" />
      </section>

      {/* ————————————————— The story ————————————————— */}
      <section ref={storyRef} className="px-6 pb-24 pt-12 md:px-10 md:pb-40 md:pt-20">
        <div className="mx-auto grid max-w-[94vw] items-center gap-14 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-6">
            <p className="ab-story-item text-xs uppercase tracking-luxe text-gold">The house</p>
            <h2 className="ab-story-item mt-6 font-serif text-4xl leading-[1.1] text-charcoal md:text-5xl">
              An atelier is not a catalogue.
            </h2>
            <div className="ab-story-item mt-8 space-y-6">
              {STORY.map((p, i) => (
                <p key={i} className="text-base leading-relaxed text-ink/75 md:text-lg">
                  {p}
                </p>
              ))}
            </div>
          </div>

          <div className="md:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden bg-cream">
              <Image
                src="/images/atelier/about-terrace.jpg"
                alt="A private pool at dusk, set into the hillside"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="ab-story-img h-full w-full scale-110 object-cover will-change-transform"
              />
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6">
              {STATS.map((s) => (
                <div key={s.label} className="border-t border-line pt-4">
                  <p className="font-serif text-3xl text-charcoal md:text-4xl">
                    {s.n}
                    <span className="text-gold">.</span>
                  </p>
                  <p className="mt-2 text-[0.6rem] uppercase tracking-luxe text-ink/55">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ————————————————— The standard ————————————————— */}
      <section ref={stdRef} className="border-y border-line bg-cream px-6 py-24 md:px-10 md:py-36">
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

          <div className="mt-14">
            <div className="mb-8 h-px w-14 bg-gold" />
            <div className="border-t border-line">
              <div className="hidden grid-cols-[3.5rem_1fr_1fr] border-b border-line py-4 md:grid">
                <span />
                <p className="text-[0.65rem] uppercase tracking-luxe text-gold">Kept</p>
                <p className="text-[0.65rem] uppercase tracking-luxe text-ink/40">Never</p>
              </div>
              {KEEP.map((k, i) => (
                <div key={k} data-row className="grid grid-cols-1 gap-2 border-b border-line py-6 md:grid-cols-[3.5rem_1fr_1fr] md:gap-8">
                  <p className="hidden text-xs tracking-luxe text-gold md:block">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="text-base leading-relaxed text-charcoal md:text-lg">
                    <span className="mr-3 text-xs uppercase tracking-luxe text-gold md:hidden">Kept —</span>
                    {k}
                  </p>
                  <p className="text-base leading-relaxed text-ink/55 md:text-lg">
                    <span className="mr-3 text-xs uppercase tracking-luxe text-ink/35 md:hidden">Never —</span>
                    {NEVER[i]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ————————————————— The interlude ————————————————— */}
      <section ref={interRef} className="relative h-[72svh] min-h-[480px] w-full overflow-hidden bg-charcoal">
        <Image
          src="/images/atelier/about-coast.jpg"
          alt="A private shore at dusk, the water still"
          fill
          sizes="100vw"
          className="ab-inter-img h-full w-full object-cover will-change-transform"
        />
        <div className="absolute inset-0 bg-charcoal/45" />
        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <p className="ab-inter-line max-w-3xl text-center font-serif text-3xl leading-[1.2] text-ivory md:text-5xl">
            We open fewer doors than we are offered — and we say so.
          </p>
        </div>
      </section>

      {/* ————————————————— The table ————————————————— */}
      <section ref={tableRef} className="px-6 py-24 md:px-10 md:py-40">
        <div className="mx-auto grid max-w-[94vw] items-center gap-14 md:grid-cols-12 md:gap-16">
          <div className="order-2 md:order-1 md:col-span-6">
            <div className="relative aspect-[4/5] overflow-hidden bg-cream">
              <Image
                src="/images/atelier/about-dining.jpg"
                alt="A table set for a single guest, by the water"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="ab-table-img h-full w-full scale-110 object-cover will-change-transform"
              />
            </div>
          </div>

          <div className="order-1 md:order-2 md:col-span-6">
            <p className="ab-table-item text-xs uppercase tracking-luxe text-gold">The table</p>
            <h2 className="ab-table-item mt-6 font-serif text-4xl leading-[1.1] text-charcoal md:text-5xl">
              <RevealText text="Where a journey is judged." />
            </h2>
            <div className="ab-table-item mt-8 space-y-6">
              {TABLE.map((p, i) => (
                <p key={i} className="text-base leading-relaxed text-ink/75 md:text-lg">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ————————————————— The objects of the trade ————————————————— */}
      <section ref={objectsRef} className="bg-charcoal px-6 py-24 md:px-10 md:py-36">
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

      {/* ————————————————— The questions, answered ————————————————— */}
      <section ref={qRef} className="px-6 py-24 md:px-10 md:py-36">
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
      <section ref={markRef} className="border-t border-line bg-cream px-6 py-24 md:px-10 md:py-32">
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
          <CTA href="/contact" variant="ghost" light>
            Begin the letter
          </CTA>
          <p className="mt-10 text-[0.6rem] uppercase tracking-luxe text-ivory/35">
            Maison Voyage · A private travel atelier, Geneva
          </p>
        </div>
      </section>
    </div>
  );
}
