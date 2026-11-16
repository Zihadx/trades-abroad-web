import Hero from "@/components/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import FaqSection from "@/components/sections/FaqSection";
import Manifesto from "@/components/Manifesto";
import HorizontalTrades from "@/components/HorizontalTrades";
import RoutePlanner from "@/components/RoutePlanner";
import { ClocksSection } from "@/components/Clocks";
import { Band, Marquee } from "@/components/Extras";
import { img } from "@/lib/images";
import { destinations, trades } from "@/lib/data";
import { Trades, Destinations, Why, Employers, Stories, Resources, FinalCTA } from "@/components/sections/Sections";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee items={[...trades.slice(0, 9).map((t) => t.name), ...destinations.map((d) => d.name)]} />
      <Manifesto />
      <div className="hidden md:block"><HorizontalTrades /></div>
      <div className="md:hidden"><Trades /></div>
      <Band src={img.bandBuild} eyebrow="Built by skilled hands" title="Skylines rise because someone knew the craft." cta="Explore trades" href="/trades" />
      <RoutePlanner />
      <Destinations />
      <ClocksSection />
      <HowItWorks />
      <Why />
      <Band src={img.bandWeld} eyebrow="For employers" title="Projects move when the right people show up." cta="Hire skilled talent" href="/employers" />
      <Employers />
      <Stories />
      <Resources />
      <FaqSection />
      <FinalCTA />
    </>
  );
}
