"use client";

import Link from "next/link";
import DOMPurify from "dompurify";
import { useRef, useState } from "react";
import {
  FaAngleDown,
  FaAngleUp,
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
  FaPlay,
} from "react-icons/fa";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import {
  LiaAngleDownSolid,
  LiaAngleRightSolid,
  LiaAngleUpSolid,
} from "react-icons/lia";
import Header from "./component/Header";
import About_Soluctions from "./component/About_Soluctions";
import Faqs_Section from "./component/Faqs_Section";
import Product_Category_Section from "./component/ProductCategory_Card";
import Product_Section from "./component/Product_Card";
import ResourcesSection from "./component/ResourcesSection";
import { SubIndustry } from "./component/SubIndustry_Card";

const Industory = ({ industoryData }: any) => {
  return (
    <div className="min-h-screen bg-white">
      <Header
        title={industoryData?.name}
        description={industoryData?.hero_background_description}
        background_image={industoryData.hero_background_file_url}
      />
      <div className="border-b border-gray-200 py-3 sm:py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-row gap-1 items-center max-w-6xl mx-auto font-medium text-sm sm:text-base">
          <Link href="/" className="hover:text-[#cd2626] transition">
            Home
          </Link>
          <LiaAngleRightSolid size={12} />
          <h1 className="text-gray-600">{industoryData?.name}</h1>
        </div>
      </div>
      <About_Soluctions
        heading={industoryData?.feature_title}
        description={industoryData?.feature_description}
        sub_heading={industoryData?.feature_sub_title}
        sub_descriptiion={industoryData?.feature_sub_description}
        image={industoryData?.feature_file_link}
      />

      
      <ResourcesSection resources={industoryData?.resources} />
      <SubIndustry subIndustry={industoryData?.sub_industry} title={" Sub Industries"} />
      <Product_Category_Section data={industoryData?.product_category} title={"Product Categories"} />
      <Product_Section product_list={industoryData?.products} />
      <Faqs_Section faqs={industoryData?.faqs} />
    </div>
  );
};

export default Industory;
