import HeroSection from "@/components/component/HeroSection";
import IndustriesSection from "@/components/IndustriesSection";
import OurStrengths from "@/components/OurStrengths";
import SustainabilitySection from "@/components/SustainabilitySection";
// import Startup from "@/hooks/Startup";
import Image from "next/image";

async function getUser() {
  const res = await fetch(`http://synmac.acetians.in/api/company-info/`, {
    // next: { revalidate: 300 }
    cache: "no-store"
  });
  return res.json();
}

async function getSustainability() {
  const res = await fetch(`http://synmac.acetians.in/api/sustainability/`, {
    // next: { revalidate: 300 }
    cache: "no-store"
  });
  return res.json();
}

async function getHeroSection() {
  const res = await fetch(`http://synmac.acetians.in/api/hero-section/`, {
    // next: { revalidate: 300 }
    cache: "no-store"
  });
  return res.json();
}

export default async function page() {

  const data = await getUser()
  const heroSection = await getHeroSection()
  const sustainability = await getSustainability()



  return (
    <div className="">
    
     {
  heroSection?.data && (
    <HeroSection data={heroSection.data} />
  )
}
      <IndustriesSection />
      <OurStrengths />
      <SustainabilitySection data={sustainability?.data} data1={data.data} />
    </div>
  );
}
