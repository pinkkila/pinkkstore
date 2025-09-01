import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

type ProductCategoriesProps = {
  className?: string;
}

export default function AdCategories({className}: ProductCategoriesProps) {
  return (
    <section className={cn("flex flex-col", className)}>
      <h2 className="text-2xl font-bold">Product Categories</h2>

      <div className="flex flex-col lg:flex-row gap-5 justify-between items-center mt-5">
        <CategoriesCard
          categoryName="Fruits"
          categoryDesc="Amazing AI generated fruit pics."
          categoryImageUrl="/images/categories/fruits-category.jpg"
        />
        <CategoriesCard
          categoryName="Animals"
          categoryDesc="Animal pics are always funny."
          categoryImageUrl="/images/categories/animals-category.jpg"
        />
        <CategoriesCard
          categoryName="Nature"
          categoryDesc="Beautiful nature and landscapes."
          categoryImageUrl="/images/categories/nature-category.jpg"
        />
      </div>
    </section>
  );
}

type CategoryPageProps = {
  categoryName: string;
  categoryDesc: string;
  categoryImageUrl: string;
  className?: string;
};

function CategoriesCard({ categoryName, categoryDesc, categoryImageUrl, className}: CategoryPageProps) {
  return (
    <Link href={`/categories/${categoryName.toLowerCase()}`} >
      <Card className={cn("bg-transparent h-32 w-88 lg:w-72 xl:w-96", className)}>
        <CardContent className="flex items-center gap-4">
          <Image
            className="rounded-md object-cover"
            src={categoryImageUrl}
            alt={`${categoryName} category image`}
            width={80}
            height={80}
          />
          <div className="leading-tight">
            <h3 className="text-lg font-semibold">{categoryName}</h3>
            <p className="text-sm text-muted-foreground">{categoryDesc}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
