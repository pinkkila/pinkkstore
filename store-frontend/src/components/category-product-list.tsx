"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { TProduct } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCartContext } from "@/lib/hooks";

type CategoryProductsListProps = {
  categoryName: string;
  className?: string;
};

// type TSort = "price" | "productName";

export default function CategoryProductList({
  categoryName,
  className,
}: CategoryProductsListProps) {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [sortBy, setSortBy] = useState<string>("popularity,desc");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8080/products/categories/${categoryName}?page=0&size=10&sort=${sortBy}`,
        );
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        setProducts(data.content);
      } catch (e) {
        console.error(e);
      }
    };
    fetchOrder();
  }, [categoryName, sortBy]);

  // const fetchProductsBetweenPrice = async () => {
  //   try {
  //     const response = await fetch(
  //       `http://127.0.0.1:8080/products/categories/${categoryName}/price-range?minPrice=15&maxPrice=20&page=0&size=2&sort=price,desc`,
  //     );
  //     if (!response.ok) {
  //       throw new Error(response.statusText);
  //     }
  //     const data = await response.json();
  //     setProducts(data.content);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  return (
    <div className={cn("flex flex-col", className)}>
      <h1 className="text-4xl font-bold mb-6">{categoryName}</h1>

      {/*<Button onClick={fetchProductsBetweenPrice}>Products between price 15.00 and 20.00</Button>*/}

      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">Filters</h2>

        <div className="flex items-center gap-2">
          <p className="font-semibold">Sort by:</p>
          <Select onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Popularity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity,desc">Popularity</SelectItem>
              <SelectItem value="price,asc">Price Low to High</SelectItem>
              <SelectItem value="price,desc">Price High to Low</SelectItem>
              <SelectItem value="productName">Product name</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex">
        <section className="w-1/3"></section>
        <section className="w-2/3">
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                <Link href={`/product/${product.id}`}>
                  <ProductListElement product={product} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

type ProductListElementProps = {
  product: TProduct;
};

function ProductListElement({ product }: ProductListElementProps) {
  const { handleCartChange } = useCartContext();

  const handleAddCartClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    handleCartChange({productId: product.id, productQty: 1})
  }

  return (
    <div className="flex items-center justify-between bg-white/10 hover:bg-white/15 rounded-md my-4">
      <div className="flex items-center">
        <Image
          className="rounded-md"
          src="/images/banana.jpg"
          alt={`Product picture of ${product.productName}`}
          width={100}
          height={100}
        />

        <div>
          <p className="text-2xl px-4">{product.productName}</p>
          {product.inStock ? (
            <p className="text-green-500 px-4">In Stock</p>
          ) : (
            <p className="text-red-700 px-4">Not in Stock</p>
          )}
        </div>
      </div>

      <div>
        <p>{product.productDesc}</p>
      </div>

      <div className="text-center pr-2">
        <p className="text-2xl font-bold mb-1">{product.price}</p>
        <Button onClick={handleAddCartClick}>Add to cart</Button>
      </div>
    </div>
  );
}
