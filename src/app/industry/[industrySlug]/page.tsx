import Industory from "@/components/component/Industory";
import Four04 from "@/components/Four04";
import { notFound } from "next/navigation";


async function getUser(industrySlug: any) {
  const res = await fetch(`http://localhost:3000/api/industry/${industrySlug}`, {
    // next: { revalidate: 300 }
    cache: "no-store"
  });

  return res.json();
}



const page = async ({ params }: any) => {
  const resolvedParams = await params;

  const data = await getUser(resolvedParams?.industrySlug);



  if(!data.success){
    return notFound();
  }



  return (
    <div >
      <Industory industoryData={data?.industry} />
  
    </div>
  );
};

export default page