import News from '@/components/Resources_Components/NewsReleases'
import React from 'react'



async function getAllNews() {
  const res = await fetch(`http://synmac.acetians.in/api/news`, {
    next : { revalidate: 300 },
    // cache: "no-store",
  });

  return res.json();
}

const page = async () => {

   const getNews = await getAllNews()


  return (
    <div>
      <News newsData={getNews.news} />   
     </div>
  )
}

export default page