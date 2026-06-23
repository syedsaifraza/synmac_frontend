import About_Soluctions from "@/components/component/About_Soluctions";
import Faqs_Section from "@/components/component/Faqs_Section";
import Header from "@/components/component/Header";
import Product_Category_Section from "@/components/component/ProductCategory_Card";
import Product_Section from "@/components/component/Product_Card";
import ResourcesSection from "@/components/component/ResourcesSection";
import Link from "next/link";
import { LiaAngleRightSolid } from "react-icons/lia";
import { SubIndustry } from "@/components/component/SubIndustry_Card";
import Path from "@/components/ui/Path";
import { notFound } from "next/navigation";

async function getUser(id: any) {
  const res = await fetch(`http://localhost:3000/api/sub-industry/${id}`, {
    cache: "no-store",
  });

  return res.json();
}

const Page = async ({ params }: any) => {
  const resolvedParams = await params;

  const data = await getUser(resolvedParams.subSlug);

  if(!data.success){
      return notFound();
    }

  const resources = data?.data?.resources;

  return (
    <div>
      <Header
        title={data?.data?.name}
        description={data?.data?.hero_background_description}
        background_image={data?.data?.hero_background_file_url}
      />

      <Path
        industryName={data?.data?.industry_name}
        industrySlug={data?.data?.industry_slug}
        subIndustryName={data?.data?.name}
        subIndustrySlug={data?.data?.slug}
      />
   

      <About_Soluctions
        heading={data?.data?.feature_title}
        description={data?.data?.feature_description}
        sub_heading={data?.data?.feature_sub_title}
        sub_descriptiion={data?.data?.feature_sub_description}
        image={data?.data?.feature_file_link}
      />

      <Product_Category_Section
        data={data?.data?.product_category}
        title={"Product Categories"}
      />

      <Product_Section product_list={data.data.products} />

      <SubIndustry
        subIndustry={data?.data?.relatedSubIndustry}
        title={"Related Sub Industries"}
      />
      <ResourcesSection resources={resources} />
      <Faqs_Section faqs={data?.data?.faqs} />
    </div>
  );
};

export default Page;
