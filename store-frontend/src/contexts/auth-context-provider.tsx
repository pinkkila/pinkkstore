"use client";

import React, { createContext, useEffect, useState } from "react";

type AuthContextProvider = {
  username: string | null;
  setUsername: React.Dispatch<React.SetStateAction<string | null>>
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextProvider | null>(null);

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [username, setUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUsername = async () => {
      try {
        const response = await fetch("/bff/userinfo", {
          credentials: "include",
        });
        if (!response.ok) {
          setUsername(null);
          return;
        }
        const userData = await response.json();
        setUsername(userData.sub);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    getUsername();
  }, []);



  return (
    <AuthContext.Provider value={{ username, setUsername, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
