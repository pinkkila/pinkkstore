import { queryOptions } from "@tanstack/react-query";
import { getProducts } from "@/lib/queries";

type TCreateProductsByCategoryQueryOptions = {
  categoryName: string;
  priceRange: [number, number];
  page: number;
  size: number;
  sortBy: string;
}

export function createProductsByCategoryQueryOptions({
  categoryName,
  priceRange,
  page,
  size,
  sortBy,
}: TCreateProductsByCategoryQueryOptions ) {
  return queryOptions({
    queryKey: ["products", { categoryName, sortBy, priceRange, page, size }],
    queryFn: () =>
      getProducts({
        categoryName,
        priceRange,
        page,
        size,
        sortBy,
      }),
  });
}
