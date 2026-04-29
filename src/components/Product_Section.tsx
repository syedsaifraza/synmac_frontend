'use client'

import React from 'react'
import { IoIosArrowRoundForward } from 'react-icons/io';
import Link from "next/link"

const Product_Section = ({ product_list }: any) => {


    const params = new URLSearchParams();


    const [showAll, setShowAll] = React.useState(false);

    if (product_list
        ?.length === 0) return null;

    const visibleData = showAll ? product_list
        : product_list
            .slice(0, 3);

    return (
        <div className=" text-gray-900 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-6 sm:mb-8 lg:mb-10">
                    Products
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {visibleData.map((item: any, i: any) => {


                        if (item?.name) {
                            params.append("productname", item.name);
                        }

                        if (item?.id) {
                            params.append("productid", item.id);
                        }

                        if (item?.industry_name) {
                            params.append("industryname", item.industry_name);
                        }

                        if (item?.sub_industry_name) {
                            params.append("subindustryname", item.sub_industry_name);
                        }

                        if (item?.product_category_name) {
                            params.append("productcategoryname", item.product_category_name);
                        }

                        const url = `/product?${params.toString()}`;

                        return (<div key={i} className="overflow-hidden group">
                            <img src={item.image} alt={item.name} className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition duration-500" />
                            <div className="py-4 sm:py-6 flex justify-between items-start gap-4">
                                <div className="flex-1">
                                    <Link

                                        href={url}
                                        className="text-lg sm:text-xl font-semibold hover:text-gray-700 transition">
                                        {item.name}
                                    </Link>
                                    <p
                                        dangerouslySetInnerHTML={{ __html: item.description }} className="text-gray-500 text-sm sm:text-base mt-2 line-clamp-3 overflow-hidden" />
                                </div>
                                <div className="bg-[#cd2626] w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-xl sm:text-2xl  shrink-0 group-hover:translate-x-1 transition">
                                    <IoIosArrowRoundForward />
                                </div>
                            </div>
                        </div>)

                    })}
                </div>

                {
                    product_list
                        .length > 3 && (
                        <div className="flex mt-8 sm:mt-10">
                            <button
                                onClick={() => setShowAll(!showAll)}
                                className="border border-white px-5 sm:px-6 py-2 rounded-full hover:bg-white hover:text-black transition text-sm sm:text-base"
                            >
                                {showAll ? "Show Less" : "Show All"}
                            </button>
                        </div>
                    )
                }




            </div>
        </div>
    );
}


export default Product_Section