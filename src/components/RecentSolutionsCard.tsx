import Link from 'next/link';
import { useState } from 'react'
import { IoIosArrowRoundForward } from 'react-icons/io';

const RecentSolutionsCard = ({industoryData}:any) => {

    const [showAll, setShowAll] = useState(false);

    if (!industoryData?.sub_industry || industoryData?.sub_industry?.length === 0) return null;

    const visibleData = showAll ? industoryData?.sub_industry : industoryData?.sub_industry.slice(0, 3);
    return (
        <div className="bg-[#333737] text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-6 sm:mb-8 lg:mb-10">
                    Recent Industries
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {visibleData.map((item: any, i: any) => (
                        <div key={i} className="bg-[#333737] overflow-hidden group">
                            <img src={item.image} alt={item.name} className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition duration-500" />
                            <div className="py-4 sm:py-6 flex justify-between items-start gap-4">
                                <div className="flex-1">
                                    <Link href={`/industry/${industoryData.slug}/${industoryData.id}/${item.slug}/${item.id}`} className="text-lg sm:text-xl font-semibold hover:text-gray-300 transition">
                                        {item.name}
                                    </Link>
                                    <p className="text-gray-300 text-sm sm:text-base mt-2 line-clamp-3 overflow-hidden">
                                        {item.description}
                                    </p>
                                </div>
                                <div className="bg-[#cd2626] w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-xl sm:text-2xl shrink-0 group-hover:translate-x-1 transition">
                                    <IoIosArrowRoundForward />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default RecentSolutionsCard
