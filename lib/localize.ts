const categoryNames: Record<string, string> = {
  Shelter: "Палатки",
  Sleep: "Сон",
  Carry: "Рюкзаки",
  Cook: "Кухня",
  Light: "Свет",
  Camp: "Лагерь",
  Navigate: "Навигация",
  Essentials: "Важное",
};

const colorNames: Record<string, string> = {
  Moss: "Мох",
  Graphite: "Графит",
  Sand: "Песок",
  Clay: "Глина",
  Stone: "Камень",
  Pine: "Сосна",
  Steel: "Сталь",
  Standard: "Стандартный",
};

export const categoryName = (category: string) => categoryNames[category] ?? category;
export const colorName = (color: string) => colorNames[color] ?? color;
