import type { Metadata } from "next";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor } from "@/components/Cursor";
import { Navigation } from "@/components/Navigation";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

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
      <main className="min-h-screen">
        <Contact />
      </main>
      <Footer />
    </>
  );
}
