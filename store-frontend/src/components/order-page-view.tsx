import { TOrder } from "@/lib/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type OrderPageViewProps = {
  order: TOrder;
};

export default function OrderPageView({ order }: OrderPageViewProps) {
  return (
    <section className="flex justify-center items-center">
      {/*<div className="border border-zinc-200/30 rounded-md mt-4 w-1/2">*/}
      {/*  <h1 className="text-3xl pt-2 pl-2">*/}
      {/*    Order ID: <span className="font-semibold">{order.id} from {order.orderDate}</span>*/}
      {/*  </h1>*/}
      {/*  <p>Total price {order.totalPrice}</p>*/}
      {/*  <p>Order # {order.id}</p>*/}

      {/*</div>*/}

      <Card className="mt-6 w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl">
            Order #{order.id} –{" "}
            <span className="text-muted-foreground">{order.orderDate}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <ul>
              <li>Total price: {order.totalPrice} coins</li>
              <li>Order ID: {order.id}</li>
              <li>Order Date: {order.orderDate}</li>
            </ul>
          </div>
          <Separator className="my-4" />
          <div>
            <ul>
              {order.orderItems.map(item => (
                <li key={item.id}>Item ID: {item.id} X {item.productQty} Unit price: {item.productPrice} Total price: {item.productPrice * item.productQty}</li>
              ))}
            </ul>

          </div>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </section>
  );
}
