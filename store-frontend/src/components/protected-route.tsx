"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/hooks/use-contexts";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const {username, isPending} = useAuthContext()
  const router = useRouter();

  useEffect(() => {
    if ( !isPending && !username) {
      // TODO: add toaster
      router.replace("/");
    }
  }, [username, isPending, router]);

  // TODO: refactor with loading sprinner after implementing useQuery
  if (isPending) {
    return null;
  }

  if (!username) {
    return null;
  }

  return <>{children}</>;
}