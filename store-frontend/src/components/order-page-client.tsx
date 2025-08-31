"use client";

import { cn, formatDate } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getOrder } from "@/lib/queries";
import OrderItem from "@/components/order-item";
import Breadcrumps from "@/components/breadcrumps";

type OrderPageClientProps = {
  orderId: string;
  className?: string;
};

export default function OrderPageClient({
  orderId,
  className,
}: OrderPageClientProps) {

  const { data: order } = useSuspenseQuery({
    queryFn: () => getOrder(orderId),
    queryKey: ["order", +orderId],
  });

  const formattedOrderDate = order ? formatDate(order.orderDate) : "";

  return (
    <>
      <Breadcrumps crumps={[{name: "Account", path: "/account"},{name: "Orders", path: "/account/orders"}]} currentPage={`Your order ${formattedOrderDate}`} />
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
    </Card></>
  );
}
