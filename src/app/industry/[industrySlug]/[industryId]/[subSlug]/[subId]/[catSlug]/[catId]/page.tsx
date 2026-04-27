import Industory from "@/components/Industory";
import Product_Category from "@/components/Product_Category";
import Link from "next/link";
import { IoIosArrowRoundForward } from "react-icons/io";
import { LiaAngleRightSolid } from "react-icons/lia";

async function getUser(id: any) {
  const res = await fetch(
    `http://synmac.acetians.in/api/category/${id}`,
    {
      // next : { revalidate: 300 }
      //  cache: "no-store"
    }
  );

  return res.json();
}

const Page = async ({ params }: any) => {
  const resolvedParams = await params;



  const data = await getUser(resolvedParams.catId);




  function HeroSection() {



    return (
      <>

        <div
          className="relative h-100 bg-fixed px-20 bg-cover flex items-center"
          style={{
            backgroundImage:
              `url(${data?.data?.hero_background_file_url})`,
          }}
        >

          <div className="absolute inset-0 bg-black/60"></div>

          <div className="relative z-10 px-6 max-w-4xl">
            <h1 className="text-5xl md:text-5xl max-w-xl  text-white font-semibold tracking-wide mb-4">
              {data?.data?.name}
            </h1>

            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-6" dangerouslySetInnerHTML={{ __html: data?.data?.hero_background_description }} />

          </div>
        </div>
        <div className="border-b border-gray-400 px-25 py-2">
          <div className="flex flex-row gap-1 items-center font-semibold">
            <Link href="/">Home</Link>
            <LiaAngleRightSolid />

            <Link href={`/industry/${resolvedParams.industrySlug}/${resolvedParams.industryId}`}>{data?.data?.industry_name}</Link>
            <LiaAngleRightSolid />

            <Link href={`/industry/${resolvedParams.industrySlug}/${resolvedParams.industryId}/${resolvedParams.subSlug}/${resolvedParams.subId}`}>{data?.data?.sub_industry_name}</Link>
            <LiaAngleRightSolid />
            <h1>{data?.data?.name}</h1>
          </div>



        </div>
      </>
    )
  }


  function SolutionsSection() {

    console.log(data?.data)

    return (
      <div className="bg-gray-50 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-gray-900 mb-10">
            {data?.data.tag_line}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {data?.data?.products.map((item: any, i: any) => {
              console.log(item)
              return (
                <div key={i} className="bg-gray-50 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-70 object-cover" />
                  <div className="py-6 flex justify-between items-start gap-4">
                    <div className="flex-1">

                      {/* href={`/industry/${resolvedParams.industrySlug}/${resolvedParams?.industryId}/${resolvedParams.subSlug}/${resolvedParams.subId}/${item.slug}/${item.id}`} */}


                      <Link
                        href={`/product?
productname=${encodeURIComponent(item?.name)}
&productid=${item?.id}

&industryname=${encodeURIComponent(item?.industry_name)}
&industryid=${item?.industry_id}


${item?.sub_industry_name && `&subindustryname=${encodeURIComponent(item?.sub_industry_name)}`
                          }

${item?.sub_industry_id && `&subindustryid=${encodeURIComponent(item?.sub_industry_id)}`
                          }

${item?.product_category_name && `&productcategoryname=${encodeURIComponent(item?.product_category_name)}`
                          }

${item?.product_category_id && `&productcategoryid=${encodeURIComponent(item?.product_category_id)}`
                          }
`}
                        className="text-xl text-gray-900 font-semibold">
                        {item.name}
                      </Link>

                      <p className="text-gray-600 text-md mt-2 line-clamp-3 overflow-hidden" dangerouslySetInnerHTML={{ __html: item.description }} />

                    </div>
                    <div className="bg-blue-500 w-10 h-10 flex items-center justify-center rounded-full text-3xl">
                      <IoIosArrowRoundForward />
                    </div>
                  </div>
                </div>
              )

            })}
          </div>

          {/* <div className="flex mt-10">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition"
                >
                  {showAll ? "Show Less" : "Show All"}
                </button>
              </div> */}
        </div>
      </div>
    );
  }


  const info = {
    "name": data?.data?.name,
    "image": data?.data?.image,
    "description": data?.data?.description
  }


  const resources = data?.data?.resources



  return (
    <div>


      {HeroSection()}
      {/* {SolutionsSection1()} */}
      {SolutionsSection()}
      <Product_Category faqs={data?.data?.faqs}
        info={info}
        Resources={resources} />

    </div>
  );
}








export default Page;