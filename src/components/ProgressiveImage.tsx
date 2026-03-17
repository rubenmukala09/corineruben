import { cn } from "@/lib/utils";

interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
}

export function ProgressiveImage({
  src,
  alt,
  className,
  containerClassName,
  priority = false,
}: ProgressiveImageProps) {
  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={cn("w-full h-full object-cover", className)}
      />
    </div>
  );
}
