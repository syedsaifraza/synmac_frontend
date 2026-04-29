'use client'

import { Search } from 'lucide'
import { FaLock, FaLockOpen } from "react-icons/fa";
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { BsEye } from 'react-icons/bs'
import { Fa500Px } from 'react-icons/fa'
import { FaX } from 'react-icons/fa6'
import { useRouter } from "next/navigation";

const ProductListSection = ({ industry, sub_industry, product_category, product }: any) => {


    console.log(product)

    const searchParams = useSearchParams();

    const productname = searchParams.get("productname");
    const productcategoryname = searchParams.get("productcategoryname")
    const industryname = searchParams.get("industryname")
    const sub_industry_name = searchParams.get("subindustryname")

    console.log(productname, productcategoryname, industryname, sub_industry_name)

    const router = useRouter();

    const [selected, setSelected] = useState("");
    const [search, setSearch] = useState<any>(productname);
    const [filterSearch, setFilterSearch] = useState("");
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const [filters, setFilters] = useState({
        industry: industryname ? industryname : "",
        subIndustry: sub_industry_name ? sub_industry_name : "",
        category: productcategoryname ? productcategoryname : "",
    });


    const filterProduct = product?.data?.filter((pro: any) => {
        const matchIndustry =
            !filters.industry || pro?.industry_name === filters.industry;

        const matchSubIndustry =
            !filters.subIndustry ||
            pro?.sub_industry_name === filters.subIndustry;

        const matchCategory =
            !filters.category ||
            pro?.product_category_name === filters.category;

        const matchSearch =
            !search ||
            pro?.name?.toLowerCase().includes(search.toLowerCase()) ||
            pro?.description?.toLowerCase().includes(search.toLowerCase());

        return (
            matchIndustry &&
            matchSubIndustry &&
            matchCategory &&
            matchSearch
        );
    }) || [];

    const handleFilterChange = (type: any, value: any) => {
        setFilters((prev: any) => ({
            ...prev,
            [type]: prev[type] === value ? "" : value,
        }));
    };

    // Clear all filters
    const clearAllFilters = () => {
        setFilters({
            industry: "",
            subIndustry: "",
            category: "",
        });
        setSearch("");
        router.replace("/product");
    };

    const filteredIndustries = industry?.data?.filter((item: any) =>
        item?.name?.toLowerCase().includes(filterSearch.toLowerCase())
    ) || [];

    const filteredSubIndustries = sub_industry?.data?.filter((item: any) =>
        item?.name?.toLowerCase().includes(filterSearch.toLowerCase())
    ) || [];

    const filteredCategories = product_category?.data?.filter((item: any) =>
        item?.name?.toLowerCase().includes(filterSearch.toLowerCase())
    ) || [];

    // Filter sidebar content
    const FilterSidebar = () => (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="relative mb-4">
                <BiSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
                <input
                    type="text"
                    placeholder="Search filters..."
                    value={filterSearch}
                    onChange={(e) => setFilterSearch(e.target.value)}
                    className="w-full h-9 pl-9 pr-3 rounded-lg border border-gray-300 bg-card text-sm text-gray-500 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#cd2626]/30"
                />
            </div>

            <div className='space-y-4'>
                {/* Industry Filter */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="font-semibold text-gray-800">Industry</h2>
                    </div>
                    <div className="space-y-2 max-h-[200px] overflow-y-auto">
                        {filteredIndustries.length > 0 ? (
                            filteredIndustries.map((item: any) => (
                                <label
                                    key={item.id}
                                    className="flex items-center justify-between cursor-pointer text-sm text-gray-700 hover:bg-gray-50 p-2 rounded transition-colors"
                                >
                                    <div className="flex items-center gap-2 flex-1">
                                        <input
                                            type="radio"
                                            name="industry"
                                            value={item.name}
                                            checked={filters.industry === item.name}
                                            onChange={() => handleFilterChange("industry", item.name)}
                                            className="cursor-pointer accent-[#cd2626]"
                                        />
                                        <span className="cursor-pointer">{item.name}</span>
                                    </div>
                                    <span className="text-gray-500 text-xs">({item?.products?.length || 0})</span>
                                </label>
                            ))
                        ) : (
                            <p className="text-gray-400 text-sm text-center py-2">No industries found</p>
                        )}
                    </div>
                </div>

                {/* Sub Industry Filter */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="font-semibold text-gray-800">Sub Industry</h2>
                    </div>
                    <div className="space-y-2 max-h-[200px] overflow-y-auto">
                        {filteredSubIndustries.length > 0 ? (
                            filteredSubIndustries.map((item: any) => (
                                <label
                                    key={item.id}
                                    className="flex items-center justify-between cursor-pointer text-sm text-gray-700 hover:bg-gray-50 p-2 rounded transition-colors"
                                >
                                    <div className="flex items-center gap-2 flex-1">
                                        <input
                                            type="radio"
                                            name="subIndustry"
                                            value={item.name}
                                            checked={filters.subIndustry === item.name}
                                            onChange={() => handleFilterChange("subIndustry", item.name)}
                                            className="cursor-pointer accent-[#cd2626]"
                                        />
                                        <span className="cursor-pointer">{item.name}</span>
                                    </div>
                                    <span className="text-gray-500 text-xs">({item?.products?.length || 0})</span>
                                </label>
                            ))
                        ) : (
                            <p className="text-gray-400 text-sm text-center py-2">No sub-industries found</p>
                        )}
                    </div>
                </div>

                {/* Product Category Filter */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="font-semibold text-gray-800">Product Category</h2>
                    </div>
                    <div className="space-y-2 max-h-[200px] overflow-y-auto">
                        {filteredCategories.length > 0 ? (
                            filteredCategories.map((item: any) => (
                                <label
                                    key={item.id}
                                    className="flex items-center justify-between cursor-pointer text-sm text-gray-700 hover:bg-gray-50 p-2 rounded transition-colors"
                                >
                                    <div className="flex items-center gap-2 flex-1">
                                        <input
                                            type="radio"
                                            name="category"
                                            value={item.name}
                                            checked={filters.category === item.name}
                                            onChange={() => handleFilterChange("category", item.name)}
                                            className="cursor-pointer accent-[#cd2626]"
                                        />
                                        <span className="cursor-pointer">{item.name}</span>
                                    </div>
                                    <span className="text-gray-500 text-xs">({item?.products?.length || 0})</span>
                                </label>
                            ))
                        ) : (
                            <p className="text-gray-400 text-sm text-center py-2">No categories found</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className='py-8 sm:py-12 lg:py-20 px-4 sm:px-6 lg:px-8'>
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="mb-6 sm:mb-8">
                    <p className="text-[#cd2626] text-xs sm:text-sm font-medium tracking-wider uppercase mb-2">Product Finder</p>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                        Find the Right <span className="text-[#cd2626]">Chemical Solution</span>
                    </h1>
                    <p className="text-gray-500 text-sm sm:text-base max-w-xl">
                        Browse our catalog of specialty chemicals. Filter by industry, sub-market, product type, or brand.
                    </p>
                </div>


                <div className="relative max-w-2xl mb-4 sm:mb-6">
                    <BiSearch size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search products by name or description..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full h-11 sm:h-12 pl-11 sm:pl-12 pr-4 rounded-xl border border-gray-300 bg-white text-gray-700 placeholder:text-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-[#cd2626]/20 focus:border-[#cd2626]"
                    />
                </div>


                <div className="flex gap-2 flex-wrap mb-4 sm:mb-6">
                    {search && (
                        <div className="bg-gray-100 px-3 py-1.5 rounded-full flex items-center gap-2 text-xs sm:text-sm">
                            Search: "{search}"
                            <button onClick={() => setSearch("")} className="hover:text-red-500">
                                ✕
                            </button>
                        </div>
                    )}
                    {Object.entries(filters).map(([key, value]) => {
                        if (!value) return null;
                        let displayKey = key === "subIndustry" ? "Sub Industry" :
                            key === "category" ? "Category" : "Industry";
                        return (
                            <div key={key} className="bg-gray-100 px-3 py-1.5 rounded-full flex items-center gap-2 text-xs sm:text-sm">
                                {displayKey}: {value}
                                <button onClick={() => handleFilterChange(key, value)} className="hover:text-red-500">
                                    ✕
                                </button>
                            </div>
                        );
                    })}
                    {(Object.values(filters).some(v => v) || search) && (
                        <button
                            onClick={clearAllFilters}
                            className="bg-red-500 text-white px-3 py-1.5 rounded-full text-xs sm:text-sm hover:bg-red-600 transition-colors"
                        >
                            Clear All
                        </button>
                    )}
                </div>

                {/* Mobile Filter Button */}
                <div className="lg:hidden mb-4">
                    <button
                        onClick={() => setIsFilterOpen(true)}
                        className="w-full bg-gray-100 text-gray-700 py-2.5 px-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
                    >
                        <BiSearch size={18} />
                        Filters & Categories
                    </button>
                </div>

                {/* Main Content - Desktop and Mobile */}
                <div className="flex flex-col lg:flex-row gap-5 lg:gap-6">
                    {/* Desktop Sidebar - Hidden on mobile */}
                    <div className="hidden lg:block lg:w-80 xl:w-96 flex-shrink-0">
                        <div className="sticky top-24">
                            <FilterSidebar />
                        </div>
                    </div>

                    {/* Mobile Filter Drawer */}
                    {isFilterOpen && (
                        <>
                            <div
                                className="fixed inset-0 bg-black/50 z-50 lg:hidden"
                                onClick={() => setIsFilterOpen(false)}
                            />
                            <div className="fixed right-0 top-0 h-full w-80 bg-white z-50 shadow-xl overflow-y-auto lg:hidden">
                                <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
                                    <h2 className="text-lg font-bold text-gray-800">Filters</h2>
                                    <button
                                        onClick={() => setIsFilterOpen(false)}
                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                    >
                                        <FaX size={18} />
                                    </button>
                                </div>
                                <div className="p-4">
                                    <FilterSidebar />
                                </div>
                            </div>
                        </>
                    )}

                    {/* Products Grid */}
                    <div className="flex-1 min-w-0">
                        <h1 className='text-sm sm:text-base text-gray-500 font-semibold mb-3'>
                            Showing {filterProduct.length} Result{filterProduct.length !== 1 ? 's' : ''}
                        </h1>

                        <div className='space-y-3 sm:space-y-4'>
                            {filterProduct.length > 0 ? (
                                filterProduct.map((pro: any) => (
                                    <div
                                        key={pro?.id}
                                        className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5 hover:shadow-lg transition-all duration-300"
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                                            <div className="flex-1 min-w-0">
                                                <Link href={`/product/${pro?.slug}`}
                                                    className="font-bold text-base sm:text-lg text-[#cd2626] mb-1 hover:underline">{pro?.name}</Link>
                                                <p dangerouslySetInnerHTML={{ __html: pro?.description }} className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-3 line-clamp-4" />
                                                <div className="flex flex-wrap gap-1.5">

                                                    <div className='flex flex-row w-full justify-between'>

                                                        <div>
                                                            {pro?.industry_name && (
                                                                <span className="bg-gray-100 text-gray-700 font-medium px-2 py-1 rounded-md text-xs">
                                                                    {pro?.industry_name}
                                                                </span>
                                                            )}
                                                            {pro?.sub_industry_name && (
                                                                <span className="bg-gray-100 text-gray-700 font-medium px-2 py-1 rounded-md text-xs">
                                                                    {pro?.sub_industry_name}
                                                                </span>
                                                            )}
                                                            {pro?.product_category_name && (
                                                                <span className="bg-gray-100 text-gray-700 font-medium px-2 py-1 rounded-md text-xs">
                                                                    {pro?.product_category_name}
                                                                </span>
                                                            )}
                                                        </div>



                                                        <div className="flex flex-row items-center gap-2 shrink-0">

                                                            {/* TDS */}
                                                            {pro?.tds_doc && (
                                                                <a
                                                                    href={!pro?.is_tds_locked ? pro?.tds_doc : "#"}
                                                                    onClick={(e) => {
                                                                        if (pro?.is_tds_locked) {
                                                                            e.preventDefault(); // block click
                                                                        }
                                                                    }}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className={`text-xs h-8 px-3 gap-1 flex items-center font-semibold rounded-md whitespace-nowrap
        ${pro?.is_tds_locked
                                                                            ? "bg-gray-400 cursor-not-allowed"
                                                                            : "bg-[#cd2626] hover:bg-[#a31e1e] text-white"
                                                                        }`}
                                                                >
                                                                    {pro?.is_tds_locked ? <FaLock /> : <FaLockOpen />}
                                                                    TDS
                                                                </a>
                                                            )}

                                                            {/* MSDS */}
                                                            {pro?.msds_doc && (
                                                                <a
                                                                    href={!pro?.is_msds_locked ? pro?.msds_doc : "#"}
                                                                    onClick={(e) => {
                                                                        if (pro?.is_msds_locked) {
                                                                            e.preventDefault();
                                                                        }
                                                                    }}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className={`text-xs h-8 px-3 gap-1 flex items-center font-semibold rounded-md whitespace-nowrap
        ${pro?.is_msds_locked
                                                                            ? "bg-gray-400 cursor-not-allowed"
                                                                            : "bg-[#cd2626] hover:bg-[#a31e1e] text-white"
                                                                        }`}
                                                                >
                                                                    {pro?.is_msds_locked ? <FaLock /> : <FaLockOpen />}
                                                                    MSDS
                                                                </a>
                                                            )}

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12 bg-gray-50 rounded-xl">
                                    <p className="text-gray-500 text-sm sm:text-base">No products found matching your criteria.</p>
                                    <button
                                        onClick={clearAllFilters}
                                        className="mt-4 text-[#cd2626] hover:underline text-sm sm:text-base"
                                    >
                                        Clear all filters
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductListSection