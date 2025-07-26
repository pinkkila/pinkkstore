import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/auth-context-provider";
import { CartContext } from "@/contexts/cart-context-provider";
import { CartProductsContext } from "@/contexts/cart-products-context-provider";

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

export function useCartProductsContext() {
  const context = useContext(CartProductsContext);
  if (!context) {
    throw new Error("useCartProductsContext must be used within an CartProductsContextProvider");
  }
  return context;
}

export function useDebounce<T>(value: T, delay = 1000): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timerId)
  }, [value, delay]);

  return debouncedValue;
}