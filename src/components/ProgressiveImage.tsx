import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
}

// Global cache
const loadedImages = new Set<string>();

export function ProgressiveImage({
  src,
  alt,
  className,
  containerClassName,
  priority = false,
}: ProgressiveImageProps) {
  const [loaded, setLoaded] = useState(() => loadedImages.has(src));

  useEffect(() => {
    if (loadedImages.has(src)) {
      setLoaded(true);
      return;
    }

    const img = new Image();
    img.onload = () => {
      loadedImages.add(src);
      setLoaded(true);
    };
    img.onerror = () => setLoaded(true);
    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      {/* Shimmer placeholder */}
      {!loaded && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}

      {/* Image with CSS transition */}
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={cn(
          "w-full h-full object-cover transition-opacity duration-200",
          loaded ? "opacity-100" : "opacity-0",
          className
        )}
      />
    </div>
  );
}

// Preload critical images
export const preloadCriticalImages = (urls: string[]) => {
  urls.forEach(url => {
    if (!loadedImages.has(url)) {
      const img = new Image();
      img.onload = () => loadedImages.add(url);
      img.src = url;
    }
  });
};

// Check if cached
export const isImageCached = (url: string) => loadedImages.has(url);
