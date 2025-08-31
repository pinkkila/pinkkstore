"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/lib/queries";

export default function OrdersPageClient() {

  const { data: orders, isPending, isError, error } = useQuery({
    queryFn: getOrders,
    queryKey: ["orders"]
  })

  if (isPending) {
    return <div>Loading orders in the OrdersPageClient</div>;
  }

  if (isError) {
    throw new Error(`${error}`);
  }

  return (
    <div>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <Link href={`/account/order/${order.id}`}>Go to order. Order ID {order.id}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
