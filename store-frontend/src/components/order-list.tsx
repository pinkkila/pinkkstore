"use client";

import Link from "next/link";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getOrders } from "@/lib/queries";

export default function OrderList() {

  const { data: orders } = useSuspenseQuery({
    queryFn: getOrders,
    queryKey: ["orders"]
  })

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
