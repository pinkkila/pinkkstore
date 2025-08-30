"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useDebounce } from "@/hooks/use-debounce";
import BasicAccordion from "@/components/basic-accordion";
import PriceFilter from "@/components/price-filter";
import ProductListFetcher from "@/components/product-list-fetcher";
import ApiErrorBoundary from "@/components/error/api-error-boundary";

type CategoryProductsListProps = {
  categoryName: string;
};

export default function CategoriesPageClient({
  categoryName,
}: CategoryProductsListProps) {
  const [sortBy, setSortBy] = useState<string>("popularity,desc");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const debouncedPriceRange = useDebounce(priceRange, 1000);

  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="">
      <div className="flex flex-col md:flex-row justify-between">
        {isMobile && (
          <BasicAccordion title="Filters">
            <PriceFilter
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              className="w-[85%]"
            />
          </BasicAccordion>
        )}

        {!isMobile && <h2 className="text-xl font-semibold">Filters</h2>}

        <div className="flex items-center justify-end gap-2">
          <p className="font-semibold">Sort by:</p>
          <Select onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Popularity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity,desc">Popularity</SelectItem>
              <SelectItem value="price,asc">Price Low to High</SelectItem>
              <SelectItem value="price,desc">Price High to Low</SelectItem>
              <SelectItem value="productName">Product name</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        {!isMobile && (
          <section className="md:w-1/3">
              <PriceFilter
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                className="w-[80%] mb-4 md:mt-4 border-2 p-4 rounded-lg"
              />
          </section>
        )}

        <section className="md:w-2/3">
          <ApiErrorBoundary>
            <ProductListFetcher
              categoryName={categoryName}
              sortBy={sortBy}
              priceRange={debouncedPriceRange}
              isMobile={isMobile}
            />
          </ApiErrorBoundary>
        </section>
      </div>
    </div>
  );
}
