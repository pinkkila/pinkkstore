import { TOrder } from "@/lib/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import OrderItem from "@/components/order-item";
import { formatDate } from "@/lib/utils";

type OrderPageViewProps = {
  order: TOrder;
};

export default function OrderPageView({ order }: OrderPageViewProps) {
  const formattedOrderDate = formatDate(order.orderDate)

  return (
    <section className="flex justify-center items-center mt-30">
      <Card className="w-full max-w-2xl">
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
              {order.orderItems.map(item => (
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
    </section>
  );
}
