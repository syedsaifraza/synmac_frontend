import Header from "@/components/component/Header";

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


  console.log("getBlogData",getBlogData)
  return (
    <div>
      <Header
        title={getBlogData?.blogData?.title}
        description={
          "Access detailed guides, product information, and industry knowledge to help you understand, use, and choose the right chemical solutions for your business."
        }
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
