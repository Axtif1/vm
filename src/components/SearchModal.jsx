"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/utils/currency";
import { Search, X, ArrowRight } from "lucide-react";

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen } = useCart();
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
    }
  }, [isSearchOpen]);

  // Lock body scrolling when search modal is open
  useEffect(() => {
    if (isSearchOpen) {
      const originalOverflow = document.body.style.overflow;
      const originalPosition = document.body.style.position;
      const originalTop = document.body.style.top;
      const originalWidth = document.body.style.width;
      const scrollY = window.scrollY;

      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.position = originalPosition;
        document.body.style.top = originalTop;
        document.body.style.width = originalWidth;
        window.scrollTo(0, scrollY);
      };
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredProducts = query.trim() === ""
    ? []
    : PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(query.toLowerCase()) ||
        (p.tag && p.tag.toLowerCase().includes(query.toLowerCase()))
      );

  const popularSearches = ["Waffle", "Hoodie", "Drop-Shoulder", "Cargo", "Winter", "Sweatpants"];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto overscroll-contain">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity touch-none"
        onClick={() => setIsSearchOpen(false)}
        onTouchMove={(e) => e.preventDefault()}
      />

      <div className="relative min-h-screen flex items-start justify-center p-4 sm:p-6 lg:p-8 pt-12 sm:pt-20">
        <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-2xl overflow-hidden z-50 overscroll-contain"
          style={{ overscrollBehavior: "contain" }}
        >
          
          {/* Search Header */}
          <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center gap-3">
            <Search className="w-5 h-5 text-neutral-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search products, collections, fabrics..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full text-sm sm:text-base text-neutral-900 placeholder-neutral-400 focus:outline-hidden font-medium"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-neutral-400 hover:text-neutral-700 p-1"
                aria-label="Clear query"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="text-xs font-bold uppercase tracking-wider text-neutral-500 hover:text-neutral-900 ml-2"
            >
              ESC
            </button>
          </div>

          {/* Quick Popular Searches */}
          {query.trim() === "" && (
            <div className="p-6 space-y-4">
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Popular Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 bg-neutral-100 hover:bg-[#11716c] hover:text-white transition-colors rounded-full text-xs font-medium text-neutral-700 uppercase tracking-wide"
                  >
                    {term}
                  </button>
                ))}
              </div>

              {/* Featured Drops */}
              <div className="pt-4 border-t border-neutral-100">
                <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
                  Trending Pieces
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {PRODUCTS.slice(0, 3).map((item) => (
                    <Link
                      key={item.id}
                      href={`/products/${item.id}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="group flex flex-col space-y-1.5 p-2 rounded hover:bg-neutral-50 transition-colors"
                    >
                      <div className="aspect-square w-full rounded overflow-hidden bg-neutral-100">
                        <img
                          src={item.primaryImage}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <p className="text-xs font-semibold text-neutral-900 line-clamp-1 group-hover:text-[#11716c] uppercase">
                        {item.name}
                      </p>
                      <p className="text-xs font-bold text-neutral-700">
                        {formatPrice(item.price)}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Results List */}
          {query.trim() !== "" && (
            <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-5">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12 space-y-2">
                  <p className="text-sm font-bold uppercase text-neutral-800">
                    No results found for &ldquo;{query}&rdquo;
                  </p>
                  <p className="text-xs text-neutral-500">
                    Try searching for &quot;Waffle&quot;, &quot;Hoodie&quot;, or &quot;Tee&quot;.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-2">
                    Found {filteredProducts.length} matching products
                  </p>
                  {filteredProducts.map((p) => (
                    <Link
                      key={p.id}
                      href={`/products/${p.id}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center gap-3.5 p-2 rounded-md hover:bg-neutral-50 transition-colors group"
                    >
                      <div className="w-14 h-14 bg-neutral-100 rounded overflow-hidden shrink-0 border border-neutral-200">
                        <img
                          src={p.primaryImage}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-neutral-900 group-hover:text-[#11716c] transition-colors uppercase truncate">
                          {p.name}
                        </p>
                        <p className="text-[11px] text-neutral-500 truncate">
                          {p.subtitle}
                        </p>
                        <p className="text-xs font-bold text-[#11716c] mt-0.5">
                          {formatPrice(p.price)}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-[#11716c] transition-colors" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
