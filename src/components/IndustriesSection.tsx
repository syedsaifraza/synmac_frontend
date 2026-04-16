import Image from "next/image";
import { BiChevronRight } from "react-icons/bi";
import Link from "next/link";

interface SubIndustry {
  id: number;
  subMarketName: string;
  description: string;
  slug?: string;
}

interface Industry {
  id: number;
  slug: string;
  name: string;
  description: string;
  image: string | null;
  hero_background_title: string;
  hero_background_description: string;
  hero_background_file_url: string | null;
  feature_title: string;
  feature_description: string;
  feature_sub_title: string;
  feature_sub_description: string;
  feature_file_link: string | null;
  image_id: number;
  hero_background_file_id: number;
  feature_file_id: number;
  features: any[] | null;
  isSaveInDraft: number;
  created_at: string;
  updated_at: string;
  products: any[];
  product_technologies: any[];
  sub_industry: SubIndustry[];
  videos: any[];
  guides: any[];
  resources: any[];
  faqs: any[];
}

async function getIndustries() {
  try {
    const res = await fetch("/api/industry", {
      // next: { revalidate: 300 },
      cache: "no-store"
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch industries: ${res.status}`);
    }




    const result = await res.json();


    console.log("hello", result)

    return result?.industries || [];
  } catch (error) {
    console.error("Error fetching industries:", error);
    return [];
  }
}

const IndustriesSection = async () => {
  const industries = await getIndustries();


  if (industries.length === 0) {
    return (
      <section className="bg-white py-24 px-6 text-black">
        <div className="container mx-auto text-center">
          <p className="text-[#cd2626] text-sm font-medium tracking-wider uppercase mb-3">Industries We Serve</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Coming <span className="text-[#cd2626]">Soon</span>
          </h2>
          <p className="text-gray-500">Industries data is being loaded. Please check back later.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-24 px-6 text-black">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#cd2626] text-sm font-medium tracking-wider uppercase mb-3">
            Industries We Serve
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Powering Industries <span className="text-[#cd2626]">Worldwide</span>
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            Click on any industry to explore sub-markets and discover the specialty chemicals we offer.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((industry: Industry) => {

            const firstSubIndustry = industry.sub_industry[0];
            const imageUrl = industry.image || industry.hero_background_file_url;

            console.log(industry.id)

            return (
              <Link
                href={`/industry/${industry.slug}/${industry.id}`}
                key={industry.id}
                className="group rounded-xl overflow-hidden border border-gray-200 bg-white hover:shadow-xl hover:shadow-[#cd2626]/5 transition-all duration-300"
              >
                <div className="aspect-4/3 overflow-hidden bg-gray-100">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={industry.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200">
                      <span className="text-gray-400 text-sm">No image</span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-lg text-gray-900 flex items-center gap-1 group-hover:text-[#cd2626] transition-colors">
                    {industry.name}
                    <BiChevronRight
                      size={18}
                      className="text-[#cd2626] opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1"
                    />
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {industry.sub_industry.length} sub-market{industry.sub_industry.length !== 1 ? 's' : ''}
                  </p>
                  {industry.description && (
                    <p className="text-xs text-gray-400 mt-2 line-clamp-2">
                      {industry.description}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;