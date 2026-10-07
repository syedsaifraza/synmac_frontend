import React, { useRef, useState, useEffect } from "react";

const Experience = ({ about_us_experience }: any) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const items = about_us_experience?.content?.certificate || [];
    const totalItems = items.length;
    const itemsPerView = 3;
    const totalDots = Math.ceil(totalItems / itemsPerView);

    // Scroll handler
    const scroll = (direction: "left" | "right") => {
        if (!scrollRef.current) return;
        const container = scrollRef.current;
        const scrollAmount = container.clientWidth;

        container.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    };

    // Update active dot on scroll
    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        const handleScroll = () => {
            const scrollLeft = container.scrollLeft;
            const width = container.clientWidth;
            const index = Math.round(scrollLeft / width);
            setActiveIndex(index);
        };

        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="w-full text-black py-10">
            <div>

         
                <div
                    dangerouslySetInnerHTML={{ __html: about_us_experience?.content?.title || "" }}
                    className="ql-editor text-sm sm:text-base text-gray-700 leading-relaxed mb-2"
                />

           
                <div
                    dangerouslySetInnerHTML={{ __html: about_us_experience?.content?.subtitle || "" }}
                    className="ql-editor text-sm sm:text-base text-gray-700 leading-relaxed mb-2"
                />

              
                <div
                    dangerouslySetInnerHTML={{ __html: about_us_experience?.content?.description || "" }}
                    className="ql-editor text-sm sm:text-base text-gray-700 leading-relaxed mb-5"
                />

                <div className="mb-5"> 
                    
                <h1 className="font-bold text-3xl text-gray-800">Certificates</h1>

                </div>

               
                <div className="relative">

                 
                    <button
                        onClick={() => scroll("left")}
                        disabled={activeIndex === 0}
                        className="absolute left-20 top-1/2 -translate-y-1/2 z-10 
               w-10 h-10 sm:w-12 sm:h-12 rounded-full 
               bg-white shadow-md border border-gray-200 
               flex items-center justify-center 
               hover:bg-[#cd2626] hover:text-white hover:border-[#cd2626]
               transition-all duration-300
               disabled:opacity-40 disabled:cursor-not-allowed
               -ml-2 sm:-ml-4"
                        aria-label="Scroll left"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* RIGHT BUTTON */}
                    <button
                        onClick={() => scroll("right")}
                        disabled={activeIndex >= totalDots - 1}
                        className="absolute right-20 top-1/2 -translate-y-1/2 z-10 
               w-10 h-10 sm:w-12 sm:h-12 rounded-full 
               bg-white shadow-md border border-gray-200 
               flex items-center justify-center 
               hover:bg-[#cd2626] hover:text-white hover:border-[#cd2626]
               transition-all duration-300
               disabled:opacity-40 disabled:cursor-not-allowed
               -mr-2 sm:-mr-4"
                        aria-label="Scroll right"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                 
                    <div
                        ref={scrollRef}
                        className="flex flex-row gap-4 sm:gap-6 max-w-4xl mx-auto overflow-x-auto scroll-smooth pb-2
               snap-x snap-mandatory
               [&::-webkit-scrollbar]:hidden
               [-ms-overflow-style:none]
               [scrollbar-width:none]"
                    >
                        {items.map((item: any, index: number) => (
                            <div
                                key={index}
                                className="snap-start flex-shrink-0 
                   w-full 
                   sm:w-[calc(50%-12px)] 
                   lg:w-[calc(33.333%-16px)]
                   bg-white border border-gray-200 rounded-full overflow-hidden
                   p-2 sm:p-2 
                   shadow-sm hover:shadow-lg 
                   transition-all duration-300"
                            >
                                <div className="w-full overflow-hidden rounded-full aspect-square">
                                    <img
                                        src={item?.image_url || "https://via.placeholder.com/400x300"}
                                        alt={`certificate-${index}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


                {totalDots > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-6">
                        {Array.from({ length: totalDots }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => {
                                    if (!scrollRef.current) return;
                                    scrollRef.current.scrollTo({
                                        left: i * scrollRef.current.clientWidth,
                                        behavior: "smooth",
                                    });
                                }}
                                className={`h-2 rounded-full transition-all duration-300 ${activeIndex === i
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

export default Experience;