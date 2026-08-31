import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ShopProvider } from "@/context/ShopContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://waypoint.example"),
  title: { default: "WAYPOINT — Equipment for the way ahead", template: "%s — WAYPOINT" },
  description: "Draft интернет-магазина функционального outdoor-снаряжения WAYPOINT.",
  alternates: { canonical: "/" },
  openGraph: { title: "WAYPOINT — Equipment for the way ahead", description: "Premium outdoor gear for the next point on your route.", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body><ShopProvider><Header />{children}<Footer /></ShopProvider></body></html>;
}
