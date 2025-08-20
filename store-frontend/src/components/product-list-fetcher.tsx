"use client"

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/queries";
import ProductList from "@/components/product-list";

type ProductListFetcherProps = {
  categoryName: string;
  sortBy: string;
  priceRange: [number, number];
  isMobile: boolean;
}

export default function ProductListFetcher({categoryName, sortBy, priceRange, isMobile}: ProductListFetcherProps) {
  const [minPrice, maxPrice] = priceRange;

  let endpointParams = `&page=0&size=10&sort=${sortBy}`;
  if (minPrice !== 0 || maxPrice !== 100) {
    endpointParams = `&minPrice=${minPrice}&maxPrice=${maxPrice}&page=0&size=10&sort=${sortBy}`;
  }

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["products", categoryName, { sortBy, priceRange }],
    queryFn: () => getProducts(categoryName, endpointParams),
  });

  if (isError) {
    throw new Error(`${error}`)
  }

  if (isPending) return <div>Loading products...</div>;

  return (
    <ProductList products={data.content} isMobile={isMobile} />
  );
}
