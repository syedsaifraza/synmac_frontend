import About_Soluctions from "@/components/component/About_Soluctions";
import Faqs_Section from "@/components/component/Faqs_Section";
import Header from "@/components/component/Header";
import Product_Category_Section from "@/components/component/ProductCategory_Card";
import Product_Section from "@/components/component/Product_Card";
import ResourcesSection from "@/components/component/ResourcesSection";
import Link from "next/link";
import { LiaAngleRightSolid } from "react-icons/lia";
import { SubIndustry } from "@/components/component/SubIndustry_Card";

async function getUser(id: any) {
  const res = await fetch(
    `http://synmac.acetians.in/api/sub-industry/${id}`,
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

      < About_Soluctions
        heading={data?.data?.feature_title}
        description={data?.data?.feature_description}
        sub_heading={data?.data?.feature_sub_title}
        sub_descriptiion={data?.data?.feature_sub_description}
        image={data?.data?.feature_file_link} />
      <ResourcesSection resources={resources} />
      <Product_Category_Section data={data?.data?.product_category} title={"Product Categories"} />
      <Product_Section product_list={data.data.products}/>


      <SubIndustry subIndustry={data?.data?.relatedSubIndustry} title={"Related Sub Industries"} />

       <Faqs_Section faqs={data?.data?.faqs} />

      
  
    </div>
  );
}








export default Page;