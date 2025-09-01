"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { TCartItem, TNewOrderRequest, TProductDetailsSmall } from "@/lib/types";
import { useCartContext, useCartProductsContext } from "@/hooks/use-contexts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postOrder } from "@/lib/queries";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { useRouter } from "next/navigation";
import StockStatus from "@/components/stock-status";
import { useState } from "react";

export default function CheckoutPageClient() {
  const { cart } = useCartContext();
  const { productDetailsMap } = useCartProductsContext();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const totalPrice = cart?.items.reduce((sum, item) => {
    const productDetails = productDetailsMap.get(item.productId);
    if (!productDetails) return sum;
    return sum + item.productQty * productDetails.price;
  }, 0);

  const { mutate, isPending } = useMutation({
    mutationFn: (newOrderRequest: TNewOrderRequest) =>
      postOrder(newOrderRequest),
    onSuccess: (data) => {
      queryClient.setQueryData(["order", data.id], data);
      void queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.removeQueries({ queryKey: ["orders"] });
      router.push(`/account/order/${data.id}`);
    },
    onError: (error) => {
      console.error("Order failed:", error);
      // TODO: Add toaster and info if the failure was due to a product being out of stock
    },
  });

  const handleOnClick = async () => {
    if (!cart) {
      throw new Error("Something went wrong!");
    }
    setIsRedirecting(true)

    const newOrderRequest = {
      orderItems: cart?.items.map((item) => ({
        productId: item.productId,
        productQty: item.productQty,
      })),
    };
    mutate(newOrderRequest);
  };

  if (isPending || isRedirecting) {
    return (
      <div className=" flex flex-col gap-2 h-72 items-center justify-center">
        <p className="text-xl text-center text-muted-foreground">
          Creating your order...
        </p>
        <Spinner variant="circle" />
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className=" flex h-72 items-center justify-center">
        <p className="text-xl text-center text-muted-foreground">
          Your cart is empty so there is nothing to order.
        </p>
      </div>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-4 mt-6 space-y-6">
      <Card>
        <CardContent>
          <ul className="divide-y divide-border">
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
        </CardContent>
      </Card>

      <Card className="mt-6 ">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Total</h2>
            <p className="text-2xl font-bold">{totalPrice?.toFixed(2)} coins</p>
          </div>
          <Button
            onClick={handleOnClick}
            size="lg"
            className="w-full mt-6 text-base"
          >
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
          src={productDetails.imageUrl}
          alt={`${productDetails.productName} image`}
          width={80}
          height={80}
        />
        <div className="ml-4">
          <p className="text-lg font-medium">{productDetails.productName}</p>
          <StockStatus
            inStock={cartItem.inStock}
            withIcon={false}
            textSmall={true}
          />
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
