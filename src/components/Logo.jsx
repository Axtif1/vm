"use client";

import React from "react";
import Link from "next/link";

export default function Logo({ variant = "header", className = "" }) {
  if (variant === "footer") {
    return (
      <Link href="/" className={`inline-flex items-center group ${className}`}>
        <img
          src="/brand/vmind_navbar_logo_transparent.png"
          alt="V-MIND FASHION"
          style={{ maxHeight: "56px", width: "auto" }}
          className="h-12 sm:h-14 w-auto object-contain transition-transform duration-200 group-hover:scale-103 drop-shadow-sm"
        />
      </Link>
    );
  }

  if (variant === "square" || variant === "master") {
    return (
      <Link href="/" className={`inline-flex items-center group ${className}`}>
        <img
          src="/brand/1000315360_extracted.jpeg"
          alt="V-MIND FASHION"
          style={{ height: "44px", width: "44px" }}
          className="h-11 w-11 object-contain rounded transition-opacity group-hover:opacity-90"
        />
      </Link>
    );
  }

  // Default header logo - transparent, larger, and crisp
  return (
    <Link href="/" className={`inline-flex items-center group ${className}`}>
      <img
        src="/brand/vmind_navbar_logo_transparent.png"
        alt="V-MIND FASHION"
        style={{ maxHeight: "56px", width: "auto" }}
        className="h-12 sm:h-14 lg:h-14 w-auto object-contain transition-transform duration-200 group-hover:scale-103 drop-shadow-sm"
      />
    </Link>
  );
}
