import type { Metadata } from "next";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor } from "@/components/Cursor";
import { Navigation } from "@/components/Navigation";
import { Process } from "@/components/Process";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "The Process — Maison Voyage",
  description:
    "Three quiet steps: a conversation, a proposal in writing, and the journey, held.",
};

export default function ProcessPage() {
  return (
    <>
      <SmoothScroll />
      <Cursor />
      <Navigation />
      <main className="min-h-screen">
        <Process />
      </main>
      <Footer />
    </>
  );
}
