"use client";

import Link from "next/link";
import { ChevronDown, Heart, Minus, Plus, ShieldCheck, ShoppingBag, Star, Truck } from "lucide-react";
import { Product } from "@/types/store";
import { products } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { useShop } from "@/context/ShopContext";
import { ProductCard } from "@/components/ProductCard";
import { useState } from "react";

export function ProductDetail({ product }: { product: Product }) {
  const [color, setColor] = useState(product.colors[0]?.name ?? "Standard");
  const [quantity, setQuantity] = useState(1);
  const [openSpec, setOpenSpec] = useState<string | null>("details");
  const { addProduct, favorites, toggleFavorite } = useShop();
  const related = products.filter((item) => item.category !== product.category && item.stock !== "out").slice(0, 4);
  const add = () => { for (let index = 0; index < quantity; index += 1) addProduct(product, color); };
  return <main className="product-page">
    <div className="shell breadcrumb"><Link href="/catalog">Каталог</Link><span>/</span><Link href={`/catalog?category=${product.category}`}>{product.category}</Link><span>/</span><b>{product.name}</b></div>
    <section className="shell product-top"><div className="product-gallery"><div className="gallery-main"><img src={product.image} alt={product.alt} /></div><div className="gallery-detail gallery-detail-dark"><img src="/images/hero-route.png" alt="Походный лагерь в природном ландшафте" /></div><div className="gallery-detail"><img src="/images/field-kit.png" alt="Деталь походного снаряжения" /></div></div>
      <div className="product-buy"><p className="eyebrow">{product.collection}</p><div className="product-heading"><h1>{product.name}</h1><button className={`heart-button ${favorites.includes(product.id) ? "is-active" : ""}`} onClick={() => toggleFavorite(product.id)} aria-label="Добавить в избранное"><Heart size={21} fill={favorites.includes(product.id) ? "currentColor" : "none"} /></button></div><p className="product-lead">{product.shortDescription}</p><div className="rating"><Star size={16} fill="currentColor" /><b>{product.rating}</b><span>/ {product.reviews} оценок в демо-данных</span></div><p className="detail-price">{formatPrice(product.price)} {product.previousPrice && <del>{formatPrice(product.previousPrice)}</del>}</p>
        <div className="option-block"><span>Цвет <b>{color}</b></span><div className="color-options">{product.colors.map((item) => <button title={item.name} aria-label={`Выбрать ${item.name}`} className={color === item.name ? "selected" : ""} style={{ backgroundColor: item.hex }} key={item.name} onClick={() => setColor(item.name)} />)}</div></div>
        <div className="quantity-block"><span>Количество</span><div className="quantity"><button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Уменьшить количество"><Minus size={15} /></button><span>{quantity}</span><button onClick={() => setQuantity(quantity + 1)} aria-label="Увеличить количество"><Plus size={15} /></button></div></div>
        {product.stock === "out" ? <button className="button button-disabled button-full" disabled>Нет в наличии</button> : <button className="button button-dark button-full product-add" onClick={add}><ShoppingBag size={17} /> Add to bag <span>{formatPrice(product.price * quantity)}</span></button>}
        <button className="button button-ghost button-full" disabled={product.stock === "out"}>Buy now · ожидает платёжную интеграцию</button>
        <div className="purchase-notes"><p><Truck size={16} /> Доставка и пункты выдачи подключаются после настройки СДЭК / курьерской службы.</p><p><ShieldCheck size={16} /> Возврат и гарантия требуют утверждённых условий продавца.</p></div>
      </div>
    </section>
    <section className="shell specs-band">{product.specs.map((spec) => <div key={spec.label}><b>{spec.value}</b><span>{spec.label.toUpperCase()}</span></div>)}</section>
    <section className="field-tested"><div className="field-tested-image"><img src="/images/hero-route.png" alt="Спокойный горный лагерь" /></div><div className="field-tested-copy"><p className="eyebrow">FIELD TEST / PENDING</p><h2>Designed for the<br /><i>weather ahead.</i></h2><p>{product.description}</p><p className="legal-note">Визуал и описание — концептуальные Draft-материалы. До публикации field-test нужна реальная съёмка, техническое подтверждение и редакционный материал.</p></div></section>
    <section className="shell product-details"><div><p className="eyebrow">PRODUCT INFORMATION</p><h2>Everything<br /><i>in its place.</i></h2></div><div className="accordion-list">{[
      ["details", "Описание", product.description],
      ["specs", "Технические характеристики", product.specs.map((spec) => `${spec.label}: ${spec.value}`).join(" · ")],
      ["delivery", "Доставка и возврат", "Сценарий checkout подготовлен как интерфейс. Реальные сроки, стоимость, возврат и платёжные условия должны быть добавлены владельцем перед запуском."],
    ].map(([key, label, text]) => <div className="accordion-item" key={key}><button onClick={() => setOpenSpec(openSpec === key ? null : key)}><span>{label}</span><ChevronDown className={openSpec === key ? "rotated" : ""} /></button>{openSpec === key && <p>{text}</p>}</div>)}</div></section>
    <section className="shell related-section"><div className="section-head"><div><p className="eyebrow">COMPLETE THE ROUTE</p><h2>Works well<br /><i>together.</i></h2></div><Link className="text-link" href="/catalog">Каталог <ChevronDown className="turn-left" size={17} /></Link></div><div className="product-grid product-grid-four">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div></section>
  </main>;
}
