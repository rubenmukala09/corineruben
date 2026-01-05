import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'wide' | 'auto';
  priority?: boolean;
  objectPosition?: string;
  overlay?: boolean;
  overlayClassName?: string;
}

/**
 * ResponsiveImage component that ensures proper image display across all devices.
 * - Uses object-contain on mobile to show full image
 * - Uses object-cover on desktop for cropping
 * - Maintains focal point visibility
 */
export const ResponsiveImage = ({
  src,
  alt,
  className,
  containerClassName,
  aspectRatio = 'auto',
  priority = false,
  objectPosition = 'center',
  overlay = false,
  overlayClassName,
}: ResponsiveImageProps) => {
  const [loaded, setLoaded] = useState(false);

  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    wide: 'aspect-[16/9]',
    auto: '',
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl md:rounded-3xl',
        aspectRatioClasses[aspectRatio],
        containerClassName
      )}
    >
      {/* Loading skeleton */}
      {!loaded && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
      
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setLoaded(true)}
        className={cn(
          'w-full h-full transition-opacity duration-300',
          // Mobile: contain to show full image, Desktop: cover for aesthetic cropping
          'object-contain sm:object-cover',
          // Background for letterboxing on mobile
          'bg-muted/50',
          loaded ? 'opacity-100' : 'opacity-0',
          className
        )}
        style={{ objectPosition }}
      />
      
      {overlay && (
        <div 
          className={cn(
            'absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none',
            overlayClassName
          )} 
        />
      )}
    </div>
  );
};
