'use client'
import Link from 'next/link';
import { IoIosArrowRoundForward } from 'react-icons/io';

const SubIndustries = ({ industry }: any) => {

  if (!industry || industry.length === 0) return null;

  return (
    <div className="bg-[#2f3333] text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <h2 className="text-3xl font-semibold mb-10 tracking-tight">
          Related Sub Industries
        </h2>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industry.map((item: any, i: number) => {

            const url = `/industry/${item.industry_slug}/${item.slug}`;

            return (
              <Link
                key={i}
                href={url}
                className="group block  rounded-xl overflow-hidden  transition"
              >

              
                <div className="h-52 overflow-hidden">
                  <img
                    src={item.feature_file_link}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>

             
                <div className="p-5 flex items-start gap-4">
 
              
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-gray-300 transition">
                      {item.name}
                    </h3>

                    <p
                      dangerouslySetInnerHTML={{
                        __html: item.hero_background_description || ""
                      }}
                      className="text-gray-400 text-sm line-clamp-3"
                    />
                  </div>

                  {/* Arrow */}
                  <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#cd2626] shrink-0 mt-1 group-hover:translate-x-1 transition">
                    <IoIosArrowRoundForward className="text-xl text-white" />
                  </div>

                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}

export default SubIndustries