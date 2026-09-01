import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return <footer className="site-footer"><div className="shell footer-grid"><div><Link href="/" className="wordmark"><span>W/</span> WAYPOINT</Link><p className="footer-statement">Equipment for the way ahead.</p></div><div><p className="eyebrow">DISCOVER</p><Link href="/catalog">Каталог</Link><Link href="/kit">Собрать комплект</Link><Link href="/journal">Journal</Link></div><div><p className="eyebrow">ACCOUNT</p><Link href="/account">Профиль</Link><Link href="/account?saved=1">Избранное</Link><Link href="/cart">Корзина</Link></div><div><p className="eyebrow">FIELD NOTES</p><button className="footer-link" disabled>Подписка в production <ArrowUpRight size={15} /></button></div></div><div className="shell footer-bottom"><span>© 2026 WAYPOINT / Draft</span><span>MADE FOR THE WAY AHEAD</span></div></footer>;
}
