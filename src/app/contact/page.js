"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Clock, ShieldCheck, Truck, RotateCcw, Check } from "lucide-react";

export default function ContactPage() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingStatus, setTrackingStatus] = useState(null);

  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleTrack = (e) => {
    e.preventDefault();
    if (!trackingNumber) return;
    setTrackingStatus({
      id: trackingNumber.toUpperCase(),
      status: "In Transit with BlueDart Express",
      estimatedDelivery: "2-3 business days",
      origin: "V-MIND Warehouse, Jaipur, Rajasthan"
    });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", phone: "", message: "" });
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#111111] text-white py-12 sm:py-16 text-center space-y-2 border-b border-neutral-800">
        <p className="text-[11px] font-bold tracking-widest uppercase text-[#11716c]">
          HELP &amp; CUSTOMER CARE
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">
          Contact &bull; Track Your Order
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto">
          Need size advice, order tracking, or exchange assistance? Our support team is here to assist.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Order Tracking & Policies */}
          <div className="space-y-8">
            {/* Order Tracker Box */}
            <div className="p-6 bg-neutral-50 rounded-lg border border-neutral-200 space-y-4 shadow-xs">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#11716c]" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                  Track Your Shipment
                </h2>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Enter your order number or AWB tracking ID received via SMS or email.
              </p>
              <form onSubmit={handleTrack} className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="e.g. VM-84920 or AWB"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs border border-neutral-300 rounded focus:outline-hidden focus:border-[#11716c] uppercase"
                />
                <button
                  type="submit"
                  className="firvt-pill-btn bg-[#11716c] hover:bg-[#0c5652] text-white px-5 py-2 text-xs font-bold"
                >
                  Track
                </button>
              </form>

              {trackingStatus && (
                <div className="p-4 bg-white border border-[#11716c]/30 rounded-md space-y-1 text-xs">
                  <p className="font-bold text-[#11716c]">Order #{trackingStatus.id}</p>
                  <p className="text-neutral-800">Status: <span className="font-semibold">{trackingStatus.status}</span></p>
                  <p className="text-neutral-500">Origin: {trackingStatus.origin}</p>
                  <p className="text-neutral-500">Estimated Delivery: {trackingStatus.estimatedDelivery}</p>
                </div>
              )}
            </div>

            {/* Core Policies */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                Customer Policies
              </h3>
              
              <div className="p-4 border border-neutral-200 rounded-lg space-y-2 text-xs text-neutral-600">
                <div className="flex items-center gap-2 font-bold text-neutral-900 uppercase">
                  <RotateCcw className="w-4 h-4 text-[#11716c]" />
                  <span>7-Day Hassle-Free Exchange</span>
                </div>
                <p>
                  If you need a different size or fit, we happily exchange any unworn, unwashed item with tags attached within 7 days of delivery.
                </p>
              </div>

              <div className="p-4 border border-neutral-200 rounded-lg space-y-2 text-xs text-neutral-600">
                <div className="flex items-center gap-2 font-bold text-neutral-900 uppercase">
                  <Truck className="w-4 h-4 text-[#11716c]" />
                  <span>Free Pan-India Delivery</span>
                </div>
                <p>
                  Prepaid orders enjoy free express shipping across all pin codes in India. Dispatches within 24-48 business hours from our Jaipur studio.
                </p>
              </div>
            </div>

            {/* Direct Info */}
            <div className="p-4 bg-neutral-900 text-white rounded-lg space-y-3 text-xs">
              <h4 className="font-bold uppercase tracking-widest text-[#11716c]">
                Operational Headquarters
              </h4>
              <p className="flex items-center gap-2 text-neutral-300">
                <MapPin className="w-4 h-4 text-[#11716c]" />
                <span>Sirsi Road, Jaipur, Rajasthan 302012, India</span>
              </p>
              <p className="flex items-center gap-2 text-neutral-300">
                <Phone className="w-4 h-4 text-[#11716c]" />
                <span>+91 86195 91338 (Mon–Sat 11:30 AM – 7:00 PM IST)</span>
              </p>
              <p className="flex items-center gap-2 text-neutral-300">
                <Mail className="w-4 h-4 text-[#11716c]" />
                <span>info@vmindfashion.com</span>
              </p>
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="p-6 sm:p-8 bg-white border border-neutral-200 rounded-lg shadow-sm space-y-6">
            <div>
              <h2 className="text-xl font-bold uppercase tracking-tight text-neutral-900">
                Send Us A Message
              </h2>
              <p className="text-xs text-neutral-500 mt-1">
                Fill in the form below and we will get back to you within 24 hours.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded text-center space-y-2">
                <Check className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="text-sm font-bold uppercase text-emerald-900">
                  Message Sent Successfully!
                </h4>
                <p className="text-xs text-emerald-700">
                  Thank you for reaching out. Our support representative will respond via email shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold uppercase text-neutral-700 mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aryan Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2.5 border border-neutral-300 rounded focus:outline-hidden focus:border-[#11716c]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold uppercase text-neutral-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. aryan@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2.5 border border-neutral-300 rounded focus:outline-hidden focus:border-[#11716c]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold uppercase text-neutral-700 mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2.5 border border-neutral-300 rounded focus:outline-hidden focus:border-[#11716c]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold uppercase text-neutral-700 mb-1">
                    Message / Inquiry
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How can we assist you with your order, sizing, or styling?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2.5 border border-neutral-300 rounded focus:outline-hidden focus:border-[#11716c]"
                  />
                </div>

                <button
                  type="submit"
                  className="firvt-pill-btn w-full bg-[#11716c] hover:bg-[#0c5652] text-white py-3.5 text-xs font-bold tracking-widest shadow-md transition-all"
                >
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
