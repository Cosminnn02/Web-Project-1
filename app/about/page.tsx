import type { Metadata } from "next";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import { Cursor } from "@/components/effects/Cursor";
import { Navigation } from "@/components/shared/Navigation";
import { Footer } from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "About — Maison Voyage",
  description:
    "A private travel atelier in Geneva — the atelier, the standard, the hands.",
};

export default function AboutPage() {
  return (
    <>
      <SmoothScroll />
      <Cursor />
      <Navigation />
      <main className="min-h-screen" />
      <Footer />
    </>
  );
}
