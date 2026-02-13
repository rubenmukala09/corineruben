import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

interface SkeletonCardProps {
  className?: string;
  showImage?: boolean;
  lines?: number;
}

export const SkeletonCard = ({
  className = "",
  showImage = true,
  lines = 3,
}: SkeletonCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`bg-card rounded-2xl p-6 border border-border/30 ${className}`}
    >
      {showImage && (
        <Skeleton className="w-full h-48 rounded-xl mb-4 shimmer" />
      )}
      <Skeleton className="h-6 w-3/4 mb-3 shimmer" />
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={`h-4 mb-2 shimmer ${i === lines - 1 ? "w-1/2" : "w-full"}`}
          style={{ animationDelay: `${i * 100}ms` }}
        />
      ))}
    </motion.div>
  );
};

export const SkeletonGrid = ({
  count = 4,
  columns = 4,
}: {
  count?: number;
  columns?: number;
}) => {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-6`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};
