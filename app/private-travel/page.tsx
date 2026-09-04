import type { Metadata } from "next";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor } from "@/components/Cursor";
import { Navigation } from "@/components/Navigation";
import { Inquiry } from "@/components/Inquiry";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Private Travel — Maison Voyage",
};

export default function PrivateTravelPage() {
  return (
    <>
      <SmoothScroll />
      <Cursor />
      <Navigation />
      <main className="min-h-screen">
        <Inquiry />
      </main>
      <Footer />
    </>
  );
}
