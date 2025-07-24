import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function ProductCategories() {
  return (
    <section className="felx flex-col mt-20">
      <h2 className="text-2xl font-bold">Product Categories</h2>

      <div className="flex flex-col lg:flex-row gap-5 justify-between mt-5">
        <CategoriesCard
          categoryName="Pictures"
          categoryDesc="Amazing AI generated Pics."
          categoryImageUrl="/images/pictures-category.jpg"
        />
        <CategoriesCard
          categoryName="Poets"
          categoryDesc="Poets from AI world."
          categoryImageUrl="/images/poets-category.jpg"
        />
        <CategoriesCard
          categoryName="Short Novels"
          categoryDesc="Stories that might suprise you."
          categoryImageUrl="/images/novels-category.jpg"
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
      <Card className={cn("bg-transparent h-30 w-88 md:w-72 xl:w-96", className)}>
        <CardContent className="flex">
          <Image
            className="rounded-md object-cover"
            src={categoryImageUrl}
            alt={`${categoryName} category image`}
            width={80}
            height={80}
          />
          <div className="px-3">
            <h3 className="text-lg font-semibold">{categoryName}</h3>
            <p className="text-sm text-muted-foreground">{categoryDesc}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
