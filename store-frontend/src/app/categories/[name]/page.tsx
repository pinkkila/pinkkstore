import CategoryProductList from "@/components/category-product-list";

type CategoriesPageProps = {
  params: Promise<{ name: string }>;
};

export default async function CategoriesPage({ params }: CategoriesPageProps) {
  const categoryName = (await params).name;

  return (
    <main className="mt-10 mx-8">
      <CategoryProductList categoryName={categoryName} />
    </main>
  );
}
