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

type AdCarouselProps = {
  className?: string;
};

const images = [
  { src: "/images/banana.jpg", alt: "banana picture" },
  { src: "/images/dog.jpg", alt: "dog picture" },
  { src: "/images/spring.jpg", alt: "spring picture" },
  { src: "/images/orange.jpg", alt: "orange picture" },
  { src: "/images/desert.jpg", alt: "desert picture" },
];

export default function AdCarouselTwo({ className }: AdCarouselProps) {
  return (
    <section className={cn("w-[100%] md:w-full group md:px-16", className)}>
      <Carousel
        opts={{ align: "start", loop: true }}
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
      >
        <CarouselContent>
          {images.map((img, index) => (
            <CarouselItem key={img.src} className="md:basis-1/2 lg:basis-1/3">
              <Card className="p-0">
                <CardContent className="relative aspect-square">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 640px) 100vw,
                             (max-width: 1024px) 90vw,
                             33vw"
                      className="object-cover rounded-md"
                    />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="invisible md:group-hover:visible duration-200" />
        <CarouselNext className="invisible md:group-hover:visible duration-200" />
      </Carousel>
    </section>
  );
}
