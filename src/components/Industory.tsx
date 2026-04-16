'use client'

import Link from "next/link";
import { useRef, useState } from "react";
import { FaAngleDown, FaAngleUp, FaLongArrowAltLeft, FaLongArrowAltRight, FaPlay } from "react-icons/fa";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { LiaAngleDownSolid, LiaAngleRightSolid, LiaAngleUpSolid } from "react-icons/lia";

const Industory = ({ industoryData }: any) => {

  const [play, setPlay] = useState(null);

  function FAQAccordion() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggle = (index: any) => {
      setActiveIndex(activeIndex === index ? null : index);
    };


    if (!industoryData?.faqs || industoryData?.faqs?.length === 0) return null;

    return (
      <div className="max-w-6xl mx-auto py-10 px-4">
        <div>
          <h2 className="text-3xl font-bold mb-6 text-center">Answers to Your Most Important Questions</h2>

          <div className="">
            {industoryData.faqs.map((faq: any, index: any) => (
              <div
                key={index}
                className="border-b border-gray-600 overflow-hidden"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex justify-between items-center p-4 text-left font-semibold text-lg bg-white hover:bg-gray-50"
                >
                  {faq.question}
                  <span className="text-xl">
                    {activeIndex === index ? (<LiaAngleUpSolid />) : (<LiaAngleDownSolid />)}
                  </span>
                </button>

                <div
                  className={`px-4 transition-all duration-300 ${activeIndex === index ? "max-h-40 py-3" : "max-h-0 overflow-hidden"
                    }`}
                >
                  <p className="text-gray-600 text-md">{faq.answer}</p>
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
      <div className="py-10">
        <div className="flex justify-between items-center mb-6 px-20">
          <h2 className="text-3xl font-semibold">Features</h2>
          <div className="flex gap-3">
            <button onClick={() => scroll("left")} className="p-2 text-4xl">
              <IoIosArrowRoundBack />
            </button>
            <button onClick={() => scroll("right")} className="p-2 text-4xl">
              <IoIosArrowRoundForward />
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar">
          {industoryData.features.map((item: any, i: any) => (
            <div key={i} className={`min-w-75 ${item?.margin} h-100 relative rounded-sm overflow-hidden`}>
              <img src={item.icon} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-4 hover:scale-100 transition duration-500">
                <p className="text-gray-200 text-sm mt-1">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // function CustomerStories1() {
  //   const scrollRef = useRef<any>(null);

  //   const scroll = (direction: any) => {
  //     if (direction === "left") {
  //       scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  //     } else {
  //       scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  //     }
  //   };


  //   if (!industoryData?.guides || industoryData?.guides.length === 0) return null;

  //   return (
  //     <div className="py-10">
  //       <div className="flex justify-between items-center mb-6 px-20">
  //         <h2 className="text-3xl font-semibold">Guides</h2>
  //         <div className="flex gap-3">
  //           <button onClick={() => scroll("left")} className="p-2 text-4xl">
  //             <IoIosArrowRoundBack />
  //           </button>
  //           <button onClick={() => scroll("right")} className="p-2 text-4xl">
  //             <IoIosArrowRoundForward />
  //           </button>
  //         </div>
  //       </div>

  //       <div ref={scrollRef} className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar">
  //         {industoryData.guides.map((guide: any, i: any) => (
  //           <div key={i} className={`min-w-75 ${i === 0 ? "ml-20" : i === industoryData.guides.length - 1 ? "mr-20" : ""} h-50 border border-gray-200 relative overflow-hidden rounded-sm`}>
  //             <div className="absolute inset-0 flex flex-col justify-end p-4 hover:scale-100 transition duration-500">
  //               <div className="p-2">
  //                 <h3 className="font-semibold text-xl line-clamp-2">{guide.title}</h3>
  //                 <p className="text-gray-600 text-md mt-2 line-clamp-3">{guide.description}</p>
  //                 <a href={guide.file} className="text-blue-600 text-sm mt-2 inline-block">
  //                   Check Guide →
  //                 </a>
  //               </div>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   );
  // }

  function ResourcesSection() {
    // Don't render if no resources data
    if (!industoryData?.resources || industoryData?.resources?.length === 0) return null;

    return (
      <div className="bg-gray-100 py-16">
        <div className="px-4 flex flex-row gap-10">
          <div className="flex items-center justify-center w-2/4 px-20">
            <h2 className="text-3xl font-semibold leading-snug">Resources to stay ahead</h2>
          </div>

          <div className="space-y-8 border-l pl-6 grid grid-cols-2 w-full gap-4">
            {industoryData.resources.map((res: any, i: any) => (
              <div key={i} className="p-2">
                <h3 className="font-semibold text-xl">{res.title}</h3>
                <p className="text-gray-600 text-md mt-2">{res.description}</p>
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

  function SolutionsSection() {


    console.log("yahi hai inusty wlaa page jaha s out bnae ga ", industoryData)

    const [showAll, setShowAll] = useState(false);

    if (!industoryData?.sub_industry || industoryData?.sub_industry?.length === 0) return null;

    const visibleData = showAll ? industoryData?.sub_industry : industoryData?.sub_industry.slice(0, 3);

    return (
      <div className="bg-[#333737] text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl mb-10">
            {industoryData?.tag_line}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {visibleData.map((item: any, i: any) => (
              <div key={i} className="bg-[#333737] overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-70 object-cover" />
                <div className="py-6 flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <Link href={`/industry/${industoryData.slug}/${industoryData.id}/${item.slug}/${item.id}`} className="text-xl font-semibold">
                      {item.name}
                    </Link>
                    <p className="text-white text-md mt-2 line-clamp-3 overflow-hidden">
                      {item.description}
                    </p>
                  </div>
                  <div className="bg-blue-500 w-10 h-10 flex items-center justify-center rounded-full text-3xl">
                    <IoIosArrowRoundForward />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition"
            >
              {showAll ? "Show Less" : "Show All"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  function SolutionsSection1() {
    // Don't render if required data is missing
    if (!industoryData?.feature_title || !industoryData?.feature_file_link) return null;

    return (
      <div className="text-black py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl mb-4">{industoryData.feature_title}</h2>
          <p className="text-gray-600 text-lg">{industoryData.feature_description}</p>

          <div className="my-6 rounded-md p-3 border border-gray-300 bg-white">
            <div className="flex flex-row gap-4 overflow-hidden">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{industoryData.feature_sub_title}</h3>
                  <p className="text-gray-600 mt-2 text-md line-clamp-3 overflow-hidden">
                    {industoryData.feature_sub_description}
                  </p>
                </div>
              </div>
              <img src={industoryData.feature_file_link} alt={"sub-dis"} className="w-full h-70 object-cover" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  function CareerSection() {
    // Don't render if required data is missing
    if (!industoryData?.name || !industoryData?.image) return null;

    return (
      <div className="bg-black text-white py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-semibold mb-6">{industoryData.name}</h2>
            <p className="text-gray-300 leading-relaxed mb-8">{industoryData.description}</p>
            <button className="flex items-center gap-3 group">
              <span className="text-lg">Connect us</span>
              <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center group-hover:translate-x-1 transition">
                →
              </div>
            </button>
          </div>
          <div>
            <img src={industoryData.image} alt="career" className="w-full h-87 object-contain" />
          </div>
        </div>
      </div>
    );
  }

  function HeroSection() {
    // Don't render if required data is missing
    if (!industoryData?.hero_background_file_url) return null;

    return (
      <>
        <div
          className="relative h-100 bg-fixed px-20 bg-cover flex items-center"
          style={{ backgroundImage: `url(${industoryData.hero_background_file_url})` }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative z-10 px-6 max-w-4xl">
            <h1 className="text-5xl md:text-5xl max-w-xl text-white font-semibold tracking-wide mb-4">
              {industoryData.hero_background_title}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-6">
              {industoryData.hero_background_description}
            </p>
          </div>
        </div>
        <div className="border-b border-gray-300 px-25 py-2">
          <div className="flex flex-row gap-1 items-center font-semibold">
            <Link href="/">Home</Link>
            <LiaAngleRightSolid />
            <h1>{industoryData.hero_background_title}</h1>
          </div>
        </div>
      </>
    );
  }

  function VideoSection() {
    // Don't render if no videos data
    if (!industoryData?.videos || industoryData?.videos.length === 0) return null;

    return (
      <div className="max-w-6xl mx-auto py-10 text-center">
        <div className="grid md:grid-cols-2 gap-8">
          {industoryData.videos.map((video: any, i: any) => (
            <div key={i} className="text-left">
              <div
                className="relative cursor-pointer rounded-sm overflow-hidden"
                onClick={() => setPlay(video.thumbnail_file_link)}
              >
                {play !== video.file_link ? (
                  <>
                    <img src={video.thumbnail_file_link} alt="thumbnail" className="w-full h-80 object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/30 text-white w-14 h-14 flex items-center justify-center rounded-full shadow-lg text-xl">
                        <FaPlay />
                      </div>
                    </div>
                  </>
                ) : (
                  <video controls autoPlay className="w-full h-80 object-cover">
                    <source src={video.file_link} type="video/mp4" />
                  </video>
                )}
              </div>
              <h3 className="mt-4 text-xl font-semibold">{video.title}</h3>
              <p className="text-gray-600 mt-2 text-md">{video.description}</p>
              <button onClick={() => setPlay(video.file_link)} className="text-blue-600 mt-3 inline-block text-sm font-medium">
                Watch Video
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {HeroSection()}
      {SolutionsSection1()}
      {SolutionsSection()}

      {VideoSection()}
      {ResourcesSection()}
      {CustomerStories()}
      {/* {CustomerStories1()} */}
      {CareerSection()}
      {FAQAccordion()}
    </div>
  );
}

export default Industory;