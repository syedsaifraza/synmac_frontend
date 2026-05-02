"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

const SearchOverlay = ({ open, onClose }: SearchOverlayProps) => {
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isNavigating, setIsNavigating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const currentUrlRef = useRef<string>("");

  // Load recent searches
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
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
      currentUrlRef.current = window.location.href;
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Watch for URL changes
  useEffect(() => {
    if (!isNavigating) return;

    const checkUrlChange = setInterval(() => {
      if (currentUrlRef.current !== window.location.href) {
        setIsNavigating(false);
        onClose();
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

  const handleSearch = async () => {
    if (query.trim().length >= 2 && !isNavigating) {
      setIsNavigating(true);
      saveRecentSearch(query.trim());
      currentUrlRef.current = window.location.href;
      await router.push(`/product?productname=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim().length >= 2 && !isNavigating) {
      handleSearch();
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
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

        {/* Search Input */}
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
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
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

        {/* Search Result */}
        {!isNavigating && query.trim().length >= 2 && (
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

        {/* Recent Searches */}
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