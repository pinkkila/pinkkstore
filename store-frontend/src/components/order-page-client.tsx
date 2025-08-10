"use client";

import { useEffect, useState } from "react";
import { TOrder } from "@/lib/types";
import { cn, formatDate } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import OrderItem from "@/components/order-item";

type OrderPageClientProps = {
  orderId: string;
  className?: string;
};

export default function OrderPageClient({ orderId, className}: OrderPageClientProps) {
  const [order, setOrder] = useState<TOrder | undefined>();
  const formattedOrderDate = order ? formatDate(order.orderDate) : "";

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(
          // `http://127.0.0.1:8080/orders/${orderId}`,
          `/api/orders/${orderId}`,
          {
            credentials: "include",
          },
        );
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

  return (
    <>
      {order && (
          <Card className={cn("w-full max-w-2xl", className)}>
            <CardHeader>
              <CardTitle className="text-3xl">
                Order from {formattedOrderDate}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <ul>
                  {/*<li>Total price: {order.totalPrice} coins</li>*/}
                  <li>Order ID: {order.id}</li>
                  <li>Customer name: {order.appUsername}</li>
                  {/*<li>Order Date: {formatDate(order.orderDate)}</li>*/}
                </ul>
              </div>
              <Separator className="my-4" />
              <div>
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item.id}>
                      <OrderItem item={item} className="py-1.5" />
                    </li>
                  ))}
                </ul>
              </div>
              <Separator className="my-4" />
              <p className="text-lg">Total price: {order.totalPrice} coins</p>
            </CardContent>
          </Card>
      )}
    </>
  );
}
