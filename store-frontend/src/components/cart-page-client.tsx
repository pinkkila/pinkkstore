"use client";

import { cn } from "@/lib/utils";
import { TCartItem, TCartRequest, TProductDetailsSmall } from "@/lib/types";
import { useCartContext, useCartProductsContext } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

type CartPageClientProps = {
  className?: string;
};

export default function CartPageClient({ className }: CartPageClientProps) {
  const { cart, handleCartChange } = useCartContext();
  const { productDetailsMap } = useCartProductsContext();

  const totalPrice = cart?.items.reduce((sum, item) => {
    const productDetails = productDetailsMap.get(item.productId);
    if (!productDetails) return sum;
    return sum + item.productQty * productDetails.price;
  }, 0);

  return (
    <div className={cn("", className)}>
      <h1 className="text-3xl font-bold">
        {cart?.items.length === 0 ? "Your cart is empty" : "Your Cart"}
      </h1>

      <section>
        <div className="flex md:flex-row flex-col  w-full gap-8 mt-3">
          <div className="md:w-2/3">
            <ul>
              {cart?.items.map((item) => {
                const productDetails = productDetailsMap.get(item.productId);
                if (!productDetails) return null; // TODO: Loading spinner??

                return (
                  <li key={item.productId}>
                    <CartRow
                      cartItem={item}
                      productDetails={productDetails}
                      handleCartChange={handleCartChange}
                    />
                    <Separator className="my-2" />
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="md:w-1/3">
            <Card>
              <CardContent>
                <div className="flex justify-between items-center">
                  <p className="text-2xl lg:text-3xl">Total:</p>
                  <p className="text-3xl lg:text-4xl font-bold">
                    {totalPrice?.toFixed(2)} coins
                  </p>
                </div>
                <Button size="lg" className="w-full mt-4 text-lg">
                  To Checkout
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

type CartRowProps = {
  cartItem: TCartItem;
  productDetails: TProductDetailsSmall;
  handleCartChange: (cartRequest: TCartRequest) => void;
};

function CartRow({ cartItem, productDetails, handleCartChange }: CartRowProps) {
  return (
    <div className="flex items-center mt-2">
      <div className="h-[80px] w-[80px]">
        {/*{productDetails.imageUrl}*/}

        {productDetails.productName === "Banana poster" ? (
          <Image
            className="rounded-md"
            src="/images/banana.jpg"
            alt="Banana image"
            width={80}
            height={80}
          />
        ) : (
          <Image
            className="rounded-md"
            src="/images/orange.jpg"
            alt="Orange image"
            width={80}
            height={80}
          />
        )}

      </div>

      <div>
        <p className="text-2xl px-4">{productDetails.productName}</p>
        {productDetails.inStock ? (
          <p className="text-green-500 px-4">In Stock</p>
        ) : (
          <p className="text-red-700 px-4">Not in Stock</p>
        )}
      </div>

      <div className="flex pl-10 ">
        <Button
          onClick={() =>
            handleCartChange({ productId: cartItem.productId, productQty: -1 })
          }
          size="icon"
        >
          <Minus className="!size-5" />
        </Button>
        <p className="text-3xl px-3">{cartItem.productQty}</p>
        <Button
          onClick={() =>
            handleCartChange({ productId: cartItem.productId, productQty: 1 })
          }
          size="icon"
        >
          <Plus className="!size-5" />
        </Button>
      </div>

      <Button
        onClick={() =>
          handleCartChange({
            productId: cartItem.productId,
            productQty: -cartItem.productQty,
          })
        }
        size="icon"
        className="mx-4 bg-transparent hover:bg-red-500"
      >
        <Trash2 className="!size-7 text-white " />
      </Button>

      <p className="text-3xl font-bold px-8 ml-auto">
        {(cartItem.productQty * productDetails.price).toFixed(2)}
      </p>
    </div>
  );
}
