import Contactus from '@/components/Contactus'


async function getUser() {
  const res = await fetch(`http://synmac.acetians.in/api/company-info/`, {
    // next: { revalidate: 300 }
    cache: "no-store"
  });
  return res.json();
}


const page = async () => {

  const data = await getUser()


  return (
    <div>
      <Contactus data={data.data} />
    </div>
  )
}

export default page