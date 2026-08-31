export const formatPrice = (price: number) =>
  new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(price);

export const pluralProducts = (count: number) =>
  `${count} ${count === 1 ? "товар" : count >= 2 && count <= 4 ? "товара" : "товаров"}`;
