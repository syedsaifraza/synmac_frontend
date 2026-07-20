'use client'
import { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import Logo from "../../../public/Img.png"
import Image from 'next/image';
import { FaAngleDown, FaAngleRight } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { HiMenuAlt3 } from 'react-icons/hi';
import { MdArrowBack } from 'react-icons/md';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiSearch } from 'react-icons/fi';
import SearchOverlay from '../SearchOverlay';
import LanguageSelector from '../LanguageSelector';
import { useDispatch } from 'react-redux';
import { setCompanyInfoDataFromApi, setIndustoryFromApi, setProductCategoryFromApi, setProductsFromApi, setSubIndustoryFromApi } from '@/features/synmacdata.slice';

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
    product?: Product[]; // API uses "product" not "products"
    [key: string]: any;
}

interface SubIndustry {
    id: number;
    slug: string;
    name: string;
    product_categories?: ProductCategory[]; // API uses "product_categories"
    product?: Product[]; // API uses "product"
    [key: string]: any;
}

interface Industry {
    id: number;
    slug: string;
    name: string;
    sub_industries?: SubIndustry[]; // API uses "sub_industries"
    product_categories?: ProductCategory[]; // API uses "product_categories"
    product?: Product[]; // API uses "product"
    feature_file_link?: string;
    feature_title?: string;
    feature_description?: string;
    hero_background_description?: string; // Added based on your data
    [key: string]: any;
}

const Navbar = ({
    getCompanyData,
    data,
}: {
    data: any,
    getCompanyData: any
}) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setIndustoryFromApi(data))
        dispatch(setCompanyInfoDataFromApi(getCompanyData))
    }, []);

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
    const [searchOpen, setSearchOpen] = useState(false);

    const isProductPage = pathname === '/product';

    const getNavbarTextColor = () => {
        if (isProductPage) return "text-gray-700";
        return !scrolled && !isMenuOpen ? "text-white" : "text-gray-700";
    };

    const getNavbarBg = () => {
        if (isProductPage) return "bg-white shadow-md";
        if (scrolled) return "bg-white shadow-md";
        if (isMenuOpen) return "bg-white text-black";
        return "bg-transparent text-white";
    };

    const getProducts = () => {
        if (activeCategory?.product?.length) {
            return activeCategory.product;
        }
        if (activeSubIndustry?.product?.length) {
            return activeSubIndustry.product;
        }
        if (activeIndustry?.product?.length) {
            return activeIndustry.product;
        }
        return [];
    };

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Initialize active industry with proper property names
    useEffect(() => {
        if (data && data.length > 0) {
            const firstIndustry = data[0];
            setActiveIndustry(firstIndustry);
            
            if (firstIndustry?.sub_industries?.length > 0) {
                const firstSub = firstIndustry.sub_industries[0];
                setActiveSubIndustry(firstSub);
                if (firstSub?.product_categories?.[0]) {
                    setActiveCategory(firstSub.product_categories[0]);
                }
            } else if (firstIndustry?.product_categories?.[0]) {
                setActiveCategory(firstIndustry.product_categories[0]);
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
        return industry?.sub_industries && industry.sub_industries.length > 0;
    };

    const hasDirectCategories = (industry: Industry) => {
        return industry?.product_categories && industry.product_categories.length > 0;
    };

    const hasDirectProducts = (industry: Industry) => {
        return industry?.product && industry.product.length > 0;
    };

    const hasCategories = (subIndustry: SubIndustry) => {
        return subIndustry?.product_categories && subIndustry.product_categories.length > 0;
    };

    const hasDirectProductsInSub = (subIndustry: SubIndustry) => {
        return subIndustry?.product && subIndustry.product.length > 0;
    };

    const hasProductsInCategory = (category: ProductCategory) => {
        return category?.product && category.product.length > 0;
    };

    const handleIndustryHover = useCallback((industry: Industry) => {
        setActiveIndustry(industry);
        
        if (hasSubIndustries(industry)) {
            const sub = industry.sub_industries![0];
            setActiveSubIndustry(sub);
            if (hasCategories(sub)) {
                setActiveCategory(sub.product_categories![0]);
            } else {
                setActiveCategory(null);
            }
        } else if (hasDirectCategories(industry)) {
            setActiveSubIndustry(null);
            setActiveCategory(industry.product_categories![0]);
        } else {
            setActiveSubIndustry(null);
            setActiveCategory(null);
        }
    }, []);

    const handleSubIndustryHover = useCallback((subIndustry: SubIndustry) => {
        setActiveSubIndustry(subIndustry);
        if (hasCategories(subIndustry)) {
            setActiveCategory(subIndustry.product_categories![0]);
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



      const createFilterUrl = (params:any) => {
    const searchParams = new URLSearchParams();

    // Check each parameter and add only if it has a value
    if (params.industry_id) {
      searchParams.append('industry', params.industry_id);
    }
    if (params.sub_industry_id) {
      searchParams.append('subindustry', params.sub_industry_id);
    }
    if (params.product_category_id) {
      searchParams.append('productcategory', params.product_category_id);
    }
    if (params.name) {
      searchParams.append('productname', params.name);
    }

    const queryString = searchParams.toString();
    return `/product/${queryString ? `?${queryString}` : ''}`;
  };


    const getProductUrl = (product: any) => {
        
        const params = new URLSearchParams();
        if (product?.name) params.append("productname", product.name);
        if (product?.id) params.append("productid", product.id);


        const url = createFilterUrl({
              industry_id: activeIndustry?.id,
              sub_industry_id: activeSubIndustry?.id,
              product_category_id: activeCategory?.id,
              name: product?.name
            })
     
        return  url
    };

    const products = useMemo(() => {
        return getProducts();
    }, [activeCategory, activeSubIndustry, activeIndustry]);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 fonts">
            <div className={`${getNavbarBg()} ${isMenuOpen && "border-b border-gray-200"}`}>
                <div className="max-w-6xl mx-auto flex items-center justify-between py-4 ">
                    <Link href="/" className="flex items-center gap-2 w-1/4">
                        <Image src={Logo} alt="Logo" className="w-[70%]" />
                        <span className={`font-extrabold text-xs text-black ${getNavbarTextColor()}`}>beta</span>
                    </Link>

                    <ul className={`hidden md:flex items-center gap-6 text-sm font-medium ${getNavbarTextColor()}`}>
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
                            <div className="flex items-center gap-1">
                                <span>Industries</span>
                                <FaAngleDown />
                            </div>
                            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#cd2626] transition-all duration-300 group-hover:w-full"></span>
                        </li>
                        <Link href="/product" className="relative group">
                            <span>Products</span>
                            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#cd2626] transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <div className='relative group resouce-Section flex flex-row items-center gap-1'>
                            <span>Resources</span>
                            <FaAngleDown className='resouce-isoc' />
                            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#cd2626] transition-all duration-300 group-hover:w-full"></span>
                            <div className='resouce-Section-panel top-5 text-gray-600 font-semibold p-2 text-xs space-y-2'>
                                <Link href="/blog" className='cursor-pointer hover:text-[#cd2626]'>Blogs</Link>
                                <Link href="/brochure" className='cursor-pointer hover:text-[#cd2626]'>Brochures</Link>
                                <Link className='cursor-pointer hover:text-[#cd2626]' href={"/success-stories"}>Success Stories</Link>
                                <Link className='cursor-pointer hover:text-[#cd2626]' href={"/news-releases"}>News Releases</Link>
                            </div>
                        </div>
                        <Link href="#" className="relative group">
                            <span>About us</span>
                            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#cd2626] transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link href="/contact-us" className="relative group">
                            <span>Contact us</span>
                            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#cd2626] transition-all duration-300 group-hover:w-full"></span>
                        </Link>

                        <button
                            onClick={() => setSearchOpen(true)}
                            className={getNavbarTextColor()}
                            aria-label="Search"
                        >
                            <FiSearch className='cursor-pointer' size={20} />
                        </button>
                        <div className='flex flex-row'>
                            <LanguageSelector />
                        </div>
                    </ul>

                    <div className="md:hidden">
                        {!isMenuOpen ? (
                            <HiMenuAlt3
                                className={`text-2xl cursor-pointer ${isProductPage
                                        ? "text-gray-700"
                                        : !scrolled && !isMenuOpen ? "text-white" : "text-gray-700"
                                    }`}
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
                    className="hidden bg-white md:block fixed left-0 right-0 z-40"
                    onMouseEnter={() => {
                        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
                        setIsMenuOpen(true);
                    }}
                    onMouseLeave={() => {
                        hoverTimeoutRef.current = setTimeout(() => setIsMenuOpen(false), 200);
                    }}
                >
                    <div className="">
                        <div className="w-full h-[80vh] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1)] flex flex-row overflow-hidden relative">
                            <div className="w-1/3 px-24 py-10 bg-gray-00">
                                {activeIndustry && (
                                    <div className="overflow-hidden transition duration-300 flex flex-col h-full">
                                        <div className="w-full h-40 bg-gray-50 overflow-hidden">
                                            <img
                                                src={activeIndustry?.feature_file_link || " "}
                                                alt={activeIndustry.name}
                                                className="w-full h-full object-cover hover:scale-105 transition duration-300"
                                            />
                                        </div>
                                        <div className="py-4 flex flex-col grow">
                                            <h1 className="text-lg font-semibold text-gray-800 mb-2">
                                                {activeIndustry.name}
                                            </h1>
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: activeIndustry.hero_background_description || ""
                                                }}
                                                className="text-sm text-gray-600 line-clamp-8 fonts mb-4"
                                            />
                                            <Link
                                                href={`/industry/${activeIndustry.slug}`}
                                                className="text-center border border-[#cd2626] px-4 py-2 rounded-full text-white bg-[#cd2626] hover:bg-[#cd2626]/80 transition"
                                            >
                                                Explore More
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="grid grid-cols-4 flex-1 pr-24 pt-10 pl-10">
                                <div className="col-span-1 bg-white overflow-y-auto max-h-100">
                                    <div className="sticky top-0 bg-white pb-2">
                                        <h3 className="text-sm font-medium text-gray-500">Main Markets</h3>
                                        <span className="absolute left-0 bottom-0 h-0.5 bg-gray-200 transition-all duration-300 w-full"></span>
                                    </div>
                                    <div className="py-2 space-y-1 pr-8">
                                        {data.map((industry: any, idx: number) => (
                                            <Link
                                                key={idx}
                                                href={getIndustryUrl(industry)}
                                                onMouseEnter={() => handleIndustryHover(industry)}
                                                className={`flex font-medium gap-2 rounded-lg text-xs
                                                    ${activeIndustry?.id === industry.id
                                                        ? "text-[#cd2626]"
                                                        : "text-gray-700"
                                                    }
                                                `}
                                            >
                                                <span>{industry.name}</span>
                                                <FaAngleRight className="text-[10px] relative top-1" />
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                <div className="col-span-1 bg-white overflow-y-auto max-h-100">
                                    <div className="sticky top-0 bg-white pb-2">
                                        <h3 className="text-sm font-medium text-gray-500">Sub Markets</h3>
                                        <span className="absolute left-0 bottom-0 h-0.5 bg-gray-200 transition-all duration-300 w-full"></span>
                                    </div>
                                    <div className="space-y-1 py-2 pr-8">
                                        {hasSubIndustries(activeIndustry) ? (
                                            activeIndustry.sub_industries?.map((sub, idx: number) => (
                                                <Link
                                                    key={idx}
                                                    href={getSubIndustryUrl(activeIndustry, sub)}
                                                    onMouseEnter={() => handleSubIndustryHover(sub)}
                                                    className={`flex font-medium gap-2 items-top rounded-lg text-xs
                                                        ${activeSubIndustry?.id === sub.id
                                                            ? "text-[#cd2626]"
                                                            : "text-gray-700"
                                                        }
                                                    `}
                                                >
                                                    <span>{sub.name}</span>
                                                    <FaAngleRight className="text-[10px] relative top-1" />
                                                </Link>
                                            ))
                                        ) : (
                                            <div className="text-xs text-gray-400">No sub industries</div>
                                        )}
                                    </div>
                                </div>

                                <div className="col-span-1 bg-white overflow-y-auto max-h-100">
                                    <div className="sticky top-0 bg-white pb-2">
                                        <h3 className="text-sm font-medium text-gray-500">End Markets</h3>
                                        <span className="absolute left-0 bottom-0 h-0.5 bg-gray-200 transition-all duration-300 w-full"></span>
                                    </div>
                                    <div className="py-2 space-y-1 pr-8">
                                        {activeSubIndustry && hasCategories(activeSubIndustry) ? (
                                            activeSubIndustry.product_categories?.map((cat, idx: number) => (
                                                <Link
                                                    key={idx}
                                                    href={getCategoryUrl(activeIndustry, activeSubIndustry, cat)}
                                                    onMouseEnter={() => setActiveCategory(cat)}
                                                    className={`flex font-medium gap-2 items-top rounded-lg text-xs mb-0.5
                                                        ${activeCategory?.id === cat.id
                                                            ? "text-[#cd2626]"
                                                            : "text-gray-700"
                                                        }
                                                    `}
                                                >
                                                    <span>{cat.name}</span>
                                                    <FaAngleRight className="text-[10px] relative top-1" />
                                                </Link>
                                            ))
                                        ) : activeIndustry && hasDirectCategories(activeIndustry) ? (
                                            activeIndustry.product_categories?.map((cat, idx: number) => (
                                                <Link
                                                    key={idx}
                                                    href={getCategoryUrl(activeIndustry, null, cat)}
                                                    onMouseEnter={() => setActiveCategory(cat)}
                                                    className={`block rounded-lg text-xs mb-0.5
                                                        ${activeCategory?.id === cat.id
                                                            ? "text-[#cd2626]"
                                                            : "text-gray-700"
                                                        }
                                                    `}
                                                >
                                                    {cat.name}
                                                </Link>
                                            ))
                                        ) : (
                                            <div className="text-xs text-gray-400">No categories</div>
                                        )}
                                    </div>
                                </div>

                                <div className="col-span-1 bg-white overflow-y-auto max-h-100">
                                    <div className="sticky top-0 bg-white pb-2">
                                        <h3 className="text-sm font-medium text-gray-500">Products</h3>
                                        <span className="absolute left-0 bottom-0 h-0.5 bg-gray-200 transition-all duration-300 w-full"></span>
                                    </div>
                                    <div className="py-2 space-y-1">
                                        {products.length > 0 ? (
                                            products.map((product, idx: number) => (
                                                <Link
                                                    key={idx}
                                                    onClick={()=> setIsMenuOpen(false)}
                                                    href={getProductUrl(product)}
                                                    className="block font-medium text-xs mb-0.5 text-gray-700 hover:text-[#cd2626]"
                                                >
                                                    {product.name}
                                                </Link>
                                            ))
                                        ) : (
                                            <div className="text-xs text-gray-400">No products</div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={closeMenu}
                                className="absolute top-2 right-2 p-1 hover:bg-gray-100 bg-gray-200 cursor-pointer rounded-full"
                            >
                                <IoClose size={25} className="text-gray-400" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
        </nav>
    );
};

export default Navbar;