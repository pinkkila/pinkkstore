import CheckoutPageClient from "@/components/checkout-page-client";
import Link from "next/link";

export default function Page() {
  return (
    <main className="py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/cart"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center mb-4"
        >
          Back to Cart
        </Link>
        <header className="mb-10 text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Checkout</h1>
          <p className="text-lg text-muted-foreground">Review your order before confirming</p>
        </header>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Your Order</h2>
          <CheckoutPageClient />
        </section>
      </div>
    </main>
  );
}
