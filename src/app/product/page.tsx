import ProductListSection from '@/components/ProductListSection'
import React from 'react'


async function getIndustry() {
    const res = await fetch(
        "https://synmac-backend.serverscripts.in/api/v1/user/industry/view",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            // next: { revalidate: 300 },
            cache: "no-store"
        }
    );
    return res.json();
}

async function getSubIndustry() {
    const res = await fetch(
        `https://synmac-backend.serverscripts.in/api/v1/user/sub-industry/view`,
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

async function getCategory() {
    const res = await fetch(
        `https://synmac-backend.serverscripts.in/api/v1/user/product-category/view`,
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


async function getProduct() {
    const res = await fetch(
        `https://synmac-backend.serverscripts.in/api/v1/user/product/view`,
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



  




const page = async () => {

    const industry = await getIndustry()
    const sub_industry = await getSubIndustry()
    const product_category = await getCategory()
    const product = await getProduct()


    return (
        <div>
            <ProductListSection  industry={industry} sub_industry={sub_industry} product_category={product_category} product={product}/>
        </div>
    )
}

export default page