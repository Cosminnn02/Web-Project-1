import { Magnetic } from "./Magnetic";
import { scrollTo } from "@/lib/lenis";

interface CTAProps {
  children: React.ReactNode;
  href?: string;
  variant?: "solid" | "ghost";
  light?: boolean;
  onClick?: () => void;
}

/**
 * Primary call-to-action. Magnetic, with a subtle sliding arrow.
 * Anchor links route through Lenis for smooth scrolling.
 */
export function CTA({
  children,
  href = "#inquiry",
  variant = "solid",
  light = false,
  onClick,
}: CTAProps) {
  const base =
    "group inline-flex items-center gap-3 px-8 py-4 text-xs tracking-luxe uppercase transition-colors duration-500";
  const styles =
    variant === "solid"
      ? "bg-charcoal text-ivory hover:bg-gold"
      : light
        ? "border border-ivory/40 text-ivory hover:border-gold hover:text-gold"
        : "border border-charcoal/25 text-charcoal hover:border-gold hover:text-gold";

  const handle = (e: React.MouseEvent) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      scrollTo(href);
    }
    onClick?.();
  };

  return (
    <Magnetic>
      <a href={href} onClick={handle} className={`${base} ${styles}`}>
        <span>{children}</span>
        <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
          →
        </span>
      </a>
    </Magnetic>
  );
}
