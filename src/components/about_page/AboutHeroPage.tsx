import Link from 'next/link'
import React from 'react'

const AboutHeroPage = ({ HeroPage }: any) => {
    return (
        <section className="relative h-screen flex items-center overflow-hidden ">



            <div

                className={`absolute inset-0 transition-opacity duration-1000 `}
            >
                <img
                    src={HeroPage?.content?.br_image_url || null}
                    className="w-full h-full object-cover hero-zoom"
                    width={1920}
                    height={1080}
                    loading="eager"

                />
            </div>





            <div className="absolute inset-0   bg-[linear-gradient(to_right,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.6)_30%,rgba(0,0,0,0.3)_45%,rgba(0,0,0,0.3)_50%)] z-1" />


            <div className="relative z-10  h-full container mx-auto max-w-6xl">
                <div className="max-w-4xl absolute bottom-20 animate-fade-in-up">
                    <div dangerouslySetInnerHTML={{ __html: HeroPage?.content?.title || "" }} className="font-display ql-editor " />

                    {/* <div dangerouslySetInnerHTML={{ __html: HeroPage?.content?.subtitle || "" }} className="font-display ql-editor " /> */}




                    <div dangerouslySetInnerHTML={{ __html: HeroPage?.content?.description || "" }} className="text-white/80 text-sm sm:text-base md:text-lg fonts ql-editor  mb-6 sm:mb-8 md:mb-10 leading-relaxed ql-editor line-clamp-5 overflow-hidden overflow-scroll-none"

                    />

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">



                        <Link
                            href="/contact-us"
                            className="px-6 sm:px-8 py-3 sm:py-3.5 bg-[#cd2626] text-white rounded-lg  hover:bg-[#b32020] transition-colors text-center font-500 text-sm sm:text-base"
                        >
                            Contact Us
                        </Link>


                    </div>
                </div>
            </div>




        </section>
    )
}

export default AboutHeroPage
