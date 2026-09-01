"use client";
export default function ErrorPage({ reset }: { error: Error; reset: () => void }) { return <main className="shell standalone-empty"><p className="eyebrow">МАРШРУТ ПРЕРВАН</p><span className="empty-mark">W/</span><h1>Что-то сбилось с маршрута.</h1><p>Попробуйте загрузить страницу ещё раз.</p><button className="button button-dark" onClick={reset}>Повторить</button></main>; }
