import AboutPage from '@/components/about_page/AboutPage'
import React from 'react'


async function getSustainability() {
  const res = await fetch(`http://synmac.acetians.in/api/sustainability`, {

    cache: "no-store"
  });
  return res.json();
}

async function getHeroSection() {
  const res = await fetch(`http://synmac.acetians.in/api/hero-section`, {
    cache: "no-store"
  });
  return res.json();
}


async function getFooterData() {
  const res = await fetch(`http://synmac.acetians.in/api/footer/`, {

    cache: "no-store"
  });
  return res.json();
}

const page = async () => {
  const sustainability = await getSustainability()

  const footer = await getFooterData()


  return (
    <div>
      <AboutPage footer={footer?.data}/>
    </div>
  )
}

export default page
