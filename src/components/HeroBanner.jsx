"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Volume2, VolumeX } from "lucide-react";
import { getVideoUrl } from "@/utils/media";

export default function HeroBanner() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section className="relative w-full h-[70vh] sm:h-[80vh] lg:h-[85vh] flex items-center justify-center bg-black overflow-hidden text-white">
      {/* Background Campaign Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src={getVideoUrl("/videos/hero_reel.mp4")}
          poster="/products/sku-09/image_1.jpg"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-80"
        />
        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        
        {/* Collection Subtitle */}
        <p className="text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-[#11716c] mb-3">
          SEASONAL DROP &bull; WINTER ARCHIVE &apos;26
        </p>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase leading-tight max-w-3xl">
          NOW LIVE: NEW ARRIVALS
        </h1>

        {/* Tagline */}
        <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-neutral-300 max-w-xl font-medium tracking-wide leading-relaxed">
          Heavyweight 240+ GSM cotton, textured waffle knits, and architectural outerwear crafted in Jaipur.
        </p>

        {/* CTAs matching FIRVT style */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="/shop?collection=new-arrivals"
            className="bg-[#11716c] hover:bg-[#0c5652] text-white px-9 py-4 text-xs font-bold tracking-widest uppercase transition-all shadow-md w-full sm:w-auto flex items-center justify-center space-x-2"
          >
            <span>SHOP NEW ARRIVALS</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>

          <Link
            href="/shop?collection=waffle-collection"
            className="bg-transparent hover:bg-white text-white hover:text-black border border-white px-9 py-4 text-xs font-bold tracking-widest uppercase transition-all w-full sm:w-auto text-center"
          >
            <span>WAFFLE COLLECTION</span>
          </Link>
        </div>
      </div>

      {/* Sound Mute Toggle */}
      <button
        onClick={toggleSound}
        className="absolute bottom-5 right-5 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 backdrop-blur-xs transition-colors cursor-pointer"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>
    </section>
  );
}
