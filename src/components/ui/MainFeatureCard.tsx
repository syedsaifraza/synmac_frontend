'use '

import Link from 'next/link'
import broken from "../../assets/images.png"

const MainFeatureCard = ({ title, slug, description, image, link }: any) => {
  return (
    <div className="lg:w-3/5 bg-white rounded-lg  border-gray-200 overflow-hidden grid md:grid-cols-2 group">




      <div className=" overflow-hidden">
        <img
          src={image ? image : broken.src}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 duration-300"
        />
      </div>


      <div className="p-7 flex flex-col justify-between">

        <div>



          <Link href={link}>
            <h2 className="text-2xl font-bold mt-3 leading-snug hover:text-[#b62126] transition">
              {title}
            </h2>
          </Link>

          <p className="text-gray-600 mt-5 text-sm leading-7 line-clamp-5">
            {description}
          </p>

        </div>

        <Link
          href={link}
          className="mt-8 w-fit text-sm font-semibold border-b-2 border-[#b62126] hover:pr-2 duration-300  group-hover:translate-x-2"
        >
          Read Full Story →
        </Link>

      </div>



    </div>
  )
}

export default MainFeatureCard