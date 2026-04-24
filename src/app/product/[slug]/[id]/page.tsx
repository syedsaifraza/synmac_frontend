import Link from 'next/link';
import React from 'react';
import { LiaAngleRightSolid } from 'react-icons/lia';

async function getProduct(id: any) {
  const res = await fetch(
    `https://synmac-backend.serverscripts.in/api/v1/user/product/view/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );
  return res.json();
}

const Page = async ({ params }: any) => {
  const resolvedParams = await params;
  const response = await getProduct(resolvedParams.id);
  const productData = response?.data || null;

  console.log("API Response:", response);

  const SolutionsSection = () => {
    const name = productData?.name ?? "Avipol";
    const description = productData?.description ?? "Avipol is a specialized chemical solution used as a viscosity reducer in industries like sugar and agro-processing, helping improve fluid flow, enhance processing efficiency, reduce energy consumption, and ensure smoother handling of syrups and thick liquids.";

    return (
      <div className="text-black py-8 sm:py-12 lg:py-16">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-3 sm:mb-4 font-semibold text-gray-900">{name}</h2>
        <p className="text-gray-600 text-base sm:text-lg leading-relaxed">{description}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={productData?.hero_background_file_url || productData?.image}
            alt={productData?.hero_background_title || "Product Hero"}
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        {/* Hero inner container with uniform padding */}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-3 sm:mb-4">
              {productData?.hero_background_title || "Premium Chemical Solutions"}
            </h1>
            <p className="text-gray-200 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">
              {productData?.hero_background_description || "High-quality industrial chemical solutions for enhanced performance and efficiency"}
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {productData?.product_category_name && (
                <span className="inline-flex items-center px-2.5 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-medium bg-white/20 backdrop-blur-sm text-white">
                  {productData.product_category_name}
                </span>
              )}
              {productData?.industry_name && (
                <span className="inline-flex items-center px-2.5 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-medium bg-white/10 backdrop-blur-sm text-white border border-white/20">
                  {productData.industry_name}
                  {productData?.sub_industry_name && ` / ${productData.sub_industry_name}`}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Container - uniform padding on all sections */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Solutions Section */}
        <SolutionsSection />

        {/* Document Links */}
        {(productData?.tds_doc || productData?.msds_doc) && (
          <div className="flex flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-12">
            {productData.tds_doc && (
              <a
                href={productData.tds_doc}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-gray-700 font-medium transition-colors duration-200 text-sm sm:text-base"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Technical Data Sheet (TDS)
              </a>
            )}
            {productData.msds_doc && (
              <a
                href={productData.msds_doc}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-gray-700 font-medium transition-colors duration-200 text-sm sm:text-base"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Material Safety Data Sheet (MSDS)
              </a>
            )}
          </div>
        )}

        {/* Uses and Benefits Section */}
        <div className="py-6 sm:py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            
            {/* Uses Section */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-4 sm:px-6 pt-5 sm:pt-6 pb-3 sm:pb-4 border-b border-gray-100 bg-gradient-to-r from-gray-50/40 to-white">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 tracking-tight">
                  Uses
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">Common applications</p>
              </div>
              <ul className="divide-y divide-gray-50">
                <li className="px-4 sm:px-6 py-3 sm:py-3.5 text-gray-700 flex items-start gap-2 sm:gap-3 text-sm sm:text-base">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></span>
                  <span className="flex-1">Industrial water treatment</span>
                </li>
                <li className="px-4 sm:px-6 py-3 sm:py-3.5 text-gray-700 flex items-start gap-2 sm:gap-3 text-sm sm:text-base">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></span>
                  <span className="flex-1">Cooling water systems</span>
                </li>
                <li className="px-4 sm:px-6 py-3 sm:py-3.5 text-gray-700 flex items-start gap-2 sm:gap-3 text-sm sm:text-base">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></span>
                  <span className="flex-1">Boiler feed water</span>
                </li>
                <li className="px-4 sm:px-6 py-3 sm:py-3.5 text-gray-700 flex items-start gap-2 sm:gap-3 text-sm sm:text-base">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></span>
                  <span className="flex-1">Reverse osmosis pre-treatment</span>
                </li>
                <li className="px-4 sm:px-6 py-3 sm:py-3.5 text-gray-700 flex items-start gap-2 sm:gap-3 text-sm sm:text-base">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></span>
                  <span className="flex-1">Process water conditioning</span>
                </li>
              </ul>
            </div>

            {/* Benefits Section */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-4 sm:px-6 pt-5 sm:pt-6 pb-3 sm:pb-4 border-b border-gray-100 bg-gradient-to-r from-gray-50/40 to-white">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 tracking-tight">
                  Benefits
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">Performance advantages</p>
              </div>
              <ul className="divide-y divide-gray-50">
                <li className="px-4 sm:px-6 py-3 sm:py-3.5 text-gray-700 flex items-start gap-2 sm:gap-3 text-sm sm:text-base">
                  <span className="inline-flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-medium flex-shrink-0 mt-0.5">✓</span>
                  <span className="flex-1">Excellent scale inhibition for cooling circuits, boilers and RO units</span>
                </li>
                <li className="px-4 sm:px-6 py-3 sm:py-3.5 text-gray-700 flex items-start gap-2 sm:gap-3 text-sm sm:text-base">
                  <span className="inline-flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-medium flex-shrink-0 mt-0.5">✓</span>
                  <span className="flex-1">Prolongs equipment lifespan and reduces maintenance frequency</span>
                </li>
                <li className="px-4 sm:px-6 py-3 sm:py-3.5 text-gray-700 flex items-start gap-2 sm:gap-3 text-sm sm:text-base">
                  <span className="inline-flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-medium flex-shrink-0 mt-0.5">✓</span>
                  <span className="flex-1">Effective across wide pH and temperature ranges</span>
                </li>
                <li className="px-4 sm:px-6 py-3 sm:py-3.5 text-gray-700 flex items-start gap-2 sm:gap-3 text-sm sm:text-base">
                  <span className="inline-flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-medium flex-shrink-0 mt-0.5">✓</span>
                  <span className="flex-1">Compatible with standard treatment programs</span>
                </li>
                <li className="px-4 sm:px-6 py-3 sm:py-3.5 text-gray-700 flex items-start gap-2 sm:gap-3 text-sm sm:text-base">
                  <span className="inline-flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-medium flex-shrink-0 mt-0.5">✓</span>
                  <span className="flex-1">Low environmental impact formulation</span>
                </li>
                <li className="px-4 sm:px-6 py-3 sm:py-3.5 text-gray-700 flex items-start gap-2 sm:gap-3 text-sm sm:text-base">
                  <span className="inline-flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-medium flex-shrink-0 mt-0.5">✓</span>
                  <span className="flex-1">Cost-effective solution for high-performance water treatment</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;