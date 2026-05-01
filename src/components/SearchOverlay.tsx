"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { FaArrowRight, FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

const SearchOverlay = ({ open, onClose }: SearchOverlayProps) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  // Function to get product URL with product name
  const getProductUrl = (productName: string) => {
    const params = new URLSearchParams();
    if (productName) params.append("productname", productName);
    return `/product?${params.toString()}`;
  };

  const handleSearch = () => {
    if (query.trim().length >= 2) {
      onClose();
      // Navigate to product page with product name in URL
      router.push(getProductUrl(query.trim()));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim().length >= 2) {
      handleSearch();
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-60 bg-background/8 backdrop-blur-xl flex flex-col">
      <div className="container mx-auto px-6 pt-8">
        <div className="flex items-center justify-between mb-8">
          <span className="font-display text-lg font-bold text-foreground">
            Search Products
          </span>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            <IoClose size={24} />
          </button>
        </div>

        <div className="relative max-w-2xl mx-auto mb-8">
          <FaSearch
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search by product name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full h-14 pl-12 pr-4 rounded-xl border border-border bg-card text-foreground text-lg placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
        </div>

        {query.trim().length >= 2 && (
          <div className="max-w-2xl mx-auto">
            <button
              onClick={handleSearch}
              className="w-full flex items-center justify-between p-4 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <FaSearch className="text-primary" />
                <div className="text-left">
                  <p className="font-medium text-foreground">
                    Search for "{query.trim()}"
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Go to product page
                  </p>
                </div>
              </div>
              <FaArrowRight className="text-primary group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        {query.trim().length < 2 && (
         <>
         </>
        )}
      </div>
    </div>
  );
};

export default SearchOverlay;