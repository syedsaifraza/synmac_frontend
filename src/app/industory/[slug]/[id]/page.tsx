import Industory from '@/components/Industory'
import React from 'react'

async function getUser() {
  const res = await fetch("http://localhost:3000/api/industry", {
    cache: "no-store",
  });
  console.log("API Response Status:", res.status);
  return res.json();
}

const page = ({params}:any) => {
  const data = getUser()
  return (
    <div>
      <Industory />
    </div>
  )
}

export default page