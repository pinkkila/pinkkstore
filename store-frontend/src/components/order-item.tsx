import { TOrderItem } from "@/lib/types";
import { cn } from "@/lib/utils";

type OrderItemProps = {
  item: TOrderItem;
  className?: string;
};

export default function OrderItem({ item, className }: OrderItemProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <h3 className="text-lg">Items productName</h3>
      <div className="flex items-center justify-between">
        <div className="">
          <p className="text-sm text-muted-foreground">ITEM ID</p>
          <p className="text-sm">{item.productPrice}</p>
        </div>
        <div className="">
          <p className="text-sm text-muted-foreground">UNIT PRICE</p>
          <p className="text-sm">{item.productPrice}</p>
        </div>
        <div className="">
          <p className="text-sm text-muted-foreground">QUANTITY</p>
          <p className="text-sm">{item.productQty}</p>
        </div>
        <div className="">
          <p className="text-sm text-muted-foreground">TOTAL PRICE</p>
          <p className="text-sm">{item.productPrice * item.productQty}</p>
        </div>
      </div>
    </div>
  );
}
