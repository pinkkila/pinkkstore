import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

export default function ProductCategories() {
  return (
    <section className="felx flex-col mt-20 w-5/6 ">
      <h2 className="text-2xl font-bold">Product Categories</h2>
      <div className="flex mt-5 gap-10 flex-col md:flex-row">
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
};

function CategoriesCard({ categoryName, categoryDesc, categoryImageUrl }: CategoryPageProps) {
  return (
    <Link href={`/categories/${categoryName.toLowerCase()}`}>
      <Card className="bg-transparent">
        <CardContent className="flex">
          <Image
            className="rounded-md"
            src={categoryImageUrl}
            alt={`${categoryName} category image`}
            width={80}
            height={80}
          />
          <div>
            <h3>{categoryName}</h3>
            <p>{categoryDesc}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
