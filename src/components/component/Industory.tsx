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
import Header from "./Header";
import About_Soluctions from "./About_Soluctions";
import Faqs_Section from "./Faqs_Section";
import Product_Category_Section from "./ProductCategory_Card";
import Product_Section from "./Product_Card";
import ResourcesSection from "./ResourcesSection";
import { SubIndustry } from "./SubIndustry_Card";
import Path from "../ui/Path";

const Industory = ({ industoryData }: any) => {
  return (
    <div className="min-h-screen bg-white">
      <Header
        title={industoryData?.name || " "}
        description={industoryData?.hero_background_description || " "}
        background_image={industoryData.hero_background_file_url || " "}
      />

      <Path 
      industryName={industoryData?.name}
  industrySlug={industoryData?.slug}/>
  
      <About_Soluctions
        heading={industoryData?.feature_title}
        description={industoryData?.feature_description || " "}
        sub_heading={industoryData?.feature_sub_title || " "}
        sub_descriptiion={industoryData?.feature_sub_description || " "}
        image={industoryData?.feature_file_link || null}
      />

      <SubIndustry
        subIndustry={industoryData?.sub_industry}
        title={"Sub Industries"}
      />
     
      <Product_Category_Section
        data={industoryData?.product_category}
        title={"Product Categories"}
      />
      <Product_Section product_list={industoryData?.products} />
       <ResourcesSection resources={industoryData?.resources} />
      <Faqs_Section faqs={industoryData?.faqs} />
    </div>
  );
};

export default Industory;
