import HeroSection from "@/components/home_page/HeroSection";
import IndustriesSection from "@/components/home_page/IndustriesSection";
import OurStrengths from "@/components/home_page/OurStrengths";
import SustainabilitySection from "@/components/home_page/SustainabilitySection";


async function getSustainability() {
  const res = await fetch(`http://synmac.acetians.in/api/sustainability`, {
  
    cache: "no-store"
  });
  return res.json();
}

async function getHeroSection() {
  const res = await fetch(`http://synmac.acetians.in/api/hero-section`, {
    cache: "no-store"
  });
  return res.json();
}


async function getFooterData() {
  const res = await fetch(`http://synmac.acetians.in/api/footer/`, {

    cache: "no-store"
  });
  return res.json();
}


export default async function page() {

  const heroSection = await getHeroSection()
  const sustainability = await getSustainability()

  const footer = await getFooterData()



  return (
    <>
    
     {
  heroSection?.data && (
    <HeroSection data={heroSection.data} />
  )
}
      <IndustriesSection />
      <OurStrengths />
      <SustainabilitySection  data={sustainability?.data} data1={footer.data} />
    </>
  );
}