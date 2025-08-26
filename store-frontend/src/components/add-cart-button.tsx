"use client";

import { Button } from "@/components/ui/button";
import { useCartContext } from "@/hooks/use-contexts";

export default function AddCartButton({productId}: {productId: number} ) {
  const { handleCartChange } = useCartContext()

  return (
    <Button
      className="w-11/12 mx-auto text-2xl font-bold p-7 rounded-4xl"
      onClick={() => handleCartChange({ productId, productQty: 1 })}
    >
      Add to cart
    </Button>
  );
}
