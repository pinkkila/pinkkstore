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
        currentPage={`Order ${formattedOrderDate}`}
      />
      <div className="space-y-4 mt-8">
        <h1 className="text-3xl font-bold text-center">
          Your order from {formattedOrderDate}
        </h1>

        <h2 className="text-2xl font-bold">Ordered Items</h2>

        <Separator />

        <ul className="space-y-4">
          {order.orderItems.map((orderItem) => (
            <li key={orderItem.orderItemId} className="space-y-2">
              <div className="flex items-center gap-4 md:gap-10">
                <Image
                  className="rounded-md"
                  src={orderItem.imageUrl}
                  alt={`${orderItem.productName} image`}
                  width={80}
                  height={80}
                />
                <div className="flex flex-col lg:flex-row gap-1 lg:w-2/3 xl:w-2/5 lg:justify-between">
                  <p className="text-xl font-bold ">{orderItem.productName}</p>

                  <div className="flex gap-5 md:gap-10">
                    <div className="flex flex-col">
                      <span className="text-muted-foreground text-sm">
                        QUANTITY
                      </span>
                      <span>{orderItem.productQty}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-muted-foreground text-sm">
                        UNIT PRICE
                      </span>
                      <span>{orderItem.productOrderPrice}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-muted-foreground text-sm">
                        TOTAL PRICE
                      </span>
                      <span>
                        {(
                          orderItem.productOrderPrice * orderItem.productQty
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <Separator />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
