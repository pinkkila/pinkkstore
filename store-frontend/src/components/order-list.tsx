"use client";

import { TOrder } from "@/lib/types";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function OrderList() {
  const [orders, setOrders] = useState<TOrder[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`/api/orders`, {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        setOrders(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchOrders();
  }, []);

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
