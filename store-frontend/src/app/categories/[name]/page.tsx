import CategoriesPageClient from "@/components/categories-page-client";
import { HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getProducts } from "@/lib/queries";
import { dehydrate } from "@tanstack/query-core";
import Breadcrumps from "@/components/breadcrumps";
import { capitalize } from "@/lib/utils";
import React from "react";

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
      <Breadcrumps crumps={[]} currentPage={capitalize(categoryName)} />
      <h1 className="text-4xl font-bold md:mb-6">{capitalize(categoryName)}</h1>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <CategoriesPageClient categoryName={categoryName} />
        </HydrationBoundary>
    </main>
  );
}
