'use client'

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useEffect, useRef, useState } from "react";
import greenPromiseImg from "@/assets/green-promise.jpg";
import { BiLeaf, BiRecycle, BiTrendingUp } from "react-icons/bi";
import { TbDropletShare } from "react-icons/tb";
import Image from "next/image";

const useCountUp = (end: number, duration = 2000, start = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    const steps = 60;
    const increment = end / steps;
    const stepTime = duration / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [end, duration, start]);

  return count;
};



const SustainabilitySection = ({ data }: any) => {


  const ref = useScrollReveal<HTMLElement>();
  const [visible, setVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  //   const stats = [
  //   { end: 30, suffix: "+", label: "Years of Excellence" },
  //   { end: 1700, suffix: "+", label: "Products" },
  //   { end: 17, suffix: "+", label: "Countries Served" },
  //   { end: 1000, suffix: "+", label: "Happy Clients" },
  // ];

  const stats = data?.key_no?.map((stats: any) => {

    return {
      end: stats.value,
      suffix: "+",
      label: stats.name
    }
  })

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const counts = stats?.map((s: any) => useCountUp(s.end, 2000, visible));

  return (
    <>

      <section ref={ref} className="section-fade-in pb-20 px-6 bg-gray-50">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#cd2626] text-sm font-medium tracking-wider uppercase mb-3">Sustainability</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-black">
                Committed to <span className="text-[#cd2626]">Green Chemistry</span>
              </h2>
              <p className="text-gray-500 leading-relaxed mb-8 max-w-lg">
                We develop eco-friendly formulations that minimize environmental impact while maximizing industrial performance. Our commitment to sustainability drives every innovation.
              </p>
              <div className="space-y-5">
                {[
                  { icon: BiLeaf, title: "Bio-based Formulations", text: "Biodegradable and sustainable chemical products" },
                  { icon: TbDropletShare, title: "Water Conservation", text: "Water-saving chemical solutions reducing consumption by up to 40%" },
                  { icon: BiRecycle, title: "Circular Economy", text: "Recyclable packaging and waste-reduction initiatives" },
                  { icon: BiTrendingUp, title: "Continuous Innovation", text: "R&D focused on greener, more efficient alternatives" },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#cd2626]/10  flex items-center justify-center shrink-0 mt-0.5">
                      <item.icon className="text-[#cd2626]" size={20} />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-sm text-black">{item.title}</h4>
                      <p className="text-gray-500 text-sm">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden border border-gray-200">
                <Image
                  src={greenPromiseImg}
                  alt="Sustainable green chemistry research in laboratory"
                  className="w-full h-64 object-cover"
                  loading="lazy"
                  width={800}
                  height={600}
                />
                <div className="bg-[#cd2626]/10 p-8 text-center">
                  <BiLeaf className="text-[#cd2626] mx-auto mb-3" size={36} />
                  <h3 className="font-display text-2xl font-bold mb-2 text-black">Our Green Promise</h3>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto">
                    By 2030, 100% of our product lines will meet international eco-certification standards. We're investing in research to make every formulation cleaner and greener.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section ref={statsRef} className="py-20  bg-[#292929]">
        <div className="container mx-auto max-w-6xl ">
          <div className="text-center mb-12">
            <p className="text-[#cd2626] text-sm font-medium tracking-wider uppercase mb-3">Key Numbers</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
              Our Impact in <span className="text-[#cd2626]">Numbers</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats?.map((s: any, i: any) => {

              let label;

              if (s.label === "years_of_excellence") {
                label = "Years Of Excellence"
              } else if (s.label === "no_of_products") {
                label = "No Of Products"
              } else if (s.label === "countries_served") {
                label = "Countries Served"
              } else if (s.label === "happy_clients") {
                label = "Happy Clients"
              }

              return (
                <div key={s.label} className="text-center py-6">
                  <div className="text-4xl md:text-5xl font-display font-bold text-white mb-2">
                    {counts[i]}{s.suffix}
                  </div>
                  <p className="text-sm text-white/60">{label}</p>
                </div>
              )

            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default SustainabilitySection;
