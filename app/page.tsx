import { SmoothScroll } from "@/components/effects/SmoothScroll";
import { Cursor } from "@/components/effects/Cursor";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { Navigation } from "@/components/shared/Navigation";
import { Hero } from "@/components/home/Hero";
import { BrandStatement } from "@/components/home/BrandStatement";
import { Marquee } from "@/components/home/Marquee";
import { Destinations } from "@/components/home/Destinations";
import { FeaturedItinerary } from "@/components/home/FeaturedItinerary";
import { Testimonial } from "@/components/home/Testimonial";
import { Atelier } from "@/components/home/Atelier";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Footer } from "@/components/shared/Footer";
import { DESTINATIONS } from "@/lib/data";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Cursor />
      <ScrollProgress />
      <Navigation />
      <main>
        <Hero />
        <BrandStatement />
        <Marquee items={DESTINATIONS.map((d) => d.name)} />
        <Destinations />
        <FeaturedItinerary />
        <Testimonial />
        <Atelier />
        <HowItWorks />
      </main>
      <Footer />
    </>
  );
}
