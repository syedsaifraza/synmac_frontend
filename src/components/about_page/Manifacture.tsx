// import React from 'react'

// const Manifacture = ({ manifacture }: any) => {
//   return (

//     <div className="border">

//       <div
//         dangerouslySetInnerHTML={{ __html: manifacture?.content?.title || "" }}
//         className="ql-editor text-sm sm:text-base text-gray-700 leading-relaxed mb-2"
//       />


//       <div
//         dangerouslySetInnerHTML={{ __html: manifacture?.content?.subtitle || "" }}
//         className="ql-editor text-sm sm:text-base text-gray-700 leading-relaxed mb-3"
//       />
//       <div className='flex justify-center items-center border'>

//     <img src={"./Hexagon.png"} alt="image" className='w-full' />

//       </div>


//       <h1 onClick={() => console.log(manifacture)}>{manifacture?.content?.title}</h1>

//         {
//           manifacture?.content?.section_item?.map((item: any, index: number) => (
//             <div>

//               <h2>{item?.title}</h2>
//               <p>{item?.number}</p>
//               <img src={item?.icon_url} alt="image" />



//             </div>
//           ))}

//     </div>
//   )
// }

// export default Manifacture


'use client'

import React, { useEffect, useState } from 'react'

const Manifacture = ({ manifacture }: any) => {

  const [items, setItems] = useState({
    item1: manifacture?.content?.section_item[0],
    item2: manifacture?.content?.section_item[1],
    item3: manifacture?.content?.section_item[2],
    item4: manifacture?.content?.section_item[3],
    item5: manifacture?.content?.section_item[4],
    item6: manifacture?.content?.section_item[5],

  })


  useEffect(() => {
    setItems({
      item1: manifacture?.content?.section_item[0],
      item2: manifacture?.content?.section_item[1],
      item3: manifacture?.content?.section_item[2],
      item4: manifacture?.content?.section_item[3],
      item5: manifacture?.content?.section_item[4],
      item6: manifacture?.content?.section_item[5],

    })
  }, [manifacture])
  return (

    <div className="bg-gray-50 py-10">

      <div
        dangerouslySetInnerHTML={{ __html: manifacture?.content?.title || "" }}
        className="ql-editor text-sm sm:text-base text-gray-700 leading-relaxed mb-2"
      />


      <div
        dangerouslySetInnerHTML={{ __html: manifacture?.content?.subtitle || "" }}
        className="ql-editor text-sm sm:text-base text-gray-700 leading-relaxed mb-3"
      />
      <div className='flex justify-center items-center  relative'>

        <img src={"./Hexagon.png"} alt="image" className='w-full brightness-98' />
        <div className=' flex flex-col items-center justify-center absolute left-53.5 top-75'>

          <h1 className='font-bold text-5xl'>{items?.item1?.number}</h1>
          <img src={items?.item1?.icon_url} alt="image" className='w-20' />
          <h1 className='font-bold text-2xl'>{items?.item1?.title}</h1>
        </div>


        <div className=' flex flex-col items-center justify-center absolute left-53.5 top-150'>

          <h1 className='font-bold text-5xl'>{items?.item1?.number}</h1>
          <img src={items?.item1?.icon_url} alt="image" className='w-20' />
          <h1 className='font-bold text-2xl'>{items?.item1?.title}</h1>
        </div>

        <div className=' flex flex-col items-center justify-center absolute left-122 top-113'>

          <h1 className='font-bold text-5xl'>{items?.item1?.number}</h1>
          <img src={items?.item1?.icon_url} alt="image" className='w-20' />
          <h1 className='font-bold text-2xl'>{items?.item1?.title}</h1>
        </div>

        <div className=' flex flex-col items-center justify-center absolute left-122 top-35'>

          <h1 className='font-bold text-5xl'>{items?.item1?.number}</h1>
          <img src={items?.item1?.icon_url} alt="image" className='w-20' />
          <h1 className='font-bold text-2xl'>{items?.item1?.title}</h1>
        </div>


        <div className=' flex flex-col items-center justify-center absolute right-58 top-75'>

          <h1 className='font-bold text-5xl'>{items?.item1?.number}</h1>
          <img src={items?.item1?.icon_url} alt="image" className='w-20' />
          <h1 className='font-bold text-2xl'>{items?.item1?.title}</h1>
        </div>


        <div className=' flex flex-col items-center justify-center absolute right-58 top-150'>

          <h1 className='font-bold text-5xl'>{items?.item1?.number}</h1>
          <img src={items?.item1?.icon_url} alt="image" className='w-20' />
          <h1 className='font-bold text-2xl'>{items?.item1?.title}</h1>
        </div>




      </div>



    </div>
  )
}

export default Manifacture
