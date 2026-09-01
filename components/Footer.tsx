import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return <footer className="site-footer"><div className="shell footer-grid"><div><Link href="/" className="wordmark"><span>W/</span> WAYPOINT</Link><p className="footer-statement">Снаряжение для вашего пути.</p></div><div><p className="eyebrow">РАЗДЕЛЫ</p><Link href="/catalog">Каталог</Link><Link href="/kit">Собрать комплект</Link><Link href="/journal">Журнал</Link></div><div><p className="eyebrow">АККАУНТ</p><Link href="/account">Профиль</Link><Link href="/account?saved=1">Избранное</Link><Link href="/cart">Корзина</Link></div><div><p className="eyebrow">ПОЛЕВЫЕ ЗАМЕТКИ</p><button className="footer-link" disabled>Подписка скоро появится <ArrowUpRight size={15} /></button></div></div><div className="shell footer-bottom"><span>© 2026 WAYPOINT / Черновик</span><span>ДЛЯ ВАШЕГО ПУТИ</span></div></footer>;
}
