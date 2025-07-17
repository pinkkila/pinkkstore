import OrderPageClient from "@/components/order-page-client";

type OrderPageProps = {
  params: Promise<{ id: string }>;
}

export default async function OrderPage({ params }: OrderPageProps) {
  const id = (await params).id;

  return (
    <main className="">
     <OrderPageClient orderId={id} />
    </main>
  );
}
