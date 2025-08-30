import { useCartContext } from "@/hooks/use-contexts";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { TProduct } from "@/lib/types";
import Link from "next/link";
import StockStatus from "@/components/stock-status";

type ProductListProps = {
  products: TProduct[];
  isMobile: boolean;
}

export default function ProductList({products, isMobile}: ProductListProps) {
  return (
    <ul>
      {products?.map((product) => (
        <li key={product.id} className="my-4">
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
    <div className="flex items-center justify-between bg-white/10 hover:bg-white/15 rounded-md p-2">
      <div className="flex items-center gap-3 md:gap-6">
        <Image
          className="rounded-md"
          src={product.imageUrl}
          alt={`Product picture of ${product.productName}`}
          width={100}
          height={100}
        />

        <div className="flex flex-col">
          <p className="text-xl md:text-2xl">{product.productName}</p>
          <StockStatus inStock={product.inStock} withIcon={false} textSmall={true} />
        </div>
      </div>

      {!isMobile && (
        <div className="flex-1 min-w-0 text-sm text-gray-300 break-words md:pl-4 lg:pl-16">
          <p className="whitespace-normal">{product.productDesc}</p>
        </div>
      )}

      <div className="text-center pr-2">
        <p className="text-2xl font-bold mb-1">{product.price}</p>
        <Button onClick={handleAddCartClick}>Add to cart</Button>
      </div>
    </div>
  );
}