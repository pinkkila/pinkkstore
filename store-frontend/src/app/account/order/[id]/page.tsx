import OrderPageClient from "@/components/order-page-client";
import ApiErrorBoundary from "@/components/error/api-error-boundary";

type OrderPageProps = {
  params: Promise<{ id: string }>;
};

export default async function OrderPage({ params }: OrderPageProps) {
  const id = (await params).id;

  return (
    <main className="flex justify-center items-center">
      <ApiErrorBoundary>
        <OrderPageClient orderId={id} className="mt-30" />
      </ApiErrorBoundary>
    </main>
  );
}
