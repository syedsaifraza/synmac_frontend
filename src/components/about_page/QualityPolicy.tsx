import React, { useRef, useState } from "react";

const QualityPolicy = ({ qualityPolicy }: any) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const items = qualityPolicy?.content?.section_item || [];

  // Check scroll position for button enable/disable
  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

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

  return (
    <div className="w-full text-black py-10">
      <div>

        {/* Title */}
        <div
          dangerouslySetInnerHTML={{ __html: qualityPolicy?.content?.title || "" }}
          className="ql-editor mb-2"
        />

        {/* Subtitle */}
        <div
          dangerouslySetInnerHTML={{ __html: qualityPolicy?.content?.subtitle || "" }}
          className="ql-editor  mb-6"
        />

        {/* ===== SCROLLER SECTION ===== */}
        <div className="relative py-10">

          {/* LEFT BUTTON */}
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10
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
            disabled={!canScrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10
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

          {/* SCROLLABLE TRACK */}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex flex-row gap-4 sm:gap-6 overflow-x-auto scroll-smooth pb-2
                       snap-x snap-mandatory
                       [&::-webkit-scrollbar]:hidden
                       [-ms-overflow-style:none]
                       [scrollbar-width:none]"
          >
            {items.map((item: any, index: number) => (
              <div
                key={index}
                className="snap-start flex-shrink-0
                           w-[260px] sm:w-[280px] border border-gray-100 lg:w-[300px]
                           bg-white rounded-xl
                           overflow-hidden shadow-sm hover:shadow-lg
                           transition-all duration-300"
              >
                {/* Image */}
                <div className="w-full h-[200px] sm:h-[220px] overflow-hidden p-2">
                  <img
                    src={item?.image_url || "https://via.placeholder.com/400x300"}
                    alt={item?.title || "image"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-md shadow-sm"
                  />
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 flex flex-col gap-2">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 leading-snug line-clamp-1">
                    {item?.title}
                  </h2>

                  {item?.subtitle && (
                    <p className="text-sm text-[#cd2626] font-medium line-clamp-1">
                      {item?.subtitle}
                    </p>
                  )}

                  <div
                    dangerouslySetInnerHTML={{ __html: item?.description || "" }}
                    className="ql-editor line-clamp-3  mb-6"
                  />


                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default QualityPolicy;