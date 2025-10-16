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
import Link from "next/link";

type AdCarouselProps = {
  className?: string;
};

const images = [
  {
    src: "/images/carousel/banana-16-9.jpg",
    alt: "banana picture",
    title: "Fresh Banana 19.95",
    positionClassName: "absolute top-0 left-2",
    titleClassName:
      "text-black text-2xl md:text-xl lg:text-2xl font-semibold p-3",
    link: "/product/99",
  },
  {
    src: "/images/carousel/dog-16-9.jpg",
    alt: "dog picture",
    title: "Animal AI pictures starting at 9.99",
    positionClassName:
      "absolute bottom-3 left-13 bg-gradient-to-t from-black/10 via-black/50 to-transparent rounded-3xl ",
    titleClassName: "text-white text-xl md:text-lg font-semibold p-3",
    link: "/product/101",
  },
  {
    src: "/images/carousel/spring-16-9.jpg",
    alt: "spring picture",
    title: "Spring collection 2025",
    positionClassName:
      "absolute bottom-5 left-1 bg-gradient-to-t from-black/3 via-black/50 to-transparent rounded-xl",
    titleClassName: "text-white text-2xl md:text-xl lg:text-3xl font-bold p-4",
    link: "/product/105",
  },
  {
    src: "/images/carousel/orange-16-9.jpg",
    alt: "orange picture",
    title: "Sweet Orange from AI world",
    positionClassName: "absolute -top-3 left-10",
    titleClassName: "text-white text-2xl lg:text-2xl font-semibold p-3",
    link: "/product/100",
  },
  {
    src: "/images/carousel/desert-16-9.jpg",
    alt: "desert picture",
    title: "Travel to the Desert AI experience",
    positionClassName: "absolute",
    titleClassName:
      "text-black text-2xl md:text-xl lg:text-2xl font-semibold p-3",
    link: "/product/103",
  },
];

export default function AdCarousel({ className }: AdCarouselProps) {
  return (
    <section className={cn("w-full group overflow-hidden md:px-16", className)}>
      <Carousel
        opts={{ align: "start", loop: true }}
        plugins={[
          Autoplay({
            delay: 4000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent>
          {images.map((img, index) => (
            <CarouselItem key={img.src} className="md:basis-1/2 lg:basis-1/3 pl-3">
              <Card className="p-0">
                <Link href={img.link}>
                  <CardContent className="relative aspect-video">
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
                    <div className={img.positionClassName}>
                      <p className={img.titleClassName}>{img.title}</p>
                    </div>
                  </CardContent>
                </Link>
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
