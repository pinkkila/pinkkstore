import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function CartLogo() {
  return (
    <Button size="lg" className="rounded-3xl" asChild>
      {/*For some reason a size does not change https://github.com/shadcn-ui/ui/issues/6316*/}
      <Link href={"/cart"}><ShoppingCart className="!size-6"/></Link>
    </Button>
  );
}
