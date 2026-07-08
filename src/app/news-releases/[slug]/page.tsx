import Header from "@/components/component/Header";
import { notFound } from "next/navigation";

async function getBlogsResources(slug: any) {
  const res = await fetch(`http://synmac.acetians.in/api/news/${slug}`, {
    cache: "no-store",
  });

  return res.json();
}

const page = async ({ params }: any) => {
  const path = await params;

  const getNewsData = await getBlogsResources(path.slug);


   if(!getNewsData.success){
        return notFound();
  }

  return (
    <div>
      
      <Header
        title={getNewsData.News.title}
        description={
       getNewsData.News.description
        }
        background_image={getNewsData?.News?.news_image_url}
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
