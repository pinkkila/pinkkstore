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
  const aspectRatio = "1/1"

  return (
    <section className={cn("md:w-full group md:px-16", className)}>
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
              <Card className="relative">
                <CardContent className="p-0">
                  <div className="relative w-full" style={{ aspectRatio }}>
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 768px) 100vw,
                             (max-width: 1200px) 100vw,
                             100vw"
                      className="object-cover rounded-md"
                    />
                  </div>
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
