import AddCarousel from "@/components/add-carousel";
import ProductCategories from "@/components/product-categories";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center mt-15">
      <h1 className="text-3xl lg:text-5xl font-bold">
        Welcome to <span className="text-fuchsia-500">PinkkStore</span>
      </h1>
      <AddCarousel/>
      <ProductCategories/>
    </main>
  );
}
