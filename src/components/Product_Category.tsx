



'use client'
import React, { useState } from 'react'
import { LiaAngleDownSolid, LiaAngleUpSolid } from 'react-icons/lia';

const Product_Category = ({ Resources }: any) => {




    function ResourcesSection() {


        if (!Resources || Resources?.length === 0) return null;

        return (
            <div className="bg-gray-100 py-16">
                <div className=" flex flex-row gap-10 max-w-6xl mx-auto">
                    <div className="flex items-center justify-center w-2/5">
                        <h2 className="text-3xl font-semibold leading-snug">Resources to stay ahead</h2>
                    </div>

                    <div className="space-y-8 border-l pl-6 grid grid-cols-2 w-full gap-4">
                        {Resources.map((res: any, i: any) => (
                            <div key={i} className="p-2">
                                <h3 className="font-semibold text-xl">{res.title}</h3>
                                <p dangerouslySetInnerHTML={{ __html: res.description }} className="text-gray-600 text-md mt-2" />
                                <a href={res.file} target="_blank" className="text-blue-600 text-sm mt-2 inline-block">
                                    Check Documents →
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div>
            {ResourcesSection()}
          
        </div>
    )
}

export default Product_Category