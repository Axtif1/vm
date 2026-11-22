"use client";

import React from "react";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import HeroBanner from "@/components/HeroBanner";
import BrandFeatures from "@/components/BrandFeatures";
import WinterBanner from "@/components/WinterBanner";
import VideoReelsSection from "@/components/VideoReelsSection";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  // New Arrivals (first 4 or 8)
  const newArrivals = PRODUCTS.filter(
    (p) => p.collections.includes("new-arrivals") || p.isNew
  ).slice(0, 8);

  // Best Sellers (first 4)
  const bestSellers = PRODUCTS.filter(
    (p) => p.isBestseller || p.collections.includes("best-sellers")
  ).slice(0, 4);

  // Waffle Collection items (first 3 or 4)
  const waffleItems = PRODUCTS.filter(
    (p) => p.isWaffle || p.category === "waffle-collection"
  ).slice(0, 4);

  // Category Tiles matching FIRVT
  const categoryTiles = [
    {
      title: "TOP WEAR",
      subtitle: "Heavyweight Boxy Tees",
      image: "/products/sku-01/image_1.jpg",
      href: "/shop?category=t-shirts"
    },
    {
      title: "WAFFLE KNITS",
      subtitle: "240 GSM Signature Weave",
      image: "/products/sku-02/image_1.jpg",
      href: "/shop?collection=waffle-collection"
    },
    {
      title: "WINTER OUTERWEAR",
      subtitle: "Metal Clasp Hoodies & Fleece",
      image: "/products/sku-03/image_1.jpg",
      href: "/shop?collection=winter-collection"
    },
    {
      title: "BOTTOMS & PANTS",
      subtitle: "Baggy Washed Sweatpants",
      image: "/products/sku-05/image_1.jpg",
      href: "/shop?category=bottoms"
    }
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      {/* 1. HERO CAMPAIGN BANNER */}
      <HeroBanner />

      {/* 2. SHOP BY CATEGORY TILES (FIRVT Style) */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-8 sm:mb-10">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#11716c] mb-1">
            CURATED CATALOG
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-widest text-neutral-900">
            SHOP BY CATEGORY
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categoryTiles.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="group relative aspect-4/5 overflow-hidden bg-neutral-900 block"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-[10px] sm:text-xs text-neutral-300 uppercase tracking-wider mb-1">
                  {cat.subtitle}
                </p>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider">
                    {cat.title}
                  </h3>
                  <ArrowRight className="w-4 h-4 text-white transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. NEW ARRIVAL SECTION */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full border-t border-neutral-100">
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#11716c] mb-1">
            FRESH DROPS
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-widest text-neutral-900">
            NEW ARRIVAL
          </h2>
          <div className="w-12 h-0.5 bg-neutral-900 mx-auto mt-3" />
        </div>

        {/* 4-column Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center pt-10 sm:pt-12">
          <Link
            href="/shop?collection=new-arrivals"
            className="inline-flex items-center space-x-2 bg-neutral-900 hover:bg-[#11716c] text-white px-9 py-3.5 text-xs font-bold uppercase tracking-widest transition-colors shadow-sm"
          >
            <span>VIEW ALL NEW ARRIVALS</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </section>

      {/* 4. WINTER COLLECTION CAMPAIGN BANNER */}
      <WinterBanner />

      {/* 5. BEST SELLER SECTION */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#11716c] mb-1">
            CROWD FAVORITES
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-widest text-neutral-900">
            BEST SELLER
          </h2>
          <div className="w-12 h-0.5 bg-neutral-900 mx-auto mt-3" />
        </div>

        {/* 4-column Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center pt-10 sm:pt-12">
          <Link
            href="/shop?collection=best-sellers"
            className="inline-flex items-center space-x-2 bg-neutral-900 hover:bg-[#11716c] text-white px-9 py-3.5 text-xs font-bold uppercase tracking-widest transition-colors shadow-sm"
          >
            <span>VIEW ALL BEST SELLERS</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </section>

      {/* 6. WAFFLE KNITWEAR SPOTLIGHT */}
      <section className="py-12 sm:py-16 bg-[#f7f7f7] border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#11716c] mb-1">
              SIGNATURE TEXTURE
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-widest text-neutral-900">
              THE WAFFLE COLLECTION
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-lg mx-auto mt-2 font-normal">
              Engineered with 240 GSM breathable combed cotton in relaxed streetwear silhouettes.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {waffleItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center pt-10">
            <Link
              href="/shop?collection=waffle-collection"
              className="inline-flex items-center space-x-2 bg-[#11716c] hover:bg-[#0c5652] text-white px-9 py-3.5 text-xs font-bold uppercase tracking-widest transition-colors shadow-sm"
            >
              <span>EXPLORE ALL WAFFLE WEAVES</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. STREETWEAR IN MOTION (Video Reels) */}
      <VideoReelsSection />

      {/* 8. BRAND VALUE PROPOSITIONS */}
      <BrandFeatures />
    </div>
  );
}
