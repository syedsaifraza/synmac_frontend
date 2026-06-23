'use client'

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useEffect, useRef, useState } from "react";
import greenPromiseImg from "@/assets/green-promise.jpg";
import { BiLeaf } from "react-icons/bi";
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

const iconMap: any = {
  BiLeaf: BiLeaf,
  // Add other icons as needed
};



const SustainabilitySection = ({ data, data1 }: any) => {


  const ref = useScrollReveal<HTMLElement>();
  const [visible, setVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);


  const stats = data1?.key_no?.map((stats: any) => {

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
                {data?.title}
              </h2>
              <p className="text-gray-500 leading-relaxed mb-8 max-w-lg fonts">
                {data?.description}
              </p>
              <div className="space-y-5">
                {data?.sustainability_lists?.map((item: any,idx:number) => {
                  
                  return (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl  flex items-center justify-center shrink-0 mt-0.5">
                        <img
                          src={item?.url || null}
                          alt="Sustainable green chemistry research in laboratory"
                          className="w-10 h-10 object-cover"
                          loading="lazy"
                          width={10}
                          height={10}
                        />
                      </div>
                      <div>
                        <h4 className="font-display font-semibold text-sm text-black">{item?.title}</h4>
                        <p className="text-gray-500 text-sm fonts">{item?.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden border border-gray-200">
                <img
                  src={data?.image_url || null}
                  alt="Sustainable green chemistry research in laboratory"
                  className="w-full h-64 object-cover"
                  loading="lazy"
                  width={800}
                  height={600}
                />
                <div className="bg-[#cd2626]/10 p-8 text-center">
                  <BiLeaf className="text-[#cd2626] mx-auto mb-3" size={36} />
                  <h3 className="font-display text-2xl font-bold mb-2 text-black">{data?.side_title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto fonts">
                    {data?.side_description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section ref={statsRef} className="py-20  bg-[#b0c4b1]/80">
        <div className="container mx-auto max-w-8xl ">
          <div className="text-center mb-12">
            <p className="text-gray-800 text-sm font-semibold tracking-wider uppercase mb-3">Key Numbers</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-800">
              Our Impact in <span className="text-white">Numbers</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-gray-900">
            {stats?.map((s: any, i: any) => {

              let label;

              if (s?.label === "years_of_excellence") {
                label = "Years Of Excellence"
              } else if (s?.label === "no_of_products") {
                label = "No Of Products"
              } else if (s?.label === "countries_served") {
                label = "Countries Served"
              } else if (s?.label === "happy_clients") {
                label = "Happy Clients"
              }

              return (
                <div key={i} className="text-center py-6">
                  <div className="text-4xl md:text-5xl font-display font-bold  mb-2">
                    {counts[i]}{s?.suffix}
                  </div>
                  <p className="text-lg font-semibold ">{label}</p>
                </div>
              )

            })}
          </div>
        </div>
      </section>
      {/* <section  className="section-fade-in py-20  bg-muted/40 bg-gray-50">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center ">
            <h2 className="font-display text-3xl text-black md:text-4xl font-bold">
              WHY CHOOSE <span className="text-[#cd2626]">SYNMAC</span>
            </h2>
            <p className="text-gray-500 mt-4 max-w-4xl mx-auto text-lg">
              We combine innovation, reliability, and customer-first service to deliver solutions that truly make a difference. Our team is dedicated to quality, transparency, and building long-term relationships. Choosing us means choosing expertise, trust, and results.
            </p>
          </div>
        </div>
      </section> */}
    </>
  );
};

export default SustainabilitySection;
