"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, LockKeyhole } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { useShop } from "@/context/ShopContext";
import { formatPrice } from "@/lib/format";

const steps = ["Контакты", "Доставка", "Оплата", "Подтверждение"];

export function CheckoutFlow() {
  const { cart, subtotal } = useShop();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", delivery: "pickup", city: "Москва", payment: "card" });
  const [error, setError] = useState("");
  const total = subtotal + (subtotal >= 15000 ? 0 : 690);
  const currentLabel = steps[step];
  const validate = () => {
    if (step === 0 && (!form.name.trim() || !form.email.includes("@") || form.phone.replace(/\D/g, "").length < 10)) return "Введите имя, корректный email и номер телефона.";
    if (step === 1 && !form.city.trim()) return "Укажите город доставки.";
    return "";
  };
  const next = (event: FormEvent) => { event.preventDefault(); const validation = validate(); if (validation) { setError(validation); return; } setError(""); if (step === 2) { setSubmitted(true); setStep(3); } else setStep((value) => value + 1); };
  if (cart.length === 0 && !submitted) return <main className="shell standalone-empty"><span className="empty-mark">W/</span><h1>Сначала соберите корзину.</h1><p>Оформление появляется, когда в корзине есть хотя бы один предмет.</p><Link href="/catalog" className="button button-dark">В каталог <ArrowRight size={16} /></Link></main>;
  return <main className="checkout-page"><div className="checkout-top shell"><Link className="wordmark" href="/"><span>W/</span> WAYPOINT</Link><span><LockKeyhole size={14} /> ДЕМОНСТРАЦИОННОЕ ОФОРМЛЕНИЕ</span></div><div className="shell checkout-layout"><section className="checkout-form-wrap">{submitted ? <div className="checkout-success"><CheckCircle2 size={44} /><h1>Заявка собрана.</h1><p>Это демонстрация интерфейса. Заказ, списание денег и доставка не созданы — для рабочей версии нужны подключённые ЮKassa/СБП, доставка и серверная часть заказов.</p><Link href="/catalog" className="button button-dark">Вернуться к каталогу <ArrowRight size={16} /></Link></div> : <><div className="checkout-progress">{steps.map((label, index) => <div className={index === step ? "active" : index < step ? "done" : ""} key={label}><i>{index < step ? "✓" : index + 1}</i><span>{label}</span></div>)}</div><form onSubmit={next}><h1>{currentLabel}</h1>{step === 0 && <div className="form-grid"><Field label="Имя" value={form.name} onChange={(value) => setForm({ ...form, name: value })} placeholder="Ваше имя" /><Field label="Электронная почта" type="email" value={form.email} onChange={(value) => setForm({ ...form, email: value })} placeholder="name@example.com" /><Field label="Телефон" value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} placeholder="+7 999 000 00 00" /></div>}{step === 1 && <div className="checkout-options"><p>Выберите предварительный способ получения. Тариф и доступные точки появятся после подключения СДЭК или курьерского API.</p>{[["pickup", "Пункт выдачи", "СДЭК или партнёрская точка — подключается в рабочей версии."], ["courier", "Курьер", "Доставка по адресу после расчёта зоны и тарифа."]].map(([value, title, copy]) => <label className={`delivery-choice ${form.delivery === value ? "selected" : ""}`} key={value}><input type="radio" checked={form.delivery === value} onChange={() => setForm({ ...form, delivery: value })} /><span><b>{title}</b><small>{copy}</small></span></label>)}<Field label="Город" value={form.city} onChange={(value) => setForm({ ...form, city: value })} placeholder="Город" /></div>}{step === 2 && <div className="checkout-options"><p>Платёж не обрабатывается в прототипе. Экран показывает место для подключаемых способов.</p>{[["card", "Банковская карта", "ЮKassa / эквайринг — требуется интеграция."], ["sbp", "СБП", "Сценарий для QR или прямой ссылки — требуется интеграция."]].map(([value, title, copy]) => <label className={`delivery-choice ${form.payment === value ? "selected" : ""}`} key={value}><input type="radio" checked={form.payment === value} onChange={() => setForm({ ...form, payment: value })} /><span><b>{title}</b><small>{copy}</small></span></label>)}</div>}{error && <p className="form-error" role="alert">{error}</p>}<div className="checkout-actions">{step > 0 ? <button className="button button-ghost" type="button" onClick={() => setStep((value) => value - 1)}><ArrowLeft size={16} /> Назад</button> : <Link className="button button-ghost" href="/cart"><ArrowLeft size={16} /> В корзину</Link>}<button className="button button-dark" type="submit">{step === 2 ? "Подтвердить демо-заявку" : "Продолжить"} <ArrowRight size={16} /></button></div></form></>}</section><OrderAside total={total} /></div></main>;
}

function Field({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (value: string) => void; placeholder: string; type?: string }) { return <label className="form-field"><span>{label}</span><input value={value} type={type} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} /></label>; }
function OrderAside({ total }: { total: number }) { const { cart, subtotal } = useShop(); return <aside className="checkout-aside">{cart.map((line) => <div className="checkout-line" key={line.product.id}><img src={line.product.image} alt="" /><span>{line.quantity} × {line.product.name}</span><b>{formatPrice(line.product.price * line.quantity)}</b></div>)}<hr /><div><span>Подытог</span><b>{formatPrice(subtotal)}</b></div><div><span>Доставка</span><b>{subtotal >= 15000 ? "Бесплатно" : "690 ₽"}</b></div><div className="summary-total"><span>Итого</span><b>{formatPrice(total)}</b></div></aside>; }
