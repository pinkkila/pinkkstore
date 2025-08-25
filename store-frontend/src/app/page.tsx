import AdCarousel from "@/components/ad-carousel";
import ProductCategories from "@/components/product-categories";
import AdCarouselTwo from "@/components/ad-carousel-two";

export default function Home() {
  return (
    <main className="flex flex-col items-center gap-8">
      <div className="text-center">
        <h1 className="text-3xl lg:text-5xl font-bold">
          Welcome to <span className="text-fuchsia-500">PinkkStore</span>
        </h1>
        <p className="text-lg lg:text-2xl opacity-75">
          We have Amazing AI generated pictures.
        </p>
      </div>
      {/*<AdCarousel className="" />*/}
      <AdCarouselTwo />
      <ProductCategories className="" />
    </main>
  );
}
