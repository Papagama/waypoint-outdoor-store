"use client";

import Link from "next/link";
import { ArrowRight, Heart, MapPin, Package, Settings, UserRound } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useShop } from "@/context/ShopContext";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export function AccountView() {
  const params = useSearchParams();
  const { favorites } = useShop();
  const saved = products.filter((product) => favorites.includes(product.id));
  const isSaved = params.get("saved") === "1";
  return <main className="shell account-page"><header><h1>{isSaved ? "Сохранённое снаряжение." : "Ваш маршрут."}</h1><p>{isSaved ? "Предметы, к которым вы хотите вернуться." : "Профиль и история станут доступны после подключения авторизации и реальных заказов."}</p></header><div className="account-layout"><aside className="account-nav"><Link href="/account" className={!isSaved ? "active" : ""}><UserRound size={16} /> Профиль</Link><Link href="/account#orders"><Package size={16} /> Заказы</Link><Link href="/account?saved=1" className={isSaved ? "active" : ""}><Heart size={16} /> Сохранённое <span>{favorites.length}</span></Link><Link href="/account#addresses"><MapPin size={16} /> Адреса</Link><Link href="/account#settings"><Settings size={16} /> Настройки</Link></aside>{isSaved ? <section className="saved-area">{saved.length > 0 ? <div className="product-grid product-grid-three">{saved.map((product) => <ProductCard product={product} key={product.id} />)}</div> : <div className="account-empty"><span className="empty-mark">W/</span><h2>Здесь будет ваш список.</h2><p>Сохраняйте предметы, чтобы быстро вернуться к комплекту перед следующей поездкой.</p><Link href="/catalog" className="button button-dark">Смотреть каталог <ArrowRight size={16} /></Link></div>}</section> : <section className="account-overview"><div className="profile-card"><span className="avatar">W/</span><div><h2>Профиль не подключён.</h2><p>В рабочей версии здесь появятся авторизация, личные данные и настройки согласий.</p></div><button className="button button-ghost" disabled>Войти после интеграции</button></div><div className="account-section" id="orders"><div><p className="eyebrow">ЗАКАЗЫ</p><h2>Пока нет заказов.</h2><p>История появится после создания реальных заказов и подключения серверной части.</p></div><span className="order-empty-mark">00</span></div><div className="account-section" id="addresses"><div><p className="eyebrow">АДРЕСА</p><h2>Адреса не сохранены.</h2><p>Сценарий получения и адресная книга требуют защищённого профиля.</p></div><span className="order-empty-mark">—</span></div></section>}</div></main>;
}
