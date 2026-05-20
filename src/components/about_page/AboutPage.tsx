import { useScrollReveal } from "@/hooks/useScrollReveal";
import { BiAward, BiGlobe, BiShield, BiUserPlus } from "react-icons/bi";
import { FiTarget } from "react-icons/fi";
import { GiEgyptianPyramids } from "react-icons/gi";


const strengths = [
  { icon: BiShield, title: "Quality Assurance", desc: "ISO-certified processes ensuring consistent, high-quality chemical products." },
  { icon: BiAward, title: "30+ Years Experience", desc: "Decades of expertise in specialty chemical formulation and manufacturing." },
  { icon: BiGlobe, title: "Global Reach", desc: "Serving clients in over 50 countries across all major industrial regions." },
  { icon: BiUserPlus, title: "Customer Focus", desc: "Dedicated technical support and custom solutions for every client." },
];

const AboutPage = () => {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div className="  px-20 min-h-screen">
      <div className="container mx-auto">

        <div ref={ref} className="section-fade-in grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="border border-gray-200 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#cd2626]/10 flex items-center justify-center">
                <GiEgyptianPyramids className="text-[#cd2626]" size={20} />
              </div>
              <h3 className="font-display text-xl font-semibold">Our Vision</h3>
            </div>
            <p className="text-gray-500 leading-relaxed">
              To be the global leader in specialty chemical innovation, driving sustainable industrial progress through cutting-edge formulations and unwavering commitment to excellence.
            </p>
          </div>
          <div className="border border-gray-200 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#cd2626]/10 flex items-center justify-center">
                <FiTarget className="text-[#cd2626]" size={20} />
              </div>
              <h3 className="font-display text-xl font-semibold">Our Mission</h3>
            </div>
            <p className="text-gray-500  leading-relaxed">
              To deliver high-performance, eco-friendly chemical solutions that empower industries to achieve operational excellence while minimizing environmental impact.
            </p>
          </div>
        </div>


        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold">Our <span className="text-[#cd2626]">Clientele</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {strengths.map((s) => (
              <div key={s.title} className="border rounded-xl border-gray-200 p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-[#cd2626]/10 flex items-center justify-center mx-auto mb-4">
                  <s.icon className="text-[#cd2626]" size={24} />
                </div>
                <h3 className="font-display font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
