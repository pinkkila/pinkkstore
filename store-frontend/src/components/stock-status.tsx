import { Check, X } from "lucide-react";

type StockStatusProps = {
  inStock: boolean;
  withIcon: boolean;
  textSmall: boolean;
};

export default function StockStatus({
  inStock,
  withIcon,
  textSmall,
}: StockStatusProps) {
  return (
    <div
      className={`flex gap-2 ${inStock ? "text-green-500" : "text-red-700"} ${textSmall && "text-sm"}`}
    >
      {withIcon && (inStock ? <Check /> : <X />)}
      <p>{inStock ? "In Stock" : "Not in Stock"}</p>
    </div>
  );
}
