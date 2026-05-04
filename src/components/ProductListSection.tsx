'use client'

import { FaLock, FaLockOpen } from "react-icons/fa";
import Link from 'next/link'
import { useSearchParams, usePathname } from 'next/navigation'
import React, { useState, useEffect, useRef } from 'react'
import { BiSearch } from 'react-icons/bi'
import { FaX } from 'react-icons/fa6'
import { useRouter } from "next/navigation";
import { DocumentRequestModal } from "./DocumentRequestModal";
import { FilterSidebar } from "./FilterSidebar";

const ProductListSection = ({ industry, sub_industry, product_category, product }: any) => {
    const searchParams = useSearchParams();
    const [search, setSearch] = useState<string>("");
    const [filterSearch, setFilterSearch] = useState("");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [filters, setFilters] = useState({
        industry: "",
        subIndustry: "",
        category: "",
    });


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState<{
        productId: number;
        productName: string;
        documentType: 'tds' | 'msds';
        documentUrl: string;
    } | null>(null);
    const [formData, setFormData] = useState({
    client_name: "",
    client_email: "",
    client_phone: "",
    client_country: "",
    company_name: "",
    company_address: "",
    purposes: [],           // Array to store multiple selected 
    purpose_other_text: "", 
    message: ""
});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const prevSearchParamsRef = useRef<string>("");
    const prevSearchRef = useRef<string>("");
    const prevFiltersRef = useRef(filters);


    const hasPendingRequest = React.useCallback((productId: any, documentType: any) => {
        const pendingRequests = localStorage.getItem(`doc_request_${productId}_${documentType}`);
        if (pendingRequests) {
            const requestData = JSON.parse(pendingRequests);
            const hoursSinceRequest = (Date.now() - requestData.timestamp) / (1000 * 60 * 60);
            return hoursSinceRequest < 24;
        }
        return false;
    }, []);


    const saveRequestToLocalStorage = (productId: number, documentType: string) => {
        const requestData = {
            timestamp: Date.now(),
            status: 'pending'
        };
        localStorage.setItem(`doc_request_${productId}_${documentType}`, JSON.stringify(requestData));
    };


    const removeRequestFromLocalStorage = (productId: number, documentType: string) => {
        localStorage.removeItem(`doc_request_${productId}_${documentType}`);
    };


    const handleDocumentClick = (e: React.MouseEvent, pro: any, docType: 'tds' | 'msds', docUrl: string) => {
        const isLocked = docType === 'tds' ? pro?.is_tds_locked : pro?.is_msds_locked;
        const hasDoc = docType === 'tds' ? pro?.tds_doc : pro?.msds_doc;

        // If no document exists, don't do anything
        if (!hasDoc) {
            e.preventDefault();
            return;
        }

        // If document exists and is not locked, open in new tab
        if (hasDoc && !isLocked) {
            // Open in new tab (default behavior)
            return;
        }

        // If document exists and is locked, show modal
        if (hasDoc && isLocked) {
            e.preventDefault();
            setSelectedDocument({
                productId: pro?.id,
                productName: pro?.name,
                documentType: docType,
                documentUrl: docUrl
            });
            setIsModalOpen(true);
            setSubmitMessage(null);
            setFormData({
    client_name: "",
    client_email: "",
    client_phone: "",
    client_country: "",
    company_name: "",
    company_address: "",
    purposes: [],           // Array to store multiple selected 
    purpose_other_text: "", 
    message: ""
});
        }
    };


    const handleFormChange = React.useCallback((e: any) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }, []);


    const handleSubmitRequest = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedDocument) return;

        setIsSubmitting(true);
        setSubmitMessage(null);

     const requestData = {
    product_id: selectedDocument.productId,
    client_name: formData.client_name,
    client_email: formData.client_email,
    client_phone: formData.client_phone,
    client_country: formData.client_country,
    company_name: formData.company_name,
    company_address: formData.company_address,
    purposes: formData.purposes,  // Send array of selected purposes
    purpose_other_text: formData.purpose_other_text,  // Send custom text if "Other" is selected
    message: formData.message,
    document_type: selectedDocument.documentType,
    request_status: "pending"
};

        try {

            const response = await fetch('/api/request', {
  method: 'POST',
  body: JSON.stringify(requestData),
});

            if (response.ok) {
                const result = await response.json();
                saveRequestToLocalStorage(selectedDocument.productId, selectedDocument.documentType);
                setSubmitMessage({ type: 'success', text: 'Request submitted successfully! You will receive access via email shortly.' });


                setTimeout(() => {
                    setIsModalOpen(false);
                    setSelectedDocument(null);
                    setSubmitMessage(null);
                }, 1000);
            } else {
                throw new Error('Failed to submit request');
            }
        } catch (error) {
            console.error('Error submitting request:', error);
            setSubmitMessage({ type: 'error', text: 'Failed to submit request. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };


    const handleReRequest = (productId: number, documentType: string) => {
        removeRequestFromLocalStorage(productId, documentType);

        if (selectedDocument) {
            setSelectedDocument({ ...selectedDocument });
        }
    };



    const syncFromURL = () => {
        const productname = searchParams.get("productname");
        const productcategoryname = searchParams.get("productcategoryname");
        const industryname = searchParams.get("industryname");
        const subindustryname = searchParams.get("subindustryname");
        const searchQuery = searchParams.get("search");

        let newSearch = "";
        if (searchQuery) {
            newSearch = searchQuery;
        } else if (productname) {
            newSearch = productname;
        }

        const newFilters = {
            industry: industryname || "",
            subIndustry: subindustryname || "",
            category: productcategoryname || "",
        };

        const searchChanged = prevSearchRef.current !== newSearch;
        const filtersChanged = JSON.stringify(prevFiltersRef.current) !== JSON.stringify(newFilters);

        if (searchChanged || filtersChanged) {
            setSearch(newSearch);
            setFilters(newFilters);

            prevSearchRef.current = newSearch;
            prevFiltersRef.current = newFilters;
        }

        setIsLoading(false);
    };

    useEffect(() => {
        const currentParams = searchParams.toString();

        if (prevSearchParamsRef.current !== currentParams) {
            console.log("🔍 URL params changed, syncing...");
            setIsLoading(true);
            syncFromURL();
        }

        prevSearchParamsRef.current = currentParams;
    }, [searchParams]);

    useEffect(() => {
        const handlePopState = () => {

            setIsLoading(true);
            setTimeout(() => {
                syncFromURL();
            }, 100);
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    const filterProduct = React.useMemo(() => {
        return product?.data?.filter((pro: any) => {
            const matchIndustry = !filters.industry || pro?.industry_name === filters.industry;
            const matchSubIndustry = !filters.subIndustry || pro?.sub_industry_name === filters.subIndustry;
            const matchCategory = !filters.category || pro?.product_category_name === filters.category;
            const matchSearch =
                !search ||
                pro?.name?.toLowerCase().includes(search.toLowerCase()) ||
                pro?.description?.toLowerCase().includes(search.toLowerCase());

            return matchIndustry && matchSubIndustry && matchCategory && matchSearch;
        }) || [];
    }, [product, filters, search]);



    const handleFilterChange = (type: string, value: string) => {

        setFilters(prev => ({
            ...prev,
            [type]: prev[type as keyof typeof filters] === value ? "" : value
        }));
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        setSearch(value);
    };

    const clearAllFilters = () => {

        setSearch("");
        setFilters({ industry: "", subIndustry: "", category: "" });
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





    return (
        <>
            {isLoading && (
                <div className="fixed inset-0 z-50 bg-blue-500/20 backdrop-blur-sm flex items-center justify-center">
                    <div className="bg-white rounded-lg p-4 shadow-xl flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-[#cd2626] border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-gray-700 text-sm">Loading...</p>
                    </div>
                </div>
            )}

            <div className='py-8 sm:py-12 lg:py-20 px-4 sm:px-6 lg:px-8'>
                <div className="max-w-6xl mx-auto">
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
                            onChange={handleSearchChange}
                            disabled={isLoading}
                            className="w-full h-11 sm:h-12 pl-11 sm:pl-12 pr-4 rounded-xl border border-gray-300 bg-white text-gray-700 placeholder:text-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-[#cd2626]/20 focus:border-[#cd2626] disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                        {isLoading && (
                            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                <div className="w-4 h-4 border-2 border-[#cd2626] border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-2 flex-wrap mb-4 sm:mb-6">
                        {search && (
                            <div className="bg-gray-100 px-3 py-1.5 rounded-full flex items-center gap-2 text-xs sm:text-sm">
                                Search: "{search}"
                                <button onClick={() => {

                                    setSearch("");
                                }} className="hover:text-red-500" disabled={isLoading}>
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
                                    <button onClick={() => handleFilterChange(key, value)} className="hover:text-red-500" disabled={isLoading}>
                                        ✕
                                    </button>
                                </div>
                            );
                        })}
                        {(Object.values(filters).some(v => v) || search) && (
                            <button
                                onClick={clearAllFilters}
                                className="bg-red-500 text-white px-3 py-1.5 rounded-full text-xs sm:text-sm hover:bg-red-600 transition-colors"
                                disabled={isLoading}
                            >
                                Clear All
                            </button>
                        )}
                    </div>

                    <div className="lg:hidden mb-4">
                        <button
                            onClick={() => setIsFilterOpen(true)}
                            className="w-full bg-gray-100 text-gray-700 py-2.5 px-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
                            disabled={isLoading}
                        >
                            <BiSearch size={18} />
                            Filters & Categories
                        </button>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-5 lg:gap-6">
                        <div className="hidden lg:block lg:w-80 xl:w-96 shrink-0">
                            <div className="sticky top-24">
                                <FilterSidebar
                                    filteredIndustries={filteredIndustries}
                                    filteredSubIndustries={filteredSubIndustries}
                                    handleFilterChange={handleFilterChange}
                                    filters={filters}
                                    filteredCategories={filteredCategories}
                                />
                            </div>
                        </div>

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
                                        <FilterSidebar
                                            filteredIndustries={filteredIndustries}
                                            filteredSubIndustries={filteredSubIndustries}
                                            handleFilterChange={handleFilterChange}
                                            filters={filters}
                                            filteredCategories={filteredCategories}
                                        />
                                    </div>
                                </div>
                            </>
                        )}

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
                                                        className="font-bold text-base sm:text-lg text-[#cd2626] mb-1 hover:underline">
                                                        {pro?.name}
                                                    </Link>
                                                    <p dangerouslySetInnerHTML={{ __html: pro?.description || "" }}
                                                        className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-3 line-clamp-4" />
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
                                                                {pro?.tds_doc && (
                                                                    <a
                                                                        href={!pro?.is_tds_locked ? pro?.tds_doc : "#"}
                                                                        onClick={(e) => handleDocumentClick(e, pro, 'tds', pro?.tds_doc)}
                                                                        target={!pro?.is_tds_locked ? "_blank" : undefined}
                                                                        rel="noopener noreferrer"
                                                                        className={`text-xs h-8 px-3 gap-1 flex items-center font-semibold rounded-md whitespace-nowrap
                                                                            ${pro?.is_tds_locked
                                                                                ? "bg-gray-400 cursor-pointer hover:bg-gray-500"
                                                                                : "bg-[#cd2626] hover:bg-[#a31e1e] text-white"
                                                                            }`}
                                                                    >
                                                                        {pro?.is_tds_locked ? <FaLock /> : <FaLockOpen />}
                                                                        TDS
                                                                    </a>
                                                                )}

                                                                {pro?.msds_doc && (
                                                                    <a
                                                                        href={!pro?.is_msds_locked ? pro?.msds_doc : "#"}
                                                                        onClick={(e) => handleDocumentClick(e, pro, 'msds', pro?.msds_doc)}
                                                                        target={!pro?.is_msds_locked ? "_blank" : undefined}
                                                                        rel="noopener noreferrer"
                                                                        className={`text-xs h-8 px-3 gap-1 flex items-center font-semibold rounded-md whitespace-nowrap
                                                                            ${pro?.is_msds_locked
                                                                                ? "bg-gray-400 cursor-pointer hover:bg-gray-500"
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
                                            disabled={isLoading}
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

            <DocumentRequestModal
                hasPendingRequest={hasPendingRequest}
                key={selectedDocument?.productId}
                handleReRequest={handleReRequest}
                isModalOpen={isModalOpen}
                selectedDocument={selectedDocument}
                formData={formData}
                handleFormChange={handleFormChange}
                handleSubmitRequest={handleSubmitRequest}
                isSubmitting={isSubmitting}
                submitMessage={submitMessage}
                closeModal={() => {
                    setIsModalOpen(false);
                    setSelectedDocument(null);
                    setSubmitMessage(null);
                }}
            />
        </>
    )
}

export default ProductListSection;