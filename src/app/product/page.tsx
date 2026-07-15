
import ProductListSection from '@/components/product_page/ProductListSection'


async function getProduct(page: number = 1, perPage: number = 30,industry:any,subindustries:any,productcategory:any) {



    const res = await fetch(
        `https://synmac-backend.serverscripts.in/api/v1/user/products/view-name-list?page=${page}&per_page=${perPage} ${industry ? (`&industry=${industry}`) : ""}  ${subindustries ? (`&subindustry=${subindustries}`) : ""} ${productcategory ? (`&productcategory=${productcategory}`) : ""}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        }
    );

    const data = res.json()


    return data;
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
        }
    );

    return res.json();
}


const page = async ({ 
    searchParams 
}: { 
    searchParams: Promise<{ page?: string, per_page?: string,industry?:any, subindustry?:any,productcategory?:any}> 
}) => {
   
    const params = await searchParams;
    const currentPage = parseInt(params.page || '1');
    const perPage = parseInt(params.per_page || '10');
    const industry = parseInt(params.industry || '');
    const subindustry = parseInt(params.subindustry || '');
    const productcategory = parseInt(params.productcategory || '');
    
    
    const getProducts = await getProduct(currentPage, perPage,industry,subindustry,productcategory);
    const sidebar = await getSidebarList();
    
    return (
        <div>
            <ProductListSection 
                productData={getProducts.data} 
                sidebar={sidebar.data}
                currentPage={currentPage}
                perPage={perPage}
            />
        </div>
    )
}

export default page;