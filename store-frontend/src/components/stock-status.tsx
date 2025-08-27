import { Check, X } from "lucide-react";

type StockStatusProps = {
  inStock: boolean;
  withIcon: boolean;
};

export default function StockStatus({ inStock, withIcon }: StockStatusProps) {
  return (
    <div
      className={`flex gap-2 ${inStock ? "text-green-500" : "text-red-700"}`}
    >
      {withIcon && (inStock ? <Check /> : <X />)}
      <p>{inStock ? "In Stock" : "Not in Stock"}</p>
    </div>
  );
}
