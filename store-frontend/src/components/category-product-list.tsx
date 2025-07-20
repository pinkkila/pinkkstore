"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { TProduct } from "@/lib/types";
import Link from "next/link";

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
    <section className={cn("", className)}>
      <ul>
        {products.map((product) => (
          <li key={product.id}><Link href={`/product/${product.id}`}>{product.productName}</Link></li>
        ))}
      </ul>
    </section>
  );
}
