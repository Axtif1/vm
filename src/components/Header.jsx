"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { useCart } from "@/context/CartContext";
import { NAV_LINKS } from "@/data/products";
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  User
} from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const { totalItems, setIsCartOpen, setIsSearchOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full bg-black text-white transition-all duration-200 border-b border-neutral-900 ${
          isScrolled ? "py-3 shadow-md" : "py-3.5 sm:py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Mobile: Hamburger Button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open mobile menu"
                className="bg-transparent border-0 cursor-pointer p-1 text-white hover:text-[#11716c] transition-colors focus:outline-hidden"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Logo */}
            <div className="flex-1 lg:flex-initial flex items-center justify-center lg:justify-start">
              <Logo variant="header" />
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {NAV_LINKS.map((link) => {
                const hasChildren = Boolean(link.children && link.children.length > 0);
                const isActive = pathname === link.href;

                if (hasChildren) {
                  return (
                    <div
                      key={link.label}
                      className="relative group py-2"
                      onMouseEnter={() => setOpenDropdown(link.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <Link
                        href={link.href}
                        className={`inline-flex items-center text-[12px] xl:text-[13px] font-semibold tracking-wider uppercase transition-colors py-1 ${
                          isActive
                            ? "text-[#11716c]"
                            : "text-white hover:text-[#11716c]"
                        }`}
                      >
                        <span>{link.label}</span>
                        <ChevronDown className="w-3.5 h-3.5 ml-1 transition-transform group-hover:rotate-180 text-neutral-400 group-hover:text-[#11716c]" />
                      </Link>

                      {/* Dropdown Menu */}
                      <div className="absolute left-0 top-full w-60 bg-[#0f0f11] border border-neutral-800 shadow-2xl rounded-none py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 transform translate-y-1 group-hover:translate-y-0 z-50">
                        {link.children.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            className="block px-5 py-2.5 text-xs font-semibold text-neutral-300 hover:text-white hover:bg-neutral-900 transition-colors uppercase tracking-wider"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`text-[12px] xl:text-[13px] font-semibold tracking-wider uppercase transition-colors py-1 ${
                      isActive
                        ? "text-[#11716c] border-b-2 border-[#11716c]"
                        : "text-white hover:text-[#11716c]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Search button */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search products"
                className="bg-transparent border-0 cursor-pointer p-2 text-white hover:text-[#11716c] transition-colors focus:outline-hidden"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* User Account / Profile */}
              <Link
                href="/shop"
                aria-label="Account"
                className="hidden sm:flex p-2 text-white hover:text-[#11716c] transition-colors"
              >
                <User className="w-5 h-5" />
              </Link>

              {/* Shopping Bag Cart Drawer Trigger */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                aria-label={`Shopping Cart with ${totalItems} items`}
                className="bg-transparent border-0 cursor-pointer relative p-2 text-white hover:text-[#11716c] transition-colors focus:outline-hidden"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute top-1 right-0.5 bg-[#11716c] text-white text-[10px] font-bold h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center shadow-xs">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide-over menu panel */}
          <div className="relative w-4/5 max-w-sm bg-[#0a0a0a] text-white h-full shadow-2xl flex flex-col z-10 border-r border-neutral-800">
            {/* Header */}
            <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
              <Logo variant="header" />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-transparent border-0 cursor-pointer p-2 text-neutral-400 hover:text-white"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Links List */}
            <div className="flex-1 overflow-y-auto py-4 px-4 space-y-1">
              {NAV_LINKS.map((link) => {
                const hasChildren = Boolean(link.children && link.children.length > 0);

                if (hasChildren) {
                  return (
                    <div key={link.label} className="border-b border-neutral-900/60 pb-2">
                      <div className="flex items-center justify-between py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-200">
                        <span>{link.label}</span>
                      </div>
                      <div className="pl-3 space-y-2 pt-1 pb-2">
                        {link.children.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block py-1 text-xs text-neutral-400 hover:text-[#11716c] uppercase tracking-wide"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-200 hover:text-[#11716c] border-b border-neutral-900/60"
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-neutral-800 text-[11px] text-neutral-400 space-y-2">
              <p className="font-semibold text-white">V-MIND FASHION</p>
              <p>Jaipur, Rajasthan, India</p>
              <p>Support: +91 86195 91338</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
