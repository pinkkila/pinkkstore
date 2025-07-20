import { useContext } from "react";
import { AuthContext } from "@/contexts/auth-context-provider";
import { CartContext } from "@/contexts/cart-context-provider";

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthContextProvider");
  }
  return context;
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within an CartContextProvider");
  }
  return context;
}
