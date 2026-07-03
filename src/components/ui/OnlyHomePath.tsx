import Link from 'next/link'
import React from 'react'
import { LiaAngleRightSolid } from 'react-icons/lia'

const OnlyHomePath = ({text}:any) => {
  return (
    <div>
        <div className="border-b border-gray-200 py-3 sm:py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-row gap-1 items-center max-w-6xl mx-auto font-medium text-sm sm:text-base">
          <Link href="/" className="hover:text-[#cd2626] transition">
            Home
          </Link>
          <LiaAngleRightSolid size={12} />
          <h1 className="text-gray-600">{text}</h1>
        </div>
      </div>
    </div>
  )
}

export default OnlyHomePath