/**
 * Category Showcase Configuration
 * Default content for the "SHOP BY CATEGORY" section on the storefront homepage
 */

export const DEFAULT_CATEGORY_SECTION = {
  eyebrow: "CURATED CATALOG",
  title: "SHOP BY CATEGORY",
  isVisible: true,
  tiles: [
    {
      id: "cat-1",
      title: "TOP WEAR",
      subtitle: "Heavyweight Boxy Tees",
      image: "/products/sku-01/image_1.jpg",
      href: "/shop?category=t-shirts"
    },
    {
      id: "cat-2",
      title: "WAFFLE KNITS",
      subtitle: "240 GSM Signature Weave",
      image: "/products/sku-02/image_1.jpg",
      href: "/shop?collection=waffle-collection"
    },
    {
      id: "cat-3",
      title: "WINTER OUTERWEAR",
      subtitle: "Metal Clasp Hoodies & Fleece",
      image: "/products/sku-03/image_1.jpg",
      href: "/shop?collection=winter-collection"
    },
    {
      id: "cat-4",
      title: "BOTTOMS & PANTS",
      subtitle: "Baggy Washed Sweatpants",
      image: "/products/sku-05/image_1.jpg",
      href: "/shop?category=bottoms"
    }
  ]
};
