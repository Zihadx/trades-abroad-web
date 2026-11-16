import Hero from "@/components/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import FaqSection from "@/components/sections/FaqSection";
import {
  Trades,
  Destinations,
  Why,
  Employers,
  Stories,
  Resources,
  FinalCTA,
} from "@/components/sections/Sections";

export default function Home() {
  return (
    <>
      <Hero />
      <Trades />
      <Destinations />
      <HowItWorks />
      <Why />
      <Employers />
      <Stories />
      <Resources />
      <FaqSection />
      <FinalCTA />
    </>
  );
}
