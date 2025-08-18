import CategoryProductList from "@/components/category-product-list";
// import { Suspense } from "react";
// import Loading from "@/app/categories/[name]/loading";
import ApiErrorBoundary from "@/components/error/api-error-boundary";
import { HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getProducts } from "@/lib/queries";
import { dehydrate } from "@tanstack/query-core";

type CategoriesPageProps = {
  params: Promise<{ name: string }>;
};

export default async function CategoriesPage({ params }: CategoriesPageProps) {
  const categoryName = (await params).name;

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["products", categoryName, { sortBy: "popularity,desc", priceRange: [0,100] }],
    queryFn: () => getProducts(categoryName, "?page=0&size=10&sort=popularity,desc"),
  })

  return (
    <main>
      <ApiErrorBoundary>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <CategoryProductList categoryName={categoryName} />
        </HydrationBoundary>
      </ApiErrorBoundary>
    </main>
  );
}
