"use client";

import React, { useState } from "react";
import { Play, Volume2, VolumeX, Sparkles } from "lucide-react";
import { getVideoUrl } from "@/utils/media";

export default function VideoReelsSection() {
  const reels = [
    {
      id: "reel-1",
      title: "Street Silhouette '26",
      src: "/videos/promo_reel_1.mp4",
      poster: "/products/sku-01/image_1.jpg",
      tag: "OVERSIZED TEES"
    },
    {
      id: "reel-2",
      title: "Waffle Texture Details",
      src: "/videos/campaign_winter_2.mp4",
      poster: "/products/sku-02/image_1.jpg",
      tag: "WAFFLE HENLEYS"
    },
    {
      id: "reel-3",
      title: "Winter Fleece Movement",
      src: "/videos/campaign_winter_3.mp4",
      poster: "/products/sku-03/image_1.jpg",
      tag: "CLASP HOODIES"
    },
    {
      id: "reel-4",
      title: "Tactical Cargo Stack",
      src: "/videos/campaign_winter_4.mp4",
      poster: "/products/sku-05/image_1.jpg",
      tag: "RELAXED CARGOS"
    }
  ];

  const [activeReel, setActiveReel] = useState(reels[0]);

  return (
    <section className="py-16 sm:py-20 bg-white border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center space-y-2 mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 text-[#11716c] text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>LOOKBOOK IN MOTION</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-neutral-900">
            THE ARCHIVE ON THE STREETS
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-lg mx-auto">
            Experience our heavyweight fabric drape, movement, and textured detailing in real-world motion.
          </p>
        </div>

        {/* Video Reels Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {reels.map((reel) => (
            <div
              key={reel.id}
              className="group relative aspect-9/16 rounded-lg overflow-hidden bg-black shadow-md border border-neutral-200"
            >
              <video
                src={getVideoUrl(reel.src)}
                poster={reel.poster}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

              {/* Tag */}
              <div className="absolute top-3 left-3 z-10">
                <span className="bg-[#11716c] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {reel.tag}
                </span>
              </div>

              {/* Title */}
              <div className="absolute bottom-3 left-3 right-3 z-10 text-white">
                <p className="text-xs font-bold uppercase tracking-wide line-clamp-1">
                  {reel.title}
                </p>
                <p className="text-[10px] text-neutral-300">
                  V-MIND FASHION
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
