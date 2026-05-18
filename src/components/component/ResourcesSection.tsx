
'use client'
import { useState } from "react";

const ResourcesSection = ({ resources }: any) => {

    if (!resources || resources?.length === 0) return null;

    const [showMore, setShowMore] = useState(false);

    const displayedResources = showMore ? resources : resources.slice(0, 4);

    const toggleShowMore = () => {
        setShowMore(!showMore);
    }

    return (
        <div className="bg-gray-200 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    <div className="lg:w-2/5">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-snug">Resources to stay ahead</h2>
                    </div>

                    <div className="lg:w-3/5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                            {displayedResources.map((res: any, i: number) => (
                                <div key={i} className="p-4 sm:p-5 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                    <h3 className="font-semibold text-md md:text-md text-gray-900 mb-2">{res.title}</h3>

                                    <p className="text-gray-600 text-sm mt-2 fonts leading-relaxed" 
                                       dangerouslySetInnerHTML={{ __html: res.description || "" }} />

                                    {res.file && (
                                        <a href={res.file} 
                                           target="_blank" 
                                           rel="noopener noreferrer"
                                           className="text-[#cd2626] text-sm sm:text-base mt-3 inline-block font-medium hover:underline">
                                            Check Documents →
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>

                      
                        {resources.length > 4 && (
                            <div className="flex  mt-8">
                                <button
                                    onClick={toggleShowMore}
                                    className="px-6 py-2 bg-[#b62126] text-white rounded-md hover:bg-[#8f1a1f] transition-colors text-sm font-medium"
                                >
                                    {showMore ? "Show Less" : `Show More (${resources.length - 4} more)`}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResourcesSection;