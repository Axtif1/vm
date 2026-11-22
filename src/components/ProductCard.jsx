"use client";

import React, { useState } from "react";
import Link from "next/link";
import { formatPrice } from "@/utils/currency";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Star, Check } from "lucide-react";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  const handleQuickAdd = (e, size) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, size || product.sizes?.[0] || "L", 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div
      className="group relative flex flex-col bg-white overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container (1:1 Aspect Ratio) */}
      <div className="relative w-full aspect-square overflow-hidden bg-[#f6f6f6]">
        <Link href={`/products/${product.id}`} className="block w-full h-full">
          {/* Primary Studio Image */}
          <img
            src={product.primaryImage}
            alt={product.name}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              isHovered && product.hoverImage ? "opacity-0" : "opacity-100"
            }`}
            loading="lazy"
          />

          {/* Hover Secondary Studio Image */}
          {product.hoverImage && (
            <img
              src={product.hoverImage}
              alt={`${product.name} alternate view`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
              loading="lazy"
            />
          )}
        </Link>

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {discountPercent && (
            <span className="bg-[#d63f45] text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
              {discountPercent}% OFF
            </span>
          )}
          {product.isNew && (
            <span className="bg-[#11716c] text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
              NEW
            </span>
          )}
        </div>

        {/* Quick Size Selection Overlay on Hover (Desktop) */}
        <div
          className={`hidden sm:flex absolute inset-x-0 bottom-0 bg-white/95 backdrop-blur-xs p-2.5 border-t border-neutral-200 items-center justify-center gap-1.5 transition-all duration-200 z-20 ${
            isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          }`}
        >
          <span className="text-[10px] uppercase font-bold text-neutral-500 mr-1 tracking-wider">
            Quick Add:
          </span>
          {product.sizes.slice(0, 5).map((size) => (
            <button
              key={size}
              onClick={(e) => handleQuickAdd(e, size)}
              className="px-2.5 py-1 text-[11px] font-bold border border-neutral-300 hover:border-[#11716c] hover:bg-[#11716c] hover:text-white transition-all text-neutral-900 cursor-pointer"
            >
              {size}
            </button>
          ))}
        </div>

        {/* Mobile Quick Add Button */}
        <button
          onClick={(e) => handleQuickAdd(e, product.sizes?.[0] || "L")}
          aria-label="Add to cart"
          className="sm:hidden absolute bottom-2 right-2 bg-white/95 p-2 rounded-full shadow-md text-neutral-900 active:scale-95 z-20 cursor-pointer"
        >
          {isAdded ? (
            <Check className="w-4 h-4 text-[#11716c]" />
          ) : (
            <ShoppingBag className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Product Details */}
      <div className="pt-3 pb-2 flex flex-col space-y-1">
        {/* Star Rating */}
        <div className="flex items-center gap-1 text-[#f59e0b] text-[11px]">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < 4 || (product.rating && product.rating >= 4.8)
                    ? "fill-[#f59e0b] text-[#f59e0b]"
                    : "fill-neutral-200 text-neutral-200"
                }`}
              />
            ))}
          </div>
          <span className="text-neutral-500 font-medium text-[11px] ml-1">
            {product.rating || 4.8} ({product.reviewsCount || 34})
          </span>
        </div>

        {/* Product Title */}
        <Link href={`/products/${product.id}`} className="group-hover:text-[#11716c] transition-colors">
          <h3 className="text-xs sm:text-[13px] font-bold text-neutral-900 leading-snug line-clamp-1 uppercase tracking-wide">
            {product.name}
          </h3>
        </Link>

        {/* Pricing */}
        <div className="flex items-center gap-2 pt-0.5">
          <span className="text-sm font-bold text-neutral-900">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-xs text-neutral-400 line-through font-normal">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
