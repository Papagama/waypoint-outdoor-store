import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ShopProvider } from "@/context/ShopContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://waypoint.example"),
  title: { default: "WAYPOINT — Снаряжение для вашего пути", template: "%s — WAYPOINT" },
  description: "Демонстрационный интернет-магазин функционального снаряжения WAYPOINT.",
  alternates: { canonical: "/" },
  openGraph: { title: "WAYPOINT — Снаряжение для вашего пути", description: "Функциональное снаряжение для следующей точки вашего маршрута.", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body><ShopProvider><Header />{children}<Footer /></ShopProvider></body></html>;
}
