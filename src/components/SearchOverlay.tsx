"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

const SearchOverlay = ({ open, onClose }: SearchOverlayProps) => {

  const {product} = useSelector((state:any)=>state.resources)
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isNavigating, setIsNavigating] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const currentUrlRef = useRef<string>("");
  const navigationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);


  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const saveRecentSearch = (searchTerm: string) => {
    const updated = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };



  useEffect(() => {
    if (open) {
      setQuery("");
      setIsNavigating(false);
      setSuggestions([]);
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
      currentUrlRef.current = window.location.href;
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, [open]);

  // URL change detection effect with delay
  useEffect(() => {
    if (!isNavigating) return;

    const checkUrlChange = setInterval(() => {
      if (currentUrlRef.current !== window.location.href) {
        // Add delay before closing
        closeTimeoutRef.current = setTimeout(() => {
          setIsNavigating(false);
          onClose();
        }, 800); // 800ms delay - adjust as needed
        clearInterval(checkUrlChange);
      }
    }, 100);

    return () => clearInterval(checkUrlChange);
  }, [isNavigating, onClose]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isNavigating) onClose();
    };
    if (open) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose, isNavigating]);

  const handleProductClick = async (product: any) => {
    if (isNavigating) return;
    
    setIsNavigating(true);
    saveRecentSearch(product.name);
    
    const params = new URLSearchParams();
    
    if (product?.name) params.set("productname", product.name);
    if (product?.id) params.set("productid", product.id);
    if (product?.industry_name) params.set("industryname", product.industry_name);
    if (product?.sub_industry_name) params.set("subindustryname", product.sub_industry_name);
    if (product?.product_category_name) params.set("productcategoryname", product.product_category_name);
    
    const url = `/product?${params.toString()}`;
    currentUrlRef.current = window.location.href;
    
    // Set a timeout to force close if navigation takes too long
    navigationTimeoutRef.current = setTimeout(() => {
      setIsNavigating(false);
      onClose();
    }, 5000);
    
    await router.push(url);
    
    // Clear navigation timeout
    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
    }
    
    // Add delay before closing after navigation
    closeTimeoutRef.current = setTimeout(() => {
      setIsNavigating(false);
      onClose();
    }, 600); // 600ms delay - adjust as needed
  };

  const handleSearch = async () => {
    if (query.trim().length >= 2 && !isNavigating) {
      setIsNavigating(true);
      saveRecentSearch(query.trim());
      currentUrlRef.current = window.location.href;
      
      // Set a timeout to force close if navigation takes too long
      navigationTimeoutRef.current = setTimeout(() => {
        setIsNavigating(false);
        onClose();
      }, 5000);
      
      await router.push(`/product?product=${encodeURIComponent(query.trim())}`);
      
      // Clear navigation timeout
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
      
      // Add delay before closing after navigation
      closeTimeoutRef.current = setTimeout(() => {
        setIsNavigating(false);
        onClose();
      }, 600); 
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim().length >= 2 && !isNavigating) {
      handleSearch();
    }
  };

  if (!open) return null;

  // Calculate loading message based on action type
  const getLoadingMessage = () => {
    if (query.trim().length >= 2) {
      return `Searching for "${query.trim()}"...`;
    }
    return "Loading...";
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold text-white">Search Products</h2>
          <button
            onClick={onClose}
            disabled={isNavigating}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white disabled:opacity-50"
          >
            <IoClose size={24} />
          </button>
        </div>

        <div className="relative mb-8">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search by product name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isNavigating}
            className="w-full h-12 pl-11 pr-12 rounded-lg border border-gray-700 bg-white/5 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#b62126] focus:ring-1 focus:ring-[#b62126] disabled:opacity-50"
          />
          
          {isNavigating ? (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-[#b62126] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
              >
                <FaTimes size={16} />
              </button>
            )
          )}
        </div>

        {/* Loading overlay with delay message */}
        {isNavigating && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-[#b62126] border-t-transparent rounded-full animate-spin mb-4"></div>
          
          </div>
        )}

        {/* Suggestions - only show when not navigating */}
        {!isNavigating && suggestions.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
              Product Suggestions ({suggestions.length})
            </h3>
            <div className="space-y-2">
              {suggestions.map((product, idx: number) => (
                <button
                  key={idx}
                  onClick={() => handleProductClick(product)}
                  className="w-full p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-left border border-gray-800 group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium group-hover:text-[#b62126] transition-colors">
                        {product.name}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {product.industry_name && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-300">
                            {product.industry_name}
                          </span>
                        )}
                        {product.sub_industry_name && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-300">
                            {product.sub_industry_name}
                          </span>
                        )}
                        {product.product_category_name && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-300">
                            {product.product_category_name}
                          </span>
                        )}
                      </div>
                    </div>
                    <FaSearch className="text-gray-500 group-hover:text-[#b62126] transition-colors shrink-0" size={14} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search button - only show when not navigating */}
        {!isNavigating && query.trim().length >= 2 && suggestions.length === 0 && (
          <button
            onClick={handleSearch}
            className="w-full p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-left border border-gray-800"
          >
            <div className="flex items-center gap-3">
              <FaSearch className="text-[#b62126]" size={16} />
              <div>
                <p className="text-white text-sm">
                  Search for "<span className="text-[#b62126]">{query.trim()}</span>"
                </p>
                <p className="text-xs text-gray-500 mt-0.5">Press Enter to search</p>
              </div>
            </div>
          </button>
        )}

      
        {!isNavigating && !query && recentSearches.length > 0 && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Recent Searches</h3>
              <button
                onClick={clearRecentSearches}
                className="text-xs text-gray-500 hover:text-white transition-colors"
              >
                Clear All
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQuery(search);
                    handleSearch();
                  }}
                  className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white text-sm transition-colors flex items-center gap-2"
                >
                  <FaSearch size={12} className="text-gray-500" />
                  {search}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchOverlay;