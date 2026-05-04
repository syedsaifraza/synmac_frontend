export  const FilterSidebar = ({

    filteredIndustries,
    filteredSubIndustries,
    handleFilterChange,
    filters,
    filteredCategories

}:any) => (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className='space-y-4'>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="font-semibold text-gray-800">Industry</h2>
                    </div>
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
                                    <span className="text-gray-500 text-xs">({item?.products?.length || 0})</span>
                                </label>
                            ))
                        ) : (
                            <p className="text-gray-400 text-sm text-center py-2">No industries found</p>
                        )}
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="font-semibold text-gray-800">Sub Industry</h2>
                    </div>
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
                                    <span className="text-gray-500 text-xs">({item?.products?.length || 0})</span>
                                </label>
                            ))
                        ) : (
                            <p className="text-gray-400 text-sm text-center py-2">No sub-industries found</p>
                        )}
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="font-semibold text-gray-800">Product Category</h2>
                    </div>
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
