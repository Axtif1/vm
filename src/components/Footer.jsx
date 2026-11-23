"use client";

import React, { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { Mail, Check, MapPin, Phone, Instagram, Facebook, ShieldCheck } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="bg-[#0f1115] text-[#ffffff] border-t border-neutral-800 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-neutral-800">

          {/* Brand Info (Span 2 on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="footer" />
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm pt-2">
              V-MIND FASHION is a contemporary Indian streetwear and apparel brand based in Jaipur, Rajasthan.
              We engineer elevated everyday silhouettes with premium cotton, textured waffle knits, and authentic garment craftsmanship.
            </p>
            <div className="space-y-1.5 text-xs text-neutral-400 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#11716c]" />
                <span>Sirsi Road, Jaipur, Rajasthan 302012, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#11716c]" />
                <a href="mailto:info@vmindfashion.com" className="hover:text-white transition-colors">
                  info@vmindfashion.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#11716c]" />
                <span>+91 86195 91338 (Mon–Sat 11:30 AM – 7:00 PM IST)</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <Link href="/shop?collection=new-arrivals" className="hover:text-white transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/shop?collection=best-sellers" className="hover:text-white transition-colors">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link href="/shop?collection=winter-collection" className="hover:text-white transition-colors">
                  Winter Collection
                </Link>
              </li>
              <li>
                <Link href="/shop?collection=waffle-collection" className="hover:text-white transition-colors">
                  Waffle Collection
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Customer Support
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  4-Day Exchange Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Terms of Service & Privacy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Join the V-MIND Club
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Subscribe to get exclusive early access to seasonal drops and 10% off your first order.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 bg-[#11716c]/20 border border-[#11716c] text-[#11716c] px-3 py-2 rounded text-xs font-semibold">
                <Check className="w-4 h-4" />
                <span>Subscribed! Use code VMIND10</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 text-xs text-white placeholder-neutral-500 rounded focus:outline-hidden focus:border-[#11716c]"
                />
                <button
                  type="submit"
                  className="w-full firvt-pill-btn bg-[#11716c] hover:bg-[#0c5652] text-white py-2.5 text-xs font-semibold"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} V-MIND FASHION. All rights reserved. Made in Jaipur, India.</span>
            <span>&bull;</span>
            <Link href="/admin" className="text-neutral-500 hover:text-neutral-300 transition-colors underline decoration-neutral-800">
              Admin Portal
            </Link>
          </div>

          {/* Payment & Security Badges */}
          <div className="flex items-center space-x-3 text-[11px] text-neutral-400">
            <span className="flex items-center gap-1 font-semibold text-neutral-300">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              100% Encrypted & Safe Payments
            </span>
            <span>•</span>
            <span>UPI / Cards / COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
