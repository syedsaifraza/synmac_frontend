import HeroSection from "@/components/HeroSection";
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
  const res = await fetch(`http://localhost:3000/api/sustainability/`, {
    // next: { revalidate: 300 }
    cache: "no-store"
  });
  return res.json();
}

async function getHeroSection() {
  const res = await fetch(`http://localhost:3000/api/hero-section/`, {
    // next: { revalidate: 300 }
    cache: "no-store"
  });
  return res.json();
}

export default async function page() {

  const data = await getUser()
  const heroSection = await getHeroSection()
  const sustainability = await getSustainability()



  console.log("Sustainability",sustainability )

  console.log("company",data)



  return (
    <div className="">
      {/* <Startup/> */}
      <HeroSection data={heroSection?.data} />
      <IndustriesSection />
      <OurStrengths />
      <SustainabilitySection data={sustainability?.data} data1={data.data} />
    </div>
  );
}
