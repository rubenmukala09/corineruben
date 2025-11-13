import { Skeleton } from "@/components/ui/skeleton";

export const StatsCardSkeleton = () => {
  return (
    <div className="bg-gradient-card rounded-2xl p-6 shadow-soft border-none text-center">
      {/* Number skeleton */}
      <Skeleton className="h-12 w-24 mx-auto mb-3" />
      
      {/* Label skeleton */}
      <Skeleton className="h-4 w-32 mx-auto" />
    </div>
  );
};
