import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCsrfToken(): string | null {
  if (typeof document === "undefined") {
    return null;
  }
  const match = document.cookie.match(/(?:^|;\s*)XSRF-TOKEN=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "Invalid date";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Todo: Fix this and use in product-list-fetcher
export function buildParams({
  sortBy,
  minPrice,
  maxPrice,
  page = 0,
  size = 10,
}: {
  sortBy: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  size?: number;
}): string {
  const params = new URLSearchParams({
    page: String(page),
    size: String(size),
    sort: sortBy,
  });

  if (minPrice !== undefined) {
    params.set("minPrice", String(minPrice));
  }
  if (maxPrice !== undefined) {
    params.set("maxPrice", String(maxPrice));
  }

  return params.toString(); // e.g. "page=0&size=10&sort=popularity,desc&minPrice=10&maxPrice=90"
}
