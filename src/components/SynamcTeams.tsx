import React from "react";
import { BiUser, BiTrendingUp, BiShield, BiPackage, BiGlobe } from "react-icons/bi";

const SynmacTeam = () => {
  const strengths = [
    {
      icon: BiUser,
      title: "Expert Professionals",
      desc: "Sales and marketing professionals with expertise in materials, technologies, and applications for their particular markets",
    },
    {
      icon: BiTrendingUp,
      title: "20+ Years Experience",
      desc: "Respected leaders in their industry bringing decades of experience to customer applications",
    },
    {
      icon: BiShield,
      title: "Regulatory & Compliance",
      desc: "Intimate knowledge of statutory and technical requirements with government approvals support",
    },
    {
      icon: BiShield,
      title: "Long Term Partnerships",
      desc: "Building lasting relationships that enable customers to view Synmac as a true partner",
    },
    {
      icon: BiPackage,
      title: "Complete Services",
      desc: "Custom chemical blending, manufacturing, distribution, warehousing, packaging and delivery",
    },
    {
      icon: BiGlobe,
      title: "Global Sourcing",
      desc: "Purposeful selection of both domestic and global suppliers for broad range of products",
    },
  ];

  return (
    <div className="py-12 px-4 md:px-20 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            SYNMAC <span className="text-[#cd2626]">TEAM</span>
          </h2>
          <div className="w-16 h-0.5 bg-[#cd2626] mx-auto mt-3 mb-5"></div>
        </div>

        {/* Main Description */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <p className="text-gray-600 leading-relaxed mb-4">
              At Synmac Chemicals Pvt. Ltd., we understand the need to provide solutions to our customers to 
              better manage today's challenges and chemical requirements. Our business units employ sales and 
              marketing professionals with expertise in materials, technologies, and applications for their 
              particular markets.
            </p>
            <p className="text-gray-600 leading-relaxed">
              This specialization allows them to better assist their customers in materials selection, new product 
              development and formulations. Through purposeful selection of both domestic and global suppliers, 
              and excellent logistical and compliance support, we are well positioned to offer solutions and a 
              broad range of products that truly reflect and address your business and chemical needs.
            </p>
          </div>
          <div>
            <p className="text-gray-600 leading-relaxed mb-4">
              Synmac provides custom chemical blending, manufacturing, distribution, warehousing, packaging and 
              delivery, and is committed to customer service excellence. We maintain our commitment to intelligent 
              delivery through quality workmanship, honesty, integrity, and by building long term partnerships 
              that enable our customers to view Synmac as a partner in their business.
            </p>
            <div className="bg-[#cd2626]/5 p-4 rounded-lg border-l-4 border-[#cd2626] mt-4">
              <p className="text-gray-700 text-sm">
                <span className="font-semibold">Our marketing, sales, regulatory and technical professionals</span>{" "}
                possess an intimate knowledge of worldwide sources of supply and product applications, as well 
                as statutory and technical requirements.
              </p>
            </div>
          </div>
        </div>

    
        <div>
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">
            Why <span className="text-[#cd2626]">Choose Us</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {strengths.map((item, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-5 bg-white">
                <div className="w-11 h-11 rounded-full bg-[#cd2626]/10 flex items-center justify-center mb-3">
                  <item.icon className="text-[#cd2626]" size={22} />
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

     
      </div>
    </div>
  );
};

export default SynmacTeam;