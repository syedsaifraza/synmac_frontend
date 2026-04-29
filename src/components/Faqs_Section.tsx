'use client'

import React from 'react'
import { LiaAngleDownSolid, LiaAngleUpSolid } from 'react-icons/lia';


interface Faq {
    question: string;
    answer: string;
}


type Props = {
    faqs: Faq[];
};

const Faqs_Section = ({ faqs }: Props) => {
    const [activeIndex, setActiveIndex] = React.useState(null);

    const toggle = (index: any) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    if (faqs?.length === 0) return null;

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0 py-8 sm:py-12 lg:py-16">
            <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 lg:mb-10 text-center">
                    Answers to Your Most Important Questions
                </h2>

                <div className="space-y-2">
                    {faqs.map((faq: any, index: any) => (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow"
                        >
                            <button
                                onClick={() => toggle(index)}
                                className="w-full flex justify-between items-center p-4 sm:p-5 text-left font-semibold text-base sm:text-lg bg-white hover:bg-gray-50 transition-colors"
                            >
                                <span dangerouslySetInnerHTML={{ __html: faq.question }} className="pr-4" />
                                <span className="text-xl shrink-0">
                                    {activeIndex === index ? (<LiaAngleUpSolid />) : (<LiaAngleDownSolid />)}
                                </span>
                            </button>

                            <div
                                className={`px-4 sm:px-5 transition-all duration-300 ${activeIndex === index ? "max-h-96 pb-4 sm:pb-5" : "max-h-0 overflow-hidden"
                                    }`}
                            >
                                <span dangerouslySetInnerHTML={{ __html: faq.answer }} className="text-gray-600 text-sm sm:text-base leading-relaxed" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Faqs_Section