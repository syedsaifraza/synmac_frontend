'use client'
import Link from 'next/link';
import React, { useState } from 'react'
import { IoIosArrowRoundForward } from 'react-icons/io';

const Product_Category_Section = ({ data, title }: any) => {
  const [showAll, setShowAll] = useState(false);

  if (!data || data.length === 0) return null;

  const visibleData = showAll ? data : data.slice(0, 4);

  return (
    <div className="bg-[#0a0a0a] text-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
   
        <h2 className="text-4xl font-light mb-12 tracking-wide">
          {title}
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {visibleData.map((item: any, i: number) => {
            const url = `/industry/${item.industry_slug}/${item?.sub_industry_slug || " "}/${item.slug}`;

            return (
              <Link
                key={i}
                href={url}
                className="group block bg-[#141414] rounded-xl border border-[#2a2a2a]  transition-all duration-300 hover:shadow-xl  overflow-hidden"
              >
                <div className="relative w-full h-48 overflow-hidden bg-[#1a1a1a]">
                  <img
                    src={item.feature_file_link || null}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                 
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 
                      title={item?.name} 
                      className="text-md font-medium line-clamp-2 group-hover:text-[#ff0100] transition-colors flex-1"
                    >
                      {item?.name}
                    </h3>
                    
                    <div className="flex items-center justify-center rounded-full bg-[#ff0100] shrink-0 mt-0.5 transition-all duration-300 w-8 h-8 group-hover:translate-x-1">
                      <IoIosArrowRoundForward className="text-3xl font-bold text-white transition-colors" />
                    </div>
                  </div>

                  <div
                    dangerouslySetInnerHTML={{
                      __html: item.hero_background_description || ""
                    }}
                    className="text-gray-500 text-sm line-clamp-3 mt-2"
                  />
                </div>
              </Link>
            );
          })}
        </div>

        {data.length > 3 && (
          <div className="flex justify-center mt-14">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 rounded-full text-sm font-medium border border-[#2a2a2a] hover:border-[#ff0100] hover:bg-[#ff0100] transition-all duration-300 cursor-pointer"
            >
              {showAll ? "Show Less" : "Show All"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Product_Category_Section;