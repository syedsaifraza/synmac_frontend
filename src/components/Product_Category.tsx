



'use client'
import React, { useState } from 'react'
import { LiaAngleDownSolid, LiaAngleUpSolid } from 'react-icons/lia';

const Product_Category = ({ faqs, info, Resources }: any) => {

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
                                    <span dangerouslySetInnerHTML={{ __html: faq.question }}/>
                                  
                                    <span className="text-xl">
                                        {activeIndex === index ? (<LiaAngleUpSolid />) : (<LiaAngleDownSolid />)}
                                    </span>
                                </button>

                                <div
                                    className={`px-4 transition-all duration-300 ${activeIndex === index ? "max-h-40 py-3" : "max-h-0 overflow-hidden"
                                        }`}
                                >
                                    <p dangerouslySetInnerHTML={{ __html: faq.answer }} className="text-gray-600 text-md"/>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }


    function CareerSection() {
      
        if (!info?.name || !info?.image) return null;

        return (
            <div className="bg-black text-white py-16 ">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-semibold mb-6">{info.name}</h2>
                        <p className="text-gray-300 leading-relaxed mb-8">{info.description}</p>
                        <button className="flex items-center gap-3 group">
                            <span className="text-lg">Connect us</span>
                            <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center group-hover:translate-x-1 transition">
                                →
                            </div>
                        </button>
                    </div>
                    <div>
                        <img src={info.image} alt="career" className="w-full h-87 object-contain" />
                    </div>
                </div>
            </div>
        );
    }

    function ResourcesSection() {

     
        if (!Resources || Resources?.length === 0) return null;

        return (
            <div className="bg-gray-100 py-16">
                <div className=" flex flex-row gap-10 max-w-6xl mx-auto">
                    <div className="flex items-center justify-center w-2/5">
                        <h2 className="text-3xl font-semibold leading-snug">Resources to stay ahead</h2>
                    </div>

                    <div className="space-y-8 border-l pl-6 grid grid-cols-2 w-full gap-4">
                        {Resources.map((res: any, i: any) => (
                            <div key={i} className="p-2">
                                <h3 className="font-semibold text-xl">{res.title}</h3>
                                <p dangerouslySetInnerHTML={{ __html: res.description }} className="text-gray-600 text-md mt-2"/>
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
    return (
        <div>
            {ResourcesSection()}
            {CareerSection()}
            {FAQAccordion()}
        </div>
    )
}

export default Product_Category