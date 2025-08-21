import CategoriesPageClient from "@/components/categories-page-client";
import { HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { dehydrate } from "@tanstack/query-core";
import Breadcrumps from "@/components/breadcrumps";
import { capitalize } from "@/lib/utils";
import React from "react";
import { createProductsByCategoryQueryOptions } from "@/lib/query-options";

type CategoriesPageProps = {
  params: Promise<{ name: string }>;
};

export default async function CategoriesPage({ params }: CategoriesPageProps) {
  const categoryName = (await params).name;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    createProductsByCategoryQueryOptions({
      categoryName,
      priceRange: [0, 100],
      page: 0,
      size: 10,
      sortBy: "popularity,desc",
    }),
  );

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
