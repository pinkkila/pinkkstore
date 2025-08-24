"use client";

import React, { createContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserinfo, logoutRequest } from "@/lib/queries";

type AuthContextProvider = {
  username: string | null;
  isPending: boolean;
  logout: () => Promise<void>;
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
  });

  const logout = async () => {
    try {
      await logoutRequest();
    } finally {
      queryClient.setQueryData(["auth", "userinfo"], null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        username: data?.sub ?? null,
        isPending,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
