import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import React from "react";

export default function SkeletonProduct({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-full grid grid-rows-[45px_300px_500px] md:grid-cols-3 md:grid-rows-[70px_1fr] md:h-[800px] gap-4",
        className
      )}
    >
      {/* Header */}
      <Skeleton className="md:col-start-1 md:col-span-2 md:row-start-1 md:row-span-1" />

      {/* Main content */}
      <Skeleton className="md:col-start-1 md:col-span-2 md:row-start-2 md:row-span-1" />

      {/* Sidebar */}
      <Skeleton className="md:col-start-3 md:col-span-1 md:row-start-1 md:row-span-2" />
    </div>
);
}
