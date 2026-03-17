import { cn } from "@/lib/utils";

interface OptimizedImagePictureProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  width?: number;
  height?: number;
  onLoad?: () => void;
}

/**
 * Lightweight image — no state, no transitions, instant display.
 */
export function OptimizedImagePicture({
  src,
  alt,
  className,
  loading = "lazy",
  width,
  height,
  onLoad,
}: OptimizedImagePictureProps) {
  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      width={width}
      height={height}
      onLoad={onLoad}
      className={cn("w-full h-full object-cover", className)}
    />
  );
}
