import React from 'react'

const About_Soluctions = (
    {
        heading,
        description,
        sub_heading,
        sub_descriptiion,
        image }:
        {
            heading: string,
            description: string,
            sub_heading: string,
            sub_descriptiion: string,
            image: string
        }) => {
    return (
        <div className="text-black py-12 sm:py-16 lg:py-15 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-3 sm:mb-4">{heading}</h2>

                <div
                    className="text-gray-600 text-base sm:text-lg mb-6 sm:mb-8"
                    dangerouslySetInnerHTML={{ __html: description }}
                />


                <div className="bg-white overflow-hidden">
                    <div className="flex flex-col md:flex-row gap-6 md:gap-10 ">
                        <div className="flex-1 space-y-3">
                            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">{sub_heading}</h3>
                            <div
                                className="text-gray-600  text-sm sm:text-base leading-relaxed"

                                dangerouslySetInnerHTML={{ __html: sub_descriptiion }}

                                

                            >
                                
                            </div>

                            

                        </div>
                        {
                            image && (
                                <div className="md:w-1/2">
                                    <img src={image} alt="feature" className="w-full h-60 sm:h-75 object-cover rounded-sm" />
                                </div>
                            )
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default About_Soluctions