import { notFound, redirect } from "next/navigation";

const categories: Record<string, string> = {
  tents: "Shelter", sleep: "Sleep", backpacks: "Carry", cook: "Cook", light: "Light", camp: "Camp", navigate: "Navigate", essentials: "Essentials",
};

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = categories[params.category];
  if (!category) notFound();
  redirect(`/catalog?category=${category}`);
}
