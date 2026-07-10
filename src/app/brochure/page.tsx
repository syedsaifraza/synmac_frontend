import Brochure from '@/components/Resources_Components/Brochure'
import React from 'react'


async function getResources() {
  const res = await fetch(`http://synmac.acetians.in/api/resources`, {
    next : { revalidate: 300 },
    // cache: "no-store",
  });

  return res.json();
}


const page = async () => {

    const allResources = await getResources();


  return (
    <div>
      <Brochure allResources={allResources}/>
    </div>
  )
}

export default page