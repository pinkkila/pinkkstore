"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/lib/hooks";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const {username, isLoading} = useAuthContext()
  const router = useRouter();

  useEffect(() => {
    if ( !isLoading && username === "") {
      router.push("/");
    }
  }, [username, isLoading, router]);

  // refactor with loading sprinner
  if (isLoading) {
    return null;
  }

  if (username === "") {
    return null;
  }

  return <>{children}</>;
}