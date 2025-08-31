import OrderList from "@/components/order-list";
import ApiErrorBoundary from "@/components/error/api-error-boundary";

export default function Page() {
  return (
    <main>
      <ApiErrorBoundary>
        <OrderList />
      </ApiErrorBoundary>
    </main>
  );
}
