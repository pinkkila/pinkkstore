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
import Image from "next/image";
import { cn } from "@/lib/utils";

type AddCarouselProps = {
  className?: string;
}

export default function AdCarousel({className}: AddCarouselProps) {
  return (
    <section className={cn("md:w-full group md:px-16", className)}>
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
            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
              <Card className="relative">
                <CardContent className="flex items-center justify-center h-50">
                  <Image priority={true} src="/images/banana.jpg" alt="banana picture" sizes="100vw" fill={true} className="object-cover rounded-md"/>
                </CardContent>
              </Card>
            </CarouselItem>

            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
              <Card className="relative">
                <CardContent className="flex items-center justify-center h-50">
                  <Image priority={true} src="/images/dog.jpg" alt="dog picture" fill={true} className="object-cover rounded-md"/>
                </CardContent>
              </Card>
            </CarouselItem>

            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
              <Card className="relative">
                <CardContent className="flex items-center justify-center h-50">
                  <Image priority={true} src="/images/spring.jpg" alt="spring picture" fill={true} className="object-cover rounded-md"/>
                </CardContent>
              </Card>
            </CarouselItem>

            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
              <Card className="relative">
                <CardContent className="flex items-center justify-center h-50">
                  <Image priority={true} src="/images/orange.jpg" alt="orange picture" fill={true} className="object-cover rounded-md"/>
                </CardContent>
              </Card>
            </CarouselItem>

            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
              <Card className="relative">
                <CardContent className="flex items-center justify-center h-50">
                  <Image priority={true} src="/images/desert.jpg" alt="desert picture" fill={true} className="object-cover rounded-md"/>
                </CardContent>
              </Card>
            </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="invisible md:group-hover:visible duration-200" />
        <CarouselNext className="invisible md:group-hover:visible duration-200" />
      </Carousel>
     </section>
  );
}
