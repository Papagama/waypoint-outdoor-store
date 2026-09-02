"use client";

import Link from "next/link";
import { ArrowUpRight, Heart, Plus } from "lucide-react";
import { Product } from "@/types/store";
import { formatPrice } from "@/lib/format";
import { categoryName } from "@/lib/localize";
import { useShop } from "@/context/ShopContext";
import { ProductVisual } from "@/components/ProductVisual";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { addProduct, favorites, toggleFavorite } = useShop();
  const isFavorite = favorites.includes(product.id);

  return <article className="product-card">
    <Link className="product-image" href={`/product/${product.slug}`} aria-label={`Открыть карточку ${product.name}`} prefetch={priority}>
      <ProductVisual product={product} decorative />
      {product.stock !== "in" && <span className={`stock-chip ${product.stock}`}>{product.stock === "out" ? "Нет в наличии" : "Мало"}</span>}
      <span className="product-open" aria-hidden="true"><ArrowUpRight size={16} /></span>
    </Link>
    <div className="product-info">
      <div className="product-title">
        <div><p>{categoryName(product.category)}</p><Link href={`/product/${product.slug}`}><h3>{product.name}</h3></Link></div>
        <button className={`heart-button ${isFavorite ? "is-active" : ""}`} aria-label={isFavorite ? "Удалить из избранного" : "Добавить в избранное"} onClick={() => toggleFavorite(product.id)}><Heart size={18} fill={isFavorite ? "currentColor" : "none"} /></button>
      </div>
      <p className="product-description">{product.shortDescription}</p>
      <div className="product-bottom">
        <span className="price">{formatPrice(product.price)} {product.previousPrice && <del>{formatPrice(product.previousPrice)}</del>}</span>
        <div className="product-actions">
          <Link className="product-details-link" href={`/product/${product.slug}`}>Подробнее</Link>
          <button disabled={product.stock === "out"} className="quick-add" onClick={() => addProduct(product)}>{product.stock === "out" ? "Нет" : <><Plus size={15} /> В корзину</>}</button>
        </div>
      </div>
    </div>
  </article>;
}
