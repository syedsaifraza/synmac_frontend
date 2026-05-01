import About_Soluctions from "@/components/About_Soluctions";
import Header from "@/components/Header";
import Industory from "@/components/Industory";
import Product_Category_Section from "@/components/Product_Category_Section";
import Sub_IndustrySection from "@/components/Sub_IndustrySection";
import SubIndustries from "@/components/SubIndustries";
import Link from "next/link";
import { IoIosArrowRoundForward } from "react-icons/io";
import { LiaAngleRightSolid } from "react-icons/lia";

async function getUser(id: any) {
  const res = await fetch(
    `http://localhost:3000/api/sub-industry/${id}`,
    {
      // next: { revalidate: 300 },
      cache: "no-store"
    }
  );

  return res.json();
}



const Page = async ({ params }: any) => {
  const resolvedParams = await params;

  const data = await getUser(resolvedParams.subSlug);



  console.log("data", data)






  const info = {
    "name": data?.data?.name,
    "image": data?.data?.image,
    "description": data?.data?.description
  }


  const resources = data?.data?.resources








  return (
    <div>




      <Header title={data?.data?.name} description={data?.data?.hero_background_description} background_image={data?.data?.hero_background_file_url} />
      <div className="border-b border-gray-200 py-3 sm:py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-row gap-1 items-center max-w-6xl mx-auto font-medium text-sm sm:text-base">
          <Link href="/" className="hover:text-[#cd2626] transition">Home</Link>
          <LiaAngleRightSolid size={12} />
          <h1 className="text-gray-600">{data?.data?.industry_name}</h1>
          <LiaAngleRightSolid size={12} />
          <h1 className="text-gray-600">{data?.data?.name}</h1>
        </div>
      </div>

errrr
      < About_Soluctions
        heading={data?.data?.feature_title}
        description={data?.data?.feature_description}
        sub_heading={data?.data?.feature_sub_title}
        sub_descriptiion={data?.data?.feature_sub_description}
        image={data?.data?.feature_file_link} />


      <Product_Category_Section data={data?.data?.product_category} />

  

      <Sub_IndustrySection
        data={data.data}
        faqs={data?.data?.faqs}
        info={info}
        Resources={resources}
      />
          <SubIndustries industry={data?.data?.relatedSubIndustry}/>

    </div>
  );
}








export default Page;