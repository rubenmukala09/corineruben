import { useState, useEffect } from "react";

// Lightweight URL tracker
const loadedHeroUrls = new Set<string>();

/**
 * Simple non-blocking preload
 */
export const preloadHeroImage = (src: string): void => {
  if (loadedHeroUrls.has(src)) return;
  loadedHeroUrls.add(src);
  const img = new Image();
  img.src = src;
};

/**
 * Preload multiple images
 */
export const preloadHeroImages = (images: string[]): void => {
  images.forEach(preloadHeroImage);
};

/**
 * Check if cached
 */
export const isHeroImageCached = (src: string): boolean => loadedHeroUrls.has(src);

/**
 * Hook for hero image preloading
 */
export const useHeroImagePreload = (imageSources: string[]) => {
  const [isLoaded, setIsLoaded] = useState(() => 
    imageSources.length === 0 || imageSources.every(s => loadedHeroUrls.has(s))
  );

  useEffect(() => {
    if (isLoaded || imageSources.length === 0) return;
    
    const first = imageSources[0];
    if (loadedHeroUrls.has(first)) {
      setIsLoaded(true);
      imageSources.slice(1).forEach(preloadHeroImage);
      return;
    }
    
    const img = new Image();
    img.onload = () => {
      loadedHeroUrls.add(first);
      setIsLoaded(true);
      imageSources.slice(1).forEach(preloadHeroImage);
    };
    img.onerror = () => setIsLoaded(true);
    img.src = first;
  }, [imageSources.join(','), isLoaded]);

  return { isLoaded, progress: isLoaded ? 100 : 0 };
};

/**
 * Preload page hero images
 */
export const preloadPageHeroImages = (pagePath: string) => {
  // No-op - images load on demand now
};
