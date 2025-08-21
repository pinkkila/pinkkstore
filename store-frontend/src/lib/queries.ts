import { TProduct, TProductsPage, TProductWithCategoryName } from "@/lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type GetProductsParams = {
  categoryName?: string;
  priceRange?: [number, number];
  page: number;
  size?: number;
  sortBy?: string;
}

export const getProducts = async ({categoryName, priceRange, page, size = 10, sortBy = "popularity,desc"} :GetProductsParams): Promise<TProductsPage> => {
  console.log("Fetching on", typeof window === "undefined" ? "SERVER" : "CLIENT");

  const params = new URLSearchParams();

  if (categoryName) {
    params.set("categoryName", categoryName);
  }

  if (priceRange && (priceRange[0] !== 0 || priceRange[1] !== 100)) {
    const [minPrice, maxPrice] = priceRange;
    params.set("minPrice", minPrice.toString());
    params.set("maxPrice", maxPrice.toString());
  }

  params.set("page", page.toString());
  params.set("size", size.toString());
  params.set("sort", sortBy);

  const response = await fetch(
    `${API_URL}/products?${params.toString()}`,
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

export async function getProduct(productId: string): Promise<TProductWithCategoryName> {
  console.log("Fetching on", typeof window === "undefined" ? "SERVER" : "CLIENT");

  const response = await fetch(`${API_URL}/products/${productId}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}