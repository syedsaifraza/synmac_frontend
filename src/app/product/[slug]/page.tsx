import Header from '@/components/component/Header';
import ProductPage from '@/components/product_page/ProductPage';
import { notFound } from 'next/navigation';


async function getProduct(slug: any) {
  const res = await fetch(`http://synmac.acetians.in/api/product/${slug}`, {
    cache: "no-store",
  });

  return res.json();
}

const Page = async ({ params }: any) => {
  const resolvedParams = await params;
  const response = await getProduct(resolvedParams.slug);
  const productData = response?.product || null;


   if (!response.success) {
     return notFound();
   }




  return (
    <div className="min-h-screen bg-white">


      <Header title={productData?.name} description={" "} background_image={productData?.hero_background_file_url} />
    

    <ProductPage productData={productData} />
    </div>
  );
};

export default Page;