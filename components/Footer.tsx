"use client";

import { BRAND, NAV_LINKS } from "@/lib/data";
import { scrollTo } from "@/lib/lenis";

const SOCIALS = [
  { label: "Instagram", href: "#" },
  { label: "Pinterest", href: "#" },
  { label: "Journal", href: "#" },
];

/**
 * Refined, minimal footer — brand, tagline, nav, contact, socials, newsletter.
 */
export function Footer() {
  // Anchor links smooth-scroll in place; real routes navigate normally.
  const go = (e: React.MouseEvent, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      scrollTo(href);
    }
  };

  return (
    <footer className="relative border-t border-line bg-ivory px-6 pb-10 pt-20 md:px-10">
      <div className="mx-auto max-w-[94vw]">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <p className="font-serif text-2xl text-charcoal">{BRAND.name}</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink/60">
              {BRAND.tagline}
            </p>

            {/* Newsletter */}
            <form
              className="mt-8 flex max-w-sm items-end gap-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="field flex-1">
                <label htmlFor="nl">Occasional letters</label>
                <input id="nl" type="email" placeholder="Your email" />
              </div>
              <button
                type="submit"
                className="pb-1 text-xs uppercase tracking-luxe text-gold transition-colors hover:text-charcoal"
              >
                Join
              </button>
            </form>
          </div>

          {/* Navigate */}
          <div className="md:col-span-3">
            <p className="mb-5 text-xs uppercase tracking-luxe text-ink/50">
              Navigate
            </p>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={(e) => go(e, l.href)}
                    className="text-sm text-ink/70 transition-colors hover:text-gold"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <p className="mb-5 text-xs uppercase tracking-luxe text-ink/50">
              Contact
            </p>
            <ul className="space-y-3 text-sm text-ink/70">
              <li>
                <a href={`mailto:${BRAND.email}`} className="transition-colors hover:text-gold">
                  {BRAND.email}
                </a>
              </li>
              <li>{BRAND.phone}</li>
              <li>{BRAND.address}</li>
            </ul>

            <div className="mt-6 flex gap-6">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="text-xs uppercase tracking-luxe text-ink/60 transition-colors hover:text-gold"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 text-xs tracking-luxe text-ink/40 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
          <p>Composed quietly, for a small circle.</p>
        </div>
      </div>
    </footer>
  );
}
