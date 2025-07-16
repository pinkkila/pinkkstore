import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function CartLogo() {
  return (
    <Button size="lg" className="rounded-3xl" asChild>
      <Link href={"/cart"}><ShoppingCart className="!size-6"/></Link>
    </Button>
  );
}
