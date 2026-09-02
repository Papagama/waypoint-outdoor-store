import { Product } from "@/types/store";
import { assetPath } from "@/lib/site";

const commonColors = [
  { name: "Moss", hex: "#657255" },
  { name: "Graphite", hex: "#30312e" },
];

export const categories = [
  { number: "01", name: "Shelter", description: "Палатки и укрытия", href: "/catalog?category=Shelter" },
  { number: "02", name: "Sleep", description: "Спальники и коврики", href: "/catalog?category=Sleep" },
  { number: "03", name: "Carry", description: "Рюкзаки и сумки", href: "/catalog?category=Carry" },
  { number: "04", name: "Cook", description: "Горелки, посуда, кухня", href: "/catalog?category=Cook" },
  { number: "05", name: "Light", description: "Фонари и освещение", href: "/catalog?category=Light" },
  { number: "06", name: "Camp", description: "Мебель и оборудование", href: "/catalog?category=Camp" },
  { number: "07", name: "Navigate", description: "Навигация и энергия", href: "/catalog?category=Navigate" },
  { number: "08", name: "Essentials", description: "Небольшие важные вещи", href: "/catalog?category=Essentials" },
];

type ProductSeed = Omit<Product, "gallery">;

const productCatalog: ProductSeed[] = [
  {
    id: "ridge-2", slug: "ridge-2", name: "Ridge 2", collection: "SHELTER / 02", category: "Shelter", price: 52900,
    description: "Лёгкая двухместная палатка для трёх сезонов. Продуманная геометрия создаёт устойчивое укрытие, когда маршрут меняется вместе с погодой.",
    shortDescription: "Двухместная трёхсезонная палатка", image: "/images/ridge-2.png", alt: "Оливковая двухместная туристическая палатка Ridge 2", colors: commonColors, rating: 4.8, reviews: 126, stock: "in", weight: "1.9 kg", seasons: ["Summer", "Shoulder"], capacity: "2 people", tags: ["featured", "weekend", "tent"], specs: [{ label: "Вес", value: "1.9 kg" }, { label: "Вместимость", value: "2 человека" }, { label: "Водостойкость", value: "3000 mm" }, { label: "Сезон", value: "3 сезона" }]
  },
  {
    id: "ridge-solo", slug: "ridge-solo", name: "Ridge Solo", collection: "SHELTER / 01", category: "Shelter", price: 38900,
    description: "Компактное одноместное укрытие для быстрых маршрутов и ночёвок налегке.", shortDescription: "Одноместная палатка для fast & light", image: "/images/ridge-2.png", alt: "Компактная оливковая туристическая палатка", colors: commonColors, rating: 4.7, reviews: 58, stock: "low", weight: "1.3 kg", seasons: ["Summer", "Shoulder"], capacity: "1 person", tags: ["tent", "light"], specs: [{ label: "Вес", value: "1.3 kg" }, { label: "Вместимость", value: "1 человек" }, { label: "Водостойкость", value: "3000 mm" }, { label: "Сезон", value: "3 сезона" }]
  },
  {
    id: "basecamp-4", slug: "basecamp-4", name: "Basecamp 4", collection: "SHELTER / 04", category: "Shelter", price: 71900,
    description: "Просторный четырёхместный лагерь для автомобильных путешествий и долгих остановок.", shortDescription: "Просторная палатка для базового лагеря", image: "/images/ridge-2.png", alt: "Просторная кемпинговая палатка", colors: [{ name: "Sand", hex: "#c3b49b" }, { name: "Moss", hex: "#657255" }], rating: 4.9, reviews: 42, stock: "in", weight: "5.8 kg", seasons: ["Summer", "Shoulder"], capacity: "4 people", tags: ["tent", "camp"], specs: [{ label: "Вес", value: "5.8 kg" }, { label: "Вместимость", value: "4 человека" }, { label: "Тамбур", value: "2 зоны" }, { label: "Сезон", value: "3 сезона" }]
  },
  {
    id: "drift-5", slug: "drift-5", name: "Drift 5", collection: "SLEEP / 05", category: "Sleep", price: 24900,
    description: "Пуховый спальник с выверенной формой и запасом тепла для ночей вдали от города.", shortDescription: "Пуховый спальник до +5 °C", image: "/images/field-kit.png", alt: "Туристический спальный комплект в спокойной палитре", colors: [{ name: "Clay", hex: "#8e6f5b" }, { name: "Graphite", hex: "#30312e" }], rating: 4.8, reviews: 88, stock: "in", weight: "860 g", seasons: ["Summer", "Shoulder"], capacity: "1 person", tags: ["weekend", "sleep"], specs: [{ label: "Вес", value: "860 g" }, { label: "Температура", value: "+5 °C comfort" }, { label: "Утеплитель", value: "650 FP down" }, { label: "Размер", value: "195 cm" }]
  },
  {
    id: "drift-0", slug: "drift-0", name: "Drift 0", collection: "SLEEP / 00", category: "Sleep", price: 29900,
    description: "Утеплённая версия Drift для холодного межсезонья и высоких стоянок.", shortDescription: "Пуховый спальник до 0 °C", image: "/images/field-kit.png", alt: "Компактный утеплённый туристический спальный комплект", colors: [{ name: "Graphite", hex: "#30312e" }, { name: "Moss", hex: "#657255" }], rating: 4.7, reviews: 39, stock: "in", weight: "1.08 kg", seasons: ["Shoulder", "Winter"], capacity: "1 person", tags: ["sleep", "cold"], specs: [{ label: "Вес", value: "1.08 kg" }, { label: "Температура", value: "0 °C comfort" }, { label: "Утеплитель", value: "700 FP down" }, { label: "Размер", value: "198 cm" }]
  },
  {
    id: "rest-pad-r5", slug: "rest-pad-r5", name: "Rest Pad R5", collection: "SLEEP / R5", category: "Sleep", price: 11900,
    description: "Тёплый надувной коврик с тихой поверхностью и компактным чехлом.", shortDescription: "Утеплённый надувной коврик", image: "/images/field-kit.png", alt: "Туристический коврик и снаряжение", colors: [{ name: "Stone", hex: "#938f85" }, { name: "Moss", hex: "#657255" }], rating: 4.6, reviews: 71, stock: "low", weight: "520 g", seasons: ["Summer", "Shoulder", "Winter"], capacity: "1 person", tags: ["sleep", "kit"], specs: [{ label: "Вес", value: "520 g" }, { label: "R-value", value: "5.1" }, { label: "Толщина", value: "9 cm" }, { label: "Размер", value: "183 × 51 cm" }]
  },
  {
    id: "trail-38", slug: "trail-38", name: "Trail 38", collection: "CARRY / 38", category: "Carry", price: 28500,
    description: "Технический рюкзак на два-три дня: стабильно сидит, быстро открывается, не требует лишних действий.", shortDescription: "Технический рюкзак на 38 л", image: "/images/trail-38.png", alt: "Чёрный туристический рюкзак Trail 38 с оранжевой шнуровкой", colors: [{ name: "Graphite", hex: "#30312e" }, { name: "Pine", hex: "#273a34" }], rating: 4.9, reviews: 114, stock: "in", weight: "1.12 kg", seasons: ["Summer", "Shoulder", "Winter"], capacity: "38 L", tags: ["featured", "weekend", "pack"], specs: [{ label: "Объём", value: "38 L" }, { label: "Вес", value: "1.12 kg" }, { label: "Ткань", value: "420D ripstop" }, { label: "Спина", value: "Ventilated" }]
  },
  {
    id: "trail-22", slug: "trail-22", name: "Trail 22", collection: "CARRY / 22", category: "Carry", price: 19800,
    description: "Дневной рюкзак для маршрута, камеры, воды и слоя на случай перемены погоды.", shortDescription: "Лёгкий рюкзак на один день", image: "/images/trail-38.png", alt: "Чёрный технический дневной рюкзак", colors: [{ name: "Graphite", hex: "#30312e" }, { name: "Clay", hex: "#8e6f5b" }], rating: 4.7, reviews: 63, stock: "in", weight: "760 g", seasons: ["Summer", "Shoulder"], capacity: "22 L", tags: ["day", "pack"], specs: [{ label: "Объём", value: "22 L" }, { label: "Вес", value: "760 g" }, { label: "Ткань", value: "210D ripstop" }, { label: "Отсек", value: "13 inch" }]
  },
  {
    id: "traverse-55", slug: "traverse-55", name: "Traverse 55", collection: "CARRY / 55", category: "Carry", price: 36900,
    description: "Несущий рюкзак для автономных маршрутов, где каждый литр должен работать.", shortDescription: "Экспедиционный рюкзак на 55 л", image: "/images/trail-38.png", alt: "Высокий технический туристический рюкзак", colors: [{ name: "Pine", hex: "#273a34" }, { name: "Graphite", hex: "#30312e" }], rating: 4.8, reviews: 35, stock: "in", weight: "1.62 kg", seasons: ["Summer", "Shoulder", "Winter"], capacity: "55 L", tags: ["expedition", "pack"], specs: [{ label: "Объём", value: "55 L" }, { label: "Вес", value: "1.62 kg" }, { label: "Нагрузка", value: "18 kg" }, { label: "Доступ", value: "Front zip" }]
  },
  {
    id: "field-stove-01", slug: "field-stove-01", name: "Field Stove 01", collection: "COOK / 01", category: "Cook", price: 8400,
    description: "Компактная газовая горелка с устойчивой базой и точной регулировкой пламени.", shortDescription: "Компактная газовая горелка", image: "/images/field-kit.png", alt: "Матовая чёрная походная газовая горелка", colors: [{ name: "Graphite", hex: "#30312e" }], rating: 4.8, reviews: 146, stock: "in", weight: "310 g", seasons: ["Summer", "Shoulder"], tags: ["featured", "weekend", "cook"], specs: [{ label: "Вес", value: "310 g" }, { label: "Мощность", value: "3000 W" }, { label: "Время", value: "3:20 / L" }, { label: "Топливо", value: "Isobutane" }]
  },
  {
    id: "field-kit-02", slug: "field-kit-02", name: "Field Kit 02", collection: "COOK / 02", category: "Cook", price: 6900,
    description: "Котелок, кружка и складная ручка — ровно то, что нужно для простой походной кухни.", shortDescription: "Компактный набор посуды", image: "/images/field-kit.png", alt: "Металлический походный котелок и горелка", colors: [{ name: "Steel", hex: "#8b8b87" }], rating: 4.6, reviews: 87, stock: "in", weight: "420 g", seasons: ["Summer", "Shoulder", "Winter"], tags: ["cook", "kit"], specs: [{ label: "Вес", value: "420 g" }, { label: "Объём", value: "1.2 L" }, { label: "Материал", value: "Titanium blend" }, { label: "Комплект", value: "3 pieces" }]
  },
  {
    id: "ember-flask", slug: "ember-flask", name: "Ember Flask", collection: "COOK / 07", category: "Cook", price: 4200,
    description: "Термобутылка, которая не занимает много места и держит температуру весь дневной маршрут.", shortDescription: "Термобутылка 600 ml", image: "/images/field-kit.png", alt: "Матовая туристическая термобутылка", colors: [{ name: "Moss", hex: "#657255" }, { name: "Graphite", hex: "#30312e" }], rating: 4.7, reviews: 102, stock: "in", weight: "290 g", seasons: ["Summer", "Shoulder", "Winter"], tags: ["cook", "essential"], specs: [{ label: "Объём", value: "600 ml" }, { label: "Вес", value: "290 g" }, { label: "Тепло", value: "12 h" }, { label: "Холод", value: "24 h" }]
  },
  {
    id: "beacon-mini", slug: "beacon-mini", name: "Beacon Mini", collection: "LIGHT / MINI", category: "Light", price: 7900,
    description: "Тёплый, регулируемый свет для палатки, стола и короткой остановки после заката.", shortDescription: "Компактный кемпинговый фонарь", image: "/images/field-kit.png", alt: "Компактный фонарь с тёплым янтарным светом", colors: [{ name: "Graphite", hex: "#30312e" }, { name: "Clay", hex: "#8e6f5b" }], rating: 4.9, reviews: 164, stock: "in", weight: "240 g", seasons: ["Summer", "Shoulder", "Winter"], tags: ["featured", "weekend", "light"], specs: [{ label: "Вес", value: "240 g" }, { label: "Свет", value: "5–450 lm" }, { label: "Работа", value: "7–80 h" }, { label: "Защита", value: "IPX4" }]
  },
  {
    id: "beacon-600", slug: "beacon-600", name: "Beacon 600", collection: "LIGHT / 600", category: "Light", price: 10900,
    description: "Яркий переносной фонарь с режимом направленного света и резервной зарядкой.", shortDescription: "Мощный лагерьный фонарь", image: "/images/field-kit.png", alt: "Походный светильник из полупрозрачного рифлёного материала", colors: [{ name: "Graphite", hex: "#30312e" }], rating: 4.7, reviews: 51, stock: "low", weight: "480 g", seasons: ["Summer", "Shoulder", "Winter"], tags: ["light", "camp"], specs: [{ label: "Вес", value: "480 g" }, { label: "Свет", value: "600 lm" }, { label: "Работа", value: "5–70 h" }, { label: "Power bank", value: "5000 mAh" }]
  },
  {
    id: "signal-h1", slug: "signal-h1", name: "Signal H1", collection: "LIGHT / H1", category: "Light", price: 5600,
    description: "Лёгкий налобный фонарь, который остаётся незаметным, пока не нужен.", shortDescription: "Налобный фонарь 350 lm", image: "/images/field-kit.png", alt: "Компактный чёрный налобный фонарь", colors: [{ name: "Graphite", hex: "#30312e" }, { name: "Sand", hex: "#c3b49b" }], rating: 4.5, reviews: 77, stock: "in", weight: "84 g", seasons: ["Summer", "Shoulder", "Winter"], tags: ["light", "essential"], specs: [{ label: "Вес", value: "84 g" }, { label: "Свет", value: "350 lm" }, { label: "Работа", value: "2–60 h" }, { label: "Защита", value: "IP67" }]
  },
  {
    id: "base-chair", slug: "base-chair", name: "Base Chair", collection: "CAMP / 03", category: "Camp", price: 12400,
    description: "Низкое складное кресло для тех остановок, которые хочется продлить.", shortDescription: "Складное лагерное кресло", image: "/images/ridge-2.png", alt: "Снаряжение для спокойного лагеря у палатки", colors: [{ name: "Moss", hex: "#657255" }, { name: "Sand", hex: "#c3b49b" }], rating: 4.6, reviews: 48, stock: "in", weight: "1.08 kg", seasons: ["Summer", "Shoulder"], tags: ["camp", "roadtrip"], specs: [{ label: "Вес", value: "1.08 kg" }, { label: "Нагрузка", value: "120 kg" }, { label: "Ткань", value: "600D canvas" }, { label: "Размер", value: "Compact fold" }]
  },
  {
    id: "base-table", slug: "base-table", name: "Base Table 01", collection: "CAMP / 01", category: "Camp", price: 15900,
    description: "Складной стол без лишней механики: для кухни, камеры и вещей, которые не должны лежать на земле.", shortDescription: "Складной стол для лагеря", image: "/images/field-kit.png", alt: "Походная кухня на спокойном светлом фоне", colors: [{ name: "Stone", hex: "#938f85" }, { name: "Graphite", hex: "#30312e" }], rating: 4.5, reviews: 31, stock: "in", weight: "2.4 kg", seasons: ["Summer", "Shoulder"], tags: ["camp", "roadtrip"], specs: [{ label: "Вес", value: "2.4 kg" }, { label: "Нагрузка", value: "30 kg" }, { label: "Материал", value: "Anodised alloy" }, { label: "Размер", value: "60 × 40 cm" }]
  },
  {
    id: "meridian-mini", slug: "meridian-mini", name: "Meridian Mini", collection: "NAVIGATE / MINI", category: "Navigate", price: 18400,
    description: "Компактный навигатор с читаемым экраном и долгой работой для мест, где связь уже не помогает.", shortDescription: "Компактный GPS-навигатор", image: "/images/trail-38.png", alt: "Технический рюкзак для маршрута и навигации", colors: [{ name: "Graphite", hex: "#30312e" }], rating: 4.4, reviews: 24, stock: "in", weight: "142 g", seasons: ["Summer", "Shoulder", "Winter"], tags: ["navigate", "expedition"], specs: [{ label: "Вес", value: "142 g" }, { label: "Работа", value: "24 h" }, { label: "Защита", value: "IP67" }, { label: "Позиция", value: "GNSS" }]
  },
  {
    id: "route-battery", slug: "route-battery", name: "Route Battery 20", collection: "NAVIGATE / 20", category: "Navigate", price: 6900,
    description: "Защищённый аккумулятор для телефона, фонаря и камеры во время длинного дня.", shortDescription: "Защищённый power bank 20 000 mAh", image: "/images/field-kit.png", alt: "Компактная походная электроника и свет", colors: [{ name: "Graphite", hex: "#30312e" }, { name: "Moss", hex: "#657255" }], rating: 4.6, reviews: 93, stock: "in", weight: "385 g", seasons: ["Summer", "Shoulder", "Winter"], tags: ["navigate", "essential"], specs: [{ label: "Ёмкость", value: "20 000 mAh" }, { label: "Вес", value: "385 g" }, { label: "Выход", value: "30 W USB-C" }, { label: "Защита", value: "IP65" }]
  },
  {
    id: "route-compass", slug: "route-compass", name: "Route Compass", collection: "NAVIGATE / 01", category: "Navigate", price: 3900,
    description: "Надёжный базовый инструмент ориентации для тех, кто предпочитает понимать маршрут сам.", shortDescription: "Планшетный компас для маршрута", image: "/images/trail-38.png", alt: "Снаряжение для точного походного маршрута", colors: [{ name: "Steel", hex: "#8b8b87" }], rating: 4.5, reviews: 46, stock: "in", weight: "56 g", seasons: ["Summer", "Shoulder", "Winter"], tags: ["navigate", "essential"], specs: [{ label: "Вес", value: "56 g" }, { label: "Шкала", value: "2°" }, { label: "Материал", value: "Alloy + acrylic" }, { label: "Шнур", value: "Included" }]
  },
  {
    id: "field-repair", slug: "field-repair", name: "Field Repair 01", collection: "ESSENTIALS / 01", category: "Essentials", price: 3400,
    description: "Ремонтный набор, который помогает не заканчивать поездку из-за одной мелочи.", shortDescription: "Компактный ремонтный набор", image: "/images/field-kit.png", alt: "Компактное функциональное походное снаряжение", colors: [{ name: "Graphite", hex: "#30312e" }], rating: 4.8, reviews: 119, stock: "in", weight: "160 g", seasons: ["Summer", "Shoulder", "Winter"], tags: ["essential", "kit"], specs: [{ label: "Вес", value: "160 g" }, { label: "Набор", value: "14 tools" }, { label: "Чехол", value: "Ripstop" }, { label: "Ремонт", value: "Field-ready" }]
  },
  {
    id: "pack-dry-10", slug: "pack-dry-10", name: "Pack Dry 10", collection: "ESSENTIALS / 10", category: "Essentials", price: 2500,
    description: "Лёгкий гермомешок для слоя, камеры или сухой одежды в непредсказуемую погоду.", shortDescription: "Гермомешок на 10 л", image: "/images/trail-38.png", alt: "Технический туристический рюкзак с водозащитным снаряжением", colors: [{ name: "Moss", hex: "#657255" }, { name: "Clay", hex: "#8e6f5b" }], rating: 4.6, reviews: 83, stock: "in", weight: "74 g", seasons: ["Summer", "Shoulder", "Winter"], capacity: "10 L", tags: ["essential", "pack"], specs: [{ label: "Объём", value: "10 L" }, { label: "Вес", value: "74 g" }, { label: "Защита", value: "10 000 mm" }, { label: "Ткань", value: "30D nylon" }]
  },
  {
    id: "route-towel", slug: "route-towel", name: "Route Towel", collection: "ESSENTIALS / 04", category: "Essentials", price: 2100,
    description: "Быстросохнущее полотенце, которое не создаёт лишний объём в рюкзаке.", shortDescription: "Компактное быстросохнущее полотенце", image: "/images/field-kit.png", alt: "Компактный набор снаряжения в нейтральных цветах", colors: [{ name: "Sand", hex: "#c3b49b" }, { name: "Moss", hex: "#657255" }], rating: 4.5, reviews: 54, stock: "out", weight: "130 g", seasons: ["Summer", "Shoulder"], tags: ["essential"], specs: [{ label: "Вес", value: "130 g" }, { label: "Размер", value: "120 × 60 cm" }, { label: "Ткань", value: "Microfibre" }, { label: "Сушка", value: "Fast dry" }]
  },
  {
    id: "field-knife", slug: "field-knife", name: "Field Knife 01", collection: "ESSENTIALS / 09", category: "Essentials", price: 6200,
    description: "Складной нож для повседневных лагерных задач с уверенным хватом и простым уходом.", shortDescription: "Складной походный нож", image: "/images/field-kit.png", alt: "Предметы лагерной кухни и функциональное снаряжение", colors: [{ name: "Graphite", hex: "#30312e" }, { name: "Clay", hex: "#8e6f5b" }], rating: 4.7, reviews: 61, stock: "in", weight: "118 g", seasons: ["Summer", "Shoulder", "Winter"], tags: ["essential", "camp"], specs: [{ label: "Вес", value: "118 g" }, { label: "Сталь", value: "Sandvik 12C27" }, { label: "Длина", value: "18 cm open" }, { label: "Чехол", value: "Included" }]
  }
];

const categoryGallery = {
  Shelter: { src: "/images/products/shelter-gallery.png", views: ["Вид спереди", "Вид сбоку", "Деталь входа"] },
  Sleep: { src: "/images/products/sleep-gallery.png", views: ["Разложенный комплект", "Вид в чехле", "Деталь материала"] },
  Carry: { src: "/images/products/carry-gallery.png", views: ["Вид спереди", "Вид сбоку", "Деталь фурнитуры"] },
  Cook: { src: "/images/products/cook-gallery.png", views: ["Основной вид", "Вид сбоку", "Деталь комплекта"] },
  Light: { src: "/images/products/light-gallery.png", views: ["Основной вид", "Вид сбоку", "Деталь света"] },
  Camp: { src: "/images/products/camp-gallery.png", views: ["Основной вид", "Сложенный вид", "Деталь конструкции"] },
  Navigate: { src: "/images/products/navigate-gallery.png", views: ["Основной вид", "Вид сбоку", "Деталь управления"] },
  Essentials: { src: "/images/products/essentials-gallery.png", views: ["Основной вид", "Вид сбоку", "Деталь материала"] },
} as const;

const galleryPositions = ["0% 50%", "50% 50%", "100% 50%"];

export const products: Product[] = productCatalog.map((product) => {
  const media = categoryGallery[product.category as keyof typeof categoryGallery];
  const gallery = media.views.map((view, index) => ({
    src: assetPath(media.src),
    alt: `${product.name} — ${view.toLowerCase()}`,
    position: galleryPositions[index],
  }));
  return { ...product, image: gallery[0].src, gallery };
});

export const featuredProducts = products.filter((product) => product.tags.includes("featured"));
export const getProduct = (slug: string) => products.find((product) => product.slug === slug);
export const productById = (id: string) => products.find((product) => product.id === id);
