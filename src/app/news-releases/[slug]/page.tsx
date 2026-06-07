import Header from "@/components/component/Header";

async function getBlogsResources(slug: any) {
  const res = await fetch(`http://synmac.acetians.in /api/news/${slug}`, {
    // next : { revalidate: 300 }
    cache: "no-store",
  });

  return res.json();
}

const page = async ({ params }: any) => {
  const path = await params;

  const getNewsData = await getBlogsResources(path.slug);

  console.log("hello dta",getNewsData)

  return (
    <div>
      
      <Header
        title={getNewsData.News.title}
        description={
       getNewsData.News.description
        }
        background_image={getNewsData.News.success_story_image_url}
      />

      <div className="text-black py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div
            dangerouslySetInnerHTML={{
              __html: getNewsData.News.new_release_content || "",
            }}
              className="prose max-w-none"
          />
        </div>
      </div>
    </div>
  );
};

export default page;
