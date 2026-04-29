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

    if (!industoryData?.sub_industry

      || industoryData?.sub_industry

        ?.length === 0) return null;

    const visibleData = showAll ? industoryData?.sub_industry

      : industoryData?.sub_industry

        .slice(0, 3);

    return (
      <div className="bg-[#333737] text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-6 sm:mb-8 lg:mb-10">
            {/* {industoryData.tag_line} */}

            Sub Industries
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {visibleData.map((item: any, i: any) => (
              <div key={i} className="bg-[#333737] overflow-hidden group">
                <img src={item.image} alt={item.name} className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition duration-500" />
                <div className="py-4 sm:py-6 flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <Link href={`/industry/${industoryData.slug}/${item.slug}`} className="text-lg sm:text-xl font-semibold hover:text-gray-300 transition">
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
            industoryData?.products
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
