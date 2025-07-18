"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function HomeCarousel() {
  return (
    <div className="mt-25 md:w-full group md:px-16">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className=""
        plugins={[
          Autoplay({
            delay: 2000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <Card>
                <CardContent className="flex items-center justify-center h-50">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="invisible md:group-hover:visible duration-200" />
        <CarouselNext className="invisible md:group-hover:visible duration-200" />
      </Carousel>
     </div>
  );
}
