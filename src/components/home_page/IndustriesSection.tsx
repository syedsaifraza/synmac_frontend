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



const IndustriesSection = async ({industries}:any) => {
 


  if (industries.length === 0) {
    return (
      <section id="industry-block" className="bg-white py-24 px-6 text-black">
        <div className="container mx-auto text-center">
          <p className="text-[#cd2626] text-sm font-medium tracking-wider uppercase mb-3">Industries We Serve</p>
          <h2 className="font-display text-3xl md:text-6xl font-bold mb-4">
            Coming <span className="text-[#cd2626]">Soon</span>
          </h2>
          <p className="text-gray-500 fonts">Industries data is being loaded. Please check back later.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="industry-block" className="bg-white py-24 max-w-6xl mx-auto text-black">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
          {industries?.slice(0, 10).map((industry: Industry, index: any) => {


            const imageUrl = industry.feature_file_link || industry.hero_background_file_url;

            if (index === 9) {
              return (
              
                  <Link key={index} href={`/industries`} className="block relative border bg-red-50 hover:bg-red-100 border-gray-200 overflow-hidden rounded-xl ">
                    <div className="aspect-4/3 overflow-hidden ">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={industry.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-red-50 hover:bg-red-100">
                          <span className="text-gray-400 text-sm">No image</span>
                        </div>
                      )}
                    </div>

                    <div className="p-2">
                      <h3 className="font-semibold text-gray-900 flex items-center line-clamp-2 gap-1 group-hover:text-[#cd2626] transition-colors text-sm">
                        {industry?.name}
                        <BiChevronRight
                          size={18}
                          className="text-[#cd2626] opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1"
                        />
                      </h3>

                  
                    </div>

                    
                    <div className="absolute inset-0 bg-white/70 flex items-center justify-center opacity-100 rounded-xl">
                      <span className="text-white font-semibold text-base flex items-center gap-2 border-2 border-white px-6 py-2.5 rounded-full bg-black/30 backdrop-blur-sm">
                        View All
                        <BiChevronRight size={20} />
                      </span>
                    </div>
                  </Link>
               )
            }

            return (
              <Link
                href={`/industry/${industry.slug}`}
                key={industry.id}
                className="group rounded-xl overflow-hidden border border-gray-200 bg-red-50 hover:bg-red-100 hover:shadow-xl hover:shadow-[#cd2626]/5 transition-all duration-300"
              >
                <div className="aspect-4/3  overflow-hidden bg-gray-100">
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
                <div className="p-3 ">
                  <h3 className="font-semibold text-gray-900 flex justify-between items-center gap-1 group-hover:text-[#cd2626] transition-colors text-xs">
                    {industry?.name}

                    <BiChevronRight
                      size={18}
                      className="text-[#cd2626] opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1"
                    />
                  </h3>
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