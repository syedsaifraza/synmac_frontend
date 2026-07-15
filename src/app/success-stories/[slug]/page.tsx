import Header from "@/components/component/Header";
import { notFound } from "next/navigation";

async function getBlogsResources(slug: any) {
  const res = await fetch(`http://synmac.acetians.in/api/success/${slug}`, {
    // next : { revalidate: 300 }
    cache: "no-store",
  });

  return res.json();
}

const page = async ({ params }: any) => {
  const path = await params;

  const getSuccessData = await getBlogsResources(path.slug);


  if (!getSuccessData.success) {
    return notFound();
  }

  return (
    <div>
      <Header
        title={getSuccessData?.SuccDaat?.title}
        description={" "}
        background_image={" "}
      />

      <div className="text-black py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
            <div className="mb-3">
     <h1 className="text-xl text-gray-800">{ getSuccessData?.SuccDaat?.description}</h1>
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: getSuccessData?.SuccDaat?.success_story_content || "",
            }}
            className="prose max-w-none"
          />
        </div>
      </div>
    </div>
  );
};

export default page;
