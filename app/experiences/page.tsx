import type { Metadata } from "next";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import { Cursor } from "@/components/effects/Cursor";
import { Navigation } from "@/components/shared/Navigation";
import { Experiences } from "@/components/experiences/Experiences";
import { Footer } from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "Experiences — Maison Voyage",
  description:
    "Three quiet steps: a conversation, a proposal in writing, and the journey, held.",
};

export default function ExperiencesPage() {
  return (
    <>
      <SmoothScroll />
      <Cursor />
      <Navigation />
      <main className="min-h-screen">
        <Experiences />
      </main>
      <Footer />
    </>
  );
}
