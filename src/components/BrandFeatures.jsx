"use client";

import React from "react";
import { Truck, RotateCcw, ShieldCheck, Sparkles } from "lucide-react";

export default function BrandFeatures() {
  const features = [
    {
      icon: Truck,
      title: "FREE PAN-INDIA SHIPPING",
      description: "Complimentary express delivery on all prepaid orders."
    },
    {
      icon: Sparkles,
      title: "PREMIUM 240+ GSM FABRICS",
      description: "Heavyweight combed cotton & signature waffle knits."
    },
    {
      icon: RotateCcw,
      title: "7-DAY EASY EXCHANGE",
      description: "Hassle-free size replacement and customer support."
    },
    {
      icon: ShieldCheck,
      title: "CRAFTED IN JAIPUR",
      description: "Rooted in authentic Indian streetwear craftsmanship."
    }
  ];

  return (
    <section className="border-t border-neutral-200 bg-[#fafafa] py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div key={feat.title} className="flex flex-col items-center text-center space-y-2 p-2">
                <div className="w-10 h-10 flex items-center justify-center text-neutral-800 mb-1">
                  <Icon className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                  {feat.title}
                </h4>
                <p className="text-[11px] text-neutral-500 leading-relaxed max-w-xs">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
