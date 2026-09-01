import Link from "next/link";
export default function NotFound() { return <main className="shell standalone-empty"><p className="eyebrow">МАРШРУТ / 404</p><span className="empty-mark">W/</span><h1>Этой точки нет на маршруте.</h1><p>Вернитесь в каталог — там есть более полезные направления.</p><Link href="/catalog" className="button button-dark">В каталог</Link></main>; }
