/**
 * Image optimization utilities for responsive images
 */

export interface ResponsiveImageSizes {
  mobile: number;
  tablet: number;
  desktop: number;
  large?: number;
}

const DEFAULT_SIZES: ResponsiveImageSizes = {
  mobile: 480,
  tablet: 768,
  desktop: 1200,
  large: 1920,
};

/**
 * Generate srcset string for responsive images
 */
export function generateSrcSet(
  basePath: string,
  sizes: ResponsiveImageSizes = DEFAULT_SIZES
): string {
  const entries: string[] = [];
  
  if (sizes.mobile) {
    entries.push(`${basePath}-${sizes.mobile}w.jpg ${sizes.mobile}w`);
  }
  if (sizes.tablet) {
    entries.push(`${basePath}-${sizes.tablet}w.jpg ${sizes.tablet}w`);
  }
  if (sizes.desktop) {
    entries.push(`${basePath}-${sizes.desktop}w.jpg ${sizes.desktop}w`);
  }
  if (sizes.large) {
    entries.push(`${basePath}-${sizes.large}w.jpg ${sizes.large}w`);
  }
  
  return entries.join(", ");
}

/**
 * Generate sizes attribute for responsive images
 */
export function generateSizesAttr(breakpoints?: {
  mobile?: string;
  tablet?: string;
  desktop?: string;
}): string {
  const defaults = {
    mobile: "100vw",
    tablet: "768px",
    desktop: "1200px",
  };
  
  const sizes = { ...defaults, ...breakpoints };
  
  return `(max-width: 768px) ${sizes.mobile}, (max-width: 1024px) ${sizes.tablet}, ${sizes.desktop}`;
}

/**
 * Convert image format to WebP if supported
 */
export function getWebPSource(src: string): string {
  return src.replace(/\.(jpg|jpeg|png)$/i, ".webp");
}

/**
 * Check if browser supports WebP
 */
export function supportsWebP(): Promise<boolean> {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = () => resolve(webP.width === 1);
    webP.onerror = () => resolve(false);
    webP.src = "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=";
  });
}

/**
 * Lazy load image with IntersectionObserver
 */
export function lazyLoadImage(img: HTMLImageElement, src: string) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          img.src = src;
          img.classList.add("loaded");
          observer.unobserve(img);
        }
      });
    },
    {
      rootMargin: "50px 0px", // Start loading 50px before visible
      threshold: 0.01,
    }
  );

  observer.observe(img);
  
  return () => observer.unobserve(img);
}

/**
 * Generate optimized image alt text for SEO
 */
export function generateAltText(
  productName: string,
  context?: string
): string {
  if (context) {
    return `${productName} - ${context}`;
  }
  return productName;
}

/**
 * Get optimal image quality based on network speed
 */
export function getOptimalQuality(): number {
  const nav = navigator as Navigator & {
    connection?: { effectiveType?: string };
    mozConnection?: { effectiveType?: string };
    webkitConnection?: { effectiveType?: string };
  };
  const connection = nav.connection || nav.mozConnection || nav.webkitConnection;
  
  if (!connection) return 85; // Default quality
  
  const effectiveType = connection.effectiveType;
  
  switch (effectiveType) {
    case "slow-2g":
    case "2g":
      return 60; // Low quality for slow connections
    case "3g":
      return 75; // Medium quality
    case "4g":
    default:
      return 85; // High quality for fast connections
  }
}
