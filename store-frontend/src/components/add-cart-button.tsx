"use client";

import { Button } from "@/components/ui/button";
import { useCartContext } from "@/hooks/use-contexts";
import { cn } from "@/lib/utils";

type AddCartButtonProps = {
  productId: number;
  className?: string;
}

export default function AddCartButton({ productId, className }: AddCartButtonProps ) {
  const { handleCartChange } = useCartContext()

  return (
    <Button
      className={cn("text-2xl font-bold rounded-4xl", className)}
      onClick={() => handleCartChange({ productId, productQty: 1 })}
    >
      Add to cart
    </Button>
  );
}
