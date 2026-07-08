import Link from 'next/link'
import React from 'react'
import broken from "../../assets/images.png"

const CardFeature = ({url,image,title,index,description,line='line-clamp-2'}:any) => {
  return (
   <Link
          href={url}
          key={index}
          className={`flex h-30 items-center  bg-white rounded-lg group overflow-hidden hover:bg-gray-50 transition border border-gray-200
          ${index !== 2 ? "border" : ""}
          flex-1`}
        >

           
    <div className="w-40 h-full  overflow-hidden shrink-0">
            <img
               src={image ? image : broken.src}
              alt={title}
              className="w-full h-full object-cover hover:scale-110 duration-300"
            />
          </div>
               

      

        
          <div className="flex flex-col flex-1 p-3 space-y-2">

            

              <h3 className="font-semibold text-sm  hover:text-[#b62126] transition line-clamp-2">
                {title}
              </h3>

              <p className={`text-xs text-gray-500 ${line}`}>
                {description}
              </p>

          
            <span className="text-[#b62126] group-hover:translate-x-2 duration-300 text-xs font-semibold">
              Read More →
            </span>

          </div>

        </Link>
  )
}

export default CardFeature