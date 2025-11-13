import { Skeleton } from "@/components/ui/skeleton";

export const ProductCardSkeleton = () => {
  return (
    <div className="bg-gradient-card rounded-2xl p-6 shadow-soft border-none">
      {/* Image skeleton */}
      <Skeleton className="h-48 w-full rounded-lg mb-4" />
      
      {/* Title skeleton (2 lines) */}
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-6 w-1/2 mb-4" />
      
      {/* Price skeleton */}
      <Skeleton className="h-8 w-24 mb-4" />
      
      {/* Button skeleton */}
      <Skeleton className="h-10 w-full rounded-lg" />
    </div>
  );
};
