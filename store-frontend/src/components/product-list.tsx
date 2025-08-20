import { useCartContext } from "@/hooks/use-contexts";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { TProduct } from "@/lib/types";
import Link from "next/link";

type ProductListProps = {
  products: TProduct[];
  isMobile: boolean;
}

export default function ProductList({products, isMobile}: ProductListProps) {
  return (
    <ul>
      {products?.map((product) => (
        <li key={product.id}>
          <Link href={`/product/${product.id}`}>
            <ProductListElement product={product} isMobile={isMobile} />
          </Link>
        </li>
      ))}
    </ul>
  );
}

type ProductListElementProps = {
  product: TProduct;
  isMobile: boolean;
};

function ProductListElement({ product, isMobile }: ProductListElementProps) {
  const { handleCartChange } = useCartContext();

  const handleAddCartClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    handleCartChange({ productId: product.id, productQty: 1 });
  };

  return (
    <div className="flex items-center justify-between bg-white/10 hover:bg-white/15 rounded-md my-4 p-2">
      <div className="flex items-center">
        <Image
          className="rounded-md"
          src={product.imageUrl}
          alt={`Product picture of ${product.productName}`}
          width={100}
          height={100}
        />

        <div className="flex flex-col px-4">
          <p className="text-2xl px-4">{product.productName}</p>
          {product.inStock ? (
            <p className="text-green-500 px-4">In Stock</p>
          ) : (
            <p className="text-red-700 px-4">Not in Stock</p>
          )}
        </div>
      </div>

      {!isMobile && (
        <div className="ml-4 text-sm text-gray-300 break-words overflow-wrap-anywhere flex-1">
          <p>{product.productDesc}</p>
        </div>
      )}

      <div className="text-center pr-2">
        <p className="text-2xl font-bold mb-1">{product.price}</p>
        <Button onClick={handleAddCartClick}>Add to cart</Button>
      </div>
    </div>
  );
}