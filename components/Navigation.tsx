"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BRAND, NAV_LINKS } from "@/lib/data";
import { scrollTo } from "@/lib/lenis";
import { CTA } from "./CTA";

/**
 * Minimal, fixed navigation. Transparent over the hero, gains a backdrop on scroll.
 * Links smooth-scroll to their sections.
 */
export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  // On non-home pages the background is light, so keep the bar solid always.
  const solid = scrolled || pathname !== "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (e: React.MouseEvent, href: string) => {
    setOpen(false);
    // Anchor links smooth-scroll in place; real routes navigate normally.
    if (href.startsWith("#")) {
      e.preventDefault();
      scrollTo(href);
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? "bg-ivory/95 border-b border-line"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[94vw] items-center justify-between px-6 py-3 md:px-10">
        <Link
          href="/"
          onClick={(e) => go(e, "/")}
          aria-label={BRAND.name}
          className="block"
        >
          <Image
            src="/logo-dark.png"
            alt={BRAND.name}
            width={180}
            height={60}
            priority
            className="h-12 w-auto md:h-16"
          />
        </Link>

        <ul className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={(e) => go(e, l.href)}
                className={`text-xs uppercase tracking-luxe transition-colors duration-300 hover:text-gold ${
                  solid ? "text-ink/70" : "text-ivory"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <CTA variant="ghost" light={!solid}>
            Begin Inquiry
          </CTA>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="flex flex-col gap-1.5 lg:hidden"
        >
          <span
            className={`h-px w-6 bg-charcoal transition-transform duration-300 ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-charcoal transition-transform duration-300 ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden bg-ivory transition-[max-height] duration-500 lg:hidden ${
          open ? "max-h-96 border-b border-line" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-6 py-4">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={(e) => go(e, l.href)}
                className="block py-3 font-serif text-xl text-charcoal"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="pt-3">
            <CTA>Begin Inquiry</CTA>
          </li>
        </ul>
      </div>
    </header>
  );
}
