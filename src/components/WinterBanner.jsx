"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getVideoUrl } from "@/utils/media";
import { DEFAULT_CAMPAIGN_BANNER } from "@/data/campaign";

export default function WinterBanner() {
  const [banner, setBanner] = useState(DEFAULT_CAMPAIGN_BANNER);

  useEffect(() => {
    const loadBanner = () => {
      try {
        const saved = localStorage.getItem("vmind_campaign_banner");
        if (saved) {
          const parsed = JSON.parse(saved);
          setBanner({ ...DEFAULT_CAMPAIGN_BANNER, ...parsed });
        }
      } catch (e) {
        console.error("Failed to load campaign banner config", e);
      }
    };

    loadBanner();

    // Cross-tab and same-tab real-time sync listeners
    window.addEventListener("storage", loadBanner);
    window.addEventListener("vmind_banner_updated", loadBanner);

    return () => {
      window.removeEventListener("storage", loadBanner);
      window.removeEventListener("vmind_banner_updated", loadBanner);
    };
  }, []);

  if (!banner.isVisible) {
    return null;
  }

  return (
    <section className="relative w-full overflow-hidden bg-black text-white py-14 sm:py-20 border-y border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Content */}
          <div className="space-y-5 order-2 lg:order-1">
            {banner.tagline && (
              <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#11716c]">
                {banner.tagline}
              </p>
            )}

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight leading-tight text-white whitespace-pre-line">
              {banner.title}
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-neutral-300 font-normal leading-relaxed max-w-xl">
              {banner.description}
            </p>

            <div className="flex flex-wrap gap-4 pt-3">
              {banner.primaryBtnText && (
                <Link
                  href={banner.primaryBtnLink || "/shop"}
                  className="bg-[#11716c] hover:bg-[#0c5652] text-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest transition-colors shadow-md inline-flex items-center space-x-2 rounded-full cursor-pointer"
                >
                  <span>{banner.primaryBtnText}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              )}
              {banner.secondaryBtnText && (
                <Link
                  href={banner.secondaryBtnLink || "/shop"}
                  className="border border-neutral-600 hover:border-white text-white px-7 py-3.5 text-xs font-bold uppercase tracking-widest transition-colors rounded-full cursor-pointer"
                >
                  <span>{banner.secondaryBtnText}</span>
                </Link>
              )}
            </div>
          </div>

          {/* Right Campaign Video Showcase */}
          <div className="order-1 lg:order-2 relative aspect-4/3 sm:aspect-16/10 overflow-hidden bg-neutral-950 shadow-2xl border border-neutral-900">
            <video
              key={banner.videoUrl}
              src={getVideoUrl(banner.videoUrl || "/videos/campaign_winter_1.mp4")}
              poster={banner.posterUrl || "/products/sku-03/image_1.jpg"}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            
            {(banner.reelBadge || banner.locationBadge) && (
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/90">
                {banner.reelBadge && (
                  <span className="font-bold tracking-wider uppercase text-[11px] bg-black/80 px-2.5 py-1">
                    {banner.reelBadge}
                  </span>
                )}
                {banner.locationBadge && (
                  <span className="text-[10px] text-neutral-300">
                    {banner.locationBadge}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
