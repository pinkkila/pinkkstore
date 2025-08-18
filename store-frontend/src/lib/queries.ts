import { TProductsPage } from "@/lib/types";

// const API_URL = process.env.API_URL;

export  const getProducts = async (categoryName:string, endpointParams: string): Promise<TProductsPage> => {
  const response = await fetch(
    // `http://127.0.0.1:8070/api/products/categories/${categoryName}${endpointParams}`,
    // `${API_URL}/products/categories/${categoryName}${endpointParams}`,
    `/api/products/categories/${categoryName}${endpointParams}`,
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}