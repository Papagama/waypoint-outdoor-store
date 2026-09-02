import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";
import { assetPath } from "@/lib/site";

const articles = [
  { title: "48 часов без города", read: "6 мин", image: "/images/hero-route.png", text: "Небольшой сценарий выезда: как оставить в рюкзаке только то, что действительно работает." },
  { title: "Как выбрать палатку для первого похода", read: "8 мин", image: "/images/ridge-2.png", text: "Три вопроса про вместимость, сезон и формат маршрута вместо бесконечного списка характеристик." },
  { title: "Что взять в автомобильное путешествие", read: "5 мин", image: "/images/field-kit.png", text: "Базовый лагерь, короткие остановки и вещи, которые не должны оставаться в багажнике случайно." },
  { title: "7 вещей, которые не стоит тащить в поход", read: "7 мин", image: "/images/trail-38.png", text: "Не ещё один чек-лист, а повод пересмотреть вес, дубли и роль каждого предмета." },
];

export function JournalPage() {
  return <main className="journal-page"><section className="shell journal-head"><h1>Полезные истории<br />для <i>пути.</i></h1><p>Маршруты, полевые заметки и гайды — редакционный слой будущего бренда. Материалы ниже — концепты, а не опубликованные статьи.</p></section><section className="shell journal-grid">{articles.map((article, index) => <article className={`journal-card ${index === 0 ? "lead" : ""}`} key={article.title}><Link href={`/journal/${index === 0 ? "48-hours-away" : "field-note"}`}><div className="journal-card-image"><img src={assetPath(article.image)} alt="" /></div><div><p><Clock3 size={14} /> {article.read}</p><h2>{article.title}</h2><span>{article.text}</span><b>Читать материал <ArrowRight size={15} /></b></div></Link></article>)}</section><section className="journal-subscribe"><div className="shell"><h2>Не пропустить<br />следующую <i>точку.</i></h2><p>Подписка</p><button className="button button-light" disabled>Подписка скоро появится</button></div></section></main>;
}
