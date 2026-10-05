import Link from 'next/link'
import React from 'react'

const WhoWeAre = ({whoWeAre}:any) => {
  return (
     <div className="w-full bg-white text-black pb-10" >
            <div className="">
    
    
              <div
                dangerouslySetInnerHTML={{ __html: whoWeAre?.content?.title || "" }}
                className=" ql-editor"
              />
    
    
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 ">
    
    
                <div className="flex flex-col relative ">
    
                  <div
                    dangerouslySetInnerHTML={{ __html: whoWeAre?.content?.subtitle || "" }}
                    className="ql-editor"
                  />
    
    
                  <div
                    dangerouslySetInnerHTML={{ __html: whoWeAre?.content?.description || "" }}
                    className=" ql-editor line-clamp-12"
                  />
    
                  <div className="mt-8 absolute bottom-0 left-0">
                    <Link href="/product" className="bg-[#cd2626] hover:bg-[#b01f1f] text-white text-sm sm:text-base font-medium px-6 sm:px-8 py-3 rounded-full transition-colors duration-300">
                      View Products
                    </Link>
                  </div>
                </div>
    
    
                <div className="flex justify-center lg:justify-end">
                  <div className="w-full max-w-md lg:max-w-none rounded-md overflow-hidden">
                    <img
                      src={whoWeAre?.content?.br_image_url || "https://via.placeholder.com/600x700"}
                      alt="Who We Are"
                      className="w-full max-h-100 object-cover"
                    />
                  </div>
                </div>
    
              </div>
            </div>
          </div>
  )
}

export default WhoWeAre
