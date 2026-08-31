import { notFound } from "next/navigation";
import CategoryRedirect from "@/components/CategoryRedirect";

const categories: Record<string, string> = {
  tents: "Shelter", sleep: "Sleep", backpacks: "Carry", cook: "Cook", light: "Light", camp: "Camp", navigate: "Navigate", essentials: "Essentials",
};

export function generateStaticParams() {
  return Object.keys(categories).map((category) => ({ category }));
}

export const dynamicParams = false;

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = categories[params.category];
  if (!category) notFound();
  return <CategoryRedirect category={category} />;
}