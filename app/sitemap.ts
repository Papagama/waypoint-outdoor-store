import type { MetadataRoute } from "next";
import { products } from "@/lib/products";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://papagama.github.io/waypoint-outdoor-store";
  return ["", "/catalog", "/kit", "/journal", ...products.map((product) => `/product/${product.slug}`)].map((path) => ({ url: `${base}${path}`, lastModified: new Date("2026-08-31") }));
}