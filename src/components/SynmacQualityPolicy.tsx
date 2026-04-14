import React from "react";
import { BiCheck, BiBuilding, BiFile, BiChat, BiTrendingUp, BiLogoFlask } from "react-icons/bi";

const SynmacQualityPolicy = () => {
  return (
    <div className="py-12 px-4 md:px-20 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Synmac <span className="text-[#cd2626]">Quality Policy</span>
          </h1>
          <div className="w-16 h-0.5 bg-[#cd2626] mx-auto mt-3 mb-5"></div>
        </div>

        {/* Main Statement */}
        <div className="p-6 mb-10">
          <p className="text-gray-700 text-center leading-relaxed">
            We are committed to continually improving the quality of our service. It is our duty to develop 
            long term partnerships with each of our customers. We feel this is best achieved by delivering 
            products and services <span className="font-semibold text-[#cd2626]">100% right the first time, on time, every time.</span>
          </p>
        </div>

        {/* Principles */}
        <div className="space-y-8">
          
          {/* 1. Suppliers */}
          <div className="border-b border-gray-200 pb-6">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#cd2626]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <BiBuilding className="text-[#cd2626]" size={18} />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Suppliers</h2>
            </div>
            <p className="text-gray-600 leading-relaxed ml-11">
              Synmac will only purchase products from specifically approved plants and will only supply products 
              to customers from plants whose products they have approved. We regularly visit our suppliers to 
              evaluate them not only on the basis of ability to deliver satisfactory products on a timely and 
              cost-efficient basis, but also on their commitment to operate in a safe and environmentally 
              responsible manner.
            </p>
          </div>

          {/* 2. Product Quality Improvement */}
          <div className="border-b border-gray-200 pb-6">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#cd2626]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <BiTrendingUp className="text-[#cd2626]" size={18} />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Product Quality Improvement</h2>
            </div>
            <p className="text-gray-600 leading-relaxed ml-11 mb-3">
              Synmac will continue our program of regular visits to our suppliers plants, and will continue to 
              educate them on the quality of product and service required by our customers.
            </p>
            <p className="text-gray-600 leading-relaxed ml-11">
              Synmac is uniquely able to do this, as almost all of our sales representatives are technically 
              trained (chemists, chemical engineers, microbiologists, QC, etc.) most with in-plant or industrial 
              laboratory experience. Synmac will also continue to search for new products, as well as for new 
              sources for products where we feel our existing sources have lapsed in either product or delivery 
              quality, and/or have failed to meet the needs of our customers or markets.
            </p>
          </div>

          {/* 3. Samples */}
          <div className="border-b border-gray-200 pb-6">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#cd2626]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <BiLogoFlask className="text-[#cd2626]" size={18} />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Samples</h2>
            </div>
            <p className="text-gray-600 leading-relaxed ml-11 mb-2">
              We will only send production quality samples to customers and we will send lab-produced or pilot 
              plant samples only by prior agreement.
            </p>
            <p className="text-gray-600 leading-relaxed ml-11">
              We will provide pre-shipment and co-shipment samples any time they are required. Samples will 
              always be accompanied by appropriate Occupational Safety and Health Administration (OSHA) labels 
              and Material Safety Data Sheets (MSDS's).
            </p>
          </div>

          {/* 4. Corrective Action */}
          <div className="pb-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#cd2626]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <BiChat className="text-[#cd2626]" size={18} />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Corrective Action</h2>
            </div>
            <p className="text-gray-600 leading-relaxed ml-11">
              In the event of a complaint, Synmac will take appropriate action to rectify the situation. This 
              typically involves contacting the supplier or other persons involved including Synmac employees, 
              to determine the best way to handle the situation and ensure compliance with our quality standards.
            </p>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default SynmacQualityPolicy;