import { useState } from 'react';
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
 * Lightweight optimized image component
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
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Placeholder */}
      {!loaded && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}

      {/* Image with CSS transition */}
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        width={width}
        height={height}
        onLoad={() => {
          setLoaded(true);
          onLoad?.();
        }}
        className={cn(
          'w-full h-full object-cover transition-opacity duration-150',
          loaded ? 'opacity-100' : 'opacity-0'
        )}
      />
    </div>
  );
}
