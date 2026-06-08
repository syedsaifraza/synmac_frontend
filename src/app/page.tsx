import HeroSection from "@/components/home_page/HeroSection";
import IndustriesSection from "@/components/home_page/IndustriesSection";
import OurStrengths from "@/components/home_page/OurStrengths";
import SustainabilitySection from "@/components/home_page/SustainabilitySection";

async function getUser() {
  const res = await fetch(`http://localhost:3000/api/company-info`, {
    // next: { revalidate: 300 }
    cache: "no-store"
  });
  return res.json();
}

async function getSustainability() {
  const res = await fetch(`http://localhost:3000/api/sustainability`, {
    // next: { revalidate: 300 }
    cache: "no-store"
  });
  return res.json();
}

async function getHeroSection() {
  const res = await fetch(`http://localhost:3000/api/hero-section`, {
    // next: { revalidate: 300 }
    cache: "no-store"
  });
  return res.json();
}

async function getIndustries() {
  try {
    const res = await fetch("http://localhost:3000/api/industry", {
      
      cache: "no-store"
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch industries: ${res.status}`);
    }




    const result = await res.json();




    return result?.industries || [];
  } catch (error) {
    console.error("Error fetching industries:", error);
    return [];
  }
}
export default async function page() {

  const data = await getUser()
  const heroSection = await getHeroSection()
  const sustainability = await getSustainability()
  const industries = await getIndustries();



  return (
    <div className="">
    
     {
  heroSection?.data && (
    <HeroSection data={heroSection.data} />
  )
}
      <IndustriesSection industries={industries} />
      <OurStrengths />
      <SustainabilitySection data={sustainability?.data} data1={data.data} />
    </div>
  );
}
