"use client";

import { useEffect, useState } from "react";
import { TOrder } from "@/lib/types";
import OrderPageView from "@/components/order-page-view";

type OrderDetailsProps = {
  orderId: string;
};

export default function OrderPageClient({ orderId }: OrderDetailsProps) {
  const [order, setOrder] = useState<TOrder | undefined>();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8080/orders/${orderId}`, {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        setOrder(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchOrder();
  }, [orderId]);

  return <div>
    {order && (
     <OrderPageView order={order} />
    )}
  </div>;
}
