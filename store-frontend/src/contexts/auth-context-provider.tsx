"use client";

import React, { createContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserinfo, logoutRequest } from "@/lib/queries";

type AuthContextProvider = {
  username: string | null;
  isPending: boolean;
  logout: () => void;
  logoutIsPending: boolean;
};

export const AuthContext = createContext<AuthContextProvider | null>(null);

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = useQueryClient();

  const { data, isPending } = useQuery({
    queryKey: ["auth", "userinfo"],
    queryFn: getUserinfo,
    retry: false,
    staleTime: Infinity,
  });

  const { mutate, isPending: logoutIsPending } = useMutation({
    mutationFn: logoutRequest,
    onMutate: () => {
      queryClient.setQueryData(["auth", "userinfo"], null);
    },
    onError: (error) => {
      console.error("Logout failed:", error);
      // TODO: Add toaster.
    },
    onSuccess: () => {
      // TODO: Add toaster.
      queryClient.invalidateQueries({ queryKey: ["auth", "userinfo"] });
    },
  })

  return (
    <AuthContext.Provider
      value={{
        username: data?.sub ?? null,
        isPending,
        logout: mutate,
        logoutIsPending
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
