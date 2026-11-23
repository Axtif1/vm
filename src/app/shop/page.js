"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS, COLLECTIONS, CATEGORIES } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { SlidersHorizontal, ArrowUpDown, ChevronDown, Check } from "lucide-react";

function ShopContent() {
  const searchParams = useSearchParams();
  const collectionParam = searchParams.get("collection");
  const categoryParam = searchParams.get("category");
  const maxPriceParam = searchParams.get("maxPrice");

  const [selectedCategory, setSelectedCategory] = useState(
    collectionParam || categoryParam || "all"
  );
  const [sortBy, setSortBy] = useState("featured");

  // Keep category in sync with URL search params
  useEffect(() => {
    setSelectedCategory(collectionParam || categoryParam || "all");
  }, [collectionParam, categoryParam]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category / Collection check
      if (selectedCategory !== "all") {
        const matchesCategory = product.category === selectedCategory;
        const matchesCollection = product.collections?.includes(selectedCategory);
        if (!matchesCategory && !matchesCollection) {
          return false;
        }
      }

      // Max price check
      if (maxPriceParam) {
        const max = parseFloat(maxPriceParam);
        if (product.price > max) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0; // featured
    });
  }, [selectedCategory, maxPriceParam, sortBy]);

  // Current collection info
  const currentCollection = COLLECTIONS.find((c) => c.id === selectedCategory);

  const filterTabs = [
    { id: "all", label: "All Apparel" },
    { id: "new-arrivals", label: "New Arrivals" },
    { id: "best-sellers", label: "Best Sellers" },
    { id: "winter-collection", label: "Winter Collection" },
    { id: "waffle-collection", label: "Waffle Collection" },
    { id: "t-shirts", label: "T-Shirts" },
    { id: "hoodies-jackets", label: "Hoodies & Jackets" },
    { id: "bottoms", label: "Bottoms & Sweatpants" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Collection Header Banner */}
      <div className="bg-[#111111] text-white py-12 sm:py-16 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <p className="text-[11px] font-bold tracking-widest uppercase text-[#11716c]">
            {currentCollection ? currentCollection.subtitle : "V-MIND FASHION CATALOG"}
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight">
            {currentCollection ? currentCollection.title : "All Products"}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto leading-relaxed">
            {currentCollection
              ? currentCollection.description
              : "Discover our full range of 240+ GSM heavyweight cotton tees, textured waffle knits, boxy hoodies, and relaxed cargo trousers."}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-neutral-200">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedCategory === tab.id
                    ? "bg-[#11716c] text-white shadow-xs"
                    : "bg-neutral-100 hover:bg-neutral-200 text-neutral-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center justify-between sm:justify-end gap-3 self-end md:self-auto w-full md:w-auto">
            <span className="text-xs text-neutral-500 font-medium">
              {filteredProducts.length} Products
            </span>
            <div className="relative inline-flex items-center">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-neutral-100 border border-neutral-300 text-xs font-bold uppercase tracking-wider text-neutral-800 py-2 pl-3 pr-8 rounded-full focus:outline-hidden focus:border-[#11716c] cursor-pointer"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-500 absolute right-3 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Product Grid: 4-cols desktop, 3-cols tablet, 2-cols mobile */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 space-y-4">
            <p className="text-base font-bold uppercase tracking-wider text-neutral-800">
              No products found in this category
            </p>
            <button
              onClick={() => setSelectedCategory("all")}
              className="firvt-pill-btn bg-[#11716c] text-white px-6 py-2.5 text-xs font-semibold"
            >
              Show All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 pt-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen p-12 text-center text-xs uppercase font-bold text-neutral-500">Loading catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
