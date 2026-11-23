"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { PRODUCTS, NAV_LINKS } from "@/data/products";
import { DEFAULT_CAMPAIGN_BANNER } from "@/data/campaign";
import { DEFAULT_CATEGORY_SECTION } from "@/data/categories";
import { DEFAULT_SIZE_GUIDE } from "@/data/sizeGuide";
import { DEFAULT_HERO_BANNER } from "@/data/heroBanner";
import { formatPrice } from "@/utils/currency";
import { getVideoUrl } from "@/utils/media";
import Logo from "@/components/Logo";
import "./admin.css";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Tag,
  Film,
  Settings,
  Search,
  Plus,
  Trash2,
  Edit,
  Eye,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Truck,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  X,
  Menu,
  ExternalLink,
  ChevronDown,
  Sparkles,
  Save,
  RotateCcw,
  Check,
  Video,
  LayoutGrid,
  Ruler,
  Clapperboard,
  Compass,
  Sun,
  Moon
} from "lucide-react";

// Initial mock orders dataset tailored for V-MIND FASHION
const INITIAL_ORDERS = [
  {
    id: "VM-90412",
    customer: "Aarav Sharma",
    email: "aarav.sharma@gmail.com",
    city: "Jaipur, RJ",
    address: "B-42, Vaishali Nagar, Jaipur - 302021",
    date: "Today, 04:22 PM",
    items: [
      { name: "Frost Clasp Hoodie - Black", size: "L", qty: 1, price: 3999 }
    ],
    total: 3999,
    payment: "Prepaid UPI",
    status: "Processing"
  },
  {
    id: "VM-90411",
    customer: "Rohan Varma",
    email: "rohan.v@outlook.com",
    city: "Mumbai, MH",
    address: "Flat 402, Sea Green Apts, Bandra West, Mumbai - 400050",
    date: "Today, 02:15 PM",
    items: [
      { name: "Raglan Waffle Navy T-Shirt", size: "M", qty: 1, price: 1999 },
      { name: "Baggy Washed Sweatpants", size: "M", qty: 1, price: 2499 }
    ],
    total: 4498,
    payment: "Prepaid UPI",
    status: "Shipped"
  },
  {
    id: "VM-90410",
    customer: "Kabir Mehta",
    email: "kabir.mehta@yahoo.com",
    city: "New Delhi, DL",
    address: "H-19, Hauz Khas Enclave, New Delhi - 110016",
    date: "Yesterday",
    items: [
      { name: "Double-Canvassed Utility Jacket", size: "XL", qty: 1, price: 4299 }
    ],
    total: 4299,
    payment: "Cash on Delivery",
    status: "Delivered"
  },
  {
    id: "VM-90409",
    customer: "Ishaan Singhania",
    email: "ishaan.s@gmail.com",
    city: "Bengaluru, KA",
    address: "32, 12th Main, Indiranagar, Bengaluru - 560038",
    date: "21 Nov 2026",
    items: [
      { name: "Heavyweight Boxy Tee - Vintage Black", size: "L", qty: 2, price: 1499 }
    ],
    total: 2998,
    payment: "Prepaid UPI",
    status: "Delivered"
  },
  {
    id: "VM-90408",
    customer: "Aditya Jain",
    email: "aditya.jain@gmail.com",
    city: "Pune, MH",
    address: "B-2, Koregaon Park, Pune - 411001",
    date: "20 Nov 2026",
    items: [
      { name: "Signature Waffle Henley - Olive", size: "S", qty: 1, price: 1799 }
    ],
    total: 1799,
    payment: "Prepaid UPI",
    status: "Delivered"
  }
];

const INITIAL_COUPONS = [
  { code: "VMIND10", discount: 10, type: "percentage", uses: 48, status: "Active" },
  { code: "WINTER20", discount: 20, type: "percentage", uses: 29, status: "Active" },
  { code: "FIRSTORDER", discount: 15, type: "percentage", uses: 112, status: "Active" },
  { code: "FREESHIP", discount: 0, type: "shipping", uses: 87, status: "Active" }
];

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [adminTheme, setAdminTheme] = useState("dark");
  const [themeToast, setThemeToast] = useState(null);

  // Persistent State
  const [products, setProducts] = useState(PRODUCTS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [coupons, setCoupons] = useState(INITIAL_COUPONS);
  const [campaignBanner, setCampaignBanner] = useState(DEFAULT_CAMPAIGN_BANNER);
  const [categorySection, setCategorySection] = useState(DEFAULT_CATEGORY_SECTION);
  const [sizeGuide, setSizeGuide] = useState(DEFAULT_SIZE_GUIDE);
  const [heroBanner, setHeroBanner] = useState(DEFAULT_HERO_BANNER);
  const [headerNavLinks, setHeaderNavLinks] = useState(NAV_LINKS);
  const [bannerSavedToast, setBannerSavedToast] = useState(false);
  const [categorySavedToast, setCategorySavedToast] = useState(false);
  const [sizeGuideSavedToast, setSizeGuideSavedToast] = useState(false);
  const [heroSavedToast, setHeroSavedToast] = useState(false);
  const [navSavedToast, setNavSavedToast] = useState(false);
  const [orderFilter, setOrderFilter] = useState("all");

  // Modals state
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const [isAddCouponOpen, setIsAddCouponOpen] = useState(false);

  // New Product Form State
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "t-shirts",
    price: 1499,
    originalPrice: 1999,
    fabric: "240 GSM 100% Combed Cotton",
    primaryImage: "/products/sku-01/image_1.jpg",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    isNew: true,
    isBestseller: false
  });

  // New Coupon Form State
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discount: 10,
    type: "percentage"
  });

  // Hydrate from localStorage if exists
  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem("vmind_admin_products");
      if (savedProducts) setProducts(JSON.parse(savedProducts));
      const savedOrders = localStorage.getItem("vmind_admin_orders");
      if (savedOrders) setOrders(JSON.parse(savedOrders));
      const savedCoupons = localStorage.getItem("vmind_admin_coupons");
      if (savedCoupons) setCoupons(JSON.parse(savedCoupons));
      const savedBanner = localStorage.getItem("vmind_campaign_banner");
      if (savedBanner) {
        setCampaignBanner({ ...DEFAULT_CAMPAIGN_BANNER, ...JSON.parse(savedBanner) });
      }
      const savedCategories = localStorage.getItem("vmind_category_section");
      if (savedCategories) {
        setCategorySection({ ...DEFAULT_CATEGORY_SECTION, ...JSON.parse(savedCategories) });
      }
      const savedSizeGuide = localStorage.getItem("vmind_size_guide");
      if (savedSizeGuide) {
        setSizeGuide({ ...DEFAULT_SIZE_GUIDE, ...JSON.parse(savedSizeGuide) });
      }
      const savedHero = localStorage.getItem("vmind_hero_banner");
      if (savedHero) {
        setHeroBanner({ ...DEFAULT_HERO_BANNER, ...JSON.parse(savedHero) });
      }
      const savedNav = localStorage.getItem("vmind_nav_links");
      if (savedNav) {
        setHeaderNavLinks(JSON.parse(savedNav));
      }
      const savedTheme = localStorage.getItem("vmind_admin_theme");
      if (savedTheme === "light" || savedTheme === "dark") {
        setAdminTheme(savedTheme);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSetTheme = (themeName) => {
    if (adminTheme === themeName) return;
    setAdminTheme(themeName);
    try {
      localStorage.setItem("vmind_admin_theme", themeName);
    } catch (err) {}
    setThemeToast(themeName === "dark" ? "Switched to Dark Mode" : "Switched to Light Mode");
    setTimeout(() => setThemeToast(null), 2200);
  };

  const toggleTheme = () => {
    const nextTheme = adminTheme === "dark" ? "light" : "dark";
    handleSetTheme(nextTheme);
  };

  const handleSaveCategories = (e) => {
    if (e) e.preventDefault();
    try {
      localStorage.setItem("vmind_category_section", JSON.stringify(categorySection));
      window.dispatchEvent(new Event("vmind_categories_updated"));
      setCategorySavedToast(true);
      setTimeout(() => setCategorySavedToast(false), 3500);
    } catch (err) {
      console.error("Failed to save category section", err);
    }
  };

  const handleResetCategories = () => {
    if (confirm("Reset the category showcase tiles to the original 4 defaults?")) {
      setCategorySection(DEFAULT_CATEGORY_SECTION);
      try {
        localStorage.setItem("vmind_category_section", JSON.stringify(DEFAULT_CATEGORY_SECTION));
        window.dispatchEvent(new Event("vmind_categories_updated"));
        setCategorySavedToast(true);
        setTimeout(() => setCategorySavedToast(false), 3500);
      } catch (err) {}
    }
  };

  const handleUpdateTile = (index, field, value) => {
    const updatedTiles = [...categorySection.tiles];
    updatedTiles[index] = { ...updatedTiles[index], [field]: value };
    setCategorySection({ ...categorySection, tiles: updatedTiles });
  };

  const handleAddTile = () => {
    const newTile = {
      id: `cat-${Date.now()}`,
      title: "NEW ARRIVALS",
      subtitle: "Drop '26 Collection",
      image: "/products/sku-01/image_1.jpg",
      href: "/shop?collection=new-arrivals"
    };
    setCategorySection({
      ...categorySection,
      tiles: [...categorySection.tiles, newTile]
    });
  };

  const handleDeleteTile = (index) => {
    if (categorySection.tiles.length <= 1) {
      alert("At least one category tile is required.");
      return;
    }
    const updatedTiles = categorySection.tiles.filter((_, i) => i !== index);
    setCategorySection({ ...categorySection, tiles: updatedTiles });
  };

  const handleSaveSizeGuide = (e) => {
    if (e) e.preventDefault();
    try {
      localStorage.setItem("vmind_size_guide", JSON.stringify(sizeGuide));
      window.dispatchEvent(new Event("vmind_sizeguide_updated"));
      setSizeGuideSavedToast(true);
      setTimeout(() => setSizeGuideSavedToast(false), 3500);
    } catch (err) {
      console.error("Failed to save size guide", err);
    }
  };

  const handleResetSizeGuide = () => {
    if (confirm("Reset the garment size chart to the original streetwear defaults?")) {
      setSizeGuide(DEFAULT_SIZE_GUIDE);
      try {
        localStorage.setItem("vmind_size_guide", JSON.stringify(DEFAULT_SIZE_GUIDE));
        window.dispatchEvent(new Event("vmind_sizeguide_updated"));
        setSizeGuideSavedToast(true);
        setTimeout(() => setSizeGuideSavedToast(false), 3500);
      } catch (err) {}
    }
  };

  const handleUpdateSizeRow = (index, field, value) => {
    const updatedRows = [...sizeGuide.rows];
    updatedRows[index] = { ...updatedRows[index], [field]: value };
    setSizeGuide({ ...sizeGuide, rows: updatedRows });
  };

  const handleAddSizeRow = () => {
    const newRow = { size: "NEW", chest: "45", length: "29", shoulder: "22" };
    setSizeGuide({ ...sizeGuide, rows: [...sizeGuide.rows, newRow] });
  };

  const handleDeleteSizeRow = (index) => {
    if (sizeGuide.rows.length <= 1) {
      alert("At least one size measurement row is required.");
      return;
    }
    const updatedRows = sizeGuide.rows.filter((_, i) => i !== index);
    setSizeGuide({ ...sizeGuide, rows: updatedRows });
  };

  const handleSaveNav = (e) => {
    if (e) e.preventDefault();
    try {
      localStorage.setItem("vmind_nav_links", JSON.stringify(headerNavLinks));
      window.dispatchEvent(new Event("vmind_nav_updated"));
      setNavSavedToast(true);
      setTimeout(() => setNavSavedToast(false), 3500);
    } catch (err) {
      console.error("Failed to save navigation links", err);
    }
  };

  const handleResetNav = () => {
    if (confirm("Reset the navigation bar menu links to the default catalog links?")) {
      setHeaderNavLinks(NAV_LINKS);
      try {
        localStorage.setItem("vmind_nav_links", JSON.stringify(NAV_LINKS));
        window.dispatchEvent(new Event("vmind_nav_updated"));
        setNavSavedToast(true);
        setTimeout(() => setNavSavedToast(false), 3500);
      } catch (err) {}
    }
  };

  const handleUpdateNavLink = (index, field, value) => {
    const updated = [...headerNavLinks];
    updated[index] = { ...updated[index], [field]: value };
    setHeaderNavLinks(updated);
  };

  const handleAddNavLink = () => {
    const newLink = {
      label: "NEW COLLECTION",
      href: "/shop?collection=new-arrivals"
    };
    setHeaderNavLinks([...headerNavLinks, newLink]);
  };

  const handleDeleteNavLink = (index) => {
    if (headerNavLinks.length <= 1) {
      alert("At least one navigation link is required.");
      return;
    }
    const updated = headerNavLinks.filter((_, i) => i !== index);
    setHeaderNavLinks(updated);
  };

  const handleSaveHero = (e) => {
    if (e) e.preventDefault();
    try {
      localStorage.setItem("vmind_hero_banner", JSON.stringify(heroBanner));
      window.dispatchEvent(new Event("vmind_hero_updated"));
      setHeroSavedToast(true);
      setTimeout(() => setHeroSavedToast(false), 3500);
    } catch (err) {
      console.error("Failed to save hero banner", err);
    }
  };

  const handleResetHero = () => {
    if (confirm("Reset the hero video banner to the default 'NOW LIVE: NEW ARRIVALS' content?")) {
      setHeroBanner(DEFAULT_HERO_BANNER);
      try {
        localStorage.setItem("vmind_hero_banner", JSON.stringify(DEFAULT_HERO_BANNER));
        window.dispatchEvent(new Event("vmind_hero_updated"));
        setHeroSavedToast(true);
        setTimeout(() => setHeroSavedToast(false), 3500);
      } catch (err) {}
    }
  };

  const handleSaveBanner = (e) => {
    if (e) e.preventDefault();
    try {
      localStorage.setItem("vmind_campaign_banner", JSON.stringify(campaignBanner));
      window.dispatchEvent(new Event("vmind_banner_updated"));
      setBannerSavedToast(true);
      setTimeout(() => setBannerSavedToast(false), 3500);
    } catch (err) {
      console.error("Failed to save campaign banner", err);
    }
  };

  const handleResetBanner = () => {
    if (confirm("Reset the seasonal banner to the original Winter Collection '26 defaults?")) {
      setCampaignBanner(DEFAULT_CAMPAIGN_BANNER);
      try {
        localStorage.setItem("vmind_campaign_banner", JSON.stringify(DEFAULT_CAMPAIGN_BANNER));
        window.dispatchEvent(new Event("vmind_banner_updated"));
        setBannerSavedToast(true);
        setTimeout(() => setBannerSavedToast(false), 3500);
      } catch (err) {}
    }
  };

  const saveProducts = (updated) => {
    setProducts(updated);
    try {
      localStorage.setItem("vmind_admin_products", JSON.stringify(updated));
    } catch (e) {}
  };

  const saveOrders = (updated) => {
    setOrders(updated);
    try {
      localStorage.setItem("vmind_admin_orders", JSON.stringify(updated));
    } catch (e) {}
  };

  const saveCoupons = (updated) => {
    setCoupons(updated);
    try {
      localStorage.setItem("vmind_admin_coupons", JSON.stringify(updated));
    } catch (e) {}
  };

  // KPIs
  const totalRevenue = useMemo(() => {
    return orders.reduce((sum, o) => sum + (o.status !== "Cancelled" ? o.total : 0), 0) + 128450;
  }, [orders]);

  const totalOrdersCount = orders.length + 84;
  const averageOrderValue = Math.round(totalRevenue / totalOrdersCount);

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      if (orderFilter !== "all" && o.status.toLowerCase() !== orderFilter.toLowerCase()) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          o.id.toLowerCase().includes(q) ||
          o.customer.toLowerCase().includes(q) ||
          o.city.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [orders, orderFilter, searchQuery]);

  // Filtered products
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    const q = searchQuery.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.id && p.id.toLowerCase().includes(q))
    );
  }, [products, searchQuery]);

  const handleCreateProduct = (e) => {
    e.preventDefault();
    const id = `sku-${String(products.length + 1).padStart(2, "0")}`;
    const productToAdd = {
      ...newProduct,
      id,
      slug: newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      rating: 4.9,
      reviewsCount: 1,
      gallery: [newProduct.primaryImage]
    };
    const updated = [productToAdd, ...products];
    saveProducts(updated);
    setIsAddProductOpen(false);
  };

  const handleDeleteProduct = (id) => {
    if (confirm("Are you sure you want to remove this product from the catalog?")) {
      const updated = products.filter((p) => p.id !== id);
      saveProducts(updated);
    }
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    const updated = orders.map((o) =>
      o.id === orderId ? { ...o, status: newStatus } : o
    );
    saveOrders(updated);
    if (selectedOrderDetails?.id === orderId) {
      setSelectedOrderDetails({ ...selectedOrderDetails, status: newStatus });
    }
  };

  const handleCreateCoupon = (e) => {
    e.preventDefault();
    if (!newCoupon.code.trim()) return;
    const couponToAdd = {
      code: newCoupon.code.trim().toUpperCase(),
      discount: parseInt(newCoupon.discount, 10),
      type: newCoupon.type,
      uses: 0,
      status: "Active"
    };
    const updated = [couponToAdd, ...coupons];
    saveCoupons(updated);
    setNewCoupon({ code: "", discount: 10, type: "percentage" });
    setIsAddCouponOpen(false);
  };

  const handleDeleteCoupon = (code) => {
    const updated = coupons.filter((c) => c.code !== code);
    saveCoupons(updated);
  };

  return (
    <div className="admin-shell" data-theme={adminTheme}>
      {/* Smooth Theme Preference Micro-Toast */}
      {themeToast && (
        <div className="admin-theme-toast">
          {themeToast.includes("Dark") ? (
            <Moon style={{ width: "13px", height: "13px", color: "#11716c" }} />
          ) : (
            <Sun style={{ width: "13px", height: "13px", color: "#f59e0b" }} />
          )}
          <span>{themeToast}</span>
        </div>
      )}

      {/* Mobile Drawer Backdrop */}
      {isSidebarOpen && (
        <div
          style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.85)", zIndex: 35 }}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR NAVIGATION */}
      <aside className={`admin-sidebar ${isSidebarOpen ? "open" : ""}`}>
        {/* Brand & Console Title (Fixed Top) */}
        <div className="admin-sidebar-header">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Logo variant="header" style={{ height: "36px", width: "auto" }} />
            <div>
              <div style={{ fontSize: "9px", fontWeight: "800", letterSpacing: "0.15em", color: "#11716c", textTransform: "uppercase" }}>
                CONSOLE
              </div>
              <div style={{ fontSize: "12px", fontWeight: "800", letterSpacing: "0.05em", color: "#ffffff" }}>
                V-MIND ADMIN
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", display: "flex" }}
            className="lg:hidden"
          >
            <X style={{ width: "20px", height: "20px" }} />
          </button>
        </div>

        {/* Scrollable Navigation Links Area */}
        <div className="admin-sidebar-scrollable">
          <nav className="admin-sidebar-nav">
            {[
              { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
              { id: "herobanner", label: "Hero Video Banner", icon: Clapperboard },
              { id: "navigation", label: "Navbar Menu", icon: Compass, badge: headerNavLinks.length },
              { id: "products", label: "Products", icon: Package, badge: products.length },
              { id: "orders", label: "Orders", icon: ShoppingBag, badge: orders.filter(o => o.status === "Processing").length },
              { id: "campaign", label: "Campaign Banner", icon: Sparkles },
              { id: "categories", label: "Category Tiles", icon: LayoutGrid, badge: categorySection.tiles.length },
              { id: "sizeguide", label: "Size Guide", icon: Ruler, badge: sizeGuide.rows.length },
              { id: "discounts", label: "Discounts & Promo", icon: Tag, badge: coupons.length },
              { id: "media", label: "Media & Cloudinary", icon: Film },
              { id: "settings", label: "Store Settings", icon: Settings }
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsSidebarOpen(false);
                  }}
                  className={`admin-sidebar-nav-item ${isActive ? "active" : ""}`}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <Icon style={{ width: "16px", height: "16px" }} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      style={{
                        fontSize: "10px",
                        padding: "2px 7px",
                        borderRadius: "9999px",
                        fontWeight: "700",
                        backgroundColor: isActive ? "rgba(0,0,0,0.4)" : "#1e2633",
                        color: "#ffffff"
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer (Fixed Bottom) */}
        <div className="admin-sidebar-footer">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "11px", color: "#64748b" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "9999px", backgroundColor: "#10b981", display: "inline-block" }} />
              Live Store
            </span>
            <span style={{ fontSize: "10px", fontWeight: "700", textTransform: "uppercase" }}>Jaipur, IN</span>
          </div>

          {/* Smooth Theme Preference Switcher (Sidebar) */}
          <div className="admin-sidebar-theme-container">
            <div className="admin-sidebar-theme-header">
              <span>Theme Preference</span>
              <span className="admin-sidebar-theme-badge">{adminTheme}</span>
            </div>
            <div className="admin-sidebar-theme-pills">
              <button
                type="button"
                onClick={() => handleSetTheme("dark")}
                className={`admin-sidebar-pill ${adminTheme === "dark" ? "active" : ""}`}
              >
                <Moon style={{ width: "12px", height: "12px" }} />
                <span>Dark</span>
              </button>
              <button
                type="button"
                onClick={() => handleSetTheme("light")}
                className={`admin-sidebar-pill ${adminTheme === "light" ? "active" : ""}`}
              >
                <Sun style={{ width: "12px", height: "12px" }} />
                <span>Light</span>
              </button>
            </div>
          </div>

          <Link
            href="/"
            target="_blank"
            className="admin-outline-btn"
            style={{ width: "100%", justifyContent: "center", textDecoration: "none" }}
          >
            <span>View Storefront</span>
            <ExternalLink style={{ width: "13px", height: "13px" }} />
          </Link>
        </div>
      </aside>

      {/* MAIN ADMIN WORKSPACE */}
      <main className="admin-main">
        {/* Top Header Bar */}
        <header className="admin-header">
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              onClick={() => setIsSidebarOpen(true)}
              style={{ background: "none", border: "none", color: "#cbd5e1", cursor: "pointer", display: "flex" }}
              className="lg:hidden"
              aria-label="Open sidebar"
            >
              <Menu style={{ width: "20px", height: "20px" }} />
            </button>

            <h1 style={{ fontSize: "13px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.08em", color: "#ffffff", margin: 0 }}>
              {activeTab === "dashboard" && "Store Overview & Performance"}
              {activeTab === "herobanner" && "Hero Video Banner & Cinematic Reel"}
              {activeTab === "navigation" && "Navigation Bar Menu & Collections"}
              {activeTab === "products" && "Product Catalog & Inventory"}
              {activeTab === "orders" && "Order Fulfillment & Shipments"}
              {activeTab === "campaign" && "Seasonal Campaign Banner Editor"}
              {activeTab === "categories" && "Shop By Category Tiles Editor"}
              {activeTab === "sizeguide" && "Garment Sizing Guide & Measurements"}
              {activeTab === "discounts" && "Promo Coupons & Campaigns"}
              {activeTab === "media" && "Cloudinary CDN & Media Assets"}
              {activeTab === "settings" && "Jaipur Headquarters Settings"}
            </h1>
          </div>

          {/* Quick Search & Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <Search style={{ width: "14px", height: "14px", color: "#64748b", position: "absolute", left: "12px" }} />
              <input
                type="text"
                placeholder="Search catalog, order #..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="admin-search-input"
              />
            </div>

            {/* Smooth Theme Preference Switcher (Header Segmented) */}
            <div className="admin-theme-segmented" role="radiogroup" aria-label="Theme preference">
              <button
                type="button"
                onClick={() => handleSetTheme("dark")}
                className={`admin-theme-seg-btn ${adminTheme === "dark" ? "active" : ""}`}
                title="Activate Dark Mode"
                aria-checked={adminTheme === "dark"}
                role="radio"
              >
                <Moon style={{ width: "13px", height: "13px" }} className="theme-icon" />
                <span className="hidden sm:inline">Dark</span>
              </button>
              <button
                type="button"
                onClick={() => handleSetTheme("light")}
                className={`admin-theme-seg-btn ${adminTheme === "light" ? "active" : ""}`}
                title="Activate Light Mode"
                aria-checked={adminTheme === "light"}
                role="radio"
              >
                <Sun style={{ width: "13px", height: "13px" }} className="theme-icon" />
                <span className="hidden sm:inline">Light</span>
              </button>
            </div>

            {activeTab === "herobanner" && (
              <button
                onClick={handleSaveHero}
                className="admin-pill-btn"
              >
                <Save style={{ width: "14px", height: "14px" }} />
                <span>Publish Hero Banner</span>
              </button>
            )}

            {activeTab === "navigation" && (
              <button
                onClick={handleSaveNav}
                className="admin-pill-btn"
              >
                <Save style={{ width: "14px", height: "14px" }} />
                <span>Publish Navigation</span>
              </button>
            )}

            {activeTab === "campaign" && (
              <button
                onClick={handleSaveBanner}
                className="admin-pill-btn"
              >
                <Save style={{ width: "14px", height: "14px" }} />
                <span>Publish to Store</span>
              </button>
            )}

            {activeTab === "categories" && (
              <button
                onClick={handleSaveCategories}
                className="admin-pill-btn"
              >
                <Save style={{ width: "14px", height: "14px" }} />
                <span>Publish Categories</span>
              </button>
            )}

            {activeTab === "sizeguide" && (
              <button
                onClick={handleSaveSizeGuide}
                className="admin-pill-btn"
              >
                <Save style={{ width: "14px", height: "14px" }} />
                <span>Publish Size Guide</span>
              </button>
            )}

            {activeTab === "products" && (
              <button
                onClick={() => setIsAddProductOpen(true)}
                className="admin-pill-btn"
              >
                <Plus style={{ width: "14px", height: "14px" }} />
                <span>Add Product</span>
              </button>
            )}

            {activeTab === "discounts" && (
              <button
                onClick={() => setIsAddCouponOpen(true)}
                className="admin-pill-btn"
              >
                <Plus style={{ width: "14px", height: "14px" }} />
                <span>New Coupon</span>
              </button>
            )}
          </div>
        </header>

        {/* CONTENT AREA */}
        <div className="admin-content">
          
          {/* ==================== TAB 1: DASHBOARD ==================== */}
          {activeTab === "dashboard" && (
            <>
              {/* Executive KPI Cards */}
              <div className="admin-kpi-grid">
                {[
                  {
                    title: "TOTAL REVENUE",
                    value: formatPrice(totalRevenue),
                    change: "+24.8% vs last week",
                    icon: DollarSign,
                    color: "#10b981"
                  },
                  {
                    title: "ORDERS COMPLETED",
                    value: totalOrdersCount,
                    change: "98.2% fulfillment rate",
                    icon: ShoppingBag,
                    color: "#11716c"
                  },
                  {
                    title: "ACTIVE PRODUCTS",
                    value: products.length,
                    change: "Heavyweight 240+ GSM line",
                    icon: Package,
                    color: "#f59e0b"
                  },
                  {
                    title: "AVG ORDER VALUE",
                    value: formatPrice(averageOrderValue),
                    change: "High-ticket drop-shoulder",
                    icon: TrendingUp,
                    color: "#06b6d4"
                  }
                ].map((kpi) => {
                  const Icon = kpi.icon;
                  return (
                    <div key={kpi.title} className="admin-kpi-card">
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span className="admin-kpi-title">{kpi.title}</span>
                        <div style={{ padding: "8px", backgroundColor: "#0e131a", borderRadius: "8px", color: kpi.color, display: "flex" }}>
                          <Icon style={{ width: "16px", height: "16px" }} />
                        </div>
                      </div>
                      <div>
                        <div className="admin-kpi-val">{kpi.value}</div>
                        <div className="admin-kpi-meta" style={{ color: kpi.color, marginTop: "4px" }}>
                          <span>&bull;</span>
                          <span>{kpi.change}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Weekly Sales Velocity Chart */}
              <div className="admin-card" style={{ padding: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #1e2633", paddingBottom: "16px", marginBottom: "16px" }}>
                  <div>
                    <h3 className="admin-card-title">Weekly Sales Velocity</h3>
                    <p className="admin-card-subtitle">Live store turnover across prepaid UPI and Cash on Delivery</p>
                  </div>
                  <span style={{ fontSize: "11px", fontWeight: "700", padding: "4px 10px", borderRadius: "9999px", backgroundColor: "rgba(17,113,108,0.2)", color: "#11716c", border: "1px solid rgba(17,113,108,0.4)" }}>
                    +18.4% WoW
                  </span>
                </div>

                {/* Visual Bar Graph */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "12px", alignItems: "flex-end", height: "170px", paddingBottom: "10px" }}>
                  {[
                    { day: "MON", amount: "₹32.5K", pct: "45%" },
                    { day: "TUE", amount: "₹41.2K", pct: "58%" },
                    { day: "WED", amount: "₹38.9K", pct: "52%" },
                    { day: "THU", amount: "₹45.6K", pct: "68%" },
                    { day: "FRI", amount: "₹52.4K", pct: "78%" },
                    { day: "SAT", amount: "₹64.8K", pct: "95%" },
                    { day: "SUN", amount: "₹58.1K", pct: "85%" }
                  ].map((b) => (
                    <div key={b.day} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", height: "100%", justifyContent: "flex-end" }}>
                      <span style={{ fontSize: "10px", fontWeight: "700", color: "#64748b" }}>{b.amount}</span>
                      <div
                        style={{
                          height: b.pct,
                          width: "100%",
                          backgroundColor: "#11716c",
                          borderRadius: "6px 6px 0 0",
                          boxShadow: "0 4px 10px rgba(17,113,108,0.3)"
                        }}
                      />
                      <span style={{ fontSize: "11px", fontWeight: "700", color: "#94a3b8" }}>{b.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Two Column Grid: Recent Orders & Top Selling SKUs */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
                
                {/* Recent Orders */}
                <div className="admin-card">
                  <div className="admin-card-header">
                    <div>
                      <h3 className="admin-card-title">Recent Store Orders</h3>
                      <p className="admin-card-subtitle">Processed through storefront checkout</p>
                    </div>
                    <button
                      onClick={() => setActiveTab("orders")}
                      style={{ fontSize: "11px", fontWeight: "700", color: "#11716c", background: "none", border: "none", cursor: "pointer", textTransform: "uppercase" }}
                    >
                      View All
                    </button>
                  </div>

                  <div className="admin-table-container">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th className="admin-th">Order ID</th>
                          <th className="admin-th">Customer</th>
                          <th className="admin-th">Amount</th>
                          <th className="admin-th">Status</th>
                          <th className="admin-th" style={{ textAlign: "right" }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.slice(0, 5).map((ord) => (
                          <tr key={ord.id} className="admin-tr">
                            <td className="admin-td" style={{ fontFamily: "monospace", fontWeight: "700", color: "#ffffff" }}>
                              {ord.id}
                            </td>
                            <td className="admin-td">
                              <div style={{ fontWeight: "700", color: "#ffffff" }}>{ord.customer}</div>
                              <div style={{ fontSize: "10px", color: "#64748b" }}>{ord.city}</div>
                            </td>
                            <td className="admin-td" style={{ fontWeight: "800", color: "#ffffff" }}>
                              {formatPrice(ord.total)}
                            </td>
                            <td className="admin-td">
                              <span className={`status-badge status-${ord.status.toLowerCase()}`}>
                                {ord.status}
                              </span>
                            </td>
                            <td className="admin-td" style={{ textAlign: "right" }}>
                              <button
                                onClick={() => setSelectedOrderDetails(ord)}
                                style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", padding: "4px" }}
                                title="View Order"
                              >
                                <Eye style={{ width: "16px", height: "16px" }} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Top Performing Streetwear SKUs */}
                <div className="admin-card" style={{ padding: "20px" }}>
                  <div style={{ borderBottom: "1px solid #1e2633", paddingBottom: "12px", marginBottom: "16px" }}>
                    <h3 className="admin-card-title">Top Performing SKUs</h3>
                    <p className="admin-card-subtitle">By units sold & revenue</p>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    {products.slice(0, 4).map((item, idx) => (
                      <div key={item.id} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <span style={{ fontSize: "12px", fontWeight: "800", color: "#64748b", width: "16px" }}>
                          #{idx + 1}
                        </span>
                        <div style={{ width: "44px", height: "44px", borderRadius: "6px", overflow: "hidden", backgroundColor: "#000", flexShrink: 0, border: "1px solid #1e2633" }}>
                          <img src={item.primaryImage} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: "11px", fontWeight: "700", color: "#ffffff", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {item.name}
                          </div>
                          <div style={{ fontSize: "10px", color: "#64748b" }}>
                            {formatPrice(item.price)} &bull; 240+ GSM
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </>
          )}

          {/* ==================== TAB 2: HERO VIDEO BANNER ==================== */}
          {activeTab === "herobanner" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* Top Status Bar */}
              <div className="admin-card" style={{ padding: "18px 24px" }}>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <h2 className="admin-card-title" style={{ fontSize: "14px" }}>Main Hero Video Banner</h2>
                      <span className={`status-badge ${heroBanner.isVisible ? "status-delivered" : "status-cancelled"}`}>
                        {heroBanner.isVisible ? "Storefront Active" : "Banner Hidden"}
                      </span>
                    </div>
                    <p className="admin-card-subtitle">
                      The top cinematic full-screen video header on your homepage. Plays looping video with dark streetwear grading and call-to-actions.
                    </p>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <button
                      type="button"
                      onClick={handleResetHero}
                      className="admin-outline-btn"
                    >
                      <RotateCcw style={{ width: "13px", height: "13px" }} />
                      <span>Reset Defaults</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveHero}
                      className="admin-pill-btn"
                    >
                      <Save style={{ width: "14px", height: "14px" }} />
                      <span>Publish Changes</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Two-Column Editor & Live WYSIWYG Preview */}
              <div className="campaign-editor-layout">
                {/* LEFT: Complete Settings Form */}
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  
                  {/* Card 1: Copy & Visibility */}
                  <div className="admin-card" style={{ padding: "20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", borderBottom: "1px solid #1e2633", paddingBottom: "12px" }}>
                      <h3 className="admin-card-title">Headlines &amp; Copy</h3>
                      <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "12px", color: "#f1f5f9" }}>
                        <input
                          type="checkbox"
                          checked={heroBanner.isVisible}
                          onChange={(e) => setHeroBanner({ ...heroBanner, isVisible: e.target.checked })}
                          style={{ accentColor: "#11716c", width: "16px", height: "16px", cursor: "pointer" }}
                        />
                        <span style={{ fontWeight: "700" }}>Enable on Homepage</span>
                      </label>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                      <div className="admin-form-group">
                        <label className="admin-form-label">Collection Subtitle / Eyebrow</label>
                        <input
                          type="text"
                          value={heroBanner.subtitle}
                          onChange={(e) => setHeroBanner({ ...heroBanner, subtitle: e.target.value })}
                          placeholder="e.g. SEASONAL DROP • WINTER ARCHIVE '26"
                          className="admin-form-input"
                        />
                      </div>

                      <div className="admin-form-group">
                        <label className="admin-form-label">Main Hero Headline</label>
                        <input
                          type="text"
                          value={heroBanner.headline}
                          onChange={(e) => setHeroBanner({ ...heroBanner, headline: e.target.value })}
                          placeholder="e.g. NOW LIVE: NEW ARRIVALS"
                          className="admin-form-input"
                        />
                      </div>

                      <div className="admin-form-group">
                        <label className="admin-form-label">Tagline Description</label>
                        <textarea
                          rows={2}
                          value={heroBanner.tagline}
                          onChange={(e) => setHeroBanner({ ...heroBanner, tagline: e.target.value })}
                          placeholder="e.g. Heavyweight cotton, textured waffle knits, and architectural outerwear crafted in Jaipur."
                          className="admin-form-input"
                          style={{ resize: "vertical", fontFamily: "inherit" }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Call-to-Action Buttons */}
                  <div className="admin-card" style={{ padding: "20px" }}>
                    <h3 className="admin-card-title" style={{ marginBottom: "16px", borderBottom: "1px solid #1e2633", paddingBottom: "12px" }}>
                      Call-to-Action Buttons
                    </h3>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      <div className="admin-form-group">
                        <label className="admin-form-label">Primary Button Text</label>
                        <input
                          type="text"
                          value={heroBanner.primaryBtnText}
                          onChange={(e) => setHeroBanner({ ...heroBanner, primaryBtnText: e.target.value })}
                          placeholder="e.g. SHOP NEW ARRIVALS"
                          className="admin-form-input"
                        />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-form-label">Primary Button Link</label>
                        <input
                          type="text"
                          value={heroBanner.primaryBtnLink}
                          onChange={(e) => setHeroBanner({ ...heroBanner, primaryBtnLink: e.target.value })}
                          placeholder="e.g. /shop?collection=new-arrivals"
                          className="admin-form-input"
                        />
                      </div>

                      <div className="admin-form-group">
                        <label className="admin-form-label">Secondary Button Text</label>
                        <input
                          type="text"
                          value={heroBanner.secondaryBtnText}
                          onChange={(e) => setHeroBanner({ ...heroBanner, secondaryBtnText: e.target.value })}
                          placeholder="e.g. WAFFLE COLLECTION"
                          className="admin-form-input"
                        />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-form-label">Secondary Button Link</label>
                        <input
                          type="text"
                          value={heroBanner.secondaryBtnLink}
                          onChange={(e) => setHeroBanner({ ...heroBanner, secondaryBtnLink: e.target.value })}
                          placeholder="e.g. /shop?collection=waffle-collection"
                          className="admin-form-input"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Cinematic Video Showcase */}
                  <div className="admin-card" style={{ padding: "20px" }}>
                    <h3 className="admin-card-title" style={{ marginBottom: "16px", borderBottom: "1px solid #1e2633", paddingBottom: "12px" }}>
                      Video Asset &amp; Poster
                    </h3>

                    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                      <div>
                        <label className="admin-form-label" style={{ display: "block", marginBottom: "8px" }}>
                          Quick Select Campaign Video Preset
                        </label>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                          {[
                            { label: "Hero Brand Reel", video: "/videos/hero_reel.mp4", poster: "/products/sku-09/image_1.jpg" },
                            { label: "Winter Outerwear", video: "/videos/campaign_winter_1.mp4", poster: "/products/sku-03/image_1.jpg" },
                            { label: "Waffle Texture", video: "/videos/campaign_winter_2.mp4", poster: "/products/sku-02/image_1.jpg" },
                            { label: "Motion Streetwear", video: "/videos/promo_reel_1.mp4", poster: "/products/sku-04/image_1.jpg" }
                          ].map((preset) => (
                            <button
                              key={preset.video}
                              type="button"
                              onClick={() => {
                                setHeroBanner({
                                  ...heroBanner,
                                  videoUrl: preset.video,
                                  posterUrl: preset.poster
                                });
                              }}
                              className={`campaign-preset-chip ${heroBanner.videoUrl === preset.video ? "active" : ""}`}
                            >
                              {preset.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="admin-form-group">
                        <label className="admin-form-label">Video URL (Local Path or Cloudinary CDN Link)</label>
                        <input
                          type="text"
                          value={heroBanner.videoUrl}
                          onChange={(e) => setHeroBanner({ ...heroBanner, videoUrl: e.target.value })}
                          placeholder="/videos/hero_reel.mp4 or https://res.cloudinary.com/..."
                          className="admin-form-input"
                        />
                      </div>

                      <div className="admin-form-group">
                        <label className="admin-form-label">Poster Fallback Image</label>
                        <input
                          type="text"
                          value={heroBanner.posterUrl}
                          onChange={(e) => setHeroBanner({ ...heroBanner, posterUrl: e.target.value })}
                          placeholder="/products/sku-09/image_1.jpg"
                          className="admin-form-input"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT: Live WYSIWYG Storefront Preview */}
                <div style={{ position: "sticky", top: "80px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Eye style={{ width: "14px", height: "14px", color: "#11716c" }} />
                      <span style={{ fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.08em", color: "#ffffff" }}>
                        Live Storefront Preview
                      </span>
                    </div>
                    <span style={{ fontSize: "10px", color: "#64748b", fontFamily: "monospace" }}>
                      WYSIWYG Cinematic Mode
                    </span>
                  </div>

                  {/* Hero Preview Box */}
                  <div style={{
                    position: "relative",
                    aspectRatio: "16/10",
                    borderRadius: "12px",
                    overflow: "hidden",
                    backgroundColor: "#000000",
                    border: "1px solid #262626",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "24px",
                    textAlign: "center",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.6)"
                  }}>
                    {!heroBanner.isVisible && (
                      <div style={{
                        position: "absolute",
                        inset: 0,
                        backgroundColor: "rgba(0,0,0,0.85)",
                        backdropFilter: "blur(2px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 20
                      }}>
                        <div style={{
                          padding: "8px 16px",
                          borderRadius: "9999px",
                          backgroundColor: "#ef4444",
                          color: "#fff",
                          fontSize: "11px",
                          fontWeight: "800",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase"
                        }}>
                          Hero Banner Hidden on Store
                        </div>
                      </div>
                    )}

                    {/* Background Video */}
                    <video
                      key={heroBanner.videoUrl}
                      src={getVideoUrl(heroBanner.videoUrl || "/videos/hero_reel.mp4")}
                      poster={heroBanner.posterUrl || "/products/sku-09/image_1.jpg"}
                      autoPlay
                      loop
                      muted
                      playsInline
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        opacity: 0.75
                      }}
                    />

                    {/* Gradient Overlay */}
                    <div style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.5) 100%)",
                      pointerEvents: "none"
                    }} />

                    {/* Content */}
                    <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                      {heroBanner.subtitle && (
                        <p style={{
                          fontSize: "9px",
                          fontWeight: "800",
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          color: "#11716c",
                          margin: 0
                        }}>
                          {heroBanner.subtitle}
                        </p>
                      )}

                      <h3 style={{
                        fontSize: "20px",
                        fontWeight: "900",
                        letterSpacing: "0.02em",
                        textTransform: "uppercase",
                        color: "#ffffff",
                        lineHeight: 1.15,
                        margin: 0,
                        maxWidth: "90%"
                      }}>
                        {heroBanner.headline || "NOW LIVE: NEW ARRIVALS"}
                      </h3>

                      {heroBanner.tagline && (
                        <p style={{
                          fontSize: "10px",
                          color: "#d1d5db",
                          margin: 0,
                          lineHeight: 1.4,
                          maxWidth: "85%"
                        }}>
                          {heroBanner.tagline}
                        </p>
                      )}

                      {/* Buttons */}
                      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px", marginTop: "8px" }}>
                        {heroBanner.primaryBtnText && (
                          <div style={{
                            padding: "8px 16px",
                            backgroundColor: "#11716c",
                            color: "#ffffff",
                            borderRadius: "9999px",
                            fontSize: "10px",
                            fontWeight: "800",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px"
                          }}>
                            <span>{heroBanner.primaryBtnText}</span>
                            <ArrowUpRight style={{ width: "12px", height: "12px" }} />
                          </div>
                        )}
                        {heroBanner.secondaryBtnText && (
                          <div style={{
                            padding: "8px 16px",
                            backgroundColor: "transparent",
                            border: "1px solid #ffffff",
                            color: "#ffffff",
                            borderRadius: "9999px",
                            fontSize: "10px",
                            fontWeight: "800",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase"
                          }}>
                            {heroBanner.secondaryBtnText}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quick Tip */}
                  <div style={{ fontSize: "11px", color: "#64748b", padding: "10px", backgroundColor: "#0e131a", borderRadius: "8px", border: "1px solid #1e2633" }}>
                    💡 <strong>Pro-Tip:</strong> Clicking <em>&quot;Publish Changes&quot;</em> automatically broadcasts your new hero video and headline to any live customer tab in real-time.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 3: NAVBAR MENU ==================== */}
          {activeTab === "navigation" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* Top Status Bar */}
              <div className="admin-card" style={{ padding: "18px 24px" }}>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <h2 className="admin-card-title" style={{ fontSize: "14px" }}>Storefront Navigation Bar Menu</h2>
                      <span className="status-badge status-delivered">
                        Storefront Active &bull; {headerNavLinks.length} Items
                      </span>
                    </div>
                    <p className="admin-card-subtitle">
                      Customizes desktop and mobile header navigation links (including &apos;WINTER COLLECTION&apos; &amp; &apos;THE ₹1499 COLLECTION&apos;).
                    </p>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <button
                      type="button"
                      onClick={handleAddNavLink}
                      className="admin-outline-btn"
                    >
                      <Plus style={{ width: "13px", height: "13px" }} />
                      <span>Add Menu Link</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleResetNav}
                      className="admin-outline-btn"
                    >
                      <RotateCcw style={{ width: "13px", height: "13px" }} />
                      <span>Reset Defaults</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveNav}
                      className="admin-pill-btn"
                    >
                      <Save style={{ width: "14px", height: "14px" }} />
                      <span>Publish Changes</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Notice Banner on Campaign Links */}
              <div style={{
                backgroundColor: "#101621",
                border: "1px solid #1e293b",
                borderRadius: "10px",
                padding: "14px 18px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontSize: "12px",
                color: "#94a3b8"
              }}>
                <span style={{ fontSize: "18px" }}>🔥</span>
                <div>
                  <strong style={{ color: "#ffffff" }}>Featured Collection Links:</strong> You can edit, rename, or redirect promotional menu items such as <span style={{ color: "#11716c", fontWeight: "700" }}>WINTER COLLECTION</span> and <span style={{ color: "#11716c", fontWeight: "700" }}>THE ₹1499 COLLECTION</span> anytime to match new season drops.
                </div>
              </div>

              {/* Two-Column Editor & Live WYSIWYG Preview */}
              <div className="campaign-editor-layout">
                {/* LEFT: Menu Items List */}
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {headerNavLinks.map((item, idx) => {
                    const isCampaignLink = item.label.includes("WINTER") || item.label.includes("1499") || item.label.includes("COLLECTION");
                    return (
                      <div
                        key={idx}
                        className="admin-card"
                        style={{
                          padding: "16px 20px",
                          border: isCampaignLink ? "1px solid #11716c" : "1px solid #1e2633"
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <span style={{
                              width: "20px",
                              height: "20px",
                              borderRadius: "9999px",
                              backgroundColor: isCampaignLink ? "#11716c" : "#1e2633",
                              color: "#fff",
                              fontSize: "10px",
                              fontWeight: "800",
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center"
                            }}>
                              {idx + 1}
                            </span>
                            <span style={{ fontSize: "12px", fontWeight: "800", textTransform: "uppercase", color: "#ffffff" }}>
                              {item.label}
                            </span>
                            {isCampaignLink && (
                              <span style={{
                                fontSize: "9px",
                                fontWeight: "800",
                                textTransform: "uppercase",
                                backgroundColor: "rgba(17, 113, 108, 0.2)",
                                color: "#11716c",
                                padding: "2px 6px",
                                borderRadius: "4px"
                              }}>
                                Campaign Drop
                              </span>
                            )}
                          </div>

                          {headerNavLinks.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleDeleteNavLink(idx)}
                              style={{ background: "none", border: "none", color: "#f87171", cursor: "pointer", padding: "4px" }}
                              title="Delete menu link"
                            >
                              <Trash2 style={{ width: "15px", height: "15px" }} />
                            </button>
                          )}
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                          <div className="admin-form-group">
                            <label className="admin-form-label">Menu Item Label</label>
                            <input
                              type="text"
                              value={item.label}
                              onChange={(e) => handleUpdateNavLink(idx, "label", e.target.value)}
                              placeholder="e.g. WINTER COLLECTION"
                              className="admin-form-input"
                              style={{ fontWeight: "700" }}
                            />
                          </div>

                          <div className="admin-form-group">
                            <label className="admin-form-label">Destination Link / URL</label>
                            <input
                              type="text"
                              value={item.href}
                              onChange={(e) => handleUpdateNavLink(idx, "href", e.target.value)}
                              placeholder="e.g. /shop?collection=winter-collection"
                              className="admin-form-input"
                            />
                          </div>
                        </div>

                        {item.children && (
                          <div style={{ marginTop: "8px", fontSize: "10px", color: "#64748b" }}>
                            📁 <em>Dropdown container with {item.children.length} submenu categories (managed via catalog).</em>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  <button
                    type="button"
                    onClick={handleAddNavLink}
                    className="admin-outline-btn"
                    style={{ justifyContent: "center", padding: "12px", borderStyle: "dashed" }}
                  >
                    <Plus style={{ width: "16px", height: "16px" }} />
                    <span>Add Another Navigation Item</span>
                  </button>
                </div>

                {/* RIGHT: Live WYSIWYG Storefront Preview */}
                <div style={{ position: "sticky", top: "80px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Eye style={{ width: "14px", height: "14px", color: "#11716c" }} />
                      <span style={{ fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.08em", color: "#ffffff" }}>
                        Storefront Navbar Preview
                      </span>
                    </div>
                    <span style={{ fontSize: "10px", color: "#64748b", fontFamily: "monospace" }}>
                      Desktop &amp; Mobile Synced
                    </span>
                  </div>

                  {/* Header Replica */}
                  <div style={{
                    backgroundColor: "#0f1418",
                    backgroundImage: "radial-gradient(ellipse at center, rgba(15, 20, 24, 0.4) 0%, rgba(10, 14, 18, 0.85) 100%), url('/brand/navbar_grid_pattern.svg')",
                    backgroundRepeat: "repeat",
                    backgroundSize: "cover, 132px 66px",
                    borderRadius: "12px",
                    padding: "16px 20px",
                    border: "1px solid #1e2633",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px"
                  }}>
                    {/* Brand Row */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "10px" }}>
                      <Logo variant="header" style={{ height: "26px", width: "auto" }} />
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#94a3b8" }}>
                        <Search style={{ width: "14px", height: "14px" }} />
                        <ShoppingBag style={{ width: "14px", height: "14px" }} />
                      </div>
                    </div>

                    {/* Nav Links Row */}
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px 16px" }}>
                      {headerNavLinks.map((nav, i) => {
                        const isPromoted = nav.label.includes("WINTER") || nav.label.includes("1499");
                        return (
                          <div
                            key={i}
                            style={{
                              fontSize: "11px",
                              fontWeight: "700",
                              textTransform: "uppercase",
                              letterSpacing: "0.05em",
                              color: isPromoted ? "#11716c" : "#ffffff",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "3px"
                            }}
                          >
                            <span>{nav.label}</span>
                            {nav.children && <ChevronDown style={{ width: "11px", height: "11px", color: "#64748b" }} />}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Quick Tip */}
                  <div style={{ fontSize: "11px", color: "#64748b", padding: "10px", backgroundColor: "#0e131a", borderRadius: "8px", border: "1px solid #1e2633" }}>
                    💡 <strong>Pro-Tip:</strong> Any changes made to menu labels (e.g. changing <em>WINTER COLLECTION</em> to <em>SUMMER &apos;26</em> or altering <em>THE ₹1499 COLLECTION</em>) update simultaneously on desktop and mobile drawer menus.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 4: PRODUCTS ==================== */}
          {activeTab === "products" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "12px", color: "#94a3b8" }}>
                  Showing <strong style={{ color: "#fff" }}>{filteredProducts.length}</strong> products in catalog
                </span>
                <button
                  onClick={() => setIsAddProductOpen(true)}
                  className="admin-pill-btn"
                >
                  <Plus style={{ width: "14px", height: "14px" }} />
                  <span>Add New Product</span>
                </button>
              </div>

              <div className="admin-card">
                <div className="admin-table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th className="admin-th">Product</th>
                        <th className="admin-th">SKU</th>
                        <th className="admin-th">Category</th>
                        <th className="admin-th">Price</th>
                        <th className="admin-th">Compare Price</th>
                        <th className="admin-th">Badges</th>
                        <th className="admin-th" style={{ textAlign: "right" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((p) => (
                        <tr key={p.id} className="admin-tr">
                          <td className="admin-td">
                            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                              <div style={{ width: "44px", height: "44px", borderRadius: "6px", overflow: "hidden", backgroundColor: "#000", flexShrink: 0, border: "1px solid #1e2633" }}>
                                <img src={p.primaryImage} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                              </div>
                              <div style={{ minWidth: 0 }}>
                                <Link
                                  href={`/products/${p.id}`}
                                  target="_blank"
                                  style={{ fontWeight: "700", color: "#ffffff", textTransform: "uppercase", textDecoration: "none" }}
                                >
                                  {p.name}
                                </Link>
                                <div style={{ fontSize: "10px", color: "#64748b" }}>
                                  {p.sizes?.join(", ") || "XS, S, M, L, XL"}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="admin-td" style={{ fontFamily: "monospace", color: "#94a3b8", textTransform: "uppercase" }}>
                            {p.id}
                          </td>
                          <td className="admin-td" style={{ textTransform: "uppercase", fontWeight: "600" }}>
                            {p.category}
                          </td>
                          <td className="admin-td" style={{ fontWeight: "800", color: "#ffffff" }}>
                            {formatPrice(p.price)}
                          </td>
                          <td className="admin-td" style={{ color: "#64748b", textDecoration: "line-through" }}>
                            {p.originalPrice ? formatPrice(p.originalPrice) : "—"}
                          </td>
                          <td className="admin-td">
                            <div style={{ display: "flex", gap: "6px" }}>
                              {p.isNew && <span className="status-new">NEW</span>}
                              {p.isBestseller && <span className="status-bestseller">BESTSELLER</span>}
                            </div>
                          </td>
                          <td className="admin-td" style={{ textAlign: "right" }}>
                            <button
                              onClick={() => handleDeleteProduct(p.id)}
                              style={{ background: "none", border: "none", color: "#f87171", cursor: "pointer", padding: "4px" }}
                              title="Delete product"
                            >
                              <Trash2 style={{ width: "16px", height: "16px" }} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 3: ORDERS ==================== */}
          {activeTab === "orders" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {["all", "processing", "shipped", "delivered"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setOrderFilter(st)}
                    style={{
                      padding: "6px 16px",
                      borderRadius: "9999px",
                      fontSize: "11px",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      border: "none",
                      cursor: "pointer",
                      backgroundColor: orderFilter === st ? "#11716c" : "#171f2b",
                      color: "#ffffff"
                    }}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <div className="admin-card">
                <div className="admin-table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th className="admin-th">Order ID</th>
                        <th className="admin-th">Date</th>
                        <th className="admin-th">Customer & City</th>
                        <th className="admin-th">Items</th>
                        <th className="admin-th">Payment</th>
                        <th className="admin-th">Total</th>
                        <th className="admin-th">Fulfillment</th>
                        <th className="admin-th" style={{ textAlign: "right" }}>Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((ord) => (
                        <tr key={ord.id} className="admin-tr">
                          <td className="admin-td" style={{ fontFamily: "monospace", fontWeight: "700", color: "#ffffff" }}>
                            {ord.id}
                          </td>
                          <td className="admin-td" style={{ fontSize: "11px", color: "#64748b" }}>
                            {ord.date}
                          </td>
                          <td className="admin-td">
                            <div style={{ fontWeight: "700", color: "#ffffff" }}>{ord.customer}</div>
                            <div style={{ fontSize: "10px", color: "#64748b" }}>{ord.city}</div>
                          </td>
                          <td className="admin-td">
                            {ord.items.map((it, idx) => (
                              <div key={idx} style={{ fontSize: "11px" }}>
                                {it.qty}x {it.name} ({it.size})
                              </div>
                            ))}
                          </td>
                          <td className="admin-td" style={{ fontSize: "11px", color: "#94a3b8" }}>
                            {ord.payment}
                          </td>
                          <td className="admin-td" style={{ fontWeight: "800", color: "#ffffff" }}>
                            {formatPrice(ord.total)}
                          </td>
                          <td className="admin-td">
                            <select
                              value={ord.status}
                              onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value)}
                              style={{
                                padding: "4px 8px",
                                borderRadius: "9999px",
                                fontSize: "10px",
                                fontWeight: "700",
                                textTransform: "uppercase",
                                backgroundColor: "#171f2b",
                                color: ord.status === "Delivered" ? "#34d399" : ord.status === "Shipped" ? "#22d3ee" : "#fbbf24",
                                border: "1px solid #1e2633",
                                cursor: "pointer"
                              }}
                            >
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="admin-td" style={{ textAlign: "right" }}>
                            <button
                              onClick={() => setSelectedOrderDetails(ord)}
                              style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", padding: "4px" }}
                              title="Full Order Details"
                            >
                              <Eye style={{ width: "16px", height: "16px" }} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 4: CAMPAIGN BANNER ==================== */}
          {activeTab === "campaign" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* Campaign Top Status Bar */}
              <div className="admin-card" style={{ padding: "18px 24px" }}>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <h2 className="admin-card-title" style={{ fontSize: "14px" }}>Seasonal Campaign Showcase Banner</h2>
                      <span className={`status-badge ${campaignBanner.isVisible ? "status-delivered" : "status-cancelled"}`}>
                        {campaignBanner.isVisible ? "Live & Visible on Store" : "Banner Hidden / Off"}
                      </span>
                    </div>
                    <p className="admin-card-subtitle">
                      Controls the full-width high-impact seasonal showcase section on the homepage.
                    </p>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <button
                      type="button"
                      onClick={handleResetBanner}
                      className="admin-outline-btn"
                    >
                      <RotateCcw style={{ width: "13px", height: "13px" }} />
                      <span>Reset to Winter &apos;26</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveBanner}
                      className="admin-pill-btn"
                    >
                      <Save style={{ width: "14px", height: "14px" }} />
                      <span>Publish Changes</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Two-Column Editor & Live WYSIWYG Preview */}
              <div className="campaign-editor-layout">
                {/* LEFT: Complete Settings Form */}
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  
                  {/* Card: Visibility & Eyebrow */}
                  <div className="admin-card" style={{ padding: "20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", borderBottom: "1px solid #1e2633", paddingBottom: "12px" }}>
                      <h3 className="admin-card-title">Banner Display &amp; Copy</h3>
                      <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "12px", color: "#f1f5f9" }}>
                        <input
                          type="checkbox"
                          checked={campaignBanner.isVisible}
                          onChange={(e) => setCampaignBanner({ ...campaignBanner, isVisible: e.target.checked })}
                          style={{ accentColor: "#11716c", width: "16px", height: "16px", cursor: "pointer" }}
                        />
                        <span style={{ fontWeight: "700" }}>Enable on Homepage</span>
                      </label>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                      <div className="admin-form-group">
                        <label className="admin-form-label">Campaign Eyebrow / Tagline</label>
                        <input
                          type="text"
                          value={campaignBanner.tagline}
                          onChange={(e) => setCampaignBanner({ ...campaignBanner, tagline: e.target.value })}
                          placeholder="e.g. SEASONAL CAMPAIGN"
                          className="admin-form-input"
                        />
                      </div>

                      <div className="admin-form-group">
                        <label className="admin-form-label">Headline Title</label>
                        <input
                          type="text"
                          value={campaignBanner.title}
                          onChange={(e) => setCampaignBanner({ ...campaignBanner, title: e.target.value })}
                          placeholder="e.g. WINTER COLLECTION '26"
                          className="admin-form-input"
                        />
                      </div>

                      <div className="admin-form-group">
                        <label className="admin-form-label">Description / Subtitle</label>
                        <textarea
                          rows={3}
                          value={campaignBanner.description}
                          onChange={(e) => setCampaignBanner({ ...campaignBanner, description: e.target.value })}
                          placeholder="Detailed collection summary..."
                          className="admin-form-input"
                          style={{ resize: "vertical", fontFamily: "inherit" }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card: Call-to-Action Buttons */}
                  <div className="admin-card" style={{ padding: "20px" }}>
                    <h3 className="admin-card-title" style={{ marginBottom: "16px", borderBottom: "1px solid #1e2633", paddingBottom: "12px" }}>
                      Call-to-Action Buttons
                    </h3>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      <div className="admin-form-group">
                        <label className="admin-form-label">Primary Button Text</label>
                        <input
                          type="text"
                          value={campaignBanner.primaryBtnText}
                          onChange={(e) => setCampaignBanner({ ...campaignBanner, primaryBtnText: e.target.value })}
                          placeholder="e.g. EXPLORE WINTER DROP"
                          className="admin-form-input"
                        />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-form-label">Primary Button Link</label>
                        <input
                          type="text"
                          value={campaignBanner.primaryBtnLink}
                          onChange={(e) => setCampaignBanner({ ...campaignBanner, primaryBtnLink: e.target.value })}
                          placeholder="e.g. /shop?collection=winter-collection"
                          className="admin-form-input"
                        />
                      </div>

                      <div className="admin-form-group">
                        <label className="admin-form-label">Secondary Button Text</label>
                        <input
                          type="text"
                          value={campaignBanner.secondaryBtnText}
                          onChange={(e) => setCampaignBanner({ ...campaignBanner, secondaryBtnText: e.target.value })}
                          placeholder="e.g. VIEW BEST SELLERS"
                          className="admin-form-input"
                        />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-form-label">Secondary Button Link</label>
                        <input
                          type="text"
                          value={campaignBanner.secondaryBtnLink}
                          onChange={(e) => setCampaignBanner({ ...campaignBanner, secondaryBtnLink: e.target.value })}
                          placeholder="e.g. /shop?collection=best-sellers"
                          className="admin-form-input"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card: Video Showcase & Overlay Badges */}
                  <div className="admin-card" style={{ padding: "20px" }}>
                    <h3 className="admin-card-title" style={{ marginBottom: "16px", borderBottom: "1px solid #1e2633", paddingBottom: "12px" }}>
                      Video Showcase &amp; Badges
                    </h3>

                    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                      <div>
                        <label className="admin-form-label" style={{ display: "block", marginBottom: "8px" }}>
                          Quick Select Campaign Video Preset
                        </label>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                          {[
                            { label: "Winter Outerwear", video: "/videos/campaign_winter_1.mp4", poster: "/products/sku-03/image_1.jpg", reel: "Campaign Reel • Winter Archive" },
                            { label: "Waffle Texture", video: "/videos/campaign_winter_2.mp4", poster: "/products/sku-02/image_1.jpg", reel: "Fabric Focus • 240 GSM Waffle" },
                            { label: "Hero Streetwear", video: "/videos/hero_reel.mp4", poster: "/products/sku-01/image_1.jpg", reel: "Streetwear Motion • 2026 Drop" },
                            { label: "Promo Reel", video: "/videos/promo_reel_1.mp4", poster: "/products/sku-04/image_1.jpg", reel: "V-Mind Brand Reel • Jaipur" }
                          ].map((preset) => (
                            <button
                              key={preset.video}
                              type="button"
                              onClick={() => {
                                setCampaignBanner({
                                  ...campaignBanner,
                                  videoUrl: preset.video,
                                  posterUrl: preset.poster,
                                  reelBadge: preset.reel
                                });
                              }}
                              className={`campaign-preset-chip ${campaignBanner.videoUrl === preset.video ? "active" : ""}`}
                            >
                              {preset.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="admin-form-group">
                        <label className="admin-form-label">Video URL (Local Path or Cloudinary CDN)</label>
                        <input
                          type="text"
                          value={campaignBanner.videoUrl}
                          onChange={(e) => setCampaignBanner({ ...campaignBanner, videoUrl: e.target.value })}
                          placeholder="/videos/campaign_winter_1.mp4 or https://res.cloudinary.com/..."
                          className="admin-form-input"
                        />
                      </div>

                      <div className="admin-form-group">
                        <label className="admin-form-label">Poster Image (Fallback / Loading)</label>
                        <input
                          type="text"
                          value={campaignBanner.posterUrl}
                          onChange={(e) => setCampaignBanner({ ...campaignBanner, posterUrl: e.target.value })}
                          placeholder="/products/sku-03/image_1.jpg"
                          className="admin-form-input"
                        />
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                        <div className="admin-form-group">
                          <label className="admin-form-label">Bottom-Left Reel Badge</label>
                          <input
                            type="text"
                            value={campaignBanner.reelBadge}
                            onChange={(e) => setCampaignBanner({ ...campaignBanner, reelBadge: e.target.value })}
                            placeholder="Campaign Reel • Winter Archive"
                            className="admin-form-input"
                          />
                        </div>
                        <div className="admin-form-group">
                          <label className="admin-form-label">Bottom-Right Location Badge</label>
                          <input
                            type="text"
                            value={campaignBanner.locationBadge}
                            onChange={(e) => setCampaignBanner({ ...campaignBanner, locationBadge: e.target.value })}
                            placeholder="Shot on Location • Jaipur"
                            className="admin-form-input"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT: Live Interactive Preview Card */}
                <div style={{ position: "sticky", top: "80px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Eye style={{ width: "14px", height: "14px", color: "#11716c" }} />
                      <span style={{ fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.08em", color: "#ffffff" }}>
                        Live Storefront Preview
                      </span>
                    </div>
                    <span style={{ fontSize: "10px", color: "#64748b", fontFamily: "monospace" }}>
                      WYSIWYG Real-Time
                    </span>
                  </div>

                  {/* Banner Preview Replica */}
                  <div className="campaign-preview-card" style={{ padding: "24px 20px" }}>
                    {!campaignBanner.isVisible && (
                      <div style={{
                        position: "absolute",
                        inset: 0,
                        backgroundColor: "rgba(0,0,0,0.85)",
                        backdropFilter: "blur(2px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 20
                      }}>
                        <div style={{
                          padding: "8px 16px",
                          borderRadius: "9999px",
                          backgroundColor: "#ef4444",
                          color: "#fff",
                          fontSize: "11px",
                          fontWeight: "800",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase"
                        }}>
                          Banner Hidden on Store
                        </div>
                      </div>
                    )}

                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                      {/* Eyebrow */}
                      {campaignBanner.tagline && (
                        <span style={{ fontSize: "10px", fontWeight: "800", letterSpacing: "0.2em", textTransform: "uppercase", color: "#11716c" }}>
                          {campaignBanner.tagline}
                        </span>
                      )}

                      {/* Title */}
                      <h3 style={{ fontSize: "20px", fontWeight: "900", textTransform: "uppercase", color: "#ffffff", lineHeight: 1.15, margin: 0, whiteSpace: "pre-line" }}>
                        {campaignBanner.title || "CAMPAIGN TITLE"}
                      </h3>

                      {/* Description */}
                      <p style={{ fontSize: "11px", color: "#cbd5e1", lineHeight: 1.5, margin: 0 }}>
                        {campaignBanner.description || "Description preview goes here..."}
                      </p>

                      {/* Buttons */}
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", paddingTop: "4px" }}>
                        {campaignBanner.primaryBtnText && (
                          <div style={{
                            padding: "8px 16px",
                            backgroundColor: "#11716c",
                            color: "#ffffff",
                            borderRadius: "9999px",
                            fontSize: "10px",
                            fontWeight: "800",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px"
                          }}>
                            <span>{campaignBanner.primaryBtnText}</span>
                            <ArrowUpRight style={{ width: "12px", height: "12px" }} />
                          </div>
                        )}
                        {campaignBanner.secondaryBtnText && (
                          <div style={{
                            padding: "8px 16px",
                            backgroundColor: "transparent",
                            border: "1px solid #525252",
                            color: "#ffffff",
                            borderRadius: "9999px",
                            fontSize: "10px",
                            fontWeight: "800",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase"
                          }}>
                            {campaignBanner.secondaryBtnText}
                          </div>
                        )}
                      </div>

                      {/* Video Player Box */}
                      <div style={{
                        marginTop: "8px",
                        position: "relative",
                        aspectRatio: "16/10",
                        borderRadius: "8px",
                        overflow: "hidden",
                        backgroundColor: "#0a0a0a",
                        border: "1px solid #262626"
                      }}>
                        <video
                          key={campaignBanner.videoUrl}
                          src={getVideoUrl(campaignBanner.videoUrl || "/videos/campaign_winter_1.mp4")}
                          poster={campaignBanner.posterUrl || "/products/sku-03/image_1.jpg"}
                          autoPlay
                          loop
                          muted
                          playsInline
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                        <div style={{
                          position: "absolute",
                          inset: 0,
                          background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)",
                          pointerEvents: "none"
                        }} />
                        <div style={{
                          position: "absolute",
                          bottom: "8px",
                          left: "8px",
                          right: "8px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center"
                        }}>
                          {campaignBanner.reelBadge && (
                            <span style={{
                              fontSize: "9px",
                              fontWeight: "700",
                              textTransform: "uppercase",
                              letterSpacing: "0.06em",
                              backgroundColor: "rgba(0,0,0,0.85)",
                              padding: "3px 8px",
                              color: "#fff"
                            }}>
                              {campaignBanner.reelBadge}
                            </span>
                          )}
                          {campaignBanner.locationBadge && (
                            <span style={{ fontSize: "9px", color: "#d1d5db" }}>
                              {campaignBanner.locationBadge}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Tip */}
                  <div style={{ fontSize: "11px", color: "#64748b", padding: "10px", backgroundColor: "#0e131a", borderRadius: "8px", border: "1px solid #1e2633" }}>
                    💡 <strong>Pro-Tip:</strong> Clicking <em>&quot;Publish Changes&quot;</em> automatically broadcasts your new banner copy to the live homepage without page refresh.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 5: CATEGORY TILES ==================== */}
          {activeTab === "categories" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* Top Status Bar */}
              <div className="admin-card" style={{ padding: "18px 24px" }}>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <h2 className="admin-card-title" style={{ fontSize: "14px" }}>Shop By Category Showcase</h2>
                      <span className={`status-badge ${categorySection.isVisible ? "status-delivered" : "status-cancelled"}`}>
                        {categorySection.isVisible ? "Storefront Active" : "Section Hidden"}
                      </span>
                    </div>
                    <p className="admin-card-subtitle">
                      Visual catalog tiles featured below the hero banner. Click presets or customize titles, photos, and links.
                    </p>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <button
                      type="button"
                      onClick={handleAddTile}
                      className="admin-outline-btn"
                    >
                      <Plus style={{ width: "13px", height: "13px" }} />
                      <span>Add Tile</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleResetCategories}
                      className="admin-outline-btn"
                    >
                      <RotateCcw style={{ width: "13px", height: "13px" }} />
                      <span>Reset Defaults</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveCategories}
                      className="admin-pill-btn"
                    >
                      <Save style={{ width: "14px", height: "14px" }} />
                      <span>Publish Changes</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Two-Column Editor & Live WYSIWYG Preview */}
              <div className="campaign-editor-layout">
                {/* LEFT: Category Tiles Form */}
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  
                  {/* Card: Section Header & Visibility */}
                  <div className="admin-card" style={{ padding: "20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", borderBottom: "1px solid #1e2633", paddingBottom: "12px" }}>
                      <h3 className="admin-card-title">Section Headings &amp; Display</h3>
                      <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "12px", color: "#f1f5f9" }}>
                        <input
                          type="checkbox"
                          checked={categorySection.isVisible}
                          onChange={(e) => setCategorySection({ ...categorySection, isVisible: e.target.checked })}
                          style={{ accentColor: "#11716c", width: "16px", height: "16px", cursor: "pointer" }}
                        />
                        <span style={{ fontWeight: "700" }}>Enable on Homepage</span>
                      </label>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      <div className="admin-form-group">
                        <label className="admin-form-label">Eyebrow Tagline</label>
                        <input
                          type="text"
                          value={categorySection.eyebrow}
                          onChange={(e) => setCategorySection({ ...categorySection, eyebrow: e.target.value })}
                          placeholder="CURATED CATALOG"
                          className="admin-form-input"
                        />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-form-label">Section Heading</label>
                        <input
                          type="text"
                          value={categorySection.title}
                          onChange={(e) => setCategorySection({ ...categorySection, title: e.target.value })}
                          placeholder="SHOP BY CATEGORY"
                          className="admin-form-input"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Tile Cards */}
                  {categorySection.tiles?.map((tile, idx) => (
                    <div key={tile.id || idx} className="admin-card" style={{ padding: "20px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", borderBottom: "1px solid #1e2633", paddingBottom: "10px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{
                            width: "22px",
                            height: "22px",
                            borderRadius: "9999px",
                            backgroundColor: "#11716c",
                            color: "#fff",
                            fontSize: "11px",
                            fontWeight: "800",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}>
                            {idx + 1}
                          </span>
                          <span style={{ fontSize: "12px", fontWeight: "800", textTransform: "uppercase", color: "#ffffff" }}>
                            {tile.title || `Tile #${idx + 1}`}
                          </span>
                        </div>

                        {categorySection.tiles.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleDeleteTile(idx)}
                            style={{ background: "none", border: "none", color: "#f87171", cursor: "pointer", padding: "4px" }}
                            title="Delete this tile"
                          >
                            <Trash2 style={{ width: "16px", height: "16px" }} />
                          </button>
                        )}
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                          <div className="admin-form-group">
                            <label className="admin-form-label">Category Title (Main Label)</label>
                            <input
                              type="text"
                              value={tile.title}
                              onChange={(e) => handleUpdateTile(idx, "title", e.target.value)}
                              placeholder="e.g. TOP WEAR"
                              className="admin-form-input"
                            />
                          </div>
                          <div className="admin-form-group">
                            <label className="admin-form-label">Subtitle / Silhouette</label>
                            <input
                              type="text"
                              value={tile.subtitle}
                              onChange={(e) => handleUpdateTile(idx, "subtitle", e.target.value)}
                              placeholder="e.g. Heavyweight Boxy Tees"
                              className="admin-form-input"
                            />
                          </div>
                        </div>

                        <div className="admin-form-group">
                          <label className="admin-form-label">Image Path or URL</label>
                          <input
                            type="text"
                            value={tile.image}
                            onChange={(e) => handleUpdateTile(idx, "image", e.target.value)}
                            placeholder="/products/sku-01/image_1.jpg"
                            className="admin-form-input"
                          />
                        </div>

                        {/* Quick Image Presets */}
                        <div>
                          <span className="admin-form-label" style={{ display: "block", marginBottom: "6px" }}>
                            Quick Select Product Image
                          </span>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((skuNum) => {
                              const imgPath = `/products/sku-0${skuNum}/image_1.jpg`;
                              const isActive = tile.image === imgPath;
                              return (
                                <button
                                  key={skuNum}
                                  type="button"
                                  onClick={() => handleUpdateTile(idx, "image", imgPath)}
                                  className={`campaign-preset-chip ${isActive ? "active" : ""}`}
                                  style={{ fontSize: "10px", padding: "3px 8px" }}
                                >
                                  SKU-0{skuNum}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="admin-form-group">
                          <label className="admin-form-label">Click Destination URL / Route</label>
                          <input
                            type="text"
                            value={tile.href}
                            onChange={(e) => handleUpdateTile(idx, "href", e.target.value)}
                            placeholder="e.g. /shop?category=t-shirts"
                            className="admin-form-input"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={handleAddTile}
                    className="admin-outline-btn"
                    style={{ justifyContent: "center", padding: "12px", borderStyle: "dashed" }}
                  >
                    <Plus style={{ width: "16px", height: "16px" }} />
                    <span>Add Another Category Tile</span>
                  </button>
                </div>

                {/* RIGHT: Live WYSIWYG Storefront Preview */}
                <div style={{ position: "sticky", top: "80px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Eye style={{ width: "14px", height: "14px", color: "#11716c" }} />
                      <span style={{ fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.08em", color: "#ffffff" }}>
                        Storefront Live Preview
                      </span>
                    </div>
                    <span style={{ fontSize: "10px", color: "#64748b", fontFamily: "monospace" }}>
                      {categorySection.tiles?.length} Tiles Active
                    </span>
                  </div>

                  {/* Preview Container on White Background replicating the Storefront */}
                  <div style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "12px",
                    padding: "24px 16px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                    position: "relative",
                    overflow: "hidden"
                  }}>
                    {!categorySection.isVisible && (
                      <div style={{
                        position: "absolute",
                        inset: 0,
                        backgroundColor: "rgba(0,0,0,0.85)",
                        backdropFilter: "blur(2px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 20
                      }}>
                        <div style={{
                          padding: "8px 16px",
                          borderRadius: "9999px",
                          backgroundColor: "#ef4444",
                          color: "#fff",
                          fontSize: "11px",
                          fontWeight: "800",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase"
                        }}>
                          Section Hidden on Store
                        </div>
                      </div>
                    )}

                    {/* Section Header */}
                    <div style={{ textAlign: "center", marginBottom: "16px" }}>
                      {categorySection.eyebrow && (
                        <p style={{
                          fontSize: "9px",
                          fontWeight: "800",
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          color: "#11716c",
                          margin: "0 0 4px 0"
                        }}>
                          {categorySection.eyebrow}
                        </p>
                      )}
                      <h3 style={{
                        fontSize: "16px",
                        fontWeight: "900",
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                        color: "#171717",
                        margin: 0
                      }}>
                        {categorySection.title || "SHOP BY CATEGORY"}
                      </h3>
                    </div>

                    {/* Tiles Grid */}
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: categorySection.tiles?.length >= 4 ? "repeat(2, 1fr)" : "repeat(auto-fit, minmax(110px, 1fr))",
                      gap: "8px"
                    }}>
                      {categorySection.tiles?.map((cat, i) => (
                        <div
                          key={cat.id || i}
                          style={{
                            position: "relative",
                            aspectRatio: "4/5",
                            overflow: "hidden",
                            backgroundColor: "#171717",
                            borderRadius: "4px"
                          }}
                        >
                          <img
                            src={cat.image || "/products/sku-01/image_1.jpg"}
                            alt={cat.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.9 }}
                          />
                          <div style={{
                            position: "absolute",
                            inset: 0,
                            background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)"
                          }} />
                          <div style={{
                            position: "absolute",
                            bottom: "8px",
                            left: "8px",
                            right: "8px",
                            color: "#ffffff"
                          }}>
                            {cat.subtitle && (
                              <p style={{
                                fontSize: "8px",
                                color: "#d4d4d4",
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                                margin: "0 0 2px 0",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap"
                              }}>
                                {cat.subtitle}
                              </p>
                            )}
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <span style={{
                                fontSize: "10px",
                                fontWeight: "800",
                                textTransform: "uppercase",
                                letterSpacing: "0.04em",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap"
                              }}>
                                {cat.title}
                              </span>
                              <ArrowUpRight style={{ width: "11px", height: "11px", color: "#ffffff", flexShrink: 0 }} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Tip */}
                  <div style={{ fontSize: "11px", color: "#64748b", padding: "10px", backgroundColor: "#0e131a", borderRadius: "8px", border: "1px solid #1e2633" }}>
                    💡 <strong>Pro-Tip:</strong> Changes publish instantly across your store. Customers see updated tiles without needing to refresh.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 6: SIZE GUIDE ==================== */}
          {activeTab === "sizeguide" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* Top Status Bar */}
              <div className="admin-card" style={{ padding: "18px 24px" }}>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <h2 className="admin-card-title" style={{ fontSize: "14px" }}>Garment Sizing Guide &amp; Measurements</h2>
                      <span className="status-badge status-delivered">
                        Storefront Active &bull; {sizeGuide.rows?.length} Sizes
                      </span>
                    </div>
                    <p className="admin-card-subtitle">
                      Controls the interactive sizing pop-up modal on all product pages and the Quick Add drawer.
                    </p>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <button
                      type="button"
                      onClick={handleAddSizeRow}
                      className="admin-outline-btn"
                    >
                      <Plus style={{ width: "13px", height: "13px" }} />
                      <span>Add Size</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleResetSizeGuide}
                      className="admin-outline-btn"
                    >
                      <RotateCcw style={{ width: "13px", height: "13px" }} />
                      <span>Reset Defaults</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveSizeGuide}
                      className="admin-pill-btn"
                    >
                      <Save style={{ width: "14px", height: "14px" }} />
                      <span>Publish Changes</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Two-Column Editor & Live WYSIWYG Preview */}
              <div className="campaign-editor-layout">
                {/* LEFT: Sizing Settings & Measurements Table */}
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  
                  {/* Card: Header Titles & Unit */}
                  <div className="admin-card" style={{ padding: "20px" }}>
                    <h3 className="admin-card-title" style={{ marginBottom: "16px", borderBottom: "1px solid #1e2633", paddingBottom: "12px" }}>
                      Modal Header &amp; Button Text
                    </h3>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                      <div className="admin-form-group">
                        <label className="admin-form-label">Trigger Link / Button Label</label>
                        <input
                          type="text"
                          value={sizeGuide.buttonText}
                          onChange={(e) => setSizeGuide({ ...sizeGuide, buttonText: e.target.value })}
                          placeholder="e.g. Size Guide"
                          className="admin-form-input"
                        />
                      </div>

                      <div className="admin-form-group">
                        <label className="admin-form-label">Modal Dialog Title</label>
                        <input
                          type="text"
                          value={sizeGuide.modalTitle}
                          onChange={(e) => setSizeGuide({ ...sizeGuide, modalTitle: e.target.value })}
                          placeholder="e.g. Size Guide"
                          className="admin-form-input"
                        />
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "12px" }}>
                      <div className="admin-form-group">
                        <label className="admin-form-label">Measurement Unit</label>
                        <select
                          value={sizeGuide.unit}
                          onChange={(e) => setSizeGuide({ ...sizeGuide, unit: e.target.value })}
                          className="admin-form-input"
                          style={{ cursor: "pointer" }}
                        >
                          <option value="Inches">Inches</option>
                          <option value="CM">Centimeters (CM)</option>
                        </select>
                      </div>

                      <div className="admin-form-group">
                        <label className="admin-form-label">Garment Silhouette / Fit Disclaimer Note</label>
                        <textarea
                          rows={2}
                          value={sizeGuide.note}
                          onChange={(e) => setSizeGuide({ ...sizeGuide, note: e.target.value })}
                          placeholder="Note on drop shoulder fit..."
                          className="admin-form-input"
                          style={{ resize: "vertical", fontFamily: "inherit" }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card: Measurements Table */}
                  <div className="admin-card" style={{ padding: "20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", borderBottom: "1px solid #1e2633", paddingBottom: "12px" }}>
                      <div>
                        <h3 className="admin-card-title">Size Chart Measurements ({sizeGuide.unit})</h3>
                        <p className="admin-card-subtitle">Directly edit chest, body length, and shoulder specifications per size.</p>
                      </div>
                      <button
                        type="button"
                        onClick={handleAddSizeRow}
                        className="admin-pill-btn"
                        style={{ padding: "6px 14px", fontSize: "10px" }}
                      >
                        <Plus style={{ width: "12px", height: "12px" }} />
                        <span>Add Row</span>
                      </button>
                    </div>

                    <div className="admin-table-container">
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th className="admin-th" style={{ width: "80px" }}>Size</th>
                            <th className="admin-th">Chest ({sizeGuide.unit})</th>
                            <th className="admin-th">Length ({sizeGuide.unit})</th>
                            <th className="admin-th">Shoulder ({sizeGuide.unit})</th>
                            <th className="admin-th" style={{ textAlign: "right", width: "60px" }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sizeGuide.rows?.map((row, idx) => (
                            <tr key={idx} className="admin-tr">
                              <td className="admin-td">
                                <input
                                  type="text"
                                  value={row.size}
                                  onChange={(e) => handleUpdateSizeRow(idx, "size", e.target.value)}
                                  className="admin-form-input"
                                  style={{ width: "65px", fontWeight: "800", textTransform: "uppercase", textAlign: "center", padding: "6px" }}
                                />
                              </td>
                              <td className="admin-td">
                                <input
                                  type="text"
                                  value={row.chest}
                                  onChange={(e) => handleUpdateSizeRow(idx, "chest", e.target.value)}
                                  className="admin-form-input"
                                  style={{ width: "100%", padding: "6px 10px" }}
                                  placeholder="e.g. 44"
                                />
                              </td>
                              <td className="admin-td">
                                <input
                                  type="text"
                                  value={row.length}
                                  onChange={(e) => handleUpdateSizeRow(idx, "length", e.target.value)}
                                  className="admin-form-input"
                                  style={{ width: "100%", padding: "6px 10px" }}
                                  placeholder="e.g. 29"
                                />
                              </td>
                              <td className="admin-td">
                                <input
                                  type="text"
                                  value={row.shoulder}
                                  onChange={(e) => handleUpdateSizeRow(idx, "shoulder", e.target.value)}
                                  className="admin-form-input"
                                  style={{ width: "100%", padding: "6px 10px" }}
                                  placeholder="e.g. 21.5"
                                />
                              </td>
                              <td className="admin-td" style={{ textAlign: "right" }}>
                                {sizeGuide.rows.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteSizeRow(idx)}
                                    style={{ background: "none", border: "none", color: "#f87171", cursor: "pointer", padding: "4px" }}
                                    title="Delete row"
                                  >
                                    <Trash2 style={{ width: "16px", height: "16px" }} />
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* RIGHT: Live WYSIWYG Storefront Preview */}
                <div style={{ position: "sticky", top: "80px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Eye style={{ width: "14px", height: "14px", color: "#11716c" }} />
                      <span style={{ fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.08em", color: "#ffffff" }}>
                        Storefront Dialog Preview
                      </span>
                    </div>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#11716c", fontSize: "11px", fontWeight: "700", textTransform: "uppercase" }}>
                      <Ruler style={{ width: "13px", height: "13px" }} />
                      <span>{sizeGuide.buttonText || "Size Guide"}</span>
                    </div>
                  </div>

                  {/* Modal Replica on White Canvas */}
                  <div style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "16px",
                    padding: "24px 20px",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.45)",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px"
                  }}>
                    {/* Header */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e5e7eb", paddingBottom: "12px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <Ruler style={{ width: "18px", height: "18px", color: "#11716c" }} />
                        <h4 style={{ fontSize: "13px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.05em", color: "#111827", margin: 0 }}>
                          {sizeGuide.modalTitle || "Size Guide"} &bull; In {sizeGuide.unit || "Inches"}
                        </h4>
                      </div>
                      <div style={{ width: "24px", height: "24px", borderRadius: "9999px", display: "flex", alignItems: "center", justifyContent: "center", color: "#9ca3af" }}>
                        <X style={{ width: "16px", height: "16px" }} />
                      </div>
                    </div>

                    {/* Table */}
                    <div style={{ overflowX: "auto" }}>
                      <table style={{ width: "100%", fontSize: "11px", textAlign: "left", borderCollapse: "collapse" }}>
                        <thead>
                          <tr style={{ backgroundColor: "#f3f4f6", color: "#1f2937", textTransform: "uppercase", fontSize: "10px", fontWeight: "800" }}>
                            <th style={{ padding: "8px 10px" }}>Size</th>
                            <th style={{ padding: "8px 10px" }}>Chest ({sizeGuide.unit})</th>
                            <th style={{ padding: "8px 10px" }}>Length ({sizeGuide.unit})</th>
                            <th style={{ padding: "8px 10px" }}>Shoulder ({sizeGuide.unit})</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sizeGuide.rows?.map((r, i) => (
                            <tr key={i} style={{ borderBottom: "1px solid #f3f4f6", color: "#4b5563" }}>
                              <td style={{ padding: "8px 10px", fontWeight: "800", color: "#111827" }}>{r.size}</td>
                              <td style={{ padding: "8px 10px" }}>{r.chest}</td>
                              <td style={{ padding: "8px 10px" }}>{r.length}</td>
                              <td style={{ padding: "8px 10px" }}>{r.shoulder}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Note */}
                    {sizeGuide.note && (
                      <p style={{ fontSize: "10px", color: "#6b7280", fontStyle: "italic", margin: 0, lineHeight: 1.4 }}>
                        {sizeGuide.note}
                      </p>
                    )}

                    {/* Pill Button */}
                    <button
                      type="button"
                      style={{
                        width: "100%",
                        backgroundColor: "#11716c",
                        color: "#ffffff",
                        padding: "10px",
                        borderRadius: "9999px",
                        fontSize: "11px",
                        fontWeight: "800",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        border: "none",
                        cursor: "pointer"
                      }}
                    >
                      Got It
                    </button>
                  </div>

                  {/* Quick Tip */}
                  <div style={{ fontSize: "11px", color: "#64748b", padding: "10px", backgroundColor: "#0e131a", borderRadius: "8px", border: "1px solid #1e2633" }}>
                    💡 <strong>Pro-Tip:</strong> Updating measurements here syncs live across every single product page and the Quick-Add dialog without needing to redeploy.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 7: DISCOUNTS ==================== */}
          {activeTab === "discounts" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "12px", color: "#94a3b8" }}>Active promotional codes and coupon campaigns</span>
                <button
                  onClick={() => setIsAddCouponOpen(true)}
                  className="admin-pill-btn"
                >
                  <Plus style={{ width: "14px", height: "14px" }} />
                  <span>New Coupon Code</span>
                </button>
              </div>

              <div className="admin-card">
                <div className="admin-table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th className="admin-th">Coupon Code</th>
                        <th className="admin-th">Benefit</th>
                        <th className="admin-th">Type</th>
                        <th className="admin-th">Total Uses</th>
                        <th className="admin-th">Status</th>
                        <th className="admin-th" style={{ textAlign: "right" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {coupons.map((c) => (
                        <tr key={c.code} className="admin-tr">
                          <td className="admin-td" style={{ fontFamily: "monospace", fontWeight: "700", color: "#ffffff" }}>
                            {c.code}
                          </td>
                          <td className="admin-td" style={{ fontWeight: "700", color: "#34d399" }}>
                            {c.type === "shipping" ? "Free Shipping" : `${c.discount}% OFF`}
                          </td>
                          <td className="admin-td" style={{ textTransform: "uppercase", fontSize: "10px", color: "#94a3b8" }}>
                            {c.type}
                          </td>
                          <td className="admin-td" style={{ color: "#ffffff" }}>
                            {c.uses} orders
                          </td>
                          <td className="admin-td">
                            <span className="status-badge status-delivered">{c.status}</span>
                          </td>
                          <td className="admin-td" style={{ textAlign: "right" }}>
                            <button
                              onClick={() => handleDeleteCoupon(c.code)}
                              style={{ background: "none", border: "none", color: "#f87171", cursor: "pointer", padding: "4px" }}
                              title="Delete coupon"
                            >
                              <Trash2 style={{ width: "16px", height: "16px" }} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 5: MEDIA & CLOUDINARY ==================== */}
          {activeTab === "media" && (
            <div className="admin-card" style={{ padding: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #1e2633", paddingBottom: "16px", marginBottom: "16px" }}>
                <div>
                  <h3 className="admin-card-title">Cloudinary CDN Video Streaming</h3>
                  <p className="admin-card-subtitle">Cloud Name: <strong style={{ color: "#fff" }}>dclmrpuiq</strong> &bull; Free Global CDN streaming</p>
                </div>
                <span className="status-badge status-delivered">Online &amp; Active</span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "12px" }}>
                {[
                  { name: "hero_reel.mp4", role: "Hero Background Reel", cdn: "https://res.cloudinary.com/dclmrpuiq/video/upload/v1795388693/vmind/videos/hero_reel.mp4" },
                  { name: "campaign_winter_1.mp4", role: "Winter Outerwear Spotlight", cdn: "https://res.cloudinary.com/dclmrpuiq/video/upload/v1795388702/vmind/videos/campaign_winter_1.mp4" },
                  { name: "campaign_winter_2.mp4", role: "Waffle Texture Details", cdn: "https://res.cloudinary.com/dclmrpuiq/video/upload/v1795388712/vmind/videos/campaign_winter_2.mp4" },
                  { name: "promo_reel_1.mp4", role: "Streetwear Motion Reel", cdn: "https://res.cloudinary.com/dclmrpuiq/video/upload/v1795388752/vmind/videos/promo_reel_1.mp4" }
                ].map((vid) => (
                  <div key={vid.name} style={{ padding: "14px", backgroundColor: "#0e131a", borderRadius: "8px", border: "1px solid #1e2633", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: "12px", fontWeight: "700", color: "#ffffff" }}>{vid.role}</div>
                      <div style={{ fontSize: "10px", color: "#64748b", fontFamily: "monospace" }}>{vid.name}</div>
                    </div>
                    <a
                      href={vid.cdn}
                      target="_blank"
                      rel="noreferrer"
                      style={{ padding: "6px", backgroundColor: "#171f2b", color: "#11716c", borderRadius: "6px", display: "flex" }}
                    >
                      <ExternalLink style={{ width: "16px", height: "16px" }} />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==================== TAB 6: SETTINGS ==================== */}
          {activeTab === "settings" && (
            <div className="admin-card" style={{ padding: "24px", maxWidth: "600px" }}>
              <h3 className="admin-card-title" style={{ borderBottom: "1px solid #1e2633", paddingBottom: "12px", marginBottom: "16px" }}>
                Jaipur Headquarters &amp; Fulfillment
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "12px" }}>
                <div>
                  <span className="admin-form-label">Brand Name</span>
                  <input type="text" disabled value="V-MIND FASHION" className="admin-form-input" style={{ width: "100%", marginTop: "4px" }} />
                </div>
                <div>
                  <span className="admin-form-label">Fulfillment Warehouse</span>
                  <input type="text" disabled value="Sirsi Road, Jaipur, Rajasthan 302012, India" className="admin-form-input" style={{ width: "100%", marginTop: "4px" }} />
                </div>
                <div>
                  <span className="admin-form-label">Customer Support Line</span>
                  <input type="text" disabled value="+91 86195 91338 (Mon–Sat 11:30 AM – 7:00 PM IST)" className="admin-form-input" style={{ width: "100%", marginTop: "4px" }} />
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* ==================== ADD PRODUCT MODAL ==================== */}
      {isAddProductOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-box">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #1e2633", paddingBottom: "12px" }}>
              <h3 style={{ fontSize: "14px", fontWeight: "800", textTransform: "uppercase", color: "#fff", margin: 0 }}>Add New Streetwear SKU</h3>
              <button onClick={() => setIsAddProductOpen(false)} style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer" }}>
                <X style={{ width: "18px", height: "18px" }} />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div className="admin-form-group">
                <label className="admin-form-label">Product Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acid-Washed Boxy Drop Tee"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="admin-form-input"
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div className="admin-form-group">
                  <label className="admin-form-label">Category</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="admin-form-input"
                  >
                    <option value="t-shirts">T-Shirts</option>
                    <option value="waffle-collection">Waffle Collection</option>
                    <option value="hoodies-jackets">Hoodies &amp; Jackets</option>
                    <option value="bottoms">Bottoms &amp; Sweatpants</option>
                  </select>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })}
                    className="admin-form-input"
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div className="admin-form-group">
                  <label className="admin-form-label">Compare-at Price (₹)</label>
                  <input
                    type="number"
                    value={newProduct.originalPrice}
                    onChange={(e) => setNewProduct({ ...newProduct, originalPrice: parseFloat(e.target.value) || 0 })}
                    className="admin-form-input"
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Primary Image Path</label>
                  <input
                    type="text"
                    value={newProduct.primaryImage}
                    onChange={(e) => setNewProduct({ ...newProduct, primaryImage: e.target.value })}
                    className="admin-form-input"
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: "16px", paddingTop: "8px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#cbd5e1", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={newProduct.isNew}
                    onChange={(e) => setNewProduct({ ...newProduct, isNew: e.target.checked })}
                  />
                  <span>Mark as New</span>
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#cbd5e1", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={newProduct.isBestseller}
                    onChange={(e) => setNewProduct({ ...newProduct, isBestseller: e.target.checked })}
                  />
                  <span>Mark as Bestseller</span>
                </label>
              </div>

              <div style={{ display: "flex", gap: "10px", paddingTop: "12px", borderTop: "1px solid #1e2633" }}>
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="admin-outline-btn"
                  style={{ flex: 1, justifyContent: "center" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="admin-pill-btn"
                  style={{ flex: 1, justifyContent: "center" }}
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== ORDER DETAILS MODAL ==================== */}
      {selectedOrderDetails && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-box">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #1e2633", paddingBottom: "12px" }}>
              <div>
                <div style={{ fontSize: "11px", fontWeight: "700", color: "#11716c", fontFamily: "monospace" }}>
                  Order #{selectedOrderDetails.id}
                </div>
                <h3 style={{ fontSize: "14px", fontWeight: "800", color: "#fff", textTransform: "uppercase", margin: "2px 0 0" }}>
                  {selectedOrderDetails.customer}
                </h3>
              </div>
              <button onClick={() => setSelectedOrderDetails(null)} style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer" }}>
                <X style={{ width: "18px", height: "18px" }} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "12px" }}>
              <div style={{ padding: "12px", backgroundColor: "#141b24", borderRadius: "8px" }}>
                <div className="admin-form-label">Shipping Destination</div>
                <div style={{ color: "#fff", marginTop: "2px" }}>{selectedOrderDetails.address}</div>
                <div style={{ color: "#64748b", fontSize: "11px" }}>{selectedOrderDetails.email}</div>
              </div>

              <div>
                <div className="admin-form-label" style={{ marginBottom: "6px" }}>Purchased Items</div>
                {selectedOrderDetails.items.map((item, idx) => (
                  <div key={idx} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #1e2633" }}>
                    <div>
                      <div style={{ color: "#fff", fontWeight: "700" }}>{item.name}</div>
                      <div style={{ color: "#64748b", fontSize: "10px" }}>Size: {item.size} &bull; Qty: {item.qty}</div>
                    </div>
                    <div style={{ color: "#fff", fontWeight: "700" }}>{formatPrice(item.price * item.qty)}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "8px", fontWeight: "800" }}>
                <span>Order Total:</span>
                <span style={{ color: "#34d399" }}>{formatPrice(selectedOrderDetails.total)}</span>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "12px", borderTop: "1px solid #1e2633" }}>
              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="admin-outline-btn"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== CREATE COUPON MODAL ==================== */}
      {isAddCouponOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-box">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #1e2633", paddingBottom: "12px" }}>
              <h3 style={{ fontSize: "14px", fontWeight: "800", textTransform: "uppercase", color: "#fff", margin: 0 }}>Create Promo Coupon</h3>
              <button onClick={() => setIsAddCouponOpen(false)} style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer" }}>
                <X style={{ width: "18px", height: "18px" }} />
              </button>
            </div>

            <form onSubmit={handleCreateCoupon} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div className="admin-form-group">
                <label className="admin-form-label">Coupon Code</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. FLASH30"
                  value={newCoupon.code}
                  onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
                  className="admin-form-input"
                  style={{ textTransform: "uppercase", fontFamily: "monospace", fontWeight: "700" }}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Discount (%)</label>
                <input
                  type="number"
                  required
                  min="1"
                  max="90"
                  value={newCoupon.discount}
                  onChange={(e) => setNewCoupon({ ...newCoupon, discount: e.target.value })}
                  className="admin-form-input"
                />
              </div>

              <div style={{ display: "flex", gap: "10px", paddingTop: "12px", borderTop: "1px solid #1e2633" }}>
                <button
                  type="button"
                  onClick={() => setIsAddCouponOpen(false)}
                  className="admin-outline-btn"
                  style={{ flex: 1, justifyContent: "center" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="admin-pill-btn"
                  style={{ flex: 1, justifyContent: "center" }}
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Alert */}
      {bannerSavedToast && (
        <div className="admin-floating-toast">
          <Check style={{ width: "16px", height: "16px" }} />
          <span>Campaign Banner updated and published live!</span>
        </div>
      )}

      {categorySavedToast && (
        <div className="admin-floating-toast">
          <Check style={{ width: "16px", height: "16px" }} />
          <span>Category Tiles updated and published live!</span>
        </div>
      )}

      {sizeGuideSavedToast && (
        <div className="admin-floating-toast">
          <Check style={{ width: "16px", height: "16px" }} />
          <span>Size Guide updated and published live!</span>
        </div>
      )}

      {heroSavedToast && (
        <div className="admin-floating-toast">
          <Check style={{ width: "16px", height: "16px" }} />
          <span>Hero Video Banner updated and published live!</span>
        </div>
      )}

      {navSavedToast && (
        <div className="admin-floating-toast">
          <Check style={{ width: "16px", height: "16px" }} />
          <span>Navigation Menu updated and published live!</span>
        </div>
      )}

    </div>
  );
}
