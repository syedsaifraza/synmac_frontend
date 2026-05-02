'use client'
import Link from 'next/link';
import React, { useState } from 'react'
import { IoIosArrowRoundForward } from 'react-icons/io';

const Related_Product_Category_Section = ({ data }: any) => {

  const [showAll, setShowAll] = useState(false);

  if (!data || data.length === 0) return null;

  const visibleData = showAll ? data : data.slice(0, 3);

  return (
    <div className="bg-[#2f3333] text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">

       
        <h2 className="text-3xl font-semibold mb-10 tracking-tight">
          Related Product Categories
        </h2>

        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleData.map((item: any, i: number) => {

            const url = `/industry/${item.industry_slug}/${item?.sub_industry_slug || " "}/${item.slug}`;

            return (
              <Link
                key={i}
                href={url}
                className="group block rounded-xl overflow-hidden transition"
              >

                
                <div className="h-52 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-5 flex items-start gap-4">

                  {/* Text */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-gray-300 transition">
                      {item.name}
                    </h3>

                    <p
                      dangerouslySetInnerHTML={{
                        __html: item.hero_background_description || ""
                      }}
                      className="text-gray-400 text-sm line-clamp-3"
                    />
                  </div>

                  {/* Arrow */}
                  <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#cd2626] shrink-0 mt-[2px] group-hover:translate-x-1 transition">
                    <IoIosArrowRoundForward className="text-xl text-white" />
                  </div>

                </div>

              </Link>
            );
          })}
        </div>

        {/* Button */}
        {data.length > 3 && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="border border-gray-400 px-6 py-2 rounded-full text-sm hover:bg-white hover:text-black transition"
            >
              {showAll ? "Show Less" : "Show All"}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default Related_Product_Category_Section;