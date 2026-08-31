import { Metadata } from "next";
import { CatalogExperience } from "@/components/CatalogExperience";
export const metadata: Metadata = { title: "Каталог", description: "Демо-каталог WAYPOINT: палатки, рюкзаки, свет, кухня и предметы для маршрута." };
export default function CatalogPage() { return <CatalogExperience />; }
