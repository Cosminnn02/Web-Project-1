import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor } from "@/components/Cursor";
import { Navigation } from "@/components/Navigation";
import { DestinationDetail } from "@/components/DestinationDetail";
import { Footer } from "@/components/Footer";
import { DESTINATIONS, getDestination, relatedTo } from "@/lib/data";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return DESTINATIONS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const d = getDestination(slug);
  if (!d) return { title: "Destination — Maison Voyage" };
  return {
    title: `${d.name} — Maison Voyage`,
    description: d.story,
  };
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;
  const d = getDestination(slug);
  if (!d) notFound();

  return (
    <>
      <SmoothScroll />
      <Cursor />
      <Navigation />
      <main>
        <DestinationDetail d={d} related={relatedTo(d, 3)} />
      </main>
      <Footer />
    </>
  );
}
