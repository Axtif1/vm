/**
 * Centralized Media Asset & Video CDN Configuration
 * 
 * Supports seamless integration with Cloudinary or external CDNs.
 * When NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME or NEXT_PUBLIC_MEDIA_URL is provided,
 * video paths are dynamically resolved to the remote CDN.
 * Otherwise, falls back gracefully to local paths and high-res poster images.
 */

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "";
const CUSTOM_MEDIA_CDN = process.env.NEXT_PUBLIC_MEDIA_URL || "";

/**
 * Resolves a video asset path to either a CDN URL (if configured) or local path.
 * 
 * @param {string} localPath - The local relative path (e.g. "/videos/hero_reel.mp4")
 * @returns {string} - The fully resolved URL or local fallback path
 */
export function getVideoUrl(localPath) {
  if (!localPath) return "";
  
  // If already an absolute URL (e.g. https://...), return directly
  if (localPath.startsWith("http://") || localPath.startsWith("https://")) {
    return localPath;
  }

  // Normalize path without leading slash
  const cleanPath = localPath.startsWith("/") ? localPath.slice(1) : localPath;

  // 1. If custom media CDN URL is provided (e.g. https://res.cloudinary.com/my-cloud/video/upload/)
  if (CUSTOM_MEDIA_CDN) {
    const base = CUSTOM_MEDIA_CDN.endsWith("/") ? CUSTOM_MEDIA_CDN : `${CUSTOM_MEDIA_CDN}/`;
    return `${base}${cleanPath}`;
  }

  // 2. If Cloudinary Cloud Name is provided
  if (CLOUDINARY_CLOUD_NAME) {
    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/vmind/${cleanPath}`;
  }

  // 3. Default fallback to local public path
  return localPath;
}

/**
 * Maps known video identifiers to their corresponding campaign and poster assets.
 */
export const VIDEO_MANIFEST = {
  hero_reel: {
    filename: "hero_reel.mp4",
    localPath: "/videos/hero_reel.mp4",
    poster: "/products/sku-09/image_1.jpg",
    title: "V-MIND FASHION Hero Campaign"
  },
  campaign_winter_1: {
    filename: "campaign_winter_1.mp4",
    localPath: "/videos/campaign_winter_1.mp4",
    poster: "/products/sku-03/image_1.jpg",
    title: "Winter Collection '26 Showcase"
  },
  campaign_winter_2: {
    filename: "campaign_winter_2.mp4",
    localPath: "/videos/campaign_winter_2.mp4",
    poster: "/products/sku-02/image_1.jpg",
    title: "Waffle Texture Details"
  },
  campaign_winter_3: {
    filename: "campaign_winter_3.mp4",
    localPath: "/videos/campaign_winter_3.mp4",
    poster: "/products/sku-03/image_1.jpg",
    title: "Winter Fleece Movement"
  },
  campaign_winter_4: {
    filename: "campaign_winter_4.mp4",
    localPath: "/videos/campaign_winter_4.mp4",
    poster: "/products/sku-05/image_1.jpg",
    title: "Tactical Cargo Stack"
  },
  campaign_winter_5: {
    filename: "campaign_winter_5.mp4",
    localPath: "/videos/campaign_winter_5.mp4",
    poster: "/products/sku-08/image_1.jpg",
    title: "Utility Hardware Lookbook"
  },
  promo_reel_1: {
    filename: "promo_reel_1.mp4",
    localPath: "/videos/promo_reel_1.mp4",
    poster: "/products/sku-01/image_1.jpg",
    title: "Street Silhouette '26"
  },
  promo_reel_2: {
    filename: "promo_reel_2.mp4",
    localPath: "/videos/promo_reel_2.mp4",
    poster: "/products/sku-04/image_1.jpg",
    title: "Washed Slate Lookbook"
  }
};
