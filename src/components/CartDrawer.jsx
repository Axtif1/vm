"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/data/products";
import { formatPrice } from "@/utils/currency";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Tag,
  ShieldCheck,
  Truck,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    addToCart,
    setQuickAddProduct,
    subtotal,
    discountCode,
    discountPercent,
    discountAmount,
    discountError,
    applyDiscount,
    removeDiscount,
    shipping,
    total
  } = useCart();

  const [inputCode, setInputCode] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const carouselRef = useRef(null);

  const scrollSuggestions = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -240 : 240;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Get suggested items not currently in cart
  const cartProductIds = new Set(cart.map((item) => item.productId));
  const suggestedProducts = PRODUCTS.filter((p) => !cartProductIds.has(p.id)).slice(0, 8);

  // Lock body scrolling when cart drawer is open
  React.useEffect(() => {
    if (isCartOpen) {
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
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!inputCode) return;
    setIsApplying(true);
    setTimeout(() => {
      applyDiscount(inputCode);
      setIsApplying(false);
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden overscroll-none touch-none">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 touch-none"
        onClick={() => setIsCartOpen(false)}
        onTouchMove={(e) => e.preventDefault()}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10 touch-auto">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col z-50">
          
          {/* Header */}
          <div className="px-5 py-4 border-b border-neutral-100 flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-[#11716c]" />
              <h2 className="text-sm font-bold tracking-wider uppercase text-neutral-900">
                Your Shopping Cart ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              aria-label="Close cart drawer"
              className="p-1.5 text-neutral-400 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Pan-India Free Shipping Banner */}
          <div className="bg-[#11716c]/10 text-[#11716c] px-5 py-2.5 text-xs font-semibold flex items-center gap-2 border-b border-[#11716c]/20 shrink-0">
            <Truck className="w-4 h-4 shrink-0" />
            <span>Pan-India Free Express Shipping Unlocked!</span>
          </div>

          {/* Cart Items List */}
          <div
            className="flex-1 overflow-y-auto p-5 space-y-4 overscroll-contain"
            style={{
              overscrollBehavior: "contain",
              WebkitOverflowScrolling: "touch"
            }}
          >
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold uppercase tracking-wide text-neutral-900">
                    Your cart is currently empty
                  </p>
                  <p className="text-xs text-neutral-500 max-w-xs">
                    Explore our Winter & Waffle collections to find your new streetwear essentials.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="firvt-pill-btn bg-[#11716c] hover:bg-[#0c5652] text-white px-6 py-2.5 text-xs mt-2"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.itemKey}
                  className="flex gap-3.5 pb-4 border-b border-neutral-100 last:border-none"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 bg-neutral-100 rounded-xs overflow-hidden shrink-0 border border-neutral-200">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <Link
                          href={`/products/${item.productId}`}
                          onClick={() => setIsCartOpen(false)}
                          className="text-xs font-bold text-neutral-900 hover:text-[#11716c] transition-colors uppercase line-clamp-1 pr-2"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.itemKey)}
                          className="text-neutral-400 hover:text-red-600 transition-colors p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] font-semibold text-neutral-500 mt-0.5">
                        Size: <span className="text-neutral-900">{item.size}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Selector */}
                      <div className="inline-flex items-center border border-neutral-200 rounded">
                        <button
                          onClick={() => updateQuantity(item.itemKey, item.quantity - 1)}
                          className="p-1 text-neutral-600 hover:bg-neutral-100 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold text-neutral-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.itemKey, item.quantity + 1)}
                          className="p-1 text-neutral-600 hover:bg-neutral-100 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <span className="text-xs font-bold text-neutral-900">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                        {item.originalPrice && (
                          <div className="text-[10px] text-neutral-400 line-through">
                            {formatPrice(item.originalPrice * item.quantity)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* "You may also like..." Suggestions Section (FIRVT Style) */}
            {suggestedProducts.length > 0 && (
              <div className="pt-5 pb-2 border-t border-neutral-100">
                <div className="flex items-center justify-between mb-2.5">
                  <h3 className="text-xs sm:text-sm font-bold text-neutral-900 tracking-tight">
                    You may also like...
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => scrollSuggestions("left")}
                      aria-label="Previous suggestions"
                      className="w-6 h-6 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-neutral-600 hover:text-black hover:border-neutral-400 shadow-2xs transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollSuggestions("right")}
                      aria-label="Next suggestions"
                      className="w-6 h-6 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-neutral-600 hover:text-black hover:border-neutral-400 shadow-2xs transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Horizontal Scrolling Suggestion Cards */}
                <div
                  ref={carouselRef}
                  className="flex gap-2.5 overflow-x-auto pb-2 pt-0.5"
                  style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    WebkitOverflowScrolling: "touch"
                  }}
                >
                  {suggestedProducts.map((p) => {
                    const discount = p.originalPrice && p.originalPrice > p.price
                      ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
                      : null;

                    return (
                      <div
                        key={p.id}
                        className="w-[215px] sm:w-[235px] shrink-0 border border-neutral-200 rounded-lg p-2.5 bg-white flex flex-col justify-between shadow-2xs hover:border-neutral-300 transition-colors"
                      >
                        <div className="flex gap-2.5 items-start">
                          <div className="w-14 h-14 rounded-xs overflow-hidden bg-neutral-100 shrink-0 border border-neutral-100">
                            <img
                              src={p.primaryImage}
                              alt={p.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <Link
                              href={`/products/${p.id}`}
                              onClick={() => setIsCartOpen(false)}
                              className="block text-[11px] font-bold text-neutral-900 uppercase leading-snug line-clamp-2 hover:text-[#11716c] transition-colors"
                            >
                              {p.name}
                            </Link>

                            <div className="pt-1">
                              {p.originalPrice && p.originalPrice > p.price && (
                                <span className="text-[10px] text-neutral-400 line-through mr-1 font-normal">
                                  {formatPrice(p.originalPrice)}
                                </span>
                              )}
                              <span className="text-xs font-bold text-neutral-900">
                                {formatPrice(p.price)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Row: Black Discount Pill + Add Button */}
                        <div className="flex items-center justify-between gap-2 pt-2 mt-2 border-t border-neutral-100">
                          {discount ? (
                            <span className="bg-black text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider leading-none">
                              {discount}% off
                            </span>
                          ) : (
                            <span className="bg-[#11716c] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider leading-none">
                              NEW
                            </span>
                          )}

                          <button
                            type="button"
                            onClick={() => {
                              if (setQuickAddProduct) {
                                setQuickAddProduct(p);
                              } else {
                                addToCart(p, p.sizes?.[0] || "L", 1);
                              }
                            }}
                            className="border border-neutral-300 hover:border-neutral-900 text-neutral-800 hover:text-black bg-white px-3.5 py-1 rounded-full text-[11px] font-semibold transition-all flex items-center justify-center cursor-pointer active:scale-95"
                          >
                            + Add
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-neutral-100 bg-neutral-50 space-y-3.5">
              
              {/* Discount Code Box */}
              <div>
                {discountCode ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-2 rounded text-xs text-emerald-800">
                    <div className="flex items-center gap-1.5 font-semibold">
                      <Tag className="w-3.5 h-3.5" />
                      <span>{discountCode} Applied (-{discountPercent}%)</span>
                    </div>
                    <button
                      onClick={removeDiscount}
                      className="text-xs text-neutral-500 hover:text-red-600 underline font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Discount code (try VMIND10)"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs border border-neutral-300 rounded focus:outline-hidden focus:border-[#11716c] uppercase tracking-wider"
                    />
                    <button
                      type="submit"
                      disabled={isApplying}
                      className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded uppercase tracking-wider transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {discountError && (
                  <p className="text-[11px] text-red-600 mt-1">{discountError}</p>
                )}
              </div>

              {/* Cost Calculations */}
              <div className="space-y-1.5 text-xs text-neutral-600 pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-neutral-900">{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount ({discountPercent}%)</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping (Prepaid Pan-India)</span>
                  <span className="font-semibold text-emerald-700 uppercase">FREE</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-neutral-900 pt-2 border-t border-neutral-200">
                  <span>Estimated Total</span>
                  <span className="text-[#11716c] text-base">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="firvt-pill-btn w-full bg-[#11716c] hover:bg-[#0c5652] text-white py-3.5 shadow-md flex items-center justify-center space-x-2 text-xs"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>

              {/* Trust Badges */}
              <div className="pt-1 flex items-center justify-center space-x-4 text-[10px] text-neutral-500 font-medium">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Secure Checkout
                </span>
                <span>•</span>
                <span>7 Days Hassle-Free Exchange</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
