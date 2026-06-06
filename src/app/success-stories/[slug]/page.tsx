import Header from "@/components/component/Header";

async function getBlogsResources(slug: any) {
  const res = await fetch(`http://localhost:3000/api/success/${slug}`, {
    // next : { revalidate: 300 }
    cache: "no-store",
  });

  return res.json();
}

const page = async ({ params }: any) => {
  const path = await params;

  const getSuccessData = await getBlogsResources(path.slug);


  return (
    <div>
      <Header
        title={getSuccessData.SuccDaat.title}
        description={getSuccessData.SuccDaat.description}
        background_image={getSuccessData.SuccDaat.success_story_image_url}
      />

      <div className="text-black py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div
            dangerouslySetInnerHTML={{
              __html: getSuccessData.SuccDaat.success_story_content || "",
            }}
             className="prose max-w-none"
          />
        </div>
      </div>
    </div>
  );
};

export default page;
