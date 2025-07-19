import { Card, CardContent } from "@/components/ui/card";

export default function ProductCategories() {
  return <section className="felx flex-col mt-20 w-5/6 ">
    <h2 className="text-2xl font-bold">Product Categories</h2>
    <div className="flex mt-5 gap-10 flex-col md:flex-row">
      <CategoriesCard categoryName="Pictures" categoryDesc="Amazing AI generated Pics." categoryImageUrl="ImageUrl"/>
      <CategoriesCard categoryName="Poets" categoryDesc="Poets from AI world." categoryImageUrl="ImageUrl"/>
      <CategoriesCard categoryName="Short Novels" categoryDesc="Stories that might suprise you." categoryImageUrl="ImageUrl"/>
    </div>
  </section>;
}

type CategoryPageProps = {
  categoryName: string;
  categoryDesc: string;
  categoryImageUrl: string;
}

function CategoriesCard({ categoryName, categoryDesc }: CategoryPageProps) {
  return (
    <Card className="bg-transparent">
      <CardContent className="flex">
        <p>image here</p>
        <div>
          <h3>{categoryName}</h3>
          <p>{categoryDesc}</p>
        </div>
      </CardContent>
    </Card>
  )

}