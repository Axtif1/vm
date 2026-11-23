"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Volume2, VolumeX } from "lucide-react";
import { getVideoUrl } from "@/utils/media";
import { DEFAULT_HERO_BANNER } from "@/data/heroBanner";

export default function HeroBanner() {
  const [hero, setHero] = useState(DEFAULT_HERO_BANNER);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const loadHero = () => {
      try {
        const saved = localStorage.getItem("vmind_hero_banner");
        if (saved) {
          setHero({ ...DEFAULT_HERO_BANNER, ...JSON.parse(saved) });
        }
      } catch (e) {
        console.error("Failed to load hero banner config", e);
      }
    };

    loadHero();

    window.addEventListener("storage", loadHero);
    window.addEventListener("vmind_hero_updated", loadHero);

    return () => {
      window.removeEventListener("storage", loadHero);
      window.removeEventListener("vmind_hero_updated", loadHero);
    };
  }, []);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  if (!hero.isVisible) {
    return null;
  }

  return (
    <section className="relative w-full h-[70vh] sm:h-[80vh] lg:h-[85vh] flex items-center justify-center bg-black overflow-hidden text-white">
      {/* Background Campaign Video */}
      <div className="absolute inset-0 z-0">
        <video
          key={hero.videoUrl}
          ref={videoRef}
          src={getVideoUrl(hero.videoUrl || "/videos/hero_reel.mp4")}
          poster={hero.posterUrl || "/products/sku-09/image_1.jpg"}
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
        {hero.subtitle && (
          <p className="text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-[#11716c] mb-3">
            {hero.subtitle}
          </p>
        )}

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase leading-tight max-w-3xl whitespace-pre-line">
          {hero.headline}
        </h1>

        {/* Tagline */}
        {hero.tagline && (
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-neutral-300 max-w-xl font-medium tracking-wide leading-relaxed">
            {hero.tagline}
          </p>
        )}

        {/* CTAs matching FIRVT style */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          {hero.primaryBtnText && (
            <Link
              href={hero.primaryBtnLink || "/shop"}
              className="bg-[#11716c] hover:bg-[#0c5652] text-white px-9 py-4 text-xs font-bold tracking-widest uppercase transition-all shadow-md w-full sm:w-auto flex items-center justify-center space-x-2 rounded-full cursor-pointer"
            >
              <span>{hero.primaryBtnText}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          )}

          {hero.secondaryBtnText && (
            <Link
              href={hero.secondaryBtnLink || "/shop"}
              className="bg-transparent hover:bg-white text-white hover:text-black border border-white px-9 py-4 text-xs font-bold tracking-widest uppercase transition-all w-full sm:w-auto text-center rounded-full cursor-pointer"
            >
              <span>{hero.secondaryBtnText}</span>
            </Link>
          )}
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
