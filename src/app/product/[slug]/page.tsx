import Link from 'next/link';
import React from 'react';
import { LiaAngleRightSolid } from 'react-icons/lia';

import { FaLock, FaLockOpen } from "react-icons/fa";
import Header from '@/components/Header';
import ProductPage from '@/components/ProductPage';

async function getProduct(slug: any) {
  const res = await fetch(
    `https://synmac-backend.serverscripts.in/api/v1/user/product/viewbyslug/${slug}`,
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

const Page = async ({ params }: any) => {
  const resolvedParams = await params;
  const response = await getProduct(resolvedParams.slug);
  const productData = response?.data || null;

  console.log("API Response:", response);

  const SolutionsSection = () => {
    const name = productData?.name ?? "Avipol";
    const description = productData?.description ?? "Avipol is a specialized chemical solution used as a viscosity reducer in industries like sugar and agro-processing, helping improve fluid flow, enhance processing efficiency, reduce energy consumption, and ensure smoother handling of syrups and thick liquids.";

    return (
      <div className="text-black py-8 sm:py-12 lg:py-16">

        <p className="text-gray-600 text-base sm:text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: description || "" }} />

      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">


      <Header title={productData?.name} description={" "} background_image={productData?.hero_background_file_url} />
    

    <ProductPage productData={productData} />
    </div>
  );
};

export default Page;