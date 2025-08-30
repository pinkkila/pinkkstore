import CheckoutPageClient from "@/components/checkout-page-client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Page() {
  return (
    <main className="max-w-5xl mx-auto space-y-4 md:space-y-6">
        <Link href="/cart" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" />
          Back to Cart
        </Link>
        <header>
          <h1 className="text-4xl font-bold">Checkout</h1>
          <p className="text-lg text-muted-foreground">Review your order before confirming</p>
        </header>

        <section>
          <h2 className="text-2xl font-semibold">Your Order</h2>
          <CheckoutPageClient />
        </section>
    </main>
  );
}
