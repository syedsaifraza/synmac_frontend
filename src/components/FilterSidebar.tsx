import { useState } from "react";

export const FilterSidebar = ({
    filteredIndustries,
    filteredSubIndustries,
    handleFilterChange,
    filters,
    filteredCategories
}:any) => {
    const [openSections, setOpenSections] = useState({
        industry: true,
        subIndustry: true,
        category: true
    });

    const toggleSection = (section: keyof typeof openSections) => {
        setOpenSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    return (
        <div className="bg-gray-50 border h-[86vh] overflow-y-scroll sticky top-20 border-gray-200 rounded-lg p-4">
            <div className='space-y-4'>
                {/* Industry Accordion */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div 
                        className="flex justify-between items-center mb-3 cursor-pointer"
                        onClick={() => toggleSection("industry")}
                    >
                        <h2 className="font-semibold text-gray-800">Industry</h2>
                        <svg
                            className={`w-5 h-5 transition-transform duration-200 ${
                                openSections.industry ? "rotate-180" : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </div>
                    {openSections.industry && (
                        <div className="space-y-2 max-h-50 overflow-y-auto">
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
                                        <p>{item?.product_count || (0)}</p>
                                    </label>
                                ))
                            ) : (
                                <p className="text-gray-400 text-sm text-center py-2">No industries found</p>
                            )}
                        </div>
                    )}
                </div>

                {/* Sub Industry Accordion */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div 
                        className="flex justify-between items-center mb-3 cursor-pointer"
                        onClick={() => toggleSection("subIndustry")}
                    >
                        <h2 className="font-semibold text-gray-800">Sub Industry</h2>
                        <svg
                            className={`w-5 h-5 transition-transform duration-200 ${
                                openSections.subIndustry ? "rotate-180" : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </div>
                    {openSections.subIndustry && (
                        <div className="space-y-2 max-h-50 overflow-y-auto">
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
                                        <p>{item?.product_count || (0)}</p>
                                    </label>
                                ))
                            ) : (
                                <p className="text-gray-400 text-sm text-center py-2">No sub-industries found</p>
                            )}
                        </div>
                    )}
                </div>

                {/* Product Category Accordion */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div 
                        className="flex justify-between items-center mb-3 cursor-pointer"
                        onClick={() => toggleSection("category")}
                    >
                        <h2 className="font-semibold text-gray-800">Product Category</h2>
                        <svg
                            className={`w-5 h-5 transition-transform duration-200 ${
                                openSections.category ? "rotate-180" : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </div>
                    {openSections.category && (
                        <div className="space-y-2 max-h-50 overflow-y-auto">
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
                                        <p>{item?.product_count || (0)}</p>
                                    </label>
                                ))
                            ) : (
                                <p className="text-gray-400 text-sm text-center py-2">No categories found</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};