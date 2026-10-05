import React, { useRef, useState, useEffect } from "react";
import { GoDotFill } from "react-icons/go";
import { MdPlayArrow } from "react-icons/md";

const CompanyTimeline = ({ companyTimeline }: any) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const items = companyTimeline?.content?.section_item || [];
    const itemsPerView = 5;
    const totalDots = Math.ceil(items.length / itemsPerView);

    // Update active dot on scroll
    const handleScroll = () => {
        if (!scrollRef.current) return;
        const container = scrollRef.current;
        const scrollLeft = container.scrollLeft;
        const width = container.clientWidth;
        const index = Math.round(scrollLeft / width);
        setActiveIndex(index);
    };

    
    const scrollToIndex = (index: number) => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollTo({
            left: index * scrollRef.current.clientWidth,
            behavior: "smooth",
        });
    };

    return (
        <div className="w-full text-black py-10">
            <div className="">

                {/* Title */}
                <div
                    dangerouslySetInnerHTML={{ __html: companyTimeline?.content?.title || "" }}
                    className="ql-editor text-sm sm:text-base text-gray-700 leading-relaxed mb-2"
                />

                {/* Subtitle */}
                <div
                    dangerouslySetInnerHTML={{ __html: companyTimeline?.content?.subtitle || "" }}
                    className="ql-editor text-sm sm:text-base text-gray-700 leading-relaxed mb-3"
                />

             
                <div className="relative py-4">

                  
                    <div className="absolute top-21 left-0 right-0 -translate-y-1/2 z-0 pointer-events-none">
                        <div className="relative flex items-center">
                            <GoDotFill className="text-[#cd2626] relative left-1" />
                            <div className="flex-1 h-[2px] bg-[#cd2626]" />
                            <MdPlayArrow className="text-[#cd2626]  relative right-1.5" />
                        </div>
                    </div>

                    {/* SCROLLABLE TRACK */}
                    <div
                        ref={scrollRef}
                        onScroll={handleScroll}
                        className="relative z-10 flex flex-row gap-4 sm:gap-6 overflow-x-auto scroll-smooth pb-2
                                   snap-x snap-mandatory
                                   [&::-webkit-scrollbar]:hidden
                                   [-ms-overflow-style:none]
                                   [scrollbar-width:none]"
                    >
                        {items.map((item: any, index: number) => (
                            <div
                                key={index}
                                className="snap-start flex-shrink-0
                                           w-[200px]
                                           sm:w-[calc(50%-12px)]
                                           lg:w-[calc(20%-20px)]
                                           flex flex-col items-center justify-center
                                           transition-all duration-300"
                            >
                                {/* Number on top */}
                                <p className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                                    {item?.number}
                                </p>

                                {/* Icon Circle */}
                                <div className="relative flex items-center justify-center">
                                    <div className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white border-2 border-[#cd2626] flex items-center justify-center overflow-hidden">
                                        <img
                                            src={item?.icon_url || "https://via.placeholder.com/100"}
                                            alt={item?.title || "icon"}
                                            className="w-full h-full object-cover rounded-full"
                                        />
                                    </div>
                                </div>

                                {/* Title below */}
                                <h2 className="mt-3 text-sm sm:text-base font-semibold text-gray-900 text-center leading-snug">
                                    {item?.title}
                                </h2>
                            </div>
                        ))}
                    </div>
                </div>

       
                {totalDots > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-2">
                        {Array.from({ length: totalDots }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => scrollToIndex(i)}
                                className={`h-2 rounded-full transition-all duration-300 ${
                                    activeIndex === i
                                        ? "w-8 bg-[#cd2626]"
                                        : "w-2 bg-gray-300 hover:bg-gray-400"
                                }`}
                                aria-label={`Go to slide ${i + 1}`}
                            />
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};

export default CompanyTimeline;