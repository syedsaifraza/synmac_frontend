import HeroSection from "@/components/HeroSection";
import IndustriesSection from "@/components/IndustriesSection";
import OurStrengths from "@/components/OurStrengths";
import SustainabilitySection from "@/components/SustainabilitySection";
import Image from "next/image";

export default function page() {
  return (
    <div className="">
      <HeroSection/>
      <IndustriesSection />
      <OurStrengths />
      <SustainabilitySection/>
    </div>
  );
}
