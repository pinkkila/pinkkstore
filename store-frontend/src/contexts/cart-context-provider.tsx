"use client"

import React, { createContext, useEffect, useState } from "react";
import { TCart } from "@/lib/types";
import { useAuthContext } from "@/lib/hooks";

type CartContext = {
  cart: TCart | undefined;
  handleCartChange: (cart: TCart) => void;
  getCart: () => void;
};

const CartContext = createContext<CartContext | null>(null);

export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<TCart | undefined>();
  const { username, isLoading } = useAuthContext()

  useEffect(() => {
    if (!isLoading && username) {
      getCart();
    }
  }, [username, isLoading]);

  const getCart = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/carts", {
        credentials: "include"
      });
      if (!response.ok) {
        throw new Error(
          `Not able to fetch cart ${response.statusText}`
        );
      }
      const data = await response.json();
      setCart(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCartChange = (cart: TCart) => {
    setCart(cart);
  }

  return (
    <CartContext.Provider value={{ cart, handleCartChange, getCart }}>{children}</CartContext.Provider>
  );
}
