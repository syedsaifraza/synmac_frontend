import About_Soluctions from "@/components/About_Soluctions";
import Faqs_Section from "@/components/Faqs_Section";
import Header from "@/components/Header";
import Industory from "@/components/Industory";
import Product_Category from "@/components/Product_Category";
import Product_Category_Section from "@/components/Product_Category_Section";
import Product_Section from "@/components/Product_Section";
import Related_Product_Category_Section from "@/components/RelatedProductCategory";
import Link from "next/link";
import { IoIosArrowRoundForward } from "react-icons/io";
import { LiaAngleRightSolid } from "react-icons/lia";

async function getUser(id: any) {
  const res = await fetch(
    `http://synmac.acetians.in/api/category/${id}`,
    {
      // next : { revalidate: 300 }
      cache: "no-store"
    }
  );

  return res.json();
}

const Page = async ({ params }: any) => {
  const resolvedParams = await params;



  const data = await getUser(resolvedParams.proSlug);



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

          {
            data.data.sub_industry_name && (
              <>
                <LiaAngleRightSolid size={12} />
                <h1 className="text-gray-600">{data.data.sub_industry_name}</h1>
              </>

            )
          }
          <LiaAngleRightSolid size={12} />
          <h1 className="text-gray-600">{data?.data?.name}</h1>
        </div>
      </div>


      <About_Soluctions heading={data.data.feature_title}
        description={data.data.feature_description}
        sub_heading={data.data.feature_sub_title}
        sub_descriptiion={data.data.feature_sub_description}
        image={data.data.feature_file_link} />

      <Product_Section product_list={data?.data?.products} />

       <Related_Product_Category_Section data={data?.data?.relatedProductCategory} />


      <Product_Category faqs={data?.data?.faqs}
        info={info}
        Resources={resources} />

      <Faqs_Section faqs={data?.data?.faqs} />
  <section  className="section-fade-in py-20  bg-muted/40 bg-gray-50">
            <div className="container max-w-6xl mx-auto">
              <div className="text-center ">
                <h2 className="font-display text-3xl text-black md:text-4xl font-bold">
                  WHY CHOOSE <span className="text-[#cd2626]">SYNMAC</span>
                </h2>
                <p className="text-gray-500 mt-4 max-w-4xl mx-auto text-lg">
                We combine innovation, reliability, and customer-first service to deliver solutions that truly make a difference. Our team is dedicated to quality, transparency, and building long-term relationships. Choosing us means choosing expertise, trust, and results.
                </p>
              </div>
             
            </div>
           
          </section>
    </div>
  );
}








export default Page;