import { useState, useEffect, useCallback } from "react";

// Global cache for hero images - persists across components
const heroImageCache = new Map<string, HTMLImageElement>();
const loadingPromises = new Map<string, Promise<void>>();

/**
 * Aggressively preload images with high priority
 */
export const preloadHeroImage = (src: string, priority: 'high' | 'low' = 'high'): Promise<void> => {
  if (heroImageCache.has(src)) {
    return Promise.resolve();
  }
  
  if (loadingPromises.has(src)) {
    return loadingPromises.get(src)!;
  }
  
  const promise = new Promise<void>((resolve) => {
    const img = new Image();
    img.onload = () => {
      heroImageCache.set(src, img);
      loadingPromises.delete(src);
      resolve();
    };
    img.onerror = () => {
      loadingPromises.delete(src);
      resolve(); // Resolve even on error to not block
    };
    
    // Set high priority loading
    if (priority === 'high') {
      img.fetchPriority = 'high';
      img.loading = 'eager';
    }
    img.decoding = 'async';
    img.src = src;
  });
  
  loadingPromises.set(src, promise);
  return promise;
};

/**
 * Preload multiple hero images in parallel with priority ordering
 */
export const preloadHeroImages = async (images: string[]): Promise<void> => {
  if (images.length === 0) return;
  
  // First image gets high priority, rest get low
  const [first, ...rest] = images;
  
  // Start loading first image with high priority
  await preloadHeroImage(first, 'high');
  
  // Load rest in parallel with low priority
  await Promise.all(rest.map(src => preloadHeroImage(src, 'low')));
};

/**
 * Check if image is already cached
 */
export const isHeroImageCached = (src: string): boolean => {
  return heroImageCache.has(src);
};

/**
 * Hook to preload hero images and track loading state
 */
export const useHeroImagePreload = (imageSources: string[]) => {
  const [isLoaded, setIsLoaded] = useState(() => {
    // Check if all images are already cached
    return imageSources.every(src => heroImageCache.has(src));
  });
  const [progress, setProgress] = useState(isLoaded ? 100 : 0);
  
  useEffect(() => {
    if (imageSources.length === 0) {
      setIsLoaded(true);
      setProgress(100);
      return;
    }
    
    // If already loaded, skip
    if (imageSources.every(src => heroImageCache.has(src))) {
      setIsLoaded(true);
      setProgress(100);
      return;
    }
    
    let mounted = true;
    let loadedCount = imageSources.filter(src => heroImageCache.has(src)).length;
    
    const loadImages = async () => {
      const [first, ...rest] = imageSources;
      
      // Load first image with high priority
      if (!heroImageCache.has(first)) {
        await preloadHeroImage(first, 'high');
        if (!mounted) return;
        loadedCount++;
        setProgress(Math.round((loadedCount / imageSources.length) * 100));
      }
      
      // After first image loads, we can show content
      if (mounted) {
        setIsLoaded(true);
      }
      
      // Continue loading rest in background
      for (const src of rest) {
        if (!heroImageCache.has(src)) {
          await preloadHeroImage(src, 'low');
          if (!mounted) return;
          loadedCount++;
          setProgress(Math.round((loadedCount / imageSources.length) * 100));
        }
      }
    };
    
    loadImages();
    
    return () => {
      mounted = false;
    };
  }, [imageSources.join(',')]);
  
  return { isLoaded, progress };
};

/**
 * Preload critical page images before navigation
 */
export const preloadPageHeroImages = (pagePath: string) => {
  // Map of page paths to their hero images
  const pageHeroImages: Record<string, string[]> = {
    '/': [],  // Homepage uses video
    '/about': [],
    '/resources': [],
    '/training': [],
    '/business': [],
    '/services': [],
    '/contact': [],
  };
  
  const images = pageHeroImages[pagePath];
  if (images && images.length > 0) {
    // Start preloading in background
    preloadHeroImages(images);
  }
};
