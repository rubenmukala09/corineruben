import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImagePictureProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  width?: number;
  height?: number;
  onLoad?: () => void;
}

/**
 * Optimized image component with modern formats (WebP, AVIF)
 * Provides instant loading with blur-up placeholder
 */
export function OptimizedImagePicture({
  src,
  alt,
  className,
  loading = 'lazy',
  width,
  height,
  onLoad,
}: OptimizedImagePictureProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Generate different format versions
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  const avifSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.avif');

  useEffect(() => {
    // Preload the image
    if (loading === 'eager') {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setIsLoaded(true);
        onLoad?.();
      };
      img.onerror = () => setError(true);
    }
  }, [src, loading, onLoad]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setError(true);
  };

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Blur placeholder while loading */}
      {!isLoaded && !error && (
        <div
          className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50 animate-pulse"
          style={{ aspectRatio: width && height ? `${width}/${height}` : undefined }}
        />
      )}

      {/* Modern image formats with fallback */}
      <picture>
        {/* AVIF - Best compression, not all browsers */}
        <source srcSet={avifSrc} type="image/avif" />
        
        {/* WebP - Good compression, wide support */}
        <source srcSet={webpSrc} type="image/webp" />
        
        {/* Original format fallback */}
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          width={width}
          height={height}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'w-full h-full object-cover transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0',
            className
          )}
        />
      </picture>
    </div>
  );
}
