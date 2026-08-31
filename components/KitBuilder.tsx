"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, ChevronDown, RotateCcw, ShoppingBag } from "lucide-react";
import { useMemo, useState } from "react";
import { productById } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { KitAnswers, Product } from "@/types/store";
import { useShop } from "@/context/ShopContext";

const questions: { key: keyof KitAnswers; question: string; helper: string; options: string[] }[] = [
  { key: "destination", question: "Куда вы едете?", helper: "Среда определяет, что точно не стоит брать лишнего.", options: ["Лес", "Горы", "Кемпинг", "Автопутешествие", "Фестиваль", "Экспедиция"] },
  { key: "duration", question: "На сколько?", helper: "Ночь, выходные или маршрут с запасом времени.", options: ["1 день", "Выходные", "3–5 дней", "Неделя+"] },
  { key: "people", question: "Сколько человек?", helper: "Комплект лучше собирать вокруг реальной группы.", options: ["1", "2", "3", "4+"] },
  { key: "season", question: "Какой сезон?", helper: "Погода — не деталь, а основа выбора.", options: ["Лето", "Межсезонье", "Зима"] },
  { key: "budget", question: "Какой уровень комплекта?", helper: "Не про экономию на безопасности — про нужный объём решения.", options: ["Базовый", "Оптимальный", "Premium"] },
];

export function KitBuilder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<KitAnswers>({ destination: "", duration: "", people: "", season: "", budget: "" });
  const [detailsOpen, setDetailsOpen] = useState(false);
  const { addBundle } = useShop();
  const current = questions[step];
  const isResult = step === questions.length;
  const recommended = useMemo(() => buildKit(answers), [answers]);
  const total = recommended.reduce((sum, product) => sum + product.price, 0);
  const select = (option: string) => setAnswers((currentAnswers) => ({ ...currentAnswers, [current.key]: option }));
  const next = () => { if (answers[current.key]) setStep((value) => Math.min(value + 1, questions.length)); };
  const reset = () => { setAnswers({ destination: "", duration: "", people: "", season: "", budget: "" }); setStep(0); };

  return <main className="kit-page"><section className="shell kit-hero"><p className="eyebrow">ROUTE ASSEMBLY / 05</p><h1>Build your<br /><i>kit.</i></h1><p>Пять реальных параметров поездки. Один понятный стартовый комплект.</p></section>
    {!isResult ? <section className="shell builder-shell"><div className="builder-progress"><span>0{step + 1} / 0{questions.length}</span><div>{questions.map((_, index) => <i className={index <= step ? "complete" : ""} key={index} />)}</div><small>YOUR ROUTE</small></div><div className="question-panel"><div><p className="eyebrow">ROUTE INPUT / 0{step + 1}</p><h2>{current.question}</h2><p>{current.helper}</p></div><div className="answers">{current.options.map((option, index) => <button className={answers[current.key] === option ? "selected" : ""} onClick={() => select(option)} key={option}><small>0{index + 1}</small><span>{option}</span>{answers[current.key] === option && <Check size={17} />}</button>)}</div><div className="builder-actions"><button className="button button-ghost" onClick={() => setStep((value) => Math.max(0, value - 1))} disabled={step === 0}><ArrowLeft size={16} /> Назад</button><button className="button button-dark" onClick={next} disabled={!answers[current.key]}>Дальше <ArrowRight size={16} /></button></div></div></section> : <section className="shell kit-result"><div className="kit-result-head"><div><p className="eyebrow">YOUR ROUTE / {answers.destination.toUpperCase()} · {answers.duration.toUpperCase()}</p><h2>{answers.duration === "Выходные" ? "WEEKEND" : "YOUR"} / <i>{answers.people === "2" ? "TWO" : answers.people}</i></h2><p>Стартовая конфигурация для {answers.destination.toLowerCase()}а. Это прозрачная demo-рекомендация, не замена консультации или проверки совместимости.</p></div><button className="text-link" onClick={reset}><RotateCcw size={15} /> Начать заново</button></div><div className="kit-products">{recommended.map((product, index) => <article key={product.id}><span>0{index + 1}</span><img src={product.image} alt="" /><div><small>{product.category.toUpperCase()}</small><h3>{product.name}</h3><p>{product.shortDescription}</p></div><b>{formatPrice(product.price)}</b></article>)}</div><div className="kit-total"><div><span>COMPLETE KIT</span><b>{formatPrice(total)}</b><small>{recommended.length} предметов · доставка рассчитывается в checkout</small></div><button className="button button-light" onClick={() => addBundle(recommended)}><ShoppingBag size={17} /> Add full kit to bag</button></div><div className="kit-disclosure"><button onClick={() => setDetailsOpen(!detailsOpen)}>Почему такой комплект? <ChevronDown className={detailsOpen ? "rotated" : ""} size={17} /></button>{detailsOpen && <p>Логика набора меняет укрытие для группы и типа поездки, добавляет тепло для межсезонья и оставляет только базовые роли: переноска, сон, кухня и свет. До запуска алгоритм должен быть проверен product-командой на реальных SKU.</p>}</div><Link href="/catalog" className="text-link">Посмотреть весь каталог <ArrowRight size={15} /></Link></section>}
  </main>;
}

function buildKit(answers: KitAnswers): Product[] {
  const ids = [
    answers.people === "1" || answers.duration === "1 день" ? "ridge-solo" : answers.people === "4+" || answers.destination === "Автопутешествие" ? "basecamp-4" : "ridge-2",
    answers.season === "Зима" || answers.season === "Межсезонье" ? "drift-0" : "drift-5",
    answers.duration === "Неделя+" || answers.destination === "Экспедиция" ? "traverse-55" : "trail-38",
    "field-stove-01",
    "beacon-mini",
  ];
  return ids.map(productById).filter((item): item is Product => Boolean(item));
}
