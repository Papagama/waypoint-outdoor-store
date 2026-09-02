"use client";

import Link from "next/link";
import { ChevronDown, Heart, Minus, Plus, ShieldCheck, ShoppingBag, Star, Truck } from "lucide-react";
import { Product } from "@/types/store";
import { products } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { categoryName, colorName } from "@/lib/localize";
import { useShop } from "@/context/ShopContext";
import { ProductCard } from "@/components/ProductCard";
import { ProductVisual } from "@/components/ProductVisual";
import { useState } from "react";

const galleryLabels = ["Основной вид", "Боковой ракурс", "Деталь"];

export function ProductDetail({ product }: { product: Product }) {
  const [color, setColor] = useState(product.colors[0]?.name ?? "Standard");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [openSpec, setOpenSpec] = useState<string | null>("details");
  const { addProduct, favorites, toggleFavorite } = useShop();
  const related = products.filter((item) => item.category !== product.category && item.stock !== "out").slice(0, 4);
  const add = () => { for (let index = 0; index < quantity; index += 1) addProduct(product, color); };

  return <main className="product-page">
    <div className="shell breadcrumb"><Link href="/catalog">Каталог</Link><span>/</span><Link href={`/catalog?category=${product.category}`}>{categoryName(product.category)}</Link><span>/</span><b>{product.name}</b></div>
    <section className="shell product-top">
      <div className="product-gallery" aria-label={`Фотографии товара ${product.name}`}>
        <div className="gallery-main">
          <ProductVisual product={product} view={activeImage} decorative />
          <span className="gallery-counter">{activeImage + 1} / {product.gallery.length}</span>
        </div>
        <div className="gallery-thumbnails" role="tablist" aria-label="Ракурсы товара">
          {product.gallery.map((image, index) => <button type="button" className={`gallery-thumb ${activeImage === index ? "is-active" : ""}`} aria-label={image.alt} aria-pressed={activeImage === index} key={image.position} onClick={() => setActiveImage(index)}>
            <ProductVisual product={product} view={index} decorative />
            <span>{galleryLabels[index] ?? `Фото ${index + 1}`}</span>
          </button>)}
        </div>
      </div>
      <div className="product-buy"><p className="eyebrow">{product.collection}</p><div className="product-heading"><h1>{product.name}</h1><button className={`heart-button ${favorites.includes(product.id) ? "is-active" : ""}`} onClick={() => toggleFavorite(product.id)} aria-label="Добавить в избранное"><Heart size={21} fill={favorites.includes(product.id) ? "currentColor" : "none"} /></button></div><p className="product-lead">{product.shortDescription}</p><div className="rating"><Star size={16} fill="currentColor" /><b>{product.rating}</b><span>/ {product.reviews} оценок в демо-данных</span></div><p className="detail-price">{formatPrice(product.price)} {product.previousPrice && <del>{formatPrice(product.previousPrice)}</del>}</p>
        <div className="option-block"><span>Цвет <b>{colorName(color)}</b></span><div className="color-options">{product.colors.map((item) => <button title={colorName(item.name)} aria-label={`Выбрать цвет ${colorName(item.name)}`} className={color === item.name ? "selected" : ""} style={{ backgroundColor: item.hex }} key={item.name} onClick={() => setColor(item.name)} />)}</div></div>
        <div className="quantity-block"><span>Количество</span><div className="quantity"><button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Уменьшить количество"><Minus size={15} /></button><span>{quantity}</span><button onClick={() => setQuantity(quantity + 1)} aria-label="Увеличить количество"><Plus size={15} /></button></div></div>
        {product.stock === "out" ? <button className="button button-disabled button-full" disabled>Нет в наличии</button> : <button className="button button-dark button-full product-add" onClick={add}><ShoppingBag size={17} /> Добавить в корзину <span>{formatPrice(product.price * quantity)}</span></button>}
        <button className="button button-ghost button-full" disabled={product.stock === "out"}>Купить сейчас · ожидает подключения оплаты</button>
        <div className="purchase-notes"><p><Truck size={16} /> Доставка и пункты выдачи подключаются после настройки СДЭК / курьерской службы.</p><p><ShieldCheck size={16} /> Возврат и гарантия требуют утверждённых условий продавца.</p></div>
      </div>
    </section>
    <section className="shell specs-band">{product.specs.map((spec) => <div key={spec.label}><b>{spec.value}</b><span>{spec.label.toUpperCase()}</span></div>)}</section>
    <section className="field-tested"><div className="field-tested-image"><ProductVisual product={product} view={1} decorative /></div><div className="field-tested-copy"><p className="eyebrow">ПОЛЕВОЕ ТЕСТИРОВАНИЕ / В ОЖИДАНИИ</p><h2>Создано для<br /><i>погоды впереди.</i></h2><p>{product.description}</p><p className="legal-note">Визуал и описание — концептуальные материалы. До публикации нужны реальная съёмка, техническое подтверждение и редакционный материал.</p></div></section>
    <section className="shell product-details"><div><p className="eyebrow">ИНФОРМАЦИЯ О ТОВАРЕ</p><h2>Всё<br /><i>на своём месте.</i></h2></div><div className="accordion-list">{[
      ["details", "Описание", product.description],
      ["specs", "Технические характеристики", product.specs.map((spec) => `${spec.label}: ${spec.value}`).join(" · ")],
      ["delivery", "Доставка и возврат", "Сценарий оформления подготовлен как интерфейс. Реальные сроки, стоимость, возврат и условия оплаты должны быть добавлены владельцем перед запуском."],
    ].map(([key, label, text]) => <div className="accordion-item" key={key}><button onClick={() => setOpenSpec(openSpec === key ? null : key)}><span>{label}</span><ChevronDown className={openSpec === key ? "rotated" : ""} /></button>{openSpec === key && <p>{text}</p>}</div>)}</div></section>
    <section className="shell related-section"><div className="section-head"><div><p className="eyebrow">ДОПОЛНИТЕ МАРШРУТ</p><h2>Хорошо<br /><i>работают вместе.</i></h2></div><Link className="text-link" href="/catalog">Каталог <ChevronDown className="turn-left" size={17} /></Link></div><div className="product-grid product-grid-four">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div></section>
  </main>;
}
