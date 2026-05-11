import Industory from "@/components/Industory";
import { industriesData } from "@/data/industryData";




async function getUser(industrySlug: any) {
  const res = await fetch(`http://synmac.acetians.in/api/industry/${industrySlug}`, {
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
      <section  className="section-fade-in py-20  bg-muted/40 bg-gray-50">
            <div className="container max-w-6xl mx-auto">
              <div className="text-center ">
                <h2 className="font-display text-3xl text-black md:text-4xl font-bold">
                  WHY CHOOSE <span className="text-[#cd2626]">SYNMAC</span>
                </h2>
                <p className="text-gray-500 mt-4 max-w-4xl mx-auto text-lg">
                We combine innovation, reliability, and customer-first service to deliver solutions that truly make a difference. Our team is dedicated to quality, transparency, and building long-term relationships. Choosing us means choosing expertise, trust, and results.
                </p>
              </div>
             
            </div>
           
          </section>
    </div>
  );
};

export default page