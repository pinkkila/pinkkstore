"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartContext } from "@/hooks/use-contexts";

export default function CartLogo() {
  const { cart } = useCartContext();
  const productTotal = cart?.totalQty ? cart.totalQty : 0;

  return (
    <Button size="lg" className="relative rounded-3xl" asChild>
      {/*For some reason a size does not change https://github.com/shadcn-ui/ui/issues/6316*/}
      <Link href={"/cart"}>
        <ShoppingCart className="!size-6" />
        {productTotal > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {cart?.totalQty}
          </span>
        )}
      </Link>
    </Button>
  );
}
