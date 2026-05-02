'use client'

import Link from "next/link";
import DOMPurify from "dompurify";
import { useRef, useState } from "react";
import { FaAngleDown, FaAngleUp, FaLongArrowAltLeft, FaLongArrowAltRight, FaPlay } from "react-icons/fa";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { LiaAngleDownSolid, LiaAngleRightSolid, LiaAngleUpSolid } from "react-icons/lia";
import RecentSolutionsCard from "./RecentSolutionsCard";
import Header from "./Header";
import About_Soluctions from "./About_Soluctions";
import Faqs_Section from "./Faqs_Section";
import Product_Category_Section from "./Product_Category_Section";
import Product_Section from "./Product_Section";
import ResourcesSection from "./ResourcesSection";

const Industory = ({ industoryData }: any) => {

  console.log("yahi hia kya ", industoryData)



function SubIndustry() {
  const [showAll, setShowAll] = useState(false);

  if (!industoryData?.sub_industry || industoryData.sub_industry.length === 0)
    return null;

  const visibleData = showAll
    ? industoryData.sub_industry
    : industoryData.sub_industry.slice(0, 3);

  return (
    <div className="bg-[#2f3333] text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <h2 className="text-3xl font-semibold mb-10 tracking-tight">
          Sub Industries
        </h2>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleData.map((item: any, i: number) => (
            <Link
              key={i}
              href={`/industry/${industoryData.slug}/${item.slug}`}
              className="group block  rounded-xl overflow-hidden transition"
            >

              {/* Image */}
              <div className="h-52 overflow-hidden">
                <img
                  src={item.feature_file_link}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-5 flex items-start gap-4">

                {/* Left Content */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-gray-300 transition">
                    {item.name}
                  </h3>

                  <p
                    dangerouslySetInnerHTML={{
                      __html: item.hero_background_description || ""
                    }}
                    className="text-gray-400 text-sm line-clamp-3"
                  />
                </div>

                {/* Arrow (Top aligned) */}
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#cd2626] shrink-0 mt-[2px] group-hover:translate-x-1 transition">
                  <IoIosArrowRoundForward className="text-xl" />
                </div>

              </div>
            </Link>
          ))}
        </div>

        {/* Button */}
        {industoryData?.sub_industry.length > 3 && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="border border-gray-400 px-6 py-2 rounded-full text-sm hover:bg-white hover:text-black transition"
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
    <div className="min-h-screen bg-white">

      <Header title={industoryData?.name} description={industoryData?.hero_background_description} background_image={industoryData.hero_background_file_url} />
      <div className="border-b border-gray-200 py-3 sm:py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-row gap-1 items-center max-w-6xl mx-auto font-medium text-sm sm:text-base">
          <Link href="/" className="hover:text-[#cd2626] transition">Home</Link>
          <LiaAngleRightSolid size={12} />
          <h1 className="text-gray-600">{industoryData?.name}</h1>

        </div>
      </div>
      <About_Soluctions heading={industoryData?.feature_title}
        description={industoryData?.feature_description}
        sub_heading={industoryData?.feature_sub_title}
        sub_descriptiion={industoryData?.feature_sub_description}
        image={industoryData?.feature_file_link} />
      <SubIndustry />
      <Product_Section product_list={industoryData?.products} />
      <Product_Category_Section data={industoryData?.product_category} />
      <ResourcesSection resources={industoryData?.resources} />
      <Faqs_Section faqs={industoryData?.faqs} />

    </div>
  );
}

export default Industory;


































// function CareerSection() {
//   if (!industoryData?.name || !industoryData?.image) return null;

//   return (
//     <div className="bg-black text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
//         <div>
//           <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 sm:mb-6">{industoryData.name}</h2>
//           <p dangerouslySetInnerHTML={{ __html: industoryData.description }} className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 col-span-6" />
//           <Link href={"/contact-us"} className="flex items-center gap-3 group">
//             <span className="text-base sm:text-lg">Connect us</span>
//             <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white text-black flex items-center justify-center group-hover:translate-x-1 transition">
//               →
//             </div>
//           </Link>
//         </div>
//         <div className="order-first md:order-last">
//           <img src={industoryData.image} alt="career" className="w-full h-auto object-contain rounded-lg" />
//         </div>
//       </div>
//     </div>
//   );
// }
