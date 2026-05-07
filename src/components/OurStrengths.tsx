
import Image from "next/image";
import { BiAward, BiGlobe, BiShieldPlus } from "react-icons/bi";
import { BsBeaker } from "react-icons/bs";
import { GiLightBulb } from "react-icons/gi";
import { PiUserSquare } from "react-icons/pi";


const capabilities = [
  { icon: BsBeaker, title: "Custom Blending", desc: "Tailored chemical blends designed to meet your exact process requirements and specifications." },
  { icon: GiLightBulb, title: "Formulation R&D", desc: "Innovation-driven research to create new formulations solving complex industrial challenges." },
  { icon: PiUserSquare, title: "Expert Team", desc: "Seasoned chemists and engineers with decades of specialty chemical expertise." },
  { icon: BiShieldPlus, title: "Quality Assurance", desc: "Rigorous quality control at every stage ensuring consistent, reliable product performance." },
  { icon: BiGlobe, title: "Global Reach", desc: "Serving industries across 50+ countries with responsive logistics and local support." },
  { icon: BiAward, title: "Industry Certified", desc: "ISO certified processes meeting international standards for safety and environmental compliance." },
];

async function getUser() {
  const res = await fetch(`http://synmac.acetians.in/api/our-strengths/`, {
    // next: { revalidate: 300 }
    cache: "no-store"
  });
  return res.json();
}


const OurStrengths =async () => {

    const data = await getUser()



  

  return (
    <section  className="section-fade-in py-24  bg-muted/40 bg-gray-50">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#cd2626] text-sm font-medium tracking-wider uppercase mb-3">Our Strengths</p>
          <h2 className="font-display text-3xl text-black md:text-4xl font-bold">
            Why Choose <span className="text-[#cd2626]">Synmac</span>
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
           {data?.data?.description}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.data?.strength_lists.map((cap:any) => (
            <div key={cap.image_id} className="p-8 text-center rounded-xl border border-gray-200 bg-white hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 group">
              <div className="w-16 h-16 rounded-full bg-[#cd2626]/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/15 transition-colors">
                <Image alt={cap.title} height={50} width={50} src={cap?.image_url} className="h-10 w-10 rounded-full object-cover"/>
              </div>
              <h3 className="font-display font-semibold text-xl mb-3 text-black">{cap.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{cap.description}</p>
            </div>
          ))}
        </div>
      </div>
     
    </section>
  );
};

export default OurStrengths;
