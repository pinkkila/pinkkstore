"use client"

import { getCsrfToken } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function TestUpdateCart() {
  const cartUpdateRequest = {
    productQty: -10,
    productId: 99,
  }

  const handleOnClick = async () => {
    const csrfToken = getCsrfToken()

    try {
      const response = await fetch("/api/carts", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(csrfToken ? { "X-XSRF-TOKEN": csrfToken } : {}),
        },
        credentials: "include",
        body: JSON.stringify(cartUpdateRequest),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Button onClick={handleOnClick}> test update cart</Button>
  );
}
