export const NAV_LINKS = [
  { label: "HOME", href: "/" },
  { label: "NEW ARRIVAL", href: "/shop?collection=new-arrivals" },
  { label: "BEST SELLER", href: "/shop?collection=best-sellers" },
  {
    label: "TOP WEAR",
    href: "/shop?category=top-wear",
    children: [
      { label: "ALL TOP WEAR", href: "/shop?category=top-wear" },
      { label: "T-SHIRTS", href: "/shop?category=t-shirts" },
      { label: "WAFFLE COLLECTION", href: "/shop?collection=waffle-collection" },
      { label: "HOODIES & SWEATSHIRTS", href: "/shop?category=hoodies-jackets" },
      { label: "SHIRTS & JACKETS", href: "/shop?category=jackets" }
    ]
  },
  {
    label: "BOTTOMS",
    href: "/shop?category=bottoms",
    children: [
      { label: "ALL BOTTOMS", href: "/shop?category=bottoms" },
      { label: "SWEATPANTS", href: "/shop?category=bottoms" },
      { label: "CARGOS & DENIMS", href: "/shop?category=bottoms" }
    ]
  },
  { label: "WINTER COLLECTION", href: "/shop?collection=winter-collection" },
  { label: "THE ₹1499 COLLECTION", href: "/shop?maxPrice=1500" },
  { label: "CONTACT US", href: "/contact" }
];

export const CATEGORIES = [
  { id: "all", name: "All Products", count: 9 },
  { id: "new-arrivals", name: "New Arrivals", count: 5 },
  { id: "best-sellers", name: "Best Sellers", count: 4 },
  { id: "winter-collection", name: "Winter Collection", count: 3 },
  { id: "waffle-collection", name: "Waffle Collection", count: 3 },
  { id: "t-shirts", name: "T-Shirts", count: 3 },
  { id: "hoodies-jackets", name: "Hoodies & Jackets", count: 2 },
  { id: "bottoms", name: "Bottoms & Sweatpants", count: 2 }
];

export const COLLECTIONS = [
  {
    id: "new-arrivals",
    title: "New Arrivals",
    subtitle: "Winter & Streetwear Drop '26",
    description: "Explore the newest seasonal silhouettes, heavy-weight outer layers, textured waffle knits, and relaxed-fit essentials.",
    heroImage: "/products/sku-09/image_1.jpg",
    bannerVideo: "/videos/campaign_winter_1.mp4"
  },
  {
    id: "best-sellers",
    title: "Best Sellers",
    subtitle: "Most Loved Streetwear Essentials",
    description: "Our signature silhouettes and crowd favorites, crafted with premium 240+ GSM cotton and authentic garment washes.",
    heroImage: "/products/sku-01/image_1.jpg",
    bannerVideo: "/videos/campaign_winter_2.mp4"
  },
  {
    id: "winter-collection",
    title: "Winter Collection",
    subtitle: "Heavyweight Layering & Structured Outerwear",
    description: "Tailored for cooler temperatures featuring premium 320 GSM fleece, clasp-fastened boxy hoodies, and signature crimson statement jackets.",
    heroImage: "/products/sku-03/image_1.jpg",
    bannerVideo: "/videos/campaign_winter_3.mp4"
  },
  {
    id: "waffle-collection",
    title: "Waffle Collection",
    subtitle: "Signature 240 GSM Waffle Texture",
    description: "Breathable textured cotton waffle weaves with acid-washed finishes, dropped shoulders, and subtle ribbed trims.",
    heroImage: "/products/sku-02/image_1.jpg",
    bannerVideo: "/videos/promo_reel_1.mp4"
  }
];

export const PRODUCTS = [
  {
    id: "sku-01",
    slug: "noir-heavyweight-drop-shoulder-tee",
    name: "Noir Heavyweight Drop-Shoulder Tee",
    subtitle: "260 GSM Combed Cotton • Deep Black Wash",
    price: 1499,
    originalPrice: 1999,
    category: "t-shirts",
    collections: ["new-arrivals", "best-sellers"],
    isNew: true,
    isBestseller: true,
    isWinter: false,
    isWaffle: false,
    tag: "BEST SELLER",
    stock: 14,
    rating: 4.9,
    reviewsCount: 46,
    primaryImage: "/products/sku-01/image_1.jpg",
    hoverImage: "/products/sku-01/image_2.jpg",
    video: "/videos/promo_reel_1.mp4",
    gallery: [
      "/products/sku-01/image_1.jpg",
      "/products/sku-01/image_2.jpg",
      "/products/sku-01/image_3.jpg",
      "/products/sku-01/image_4.jpg",
      "/products/sku-01/image_5.jpg",
      "/products/sku-01/image_6.jpg",
      "/products/sku-01/image_7.jpg",
      "/products/sku-01/image_8.jpg",
      "/products/sku-01/image_9.jpg"
    ],
    description: "Cut with a contemporary dropped shoulder and relaxed boxy chest, this heavy-weight tee is crafted from 260 GSM 100% combed cotton. Features twin-needle reinforced hems and a ribbed crewneck collar that maintains shape over repeated wears.",
    fabric: "100% Premium Combed Cotton (260 GSM)",
    fit: "Relaxed Boxy Fit with Dropped Shoulder. Model is 6'0\" (183cm) wearing Size Large.",
    care: "Machine wash cold with similar colors inside out. Tumble dry low or hang dry in shade.",
    colors: [
      { name: "Deep Noir", hex: "#121216" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: "sku-02",
    slug: "espresso-washed-waffle-henley",
    name: "Espresso Washed Waffle Henley",
    subtitle: "240 GSM Waffle Weave • Vintage Mineral Wash",
    price: 1799,
    originalPrice: 2299,
    category: "waffle-collection",
    collections: ["new-arrivals", "waffle-collection", "best-sellers"],
    isNew: true,
    isBestseller: true,
    isWinter: true,
    isWaffle: true,
    tag: "WAFFLE ARCHIVE",
    stock: 11,
    rating: 4.88,
    reviewsCount: 38,
    primaryImage: "/products/sku-02/image_1.jpg",
    hoverImage: "/products/sku-02/image_2.jpg",
    video: "/videos/campaign_winter_2.mp4",
    gallery: [
      "/products/sku-02/image_1.jpg",
      "/products/sku-02/image_2.jpg",
      "/products/sku-02/image_3.jpg",
      "/products/sku-02/image_4.jpg",
      "/products/sku-02/image_5.jpg",
      "/products/sku-02/image_6.jpg",
      "/products/sku-02/image_7.jpg",
      "/products/sku-02/image_8.jpg"
    ],
    description: "Our signature waffle knit henley shirt rendered in a rich espresso tone with a custom enzyme mineral wash. Featuring a 3-button placket with tonal matte buttons, ribbed wrist cuffs, and breathable thermal warmth.",
    fabric: "100% Breathable Cotton Waffle (240 GSM)",
    fit: "Oversized Streetwear Silhouette with Ribbed Trims. Model is 6'1\" (185cm) wearing Size Large.",
    care: "Gentle machine wash cold. Do not bleach. Dry flat to preserve waffle texture.",
    colors: [
      { name: "Espresso Brown", hex: "#3C201C" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: "sku-03",
    slug: "burgundy-clasp-boxy-hoodie",
    name: "Burgundy Clasp Boxy Hoodie",
    subtitle: "340 GSM Heavyweight Fleece • Custom Metal Clasp",
    price: 2999,
    originalPrice: 3999,
    category: "hoodies-jackets",
    collections: ["new-arrivals", "winter-collection", "best-sellers"],
    isNew: true,
    isBestseller: true,
    isWinter: true,
    isWaffle: false,
    tag: "WINTER '26",
    stock: 8,
    rating: 4.95,
    reviewsCount: 52,
    primaryImage: "/products/sku-03/image_1.jpg",
    hoverImage: "/products/sku-03/image_2.jpg",
    video: "/videos/campaign_winter_1.mp4",
    gallery: [
      "/products/sku-03/image_1.jpg",
      "/products/sku-03/image_2.jpg",
      "/products/sku-03/image_3.jpg",
      "/products/sku-03/image_4.jpg",
      "/products/sku-03/image_5.jpg",
      "/products/sku-03/image_6.jpg",
      "/products/sku-03/image_7.jpg",
      "/products/sku-03/image_8.jpg"
    ],
    description: "Engineered for winter warmth and striking streetwear visual aesthetics. Made from ultra-dense 340 GSM brushed fleece with a double-layered hood, kangaroo pouch pocket, and an architectural silver metal front clasp closure.",
    fabric: "80% Heavy Cotton Fleece, 20% Polyester (340 GSM)",
    fit: "Structured Boxy Fit with Wide Shoulders and Dropped Sleeves. True to size for oversized look.",
    care: "Machine wash cold inside out with like colors. Do not iron directly on metal hardware.",
    colors: [
      { name: "Burgundy Wine", hex: "#6C2C32" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: "sku-04",
    slug: "washed-slate-heavyweight-tee",
    name: "Washed Slate Heavyweight Tee",
    subtitle: "260 GSM Slub Cotton • Vintage Acid Wash",
    price: 1499,
    originalPrice: 1999,
    category: "t-shirts",
    collections: ["new-arrivals", "best-sellers"],
    isNew: true,
    isBestseller: true,
    isWinter: false,
    isWaffle: false,
    tag: "HOT SELLER",
    stock: 19,
    rating: 4.87,
    reviewsCount: 31,
    primaryImage: "/products/sku-04/image_1.jpg",
    hoverImage: "/products/sku-04/image_2.jpg",
    video: "/videos/promo_reel_2.mp4",
    gallery: [
      "/products/sku-04/image_1.jpg",
      "/products/sku-04/image_2.jpg",
      "/products/sku-04/image_3.jpg",
      "/products/sku-04/image_4.jpg",
      "/products/sku-04/image_5.jpg",
      "/products/sku-04/image_6.jpg",
      "/products/sku-04/image_7.jpg"
    ],
    description: "An understated streetwear essential featuring an artisanal washed slate tone. Finished with a subtle vintage wash that softens each fiber while retaining substantial drape and silhouette.",
    fabric: "100% Pre-Shrunk Ringspun Cotton (260 GSM)",
    fit: "Relaxed Everyday Oversized Fit. Model is 5'11\" (180cm) wearing Size Medium.",
    care: "Wash cold, hang dry. Color softens beautifully with wear.",
    colors: [
      { name: "Washed Slate", hex: "#5C5C60" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: "sku-05",
    slug: "midnight-navy-relaxed-cargo",
    name: "Midnight Navy Relaxed Cargo",
    subtitle: "Heavyweight Cotton Twill • 6-Pocket Tactical Design",
    price: 2499,
    originalPrice: 3199,
    category: "bottoms",
    collections: ["new-arrivals", "winter-collection"],
    isNew: true,
    isBestseller: false,
    isWinter: true,
    isWaffle: false,
    tag: "NEW DROP",
    stock: 12,
    rating: 4.82,
    reviewsCount: 24,
    primaryImage: "/products/sku-05/image_1.jpg",
    hoverImage: "/products/sku-05/image_2.jpg",
    video: "/videos/campaign_winter_4.mp4",
    gallery: [
      "/products/sku-05/image_1.jpg",
      "/products/sku-05/image_2.jpg",
      "/products/sku-05/image_3.jpg",
      "/products/sku-05/image_4.jpg",
      "/products/sku-05/image_5.jpg",
      "/products/sku-05/image_6.jpg",
      "/products/sku-05/image_7.jpg",
      "/products/sku-05/image_8.jpg",
      "/products/sku-05/image_9.jpg"
    ],
    description: "Constructed with durable high-density cotton twill, these midnight navy cargo trousers boast gusseted bellows pockets, elasticized drawstring waistband, and adjustable toggle ankles for versatile styling.",
    fabric: "100% Heavy Duty Cotton Twill",
    fit: "Relaxed Wide Leg with Adjustable Ankle Cuffs.",
    care: "Machine wash cold with similar colors. Line dry recommended.",
    colors: [
      { name: "Midnight Navy", hex: "#2E3645" }
    ],
    sizes: ["30", "32", "34", "36", "38"]
  },
  {
    id: "sku-06",
    slug: "vintage-bone-waffle-long-sleeve",
    name: "Vintage Bone Waffle Long Sleeve",
    subtitle: "240 GSM Textured Waffle • Subtle Ice Lilac Undertone",
    price: 1899,
    originalPrice: 2499,
    category: "waffle-collection",
    collections: ["waffle-collection", "winter-collection"],
    isNew: false,
    isBestseller: true,
    isWinter: true,
    isWaffle: true,
    tag: "WAFFLE CLASSIC",
    stock: 15,
    rating: 4.91,
    reviewsCount: 39,
    primaryImage: "/products/sku-06/image_1.jpg",
    hoverImage: "/products/sku-06/image_2.jpg",
    video: "/videos/campaign_winter_3.mp4",
    gallery: [
      "/products/sku-06/image_1.jpg",
      "/products/sku-06/image_2.jpg",
      "/products/sku-06/image_3.jpg",
      "/products/sku-06/image_4.jpg",
      "/products/sku-06/image_5.jpg",
      "/products/sku-06/image_6.jpg",
      "/products/sku-06/image_7.jpg",
      "/products/sku-06/image_8.jpg",
      "/products/sku-06/image_9.jpg"
    ],
    description: "Soft to the touch and thermal insulating, our vintage bone waffle long sleeve delivers lightweight breathability and comfort. An ideal layering piece under outerwear or worn standalone.",
    fabric: "100% Ringspun Cotton Waffle (240 GSM)",
    fit: "Relaxed Long-Sleeve Silhouette with Ribbed Neckline and Cuffs.",
    care: "Gentle machine wash cold. Do not tumble dry hot.",
    colors: [
      { name: "Vintage Bone", hex: "#E1DEF1" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: "sku-07",
    slug: "chalk-white-oversized-graphic-tee",
    name: "Chalk White Oversized Graphic Tee",
    subtitle: "240 GSM Pure Cotton • High-Density Screenprint",
    price: 1399,
    originalPrice: 1899,
    category: "t-shirts",
    collections: ["new-arrivals", "best-sellers"],
    isNew: true,
    isBestseller: true,
    isWinter: false,
    isWaffle: false,
    tag: "POPULAR",
    stock: 22,
    rating: 4.86,
    reviewsCount: 41,
    primaryImage: "/products/sku-07/image_1.jpg",
    hoverImage: "/products/sku-07/image_2.jpg",
    video: "/videos/promo_reel_1.mp4",
    gallery: [
      "/products/sku-07/image_1.jpg",
      "/products/sku-07/image_2.jpg",
      "/products/sku-07/image_3.jpg",
      "/products/sku-07/image_4.jpg",
      "/products/sku-07/image_5.jpg",
      "/products/sku-07/image_6.jpg",
      "/products/sku-07/image_7.jpg"
    ],
    description: "Classic clean streetwear aesthetic rendered in chalk white. Features a crisp silhouette, ribbed collar band, and durable premium cotton that resists color yellowing.",
    fabric: "100% Premium Cotton (240 GSM)",
    fit: "Oversized Street Fit. Drop shoulder silhouette.",
    care: "Wash cold, hang dry. Turn inside out before washing.",
    colors: [
      { name: "Chalk White", hex: "#F3F2F7" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: "sku-08",
    slug: "shadow-black-baggy-sweatpants",
    name: "Shadow Black Baggy Sweatpants",
    subtitle: "320 GSM French Terry • Wide Cuffed Leg",
    price: 2299,
    originalPrice: 2899,
    category: "bottoms",
    collections: ["best-sellers", "winter-collection"],
    isNew: false,
    isBestseller: true,
    isWinter: true,
    isWaffle: false,
    tag: "COZY ESSENTIAL",
    stock: 16,
    rating: 4.93,
    reviewsCount: 57,
    primaryImage: "/products/sku-08/image_1.jpg",
    hoverImage: "/products/sku-08/image_2.jpg",
    video: "/videos/campaign_winter_5.mp4",
    gallery: [
      "/products/sku-08/image_1.jpg",
      "/products/sku-08/image_2.jpg",
      "/products/sku-08/image_3.jpg",
      "/products/sku-08/image_4.jpg",
      "/products/sku-08/image_5.jpg",
      "/products/sku-08/image_6.jpg",
      "/products/sku-08/image_7.jpg"
    ],
    description: "The ultimate relaxed sweatpant built from 320 GSM loopback French terry. Designed with deep side pockets, back patch pocket, thick cotton drawcord with metal aglets, and roomy stack over sneakers.",
    fabric: "100% French Terry Cotton (320 GSM)",
    fit: "Baggy Relaxed Fit with Stacking Ankle Cuffs.",
    care: "Machine wash cold with similar dark garments.",
    colors: [
      { name: "Shadow Black", hex: "#201E1E" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: "sku-09",
    slug: "vmind-signature-crimson-jacket",
    name: "V-MIND Signature Crimson Jacket",
    subtitle: "Heavyweight Washed Canvas • Satin Lining",
    price: 3499,
    originalPrice: 4499,
    category: "hoodies-jackets",
    collections: ["new-arrivals", "winter-collection"],
    isNew: true,
    isBestseller: false,
    isWinter: true,
    isWaffle: false,
    tag: "SIGNATURE DROP",
    stock: 7,
    rating: 4.98,
    reviewsCount: 27,
    primaryImage: "/products/sku-09/image_1.jpg",
    hoverImage: "/products/sku-09/image_2.jpg",
    video: "/videos/hero_reel.mp4",
    gallery: [
      "/products/sku-09/image_1.jpg",
      "/products/sku-09/image_2.jpg",
      "/products/sku-09/image_3.jpg",
      "/products/sku-09/image_4.jpg",
      "/products/sku-09/image_5.jpg",
      "/products/sku-09/image_6.jpg",
      "/products/sku-09/image_7.jpg"
    ],
    description: "Our hero winter jacket crafted in the signature V-MIND crimson shade. Built with rugged heavyweight washed cotton canvas, antique silver heavy-gauge zipper, quilted inner thermal lining, and dual side welt pockets.",
    fabric: "100% Heavy Washed Cotton Canvas with Diamond Quilted Lining",
    fit: "Boxy Cropped Silhouette with Dropped Shoulders. True to size.",
    care: "Specialist clean or dry clean recommended. Spot clean with damp cloth.",
    colors: [
      { name: "V-MIND Crimson", hex: "#87171F" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"]
  }
];

export const PROMOTIONS = {
  freeShippingThreshold: 0, // Free pan-India on prepaid orders
  defaultDiscountCode: "VMIND10",
  defaultDiscountPercent: 10,
  bannerAnnouncements: [
    "FREE SHIPPING PAN-INDIA ON ALL PREPAID ORDERS",
    "GET 10% OFF ON YOUR FIRST ORDER - USE CODE: VMIND10",
    "EASY 4 DAYS EXCHANGE AVAILABLE"
  ]
};
