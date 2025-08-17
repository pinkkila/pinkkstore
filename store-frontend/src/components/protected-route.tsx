"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/hooks/use-contexts";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const {username, isLoading} = useAuthContext()
  const router = useRouter();

  useEffect(() => {
    if ( !isLoading && !username) {
      router.replace("/");
    }
  }, [username, isLoading, router]);

  // TODO refactor with loading sprinner after implementing useQuery
  if (isLoading) {
    return null;
  }

  if (!username) {
    return null;
  }

  return <>{children}</>;
}