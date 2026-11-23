"use client";

import React from "react";
import { usePathname } from "next/navigation";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import SearchModal from "@/components/SearchModal";
import QuickAddModal from "@/components/QuickAddModal";

export default function StoreLayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  // For Admin route: hide storefront chrome, render clean admin container
  if (isAdmin) {
    return (
      <div
        className="min-h-screen w-full text-slate-100"
        style={{ backgroundColor: "#0b0f14", color: "#f1f5f9" }}
      >
        {children}
      </div>
    );
  }

  // Storefront route: render full shopping layout
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
      <CartDrawer />
      <SearchModal />
      <QuickAddModal />
    </>
  );
}
