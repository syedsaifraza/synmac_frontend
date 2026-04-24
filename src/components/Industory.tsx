'use client'

import Link from "next/link";
import DOMPurify from "dompurify";
import { useRef, useState } from "react";
import { FaAngleDown, FaAngleUp, FaLongArrowAltLeft, FaLongArrowAltRight, FaPlay } from "react-icons/fa";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { LiaAngleDownSolid, LiaAngleRightSolid, LiaAngleUpSolid } from "react-icons/lia";
import RecentSolutionsCard from "./RecentSolutionsCard";

const Industory = ({ industoryData }: any) => {

  const [play, setPlay] = useState(null);

  function FAQAccordion() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggle = (index: any) => {
      setActiveIndex(activeIndex === index ? null : index);
    };

    if (!industoryData?.faqs || industoryData?.faqs?.length === 0) return null;

    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 lg:mb-10 text-center">
            Answers to Your Most Important Questions
          </h2>

          <div className="space-y-2">
            {industoryData.faqs.map((faq: any, index: any) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex justify-between items-center p-4 sm:p-5 text-left font-semibold text-base sm:text-lg bg-white hover:bg-gray-50 transition-colors"
                >
                  <span className="pr-4">{faq.question}</span>
                  <span className="text-xl flex-shrink-0">
                    {activeIndex === index ? (<LiaAngleUpSolid />) : (<LiaAngleDownSolid />)}
                  </span>
                </button>

                <div
                  className={`px-4 sm:px-5 transition-all duration-300 ${activeIndex === index ? "max-h-96 pb-4 sm:pb-5" : "max-h-0 overflow-hidden"
                    }`}
                >
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function CustomerStories() {
    const scrollRef = useRef<any>(null);

    const scroll = (direction: any) => {
      if (direction === "left") {
        scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
      }
    };

    if (!industoryData?.features || industoryData?.features?.length === 0) return null;

    return (
      <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">Features</h2>
            <div className="flex gap-2">
              <button onClick={() => scroll("left")} className="p-2 text-3xl sm:text-4xl hover:bg-gray-100 rounded-full transition-colors">
                <IoIosArrowRoundBack />
              </button>
              <button onClick={() => scroll("right")} className="p-2 text-3xl sm:text-4xl hover:bg-gray-100 rounded-full transition-colors">
                <IoIosArrowRoundForward />
              </button>
            </div>
          </div>

          <div ref={scrollRef} className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth no-scrollbar pb-4">
            {industoryData.features.map((item: any, i: any) => (
              <div key={i} className="min-w-[250px] sm:min-w-[280px] md:min-w-[300px] lg:min-w-[320px] h-80 sm:h-96 relative rounded-lg overflow-hidden flex-shrink-0">
                <img src={item.icon} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4 hover:scale-105 transition duration-500">
                  <p className="text-white text-sm sm:text-base font-medium">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function ResourcesSection() {
    if (!industoryData?.resources || industoryData?.resources?.length === 0) return null;

    return (
      <div className="bg-gray-50 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <div className="lg:w-2/5">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-snug">Resources to stay ahead</h2>
            </div>

            <div className="lg:w-3/5 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {industoryData.resources.map((res: any, i: any) => (
                <div key={i} className="p-4 sm:p-5 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg sm:text-xl text-gray-900 mb-2">{res.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base mt-2 leading-relaxed">{res.description}</p>
                  <a href={res.file} target="_blank" className="text-[#cd2626] text-sm sm:text-base mt-3 inline-block font-medium hover:underline">
                    Check Documents →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  function SolutionsSection() {
    const [showAll, setShowAll] = useState(false);

    if (!industoryData?.sub_industry || industoryData?.sub_industry?.length === 0) return null;

    const visibleData = showAll ? industoryData?.sub_industry : industoryData?.sub_industry.slice(0, 3);

    return (
      <div className="bg-[#333737] text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-6 sm:mb-8 lg:mb-10">
            {industoryData?.tag_line}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {visibleData.map((item: any, i: any) => (
              <div key={i} className="bg-[#333737] overflow-hidden group">
                <img src={item.image} alt={item.name} className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition duration-500" />
                <div className="py-4 sm:py-6 flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <Link href={`/industry/${industoryData.slug}/${industoryData.id}/${item.slug}/${item.id}`} className="text-lg sm:text-xl font-semibold hover:text-gray-300 transition">
                      {item.name}
                    </Link>
                    <p className="text-gray-300 text-sm sm:text-base mt-2 line-clamp-3 overflow-hidden">
                      {item.description}
                    </p>
                  </div>
                  <div className="bg-[#cd2626] w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-xl sm:text-2xl flex-shrink-0 group-hover:translate-x-1 transition">
                    <IoIosArrowRoundForward />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex mt-8 sm:mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="border border-white px-5 sm:px-6 py-2 rounded-full hover:bg-white hover:text-black transition text-sm sm:text-base"
            >
              {showAll ? "Show Less" : "Show All"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  function SolutionsSection1() {
    if (!industoryData?.feature_title || !industoryData?.feature_file_link) return null;

    return (
      <div className="text-black py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-3 sm:mb-4">{industoryData.feature_title}</h2>

          <div
            className="text-gray-600 text-base sm:text-lg mb-6 sm:mb-8"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(industoryData.feature_description),
            }}
          />


          <div className="rounded-xl bg-white border border-gray-200 overflow-hidden">
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 p-4 sm:p-6">
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{industoryData.feature_sub_title}</h3>
                <div
                  className="text-gray-600 mt-2 text-sm sm:text-base leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(industoryData.feature_sub_description),
                  }}
                />

              </div>
              <div className="md:w-1/2">
                <img src={industoryData.feature_file_link} alt="feature" className="w-full h-56 sm:h-64 object-cover rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function CareerSection() {
    if (!industoryData?.name || !industoryData?.image) return null;

    return (
      <div className="bg-black text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 sm:mb-6">{industoryData.name}</h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">{industoryData.description}</p>
            <button className="flex items-center gap-3 group">
              <span className="text-base sm:text-lg">Connect us</span>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white text-black flex items-center justify-center group-hover:translate-x-1 transition">
                →
              </div>
            </button>
          </div>
          <div className="order-first md:order-last">
            <img src={industoryData.image} alt="career" className="w-full h-auto object-contain rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  function HeroSection() {
    if (!industoryData?.hero_background_file_url) return null;

    return (
      <>
        <div
          className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] bg-cover bg-center flex items-center"
          style={{ backgroundImage: `url(${industoryData.hero_background_file_url})` }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-semibold tracking-wide mb-3 sm:mb-4">
                {industoryData.name}
              </h1>

              <div
                className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(industoryData.hero_background_description),
                }}
              />




            </div>
          </div>
        </div>
        <div className="border-b border-gray-200 py-3 sm:py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row gap-1 items-center max-w-6xl mx-auto font-medium text-sm sm:text-base">
            <Link href="/" className="hover:text-[#cd2626] transition">Home</Link>
            <LiaAngleRightSolid size={12} />
            <h1 className="text-gray-600">{industoryData.hero_background_title}</h1>
          </div>
        </div>
      </>
    );
  }

  function VideoSection() {
    if (!industoryData?.videos || industoryData?.videos.length === 0) return null;

    return (
      <div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
            {industoryData.videos.map((video: any, i: any) => (
              <div key={i} className="text-left">
                <div
                  className="relative cursor-pointer rounded-lg overflow-hidden group"
                  onClick={() => setPlay(video.file_link)}
                >
                  {play !== video.file_link ? (
                    <>
                      <img src={video.thumbnail_file_link} alt="thumbnail" className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition duration-500" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition">
                        <div className="bg-[#cd2626]/90 text-white w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full shadow-lg text-lg sm:text-xl group-hover:scale-110 transition">
                          <FaPlay className="ml-0.5" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <video controls autoPlay className="w-full h-56 sm:h-64 object-cover rounded-lg">
                      <source src={video.file_link} type="video/mp4" />
                    </video>
                  )}
                </div>
                <h3 className="mt-3 sm:mt-4 text-lg sm:text-xl font-semibold text-gray-900">{video.title}</h3>
                <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base leading-relaxed">{video.description}</p>
                <button onClick={() => setPlay(video.file_link)} className="text-[#cd2626] mt-2 sm:mt-3 inline-block text-sm font-medium hover:underline">
                  Watch Video
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }


  

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <SolutionsSection1 />
      <SolutionsSection />
      <VideoSection />
      <ResourcesSection />
      <CustomerStories />
      <CareerSection />
      <RecentSolutionsCard industoryData={industoryData}/>
      <FAQAccordion />
    </div>
  );
}

export default Industory;