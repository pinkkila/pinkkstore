// "use cache" https://nextjs.org/docs/app/api-reference/directives/use-cache

import { getProduct } from "@/lib/queries";
import Breadcrumps from "@/components/breadcrumps";
import { capitalize } from "@/lib/utils";
import React from "react";
import Image from "next/image";
import AddCartButton from "@/components/add-cart-button";
import StockStatus from "@/components/stock-status";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const id = (await params).id;

  const { productDto: product, categoryName } = await getProduct(id);

  return (
    <main className="space-y-6">
      <Breadcrumps
        crumps={[
          {
            path: `/categories/${categoryName}`,
            name: capitalize(categoryName),
          },
        ]}
        currentPage={product.productName}
      />
      <div className="flex flex-col md:flex-row gap-4 md:gap-5">
        <div className="md:w-2/3 flex flex-col gap-4 md:gap-6">
          <h1 className="text-2xl lg:text-4xl font-bold">
            {product.productName}
          </h1>

          <div className="m-auto">
            <Image
              className="rounded-md"
              src={product.imageUrl}
              alt={`Product picture of ${product.productName}`}
              width={800}
              height={800}
              sizes="(max-width: 768px) 100vw, 66vw"
            />
          </div>
        </div>

        <div className="md:w-1/3 flex flex-col gap-4">
          <p className="text-3xl md:text-4xl font-bold">
            {product.price} coins
          </p>
          <AddCartButton
            productId={product.id}
            className="w-full md:w-[80%] p-6 md:p-7 mx-auto md:mx-0"
          />
          <StockStatus inStock={product.inStock} withIcon={true} />
          <p>{product.productDesc}</p>
        </div>
      </div>
    </main>
  );
}
