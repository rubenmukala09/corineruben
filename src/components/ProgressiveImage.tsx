import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  blurAmount?: number;
  transitionDuration?: number;
}

// Global cache for loaded images
const loadedImages = new Set<string>();

export function ProgressiveImage({
  src,
  alt,
  className,
  containerClassName,
  priority = false,
  blurAmount = 20,
  transitionDuration = 0.6,
}: ProgressiveImageProps) {
  const [loadState, setLoadState] = useState<'loading' | 'loaded' | 'error'>(() => 
    loadedImages.has(src) ? 'loaded' : 'loading'
  );
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Already loaded from cache
    if (loadedImages.has(src)) {
      setLoadState('loaded');
      return;
    }

    // Reset state for new src
    setLoadState('loading');

    const img = new Image();
    img.onload = () => {
      loadedImages.add(src);
      setLoadState('loaded');
    };
    img.onerror = () => {
      setLoadState('error');
    };
    
    // High priority for visible images
    if (priority) {
      img.fetchPriority = 'high';
      img.decoding = 'sync';
    } else {
      img.fetchPriority = 'auto';
      img.decoding = 'async';
    }
    
    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, priority]);

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      {/* Placeholder shimmer while loading */}
      <AnimatePresence>
        {loadState === 'loading' && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 animate-shimmer"
            style={{
              backgroundSize: '200% 100%',
            }}
          />
        )}
      </AnimatePresence>

      {/* Main image with blur-to-sharp transition */}
      <motion.img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        initial={{ 
          filter: `blur(${blurAmount}px)`,
          scale: 1.1,
          opacity: 0 
        }}
        animate={{ 
          filter: loadState === 'loaded' ? 'blur(0px)' : `blur(${blurAmount}px)`,
          scale: loadState === 'loaded' ? 1 : 1.1,
          opacity: loadState === 'loading' ? 0 : 1
        }}
        transition={{ 
          duration: transitionDuration,
          ease: [0.4, 0, 0.2, 1]
        }}
        className={cn(
          "w-full h-full object-cover",
          loadState === 'error' && "bg-muted",
          className
        )}
      />
    </div>
  );
}

// Preload critical images for instant display
export const preloadCriticalImages = (urls: string[]) => {
  urls.forEach(url => {
    if (!loadedImages.has(url)) {
      const img = new Image();
      img.onload = () => loadedImages.add(url);
      img.fetchPriority = 'high';
      img.src = url;
    }
  });
};

// Check if image is already cached
export const isImageCached = (url: string) => loadedImages.has(url);
