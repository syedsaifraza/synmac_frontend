'use client'
import React, { useEffect, useState } from 'react'
import Logo from "../../public/favicon.png"
import Image from 'next/image';
import { BiSearch } from 'react-icons/bi';
import { FaAngleRight } from 'react-icons/fa';
import { RxTriangleRight } from "react-icons/rx";
import { IoClose } from 'react-icons/io5';
import { HiMenuAlt3 } from 'react-icons/hi';
import { MdArrowBack } from 'react-icons/md';




const Navbar = ({ data1 }: any) => {



    const [activeData, setActiveData] = useState<any>(null)
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedIndustry, setSelectedIndustry] = useState<any>(null);
    const [showSubmarkets, setShowSubmarkets] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Set initial active data when data1 changes
    useEffect(() => {
        if (data1 && data1.length > 0) {
            setActiveData(data1[0]);
        }
    }, [data1]);

    const closeMenu = () => {
        setIsMenuOpen(false);
        setShowSubmarkets(false);
        setSelectedIndustry(null);
        if (data1 && data1.length > 0) {
            setActiveData(data1[0]);
        }
    }

    const handleIndustryClick = (industry: any) => {
        if (window.innerWidth < 768) {
            // Mobile view: show submarkets screen
            setSelectedIndustry(industry);
            setShowSubmarkets(true);
        } else {
            // Desktop view: just update active data
            setActiveData(industry);
        }
    }

    const handleBackToIndustries = () => {
        setShowSubmarkets(false);
        setSelectedIndustry(null);
    }

    // Don't render if data1 is not available
    if (!data1 || data1.length === 0) {
        return null;
    }

    return (
        <>
            <nav
                className={`fixed top-0 left-0  right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white  shadow-md sticky top-0" : `${isMenuOpen ? "bg-white text-black" : "bg-transparent text-white"}`
                    }`}
            >
                <div className={`flex flex-row items-center justify-between p-4 px-6 ${isMenuOpen && "border-b border-gray-200"}`}>
                    <div className='flex flex-row items-center gap-2 cursor-pointer'>
                        <Image src={Logo} alt="Logo" className="h-12 w-12" />
                        <span className="font-extrabold text-3xl text-[#cd2626]">SYNMAC</span>
                    </div>

                    {/* Desktop Navigation */}
                    <ul className={`hidden md:flex flex-row items-center gap-6 text-[16px] font-medium  ${!scrolled && !isMenuOpen ? "" : "text-gray-700"}`}>
                        <li className="relative group cursor-pointer">
                            <span onClick={() => { isMenuOpen ? closeMenu() : setIsMenuOpen(!isMenuOpen) }}>Industries</span>
                            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#cd2626] transition-all duration-300 group-hover:w-full"></span>
                        </li>
                        <li className="relative group cursor-pointer">
                            <span>Products</span>
                            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#cd2626] transition-all duration-300 group-hover:w-full"></span>
                        </li>
                        <li className="relative group cursor-pointer">
                            <span>Resources</span>
                            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#cd2626] transition-all duration-300 group-hover:w-full"></span>
                        </li>
                        <a href='/about-us' className="relative group cursor-pointer">
                            <span>About us</span>
                            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#cd2626] transition-all duration-300 group-hover:w-full"></span>
                        </a>
                        <a href='/contact-us' className="relative group cursor-pointer">
                            <span>Contact us</span>
                            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#cd2626] transition-all duration-300 group-hover:w-full"></span>
                        </a>
                        <li className="relative group cursor-pointer">
                            <BiSearch className="text-xl" />
                        </li>
                    </ul>

                    {/* Mobile Hamburger Menu */}
                    <div className="md:hidden">
                        {!isMenuOpen ? (
                            <HiMenuAlt3
                                className={`text-2xl cursor-pointer ${!scrolled && !isMenuOpen ? "text-white" : "text-gray-700"}`}
                                onClick={() => setIsMenuOpen(true)}
                            />
                        ) : (
                            <IoClose
                                className="text-2xl cursor-pointer text-gray-700"
                                onClick={() => closeMenu()}
                            />
                        )}
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                {isMenuOpen && (
                    <div className="md:hidden fixed inset-0 top-18 bg-white z-40">
                        <div className="h-full relative overflow-hidden">
                            {/* Industries Screen */}
                            <div
                                className={`absolute top-0 left-0 w-full h-full transition-transform duration-300 ease-in-out ${showSubmarkets ? '-translate-x-full' : 'translate-x-0'
                                    }`}
                            >
                                <div className="p-4">
                                    <h2 className="text-xl font-bold text-gray-800 mb-4 px-2">Industries</h2>
                                    <ul className="flex flex-col gap-2">
                                        {data1.map((item: any) => (
                                            <li
                                                key={item.id}
                                                onClick={() => handleIndustryClick(item)}
                                                className="group rounded-xl py-3 px-4 cursor-pointer transition-all duration-200 hover:bg-[#cd2626]/10"
                                            >
                                                <div className="flex flex-row justify-between items-center">
                                                    <span className="font-medium text-base text-gray-700 group-hover:text-[#cd2626]">
                                                        {item.name}
                                                    </span>
                                                    <FaAngleRight className="text-sm text-gray-400 group-hover:text-[#cd2626] group-hover:translate-x-1 transition-all" />
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Submarkets Screen */}
                            <div
                                className={`absolute top-0 left-0 w-full h-full transition-transform duration-300 ease-in-out ${showSubmarkets ? 'translate-x-0' : 'translate-x-full'
                                    }`}
                            >
                                {selectedIndustry && (
                                    <div className="h-full overflow-y-auto">
                                        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center gap-4">
                                            <MdArrowBack
                                                className="text-2xl cursor-pointer text-[#cd2626]"
                                                onClick={handleBackToIndustries}
                                            />
                                            <h2 className="text-xl font-bold text-gray-800 cursor-pointer hover:text-gray-900">
                                                <a
                                                    href={`/industory/${selectedIndustry.slug}/${selectedIndustry.id}`}>
                                                    {selectedIndustry.name}
                                                </a>

                                            </h2>
                                        </div>
                                        <div className="p-4">
                                            <p className="text-gray-500 text-sm mb-4 px-2">
                                                {selectedIndustry.sub_industry?.length || 0} Sub-markets
                                            </p>
                                            <div className="flex flex-col gap-3">
                                                {selectedIndustry?.sub_industry?.map((subMarket: any) => (
                                                    <div
                                                        key={subMarket.id}
                                                        className="bg-gray-50 rounded-xl p-4 hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100"
                                                    >
                                                        <div className="flex items-start justify-between mb-2">
                                                            <h3 className="text-lg font-bold text-[#cd2626]">
                                                                {subMarket.subMarketName}
                                                            </h3>
                                                            <div className="w-8 h-8 rounded-full bg-[#cd2626]/10 flex items-center justify-center">
                                                                <RxTriangleRight className="text-[#cd2626] text-sm" />
                                                            </div>
                                                        </div>
                                                        <p className="text-gray-600 text-sm leading-relaxed">
                                                            {subMarket.description}
                                                        </p>
                                                    </div>
                                                ))}
                                                {(!selectedIndustry?.sub_industry || selectedIndustry.sub_industry.length === 0) && (
                                                    <div className="text-center py-8 text-gray-500">
                                                        No sub-markets available for this industry
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Desktop Dropdown Menu */}
                {isMenuOpen && window.innerWidth >= 768 && activeData && (
                    <div className="hidden md:flex h-[calc(100vh-73px)] bg-white text-black shadow-xl">
                        <div className='w-1/3 border-r border-gray-100 bg-gray-50/30 overflow-y-auto'>
                            <ul className="flex flex-col gap-1 p-4">
                                {data1.reverse().map((item: any) => (
                                    <li
                                        onMouseEnter={() => setActiveData(item)}
                                        key={item.id}
                                        className={`group rounded-xl py-2 px-4 cursor-pointer transition-all duration-200 
                                            ${activeData?.id === item.id
                                                ? "bg-[#cd2626]/20 text-[#cd2626]"
                                                : "hover:bg-[#cd2626]/10 text-gray-700 hover:text-[#cd2626]"
                                            }`}
                                    >
                                        <div className="flex flex-row justify-between items-center">
                                            <span className="font-medium text-base">{item.name}</span>
                                            <FaAngleRight className={`text-sm transition-transform duration-200 
                                                ${activeData?.id === item.id
                                                    ? "translate-x-1 text-[#cd2626]"
                                                    : "group-hover:translate-x-1"
                                                }`}
                                            />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="w-2/3 overflow-y-auto">
                            <div className="p-4">
                                <div className='border-b border-gray-200 flex flex-row justify-between items-center mb-6 pb-4'>
                                    <div>
                                       
                                            <h2 className="text-xl font-bold text-gray-600 cursor-pointer hover:text-gray-900">
                                                <a
                                                    href={`/industory/${activeData?.slug}/${activeData?.id}`}>
                                                    {activeData?.name}
                                                </a>

                                            </h2>
                                          
                                       
                                        <p className="text-gray-500 text-sm">
                                            • {activeData?.sub_industry?.length || 0} Sub-markets
                                        </p>
                                    </div>
                                    <div>
                                        <IoClose className='cursor-pointer' onClick={() => closeMenu()} size={30} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {activeData?.sub_industry?.map((subMarket: any) => (
                                        <div
                                            key={subMarket.id}
                                            className="group bg-gray-50 rounded-xl p-5 hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 hover:border-[#cd2626]/20"
                                        >
                                            <div className="flex items-start justify-between mb-3">
                                                <h3 className="text-lg font-bold text-[#cd2626] transition-colors">
                                                    {subMarket.name}
                                                </h3>
                                                <div className="w-8 h-8 rounded-full bg-[#cd2626]/10 flex items-center justify-center group-hover:bg-[#cd2626] transition-colors">
                                                    <RxTriangleRight className="text-[#cd2626] group-hover:text-white text-sm" />
                                                </div>
                                            </div>
                                            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                                {subMarket.description}
                                            </p>
                                        </div>
                                    ))}
                                    {(!activeData?.sub_industry || activeData.sub_industry.length === 0) && (
                                        <div className="col-span-2 text-center py-8 text-gray-500">
                                            No sub-markets available for this industry
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </nav>


        </>
    )
}

export default Navbar