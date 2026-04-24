import HeroSection from "@/components/HeroSection";
import IndustriesSection from "@/components/IndustriesSection";
import OurStrengths from "@/components/OurStrengths";
import SustainabilitySection from "@/components/SustainabilitySection";
import Image from "next/image";

async function getUser() {
  const res = await fetch(`http://synmac.acetians.in/api/company-info/`, {
    // next: { revalidate: 300 }
    cache: "no-store"
  });
  return res.json();
}


export default async function page() {

  const data = await getUser()



  return (
    <div className="">
      <HeroSection />
      <IndustriesSection />
      <OurStrengths />
      <SustainabilitySection data={data.data} />
    </div>
  );
}
