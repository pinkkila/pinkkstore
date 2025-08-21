"use client";

import React, { createContext } from "react";
import { TProductDetailsSmall } from "@/lib/types";
import { useCartContext } from "@/hooks/use-contexts";
import { useQueries } from "@tanstack/react-query";
import { getProductDetailsSmall } from "@/lib/queries";

type CartProductsContext = {
  productDetailsMap: Map<number, TProductDetailsSmall>;
  isPending: boolean;
  isError: boolean;
};

export const CartProductsContext = createContext<CartProductsContext | null>(
  null,
);

export default function CartProductsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { cart } = useCartContext();
  const cartIds = cart?.items.map((p) => p.productId) ?? [];

  const productDetailQueries = useQueries({
    queries: cartIds.map((id) => ({
      queryKey: ["productDetail", id],
      queryFn: () => getProductDetailsSmall(id),
      enabled: !!id,
      staleTime: 5 * 60 * 1000,
    })),
    combine: (results) => {
      const productDetailsMap = new Map<number, TProductDetailsSmall>();
      results.forEach((result) => {
        if (result.data) {
          productDetailsMap.set(result.data.productId, result.data);
        }
      });

      return {
        productDetailsMap,
        isPending: results.some((result) => result.isPending),
        isError: results.some((result) => result.isError),
      };
    },
  });

  return (
    <CartProductsContext.Provider value={productDetailQueries}>
      {children}
    </CartProductsContext.Provider>
  );
}
