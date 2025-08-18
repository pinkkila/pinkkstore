"use client"

import { Skeleton } from "@/components/ui/skeleton";
import React, { useEffect, useState } from "react";

export default function Loading() {
  // const [isClient, setIsClient] = useState(false);
  //
  // useEffect(() => {
  //   setIsClient(true);
  // }, []);
  //
  // if (!isClient) {
  //   return null;
  // }

  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
        <p>slooo slooo</p>
      </div>
    </div>
  );
}
