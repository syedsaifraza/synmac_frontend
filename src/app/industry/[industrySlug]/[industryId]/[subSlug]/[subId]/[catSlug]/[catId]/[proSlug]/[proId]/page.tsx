import Link from 'next/link';
import React from 'react'
import { LiaAngleRightSolid } from 'react-icons/lia';

async function getProduct(id:any) {
  const res = await fetch(
    `https://synmac-backend.serverscripts.in/api/v1/user/product/view/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  return res.json();
}


const page = async ({ params }: any) => {
  const resolvedParams = await params;

  console.log("hai yahi kay", resolvedParams.proId)

  const data = await getProduct(resolvedParams.proId)

  console.log("data", data)





  function HeroSection() {



    return (
      <>
        <div
          className="relative h-100 bg-fixed px-20 bg-cover flex items-center"
          style={{
            backgroundImage:
              'url("https://t3.ftcdn.net/jpg/03/38/11/34/360_F_338113434_1OTf8iR1bYPskGDwvGP1pnBPPQ6bJdhB.jpg")',
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative z-10 px-6 max-w-4xl">
            <h1 className="text-5xl md:text-5xl max-w-xl text-white font-semibold tracking-wide mb-4">
              {data?.data?.name}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-6">
              {data?.data?.hero_background_description}
            </p>
          </div>
        </div>
        <div className="border-b border-gray-300 px-25 py-2">
          <div className="flex text-xs flex-row gap-1 items-center font-semibold">
            <Link href="/">Home</Link>
            <LiaAngleRightSolid />
            <Link href="/">{data?.data?.industry_name}</Link>
            <LiaAngleRightSolid />
            <Link href="/">{data?.data?.sub_industry_name}</Link>
            <LiaAngleRightSolid />
            <Link href="/">{data?.data?.product_category_name}</Link>
            <LiaAngleRightSolid />
             <Link href="/">{data?.data?.name}</Link>
            
           
          </div>
        </div>
      </>
    );
  }
  return (
    <div>
      {HeroSection()}
    </div>
  )
}

export default page