"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/utils/currency";
import Logo from "@/components/Logo";
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  ArrowLeft,
  Lock,
  Tag,
  AlertCircle
} from "lucide-react";

export default function CheckoutPage() {
  const {
    cart,
    subtotal,
    discountCode,
    discountPercent,
    discountAmount,
    total,
    clearCart
  } = useCart();

  const [step, setStep] = useState("form"); // 'form' | 'confirmed'
  const [orderId, setOrderId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "Jaipur",
    state: "Rajasthan",
    pincode: "302012",
    phone: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOrderId = "VM-" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(newOrderId);
    clearCart();
    setStep("confirmed");
  };

  if (step === "confirmed") {
    return (
      <div className="min-h-screen bg-[#fafafa] py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-lg w-full bg-white rounded-lg shadow-md p-8 border border-neutral-200 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-bold tracking-widest text-[#11716c] uppercase">
              ORDER PLACED (DEMO)
            </span>
            <h1 className="text-2xl font-extrabold uppercase text-neutral-900">
              Thank You For Your Order!
            </h1>
            <p className="text-xs text-neutral-600">
              Order reference: <strong className="text-neutral-900 font-mono">{orderId}</strong>
            </p>
          </div>

          <div className="p-4 bg-neutral-50 rounded-md border border-neutral-200 text-xs text-neutral-600 text-left space-y-2">
            <p><strong>Shipping to:</strong> {form.firstName} {form.lastName}</p>
            <p>{form.address}, {form.city}, {form.state} - {form.pincode}</p>
            <p><strong>Payment Mode:</strong> {paymentMethod === "cod" ? "Cash on Delivery" : "Prepaid Online (Demo)"}</p>
            <p className="text-[11px] text-neutral-400 italic pt-1">
              * Notice: This is a frontend demo checkout. No actual order is fulfilled or money charged.
            </p>
          </div>

          <Link
            href="/"
            className="firvt-pill-btn bg-[#11716c] hover:bg-[#0c5652] text-white px-8 py-3.5 text-xs font-bold tracking-widest inline-block w-full"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white py-20 px-4 text-center space-y-4">
        <h2 className="text-xl font-bold uppercase text-neutral-800">Your Cart is Empty</h2>
        <p className="text-xs text-neutral-500">Add clothing pieces to your cart before proceeding to checkout.</p>
        <Link href="/shop" className="firvt-pill-btn bg-[#11716c] text-white px-6 py-2.5 text-xs font-semibold inline-block">
          Explore Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      
      {/* Demo Notice Banner */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-center text-xs text-amber-800 flex items-center justify-center gap-2 font-medium">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
        <span>Frontend Ecommerce Prototype &bull; Realistic demo checkout (no live financial transactions)</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex items-center justify-between border-b border-neutral-200 pb-4 mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-neutral-600 hover:text-neutral-900 uppercase">
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
          <Logo variant="dark" />
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
            <Lock className="w-3.5 h-3.5" />
            <span>Secure 256-Bit SSL</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT: Checkout Form (Span 7) */}
          <div className="lg:col-span-7 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Contact Information */}
              <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-xs space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                  1. Contact Information
                </h3>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Email Address (for order tracking)
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. yourname@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded focus:border-[#11716c] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-xs space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                  2. Shipping Address
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">First Name</label>
                    <input
                      type="text"
                      required
                      placeholder="First name"
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded focus:border-[#11716c] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Last name"
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded focus:border-[#11716c] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">Address &amp; Street</label>
                  <input
                    type="text"
                    required
                    placeholder="House / Flat No., Street, Landmark"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded focus:border-[#11716c] focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded focus:border-[#11716c] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">State</label>
                    <input
                      type="text"
                      required
                      value={form.state}
                      onChange={(e) => setForm({ ...form, state: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded focus:border-[#11716c] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">PIN Code</label>
                    <input
                      type="text"
                      required
                      value={form.pincode}
                      onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded focus:border-[#11716c] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">Mobile Phone (for delivery SMS)</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded focus:border-[#11716c] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-xs space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                  3. Payment Method
                </h3>
                <div className="space-y-2">
                  <label className={`flex items-center justify-between p-3.5 border rounded-md cursor-pointer transition-colors ${paymentMethod === "cod" ? "border-[#11716c] bg-emerald-50/30" : "border-neutral-200"}`}>
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                        className="text-[#11716c] focus:ring-[#11716c]"
                      />
                      <span className="text-xs font-bold text-neutral-900">Cash on Delivery (COD)</span>
                    </div>
                    <span className="text-[11px] font-semibold text-neutral-500">Pay at doorstep</span>
                  </label>

                  <label className={`flex items-center justify-between p-3.5 border rounded-md cursor-pointer transition-colors ${paymentMethod === "online" ? "border-[#11716c] bg-emerald-50/30" : "border-neutral-200"}`}>
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="payment"
                        value="online"
                        checked={paymentMethod === "online"}
                        onChange={() => setPaymentMethod("online")}
                        className="text-[#11716c] focus:ring-[#11716c]"
                      />
                      <span className="text-xs font-bold text-neutral-900">UPI / QR / Cards / NetBanking</span>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-700">Prepaid Free Delivery</span>
                  </label>
                </div>
              </div>

              {/* Complete Order Button */}
              <button
                type="submit"
                className="firvt-pill-btn w-full bg-[#11716c] hover:bg-[#0c5652] text-white py-4 text-xs font-bold tracking-widest shadow-md"
              >
                Place Demo Order ({formatPrice(total)})
              </button>
            </form>
          </div>

          {/* RIGHT: Order Summary (Span 5) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-xs space-y-4 sticky top-24">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-100 pb-3">
                Order Summary ({cart.length} items)
              </h3>

              {/* Items */}
              <div className="space-y-3 max-h-72 overflow-y-auto divide-y divide-neutral-100">
                {cart.map((item) => (
                  <div key={item.itemKey} className="flex gap-3 pt-3 first:pt-0">
                    <div className="w-14 h-14 bg-neutral-100 rounded overflow-hidden shrink-0 border border-neutral-200">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-neutral-900 uppercase truncate">{item.name}</p>
                      <p className="text-[11px] text-neutral-500">Size: {item.size} &bull; Qty: {item.quantity}</p>
                      <p className="text-xs font-bold text-neutral-800 mt-1">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Applied Discount */}
              {discountCode && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-800 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-semibold">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Coupon: {discountCode} (-{discountPercent}%)</span>
                  </div>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              {/* Totals */}
              <div className="border-t border-neutral-200 pt-3 space-y-1.5 text-xs text-neutral-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-neutral-900">{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Pan-India Shipping</span>
                  <span className="font-semibold text-emerald-700">FREE</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-neutral-900 pt-2 border-t border-neutral-200">
                  <span>Total Due</span>
                  <span className="text-base text-[#11716c]">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
