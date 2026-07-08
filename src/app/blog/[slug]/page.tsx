import Header from "@/components/component/Header";
import { notFound } from "next/navigation";

async function getBlogsResources(slug: any) {
  const res = await fetch(`http://synmac.acetians.in/api/blogs/${slug}`, {
    // next : { revalidate: 300 }
    cache: "no-store",
  });
  return res.json();
}

const page = async ({ params }: any) => {

  const path = await params;
  const getBlogData = await getBlogsResources(path.slug);

   if(!getBlogData.success){
        return notFound();
  }

  return (
    <div>
      <Header
        title={getBlogData?.blogData?.title}
        description={ getBlogData?.blogData?.description}
        background_image={getBlogData?.blogData?.blog_image_url}
      />

      <div className="text-black py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div
            dangerouslySetInnerHTML={{
              __html: getBlogData?.blogData?.blog_content || "",
            }}
            className="prose max-w-none"
          />
        </div>
      </div>
    </div>
  );
};

export default page;
