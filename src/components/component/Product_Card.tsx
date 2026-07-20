'use client'

import React, { useState } from 'react'
import { IoIosArrowRoundForward } from 'react-icons/io'
import Link from "next/link"
import { FiArrowRight } from 'react-icons/fi'

const Product_Section = ({ product_list, title = "Products" }: any) => {



  const createFilterUrl = (params:any) => {
    const searchParams = new URLSearchParams();

    // Check each parameter and add only if it has a value
    if (params.industry_id) {
      searchParams.append('industry', params.industry_id);
    }
    if (params.sub_industry_id) {
      searchParams.append('subindustry', params.sub_industry_id);
    }
    if (params.product_category_id) {
      searchParams.append('productcategory', params.product_category_id);
    }
    if (params.name) {
      searchParams.append('productname', params.name);
    }

    const queryString = searchParams.toString();
    return `/product/${queryString ? `?${queryString}` : ''}`;
  };



  const [showAll, setShowAll] = useState(false);

  if (!product_list || product_list.length === 0) return null;

  const visibleData = showAll
    ? product_list
    : product_list.slice(0, 3);

  return (
    <div className="bg-[#f7f7f7] text-gray-900 py-16 px-4">
      <div className="max-w-6xl mx-auto">


        <h2 className="text-3xl font-semibold mb-10 tracking-tight">
          {title}
        </h2>


        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleData.map((item: any, i: number) => {




            const url = createFilterUrl({
              industry_id: item?.industry_id,
              sub_industry_id: item?.sub_industry_id,
              product_category_id: item?.product_category_id,
              name: item?.name
            });

            return (
              <Link
                key={i}
                href={url}
                className="group block  rounded-sm overflow-hidden min-h-80  p-8  relative bg-white hover:bg-blue-500"
              >

                {/* {
              item.image ? (
                <div className="h-52 overflow-hidden">
                  <img
                    src={item.image || null}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
              ) : (
                 <></>
              )
             } */}



                <div className="py-5 flex items-start gap-4">


                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-white ">
                      {item.name}
                    </h3>

                    {
                      item.image ? (
                        <div

                          dangerouslySetInnerHTML={{
                            __html: item.hero_background_description || ""
                          }}
                          className="group-hover:text-white text-sm  fonts"
                        />
                      ) : (<div

                        dangerouslySetInnerHTML={{
                          __html: item.hero_background_description || ""
                        }}
                        className="group-hover:text-white  text-sm  fonts "
                      />)
                    }


                  </div>



                </div>
                <div className='flex justify-end absolute bottom-5 right-10'>

                  <FiArrowRight size={50} className="text-xl text-black group-hover:text-white group-hover:font-light group-hover:translate-x-4 transition " />

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