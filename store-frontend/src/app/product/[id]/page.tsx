// "use cache" https://nextjs.org/docs/app/api-reference/directives/use-cache

import { getProduct } from "@/lib/queries";
import Breadcrumps from "@/components/breadcrumps";
import { capitalize } from "@/lib/utils";
import React from "react";
import Image from "next/image";
import AddCartButton from "@/components/add-cart-button";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const id = (await params).id;

  const { productDto: product, categoryName } = await getProduct(id);

  return (
    <main>
      <Breadcrumps
        crumps={[
          {
            path: `/categories/${categoryName}`,
            name: capitalize(categoryName),
          },
        ]}
        currentPage={product.productName}
      />
      <div className="grid grid-rows-[45px_300px_500px] md:grid-cols-3 md:grid-rows-[70px_1fr] md:h-[800px] gap-4">
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
              <AddCartButton productId={product.id} />
            <p>{product.productDesc}</p>
          </div>
        </div>
      </div>

    </main>
  );
}
