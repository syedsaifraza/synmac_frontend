import Industory from "@/components/Industory";

async function getUser(id: any) {
  const res = await fetch(`/api/industry/${id}`, {
    // next: { revalidate: 300 }
    cache: "no-store"
  });
  return res.json();
}



const page = async ({ params }: any) => {
  const resolvedParams = await params;

  const data = await getUser(resolvedParams.industryId);

  console.log()

  return (
    <div>
      <Industory industoryData={data.industry} />
    </div>
  );
};

export default page