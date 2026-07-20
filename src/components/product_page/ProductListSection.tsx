"use client";

import { FaLock, FaLockOpen } from "react-icons/fa";
import Link from "next/link";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { BiSearch } from "react-icons/bi";
import { FaX } from "react-icons/fa6";
import toast from "react-hot-toast";
import { FilterSidebar } from "@/components/product_page/FilterSidebar";
import { DocumentRequestModal } from "@/components/product_page/DocumentRequestModal";

const page = ({
    productData,
    sidebar,
    currentPage: initialPage,
    perPage: initialPerPage,
}: any) => {
    const apiData = productData;
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const products = apiData?.data || [];
    const paginationData = apiData || {};
    const productName = searchParams.get("product");
    const industryId = searchParams.get("industry");
    const subindustryId = searchParams.get("subindustry");
    const productcategoryId = searchParams.get("productcategory");
    const productnameFromUrl = searchParams.get("productname");
    const captchaRef = useRef<any>(null);
    const [captchaValue, setCaptchaValue] = useState("");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(initialPage || 1);
    const [pageSize, setPageSize] = useState(initialPerPage || 30);

    // Helper function to get name from ID
    const getIndustryNameFromId = (id: string) => {
        if (!id || !sidebar?.industry) return "";
        const industry = sidebar.industry.find((item: any) => item.id.toString() === id);
        return industry ? industry.name : "";
    };

    const getSubIndustryNameFromId = (id: string) => {
        if (!id || !sidebar?.subIndustry) return "";
        const subIndustry = sidebar.subIndustry.find((item: any) => item.id.toString() === id);
        return subIndustry ? subIndustry.name : "";
    };

    const getCategoryNameFromId = (id: string) => {
        if (!id || !sidebar?.productCategory) return "";
        const category = sidebar.productCategory.find((item: any) => item.id.toString() === id);
        return category ? category.name : "";
    };

    const [filters, setFilters] = useState({
        industry: getIndustryNameFromId(industryId || "") || "",
        industryId: industryId || "",
        subindustry: getSubIndustryNameFromId(subindustryId || "") || "",
        subindustryId: subindustryId || "",
        productname: productnameFromUrl || "",
        productcategory: getCategoryNameFromId(productcategoryId || "") || "",
        productcategoryId: productcategoryId || "",
        product: productName || "",
    });

    useEffect(() => {
        const product = searchParams.get("product") || "";
        const industry = searchParams.get("industry") || "";
        const subindustry = searchParams.get("subindustry") || "";
        const productcategory = searchParams.get("productcategory") || "";
        const productname = searchParams.get("productname") || "";

        setFilters(prev => ({
            ...prev,
            product: product,
            productname: productname,
            industry: getIndustryNameFromId(industry),
            industryId: industry,
            subindustry: getSubIndustryNameFromId(subindustry),
            subindustryId: subindustry,
            productcategory: getCategoryNameFromId(productcategory),
            productcategoryId: productcategory,
        }));
    }, [searchParams, sidebar]);

    const isFromSearchOverlay = React.useMemo(() => {
        const hasProduct = searchParams.has("product");
        const hasIndustry = searchParams.has("industry");
        const hasSubIndustry = searchParams.has("subindustry");
        const hasCategory = searchParams.has("productcategory");
        const hasProductName = searchParams.has("productname");

        return hasProduct && !hasIndustry && !hasSubIndustry && !hasCategory && !hasProductName;
    }, [searchParams]);

    useEffect(() => {
        if (isFromSearchOverlay) {
            setFilters({
                industry: "",
                industryId: "",
                productname: "",
                subindustry: "",
                subindustryId: "",
                productcategory: "",
                productcategoryId: "",
                product: productName || "",
            });
        }
    }, [isFromSearchOverlay, productName]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState<{
        productId: number;
        productName: string;
        documentType: "tds" | "sds";
        documentUrl: string;
        pendingRequest?: any;
    } | null>(null);
    const [formData, setFormData] = useState({
        client_name: "",
        client_email: "",
        client_phone: "",
        client_country: "",
        company_name: "",
        company_address: "",
        purposes: [],
        purpose_other_text: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState<{
        type: "success" | "error";
        text: string;
    } | null>(null);

    const totalProducts = paginationData?.total || 0;
    const totalPages = paginationData?.last_page || 1;

    const formatRequestTime = (timestamp: number) => {
        const date = new Date(timestamp);
        return date.toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    };

    const getTimeRemaining = (timestamp: number) => {
        const elapsed = Date.now() - timestamp;
        const hoursRemaining = Math.max(0, 24 - elapsed / (1000 * 60 * 60));
        if (hoursRemaining < 1) {
            const minutesRemaining = Math.ceil(hoursRemaining * 60);
            return `${minutesRemaining} minute${minutesRemaining > 1 ? "s" : ""}`;
        }
        return `${Math.ceil(hoursRemaining)} hour${Math.ceil(hoursRemaining) > 1 ? "s" : ""}`;
    };

    const hasPendingRequest = React.useCallback(
        (productId: any, documentType: any) => {
            const pendingRequests = localStorage.getItem(
                `doc_request_${productId}_${documentType}`,
            );
            if (pendingRequests) {
                const requestData = JSON.parse(pendingRequests);
                const hoursSinceRequest =
                    (Date.now() - requestData.timestamp) / (1000 * 60 * 60);
                if (hoursSinceRequest < 24) {
                    return requestData;
                }
            }
            return null;
        },
        [],
    );

    const saveRequestToLocalStorage = (
        productId: number,
        documentType: string,
    ) => {
        const requestData = {
            timestamp: Date.now(),
            status: "pending",
        };
        localStorage.setItem(
            `doc_request_${productId}_${documentType}`,
            JSON.stringify(requestData),
        );
    };

    const removeRequestFromLocalStorage = (
        productId: number,
        documentType: string,
    ) => {
        localStorage.removeItem(`doc_request_${productId}_${documentType}`);
    };

    const handleDocumentClick = (
        e: React.MouseEvent,
        pro: any,
        docType: "tds" | "sds",
        docUrl: string,
    ) => {
        const isLocked =
            docType === "tds" ? pro?.is_tds_locked : pro?.is_msds_locked;
        const hasDoc = docType === "tds" ? pro?.tds_doc : pro?.msds_doc;

        if (!hasDoc) {
            e.preventDefault();
            return;
        }

        if (hasDoc && !isLocked) {
            window.open(docUrl, "_blank");
            return;
        }

        if (hasDoc && isLocked) {
            e.preventDefault();

            const pendingRequest = hasPendingRequest(pro?.id, docType);

            setSelectedDocument({
                productId: pro?.id,
                productName: pro?.name,
                documentType: docType,
                documentUrl: docUrl,
                pendingRequest: pendingRequest,
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
                purposes: [],
                purpose_other_text: "",
                message: "",
            });
        }
    };

    const handleFormChange = React.useCallback((e: any) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
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
            purposes: formData.purposes,
            purpose_other_text: formData.purpose_other_text,
            message: formData.message,
            document_type: selectedDocument.documentType,
            request_status: "pending",
            captchaToken: captchaValue,
        };

        try {
            const response = await fetch("/api/request", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            if (response.ok) {
                const result = await response.json();

                if (result.success) {
                    toast.success("Request submitted successfully");
                    setIsModalOpen(false);
                    captchaRef.current.reset();
                    saveRequestToLocalStorage(
                        selectedDocument.productId,
                        selectedDocument.documentType,
                    );
                    setSelectedDocument(null);
                    setSubmitMessage(null);
                    setCaptchaValue("");
                } else {
                    setCaptchaValue("");
                    captchaRef.current.reset();
                }
            } else {
                setCaptchaValue("");
                captchaRef.current.reset();
                throw new Error("Failed to submit request");
            }
        } catch (error) {
            console.error("Error submitting request:", error);
            toast.error("Something went wrong");
            setCaptchaValue("");
            captchaRef.current.reset();
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReRequest = (productId: number, documentType: string) => {
        removeRequestFromLocalStorage(productId, documentType);
        if (selectedDocument) {
            setSelectedDocument({
                ...selectedDocument,
                pendingRequest: null,
            });
        }
    };

    const navigateToPage = (page: number, pageSizeValue?: number, data?: any) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page.toString());
        if (pageSizeValue) {
            params.set("per_page", pageSizeValue.toString());
        }

        if (data) {
            params.set(`${data.type}`, data.id.toString());
        }
        router.push(`${pathname}?${params.toString()}`);
        setCurrentPage(page);
        if (pageSizeValue) {
            setPageSize(pageSizeValue);
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        navigateToPage(page);
    };

    const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSize = parseInt(e.target.value);
        navigateToPage(currentPage, newSize);
    };

    const removeFilter = (type: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete(type);

        setFilters((prev) => ({
            ...prev,
            [type]: "",
        }));

        // Handle product removal - clears all filters
        if (type === "product") {
            const filterKeys = ["industry", "subindustry", "productcategory", "productname"];
            filterKeys.forEach(key => params.delete(key));

            setFilters(prev => ({
                ...prev,
                industry: "",
                industryId: "",
                productname: "",
                subindustry: "",
                subindustryId: "",
                productcategory: "",
                productcategoryId: "",
                product: "",
            }));

            router.push(pathname);
            setCurrentPage(1);
            return;
        }

        // Handle productname removal - only removes productname
        if (type === "productname") {
            params.delete("productname");
            setFilters(prev => ({
                ...prev,
                productname: "",
            }));
            params.set("page", "1");
            router.push(`${pathname}?${params.toString()}`);
            setCurrentPage(1);
            return;
        }

        // Handle industry removal
        if (type === "industry" || type === "industryId") {
            params.delete("industry");
            setFilters(prev => ({
                ...prev,
                industry: "",
                industryId: "",
            }));
            params.set("page", "1");
            router.push(`${pathname}?${params.toString()}`);
            setCurrentPage(1);
            return;
        }

        // Handle subindustry removal
        if (type === "subindustry" || type === "subindustryId") {
            params.delete("subindustry");
            setFilters(prev => ({
                ...prev,
                subindustry: "",
                subindustryId: "",
            }));
            params.set("page", "1");
            router.push(`${pathname}?${params.toString()}`);
            setCurrentPage(1);
            return;
        }

        // Handle productcategory removal
        if (type === "productcategory" || type === "productcategoryId") {
            params.delete("productcategory");
            setFilters(prev => ({
                ...prev,
                productcategory: "",
                productcategoryId: "",
            }));
            params.set("page", "1");
            router.push(`${pathname}?${params.toString()}`);
            setCurrentPage(1);
            return;
        }

        // Check if any filters remain
        const hasFilters = ["industry", "subindustry", "productcategory", "productname"].some(
            key => params.has(key)
        );

        if (!hasFilters && !params.has("product")) {
            router.push(pathname);
            setCurrentPage(1);
        } else {
            params.set("page", "1");
            router.push(`${pathname}?${params.toString()}`);
            setCurrentPage(1);
        }
    };

    const handleFilterChange = (type: string, value: any) => {
        const params = new URLSearchParams(searchParams.toString());

        // If it's a productname filter
        if (type === "productname") {
            // Remove product search if present
            params.delete("product");

            setFilters((prev) => ({
                ...prev,
                [type]: prev[type as keyof typeof filters] === value.name ? "" : value.name,
                product: "", // Clear product search
            }));

            // Set or remove the productname parameter
            if (value.name && filters[type as keyof typeof filters] !== value.name) {
                params.set(type, value.id.toString());
            } else {
                params.delete(type);
            }

            params.set("page", "1");
            router.push(`${pathname}?${params.toString()}`);
            setCurrentPage(1);
            return;
        }

        // For industry filter
        if (type === "industry") {
            const isSelected = filters.industry === value.name;
            
            // Remove product and productname search if present
            params.delete("product");
            params.delete("productname");

            setFilters((prev) => ({
                ...prev,
                industry: isSelected ? "" : value.name,
                industryId: isSelected ? "" : value.id.toString(),
                product: "",
                productname: "",
                subindustry: "", // Clear subindustry when industry changes
                subindustryId: "",
                productcategory: "", // Clear category when industry changes
                productcategoryId: "",
            }));

            // Set or remove the industry parameter
            if (!isSelected) {
                params.set("industry", value.id.toString());
            } else {
                params.delete("industry");
            }
            
            // Remove dependent filters
            params.delete("subindustry");
            params.delete("productcategory");

            params.set("page", "1");
            router.push(`${pathname}?${params.toString()}`);
            setCurrentPage(1);
            return;
        }

        // For subindustry filter
        if (type === "subindustry") {
            const isSelected = filters.subindustry === value.name;
            
            // Remove product and productname search if present
            params.delete("product");
            params.delete("productname");

            setFilters((prev) => ({
                ...prev,
                subindustry: isSelected ? "" : value.name,
                subindustryId: isSelected ? "" : value.id.toString(),
                product: "",
                productname: "",
                productcategory: "", // Clear category when subindustry changes
                productcategoryId: "",
            }));

            // Set or remove the subindustry parameter
            if (!isSelected) {
                params.set("subindustry", value.id.toString());
            } else {
                params.delete("subindustry");
            }
            
            // Remove dependent filters
            params.delete("productcategory");

            params.set("page", "1");
            router.push(`${pathname}?${params.toString()}`);
            setCurrentPage(1);
            return;
        }

        // For productcategory filter
        if (type === "productcategory") {
            const isSelected = filters.productcategory === value.name;
            
            // Remove product and productname search if present
            params.delete("product");
            params.delete("productname");

            setFilters((prev) => ({
                ...prev,
                productcategory: isSelected ? "" : value.name,
                productcategoryId: isSelected ? "" : value.id.toString(),
                product: "",
                productname: "",
            }));

            // Set or remove the productcategory parameter
            if (!isSelected) {
                params.set("productcategory", value.id.toString());
            } else {
                params.delete("productcategory");
            }

            params.set("page", "1");
            router.push(`${pathname}?${params.toString()}`);
            setCurrentPage(1);
            return;
        }
    };

    const handleSearch = (value: string) => {
        const params = new URLSearchParams();

        // Remove all filter keys
        const filterKeys = ["industry", "subindustry", "productcategory", "productname"];
        filterKeys.forEach(key => {
            if (searchParams.has(key)) {
                params.delete(key);
            }
        });

        if (value.trim()) {
            params.set("product", value);
        }

        setFilters({
            productname: "",
            industry: "",
            industryId: "",
            subindustry: "",
            subindustryId: "",
            productcategory: "",
            productcategoryId: "",
            product: value,
        });

        setCurrentPage(1);

        router.replace(
            params.toString() ? `${pathname}?${params.toString()}` : pathname
        );
    };

    const clearAllFilters = () => {
        setFilters({
            industry: "",
            industryId: "",
            subindustry: "",
            subindustryId: "",
            productcategory: "",
            productcategoryId: "",
            product: "",
            productname: "",
        });

        router.push(pathname);
        setCurrentPage(1);
    };

    const filteredIndustries = sidebar?.industry;

    const filteredSubIndustries = filters.industryId
        ? sidebar?.subIndustry?.filter(
            (item: any) => item?.industry_id?.toString() === filters.industryId,
        )
        : sidebar?.subIndustry;

    const filteredCategories = filters.subindustryId
        ? sidebar?.productCategory?.filter(
            (item: any) => item?.sub_industry_id?.toString() === filters.subindustryId,
        )
        : sidebar?.productCategory;

    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 5;

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push("...");
                pageNumbers.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pageNumbers.push(1);
                pageNumbers.push("...");
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pageNumbers.push(i);
                }
            } else {
                pageNumbers.push(1);
                pageNumbers.push("...");
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push("...");
                pageNumbers.push(totalPages);
            }
        }

        return pageNumbers;
    };

    return (
        <>
            <div className="py-8 sm:py-12 lg:pt-30 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-6 sm:mb-8">
                        <p className="text-[#cd2626] text-xs sm:text-sm font-medium tracking-wider uppercase mb-2">
                            Product Finder
                        </p>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                            Find the Right{" "}
                            <span className="text-[#cd2626]">Chemical Solution</span>
                        </h1>
                        <p className="text-gray-500 text-sm sm:text-base max-w-xl fonts">
                            Browse our catalog of specialty chemicals. Filter by industry,
                            sub-market, product type, or brand.
                        </p>
                    </div>

                    <div className="relative mb-4 sm:mb-6 fonts">
                        <BiSearch
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                        />
                        <input
                            type="text"
                            placeholder="Search products by name..."
                            value={filters.product}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="w-full h-11 sm:h-12 pl-11 sm:pl-12 pr-4 rounded-xl border border-gray-300 bg-white text-gray-700 placeholder:text-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-[#cd2626]/20 focus:border-[#cd2626] disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                    </div>

                    <div className="flex gap-2 flex-wrap mb-4 sm:mb-6 fonts">
                      
                        {filters.product && (
                            <div className="bg-gray-100 px-3 py-1.5 rounded-full flex items-center gap-2 text-xs sm:text-sm">
                                Search: "{filters.product}"
                                <button
                                    onClick={() => removeFilter("product")}
                                    className="hover:text-red-500"
                                >
                                    ✕
                                </button>
                            </div>
                        )}
                        {filters.industry && (
                            <div className="bg-gray-100 px-3 py-1.5 rounded-full flex items-center gap-2 text-xs sm:text-sm">
                                Industry: {filters.industry}
                                <button
                                    onClick={() => removeFilter("industry")}
                                    className="hover:text-red-500"
                                >
                                    ✕
                                </button>
                            </div>
                        )}
                        {filters.subindustry && (
                            <div className="bg-gray-100 px-3 py-1.5 rounded-full flex items-center gap-2 text-xs sm:text-sm">
                                Sub Industry: {filters.subindustry}
                                <button
                                    onClick={() => removeFilter("subindustry")}
                                    className="hover:text-red-500"
                                >
                                    ✕
                                </button>
                            </div>
                        )}
                        {filters.productcategory && (
                            <div className="bg-gray-100 px-3 py-1.5 rounded-full flex items-center gap-2 text-xs sm:text-sm">
                                Category: {filters.productcategory}
                                <button
                                    onClick={() => removeFilter("productcategory")}
                                    className="hover:text-red-500"
                                >
                                    ✕
                                </button>
                            </div>
                        )}

                          {filters.productname && (
                            <div className="bg-gray-100 px-3 py-1.5 rounded-full flex items-center gap-2 text-xs sm:text-sm">
                                Product Name: "{filters.productname}"
                                <button
                                    onClick={() => removeFilter("productname")}
                                    className="hover:text-red-500"
                                >
                                    ✕
                                </button>
                            </div>
                        )}
                        {(Object.values(filters).some((v) => v) || filters.product) && (
                            <button
                                onClick={clearAllFilters}
                                className="bg-red-500 text-white px-3 py-1.5 rounded-full text-xs sm:text-sm hover:bg-red-600 transition-colors"
                            >
                                Clear All
                            </button>
                        )}
                    </div>

                    <div className="lg:hidden mb-4">
                        <button
                            onClick={() => setIsFilterOpen(true)}
                            className="w-full bg-gray-100 text-gray-700 py-2.5 px-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
                        >
                            <BiSearch size={18} />
                            Filters & Categories
                        </button>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-5 lg:gap-6">
                        <div className="hidden lg:block lg:w-80 xl:w-96 shrink-0">
                            <div className="">
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
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                                <h1 className="text-sm sm:text-base text-gray-500 font-semibold">
                                    Showing {apiData.from}-{apiData.to} of {apiData.total} Result
                                    {totalProducts !== 1 ? "s" : ""}
                                </h1>

                                <div className="flex items-center gap-2">
                                    <label className="text-sm text-gray-600">Show:</label>
                                    <select
                                        value={pageSize}
                                        onChange={handlePageSizeChange}
                                        className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#cd2626]/20 focus:border-[#cd2626]"
                                    >
                                        <option value={10}>10</option>
                                        <option value={15}>15</option>
                                        <option value={20}>20</option>
                                        <option value={30}>30</option>
                                        <option value={50}>50</option>
                                    </select>
                                    <span className="text-sm text-gray-600">per page</span>
                                </div>
                            </div>

                            <div className="space-y-3 sm:space-y-4">
                                {products.length > 0 ? (
                                    products.map((pro: any) => {
                                        const pendingTDS = hasPendingRequest(pro?.id, "tds");
                                        const pendingSDS = hasPendingRequest(pro?.id, "sds");

                                        return (
                                            <div
                                                key={pro?.id}
                                                className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5 hover:shadow-lg transition-all duration-300"
                                            >
                                                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                                                    <div className="flex-1 min-w-0">
                                                        <Link
                                                            href={`/product/${pro?.slug}`}
                                                            className="font-bold text-base sm:text-lg text-[#cd2626] mb-1 hover:underline"
                                                        >
                                                            {pro?.name}
                                                        </Link>
                                                        <div
                                                            dangerouslySetInnerHTML={{
                                                                __html: pro?.description || "",
                                                            }}
                                                            className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-3 fonts line-clamp-5"
                                                        />
                                                        <div className="flex flex-wrap gap-1.5">
                                                            <div className="flex flex-row w-full justify-between">
                                                                <div className="space-x-2">
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
                                                                            href={
                                                                                !pro?.is_tds_locked ? pro?.tds_doc : "#"
                                                                            }
                                                                            onClick={(e) =>
                                                                                handleDocumentClick(
                                                                                    e,
                                                                                    pro,
                                                                                    "tds",
                                                                                    pro?.tds_doc,
                                                                                )
                                                                            }
                                                                            target={
                                                                                !pro?.is_tds_locked
                                                                                    ? "_blank"
                                                                                    : undefined
                                                                            }
                                                                            rel="noopener noreferrer"
                                                                            className={`text-xs h-8 px-3 gap-1 flex items-center font-semibold rounded-md whitespace-nowrap
                                                                            ${pro?.is_tds_locked
                                                                                    ? "bg-[#cd2626] text-white cursor-pointer"
                                                                                    : "bg-green-800 text-white"
                                                                                }`}
                                                                        >
                                                                            {pro?.is_tds_locked ? (
                                                                                <FaLock />
                                                                            ) : (
                                                                                <FaLockOpen />
                                                                            )}
                                                                            TDS
                                                                        </a>
                                                                    )}

                                                                    {pro?.msds_doc && (
                                                                        <a
                                                                            href={
                                                                                !pro?.is_msds_locked
                                                                                    ? pro?.msds_doc
                                                                                    : "#"
                                                                            }
                                                                            onClick={(e) =>
                                                                                handleDocumentClick(
                                                                                    e,
                                                                                    pro,
                                                                                    "sds",
                                                                                    pro?.msds_doc,
                                                                                )
                                                                            }
                                                                            target={
                                                                                !pro?.is_msds_locked
                                                                                    ? "_blank"
                                                                                    : undefined
                                                                            }
                                                                            rel="noopener noreferrer"
                                                                            className={`text-xs h-8 px-3 gap-1 flex items-center text-white font-semibold rounded-md whitespace-nowrap
                                                                            ${pro?.is_msds_locked
                                                                                    ? "bg-[#cd2626] cursor-pointer"
                                                                                    : "bg-green-800"
                                                                                }`}
                                                                        >
                                                                            {pro?.is_msds_locked ? (
                                                                                <FaLock />
                                                                            ) : (
                                                                                <FaLockOpen />
                                                                            )}
                                                                            SDS
                                                                        </a>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="text-center py-12 bg-gray-50 rounded-xl">
                                        <p className="text-gray-500 text-sm sm:text-base">
                                            No products found matching your criteria.
                                        </p>
                                        <button
                                            onClick={clearAllFilters}
                                            className="mt-4 text-[#cd2626] hover:underline text-sm sm:text-base"
                                        >
                                            Clear all filters
                                        </button>
                                    </div>
                                )}
                            </div>

                            {totalPages > 1 && products.length > 0 && (
                                <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="px-3 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Previous
                                    </button>

                                    {getPageNumbers().map((page, index) => (
                                        <button
                                            key={index}
                                            onClick={() =>
                                                typeof page === "number" && handlePageChange(page)
                                            }
                                            disabled={typeof page !== "number"}
                                            className={`min-w-10 px-3 py-2 rounded-md transition-colors ${currentPage === page
                                                ? "bg-[#cd2626] text-white"
                                                : typeof page === "number"
                                                    ? "border border-gray-300 text-gray-700 hover:bg-gray-50"
                                                    : "border-none text-gray-500 cursor-default"
                                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                                        >
                                            {page}
                                        </button>
                                    ))}

                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="px-3 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <DocumentRequestModal
                hasPendingRequest={hasPendingRequest}
                key={selectedDocument?.productId}
                handleReRequest={handleReRequest}
                isModalOpen={isModalOpen}
                setCaptchaValue={setCaptchaValue}
                selectedDocument={selectedDocument}
                formData={formData}
                captchaValue={captchaValue}
                handleFormChange={handleFormChange}
                handleSubmitRequest={handleSubmitRequest}
                isSubmitting={isSubmitting}
                captchaRef={captchaRef}
                submitMessage={submitMessage}
                formatRequestTime={formatRequestTime}
                getTimeRemaining={getTimeRemaining}
                closeModal={() => {
                    setIsModalOpen(false);
                    setSelectedDocument(null);
                    setSubmitMessage(null);
                }}
            />
        </>
    );
};

export default page;