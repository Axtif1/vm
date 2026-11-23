"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/utils/currency";
import { X, Check } from "lucide-react";

export default function QuickAddModal() {
  const router = useRouter();
  const { quickAddProduct, setQuickAddProduct, addToCart, setIsCartOpen } = useCart();
  const [selectedSize, setSelectedSize] = useState("XS");
  const [isAdding, setIsAdding] = useState(false);

  const ALL_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

  // Default to first size available on product or "XS"
  useEffect(() => {
    if (quickAddProduct) {
      if (quickAddProduct.sizes && quickAddProduct.sizes.length > 0) {
        setSelectedSize(quickAddProduct.sizes[0]);
      } else {
        setSelectedSize("XS");
      }
    }
  }, [quickAddProduct]);

  // Lock body scrolling when modal is open
  useEffect(() => {
    if (quickAddProduct) {
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
  }, [quickAddProduct]);

  if (!quickAddProduct) return null;

  const sizes = quickAddProduct.sizes && quickAddProduct.sizes.length > 0
    ? quickAddProduct.sizes
    : ALL_SIZES;

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(quickAddProduct, selectedSize, 1);
    setTimeout(() => {
      setIsAdding(false);
      setQuickAddProduct(null);
      setIsCartOpen(true);
    }, 250);
  };

  const handleVisitProduct = () => {
    const id = quickAddProduct.id;
    setQuickAddProduct(null);
    router.push(`/products/${id}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center overscroll-none touch-none">
      {/* Dark Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity touch-none"
        onClick={() => setQuickAddProduct(null)}
        onTouchMove={(e) => e.preventDefault()}
      />

      {/* Modal / Bottom-Sheet Dialog */}
      <div
        className="relative w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl p-5 z-10 max-h-[92vh] overflow-y-auto overscroll-contain touch-auto flex flex-col transition-all duration-300"
        style={{ overscrollBehavior: "contain" }}
      >
        {/* Top Header: Price & Close Button */}
        <div className="flex items-center justify-between pb-3">
          <div className="flex items-baseline gap-2">
            <span className="text-sm sm:text-base font-bold text-neutral-900 tracking-tight">
              {formatPrice(quickAddProduct.price)}
            </span>
            {quickAddProduct.originalPrice && quickAddProduct.originalPrice > quickAddProduct.price && (
              <span className="text-xs sm:text-sm text-neutral-400 line-through font-normal">
                {formatPrice(quickAddProduct.originalPrice)}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => setQuickAddProduct(null)}
            aria-label="Close dialog"
            className="w-8 h-8 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-neutral-600 hover:text-black hover:bg-neutral-50 shadow-xs cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Product Image */}
        <div className="relative w-full aspect-square sm:aspect-4/3 rounded-lg overflow-hidden bg-neutral-100 mb-3 border border-neutral-100">
          <img
            src={quickAddProduct.primaryImage || quickAddProduct.hoverImage}
            alt={quickAddProduct.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Size Selection Section */}
        <div className="py-2">
          <p className="text-xs sm:text-sm font-semibold text-neutral-800 mb-2.5">
            Select Size
          </p>

          <div className="flex flex-wrap gap-2.5">
            {sizes.map((size) => {
              const isSelected = selectedSize === size;
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[40px] h-10 px-3 rounded-full flex items-center justify-center text-xs transition-all cursor-pointer ${
                    isSelected
                      ? "border-2 border-neutral-900 font-bold text-neutral-900 shadow-xs"
                      : "border border-neutral-200 text-neutral-600 hover:border-neutral-400 hover:text-neutral-900 font-medium"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Buttons matching FIRVT style */}
        <div className="space-y-2.5 pt-4 mt-auto">
          {/* 1. Add to Cart Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full py-3.5 px-6 rounded-full bg-[#11716c] hover:bg-[#0c5652] active:scale-[0.99] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
          >
            {isAdding ? (
              <>
                <Check className="w-4 h-4" />
                <span>ADDED TO CART</span>
              </>
            ) : (
              <span>ADD TO CART</span>
            )}
          </button>

          {/* 2. Visit Product Page Button */}
          <button
            type="button"
            onClick={handleVisitProduct}
            className="w-full py-3.5 px-6 rounded-full bg-white hover:bg-neutral-50 active:scale-[0.99] text-neutral-900 border border-neutral-900 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center cursor-pointer"
          >
            VISIT PRODUCT PAGE
          </button>
        </div>
      </div>
    </div>
  );
}
