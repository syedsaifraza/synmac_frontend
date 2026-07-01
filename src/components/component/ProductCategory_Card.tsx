'use client'
import Link from 'next/link';
import React, { useState } from 'react'
import { IoIosArrowRoundForward } from 'react-icons/io';

const Product_Category_Section = ({ data,title }: any) => {

  const [showAll, setShowAll] = useState(false);

  if (!data || data.length === 0) return null;

  const visibleData = showAll ? data : data.slice(0, 4);

  return (
    <div className="bg-[#2f3333]  text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">

    
        <h2 className="text-3xl font-semibold mb-10 tracking-tight">
         {title}
        </h2>

 
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleData.map((item: any, i: number) => {

            const url = `/industry/${item.industry_slug}/${item?.sub_industry_slug || " "}/${item.slug}`;

            return (
              <Link
                key={i}
                href={url}
                className="group block rounded-xl p-3 border-gray-400 border shadow-white overflow-hidden  transition"
              >

              
              <div className="h-40 overflow-hidden">
                  <img
                    src={item.feature_file_link || null}
                    alt={item.name}
                    className="w-full h-full rounded-md object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>

                     <div className="flex-1 py-3 px-2 flex flex-row gap-4 justify-between">
                  <h3 title={item?.name} className="text-md text-white font-semibold line-clamp-2  group-hover:text-[#ff0100] transition " >
                    {item?.name}
                  </h3>
         
     <div className=" flex items-center relative right-2 justify-center rounded-full bg-[#ff0100] shrink-0 mt-0.5 group-hover:translate-x-1 transition">
                      <IoIosArrowRoundForward className="text-3xl font-bold text-white" />
                    </div>

               
    

                </div>
 <div
                      dangerouslySetInnerHTML={{
                        __html: item.hero_background_description || ""
                      }}
                      className="text-gray-400 text-sm line-clamp-3 fonts "
                    />
                
                {/* <div className="py-5 flex items-start gap-4">

               
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-[#ff0100] transition">
                      {item.name}
                    </h3>

                   
                  </div>

                 
                  <div className=" flex items-center relative right-2 justify-center rounded-full bg-[#ff0100] shrink-0 mt-0.5 group-hover:translate-x-1 transition">
                    <IoIosArrowRoundForward className="text-4xl font-bold text-white" />
                  </div>

                </div> */}

              </Link>
            );
          })}
        </div>

      
        {data.length > 3 && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
                className=" bg-[#ff0100] px-6 py-2 rounded-full text-sm hover:bg-white hover:border hover:border-gray-300 cursor-pointer  hover:text-black transition"
            >
              {showAll ? "Show Less" : "Show All"}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default Product_Category_Section