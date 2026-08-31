import { Metadata } from "next";
import { KitBuilder } from "@/components/KitBuilder";
export const metadata: Metadata = { title: "Собрать комплект", description: "Конфигуратор маршрута и demo-набор снаряжения WAYPOINT." };
export default function KitPage() { return <KitBuilder />; }
