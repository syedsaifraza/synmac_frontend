'use client'

import React, { useEffect, useState } from 'react'

const Manifacture = ({ manifacture }: any) => {

  const [items, setItems] = useState({
    item1: manifacture?.content?.section_item?.[0],
    item2: manifacture?.content?.section_item?.[1],
    item3: manifacture?.content?.section_item?.[2],
    item4: manifacture?.content?.section_item?.[3],
    item5: manifacture?.content?.section_item?.[4],
    item6: manifacture?.content?.section_item?.[5],
  })

  useEffect(() => {
    setItems({
      item1: manifacture?.content?.section_item?.[0],
      item2: manifacture?.content?.section_item?.[1],
      item3: manifacture?.content?.section_item?.[2],
      item4: manifacture?.content?.section_item?.[3],
      item5: manifacture?.content?.section_item?.[4],
      item6: manifacture?.content?.section_item?.[5],
    })
  }, [manifacture])

  return (
    <div className="bg-gray-50 py-10">

      {/* TITLE */}
      <div
        dangerouslySetInnerHTML={{
          __html: manifacture?.content?.title || '',
        }}
        className="ql-editor text-sm sm:text-base text-gray-700 leading-relaxed mb-2"
      />

      {/* SUBTITLE */}
      <div
        dangerouslySetInnerHTML={{
          __html: manifacture?.content?.subtitle || '',
        }}
        className="ql-editor text-sm sm:text-base text-gray-700 leading-relaxed mb-3"
      />

      {/* HEXAGON CONTAINER */}
      <div className="relative flex justify-center items-center w-full">

        {/* HEXAGON IMAGE */}
        <img
          src="/Hexagon.png"
          alt="Hexagon"
          className="w-full h-auto brightness-98"
        />

        {/* ================= ITEM 1 ================= */}
        <div
          className="
            absolute
            left-48
            top-75
            w-[210px]
            flex flex-col
            items-center
            justify-center
            text-center
            overflow-hidden
          "
        >
          <h1 className="font-bold text-5xl leading-none">
            {items?.item1?.number}
          </h1>

          <img
            src={items?.item1?.icon_url}
            alt="icon"
            className="w-16 h-16 object-contain my-1"
          />

          <h1
            className="
              font-bold
              text-2xl
              leading-tight
              max-w-[210px]
              break-words
              [overflow-wrap:anywhere]
            "
          >
            {items?.item1?.title}
          </h1>
        </div>

        {/* ================= ITEM 2 ================= */}
        <div
          className="
            absolute
            left-48
            top-150
            w-[210px]
            flex flex-col
            items-center
            justify-center
            text-center
            overflow-hidden
          "
        >
          <h1 className="font-bold text-5xl leading-none">
            {items?.item2?.number}
          </h1>

          <img
            src={items?.item2?.icon_url}
            alt="icon"
            className="w-16 h-16 object-contain my-1"
          />

          <h1
            className="
              font-bold
              text-2xl
              leading-tight
              max-w-[210px]
              break-words
              [overflow-wrap:anywhere]
            "
          >
            {items?.item2?.title}
          </h1>
        </div>

        {/* ================= ITEM 3 ================= */}
        <div
          className="
            absolute
            left-116
            top-113
            w-[210px]
            flex flex-col
            items-center
            justify-center
            text-center
            overflow-hidden
          "
        >
          <h1 className="font-bold text-5xl leading-none">
            {items?.item3?.number}
          </h1>

          <img
            src={items?.item3?.icon_url}
            alt="icon"
            className="w-16 h-16 object-contain my-1"
          />

          <h1
            className="
              font-bold
              text-2xl
              leading-tight
              max-w-[210px]
              break-words
              [overflow-wrap:anywhere]
            "
          >
            {items?.item3?.title}
          </h1>
        </div>

        {/* ================= ITEM 4 ================= */}
        <div
          className="
            absolute
            left-116
            top-35
            w-[210px]
            flex flex-col
            items-center
            justify-center
            text-center
            overflow-hidden
          "
        >
          <h1 className="font-bold text-5xl leading-none">
            {items?.item4?.number}
          </h1>

          <img
            src={items?.item4?.icon_url}
            alt="icon"
            className="w-16 h-16 object-contain my-1"
          />

          <h1
            className="
              font-bold
              text-2xl
              leading-tight
              max-w-[210px]
              break-words
              [overflow-wrap:anywhere]
            "
          >
            {items?.item4?.title}
          </h1>
        </div>

        {/* ================= ITEM 5 ================= */}
        <div
          className="
            absolute
            right-52
            top-75
            w-[210px]
            flex flex-col
            items-center
            justify-center
            text-center
            overflow-hidden
          "
        >
          <h1 className="font-bold text-5xl leading-none">
            {items?.item5?.number}
          </h1>

          <img
            src={items?.item5?.icon_url}
            alt="icon"
            className="w-16 h-16 object-contain my-1"
          />

          <h1
            className="
              font-bold
              text-2xl
              leading-tight
              max-w-[210px]
              break-words
              [overflow-wrap:anywhere]
            "
          >
            {items?.item5?.title}
          </h1>
        </div>

        {/* ================= ITEM 6 ================= */}
        <div
          className="
            absolute
            right-52
            top-150
            w-[210px]
            flex flex-col
            items-center
            justify-center
            text-center
            overflow-hidden
          "
        >
          <h1 className="font-bold text-5xl leading-none">
            {items?.item6?.number}
          </h1>

          <img
            src={items?.item6?.icon_url}
            alt="icon"
            className="w-16 h-16 object-contain my-1"
          />

          <h1
            className="
              font-bold
              text-2xl
              leading-tight
              max-w-[210px]
              break-words
              [overflow-wrap:anywhere]
            "
          >
            {items?.item6?.title}
          </h1>
        </div>

      </div>
    </div>
  )
}

export default Manifacture