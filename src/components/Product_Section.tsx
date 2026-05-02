'use client'

import React, { useState } from 'react'
import { IoIosArrowRoundForward } from 'react-icons/io'
import Link from "next/link"

const Product_Section = ({ product_list }: any) => {

  const [showAll, setShowAll] = useState(false);

  if (!product_list || product_list.length === 0) return null;

  const visibleData = showAll
    ? product_list
    : product_list.slice(0, 3);

  return (
    <div className="bg-[#f7f7f7] text-gray-900 py-16 px-4">
      <div className="max-w-6xl mx-auto">

        
        <h2 className="text-3xl font-semibold mb-10 tracking-tight">
          Products
        </h2>

      
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleData.map((item: any, i: number) => {

            
            const params = new URLSearchParams();

            if (item?.name) params.set("productname", item.name);
            if (item?.id) params.set("productid", item.id);
            if (item?.industry_name) params.set("industryname", item.industry_name);
            if (item?.sub_industry_name) params.set("subindustryname", item.sub_industry_name);
            if (item?.product_category_name) params.set("productcategoryname", item.product_category_name);

            const url = `/product?${params.toString()}`;

            return (
              <Link
                key={i}
                href={url}
                className="group block bg-white rounded-xl overflow-hidden"
              >

                {/* Image */}
                <div className="h-52 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>

              
                <div className="p-5 flex items-start gap-4">

                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-gray-700 transition">
                      {item.name}
                    </h3>

                    <p
                      dangerouslySetInnerHTML={{
                        __html: item.hero_background_description || ""
                      }}
                      className="text-gray-500 text-sm line-clamp-3"
                    />
                  </div>

                 
                  <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#cd2626] shrink-0 mt-[2px] group-hover:translate-x-1 transition">
                    <IoIosArrowRoundForward className="text-xl text-white" />
                  </div>

                </div>
              </Link>
            );
          })}
        </div>

     
        {product_list.length > 3 && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="border border-gray-400 px-6 py-2 rounded-full text-sm hover:bg-black hover:text-white transition"
            >
              {showAll ? "Show Less" : "Show All"}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default Product_Section