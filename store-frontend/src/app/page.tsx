import AddCarousel from "@/components/add-carousel";
import ProductCategories from "@/components/product-categories";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center mt-15">
      <h1 className="text-3xl lg:text-5xl font-bold">
        Welcome to <span className="text-fuchsia-500">PinkkStore</span>
      </h1>
      <p className="mt-4 mb-4 text-xl lg:text-2xl opacity-75">
        We have Amazing AI generated pictures.
      </p>
      <AddCarousel className="mt-10"/>
      <ProductCategories className="my-20" />
    </main>
  );
}
