import { TCart, TCartRequest, TProductDetailsSmall, TProductsPage, TProductWithCategoryName } from "@/lib/types";
import { getCsrfToken } from "@/lib/utils";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type GetProductsParams = {
  categoryName?: string;
  priceRange?: [number, number];
  page: number;
  size?: number;
  sortBy?: string;
}

export async function getProducts({categoryName, priceRange, page, size = 10, sortBy = "popularity,desc"} :GetProductsParams): Promise<TProductsPage> {
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
    `${API_URL}/api/products?${params.toString()}`,
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

export async function getProduct(productId: string): Promise<TProductWithCategoryName> {
  console.log("Fetching on", typeof window === "undefined" ? "SERVER" : "CLIENT");

  const response = await fetch(`${API_URL}/api/products/${productId}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

export async function getProductDetailsSmall(productId: number): Promise<TProductDetailsSmall> {
  console.log("Fetching on", typeof window === "undefined" ? "SERVER" : "CLIENT");

  const response = await fetch(`${API_URL}/api/products/details/${productId}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

export async function getUserinfo(): Promise<{ sub: string }> {
  console.log("Fetching on", typeof window === "undefined" ? "SERVER" : "CLIENT");

  const response = await fetch(`${API_URL}/bff/userinfo`, { credentials: "include" });
  if (!response.ok) {
    throw new Error(`Not authenticated. ${response.statusText}`);
  }
  return await response.json();
}

export async function logoutRequest() {
  const csrfToken = getCsrfToken();
  await fetch(`${API_URL}/bff/logout`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(csrfToken ? { "X-XSRF-TOKEN": csrfToken } : {}),
    },
  });
}

export async function getCart(): Promise<TCart> {
  const response = await fetch("/api/carts", {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

export async function putCart(cartRequest: TCartRequest): Promise<TCart> {
  const csrfToken = getCsrfToken();

  const response = await fetch("/api/carts", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(csrfToken ? { "X-XSRF-TOKEN": csrfToken } : {}),
    },
    credentials: "include",
    body: JSON.stringify(cartRequest),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}