import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export function StatCardSkeleton() {
  return (
    <Card className="p-5 bg-[#111827] border-gray-800">
      <div className="flex items-center justify-between mb-3">
        <Skeleton className="w-10 h-10 rounded-lg bg-gray-800" />
        <Skeleton className="w-20 h-8 bg-gray-800" />
      </div>
      <Skeleton className="h-8 w-24 mb-1 bg-gray-800" />
      <Skeleton className="h-4 w-32 bg-gray-800" />
    </Card>
  );
}

export function ChartSkeleton({ className = "" }: { className?: string }) {
  return (
    <Card className={`p-6 bg-[#1F2937] border-gray-800 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-lg bg-gray-800" />
          <div>
            <Skeleton className="h-5 w-40 mb-2 bg-gray-800" />
            <Skeleton className="h-3 w-24 bg-gray-800" />
          </div>
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-8 w-16 rounded-md bg-gray-800" />
          <Skeleton className="h-8 w-16 rounded-md bg-gray-800" />
          <Skeleton className="h-8 w-16 rounded-md bg-gray-800" />
        </div>
      </div>
      <Skeleton className="h-[280px] w-full rounded-lg bg-gray-800" />
    </Card>
  );
}

export function TableRowSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-gray-800">
      <Skeleton className="h-10 w-10 rounded-full bg-gray-800" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-1/3 bg-gray-800" />
        <Skeleton className="h-3 w-1/4 bg-gray-800" />
      </div>
      <Skeleton className="h-6 w-20 rounded-full bg-gray-800" />
      <Skeleton className="h-6 w-24 bg-gray-800" />
      <Skeleton className="h-8 w-8 rounded bg-gray-800" />
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <Card className="bg-[#111827] border-gray-800">
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded bg-gray-800" />
            <Skeleton className="h-6 w-48 bg-gray-800" />
          </div>
          <Skeleton className="h-9 w-24 rounded-md bg-gray-800" />
        </div>
        <Skeleton className="h-10 w-full mt-4 rounded-md bg-gray-800" />
      </div>
      <div>
        {[...Array(rows)].map((_, i) => (
          <TableRowSkeleton key={i} />
        ))}
      </div>
    </Card>
  );
}

export function PendingCardSkeleton() {
  return (
    <Card className="p-5 bg-[#1F2937] border-gray-800">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Skeleton className="w-5 h-5 rounded bg-gray-800" />
          <Skeleton className="h-5 w-32 bg-gray-800" />
        </div>
      </div>
      <div className="space-y-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-3 bg-[#111827] rounded-lg">
            <Skeleton className="w-9 h-9 rounded-lg bg-gray-800" />
            <div className="flex-1">
              <Skeleton className="h-4 w-24 mb-1 bg-gray-800" />
              <Skeleton className="h-3 w-16 bg-gray-800" />
            </div>
            <Skeleton className="h-3 w-12 bg-gray-800" />
          </div>
        ))}
      </div>
    </Card>
  );
}

export function DashboardStatsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {[...Array(4)].map((_, i) => (
        <StatCardSkeleton key={i} />
      ))}
    </div>
  );
}
