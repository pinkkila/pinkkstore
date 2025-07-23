"use client";

import { cn } from "@/lib/utils";
import { TCartItem, TProductDetailsSmall } from "@/lib/types";
import { useCartContext, useCartProductsContext } from "@/lib/hooks";

type CartPageClientProps = {
  className?: string;
};

export default function CartPageClient({ className }: CartPageClientProps) {
  const { cart } = useCartContext();
  const { productDetailsMap } = useCartProductsContext();

  return (
    <div className={cn("", className)}>
      <h1 className="text-3xl font-bold pl-6">
        {cart?.items.length === 0 ? "Your cart is empty" : "Your Cart"}
      </h1>
      <section>
        <div className="flex w-full mt-3 px-6">
          <div className="w-2/3">
            <ul>
              {cart?.items.map((item) => {
                const productDetails = productDetailsMap.get(item.productId);
                if (!productDetails) return null; // TODO: Loading spinner??

                return (
                  <li key={item.productId}>
                    <CartRow cartItem={item} productDetails={productDetails} />
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="w-1/3 bg-white/40">Right side (1/3)</div>
        </div>
      </section>
    </div>
  );
}

type CartRowProps = {
  cartItem: TCartItem;
  productDetails: TProductDetailsSmall;
};

function CartRow({ cartItem, productDetails }: CartRowProps) {
  return (
    <div className="flex items-center">
      <div className="h-[80px] w-[80px] bg-white/50">
        {productDetails.imageUrl}
      </div>
      <p>{productDetails.productName}</p>
      <p>
        {productDetails.price} X {cartItem.productQty}
      </p>
    </div>
  );
}
