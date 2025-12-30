import { useEffect, useState, useRef } from 'react';

// Global image cache to persist across page navigations
const imageCache = new Map<string, HTMLImageElement>();
const preloadQueue: string[] = [];
let isPreloading = false;

// Process preload queue with controlled concurrency
const processPreloadQueue = async () => {
  if (isPreloading || preloadQueue.length === 0) return;
  isPreloading = true;
  
  const batchSize = 3; // Load 3 images concurrently
  
  while (preloadQueue.length > 0) {
    const batch = preloadQueue.splice(0, batchSize);
    await Promise.all(batch.map(url => loadImageWithTimeout(url, 5000)));
  }
  
  isPreloading = false;
};

// Load single image with timeout
const loadImageWithTimeout = (url: string, timeout: number): Promise<void> => {
  return new Promise((resolve) => {
    if (imageCache.has(url)) {
      resolve();
      return;
    }
    
    const img = new Image();
    const timer = setTimeout(() => {
      imageCache.set(url, img);
      resolve();
    }, timeout);
    
    img.onload = () => {
      clearTimeout(timer);
      imageCache.set(url, img);
      resolve();
    };
    img.onerror = () => {
      clearTimeout(timer);
      imageCache.set(url, img);
      resolve();
    };
    
    img.fetchPriority = 'high';
    img.decoding = 'async';
    img.src = url;
  });
};

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

    const preloadImages = async () => {
      try {
        // Load first image immediately with high priority
        if (imageUrls.length > 0 && !imageCache.has(imageUrls[0])) {
          await loadImageWithTimeout(imageUrls[0], 3000);
        }
        
        if (!isCancelled) {
          setImagesPreloaded(true);
        }
        
        // Queue remaining images for background loading
        imageUrls.slice(1).forEach(url => {
          if (!imageCache.has(url) && !preloadQueue.includes(url)) {
            preloadQueue.push(url);
          }
        });
        
        // Start processing queue
        processPreloadQueue();
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

// Check if image is cached
export const isImageCached = (url: string) => imageCache.has(url);

// Preload images for route ahead of time (for prefetch links)
export const preloadRouteImages = (imageUrls: string[]) => {
  imageUrls.forEach(url => {
    if (!imageCache.has(url) && !preloadQueue.includes(url)) {
      preloadQueue.push(url);
    }
  });
  processPreloadQueue();
};

// Immediately preload critical images (blocking)
export const preloadCriticalImages = async (urls: string[]) => {
  await Promise.all(urls.map(url => loadImageWithTimeout(url, 5000)));
};
