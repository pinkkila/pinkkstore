"use client";

import React, { createContext } from "react";
import { TCart, TCartRequest } from "@/lib/types";
import { useAuthContext } from "@/hooks/use-contexts";
import { putCart, getCart } from "@/lib/queries";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";

type CartContext = {
  cart: TCart | undefined;
  handleCartChange: (cartRequest: TCartRequest) => void;
  getCartIsPending: boolean;
  getCartIsError: boolean;
  cartChangeIsPending: boolean;
  cartChangeIsError: boolean;
};

export const CartContext = createContext<CartContext | null>(null);

export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { username, isPending: usernameIsPending } = useAuthContext();
  const queryClient = useQueryClient();

  const { data: cart, isPending: getCartIsPending, isError: getCartIsError } = useQuery({
    queryKey: ["cart", username],
    queryFn: getCart,
    enabled: !!username && !usernameIsPending,
  });

  const { mutate, isPending: cartChangeIsPending, isError: cartChangeIsError } = useMutation({
    mutationFn: (cartReques: TCartRequest) => putCart(cartReques),
    onSuccess: (data) => {
     queryClient.setQueryData(["cart", username], data);
    }
  })

  const handleCartChange = async (cartRequest: TCartRequest) => {
    mutate(cartRequest)
  };

  return (
    <CartContext.Provider value={{ cart, handleCartChange, getCartIsPending, getCartIsError , cartChangeIsPending, cartChangeIsError }}>
      {children}
    </CartContext.Provider>
  );
}
