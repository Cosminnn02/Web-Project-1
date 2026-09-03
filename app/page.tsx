import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor } from "@/components/Cursor";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { BrandStatement } from "@/components/BrandStatement";
import { Marquee } from "@/components/Marquee";
import { Destinations } from "@/components/Destinations";
import { FeaturedItinerary } from "@/components/FeaturedItinerary";
import { Testimonial } from "@/components/Testimonial";
import { Experiences } from "@/components/Experiences";
import { HowItWorks } from "@/components/HowItWorks";
import { Inquiry } from "@/components/Inquiry";
import { Footer } from "@/components/Footer";
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
        <Experiences />
        <HowItWorks />
        <Inquiry />
      </main>
      <Footer />
    </>
  );
}
