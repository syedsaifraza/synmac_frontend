import Header from '@/components/component/Header';
import ProductPage from '@/components/product_page/ProductPage';


async function getProduct(slug: any) {
  const res = await fetch(`http://localhost:3000/api/product/${slug}`, {
    // next : { revalidate: 300 }
    cache: "no-store",
  });

  return res.json();
}

const Page = async ({ params }: any) => {
  const resolvedParams = await params;
  const response = await getProduct(resolvedParams.slug);
  const productData = response?.product || null;


  const SolutionsSection = () => {
    const name = productData?.name ?? "Avipol";
    const description = productData?.description ?? "Avipol is a specialized chemical solution used as a viscosity reducer in industries like sugar and agro-processing, helping improve fluid flow, enhance processing efficiency, reduce energy consumption, and ensure smoother handling of syrups and thick liquids.";

    return (
      <div className="text-black py-8 sm:py-12 lg:py-16">

        <div className="text-gray-600 text-base sm:text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: description || "" }} />

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