"use client";

import React, { useState, useEffect } from "react";
import { PROMOTIONS } from "@/data/products";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function AnnouncementBar() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const items = [
    'USE CODE "VMIND10" FOR 10% OFF ON YOUR FIRST ORDER',
    "FREE SHIPPING PAN INDIA ON PREPAID ORDERS",
    "EASY 7-DAYS HASSLE-FREE EXCHANGE",
    "NEW WINTER COLLECTION '26 LIVE NOW"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % items.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [items.length]);

  const prev = () => setCurrentIdx((currentIdx - 1 + items.length) % items.length);
  const next = () => setCurrentIdx((currentIdx + 1) % items.length);

  return (
    <div className="bg-black text-white border-b border-neutral-900 text-[11px] font-semibold tracking-widest uppercase py-2.5 px-4 select-none relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous announcement"
          className="bg-transparent border-0 text-neutral-400 hover:text-white transition-colors p-1 cursor-pointer flex items-center justify-center focus:outline-hidden"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        <div className="flex-1 text-center truncate px-3 font-semibold tracking-wider text-xs">
          <span className="inline-block transition-opacity duration-300">
            {items[currentIdx]}
          </span>
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Next announcement"
          className="bg-transparent border-0 text-neutral-400 hover:text-white transition-colors p-1 cursor-pointer flex items-center justify-center focus:outline-hidden"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
