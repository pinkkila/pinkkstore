import { useContext } from "react";
import { AuthContext } from "@/contexts/auth-context-provider";
import { CsrfContext } from "@/contexts/csrf-context-provider";

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthContextProvider");
  }
  return context;
}

export function useCsrfContext() {
  const context = useContext(CsrfContext);
  if (!context) {
    throw new Error("useCsrfContext must be used within an CsrfContextProvider");
  }
  return context;
}