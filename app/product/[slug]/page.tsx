import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/ProductDetail";
import { getProduct, products } from "@/lib/products";

export function generateStaticParams() { return products.map((product) => ({ slug: product.slug })); }
export const dynamicParams = false;
export function generateMetadata({ params }: { params: { slug: string } }): Metadata { const product = getProduct(params.slug); return product ? { title: product.name, description: product.shortDescription } : {}; }
export default function ProductPage({ params }: { params: { slug: string } }) { const product = getProduct(params.slug); if (!product) notFound(); return <ProductDetail product={product} />; }
