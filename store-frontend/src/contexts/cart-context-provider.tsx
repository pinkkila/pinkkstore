"use client";

import React, { createContext, useEffect, useState } from "react";
import { TCart, TCartRequest } from "@/lib/types";
import { useAuthContext } from "@/lib/hooks";
import { getCsrfToken } from "@/lib/utils";

type CartContext = {
  cart: TCart | undefined;
  handleCartChange: (cartRequest: TCartRequest) => void;
  getCart: () => void;
};

export const CartContext = createContext<CartContext | null>(null);

export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<TCart | undefined>();
  const { username, isLoading } = useAuthContext();

  useEffect(() => {
    if (!isLoading && username) {
      getCart();
    }
  }, [username, isLoading]);

  const getCart = async () => {
    try {
      const response = await fetch("/api/carts", {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`Not able to fetch cart ${response.statusText}`);
      }
      const data = await response.json();
      setCart(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCartChange = async (cartRequest: TCartRequest) => {
    const csrfToken = getCsrfToken();

    try {
      const response = await fetch("/api/carts", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(csrfToken ? { "X-XSRF-TOKEN": csrfToken } : {}),
        },
        credentials: "include",
        body: JSON.stringify(cartRequest),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, handleCartChange, getCart }}>
      {children}
    </CartContext.Provider>
  );
}
