import Industory from "@/components/Industory";
import { industriesData } from "@/data/industryData";




async function getUser(id: any) {
  const res = await fetch(`http://synmac.acetians.in/api/industry/${id}`, {
    // next: { revalidate: 300 }
    cache: "no-store"
  });

  return res.json();
}



const page = async ({ params }: any) => {
  const resolvedParams = await params;

  const data = await getUser(resolvedParams.industryId);



  return (
    <div >
      <Industory industoryData={data.industry}  filterIndus={data.randomIndustries} />
    </div>
  );
};

export default page