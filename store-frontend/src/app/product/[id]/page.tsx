import ProductPageClient from "@/components/product-page-client";
import Loading from "@/app/product/[id]/loading";
import { Suspense } from "react";
import ApiErrorBoundary from "@/components/error/api-error-boundary";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const id = (await params).id;

  return (
    <main className="flex justify-center">
      <ApiErrorBoundary>
        <Suspense fallback={<Loading className="my-8 max-w-10/12" />}>
          <ProductPageClient productId={id} className="my-8 max-w-10/12" />
        </Suspense>
      </ApiErrorBoundary>
    </main>
  );
}
