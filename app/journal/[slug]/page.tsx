import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock3 } from "lucide-react";
import { notFound } from "next/navigation";
import { assetPath } from "@/lib/site";

const posts: Record<string, { tag: string; title: string; read: string; image: string; lead: string; paragraphs: string[] }> = {
  "48-hours-away": { tag: "МАРШРУТ / 01", title: "48 часов без города", read: "6 мин", image: "/images/hero-route.png", lead: "Короткий маршрут не требует половины дома. Он требует честно ответить, что должно работать в дороге, а что просто хочется положить в рюкзак.", paragraphs: ["Начните с ночёвки: где вы будете спать, какой будет температура и как далеко придётся нести вещи. От этих трёх условий легче собрать укрытие и тёплый слой, чем от бесконечного списка покупок.", "Дальше оставьте в комплекте по одной ясной роли: переноска, сон, вода, свет и простая еда. Если вещь не отвечает на один из этих вопросов, её стоит взять под сомнение.", "Этот материал — редакционный концепт. Перед публикацией понадобятся реальные маршрутные данные, фотографии и проверка рекомендаций редактором."] },
  "field-note": { tag: "ПОЛЕВЫЕ ЗАМЕТКИ / 02", title: "Снаряжение — это язык маршрута", read: "4 мин", image: "/images/trail-38.png", lead: "Чем понятнее каждая вещь отвечает на задачу, тем меньше времени уходит на лишние решения в пути.", paragraphs: ["Небольшой комплект хорош не количеством предметов, а тем, что у него нет слепых зон. Свет должен быть доступен до наступления темноты, а тёплый слой — до того, как станет холодно.", "В WAYPOINT эта идея превращается в наборы по сценарию: не список случайных хитов, а стартовая точка, которую можно менять под собственный маршрут.", "Статья демонстрирует структуру будущего журнала и не содержит полевых испытаний или коммерческих рекомендаций."] },
};

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export const dynamicParams = false;

export default function JournalArticle({ params }: { params: { slug: string } }) {
  const post = posts[params.slug];
  if (!post) notFound();
  return <main className="article-page"><header className="shell article-head"><Link href="/journal" className="text-link"><ArrowLeft size={15} /> Журнал</Link><p className="eyebrow">{post.tag}</p><h1>{post.title}</h1><span><Clock3 size={14} /> {post.read} чтения · концептуальный материал</span></header><div className="article-image"><img src={assetPath(post.image)} alt="" /></div><article className="shell article-body"><p className="article-lead">{post.lead}</p>{post.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<aside><p className="eyebrow">СЛЕДУЮЩАЯ ТОЧКА</p><h2>Соберите свой<br /><i>комплект.</i></h2><Link href="/kit" className="button button-dark">Собрать комплект <ArrowRight size={16} /></Link></aside></article></main>;
}
