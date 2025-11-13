import { Skeleton } from "@/components/ui/skeleton";
import { ProductCardSkeleton } from "@/components/ProductCardSkeleton";
import { TestimonialCardSkeleton } from "@/components/TestimonialCardSkeleton";

export const ContentSkeleton = () => {
  return (
    <div className="space-y-8 py-8">
      {/* Section skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-8 w-64 mx-auto" />
        <Skeleton className="h-4 w-96 mx-auto" />
      </div>
      
      {/* Cards grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>

      {/* Testimonials skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        {[1, 2].map((i) => (
          <TestimonialCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};
