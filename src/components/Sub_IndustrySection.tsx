'use client'
import Link from 'next/link';
import React, { useState } from 'react'
import { IoIosArrowRoundForward } from 'react-icons/io';
import { LiaAngleDownSolid, LiaAngleUpSolid } from 'react-icons/lia';

const Sub_IndustrySection = ({ faqs, info, Resources, data }: any) => {


    function FAQAccordion() {
        const [activeIndex, setActiveIndex] = useState(null);

        const toggle = (index: any) => {
            setActiveIndex(activeIndex === index ? null : index);
        };


        if (!faqs || faqs?.length === 0) return null;

        return (
            <div className="max-w-6xl mx-auto py-10 ">
                <div>
                    <h2 className="text-3xl font-bold mb-6 text-center">Answers to Your Most Important Questions</h2>

                    <div className="">
                        {faqs.map((faq: any, index: any) => (
                            <div
                                key={index}
                                className="border-b border-gray-600 overflow-hidden"
                            >
                                <button

                                    onClick={() => toggle(index)}
                                    className="w-full flex justify-between items-center p-4 text-left font-semibold text-lg bg-white hover:bg-gray-50"
                                >

                                    <span dangerouslySetInnerHTML={{ __html: faq.question }} />

                                    <span className="text-xl">
                                        {activeIndex === index ? (<LiaAngleUpSolid />) : (<LiaAngleDownSolid />)}
                                    </span>
                                </button>

                                <div
                                    className={`px-4 transition-all duration-300 ${activeIndex === index ? "max-h-40 py-3" : "max-h-0 overflow-hidden"
                                        }`}
                                >
                                    <p dangerouslySetInnerHTML={{ __html: faq.answer }} className="text-gray-600 text-md" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }




    function ResourcesSection() {


        if (!Resources || Resources?.length === 0) return null;

        return (
            <div className="bg-gray-100 py-16">
                <div className="flex flex-row gap-10 max-w-6xl mx-auto">
                    <div className="flex items-center justify-center w-2/5">
                        <h2 className="text-3xl font-semibold leading-snug">Resources to stay ahead</h2>
                    </div>

                    <div className="space-y-8 border-l pl-6 grid grid-cols-2 w-full gap-4">
                        {Resources.map((res: any, i: any) => (
                            <div key={i} className="p-2">
                                <h3 className="font-semibold text-xl">{res.title}</h3>
                                <p dangerouslySetInnerHTML={{ __html: res.description }} className="text-gray-600 text-md mt-2" />
                                <a href={res.file} target="_blank" className="text-blue-600 text-sm mt-2 inline-block">
                                    Check Documents →
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    function Products() {
        const [showAll, setShowAll] = useState(false);

        if (!data?.products
            || data?.products
                ?.length === 0) return null;

        const visibleData = showAll ? data?.products
            : data?.products
                .slice(0, 3);

        return (
            <div className=" text-gray-900 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-6 sm:mb-8 lg:mb-10">
                        Products
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {visibleData.map((item: any, i: any) => (
                            <div key={i} className="overflow-hidden group">
                                <img src={item.image} alt={item.name} className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition duration-500" />
                                <div className="py-4 sm:py-6 flex justify-between items-start gap-4">
                                    <div className="flex-1">
                                        <Link href={`/product?
productname=${encodeURIComponent(item?.name)}
&productid=${item?.id}

&industryname=${encodeURIComponent(item?.industry_name)}
&industryid=${item?.industry_id}


${item?.sub_industry_name && `&subindustryname=${encodeURIComponent(item?.sub_industry_name)}`
                                            }

${item?.sub_industry_id && `&subindustryid=${encodeURIComponent(item?.sub_industry_id)}`
                                            }

${item?.product_category_name && `&productcategoryname=${encodeURIComponent(item?.product_category_name)}`
                                            }

${item?.product_category_id && `&productcategoryid=${encodeURIComponent(item?.product_category_id)}`
                                            }
`} className="text-lg sm:text-xl font-semibold hover:text-gray-700 transition">
                                            {item.name}
                                        </Link>
                                        <p
                                            dangerouslySetInnerHTML={{ __html: item.description }} className="text-white text-sm sm:text-base mt-2 line-clamp-3 overflow-hidden" />
                                    </div>
                                    <div className="bg-[#cd2626] w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-xl sm:text-2xl flex-shrink-0 group-hover:translate-x-1 transition">
                                        <IoIosArrowRoundForward />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {
                        data?.products
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

    return (
        <div>
            {ResourcesSection()}
            {Products()}
            {FAQAccordion()}
        </div>
    )
}

export default Sub_IndustrySection