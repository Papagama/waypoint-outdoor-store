"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CategoryRedirect({ category }: { category: string }) {
  const router = useRouter();
  const href = `/catalog?category=${encodeURIComponent(category)}`;

  useEffect(() => {
    router.replace(href);
  }, [href, router]);

  return <main className="shell"><section className="empty-state"><h1>Открываем каталог</h1><Link href={href} className="button button-dark">Продолжить</Link></section></main>;
}
