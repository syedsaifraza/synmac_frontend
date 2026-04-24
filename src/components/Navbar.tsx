'use client'
import React, { useEffect, useState, useRef } from 'react'
import Logo from "../../public/favicon.png"
import Image from 'next/image';
import { BiSearch } from 'react-icons/bi';
import { FaAngleRight } from 'react-icons/fa';
import { RxTriangleRight } from "react-icons/rx";
import { IoClose } from 'react-icons/io5';
import { HiMenuAlt3 } from 'react-icons/hi';
import { MdArrowBack } from 'react-icons/md';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const Navbar = ({ data }: any) => {
    const router = useRouter();
    const pathname = usePathname();
    const [activeData, setActiveData] = useState<any>(null)
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedIndustry, setSelectedIndustry] = useState<any>(null);
    const [showSubmarkets, setShowSubmarkets] = useState(false);
    const [activeSubIndustry, setActiveSubIndustry] = useState<any>(null);
    const [isHovering, setIsHovering] = useState(false);
    const hoverTimeoutRef = useRef<any>(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (data && data.length > 0) {
            setActiveData(data[0]);
            setActiveSubIndustry(data[0]?.sub_industry?.[0] || null);
        }
    }, [data]);

    useEffect(() => {
        closeMenu();
    }, [pathname]);

    const closeMenu = () => {
        setIsMenuOpen(false);
        setShowSubmarkets(false);
        setSelectedIndustry(null);
        if (data && data.length > 0) {
            setActiveData(data[0]);
        }
    }

    const handleIndustryClick = (industry: any) => {
        if (window.innerWidth < 768) {
            setSelectedIndustry(industry);
            setShowSubmarkets(true);
        } else {
            setActiveData(industry);
        }
    }

    const handleBackToIndustries = () => {
        setShowSubmarkets(false);
        setSelectedIndustry(null);
    }

    // Don't render if data is not available
    if (!data || data.length === 0) {
        return null;
    }

    useEffect(() => {
        const handleClickOutside = (e: any) => {
            if (!e.target.closest(".mega-menu")) {
                setIsMenuOpen(false);
                setIsHovering(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener("click", handleClickOutside);
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isMenuOpen]);

    // Handle hover for desktop dropdown
    const handleMouseEnter = () => {
        if (window.innerWidth >= 768) {
            if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
            }
            setIsHovering(true);
            setIsMenuOpen(true);
        }
    };

    const handleMouseLeave = () => {
        if (window.innerWidth >= 768) {
            hoverTimeoutRef.current = setTimeout(() => {
                setIsHovering(false);
                setIsMenuOpen(false);
            }, 200);
        }
    };

    // Handle navigation on click for mobile
    const handleIndustryNameClick = (industry: any) => {
        if (window.innerWidth < 768) {
            // On mobile, navigate to industry page
            router.push(`/industry/${industry.slug}/${industry.id}`);
            closeMenu();
        }
    };

    const handleSubIndustryNameClick = (subIndustry: any) => {
        if (window.innerWidth < 768) {
            // On mobile, navigate to sub-industry page
            router.push(`/industry/${selectedIndustry?.slug}/${selectedIndustry?.id}/${subIndustry.slug}/${subIndustry.id}`);
            closeMenu();
        }
    };

    const handleCategoryClick = (category: any) => {
        if (window.innerWidth < 768) {
            // On mobile, navigate to category page
            router.push(`/industry/${selectedIndustry?.slug}/${selectedIndustry?.id}/${activeSubIndustry?.slug}/${activeSubIndustry?.id}/${category.slug}/${category.id}`);
            closeMenu();
        }
    };

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300`}
            >
                <div className={` ${scrolled ? "bg-white shadow-md sticky top-0" : `${isMenuOpen ? "bg-white text-black" : "bg-transparent text-white"}`
                    }  ${isMenuOpen && "border-b border-gray-200"}`}>

                    {/* Navbar container with uniform padding */}
                    <div className={`flex flex-row mx-auto max-w-6xl items-center justify-between py-4`}>
                        <div className='flex flex-row items-center gap-2 cursor-pointer'>
                            <Link href={"/"} className='flex flex-row items-center'>
                                <Image src={Logo} alt="Logo" className="h-12 w-12" />
                                <span className="font-extrabold text-3xl text-[#cd2626]">SYNMAC</span>
                            </Link>
                        </div>

                        <ul className={`hidden md:flex flex-row items-center gap-6 text-[16px] font-medium ${!scrolled && !isMenuOpen ? "" : "text-gray-700"}`}>
                            <li
                                className="relative group cursor-pointer"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <span>Industries</span>
                                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#cd2626] transition-all duration-300 group-hover:w-full"></span>
                            </li>
                            <Link href="/product" className="relative group cursor-pointer">
                                <span>Products</span>
                                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#cd2626] transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                            <Link
                            href={"/resources"}
                             className="relative group cursor-pointer">
                                <span>Resources</span>
                                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#cd2626] transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                            <Link href='/about-us' className="relative group cursor-pointer">
                                <span>About us</span>
                                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#cd2626] transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                            <Link href='/contact-us' className="relative group cursor-pointer">
                                <span>Contact us</span>
                                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#cd2626] transition-all duration-300 group-hover:w-full"></span>
                            </Link>
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
                </div>
                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden fixed inset-0 top-0 bg-white z-50 overflow-y-auto">

                        {/* HEADER */}
                        <div className="flex items-center justify-between p-4 border-b">
                            <h2 className="text-xl font-bold">Menu</h2>
                            <IoClose
                                className="text-2xl cursor-pointer"
                                onClick={closeMenu}
                            />
                        </div>

                        {/* MAIN NAV LINKS */}
                        {!showSubmarkets && !selectedIndustry && (
                            <div className="p-4 flex flex-col gap-4">

                                {/* INDUSTRIES */}
                                <div className="flex justify-between items-center border-b pb-3">
                                    <span
                                        className="text-lg font-medium cursor-pointer"
                                        onClick={() => setShowSubmarkets(true)}
                                    >
                                        Industries
                                    </span>
                                    <FaAngleRight
                                        className="cursor-pointer"
                                        onClick={() => setShowSubmarkets(true)}
                                    />
                                </div>

                                <Link href="/product" onClick={closeMenu}>Products</Link>
                                <Link href="/about-us" onClick={closeMenu}>About Us</Link>
                                <Link href="/contact-us" onClick={closeMenu}>Contact Us</Link>
                            </div>
                        )}

                        {/* INDUSTRY LIST */}
                        {showSubmarkets && !selectedIndustry && (
                            <div className="p-4">

                                {/* BACK */}
                                <div className="flex items-center gap-3 mb-4">
                                    <MdArrowBack
                                        className="text-2xl cursor-pointer"
                                        onClick={() => setShowSubmarkets(false)}
                                    />
                                    <h2 className="text-xl font-bold">Industries</h2>
                                </div>

                                {data.map((item: any) => (
                                    <div
                                        key={item.id}
                                        className="flex justify-between items-center py-3 border-b"
                                    >
                                        {/* TEXT → PAGE */}
                                        <span
                                            className="cursor-pointer"
                                            onClick={() => {
                                                router.push(`/industry/${item.slug}/${item.id}`);
                                                closeMenu();
                                            }}
                                        >
                                            {item.name}
                                        </span>

                                        {/* ARROW → SUB INDUSTRY */}
                                        <FaAngleRight
                                            className="cursor-pointer"
                                            onClick={() => setSelectedIndustry(item)}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* SUB INDUSTRY LIST */}
                        {selectedIndustry && !activeSubIndustry && (
                            <div className="p-4">

                                {/* BACK */}
                                <div className="flex items-center gap-3 mb-4">
                                    <MdArrowBack
                                        className="text-2xl cursor-pointer"
                                        onClick={() => setSelectedIndustry(null)}
                                    />
                                    <h2 className="text-xl font-bold">
                                        {selectedIndustry.name}
                                    </h2>
                                </div>

                                {selectedIndustry.sub_industry?.map((sub: any) => (
                                    <div
                                        key={sub.id}
                                        className="flex justify-between items-center py-3 border-b"
                                    >
                                        {/* TEXT → PAGE */}
                                        <span
                                            className="cursor-pointer"
                                            onClick={() => {
                                                router.push(`/industry/${selectedIndustry.slug}/${selectedIndustry.id}/${sub.slug}/${sub.id}`);
                                                closeMenu();
                                            }}
                                        >
                                            {sub.name}
                                        </span>

                                        {/* ARROW → CATEGORY */}
                                        <FaAngleRight
                                            className="cursor-pointer"
                                            onClick={() => setActiveSubIndustry(sub)}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* CATEGORY LIST */}
                        {activeSubIndustry && (
                            <div className="p-4">

                                {/* BACK */}
                                <div className="flex items-center gap-3 mb-4">
                                    <MdArrowBack
                                        className="text-2xl cursor-pointer"
                                        onClick={() => setActiveSubIndustry(null)}
                                    />
                                    <h2 className="text-xl font-bold">
                                        {activeSubIndustry.name}
                                    </h2>
                                </div>

                                {activeSubIndustry.product_category?.map((cat: any) => (
                                    <div
                                        key={cat.id}
                                        className="py-3 border-b cursor-pointer"
                                        onClick={() => {
                                            router.push(`/industry/${selectedIndustry.slug}/${selectedIndustry.id}/${activeSubIndustry.slug}/${activeSubIndustry.id}/${cat.slug}/${cat.id}`);
                                            closeMenu();
                                        }}
                                    >
                                        {cat.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Desktop Mega Menu - Opens on Hover */}
                {isMenuOpen && window.innerWidth >= 768 && activeData && (
                    <div
                        className="hidden md:block fixed left-0 right-0 bg-white shadow-lg z-40"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="text-black max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[80vh]">
                            <div className="w-full bg-white flex rounded-lg shadow-lg overflow-hidden">
                                {/* Industries Column */}
                                <div className='w-1/3 border-r border-gray-100 bg-gray-50/30 overflow-y-auto max-h-[80vh]'>
                                    <ul className="flex flex-col gap-1 p-3">
                                        {[...data].map((item: any) => (
                                            <div key={item.id}>
                                                <Link
                                                    href={`/industry/${item.slug}/${item.id}`}
                                                    onMouseEnter={() => {
                                                        setActiveData(item);
                                                        setActiveSubIndustry(item?.sub_industry?.[0] || null);
                                                    }}
                                                    className={`group py-2 px-4 cursor-pointer transition-all flex justify-between items-center
                                                        ${activeData?.id === item.id ? "bg-[#cd2626]/10 text-[#cd2626]" : "hover:bg-[#cd2626]/10"}
                                                    `}
                                                >
                                                    <span>{item.name}</span>
                                                    <FaAngleRight className="text-xs" />
                                                </Link>
                                            </div>
                                        ))}
                                    </ul>
                                </div>

                                {/* Sub-industries Column */}
                                <div className="w-1/3 border-r border-gray-100 bg-white overflow-y-auto max-h-[80vh]">
                                    <ul className="flex flex-col gap-1 p-3">
                                        {activeData?.sub_industry?.map((sub: any) => (
                                            <li key={sub.id}>
                                                <Link
                                                    href={`/industry/${activeData.slug}/${activeData.id}/${sub.slug}/${sub.id}`}
                                                    onMouseEnter={() => setActiveSubIndustry(sub)}
                                                    className={`group py-2 px-4 cursor-pointer transition-all flex justify-between items-center
                                                        ${activeSubIndustry?.id === sub.id ? "bg-[#cd2626]/10 text-[#cd2626]" : "hover:bg-[#cd2626]/10"}
                                                    `}
                                                >
                                                    <span>{sub.name}</span>
                                                    <FaAngleRight className="text-xs" />
                                                </Link>
                                            </li>
                                        ))}
                                        {(!activeData?.sub_industry || activeData.sub_industry.length === 0) && (
                                            <li className="py-2 px-4 text-gray-400 text-sm">
                                                No sub-industries available
                                            </li>
                                        )}
                                    </ul>
                                </div>

                                {/* Categories Column */}
                                <div className="w-1/3 bg-white overflow-y-auto max-h-[80vh] relative">
                                    <div className="p-4">
                                        <h3 className="text-sm font-semibold mb-3 text-gray-600">
                                            {activeSubIndustry?.name || "Product Categories"}
                                        </h3>

                                        {activeSubIndustry?.product_category?.map((cat: any) => (
                                            <Link
                                                key={cat.id}
                                                href={`/industry/${activeData.slug}/${activeData.id}/${activeSubIndustry.slug}/${activeSubIndustry.id}/${cat.slug}/${cat.id}`}
                                                className="block py-2 px-3 hover:bg-gray-100 rounded-md transition text-gray-700 hover:text-[#cd2626]"
                                            >
                                                {cat.name}
                                            </Link>
                                        ))}

                                        {activeSubIndustry && (!activeSubIndustry.product_category || activeSubIndustry.product_category.length === 0) && (
                                            <p className="text-gray-400 text-sm px-3">
                                                No categories available
                                            </p>
                                        )}

                                        {!activeSubIndustry && (
                                            <p className="text-gray-400 text-sm px-3">
                                                Hover on any sub-industry to see categories
                                            </p>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => closeMenu()}
                                        className="absolute top-2 right-2 p-2 hover:bg-gray-100 rounded-full transition-colors"
                                    >
                                        <IoClose size={24} className="text-gray-500 hover:text-[#cd2626]" />
                                    </button>
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