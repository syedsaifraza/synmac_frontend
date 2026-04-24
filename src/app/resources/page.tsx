import React from 'react'

const page = () => {
    return (
        <div>
            <div className="relative bg-gray-900 text-white">
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src={"https://t4.ftcdn.net/jpg/05/62/04/33/360_F_562043376_4luub0cBrqZh2FfffBmRorfRDfIPYoHm.jpg"}
                        alt={"Resources Hero"}
                        className="w-full h-full object-cover opacity-40"
                    />
                </div>
                {/* Hero inner container with uniform padding */}
                <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
                    <div className="max-w-3xl">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-3 sm:mb-4">
                            Resources for Smarter Chemical Solutions
                        </h1>
                        <p className="text-gray-200 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">
                          Access detailed guides, product information, and industry knowledge to help you understand, use, and choose the right chemical solutions for your business.
                        </p>
                       
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page