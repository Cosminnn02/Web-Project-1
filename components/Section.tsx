interface SectionProps {
  id?: string;
  className?: string;
  dark?: boolean;
  children: React.ReactNode;
}

/**
 * Semantic section wrapper with the site's generous vertical rhythm.
 * `dark` switches to the charcoal "act" (used for the itinerary + testimonial).
 * Reveals are applied explicitly via <Reveal/> / <RevealText/> inside.
 */
export function Section({ id, className = "", dark = false, children }: SectionProps) {
  return (
    <section
      id={id}
      className={`relative px-6 py-28 md:px-10 md:py-40 ${
        dark ? "bg-charcoal text-ivory" : ""
      } ${className}`}
    >
      {children}
    </section>
  );
}
