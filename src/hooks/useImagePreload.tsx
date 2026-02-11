import { useEffect, useState, useRef } from 'react';

// Lightweight global cache - just tracks loaded URLs
const loadedUrls = new Set<string>();

// Simple non-blocking preload
const preloadImage = (url: string): void => {
  if (loadedUrls.has(url)) return;
  loadedUrls.add(url);
  const img = new Image();
  img.src = url;
};

export const useImagePreload = (imageUrls: string[]) => {
  const [ready, setReady] = useState(() => imageUrls.every(u => loadedUrls.has(u)));

  useEffect(() => {
    if (ready || imageUrls.length === 0) return;
    
    // Load first image, mark ready immediately
    if (imageUrls[0] && !loadedUrls.has(imageUrls[0])) {
      const img = new Image();
      img.onload = () => {
        loadedUrls.add(imageUrls[0]);
        setReady(true);
      };
      img.onerror = () => setReady(true);
      img.src = imageUrls[0];
    } else {
      setReady(true);
    }
    
    // Queue rest in background
    imageUrls.slice(1).forEach(preloadImage);
  }, [imageUrls.join(','), ready]);

  return ready;
};

// Check if cached
export const isImageCached = (url: string) => loadedUrls.has(url);

// Background preload for route prefetching
export const preloadRouteImages = (urls: string[]) => {
  urls.forEach(preloadImage);
};

// Critical images (eager)
export const preloadCriticalImages = (urls: string[]) => {
  urls.forEach(url => {
    if (loadedUrls.has(url)) return;
    loadedUrls.add(url);
    const img = new Image();
    img.fetchPriority = 'high';
    img.src = url;
  });
};
