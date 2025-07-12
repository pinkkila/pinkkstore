import { useContext } from "react";
import { AuthContext } from "@/contexts/auth-context-provider";

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthContextProvider");
  }
  return context;
}
