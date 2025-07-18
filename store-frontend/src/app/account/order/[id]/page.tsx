import OrderPageClient from "@/components/order-page-client";

type OrderPageProps = {
  params: Promise<{ id: string }>;
}

export default async function OrderPage({ params }: OrderPageProps) {
  const id = (await params).id;

  return (
    <main>
     <OrderPageClient orderId={id} />
    </main>
  );
}
