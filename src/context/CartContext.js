"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { PROMOTIONS } from "@/data/products";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickAddProduct, setQuickAddProduct] = useState(null);
  const [discountCode, setDiscountCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountError, setDiscountError] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("vmind_cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      const savedCode = localStorage.getItem("vmind_discount_code");
      const savedPercent = localStorage.getItem("vmind_discount_percent");
      if (savedCode && savedPercent) {
        setDiscountCode(savedCode);
        setDiscountPercent(parseFloat(savedPercent) || 0);
      }
    } catch (e) {
      console.error("Failed to load cart from storage", e);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("vmind_cart", JSON.stringify(cart));
      localStorage.setItem("vmind_discount_code", discountCode);
      localStorage.setItem("vmind_discount_percent", discountPercent.toString());
    } catch (e) {
      console.error("Failed to save cart to storage", e);
    }
  }, [cart, discountCode, discountPercent, isLoaded]);

  const addToCart = (product, size = "L", quantity = 1) => {
    const itemKey = `${product.id}-${size}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.itemKey === itemKey);
      if (existing) {
        return prev.map((item) =>
          item.itemKey === itemKey
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          itemKey,
          productId: product.id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.primaryImage,
          size,
          quantity
        }
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (itemKey) => {
    setCart((prev) => prev.filter((item) => item.itemKey !== itemKey));
  };

  const updateQuantity = (itemKey, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemKey);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.itemKey === itemKey ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyDiscount = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === PROMOTIONS.defaultDiscountCode || cleanCode === "VMIND10" || cleanCode === "FIRVT10") {
      setDiscountCode("VMIND10");
      setDiscountPercent(10);
      setDiscountError("");
      return true;
    } else if (cleanCode === "WELCOME20") {
      setDiscountCode("WELCOME20");
      setDiscountPercent(20);
      setDiscountError("");
      return true;
    } else {
      setDiscountError("Invalid coupon code. Try 'VMIND10'");
      return false;
    }
  };

  const removeDiscount = () => {
    setDiscountCode("");
    setDiscountPercent(0);
    setDiscountError("");
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const shipping = 0; // Free pan-India prepaid shipping
  const total = Math.max(0, subtotal - discountAmount + shipping);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        discountCode,
        discountPercent,
        discountAmount,
        discountError,
        applyDiscount,
        removeDiscount,
        shipping,
        total,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        quickAddProduct,
        setQuickAddProduct
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
