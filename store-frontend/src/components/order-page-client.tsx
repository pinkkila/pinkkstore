"use client";

import { formatDate } from "@/lib/utils";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getOrder } from "@/lib/queries";
import Breadcrumps from "@/components/breadcrumps";
import Image from "next/image";

type OrderPageClientProps = {
  orderId: string;
};

export default function OrderPageClient({ orderId }: OrderPageClientProps) {
  const { data: order } = useSuspenseQuery({
    queryFn: () => getOrder(orderId),
    queryKey: ["order", +orderId],
  });

  const formattedOrderDate = order ? formatDate(order.orderDate) : "";

  return (
    <>
      <Breadcrumps
        crumps={[
          { name: "Account", path: "/account" },
          { name: "Orders", path: "/account/orders" },
        ]}
        currentPage={`Your order ${formattedOrderDate}`}
      />
      <div className="mt-4">
        <h1 className="text-3xl font-bold">Your order {formattedOrderDate}</h1>

        <Separator />

        <div className="flex flex-col gap-1">
          <ul>
            {order.orderItems.map((orderItem) => (
              <li key={orderItem.orderItemId}>
                <Image
                  className="rounded-md"
                  src={orderItem.imageUrl}
                  alt={`${orderItem.productName} image`}
                  width={80}
                  height={80}
                />
              </li>
            ))}
          </ul>
        </div>

{/*        <Card>*/}
{/*          <CardHeader>*/}
{/*            <CardTitle className="text-3xl">*/}
{/*              Order from {formattedOrderDate}*/}
{/*            </CardTitle>*/}
{/*          </CardHeader>*/}
{/*          <CardContent>*/}
{/*            <div>*/}
{/*              <ul>*/}
{/*                /!*<li>Total price: {order.totalPrice} coins</li>*!/*/}
{/*                <li>Order ID: {order.id}</li>*/}
{/*                <li>Customer name: {order.appUsername}</li>*/}
{/*                /!*<li>Order Date: {formatDate(order.orderDate)}</li>*!/*/}
{/*              </ul>*/}
{/*            </div>*/}
{/*            <Separator className="my-4" />*/}
{/*            <div>*/}
{/*              <ul>*/}
{/*                {order.orderItems.map((item) => (*/}
{/*                  <li key={item.id}>*/}
{/*                    <OrderItem item={item} className="py-1.5" />*/}
{/*                  </li>*/}
{/*                ))}*/}
{/*              </ul>*/}
{/*            </div>*/}
{/*            <Separator className="my-4" />*/}
{/*            <p className="text-lg">Total price: {order.totalPrice} coins</p>*/}
{/*          </CardContent>*/}
{/*        </Card>*/}
      </div>
    </>
  );
}

{/*type OrderItemProps = {*/}
{/*  item: TOrderItem;*/}
{/*  className?: string;*/}
{/*};*/}

{/*function OrderItem({ item, className }: OrderItemProps) {*/}
{/*  return (*/}
{/*    <div className={cn("flex flex-col", className)}>*/}
{/*      <h3 className="text-lg">Items productName</h3>*/}
{/*      <div className="flex items-center justify-between">*/}
{/*        <div className="">*/}
{/*          <p className="text-sm text-muted-foreground">ITEM ID</p>*/}
{/*          <p className="text-sm">{item.productId}</p>*/}
{/*        </div>*/}
{/*        <div className="">*/}
{/*          <p className="text-sm text-muted-foreground">UNIT PRICE</p>*/}
{/*          <p className="text-sm">{item.productPrice}</p>*/}
{/*        </div>*/}
{/*        <div className="">*/}
{/*          <p className="text-sm text-muted-foreground">QUANTITY</p>*/}
{/*          <p className="text-sm">{item.productQty}</p>*/}
{/*        </div>*/}
{/*        <div className="">*/}
{/*          <p className="text-sm text-muted-foreground">TOTAL PRICE</p>*/}
{/*          <p className="text-sm">{item.productPrice * item.productQty}</p>*/}
{/*        </div>*/}
{/*      </div>*/}
{/*    </div>*/}
{/*  );*/}
{/*}*/}
