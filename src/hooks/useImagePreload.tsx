// Lightweight global cache
const loadedUrls = new Set<string>();

const preloadImage = (url: string): void => {
  if (loadedUrls.has(url)) return;
  loadedUrls.add(url);
  const img = new Image();
  img.src = url;
};

export const useImagePreload = (_imageUrls: string[]) => {
  // Always ready — no blocking. Images load via native lazy/eager.
  return true;
};

export const isImageCached = (url: string) => loadedUrls.has(url);

export const preloadRouteImages = (urls: string[]) => {
  urls.forEach(preloadImage);
};

export const preloadCriticalImages = (urls: string[]) => {
  urls.forEach((url) => {
    if (loadedUrls.has(url)) return;
    loadedUrls.add(url);
    const img = new Image();
    img.fetchPriority = "high";
    img.src = url;
  });
};
