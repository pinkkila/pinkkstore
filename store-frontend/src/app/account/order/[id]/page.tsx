import OrderPageClient from "@/components/order-page-client";

type OrderPageProps = {
  params: Promise<{ id: string }>;
}

export default async function OrderPage({ params }: OrderPageProps) {
  const id = (await params).id;

  return (
    <main className="flex justify-center items-center">
     <OrderPageClient orderId={id} className="mt-30" />
    </main>
  );
}
