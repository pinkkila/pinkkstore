import OrdersPageClient from "@/components/orders-page-client";
import ApiErrorBoundary from "@/components/error/api-error-boundary";
import Breadcrumps from "@/components/breadcrumps";

export default function Page() {
  return (
    <main className="space-y-6">
      <Breadcrumps crumps={[{name: "Account", path: "/account"}]} currentPage={"Orders"} />
      <h1 className="text-2xl">Your Orders</h1>
      <ApiErrorBoundary>
        <OrdersPageClient />
      </ApiErrorBoundary>
    </main>
  );
}
