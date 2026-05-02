import Industory from "@/components/Industory";
import { industriesData } from "@/data/industryData";




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



  return (
    <div >
      <Industory industoryData={data?.industry}  filterIndus={data?.randomIndustries} />
    </div>
  );
};

export default page