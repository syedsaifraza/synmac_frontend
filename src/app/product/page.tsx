
import ProductListSection from '@/components/product_page/ProductListSection'

async function getProduct(
  page: number = 1,
  perPage: number = 30,
  industry?: string,
  subindustries?: string,
  productcategory?: string,
  product?: string
) {
  let url = `https://synmac-backend.serverscripts.in/api/v1/user/products/view-name-list?page=${page}&per_page=${perPage}`;

  if (product) {
    url += `&product=${product}`;
  } else {
    if (industry) url += `&industry=${industry}`;
    if (subindustries) url += `&subindustry=${subindustries}`;
    if (productcategory) url += `&productcategory=${productcategory}`;
  }

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

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
        }
    );

    return res.json();
}


const page = async ({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    per_page?: string;
    industry?: string;
    subindustry?: string;
    productcategory?: string;
    product?: string;
  }>;
}) => {
  const params = await searchParams;

  const product = params.product || "";

  const currentPage = parseInt(params.page || "1");
  const perPage = parseInt(params.per_page || "10");

  const industry = params.industry;
  const subindustry = params.subindustry;
  const productcategory = params.productcategory;

  let getProducts;

  if (product) {
   
    getProducts = await getProduct(1, 30, undefined, undefined, undefined, product);
  } else {
    getProducts = await getProduct(
      currentPage,
      perPage,
      industry,
      subindustry,
      productcategory
    );
  }

  const sidebar = await getSidebarList();

  return (
    <ProductListSection
      productData={getProducts.data}
      sidebar={sidebar.data}
      currentPage={currentPage}
      perPage={perPage}
    />
  );
};

export default page;
