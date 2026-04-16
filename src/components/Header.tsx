'use client';

import Image from 'next/image';
import Img from "../assets/hero-bg.jpg"

export default function Header({ title }: { title: string }) {
  return (
    <div className="w-full">      
      <div className="relative w-full h-100">
      
        <Image
          src={Img}
          alt="Agriculture"
          fill
          className="object-cover"
          priority
        />

       
        <div className="absolute inset-0 bg-black/40" />

     
        <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-20 text-white max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          {title}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200">
            Growing together
          </p>
        </div>
      </div>

     
      {/* <div className="flex flex-wrap justify-between items-center px-6 md:px-20 py-4 bg-gray-100 text-sm">
        
        <div className="flex gap-6">
          <span className="cursor-pointer flex items-center gap-2 hover:text-red-500">
            📘 Applications
          </span>
          <span className="cursor-pointer flex items-center gap-2 hover:text-red-500">
            📦 Products
          </span>
          <span className="cursor-pointer flex items-center gap-2 hover:text-red-500">
            📄 Support
          </span>
        </div>

        <div className="flex gap-6 mt-2 md:mt-0">
          <span className="cursor-pointer hover:text-green-600">
            🌱 Sustainability
          </span>
          <span className="cursor-pointer hover:text-red-500">
            Product Technologies
          </span>
        </div>
      </div> */}
    </div>
  );
}