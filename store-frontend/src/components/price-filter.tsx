import React from "react";
import { Slider } from "@/components/ui/slider";

type PriceFilterProps = {
  priceRange: [number, number];
  setPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>;
};

export default function PriceFilter({
  priceRange,
  setPriceRange,
}: PriceFilterProps) {
  return (
    <>
      <h3 className="text-2xl font-bold mb-2">Price</h3>
      <div className="flex justify-between mb-4">
        <p className="text-xl font-semibold">{priceRange[0]} coins</p>
        <p className="text-xl font-semibold">{priceRange[1]} coins</p>
      </div>
      <Slider
        value={priceRange}
        onValueChange={(value) => setPriceRange(value as [number, number])}
        min={0}
        max={100}
        step={5}
        minStepsBetweenThumbs={1}
      />
    </>
  );
}
