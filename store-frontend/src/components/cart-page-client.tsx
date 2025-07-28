"use client";

import { cn } from "@/lib/utils";
import { TCartItem, TCartRequest, TProductDetailsSmall } from "@/lib/types";
import { useCartContext, useCartProductsContext } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

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

  if (!cart || cart.items.length === 0) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-3xl font-bold mb-2">Your cart is empty</h1>
        <Link href="/" className="text-muted-foreground hover:underline">
          Back to shop
        </Link>
      </div>
    );
  }

  return (
    <div className={cn(className)}>
      <h1 className="text-4xl font-bold text-center mb-10">Your Cart</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <Card>
            <CardContent className="px-4">
              <ul className="divide-y divide-border">
                {cart.items.map((item) => {
                  const productDetails = productDetailsMap.get(item.productId);
                  if (!productDetails) return null; // TODO: add Loading spinner

                  return (
                    <li key={item.productId}>
                      <CartRow
                        cartItem={item}
                        productDetails={productDetails}
                        handleCartChange={handleCartChange}
                      />
                    </li>
                  );
                })}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="md:w-1/3">
          <Card>
            <CardContent className="py-4 px-6">
              <div className="flex justify-between items-center mb-4">
                <p className="text-xl font-medium">Total</p>
                <p className="text-2xl font-bold">
                  {totalPrice?.toFixed(2)} coins
                </p>
              </div>
              <Button asChild size="lg" className="w-full text-base">
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

type CartRowProps = {
  cartItem: TCartItem;
  productDetails: TProductDetailsSmall;
  handleCartChange: (cartRequest: TCartRequest) => void;
};

function CartRow({ cartItem, productDetails, handleCartChange }: CartRowProps) {
  const total = (cartItem.productQty * productDetails.price).toFixed(2);

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4">
      <div className="flex items-center gap-4">
        <Image
          src={
            productDetails.productName === "Banana poster"
              ? "/images/banana.jpg"
              : "/images/orange.jpg"
          }
          alt={productDetails.productName}
          width={80}
          height={80}
          className="rounded-md"
        />
        <div>
          <p className="text-lg font-medium">{productDetails.productName}</p>
          <p
            className={`text-sm ${
              cartItem.inStock ? "text-green-600" : "text-red-600"
            }`}
          >
            {cartItem.inStock ? "In Stock" : "Not in Stock"}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {productDetails.price} coins × {cartItem.productQty}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 gap-3">
        <div className="flex items-center">
          <Button
            onClick={() =>
              handleCartChange({
                productId: cartItem.productId,
                productQty: -1,
              })
            }
            size="icon"
            variant="outline"
          >
            <Minus className="w-4 h-4" />
          </Button>

          <p className="mx-3 text-lg font-semibold">{cartItem.productQty}</p>
          <Button

            onClick={() =>
              handleCartChange({
                productId: cartItem.productId,
                productQty: 1,
              })
            }
            size="icon"
            variant="outline"
          >
            <Plus className="w-4 h-4" />
          </Button>

          <Button
            onClick={() =>
              handleCartChange({
                productId: cartItem.productId,
                productQty: -cartItem.productQty,
              })
            }
            size="icon"
            variant="ghost"
            className="ml-2 sm:mr-10 lg:mr-12 hover:text-destructive"
          >
            <Trash2 className="w-5 h-5" />
          </Button>
        </div>

        <div>
          <p className="text-xl font-bold">{total} coins</p>
        </div>
      </div>
    </div>
  );
}
