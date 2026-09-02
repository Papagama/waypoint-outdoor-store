import { Product } from "@/types/store";

type ProductVisualProps = {
  product: Product;
  view?: number;
  className?: string;
  decorative?: boolean;
};

export function ProductVisual({ product, view = 0, className = "", decorative = false }: ProductVisualProps) {
  const image = product.gallery[view] ?? product.gallery[0];
  return <span
    aria-hidden={decorative || undefined}
    aria-label={decorative ? undefined : image.alt}
    className={`product-visual ${className}`}
    role={decorative ? undefined : "img"}
    style={{ backgroundImage: `url("${image.src}")`, backgroundPosition: image.position }}
  />;
}
