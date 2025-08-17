"use client";

import { TProduct } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCartContext } from "@/lib/hooks";
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

type ProductPageClientProps = {
  productId: string;
  className?: string;
};

export default function ProductPageClient({
  productId,
  className,
}: ProductPageClientProps) {
  const { handleCartChange } = useCartContext();
  const {
    data: product,
  } = useSuspenseQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId),
  });

  return (
    <div
      className={cn(
        "w-full grid grid-rows-[45px_300px_500px] md:grid-cols-3 md:grid-rows-[70px_1fr] md:h-[800px] gap-4",
        className,
      )}
    >
      <div className="md:row-start-1 md:row-span-1 md:col-start-1 md:col-span-2">
        <div className="h-full w-full flex items-center ">
          <h1 className="text-2xl lg:text-5xl font-bold pl-6">
            {product.productName}
          </h1>
        </div>
      </div>

      <div className="md:row-start-2 md:row-span-full md:col-start-1 md:col-span-2">
        <div className="h-full w-full relative">
          <Image
            className="rounded-md"
            src={product.imageUrl}
            alt={`Product picture of ${product.productName}`}
            fill={true}
          />
        </div>
      </div>

      <div className="md:row-start-1 md:row-span-full md:col-start-3 md:col-span-full">
        <div className="h-full w-full flex flex-col items-center md:items-start ">
          <p className="text-4xl font-bold p-6">{product.price} coins</p>
          <Button
            onClick={() =>
              handleCartChange({ productId: product.id, productQty: 1 })
            }
            className="w-11/12 mx-auto text-2xl font-bold p-7 rounded-4xl"
          >
            Add to cart
          </Button>
          <p>{product.productDesc}</p>
        </div>
      </div>
    </div>
  );
}

const getProduct = async (productId: string): Promise<TProduct> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const response = await fetch(`/api/products/${productId}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};
