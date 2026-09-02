"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowDownUp, ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { pluralProducts } from "@/lib/format";
import { categoryName } from "@/lib/localize";

const categoryOptions = ["Shelter", "Sleep", "Carry", "Cook", "Light", "Camp", "Navigate", "Essentials"];
const seasonOptions = ["Summer", "Shoulder", "Winter"];
type SortOption = "recommended" | "new" | "rating" | "price-asc" | "price-desc";

function sortProducts(items: typeof products, sort: SortOption) {
  return items
    .map((product, index) => ({ product, index }))
    .sort((a, b) => {
      const priceDelta = a.product.price - b.product.price;
      const ratingDelta = b.product.rating - a.product.rating;
      const featuredDelta = Number(b.product.tags.includes("featured")) - Number(a.product.tags.includes("featured"));

      if (sort === "price-asc") return priceDelta || a.index - b.index;
      if (sort === "price-desc") return -priceDelta || a.index - b.index;
      if (sort === "rating") return ratingDelta || b.product.reviews - a.product.reviews || a.index - b.index;
      if (sort === "new") return b.index - a.index;
      return featuredDelta || ratingDelta || a.index - b.index;
    })
    .map(({ product }) => product);
}

export function CatalogExperience() {
  const params = useSearchParams();
  const [category, setCategory] = useState(params.get("category") ?? "All");
  const [season, setSeason] = useState("All");
  const [availability, setAvailability] = useState("All");
  const [maxPrice, setMaxPrice] = useState(80000);
  const [sort, setSort] = useState<SortOption>("recommended");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const query = params.get("q")?.toLocaleLowerCase() ?? "";

  const filtered = useMemo(() => {
    const result = products.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;
      const matchesSeason = season === "All" || product.seasons.includes(season);
      const matchesStock = availability === "All" || (availability === "In stock" ? product.stock !== "out" : product.stock === "low");
      const matchesPrice = product.price <= maxPrice;
      const matchesQuery = !query || `${product.name} ${product.category} ${product.shortDescription}`.toLowerCase().includes(query);
      return matchesCategory && matchesSeason && matchesStock && matchesPrice && matchesQuery;
    });
    return sortProducts(result, sort);
  }, [category, season, availability, maxPrice, sort, query]);

  const reset = () => { setCategory("All"); setSeason("All"); setAvailability("All"); setMaxPrice(80000); setSort("recommended"); };
  const filters = <>
    <div className="filter-head"><span>Фильтры</span><button onClick={reset}>Сбросить</button></div>
    <FilterGroup label="Категория">{["All", ...categoryOptions].map((item) => <label className="check-row" key={item}><input type="radio" name="category" checked={category === item} onChange={() => setCategory(item)} /><span>{item === "All" ? "Все категории" : categoryName(item)}</span></label>)}</FilterGroup>
    <FilterGroup label="Сезон">{["All", ...seasonOptions].map((item) => <label className="check-row" key={item}><input type="radio" name="season" checked={season === item} onChange={() => setSeason(item)} /><span>{item === "All" ? "Любой сезон" : item === "Shoulder" ? "Межсезонье" : item === "Summer" ? "Лето" : "Зима"}</span></label>)}</FilterGroup>
    <FilterGroup label={`Цена до ${new Intl.NumberFormat("ru-RU").format(maxPrice)} ₽`}><input className="price-range" aria-label="Максимальная цена" type="range" min="2000" max="80000" step="1000" value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} /><div className="range-labels"><span>2 000 ₽</span><span>80 000 ₽</span></div></FilterGroup>
    <FilterGroup label="Наличие">{["All", "In stock", "Low stock"].map((item) => <label className="check-row" key={item}><input type="radio" name="stock" checked={availability === item} onChange={() => setAvailability(item)} /><span>{item === "All" ? "Любое" : item === "In stock" ? "В наличии" : "Мало осталось"}</span></label>)}</FilterGroup>
  </>;

  return <main className="catalog-page shell">
    <header className="catalog-head"><div><h1>{query ? `Поиск: «${params.get("q")}»` : "Снаряжение для вашего пути."}</h1><p>{query ? "Подходящие товары в демонстрационном каталоге." : "Функциональные предметы для маршрута, лагеря и следующей остановки."}</p></div></header>
    <div className="catalog-toolbar"><button className="mobile-filter-button" onClick={() => setFiltersOpen(true)}><SlidersHorizontal size={17} /> Фильтры</button><span>{pluralProducts(filtered.length)}</span><label className="sort-select"><ArrowDownUp size={15} /><span>Сортировка</span><select value={sort} onChange={(event) => setSort(event.target.value as SortOption)} aria-label="Сортировка каталога"><option value="recommended">Рекомендованные</option><option value="new">Новинки</option><option value="rating">По рейтингу</option><option value="price-asc">Цена: по возрастанию</option><option value="price-desc">Цена: по убыванию</option></select><ChevronDown size={14} /></label></div>
    <div className="catalog-layout"><aside className="filter-sidebar">{filters}</aside><section className="catalog-results">{filtered.length > 0 ? <div className="product-grid catalog-grid">{filtered.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="catalog-empty"><span className="empty-mark">W/</span><h2>Маршрут пока не найден.</h2><p>Измените условия фильтра — каталог снова покажет подходящие предметы.</p><button className="button button-dark" onClick={reset}>Сбросить фильтры</button></div>}</section></div>
    {filtersOpen && <div className="filter-sheet" role="dialog" aria-modal="true" aria-label="Фильтры каталога"><button className="drawer-backdrop" aria-label="Закрыть фильтры" onClick={() => setFiltersOpen(false)} /><div className="filter-sheet-inner"><button className="sheet-close" onClick={() => setFiltersOpen(false)} aria-label="Закрыть"><X /></button>{filters}<button className="button button-dark button-full" onClick={() => setFiltersOpen(false)}>Показать {filtered.length} {pluralProducts(filtered.length).split(" ")[1]}</button></div></div>}
  </main>;
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return <fieldset className="filter-group"><legend>{label}</legend>{children}</fieldset>;
}
