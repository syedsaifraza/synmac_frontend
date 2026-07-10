import Blogs from '@/components/Resources_Components/Blogs'

async function getAllBlogs() {
  const res = await fetch(`http://synmac.acetians.in/api/blogs`, {
    next : { revalidate: 300 },
    // cache: "no-store",
  });

  return res.json();
}


const page = async () => {
   const getBlogs = await getAllBlogs()
  return (
    <div>
      <Blogs blogsData={getBlogs?.blogs} />
    </div>
  )
}

export default page