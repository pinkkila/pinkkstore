import OrderDetails from "@/components/order-details";

type OrderPageProps = {
  params: Promise<{ id: string }>;
}

export default async function OrderPage({ params }: OrderPageProps) {
  const id = (await params).id;

  return (
    <main>
     <OrderDetails orderId={id} />
    </main>
  );
}
