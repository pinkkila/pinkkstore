"use client"

import { Button } from "@/components/ui/button";
import { getCsrfToken } from "@/lib/utils";

export default function TestNewCart() {
  const newCartRequest = {
    productQty: 200,
    productId: 99,
  }

  const handleOnClick = async () => {
    const csrfToken = getCsrfToken()

    try {
      const response = await fetch("http://127.0.0.1:8080/carts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(csrfToken ? { "X-XSRF-TOKEN": csrfToken } : {}),
        },
        credentials: "include",
        body: JSON.stringify(newCartRequest),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Button onClick={handleOnClick}>new cart test</Button>
  );
}
