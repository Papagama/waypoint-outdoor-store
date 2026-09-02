import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/ProductDetail";
import { getProduct, products } from "@/lib/products";

type ProductPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return products.map((product) => ({ slug: product.slug })); }
export const dynamicParams = false;
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> { const { slug } = await params; const product = getProduct(slug); return product ? { title: product.name, description: product.shortDescription } : {}; }
export default async function ProductPage({ params }: ProductPageProps) { const { slug } = await params; const product = getProduct(slug); if (!product) notFound(); return <ProductDetail product={product} />; }
