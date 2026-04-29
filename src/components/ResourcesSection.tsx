import React from 'react'

const ResourcesSection = ({resources}:any) => {

    if (!resources || resources?.length === 0) return null;

    return (
        <div className="bg-gray-50 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    <div className="lg:w-2/5">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-snug">Resources to stay ahead</h2>
                    </div>

                    <div className="lg:w-3/5 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                        {resources.map((res: any, i: any) => (
                            <div key={i} className="p-4 sm:p-5 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                <h3 className="font-semibold text-lg sm:text-xl text-gray-900 mb-2">{res.title}</h3>

                                <p className="text-gray-600 text-sm sm:text-base mt-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: res.description }} />

                                <a href={res.file} target="_blank" className="text-[#cd2626] text-sm sm:text-base mt-3 inline-block font-medium hover:underline">
                                    Check Documents →
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

}

export default ResourcesSection