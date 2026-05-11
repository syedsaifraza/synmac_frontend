import React from 'react'

const About_Soluctions = ({
    heading,
    description,
    sub_heading,
    sub_descriptiion,
    image
}: {
    heading: string,
    description: string,
    sub_heading: string,
    sub_descriptiion: string,
    image: string
}) => {
    return (
        <div className="text-black py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">

               
                <h2 className="text-3xl font-semibold mb-4">
                    {heading}
                </h2>

              
                <div
                    className="text-gray-600 text-base sm:text-lg mb-8"
                    dangerouslySetInnerHTML={{ __html: description || "" }}
                />

              
               <div className="bg-white">

    <div className="space-y-3">

        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
            {sub_heading}
        </h3>

        {image && (
            <img
                src={image}
                alt="feature"
                className="
                    float-none 
                    md:float-right
                    w-full 
                    md:w-1/2
                    h-60 
                    sm:h-72
                    object-cover 
                    rounded-lg 
                    mb-4 
                    md:ml-6
                "
            />
        )}

        <div
            className="text-gray-600 text-sm sm:text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: sub_descriptiion || "" }}
        />

        <div className="clear-both"></div>

    </div>

</div>
            </div>
        </div>
    )
}

export default About_Soluctions