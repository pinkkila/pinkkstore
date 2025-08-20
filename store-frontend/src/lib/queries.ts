import { TProductsPage } from "@/lib/types";

// const API_URL = process.env.API_URL;

export  const getProducts = async (categoryName:string, endpointParams: string): Promise<TProductsPage> => {
  console.log("Fetching on", typeof window === "undefined" ? "SERVER" : "CLIENT");
  const response = await fetch(
    // `${API_URL}/products/categories/${categoryName}${endpointParams}`,
    `http://127.0.0.1:8070/api/products/categories/${categoryName}${endpointParams}`,
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}