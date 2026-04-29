'use client';

import Image from 'next/image';
import Link from 'next/link';
import { LiaAngleRightSolid } from 'react-icons/lia';

export default function Header({ title, description, background_image, }: { title: string, description: string, background_image: string ,   }) {
  return (

    <>





      <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] bg-cover bg-no-repeat bg-center flex items-center"
        style={{ backgroundImage: `url(${background_image})` }} >



        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 px-4 sm:px-6 lg:px-0 max-w-6xl mx-auto w-full text-white ">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              {title}
            </h1>
            <p dangerouslySetInnerHTML={{ __html: description }} className="mt-4 text-lg md:text-xl" />
          </div>
        </div>



      </div>

      
    </>

  );
}



