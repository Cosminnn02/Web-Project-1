import type { Metadata } from "next";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import { Cursor } from "@/components/effects/Cursor";
import { Navigation } from "@/components/shared/Navigation";
import { Footer } from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "Contact — Maison Voyage",
  description:
    "Begin the conversation with Maison Voyage — a private travel atelier in Geneva.",
};

export default function ContactPage() {
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
