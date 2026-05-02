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

                                    <span dangerouslySetInnerHTML={{ __html: faq.question || "" }} />

                                    <span className="text-xl">
                                        {activeIndex === index ? (<LiaAngleUpSolid />) : (<LiaAngleDownSolid />)}
                                    </span>
                                </button>

                                <div
                                    className={`px-4 transition-all duration-300 ${activeIndex === index ? "max-h-40 py-3" : "max-h-0 overflow-hidden"
                                        }`}
                                >
                                    <p dangerouslySetInnerHTML={{ __html: faq.answer || "" }} className="text-gray-600 text-md" />
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
                                <p dangerouslySetInnerHTML={{ __html: res.description || ""}} className="text-gray-600 text-md mt-2" />
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

        if (!data?.products || data.products.length === 0) return null;

        const visibleData = showAll
            ? data.products
            : data.products.slice(0, 3);

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
                            if (item?.industry_id) params.set("industryid", item.industry_id);

                            if (item?.sub_industry_name) params.set("subindustryname", item.sub_industry_name);
                            if (item?.sub_industry_id) params.set("subindustryid", item.sub_industry_id);

                            if (item?.product_category_name) params.set("productcategoryname", item.product_category_name);
                            if (item?.product_category_id) params.set("productcategoryid", item.product_category_id);

                            const url = `/product?${params.toString()}`;

                            return (
                                <Link
                                    key={i}
                                    href={url}
                                    className="group block bg-white rounded-xl overflow-hidden  transition"
                                >


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
                                                dangerouslySetInnerHTML={{ __html: item.description || "" }}
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


                    {data.products.length > 3 && (
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

    return (
        <div>
             {Products()}
            {ResourcesSection()}
           
            {FAQAccordion()}
        </div>
    )
}

export default Sub_IndustrySection