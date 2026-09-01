"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { ArrowRight, Heart, Menu, Minus, Plus, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { products } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { categoryName, colorName } from "@/lib/localize";
import { useShop } from "@/context/ShopContext";

const links = [
  { href: "/catalog", label: "Каталог" },
  { href: "/kit", label: "Собрать комплект" },
  { href: "/journal", label: "Журнал" },
];

export function Header() {
  const pathname = usePathname();
  const { cartCount, openCart, favorites } = useShop();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const results = useMemo(() => query.trim().length < 2 ? [] : products.filter((product) =>
    `${product.name} ${product.category} ${product.collection}`.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 4), [query]);

  const closeAll = () => { setMenuOpen(false); setSearchOpen(false); };
  const submitSearch = (event: FormEvent) => {
    event.preventDefault();
    if (query.trim()) window.location.href = `/catalog?q=${encodeURIComponent(query.trim())}`;
  };

  return <>
    <header className="site-header">
      <div className="header-inner shell">
        <button className="icon-button mobile-only" onClick={() => setMenuOpen(true)} aria-label="Открыть меню"><Menu size={20} /></button>
        <Link className="wordmark" href="/" onClick={closeAll} aria-label="WAYPOINT — на главную"><span>W/</span> WAYPOINT</Link>
        <nav className="main-nav" aria-label="Основная навигация">
          {links.map((link) => <Link key={link.href} className={pathname === link.href ? "active" : ""} href={link.href}>{link.label}</Link>)}
        </nav>
        <div className="header-tools">
          <button className="icon-button" onClick={() => setSearchOpen(true)} aria-label="Открыть поиск"><Search size={19} /></button>
          <Link className="icon-button desktop-tool" href="/account?saved=1" aria-label={`Избранное, ${favorites.length} товаров`}><Heart size={19} /><span className="tool-count">{favorites.length || ""}</span></Link>
          <Link className="icon-button desktop-tool" href="/account" aria-label="Личный кабинет"><UserRound size={19} /></Link>
          <button className="bag-button" onClick={openCart} aria-label={`Корзина, ${cartCount} товаров`}><ShoppingBag size={19} /><span>Корзина</span><b>{cartCount}</b></button>
        </div>
      </div>
    </header>

    {menuOpen && <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Навигация">
      <div className="mobile-menu-head"><span className="wordmark"><span>W/</span> WAYPOINT</span><button className="icon-button" onClick={() => setMenuOpen(false)} aria-label="Закрыть меню"><X /></button></div>
      <nav>{links.map((link, index) => <Link key={link.href} href={link.href} onClick={closeAll}><small>0{index + 1}</small>{link.label}<ArrowRight size={18} /></Link>)}</nav>
      <div className="mobile-menu-bottom"><Link href="/account" onClick={closeAll}>Профиль и заказы</Link><Link href="/account?saved=1" onClick={closeAll}>Сохранённое <span>{favorites.length}</span></Link></div>
    </div>}

    {searchOpen && <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Поиск по магазину">
      <button className="overlay-backdrop" onClick={() => setSearchOpen(false)} aria-label="Закрыть поиск" />
      <section className="search-panel shell">
        <form onSubmit={submitSearch} className="search-form"><Search size={23} /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Найти палатку, фонарь, рюкзак…" aria-label="Поисковый запрос" /><button className="icon-button" type="button" onClick={() => setSearchOpen(false)} aria-label="Закрыть поиск"><X /></button></form>
        <div className="search-results">
          {query.trim().length < 2 && <><p className="eyebrow">БЫСТРЫЙ ПОИСК</p><div className="quick-search"><Link href="/catalog?category=Shelter" onClick={closeAll}>Палатки</Link><Link href="/catalog?category=Carry" onClick={closeAll}>Рюкзаки</Link><Link href="/kit" onClick={closeAll}>Собрать комплект</Link></div></>}
          {query.trim().length >= 2 && results.length === 0 && <div className="empty-search"><p>Ничего не найдено</p><span>Попробуйте другую категорию или более короткий запрос.</span></div>}
          {results.length > 0 && <><p className="eyebrow">ТОВАРЫ · {results.length}</p>{results.map((product) => <Link className="search-product" key={product.id} href={`/product/${product.slug}`} onClick={closeAll}><img src={product.image} alt="" /><span><small>{categoryName(product.category).toUpperCase()}</small><b>{product.name}</b></span><em>{formatPrice(product.price)}</em></Link>)}<Link className="text-link" href={`/catalog?q=${encodeURIComponent(query)}`} onClick={closeAll}>Все результаты <ArrowRight size={15} /></Link></>}
        </div>
      </section>
    </div>}
    <CartDrawer />
  </>;
}

function CartDrawer() {
  const { cart, isCartOpen, closeCart, removeFromCart, updateQuantity, subtotal } = useShop();
  if (!isCartOpen) return null;
  return <div className="drawer-wrap" role="dialog" aria-modal="true" aria-label="Корзина">
    <button className="drawer-backdrop" aria-label="Закрыть корзину" onClick={closeCart} />
    <aside className="cart-drawer">
      <div className="drawer-head"><div><p className="eyebrow">ВАШ МАРШРУТ</p><h2>Корзина</h2></div><button className="icon-button" onClick={closeCart} aria-label="Закрыть корзину"><X /></button></div>
      {cart.length === 0 ? <div className="empty-cart"><div className="empty-mark">W/</div><h3>Пока без снаряжения.</h3><p>Следующая точка маршрута начинается с одного полезного предмета.</p><Link href="/catalog" onClick={closeCart} className="button button-dark">Смотреть снаряжение <ArrowRight size={16} /></Link></div> : <>
        <div className="cart-lines">{cart.map((line) => <article className="cart-line" key={`${line.product.id}-${line.color}`}><img src={line.product.image} alt="" /><div><small>{line.product.collection}</small><h3>{line.product.name}</h3><p>{colorName(line.color)} · {formatPrice(line.product.price)}</p><div className="quantity"><button onClick={() => updateQuantity(line.product.id, line.color, line.quantity - 1)} aria-label={`Уменьшить количество ${line.product.name}`}><Minus size={14} /></button><span>{line.quantity}</span><button onClick={() => updateQuantity(line.product.id, line.color, line.quantity + 1)} aria-label={`Увеличить количество ${line.product.name}`}><Plus size={14} /></button></div></div><button className="line-remove" onClick={() => removeFromCart(line.product.id, line.color)}>Убрать</button></article>)}</div>
        <div className="cart-summary"><div><span>Подытог</span><b>{formatPrice(subtotal)}</b></div><p>Доставка и способ оплаты выбираются на следующем шаге.</p><Link href="/checkout" onClick={closeCart} className="button button-dark button-full">Перейти к оформлению <ArrowRight size={16} /></Link><Link href="/cart" onClick={closeCart} className="button button-ghost button-full">Открыть корзину</Link></div>
      </>}
    </aside>
  </div>;
}
