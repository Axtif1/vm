"use client";

import React from "react";
import Link from "next/link";

export default function Logo({ variant = "header", className = "" }) {
  if (variant === "footer") {
    return (
      <Link href="/" className={`inline-flex items-center group ${className}`}>
        <img
          src="/brand/vmind_logo_horizontal_white.png"
          alt="V-MIND FASHION"
          style={{ height: "38px", maxWidth: "180px", width: "auto" }}
          className="h-9 sm:h-10 w-auto object-contain transition-opacity group-hover:opacity-90"
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

  // Default header logo - clean and seamless
  return (
    <Link href="/" className={`inline-flex items-center group ${className}`}>
      <img
        src="/brand/vmind_logo_horizontal_white.png"
        alt="V-MIND FASHION"
        style={{ height: "34px", maxWidth: "160px", width: "auto" }}
        className="h-8 sm:h-9 w-auto object-contain transition-opacity group-hover:opacity-90"
      />
    </Link>
  );
}
