import SuccessStories from '@/components/Resources_Components/SuccessStories'



async function getStories() {
  const res = await fetch(`http://synmac.acetians.in/api/success`, {
    next : { revalidate: 300 },
    // cache: "no-store",
  });

  return res.json();
}


const page = async () => {

   const data = await getStories()
  return (
    <div>
      <SuccessStories  storyData={data?.stories}/>
    </div>
  )
}

export default page