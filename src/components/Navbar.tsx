'use client'
import React, { useEffect, useState, useRef, useCallback } from 'react'
import Logo from "../../public/favicon.png"
import Image from 'next/image';
import { FaAngleRight } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { HiMenuAlt3 } from 'react-icons/hi';
import { MdArrowBack } from 'react-icons/md';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FiSearch } from 'react-icons/fi';

// Types
interface Product {
    id: number;
    slug: string;
    name: string;
    [key: string]: any;
}

interface ProductCategory {
    id: number;
    slug: string;
    name: string;
    products?: Product[];
    [key: string]: any;
}

interface SubIndustry {
    id: number;
    slug: string;
    name: string;
    product_category?: ProductCategory[];
    products?: Product[];
    [key: string]: any;
}

interface Industry {
    id: number;
    slug: string;
    name: string;
    sub_industry?: SubIndustry[];
    product_category?: ProductCategory[];
    products?: Product[];
    feature_file_link?: string;
    feature_title?: string;
    feature_description?: string;
    [key: string]: any;
}

const Navbar = ({ data }: { data: Industry[] }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [mobileView, setMobileView] = useState<'main' | 'industries' | 'subIndustries' | 'categories' | 'products'>('main');
    const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null);
    const [selectedSubIndustry, setSelectedSubIndustry] = useState<SubIndustry | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null);
    const [activeIndustry, setActiveIndustry] = useState<Industry | null>(null);
    const [activeSubIndustry, setActiveSubIndustry] = useState<SubIndustry | null>(null);
    const [activeCategory, setActiveCategory] = useState<ProductCategory | null>(null);
    const hoverTimeoutRef = useRef<any>(null);
    const [isClient, setIsClient] = useState(false);



    const getProducts = () => {
        // 1. Category (subIndustry OR industry)
        if (activeCategory?.products?.length) {
            return activeCategory.products;
        }

        // 2. SubIndustry direct
        if (activeSubIndustry?.products?.length) {
            return activeSubIndustry.products;
        }

        // 3. Industry direct
        if (activeIndustry?.products?.length) {
            return activeIndustry.products;
        }

        return [];
    };

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (data && data.length > 0) {
            const firstIndustry = data[0];
            setActiveIndustry(firstIndustry);
            if (firstIndustry?.sub_industry?.[0]) {
                setActiveSubIndustry(firstIndustry.sub_industry[0]);
                if (firstIndustry.sub_industry[0]?.product_category?.[0]) {
                    setActiveCategory(firstIndustry.sub_industry[0].product_category[0]);
                }
            } else if (firstIndustry?.product_category?.[0]) {
                setActiveCategory(firstIndustry.product_category[0]);
            }
        }
    }, [data]);

    useEffect(() => {
        closeMenu();
    }, [pathname]);

    const closeMenu = () => {
        setIsMenuOpen(false);
        setMobileView('main');
        setSelectedIndustry(null);
        setSelectedSubIndustry(null);
        setSelectedCategory(null);
    };

    const hasSubIndustries = (industry: Industry) => {
        return industry?.sub_industry && industry.sub_industry.length > 0;
    };

    const hasDirectCategories = (industry: Industry) => {
        return industry?.product_category && industry.product_category.length > 0;
    };

    const hasDirectProducts = (industry: Industry) => {
        return industry?.products && industry.products.length > 0;
    };

    const hasCategories = (subIndustry: SubIndustry) => {
        return subIndustry?.product_category && subIndustry.product_category.length > 0;
    };

    const hasDirectProductsInSub = (subIndustry: SubIndustry) => {
        return subIndustry?.products && subIndustry.products.length > 0;
    };

    const hasProductsInCategory = (category: ProductCategory) => {
        return category?.products && category.products.length > 0;
    };

    const handleIndustryHover = useCallback((industry: Industry) => {
        setActiveIndustry(industry);

        if (hasSubIndustries(industry)) {
            const sub = industry.sub_industry![0];
            setActiveSubIndustry(sub);

            if (hasCategories(sub)) {
                setActiveCategory(sub.product_category![0]);
            } else {
                setActiveCategory(null);
            }

        } else if (hasDirectCategories(industry)) {
            setActiveSubIndustry(null);
            setActiveCategory(industry.product_category![0]);

        } else {

            setActiveSubIndustry(null);
            setActiveCategory(null);
        }
    }, []);

    const handleSubIndustryHover = useCallback((subIndustry: SubIndustry) => {
        setActiveSubIndustry(subIndustry);

        if (hasCategories(subIndustry)) {
            setActiveCategory(subIndustry.product_category![0]);
        } else {

            setActiveCategory(null);
        }
    }, []);

    const getIndustryUrl = (industry: Industry) => `/industry/${industry.slug}`;
    const getSubIndustryUrl = (industry: Industry, subIndustry: SubIndustry) =>
        `/industry/${industry.slug}/${subIndustry.slug}`;
    const getCategoryUrl = (industry: Industry, subIndustry: SubIndustry | null, category: ProductCategory) => {

        return `/industry/${industry.slug}/${subIndustry?.slug || " "}/${category?.slug || " "}`;


    };




    const getProductUrl = (data: any) => {
        const params = new URLSearchParams();

        if (data?.name) params.append("productname", data.name);
        if (data?.id) params.append("productid", data.id);
        if (data?.industry_name) params.append("industryname", data.industry_name);
        if (data?.sub_industry_name) params.append("subindustryname", data.sub_industry_name);
        if (data?.product_category_name) params.append("productcategoryname", data.product_category_name);

        return `/product?${params.toString()}`;
    };




    const products = getProducts();




    if (!isClient) {
        return null;
    }

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
            <div className={`${scrolled ? "bg-white shadow-md" : `${isMenuOpen ? "bg-white text-black" : "bg-transparent text-white"}`} ${isMenuOpen && "border-b border-gray-200"}`}>
                <div className="max-w-6xl mx-auto flex items-center justify-between py-4">
                    <Link href="/" className="flex items-center gap-2">
                        <Image src={Logo} alt="Logo" className="h-10 w-10" />
                        <span className="font-extrabold text-2xl text-[#cd2626]">SYNMAC</span>
                        <span className="font-extrabold text-2xl text-black">beta</span>
                    </Link>

                    <ul className={`hidden md:flex items-center gap-6 text-sm font-medium ${!scrolled && !isMenuOpen ? "text-white" : "text-gray-700"}`}>
                        <li
                            className="relative group cursor-pointer"
                            onMouseEnter={() => {
                                if (window.innerWidth >= 768) {
                                    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
                                    setIsMenuOpen(true);
                                }
                            }}
                            onMouseLeave={() => {
                                if (window.innerWidth >= 768) {
                                    hoverTimeoutRef.current = setTimeout(() => setIsMenuOpen(false), 200);
                                }
                            }}
                        >
                            <span>Industries</span>
                            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#cd2626] transition-all duration-300 group-hover:w-full"></span>
                        </li>
                        <Link href="/product" className="relative group">
                            <span>Products</span>
                            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#cd2626] transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link href="/resources" className="relative group">
                            <span>Resources</span>
                            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#cd2626] transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link href="/about-us" className="relative group">
                            <span>About us</span>
                            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#cd2626] transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link href="/contact-us" className="relative group">
                            <span>Contact us</span>
                            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#cd2626] transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <FiSearch className="cursor-pointer" />
                    </ul>

                    <div className="md:hidden">
                        {!isMenuOpen ? (
                            <HiMenuAlt3
                                className={`text-2xl cursor-pointer ${!scrolled && !isMenuOpen ? "text-white" : "text-gray-700"}`}
                                onClick={() => setIsMenuOpen(true)}
                            />
                        ) : (
                            <IoClose
                                className="text-2xl cursor-pointer text-gray-700"
                                onClick={closeMenu}
                            />
                        )}
                    </div>
                </div>
            </div>


            {isMenuOpen && typeof window !== 'undefined' && window.innerWidth >= 768 && activeIndustry && (
                <div
                    className="hidden md:block fixed left-0 right-0 z-40"
                    onMouseEnter={() => {
                        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
                        setIsMenuOpen(true);
                    }}
                    onMouseLeave={() => {
                        hoverTimeoutRef.current = setTimeout(() => setIsMenuOpen(false), 200);
                    }}
                >
                    <div className="max-w-6xl mx-auto ">
                        <div className="w-full bg-white shadow-xl rounded-b-2xl overflow-hidden relative">
                            <div className="grid grid-cols-5 gap-0">

                                {/* Column 1: Feature */}
                                <div className="col-span-1 bg-linear-to-br from-gray-50 to-gray-100  border-r border-gray-200 min-h-100">
                                    {activeIndustry.feature_file_link && (

                                        <img
                                            src={activeIndustry.feature_file_link}
                                            alt={activeIndustry.name}
                                            className="w-full h-full  object-cover"
                                        />

                                    )}

                                </div>

                                {/* Column 2: Industries */}
                                <div className="col-span-1 bg-white border-r border-gray-200 overflow-y-auto max-h-100">
                                    <div className="sticky top-0 bg-white px-3 py-2">
                                        <h3 className="text-[11px] font-semibold text-gray-400">INDUSTRIES</h3>
                                        <span className="absolute left-0 bottom-0 h-0.5 bg-[#cd2626] transition-all duration-300 w-full"></span>

                                    </div>
                                    <div className="p-2">
                                        {data.map((industry) => (
                                            <Link
                                                key={industry.id}
                                                href={getIndustryUrl(industry)}
                                                onMouseEnter={() => handleIndustryHover(industry)}
                                                className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs mb-0.5
                                                    ${activeIndustry?.id === industry.id
                                                        ? "bg-[#cd2626]/10 text-[#cd2626]"
                                                        : "text-gray-700 hover:bg-gray-50"
                                                    }
                                                `}
                                            >
                                                <span className="truncate">{industry.name}</span>
                                                <FaAngleRight className="text-[10px]" />
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Column 3: Sub Industries */}
                                <div className="col-span-1 bg-white border-r border-gray-200 overflow-y-auto max-h-100">
                                    <div className="sticky top-0 bg-white px-3 py-2">
                                        <h3 className="text-[11px] font-semibold text-gray-400">SUB INDUSTRIES</h3>
                                        <span className="absolute left-0 bottom-0 h-0.5 bg-[#cd2626] transition-all duration-300 w-full"></span>
                                    </div>
                                    <div className="p-2">
                                        {hasSubIndustries(activeIndustry) ? (
                                            activeIndustry.sub_industry?.map((sub) => (
                                                <Link
                                                    key={sub.id}
                                                    href={getSubIndustryUrl(activeIndustry, sub)}
                                                    onMouseEnter={() => handleSubIndustryHover(sub)}
                                                    className={`block px-3 py-2 rounded-lg text-xs mb-0.5
                                                        ${activeSubIndustry?.id === sub.id
                                                            ? "bg-[#cd2626]/10 text-[#cd2626]"
                                                            : "text-gray-700 hover:bg-gray-50"
                                                        }
                                                    `}
                                                >
                                                    {sub.name}
                                                </Link>
                                            ))
                                        ) : (
                                            <div className="px-3 py-4 text-center text-xs text-gray-400">
                                                No sub industries
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Column 4: Categories */}
                                <div className="col-span-1 bg-white border-r border-gray-200 overflow-y-auto max-h-100">
                                    <div className="sticky top-0 bg-white px-3 py-2">
                                        <h3 className="text-[11px] font-semibold text-gray-400">CATEGORIES</h3>
                                        <span className="absolute left-0 bottom-0 h-0.5 bg-[#cd2626] transition-all duration-300 w-full"></span>
                                    </div>
                                    <div className="p-2">








                                        {activeSubIndustry && hasCategories(activeSubIndustry) ? (
                                            activeSubIndustry.product_category?.map((cat) => (
                                                <Link
                                                    key={cat.id}
                                                    href={getCategoryUrl(activeIndustry, activeSubIndustry, cat)}
                                                    onMouseEnter={() => setActiveCategory(cat)}
                                                    className={`block px-3 py-2 rounded-lg text-xs mb-0.5
                                                        ${activeCategory?.id === cat.id
                                                            ? "bg-[#cd2626]/10 text-[#cd2626]"
                                                            : "text-gray-700 hover:bg-gray-50"
                                                        }
                                                    `}
                                                >
                                                    {cat.name}
                                                </Link>
                                            ))
                                        ) : activeIndustry && hasDirectCategories(activeIndustry) ? (
                                            activeIndustry.product_category?.map((cat) => (
                                                <Link
                                                    key={cat.id}
                                                    href={getCategoryUrl(activeIndustry, null, cat)}
                                                    onMouseEnter={() => setActiveCategory(cat)}
                                                    className={`block px-3 py-2 rounded-lg text-xs mb-0.5
                ${activeCategory?.id === cat.id
                                                            ? "bg-[#cd2626]/10 text-[#cd2626]"
                                                            : "text-gray-700 hover:bg-gray-50"
                                                        }
            `}
                                                >
                                                    {cat.name}
                                                </Link>
                                            ))
                                        ) : (
                                            <div className="px-3 py-4 text-center text-xs text-gray-400">
                                                No categories
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Column 5: Products */}
                                <div className="col-span-1 bg-white overflow-y-auto max-h-100">
                                    <div className="sticky top-0 bg-white px-3 py-2">
                                        <h3 className="text-[11px] font-semibold text-gray-400">PRODUCTS</h3>
                                        <span className="absolute left-0 bottom-0 h-0.5 bg-[#cd2626] transition-all duration-300 w-full"></span>
                                    </div>
                                    <div className="p-2">
                                        {products.length > 0 ? (
                                            products.map((product) => (
                                                <Link
                                                    key={product.id}
                                                    href={getProductUrl(product)}
                                                    className="block px-3 py-2 rounded-lg text-xs mb-0.5 text-gray-700 hover:bg-gray-50"
                                                >
                                                    {product.name}
                                                </Link>
                                            ))
                                        ) : (
                                            <div className="px-3 py-4 text-center text-xs text-gray-400">
                                                No products
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={closeMenu}
                                className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full"
                            >
                                <IoClose size={18} className="text-gray-400" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile Menu - Simplified */}
            {isMenuOpen && typeof window !== 'undefined' && window.innerWidth < 768 && (
                <div className="md:hidden fixed inset-0 top-0 bg-white z-50 overflow-y-auto">
                    <div className="sticky top-0 bg-white border-b px-4 py-3 flex items-center justify-between">
                        {mobileView !== 'main' && (
                            <button onClick={() => {
                                if (mobileView === 'products') {
                                    if (selectedCategory) setMobileView('categories');
                                    else if (selectedSubIndustry) setMobileView('subIndustries');
                                    else setMobileView('industries');
                                } else if (mobileView === 'categories') {
                                    if (selectedSubIndustry) setMobileView('subIndustries');
                                    else setMobileView('industries');
                                } else if (mobileView === 'subIndustries') {
                                    setMobileView('industries');
                                } else if (mobileView === 'industries') {
                                    setMobileView('main');
                                }
                                setSelectedCategory(null);
                                setSelectedSubIndustry(null);
                                setSelectedIndustry(null);
                            }} className="p-1">
                                <MdArrowBack className="text-2xl" />
                            </button>
                        )}
                        <h2 className="text-lg font-semibold flex-1 text-center">
                            {mobileView === 'main' && 'Menu'}
                            {mobileView === 'industries' && 'Industries'}
                            {mobileView === 'subIndustries' && selectedIndustry?.name}
                            {mobileView === 'categories' && (selectedSubIndustry?.name || selectedIndustry?.name)}
                            {mobileView === 'products' && (selectedCategory?.name || selectedSubIndustry?.name || 'Products')}
                        </h2>
                        <button onClick={closeMenu} className="p-1">
                            <IoClose className="text-2xl" />
                        </button>
                    </div>

                    <div className="p-4">
                        {mobileView === 'main' && (
                            <div className="space-y-4">
                                <button onClick={() => setMobileView('industries')} className="w-full flex justify-between items-center py-3 border-b">
                                    <span className="text-base font-medium">Industries</span>
                                    <FaAngleRight />
                                </button>
                                <Link href="/product" onClick={closeMenu} className="block py-3 border-b">Products</Link>
                                <Link href="/resources" onClick={closeMenu} className="block py-3 border-b">Resources</Link>
                                <Link href="/about-us" onClick={closeMenu} className="block py-3 border-b">About Us</Link>
                                <Link href="/contact-us" onClick={closeMenu} className="block py-3 border-b">Contact Us</Link>
                            </div>
                        )}

                        {mobileView === 'industries' && (
                            <div>
                                {data.map((industry) => (
                                    <button
                                        key={industry.id}
                                        onClick={() => {
                                            setSelectedIndustry(industry);
                                            if (hasSubIndustries(industry)) setMobileView('subIndustries');
                                            else if (hasDirectCategories(industry)) setMobileView('categories');
                                            else if (hasDirectProducts(industry)) setMobileView('products');
                                        }}
                                        className="w-full flex justify-between items-center py-3 border-b"
                                    >
                                        <span>{industry.name}</span>
                                        <FaAngleRight />
                                    </button>
                                ))}
                            </div>
                        )}

                        {mobileView === 'subIndustries' && selectedIndustry && (
                            <div>
                                {selectedIndustry.sub_industry?.map((sub) => (
                                    <button
                                        key={sub.id}
                                        onClick={() => {
                                            setSelectedSubIndustry(sub);
                                            if (hasCategories(sub)) setMobileView('categories');
                                            else if (hasDirectProductsInSub(sub)) setMobileView('products');
                                        }}
                                        className="w-full flex justify-between items-center py-3 border-b"
                                    >
                                        <span>{sub.name}</span>
                                        <FaAngleRight />
                                    </button>
                                ))}
                            </div>
                        )}

                        {mobileView === 'categories' && selectedSubIndustry && (
                            <div>
                                {selectedSubIndustry.product_category?.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => {
                                            setSelectedCategory(cat);
                                            if (hasProductsInCategory(cat)) setMobileView('products');
                                        }}
                                        className="w-full flex justify-between items-center py-3 border-b"
                                    >
                                        <span>{cat.name}</span>
                                        <FaAngleRight />
                                    </button>
                                ))}
                            </div>
                        )}

                        {mobileView === 'products' && (
                            <div>
                                {selectedCategory?.products?.map((product) => (
                                    <Link
                                        key={product.id}
                                        href={getProductUrl(product)}
                                        onClick={closeMenu}
                                        className="block py-3 border-b"
                                    >
                                        {product.name}
                                    </Link>
                                ))}
                                {!selectedCategory && selectedSubIndustry?.products?.map((product) => (
                                    <Link
                                        key={product.id}
                                        href={getProductUrl(product)}
                                        onClick={closeMenu}
                                        className="block py-3 border-b"
                                    >
                                        {product.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;