import Industory from "@/components/Industory";

async function getUser(id: any) {
  const res = await fetch(`http://localhost:3000/api/get-industory/${id}`);
  return res.json();
}

const page = async ({ params }: any) => {
 
   const resolvedParams = await params; 
  console.log("yahi aid hai ", resolvedParams.id)

  const data = await getUser(resolvedParams.id);

  console.log("ayay kya ", data.users)


  return (
    <div>
    
      <Industory industoryData={data.users}/>
    </div>
  );
};


export default page