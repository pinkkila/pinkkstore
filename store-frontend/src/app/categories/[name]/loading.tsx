import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
  return (
    <div className="space-y-6 md:space-y-7">
      <Skeleton className="h-5 w-[200px]" />
      <Skeleton className="h-10 w-[200px]" />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
        <Skeleton className="h-8 w-full md:w-[100px]" />
        <Skeleton className="h-8 w-[200px] ml-auto" />
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <Skeleton className="h-0 md:h-[116px] w-1/4 rounded-xl" />
        <div className="flex flex-col space-y-3 md:w-4/6 ">
          <Skeleton className="h-[116px] w-full rounded-xl" />
          <Skeleton className="h-[116px] w-full rounded-xl" />
          <Skeleton className="h-[116px] w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
