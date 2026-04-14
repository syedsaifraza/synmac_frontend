import React from "react";
import { BiBulb,BiHeart, BiTrendingUp, BiUserCheck, BiRocket, BiLogoFlask } from "react-icons/bi";

const WorkingWithSynmac = () => {
  const values = [
    {
      icon: BiBulb,
      title: "Creativity",
      desc: "Innovative thinking to solve tough technical challenges",
    },
    {
      icon: BiHeart,
      title: "Commitment",
      desc: "Dedicated to superior service and customer success",
    },
    {
      icon: BiRocket,
      title: "Passion",
      desc: "Enthusiasm and drive in everything we do",
    },
  ];

  const capabilities = [
    "World-class R&D Team",
    "Custom Solutions Development",
    "Sustainable Products",
    "In-house Expertise",
    "Technical Problem Solving",
    "New Market Innovation",
  ];

  return (
    <div className="py-12 px-4 md:px-20 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            WE ARE A{" "}
            <span className="text-[#cd2626]">CREATIVE SOLUTIONS</span> PROVIDER
          </h2>
          <div className="w-16 h-0.5 bg-[#cd2626] mx-auto mt-3 mb-5"></div>
        </div>

        {/* Main Content - Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column */}
          <div>
            <p className="text-gray-600 leading-relaxed mb-4">
              At Synmac, research drives what we do. Our in-house, world-class research and development team 
              has the knowledge, experience and insight to develop innovative and sustainable products for 
              new markets.
            </p>
            <p className="text-gray-600 leading-relaxed">
              They make it possible to provide innovative solutions to even the toughest technical challenges. 
              This expertise comes from within our organization; it's not something we contract to others. 
              We use our own people to create custom solutions that meet your specific needs.
            </p>
          </div>

          {/* Right Column - Capabilities List */}
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <BiLogoFlask className="text-[#cd2626]" size={20} />
              Our Capabilities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {capabilities.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#cd2626]"></div>
                  <span className="text-gray-600 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Working With Synmac Section */}
        <div className="border-t border-gray-200 pt-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              WORKING WITH <span className="text-[#cd2626]">SYNMAC</span>
            </h2>
            <div className="w-16 h-0.5 bg-[#cd2626] mx-auto mt-3"></div>
          </div>

          {/* Description */}
          <div className="max-w-4xl mx-auto text-center mb-10">
            <p className="text-gray-600 leading-relaxed">
              At Synmac, we are proud of our history of success in the technology industry. At the same time, 
              we know that the success of our company relies equally on the way we work with our customers 
              and the way we work with ourselves. Our approach fosters a commitment to superior service and 
              reinforces our high workplace morale.
            </p>
          </div>

          {/* Values Highlight */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
            <p className="text-gray-700 leading-relaxed text-center mb-6">
              Technology alone will not guarantee our future success, so we rely on our Values to ensure that 
              creativity, commitment and passion are a part of everything we do.
            </p>
            
            {/* Values Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values.map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-[#cd2626]/10 flex items-center justify-center mx-auto mb-3">
                    <item.icon className="text-[#cd2626]" size={24} />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-1">{item.title}</h4>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default WorkingWithSynmac;