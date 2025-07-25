"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { TProduct } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type CategoryProductsListProps = {
  categoryName: string;
  className?: string;
};

export default function CategoryProductList({
  categoryName,
  className,
}: CategoryProductsListProps) {
  const [products, setProducts] = useState<TProduct[]>([]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8080/products/categories/${categoryName}`,
        );
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        setProducts(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchOrder();
  }, [categoryName]);

  return (
    <section className={cn("flex", className)}>
      <div className="w-1/3">
        <h2 className="text-xl font-semibold">Filters</h2>

      </div>
      <ul className="w-2/3">
        {products.map((product) => (
          <li key={product.id}>
            <Link href={`/product/${product.id}`}>
              <ProductListElement product={product} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

type ProductListElementProps = {
  product: TProduct;
};

function ProductListElement({ product }: ProductListElementProps) {
  return (
    <div className="flex items-center justify-between bg-white/7 rounded-lg my-4">
      <div className="flex items-center">
      <Image
        className="rounded-md"
        src="/images/banana.jpg"
        alt={`Product picture of ${product.productName}`}
        width={100}
        height={100}
      />

        <div><p className="text-2xl px-4">{product.productName}</p>
          {product.inStock ? (
            <p className="text-green-500 px-4">In Stock</p>
          ) : (
            <p className="text-red-700 px-4">Not in Stock</p>
          )}</div>
      </div>

      <div>
        <p>{product.productDesc}</p>
      </div>

      <div className="text-center pr-2">
        <p className="text-2xl font-bold mb-1">{product.price}</p>
        <Button>Add to cart</Button>
      </div>

    </div>


  );
}
