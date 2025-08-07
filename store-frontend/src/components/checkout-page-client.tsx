"use client";

import { useCartContext, useCartProductsContext } from "@/lib/hooks";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { TCartItem, TProductDetailsSmall } from "@/lib/types";
import { getCsrfToken } from "@/lib/utils";

export default function CheckoutPageClient() {
  const { cart } = useCartContext();
  const { productDetailsMap } = useCartProductsContext();

  const totalPrice = cart?.items.reduce((sum, item) => {
    const productDetails = productDetailsMap.get(item.productId);
    if (!productDetails) return sum;
    return sum + item.productQty * productDetails.price;
  }, 0);

  const handleOnClick = async () => {
    const newOrderRequest = {
      orderItems: cart?.items.map((item) => ({
        productId: item.productId,
        productQty: item.productQty,
      })),
    };
    const csrfToken = getCsrfToken();

    try {
      // const response = await fetch("http://127.0.0.1:8080/orders", {
      const response = await fetch("https://bff.pinkkstore.com/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(csrfToken ? { "X-XSRF-TOKEN": csrfToken } : {}),
        },
        credentials: "include",
        body: JSON.stringify(newOrderRequest),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!cart || cart.items.length === 0) {
    return (
      <section className="max-w-4xl mx-auto px-4 mt-6">
        <p className="text-center text-xl text-muted-foreground">
          Your cart is empty.
        </p>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-4 mt-6 space-y-6">
      <Card>
        <CardContent>
          <ul className="divide-y divide-border">
            {cart.items.map((item) => {
              const productDetails = productDetailsMap.get(item.productId);
              if (!productDetails) return null; // TODO: Loading spinner??

              return (
                <li key={item.productId}>
                  <CartRow cartItem={item} productDetails={productDetails} />
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>

      <Card className="mt-6 ">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Total</h2>
            <p className="text-2xl font-bold">{totalPrice?.toFixed(2)} coins</p>
          </div>
          <Button onClick={handleOnClick} size="lg" className="w-full mt-6 text-base">
            Confirm and Pay
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}

type CartRowProps = {
  cartItem: TCartItem;
  productDetails: TProductDetailsSmall;
};

function CartRow({ cartItem, productDetails }: CartRowProps) {
  const total = (cartItem.productQty * productDetails.price).toFixed(2);

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4">
      <div className="flex items-center">
        <Image
          className="rounded-md"
          src={
            productDetails.productName === "Banana poster"
              ? "/images/banana.jpg"
              : "/images/orange.jpg"
          }
          alt={`${productDetails.productName} image`}
          width={80}
          height={80}
        />
        <div className="ml-4">
          <p className="text-lg font-medium">{productDetails.productName}</p>
          <p
            className={`text-sm ${cartItem.inStock ? "text-green-600" : "text-red-600"}`}
          >
            {cartItem.inStock ? "In Stock" : "Not in Stock"}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {productDetails.price} coins × {cartItem.productQty}
          </p>
        </div>
      </div>

      <p className="text-xl font-bold text-right mt-2 sm:mt-0 sm:text-left">
        {total} coins
      </p>
    </div>
  );
}
