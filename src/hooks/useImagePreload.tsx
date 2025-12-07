import { useEffect, useState, useRef } from 'react';

// Global image cache to persist across page navigations
const imageCache = new Map<string, HTMLImageElement>();

export const useImagePreload = (imageUrls: string[]) => {
  const [imagesPreloaded, setImagesPreloaded] = useState(() => {
    // Check if all images are already cached
    return imageUrls.every(url => imageCache.has(url));
  });
  const loadingRef = useRef(false);

  useEffect(() => {
    // Already preloaded from cache
    if (imagesPreloaded || loadingRef.current) return;
    
    loadingRef.current = true;
    let isCancelled = false;

    const loadImage = (url: string): Promise<void> => {
      return new Promise((resolve) => {
        // Check cache first
        if (imageCache.has(url)) {
          resolve();
          return;
        }
        
        const img = new Image();
        img.onload = () => {
          imageCache.set(url, img);
          resolve();
        };
        img.onerror = () => {
          // Still cache failed images to prevent retry loops
          imageCache.set(url, img);
          resolve();
        };
        // Set high priority for faster loading
        img.fetchPriority = 'high';
        img.decoding = 'async';
        img.src = url;
      });
    };

    // Load first image immediately, others in parallel
    const preloadImages = async () => {
      try {
        // Prioritize first image for immediate display
        if (imageUrls.length > 0) {
          await loadImage(imageUrls[0]);
          if (!isCancelled) {
            setImagesPreloaded(true);
          }
        }
        
        // Load remaining images in background
        if (imageUrls.length > 1) {
          Promise.all(imageUrls.slice(1).map(url => loadImage(url)));
        }
      } catch (error) {
        console.warn('Image preload error:', error);
        if (!isCancelled) {
          setImagesPreloaded(true);
        }
      }
    };

    preloadImages();

    return () => {
      isCancelled = true;
    };
  }, [imageUrls, imagesPreloaded]);

  return imagesPreloaded;
};

// Preload images for route ahead of time (for prefetch links)
export const preloadRouteImages = (imageUrls: string[]) => {
  imageUrls.forEach(url => {
    if (!imageCache.has(url)) {
      const img = new Image();
      img.onload = () => imageCache.set(url, img);
      img.onerror = () => imageCache.set(url, img);
      img.fetchPriority = 'low';
      img.src = url;
    }
  });
};
