"use client";

import React, { createContext, useEffect, useState, useRef } from "react";
import { TProductDetailsSmall } from "@/lib/types";
import { useCartContext } from "@/hooks/use-contexts";

type CartProductsContext = {
  productDetailsMap: Map<number, TProductDetailsSmall>;
};

export const CartProductsContext =
  createContext<CartProductsContext | null>(null);

export default function CartProductsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [productDetailsMap, setProductDetailsMap] = useState(
    new Map<number, TProductDetailsSmall>(),
  );
  const fetchedIdsRef = useRef(new Set<number>());
  const { cart } = useCartContext();

  useEffect(() => {
    const cartIds = cart?.items.map((p) => p.productId) ?? [];
    const idsToFetch = cartIds.filter((id) => !fetchedIdsRef.current.has(id));

    if (idsToFetch.length === 0) return;

    const fetchDetails = async () => {
      try {
        const newDetails: TProductDetailsSmall[] = await Promise.all(
          idsToFetch.map((id) =>
            fetch(`/api/products/details/${id}`).then((res) =>
              res.json(),
            ),
          ),
        );

        setProductDetailsMap((prev) => {
          const updated = new Map(prev);
          for (const detail of newDetails) {
            updated.set(detail.productId, detail);
            fetchedIdsRef.current.add(detail.productId);
          }
          return updated;
        });
      } catch (error) {
        console.error("Error fetching product details", error);
      }
    };

    fetchDetails();
  }, [cart]);

  return (
    <CartProductsContext.Provider value={{ productDetailsMap }}>
      {children}
    </CartProductsContext.Provider>
  );
}
