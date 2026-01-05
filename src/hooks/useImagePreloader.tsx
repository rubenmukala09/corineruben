import { useState, useEffect, useCallback, useRef } from 'react';

interface ImagePreloaderOptions {
  priority?: 'high' | 'low' | 'auto';
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

interface PreloadResult {
  isLoaded: boolean;
  isError: boolean;
  progress: number;
}

/**
 * Preloads a single image and returns loading state
 */
export const useImagePreloader = (
  src: string | undefined,
  options: ImagePreloaderOptions = {}
): PreloadResult & { imgRef: React.RefObject<HTMLImageElement> } => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!src) return;

    // Check if image is already cached
    const img = new Image();
    
    const handleLoad = () => {
      setIsLoaded(true);
      setIsError(false);
      options.onLoad?.();
    };

    const handleError = () => {
      setIsError(true);
      setIsLoaded(false);
      options.onError?.(new Error(`Failed to load image: ${src}`));
    };

    img.onload = handleLoad;
    img.onerror = handleError;
    
    // Set priority hint if supported
    if (options.priority === 'high') {
      img.fetchPriority = 'high';
    }
    
    img.src = src;

    // Check if image is already cached
    if (img.complete) {
      handleLoad();
    }

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, options.priority]);

  return { isLoaded, isError, progress: isLoaded ? 100 : 0, imgRef };
};

/**
 * Preloads multiple images in sequence or parallel
 */
export const useImagesPreloader = (
  srcs: string[],
  options: { parallel?: boolean; onAllLoaded?: () => void } = {}
) => {
  const [loadedCount, setLoadedCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (srcs.length === 0) {
      setIsComplete(true);
      return;
    }

    let mounted = true;
    const loadedImages = new Set<string>();

    const preloadImage = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          if (mounted && !loadedImages.has(src)) {
            loadedImages.add(src);
            setLoadedCount(prev => prev + 1);
          }
          resolve();
        };
        img.onerror = () => {
          if (mounted) {
            setErrorCount(prev => prev + 1);
          }
          reject();
        };
        img.src = src;
        
        // Handle already cached images
        if (img.complete) {
          if (mounted && !loadedImages.has(src)) {
            loadedImages.add(src);
            setLoadedCount(prev => prev + 1);
          }
          resolve();
        }
      });
    };

    const loadAll = async () => {
      if (options.parallel !== false) {
        // Load all in parallel (default)
        await Promise.allSettled(srcs.map(preloadImage));
      } else {
        // Load sequentially
        for (const src of srcs) {
          await preloadImage(src).catch(() => {});
        }
      }
      
      if (mounted) {
        setIsComplete(true);
        options.onAllLoaded?.();
      }
    };

    loadAll();

    return () => {
      mounted = false;
    };
  }, [srcs.join(','), options.parallel]);

  return {
    loadedCount,
    errorCount,
    totalCount: srcs.length,
    progress: srcs.length > 0 ? (loadedCount / srcs.length) * 100 : 100,
    isComplete,
  };
};

/**
 * Hook for lazy loading images with blur-up effect
 */
export const useBlurUpImage = (
  lowResSrc: string,
  highResSrc: string
) => {
  const [currentSrc, setCurrentSrc] = useState(lowResSrc);
  const [isHighResLoaded, setIsHighResLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setCurrentSrc(highResSrc);
      setIsHighResLoaded(true);
    };
    img.src = highResSrc;
  }, [highResSrc]);

  return {
    src: currentSrc,
    isHighResLoaded,
    blurClass: isHighResLoaded ? '' : 'blur-sm',
  };
};
