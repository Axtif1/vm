"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Lock,
  Phone,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  Package,
  ShieldCheck,
  LogOut,
  ShoppingBag,
  RotateCcw,
  Truck,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Clock
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState("login"); // 'login' | 'register'
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Register form state
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Check persistent session on load
  useEffect(() => {
    try {
      const saved = localStorage.getItem("vmind_user_session");
      if (saved) {
        setCurrentUser(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleQuickDemo = () => {
    setLoginEmail("arjun.sharma@vmind.in");
    setLoginPassword("VmindLuxury2026!");
    setFeedback({
      type: "info",
      text: "Demo credentials filled in. Click 'Sign In to Account' to proceed."
    });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setFeedback(null);

    if (!loginEmail || !loginPassword) {
      setFeedback({ type: "error", text: "Please enter your email and password." });
      return;
    }
    if (loginPassword.length < 6) {
      setFeedback({ type: "error", text: "Password must be at least 6 characters long." });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const derivedName = loginEmail.includes("@")
        ? loginEmail
            .split("@")[0]
            .replace(/[._]/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase())
        : "V-Mind VIP Member";

      const session = {
        name: derivedName,
        email: loginEmail,
        phone: "+91 86195 91338",
        memberTier: "ARCHIVE VIP",
        joinedDate: "November 2026",
        recentOrders: [
          {
            id: "VM-90412",
            date: "Today, 04:22 PM",
            items: "Frost Clasp Hoodie - Black (Size: L)",
            total: "₹3,999",
            status: "In Transit with BlueDart Express",
            awb: "BLUEDART-8829104"
          }
        ]
      };

      try {
        localStorage.setItem("vmind_user_session", JSON.stringify(session));
      } catch {
        // ignore
      }

      setCurrentUser(session);
      setFeedback({
        type: "success",
        text: `Welcome back, ${session.name}! Session authenticated successfully.`
      });
    }, 450);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setFeedback(null);

    if (!regName.trim()) {
      setFeedback({ type: "error", text: "Please enter your full name." });
      return;
    }
    if (!regEmail.trim() || !regEmail.includes("@")) {
      setFeedback({ type: "error", text: "Please provide a valid email address." });
      return;
    }
    if (!regPhone.trim() || regPhone.replace(/\D/g, "").length < 10) {
      setFeedback({ type: "error", text: "Please enter a valid 10-digit mobile number." });
      return;
    }
    if (regPassword.length < 6) {
      setFeedback({ type: "error", text: "Password must be at least 6 characters long." });
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setFeedback({ type: "error", text: "Passwords do not match." });
      return;
    }
    if (!agreeTerms) {
      setFeedback({ type: "error", text: "Please accept the Terms & 4-Day Exchange policy." });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const session = {
        name: regName.trim(),
        email: regEmail.trim(),
        phone: regPhone.trim().startsWith("+91") ? regPhone.trim() : `+91 ${regPhone.trim()}`,
        memberTier: "ARCHIVE MEMBER",
        joinedDate: "Today",
        recentOrders: []
      };

      try {
        localStorage.setItem("vmind_user_session", JSON.stringify(session));
      } catch {
        // ignore
      }

      setCurrentUser(session);
      setFeedback({
        type: "success",
        text: `Account created! Welcome to V-Mind Fashion, ${session.name}.`
      });
    }, 550);
  };

  const handleSignOut = () => {
    try {
      localStorage.removeItem("vmind_user_session");
    } catch {
      // ignore
    }
    setCurrentUser(null);
    setFeedback({ type: "info", text: "You have signed out of your account." });
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* V-Mind Website Signature Header Banner */}
      <div className="bg-[#111111] text-white py-12 sm:py-16 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
          <p className="text-[11px] font-bold tracking-widest uppercase text-[#11716c]">
            {currentUser ? "MEMBER PORTAL" : "ACCOUNT & AUTHENTICATION"}
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-white">
            {currentUser
              ? "My Account & Orders"
              : mode === "login"
              ? "Customer Sign In"
              : "Create V-Mind Account"}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto">
            {currentUser
              ? "Manage your heavy cotton orders, 4-day doorstep exchange, and VIP archive profile."
              : "Sign in to access order tracking, faster checkout, and exclusive early drop access."}
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Global Feedback Alert */}
        {feedback && (
          <div
            className={`max-w-xl mx-auto mb-6 p-4 rounded-lg text-xs font-semibold flex items-center justify-between border ${
              feedback.type === "success"
                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                : feedback.type === "error"
                ? "bg-rose-50 text-rose-800 border-rose-200"
                : "bg-sky-50 text-sky-800 border-sky-200"
            }`}
          >
            <span>{feedback.text}</span>
            <button
              onClick={() => setFeedback(null)}
              className="text-xs ml-3 font-bold opacity-60 hover:opacity-100"
            >
              ✕
            </button>
          </div>
        )}

        {/* LOGGED IN MEMBER DASHBOARD VIEW */}
        {currentUser ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Profile Overview Card */}
            <div className="bg-white rounded-xl border border-neutral-200 p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#11716c] text-white font-extrabold text-xl flex items-center justify-center shrink-0 shadow-xs">
                    {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : "V"}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-neutral-900 tracking-tight">
                        {currentUser.name}
                      </h2>
                      <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-[#11716c]/10 text-[#11716c] border border-[#11716c]/30">
                        {currentUser.memberTier || "VIP MEMBER"}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 mt-0.5">{currentUser.email}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-neutral-600 hover:text-rose-600 hover:bg-neutral-100 border border-neutral-200 transition-colors self-start sm:self-auto"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>

              {/* Information Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 text-xs">
                <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-200 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                    Registered Mobile
                  </span>
                  <span className="font-semibold text-neutral-900">
                    {currentUser.phone || "+91 86195 91338"}
                  </span>
                </div>

                <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-200 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                    Guarantee &amp; Support
                  </span>
                  <span className="font-semibold text-emerald-700 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#11716c]" />
                    <span>Eligible for 4-Day Doorstep Exchange</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Orders Card */}
            <div className="bg-white rounded-xl border border-neutral-200 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#11716c]" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                    Recent Orders &amp; Fulfillment
                  </h3>
                </div>
                <span className="text-[11px] font-bold text-neutral-400 uppercase">
                  {currentUser.recentOrders?.length || 1} Order recorded
                </span>
              </div>

              <div className="pt-4 space-y-3">
                {currentUser.recentOrders && currentUser.recentOrders.length > 0 ? (
                  currentUser.recentOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-4 rounded-lg border border-neutral-200 bg-neutral-50 hover:bg-neutral-100/60 transition-colors space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono font-bold text-neutral-900">{ord.id}</span>
                        <span className="font-extrabold text-[#11716c]">{ord.total}</span>
                      </div>
                      <p className="text-xs text-neutral-700 font-medium">{ord.items}</p>
                      <div className="flex flex-wrap items-center justify-between pt-2 border-t border-neutral-200 text-[11px] gap-2">
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          <Truck className="w-3.5 h-3.5 text-[#11716c]" /> {ord.status}
                        </span>
                        <span className="text-neutral-500">{ord.date}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center text-xs text-neutral-500">
                    No orders placed yet. Explore our latest heavyweight drop!
                  </div>
                )}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/shop"
                className="firvt-pill-btn bg-[#11716c] hover:bg-[#0c5652] text-white flex-1 py-3.5 text-xs font-bold tracking-widest uppercase text-center rounded-full shadow-xs flex items-center justify-center gap-2 transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Shop New Collection</span>
              </Link>
              <Link
                href="/admin"
                className="px-6 py-3.5 rounded-full bg-white hover:bg-neutral-100 text-neutral-800 text-xs font-bold uppercase tracking-wider text-center border border-neutral-300 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Admin Console</span>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
              </Link>
            </div>
          </div>
        ) : (
          /* AUTHENTICATION VIEW: TWO-COLUMN / CENTERED WEBSITE UI */
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Form Card */}
            <div className="lg:col-span-7 bg-white rounded-xl border border-neutral-200 p-6 sm:p-8 shadow-xs">
              
              {/* Tab Switcher Pills */}
              <div className="bg-neutral-100 p-1 rounded-full flex gap-1 mb-6">
                <button
                  type="button"
                  onClick={() => {
                    setMode("login");
                    setFeedback(null);
                  }}
                  className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all ${
                    mode === "login"
                      ? "bg-[#11716c] text-white shadow-xs"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode("register");
                    setFeedback(null);
                  }}
                  className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all ${
                    mode === "register"
                      ? "bg-[#11716c] text-white shadow-xs"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* TAB 1: SIGN IN */}
              {mode === "login" && (
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-800 mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-4 py-2.5 pl-10 text-xs border border-neutral-300 rounded-md text-neutral-900 bg-white placeholder-neutral-400 focus:outline-hidden focus:border-[#11716c] focus:ring-1 focus:ring-[#11716c]"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-800">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          setFeedback({
                            type: "info",
                            text: "Password reset link sent to your registered email."
                          })
                        }
                        className="text-[11px] text-[#11716c] font-semibold hover:underline"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showLoginPassword ? "text" : "password"}
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 pl-10 pr-10 text-xs border border-neutral-300 rounded-md text-neutral-900 bg-white placeholder-neutral-400 focus:outline-hidden focus:border-[#11716c] focus:ring-1 focus:ring-[#11716c]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                      >
                        {showLoginPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-600 select-none">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="rounded border-neutral-300 text-[#11716c] focus:ring-[#11716c]"
                      />
                      <span>Remember this device</span>
                    </label>

                    <button
                      type="button"
                      onClick={handleQuickDemo}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#11716c] hover:text-[#0c5652] transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>1-Click Demo Fill</span>
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="firvt-pill-btn bg-[#11716c] hover:bg-[#0c5652] text-white w-full py-3.5 text-xs font-bold tracking-widest uppercase rounded-full shadow-xs transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
                  >
                    {isLoading ? (
                      <span>Signing in...</span>
                    ) : (
                      <>
                        <span>Sign In to Account</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* TAB 2: REGISTER */}
              {mode === "register" && (
                <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-800 mb-1.5">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="Arjun Sharma"
                        className="w-full px-4 py-2.5 pl-10 text-xs border border-neutral-300 rounded-md text-neutral-900 bg-white placeholder-neutral-400 focus:outline-hidden focus:border-[#11716c] focus:ring-1 focus:ring-[#11716c]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-800 mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-4 py-2.5 pl-10 text-xs border border-neutral-300 rounded-md text-neutral-900 bg-white placeholder-neutral-400 focus:outline-hidden focus:border-[#11716c] focus:ring-1 focus:ring-[#11716c]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-800 mb-1.5">
                      Mobile Number (For Courier OTP &amp; Updates)
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        placeholder="+91 86195 91338"
                        className="w-full px-4 py-2.5 pl-10 text-xs border border-neutral-300 rounded-md text-neutral-900 bg-white placeholder-neutral-400 focus:outline-hidden focus:border-[#11716c] focus:ring-1 focus:ring-[#11716c]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-800 mb-1.5">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type={showRegPassword ? "text" : "password"}
                          required
                          value={regPassword}
                          onChange={(e) => setRegPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full px-3 py-2.5 pl-9 pr-8 text-xs border border-neutral-300 rounded-md text-neutral-900 bg-white placeholder-neutral-400 focus:outline-hidden focus:border-[#11716c] focus:ring-1 focus:ring-[#11716c]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowRegPassword(!showRegPassword)}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                        >
                          {showRegPassword ? (
                            <EyeOff className="w-3.5 h-3.5" />
                          ) : (
                            <Eye className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-800 mb-1.5">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type={showRegPassword ? "text" : "password"}
                          required
                          value={regConfirmPassword}
                          onChange={(e) => setRegConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full px-3 py-2.5 pl-9 pr-3 text-xs border border-neutral-300 rounded-md text-neutral-900 bg-white placeholder-neutral-400 focus:outline-hidden focus:border-[#11716c] focus:ring-1 focus:ring-[#11716c]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-1">
                    <label className="flex items-start gap-2 cursor-pointer text-xs text-neutral-600 select-none">
                      <input
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="rounded mt-0.5 border-neutral-300 text-[#11716c] focus:ring-[#11716c]"
                      />
                      <span>
                        I agree to V-Mind Fashion Terms of Service and 4-Day Exchange Policy.
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="firvt-pill-btn bg-[#11716c] hover:bg-[#0c5652] text-white w-full py-3.5 text-xs font-bold tracking-widest uppercase rounded-full shadow-xs transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
                  >
                    {isLoading ? (
                      <span>Creating Account...</span>
                    ) : (
                      <>
                        <span>Create V-Mind Account</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Store Staff / Admin Console Link */}
              <div className="mt-8 pt-5 border-t border-neutral-200 text-center">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-neutral-500 hover:text-neutral-900 transition-colors uppercase tracking-wider"
                >
                  <span>Store Management &amp; Admin Panel</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#11716c]" />
                </Link>
              </div>
            </div>

            {/* Right Column: V-Mind VIP Perks & Guarantees (Matching website UI) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Brand Features Card */}
              <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs space-y-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#11716c]" />
                  <span>V-Mind Customer Privileges</span>
                </h3>

                <div className="space-y-4 text-xs">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-neutral-50 border border-neutral-200 rounded-lg text-[#11716c] shrink-0">
                      <RotateCcw className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-neutral-900 uppercase">4-Day Easy Exchange</h4>
                      <p className="text-neutral-500 mt-0.5 leading-relaxed">
                        Hassle-free doorstep exchanges across India if the size or drop doesn't fit.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-neutral-50 border border-neutral-200 rounded-lg text-[#11716c] shrink-0">
                      <Truck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-neutral-900 uppercase">Express Dispatch</h4>
                      <p className="text-neutral-500 mt-0.5 leading-relaxed">
                        Dispatched within 24-48 hours via BlueDart Express from our Jaipur headquarters.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-neutral-50 border border-neutral-200 rounded-lg text-[#11716c] shrink-0">
                      <Package className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-neutral-900 uppercase">240+ GSM Heavyweight Cotton</h4>
                      <p className="text-neutral-500 mt-0.5 leading-relaxed">
                        Bio-washed, pre-shrunk fabrics built for enduring streetwear silhouettes.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-neutral-50 border border-neutral-200 rounded-lg text-[#11716c] shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-neutral-900 uppercase">Prepaid &amp; Cash On Delivery</h4>
                      <p className="text-neutral-500 mt-0.5 leading-relaxed">
                        Seamless payment options via UPI, debit/credit cards, and cash on delivery.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Support Hotline Box */}
              <div className="bg-[#111111] text-white rounded-xl p-6 shadow-xs space-y-2">
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#11716c]">
                  JAIPUR HEADQUARTERS
                </span>
                <h4 className="text-sm font-extrabold uppercase text-white">
                  Need Help With Your Account?
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  WhatsApp Support: +91 86195 91338 • Hours: Mon–Sat 10:00 AM – 7:00 PM IST
                </p>
                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="text-xs font-bold text-[#11716c] hover:text-[#1ad1c7] underline uppercase tracking-wide inline-flex items-center gap-1"
                  >
                    <span>Contact Support Team</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>

            </div>

          </div>
        )}
      </div>
    </div>
  );
}
