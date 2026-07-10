import ProductListSection from '@/components/product_page/ProductListSection'
import React from 'react'



async function getProduct() {
    const res = await fetch(
        `http://synmac.acetians.in/api/product`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
            //  next : { revalidate: 300 },
        }
    );

    return res.json();
}


async function getSidebarList() {
    const res = await fetch(
        `https://synmac-backend.serverscripts.in/api/v1/user/product-sidebar`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
            //  next : { revalidate: 300 },
        }
    );

    return res.json();
}


const page = async () => {
  const getProducts = await getProduct();
const sidebar = await getSidebarList();
  return (
    <div>
        <ProductListSection productData={getProducts.data} sidebar={sidebar.data}/>
    </div>
  )
}

export default page