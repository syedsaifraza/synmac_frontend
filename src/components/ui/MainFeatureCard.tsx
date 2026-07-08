'use '

import Link from 'next/link'
import broken from "../../assets/images.png"

const MainFeatureCard = ({ title, slug, description, image, link }: any) => {
  return (
    <div className="lg:w-3/5 bg-white rounded-lg  border-gray-200 overflow-hidden grid md:grid-cols-2 group">




      <div className=" overflow-hidden  h-full flex justify-center items-center border-gray-100 ">
        <img
          src={image ? image : broken.src}
          alt={title}
          className="object-cover aspect-square group-hover:scale-105 duration-300"
        />
      </div>


      <div className="p-5 flex flex-col relative">

       



          <Link href={link}>
            <h2 className="text-xl line-clamp-4 font-bold  leading-snug hover:text-[#b62126] transition">
              {title}
            </h2>
          </Link>

          <p className="text-gray-600 text-sm leading-6 line-clamp-7">
            {description}
          </p>

       

        <Link
          href={link}
          className=" absolute bottom-3 w-fit text-sm font-semibold border-b-2 border-[#b62126] hover:pr-2 duration-300  group-hover:translate-x-2"
        >
          Read Full Story →
        </Link>

      </div>



    </div>
  )
}

export default MainFeatureCard