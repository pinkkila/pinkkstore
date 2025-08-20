// import { queryOptions } from "@tanstack/react-query";
// import { getProducts } from "@/lib/queries";
//
// type TCreateProductsQueryOptions = {
//   categoryName: string;
//   sortBy: string;
//   priceRange: [number, number];
//   page?: number;
//   size?: number;
// }
//
// export function createProductsQueryOptions({
//   categoryName,
//   sortBy,
//   priceRange,
//   page = 0,
//   size = 10,
// }: TCreateProductsQueryOptions ) {
//   return queryOptions({
//     queryKey: ["products", categoryName, { sortBy, priceRange, page, size }],
//     queryFn: () =>
//       getProducts(categoryName, {
//         page,
//         size,
//         sort: sortBy,
//         minPrice: priceRange[0],
//         maxPrice: priceRange[1],
//       }),
//     staleTime: 60 * 1000, // good default for products
//   });
// }
