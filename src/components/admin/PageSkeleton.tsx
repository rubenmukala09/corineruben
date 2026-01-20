import { cn } from "@/lib/utils";

interface PageSkeletonProps {
  variant?: "dashboard" | "table" | "cards" | "form";
  className?: string;
}

// Unified dark skeleton component matching the admin design system
// Zero-Distraction Protocol: No animations
export function PageSkeleton({ variant = "dashboard", className }: PageSkeletonProps) {
  return (
    <div className={cn("p-6 max-w-7xl mx-auto space-y-6", className)}>
      {/* Page Header Skeleton */}
      <div className="space-y-2">
        <div className="h-8 w-64 bg-gray-800 rounded" />
        <div className="h-4 w-96 bg-gray-800/60 rounded" />
      </div>

      {variant === "dashboard" && <DashboardSkeleton />}
      {variant === "table" && <TableSkeleton />}
      {variant === "cards" && <CardsSkeleton />}
      {variant === "form" && <FormSkeleton />}
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <>
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 bg-[#111827] border border-gray-800 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-4 w-20 bg-gray-700 rounded" />
              <div className="h-10 w-10 bg-gray-700 rounded" />
            </div>
            <div className="h-8 w-24 bg-gray-700 rounded" />
            <div className="h-3 w-32 bg-gray-800 rounded" />
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-80 bg-[#111827] border border-gray-800 rounded-lg p-4">
          <div className="h-5 w-40 bg-gray-700 rounded mb-4" />
          <div className="h-64 bg-gray-800/50 rounded" />
        </div>
        <div className="h-80 bg-[#111827] border border-gray-800 rounded-lg p-4">
          <div className="h-5 w-32 bg-gray-700 rounded mb-4" />
          <div className="h-64 bg-gray-800/50 rounded" />
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-[#111827] border border-gray-800 rounded-lg p-4 space-y-4">
            <div className="h-5 w-32 bg-gray-700 rounded" />
            {[...Array(4)].map((_, j) => (
              <div key={j} className="flex items-center gap-3">
                <div className="h-10 w-10 bg-gray-700 rounded" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-full bg-gray-700 rounded" />
                  <div className="h-3 w-2/3 bg-gray-800 rounded" />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

function TableSkeleton() {
  return (
    <div className="bg-[#111827] border border-gray-800 rounded-lg overflow-hidden">
      {/* Table Header */}
      <div className="border-b border-gray-800 p-4 flex items-center gap-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-4 flex-1 bg-gray-700 rounded" />
        ))}
      </div>
      
      {/* Table Rows */}
      {[...Array(8)].map((_, i) => (
        <div key={i} className="border-b border-gray-800 p-4 flex items-center gap-4">
          <div className="h-10 w-10 bg-gray-700 rounded-full" />
          {[...Array(4)].map((_, j) => (
            <div key={j} className="h-4 flex-1 bg-gray-800 rounded" />
          ))}
          <div className="h-8 w-20 bg-gray-700 rounded" />
        </div>
      ))}
    </div>
  );
}

function CardsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-[#111827] border border-gray-800 rounded-lg p-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-gray-700 rounded" />
            <div className="flex-1 space-y-2">
              <div className="h-5 w-32 bg-gray-700 rounded" />
              <div className="h-3 w-24 bg-gray-800 rounded" />
            </div>
          </div>
          <div className="h-4 w-full bg-gray-800 rounded" />
          <div className="h-4 w-3/4 bg-gray-800 rounded" />
          <div className="flex gap-2 pt-2">
            <div className="h-8 flex-1 bg-gray-700 rounded" />
            <div className="h-8 flex-1 bg-gray-700 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

function FormSkeleton() {
  return (
    <div className="max-w-2xl mx-auto bg-[#111827] border border-gray-800 rounded-lg p-8 space-y-6">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 w-24 bg-gray-700 rounded" />
          <div className="h-10 w-full bg-gray-800 rounded" />
        </div>
      ))}
      <div className="space-y-2">
        <div className="h-4 w-24 bg-gray-700 rounded" />
        <div className="h-32 w-full bg-gray-800 rounded" />
      </div>
      <div className="flex gap-4 pt-4">
        <div className="h-10 w-32 bg-gray-700 rounded" />
        <div className="h-10 w-24 bg-gray-800 rounded" />
      </div>
    </div>
  );
}

// Inline skeleton for use within components - No animation
export function InlineSkeleton({ className }: { className?: string }) {
  return <div className={cn("bg-gray-800 rounded", className)} />;
}

// Stat card skeleton - No animation
export function StatCardSkeleton() {
  return (
    <div className="h-32 bg-[#111827] border border-gray-800 rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="h-4 w-20 bg-gray-700 rounded" />
        <div className="h-10 w-10 bg-gray-700 rounded" />
      </div>
      <div className="h-8 w-24 bg-gray-700 rounded" />
      <div className="h-3 w-32 bg-gray-800 rounded" />
    </div>
  );
}

// Table row skeleton - No animation
export function TableRowSkeleton({ columns = 5 }: { columns?: number }) {
  return (
    <div className="border-b border-gray-800 p-4 flex items-center gap-4">
      <div className="h-10 w-10 bg-gray-700 rounded-full" />
      {[...Array(columns - 1)].map((_, j) => (
        <div key={j} className="h-4 flex-1 bg-gray-800 rounded" />
      ))}
      <div className="h-8 w-20 bg-gray-700 rounded" />
    </div>
  );
}
