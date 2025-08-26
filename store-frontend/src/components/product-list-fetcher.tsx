"use client";

import { useQuery } from "@tanstack/react-query";
import ProductList from "@/components/product-list";
import { createProductsByCategoryQueryOptions } from "@/lib/query-options";
import ProductListSkeleton from "@/components/product-list-skeleton";

type ProductListFetcherProps = {
  categoryName: string;
  sortBy: string;
  priceRange: [number, number];
  isMobile: boolean;
};

export default function ProductListFetcher({ categoryName, sortBy, priceRange, isMobile }: ProductListFetcherProps) {
  const { data, isPending, isError, error } = useQuery(
    createProductsByCategoryQueryOptions({
      categoryName,
      priceRange,
      page: 0,
      size: 10,
      sortBy,
    }),
  );

  if (isError) {
    throw new Error(`${error}`);
  }

  if (isPending) return <ProductListSkeleton />;

  return <ProductList products={data.content} isMobile={isMobile} />;
}
