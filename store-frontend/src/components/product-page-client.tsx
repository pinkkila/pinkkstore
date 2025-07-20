"use client";

import { TProduct } from "@/lib/types";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type ProductPageClientProps = {
  productId: string;
  className?: string;
};

export default function ProductPageClient({
  productId,
  className,
}: ProductPageClientProps) {
  const [product, setProduct] = useState<TProduct | undefined>();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8080/products/${productId}`,
        );
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        setProduct(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchProduct();
  }, [productId]);

  return (
    <div
      className={cn(
        "grid md:grid-cols-3 md:grid-rows-[70px_1fr] grid-rows-[45px_300px_500px] md:h-[800px] gap-4",
        className,
      )}
    >
      <div className="md:row-start-1 md:row-span-1 md:col-start-1 md:col-span-2">
        <div className="h-full w-full flex items-center ">
          <h1 className="text-2xl lg:text-5xl font-bold pl-6">
            {product?.productName}
          </h1>

        </div>
      </div>

      <div className="md:row-start-2 md:row-span-full md:col-start-1 md:col-span-2">
        <div className="h-full w-full bg-white/50">
          Image section comes here
        </div>
      </div>

      <div className="md:row-start-1 md:row-span-full md:col-start-3 md:col-span-full">
        <div className="h-full w-full flex flex-col ">
          <p className="text-4xl font-bold p-6">{product?.price} coins</p>
          <Button className="w-11/12 mx-auto text-2xl font-bold p-7 rounded-4xl">Add to cart</Button>
        </div>
      </div>
    </div>
  );
}
