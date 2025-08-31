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

  const { mutate: logout, isPending: logoutIsPending } = useMutation({
    mutationFn: logoutRequest,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["auth", "userinfo"] });
      queryClient.setQueryData(["auth", "userinfo"], null);
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["auth"] });
      queryClient.removeQueries({ queryKey: ["cart"] });
      queryClient.removeQueries({ queryKey: ["order"] });
      queryClient.removeQueries({ queryKey: ["orders"] });
      // TODO: Add toaster?
    },
    onError: (error) => {
      console.error("Logout failed:", error);
      // TODO: Add toaster?
    },
  })

  return (
    <AuthContext.Provider
      value={{
        username: data?.sub ?? null,
        isPending,
        logout,
        logoutIsPending
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
