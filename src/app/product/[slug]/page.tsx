import Link from 'next/link';
import React from 'react';
import { LiaAngleRightSolid } from 'react-icons/lia';

import { FaLock, FaLockOpen } from "react-icons/fa";
import Header from '@/components/Header';

async function getProduct(slug: any) {
  const res = await fetch(
    `https://synmac-backend.serverscripts.in/api/v1/user/product/viewbyslug/${slug}`,
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
  const response = await getProduct(resolvedParams.slug);
  const productData = response?.data || null;

  console.log("API Response:", response);

  const SolutionsSection = () => {
    const name = productData?.name ?? "Avipol";
    const description = productData?.description ?? "Avipol is a specialized chemical solution used as a viscosity reducer in industries like sugar and agro-processing, helping improve fluid flow, enhance processing efficiency, reduce energy consumption, and ensure smoother handling of syrups and thick liquids.";

    return (
      <div className="text-black py-8 sm:py-12 lg:py-16">

        <p className="text-gray-600 text-base sm:text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: description }} />

      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      

      <div className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={ productData?.image}
            alt={productData?.hero_background_title || "Product Hero"}
            className="w-full h-full object-cover opacity-40"
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-0 py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="max-w-3xl text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight mb-3 sm:mb-4">
              {productData?.name || "Premium Chemical Solutions"}
            </h1>
            <p className="text-white text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6" dangerouslySetInnerHTML={{ __html: productData?.hero_background_description }} />
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


      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0">


        <SolutionsSection />

        {(productData?.tds_doc || productData?.msds_doc) && (
          <div className="flex flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-12">

            {/* TDS */}
            {productData.tds_doc && (
              <a
                href={!productData?.is_tds_locked ? productData.tds_doc : "#"}
              
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 border rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base
          ${productData?.is_tds_locked
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed border-gray-200"
                    : "bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200"
                  }`}
              >
                {productData?.is_tds_locked ? <FaLock /> : <FaLockOpen />}

                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>

                Technical Data Sheet (TDS)
              </a>
            )}

            {/* MSDS */}
            {productData.msds_doc && (
              <a
                href={!productData?.is_msds_locked ? productData.msds_doc : "#"}
              
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 border rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base
          ${productData?.is_msds_locked
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed border-gray-200"
                    : "bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200"
                  }`}
              >
                {productData?.is_msds_locked ? <FaLock /> : <FaLockOpen />}

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
              <div className="px-4 sm:px-6 pt-5 sm:pt-6 pb-3 sm:pb-4 border-b border-gray-100 bg-linear-to-r from-gray-50/40 to-white">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 tracking-tight">
                  Uses
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">Common applications</p>
              </div>
              <ul className="divide-y divide-gray-50">

                {
                  productData.usecases.map((use:any)=>(
 <li className="px-4 sm:px-6 py-3 sm:py-3.5 text-gray-700 flex items-start gap-2 sm:gap-3 text-sm sm:text-base">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                  <span className="flex-1">{use.title}</span>
                </li>
                  ))
                }
               
              
              </ul>
            </div>

            {/* Benefits Section */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-4 sm:px-6 pt-5 sm:pt-6 pb-3 sm:pb-4 border-b border-gray-100 bg-lini-to-r from-gray-50/40 to-white">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 tracking-tight">
                  Benefits
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">Performance advantages</p>
              </div>
              <ul className="divide-y divide-gray-50">

                {
                  productData.benefits.map((prod:any)=>(
                     <li className="px-4 sm:px-6 py-3 sm:py-3.5 text-gray-700 flex items-start gap-2 sm:gap-3 text-sm sm:text-base">
                  <span className="inline-flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-medium shrink-0 mt-0.5">✓</span>
                  <span className="flex-1">{prod.title}</span>
                </li>
                  ))
                }
               
                
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;