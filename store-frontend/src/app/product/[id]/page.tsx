import ProductPageClient from "@/components/product-page-client";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const id = (await params).id;

  return (
    <main className="flex justify-center">
      <ProductPageClient productId={id} className="my-8 max-w-10/12" />
    </main>
  );
}
