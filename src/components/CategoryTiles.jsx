"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DEFAULT_CATEGORY_SECTION } from "@/data/categories";

export default function CategoryTiles() {
  const [config, setConfig] = useState(DEFAULT_CATEGORY_SECTION);

  useEffect(() => {
    const loadConfig = () => {
      try {
        const saved = localStorage.getItem("vmind_category_section");
        if (saved) {
          const parsed = JSON.parse(saved);
          setConfig({ ...DEFAULT_CATEGORY_SECTION, ...parsed });
        }
      } catch (e) {
        console.error("Failed to load category section config", e);
      }
    };

    loadConfig();

    window.addEventListener("storage", loadConfig);
    window.addEventListener("vmind_categories_updated", loadConfig);

    return () => {
      window.removeEventListener("storage", loadConfig);
      window.removeEventListener("vmind_categories_updated", loadConfig);
    };
  }, []);

  if (!config.isVisible) return null;

  return (
    <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="text-center mb-8 sm:mb-10">
        {config.eyebrow && (
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#11716c] mb-1">
            {config.eyebrow}
          </p>
        )}
        <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-widest text-neutral-900">
          {config.title}
        </h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {config.tiles?.map((cat) => (
          <Link
            key={cat.id || cat.title}
            href={cat.href || "/shop"}
            className="group relative aspect-4/5 overflow-hidden bg-neutral-900 block"
          >
            <img
              src={cat.image || "/products/sku-01/image_1.jpg"}
              alt={cat.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              {cat.subtitle && (
                <p className="text-[10px] sm:text-xs text-neutral-300 uppercase tracking-wider mb-1 line-clamp-1">
                  {cat.subtitle}
                </p>
              )}
              <div className="flex items-center justify-between">
                <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider line-clamp-1">
                  {cat.title}
                </h3>
                <ArrowRight className="w-4 h-4 text-white transform group-hover:translate-x-1 transition-transform shrink-0 ml-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
