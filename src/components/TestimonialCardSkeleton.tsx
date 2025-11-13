import { Skeleton } from "@/components/ui/skeleton";

export const TestimonialCardSkeleton = () => {
  return (
    <div className="bg-gradient-card rounded-2xl p-8 shadow-soft border-none">
      {/* Stars skeleton */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="w-5 h-5 rounded-full" />
        ))}
      </div>
      
      {/* Quote skeleton (3 lines) */}
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-3/4 mb-6" />
      
      {/* Avatar and name section */}
      <div className="flex items-center gap-4 pt-4 border-t border-border/50">
        <Skeleton className="w-16 h-16 rounded-full" />
        <div className="flex-1">
          <Skeleton className="h-5 w-32 mb-2" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  );
};
