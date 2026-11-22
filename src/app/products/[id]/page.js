"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import { formatPrice } from "@/utils/currency";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";
import { getVideoUrl } from "@/utils/media";
import {
  Truck,
  RotateCcw,
  ShieldCheck,
  Check,
  Ruler,
  ChevronRight,
  Plus,
  Minus,
  Play,
  X,
  Share2
} from "lucide-react";

export default function ProductDetailPage({ params }) {
  const unwrappedParams = use(params);
  const productId = unwrappedParams.id;
  const product = PRODUCTS.find((p) => p.id === productId || p.slug === productId);

  if (!product) {
    notFound();
  }

  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(product.primaryImage);
  const [isVideoView, setIsVideoView] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "L");
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  // Related products
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.isBestseller)
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="border-b border-neutral-100 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center text-xs text-neutral-500 uppercase tracking-wider space-x-2">
          <Link href="/" className="hover:text-[#11716c] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/shop" className="hover:text-[#11716c] transition-colors">
            Apparel
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-neutral-900 font-bold truncate max-w-xs">
            {product.name}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEFT: Multi-image Gallery (Span 7) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            
            {/* Thumbnails list */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto md:max-h-[640px] shrink-0 pb-2 md:pb-0 scrollbar-thin">
              {product.gallery.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedImage(imgUrl);
                    setIsVideoView(false);
                  }}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xs overflow-hidden border-2 transition-all shrink-0 bg-neutral-100 ${
                    selectedImage === imgUrl && !isVideoView
                      ? "border-[#11716c] shadow-xs"
                      : "border-transparent hover:border-neutral-300 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}

              {/* Video button if available */}
              {product.video && (
                <button
                  onClick={() => setIsVideoView(true)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xs overflow-hidden border-2 transition-all shrink-0 bg-neutral-900 text-white flex flex-col items-center justify-center p-1 text-[10px] font-bold uppercase tracking-wider ${
                    isVideoView ? "border-[#11716c]" : "border-transparent opacity-80 hover:opacity-100"
                  }`}
                >
                  <Play className="w-5 h-5 mb-0.5 text-[#11716c]" />
                  <span>Video</span>
                </button>
              )}
            </div>

            {/* Main Stage Image / Video */}
            <div className="flex-1 relative aspect-square bg-[#f5f5f5] rounded-xs overflow-hidden border border-neutral-200">
              {isVideoView && product.video ? (
                <video
                  src={getVideoUrl(product.video)}
                  poster={product.primaryImage}
                  autoPlay
                  controls
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-cover select-none"
                />
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
                {product.tag && (
                  <span className="bg-[#11716c] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {product.tag}
                  </span>
                )}
                {discountPercent && (
                  <span className="bg-[#d63f45] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    SAVE {discountPercent}%
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: Product Details & Controls (Span 5) */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            
            {/* Header info */}
            <div className="space-y-2 border-b border-neutral-100 pb-5">
              <span className="text-xs font-bold uppercase tracking-widest text-[#11716c]">
                V-MIND FASHION
              </span>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold uppercase tracking-tight text-neutral-900 leading-tight">
                {product.name}
              </h1>
              <p className="text-xs sm:text-sm text-neutral-500">
                {product.subtitle}
              </p>

              {/* Pricing */}
              <div className="flex items-center gap-3 pt-3">
                <span className="text-2xl sm:text-3xl font-bold text-neutral-900">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-neutral-400 line-through font-normal">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {discountPercent && (
                  <span className="bg-[#d63f45]/10 text-[#d63f45] text-xs font-bold px-2.5 py-1 rounded-full">
                    {discountPercent}% OFF
                  </span>
                )}
              </div>
              <p className="text-[11px] text-neutral-500 font-medium">
                Inclusive of all taxes. Free express shipping pan-India on prepaid orders.
              </p>
            </div>

            {/* Size Selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                  Select Size: <span className="text-[#11716c]">{selectedSize}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowSizeModal(true)}
                  className="inline-flex items-center gap-1 text-xs text-[#11716c] hover:underline font-bold uppercase tracking-wide"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size Guide</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-12 h-11 px-3 rounded-md text-xs font-bold uppercase tracking-wider transition-all border ${
                      selectedSize === size
                        ? "border-[#11716c] bg-[#11716c] text-white shadow-xs"
                        : "border-neutral-300 bg-white hover:border-neutral-900 text-neutral-800"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & CTA Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                  Quantity:
                </span>
                <div className="inline-flex items-center border border-neutral-300 rounded-md">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-neutral-600 hover:bg-neutral-100 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-xs font-bold text-neutral-900">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-neutral-600 hover:bg-neutral-100 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="firvt-pill-btn w-full bg-[#11716c] hover:bg-[#0c5652] text-white py-4 text-xs font-bold tracking-widest shadow-md transition-all active:scale-98"
                >
                  {isAdded ? (
                    <span className="inline-flex items-center gap-2">
                      <Check className="w-4 h-4" /> Added to Cart!
                    </span>
                  ) : (
                    <span>Add to Cart</span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    handleAddToCart();
                  }}
                  className="firvt-pill-btn w-full bg-[#0f1d3c] hover:bg-black text-white py-4 text-xs font-bold tracking-widest transition-all"
                >
                  Buy It Now
                </button>
              </div>
            </div>

            {/* Value Proposition Icons */}
            <div className="grid grid-cols-3 gap-2 py-4 border-y border-neutral-200 text-center text-[10px] uppercase font-bold text-neutral-700">
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-[#11716c]" />
                <span>Pan-India Free Express</span>
              </div>
              <div className="flex flex-col items-center gap-1 border-x border-neutral-200">
                <RotateCcw className="w-4 h-4 text-[#11716c]" />
                <span>7-Day Easy Exchange</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#11716c]" />
                <span>100% Genuine Cotton</span>
              </div>
            </div>

            {/* Product Accordion / Tabs */}
            <div className="space-y-3 pt-2">
              <div className="flex border-b border-neutral-200 text-xs font-bold uppercase tracking-wider">
                <button
                  onClick={() => setActiveTab("description")}
                  className={`pb-2.5 px-3 border-b-2 transition-all ${
                    activeTab === "description"
                      ? "border-[#11716c] text-[#11716c]"
                      : "border-transparent text-neutral-500 hover:text-neutral-900"
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab("fabric")}
                  className={`pb-2.5 px-3 border-b-2 transition-all ${
                    activeTab === "fabric"
                      ? "border-[#11716c] text-[#11716c]"
                      : "border-transparent text-neutral-500 hover:text-neutral-900"
                  }`}
                >
                  Fabric &amp; Care
                </button>
                <button
                  onClick={() => setActiveTab("shipping")}
                  className={`pb-2.5 px-3 border-b-2 transition-all ${
                    activeTab === "shipping"
                      ? "border-[#11716c] text-[#11716c]"
                      : "border-transparent text-neutral-500 hover:text-neutral-900"
                  }`}
                >
                  Shipping &amp; Policy
                </button>
              </div>

              <div className="text-xs text-neutral-600 leading-relaxed pt-2">
                {activeTab === "description" && (
                  <div className="space-y-3">
                    <p>{product.description}</p>
                    <p><strong className="text-neutral-900 uppercase">Fit Profile:</strong> {product.fit}</p>
                  </div>
                )}
                {activeTab === "fabric" && (
                  <div className="space-y-2">
                    <p><strong className="text-neutral-900 uppercase">Material:</strong> {product.fabric}</p>
                    <p><strong className="text-neutral-900 uppercase">Care Instructions:</strong> {product.care}</p>
                  </div>
                )}
                {activeTab === "shipping" && (
                  <div className="space-y-2">
                    <p>&bull; <strong>Domestic Delivery:</strong> Dispatched within 24-48 hours from Jaipur. Standard pan-India delivery takes 2–5 business days.</p>
                    <p>&bull; <strong>Exchanges:</strong> We offer a 7-day hassle-free size replacement policy for unworn items with tags attached.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        <section className="mt-20 pt-12 border-t border-neutral-200">
          <div className="text-center space-y-1 mb-8">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#11716c]">
              COMPLETE THE FIT
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-neutral-900">
              YOU MAY ALSO LIKE
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      </div>

      {/* SIZE GUIDE POPUP MODAL */}
      {showSizeModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setShowSizeModal(false)} />
          <div className="relative bg-white max-w-lg w-full rounded-lg shadow-2xl p-6 z-50 space-y-5">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <div className="flex items-center gap-2">
                <Ruler className="w-5 h-5 text-[#11716c]" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                  Size Guide &bull; In Inches
                </h3>
              </div>
              <button
                onClick={() => setShowSizeModal(false)}
                className="p-1 rounded-full text-neutral-400 hover:text-neutral-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-neutral-100 text-neutral-800 font-bold uppercase">
                  <tr>
                    <th className="p-2.5">Size</th>
                    <th className="p-2.5">Chest (Inches)</th>
                    <th className="p-2.5">Length (Inches)</th>
                    <th className="p-2.5">Shoulder (Inches)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 text-neutral-600 font-medium">
                  <tr><td className="p-2.5 font-bold text-neutral-900">S</td><td className="p-2.5">42</td><td className="p-2.5">28</td><td className="p-2.5">20.5</td></tr>
                  <tr><td className="p-2.5 font-bold text-neutral-900">M</td><td className="p-2.5">44</td><td className="p-2.5">29</td><td className="p-2.5">21.5</td></tr>
                  <tr><td className="p-2.5 font-bold text-neutral-900">L</td><td className="p-2.5">46</td><td className="p-2.5">30</td><td className="p-2.5">22.5</td></tr>
                  <tr><td className="p-2.5 font-bold text-neutral-900">XL</td><td className="p-2.5">48</td><td className="p-2.5">31</td><td className="p-2.5">23.5</td></tr>
                  <tr><td className="p-2.5 font-bold text-neutral-900">XXL</td><td className="p-2.5">50</td><td className="p-2.5">32</td><td className="p-2.5">24.5</td></tr>
                </tbody>
              </table>
            </div>

            <p className="text-[11px] text-neutral-500 italic">
              * Note: Our garments are engineered with relaxed, drop-shoulder proportions. If you prefer a tighter or standard silhouette, size down one size.
            </p>

            <button
              onClick={() => setShowSizeModal(false)}
              className="firvt-pill-btn w-full bg-[#11716c] text-white py-2.5 text-xs font-bold"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
