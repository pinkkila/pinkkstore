import ProductPageClient from "@/components/product-page-client";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const id = (await params).id;

  return (
    <main className="">
      <ProductPageClient productId={id} className="mt-20" />
    </main>
  );
}
