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
    <main>
      <ApiErrorBoundary>
        <Suspense fallback={<Loading />}>
          <ProductPageClient productId={id} />
        </Suspense>
      </ApiErrorBoundary>
    </main>
  );
}
