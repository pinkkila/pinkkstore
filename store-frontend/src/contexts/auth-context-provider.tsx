"use client";

import React, { createContext, useEffect, useState } from "react";

type AuthContextProvider = {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
};

export const AuthContext = createContext<AuthContextProvider | null>(null);

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    getUsername();
  }, []);

  const getUsername = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/userinfo", {
        credentials: "include",
      });
      if (!response.ok) {
        setUsername("");
        return;
      }
      const userData = await response.json();
      setUsername(userData.sub);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider value={{ username, setUsername }}>
      {children}
    </AuthContext.Provider>
  );
}
