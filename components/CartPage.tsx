"use client";

import Link from "next/link";
import { ArrowRight, Heart, Minus, Plus, Trash2 } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { colorName } from "@/lib/localize";
import { useShop } from "@/context/ShopContext";

export function CartPage() {
  const { cart, subtotal, updateQuantity, removeFromCart, toggleFavorite } = useShop();
  const delivery = subtotal >= 15000 ? 0 : 690;
  if (cart.length === 0) return <main className="shell standalone-empty"><span className="empty-mark">W/</span><h1>Корзина пуста.</h1><p>Возьмите с собой только то, что помогает двигаться дальше.</p><Link href="/catalog" className="button button-dark">Смотреть снаряжение <ArrowRight size={16} /></Link></main>;
  return <main className="shell cart-page"><header className="cart-page-head"><h1>Всё готово,<br /><i>когда готовы вы.</i></h1></header><div className="cart-page-grid"><section className="cart-page-lines">{cart.map((line) => <article className="cart-page-line" key={`${line.product.id}-${line.color}`}><img src={line.product.image} alt={line.product.alt} /><div className="cart-page-item"><h2>{line.product.name}</h2><span>{colorName(line.color)} · {line.product.shortDescription}</span><div className="cart-item-actions"><div className="quantity"><button onClick={() => updateQuantity(line.product.id, line.color, line.quantity - 1)} aria-label="Уменьшить количество"><Minus size={14} /></button><span>{line.quantity}</span><button onClick={() => updateQuantity(line.product.id, line.color, line.quantity + 1)} aria-label="Увеличить количество"><Plus size={14} /></button></div><button onClick={() => toggleFavorite(line.product.id)}><Heart size={15} /> Сохранить</button><button onClick={() => removeFromCart(line.product.id, line.color)}><Trash2 size={15} /> Убрать</button></div></div><b>{formatPrice(line.product.price * line.quantity)}</b></article>)}</section><aside className="order-summary"><h2>Итого по маршруту</h2><div><span>Товары</span><b>{formatPrice(subtotal)}</b></div><div><span>Доставка</span><b>{delivery === 0 ? "Бесплатно" : formatPrice(delivery)}</b></div><hr /><div className="summary-total"><span>Итого</span><b>{formatPrice(subtotal + delivery)}</b></div><p className="summary-note">Бесплатная демонстрационная доставка от 15 000 ₽. Реальное правило подключается после настройки логистики.</p><Link href="/checkout" className="button button-dark button-full">Перейти к оформлению <ArrowRight size={16} /></Link><Link href="/catalog" className="text-link summary-catalog">Добавить ещё снаряжение <ArrowRight size={14} /></Link></aside></div></main>;
}
