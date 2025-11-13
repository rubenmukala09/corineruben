import { useEffect, useState } from 'react';

export const useImagePreload = (imageUrls: string[]) => {
  const [imagesPreloaded, setImagesPreloaded] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const loadImage = (url: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => reject();
        img.src = url;
      });
    };

    const preloadImages = async () => {
      try {
        await Promise.all(imageUrls.map(url => loadImage(url)));
        if (!isCancelled) {
          setImagesPreloaded(true);
        }
      } catch (error) {
        console.warn('Some images failed to preload:', error);
        // Still set as preloaded to allow the page to render
        if (!isCancelled) {
          setImagesPreloaded(true);
        }
      }
    };

    preloadImages();

    return () => {
      isCancelled = true;
    };
  }, [imageUrls]);

  return imagesPreloaded;
};
