export type StockStatus = "in" | "low" | "out";

export type Product = {
  id: string;
  slug: string;
  name: string;
  collection: string;
  category: string;
  price: number;
  previousPrice?: number;
  description: string;
  shortDescription: string;
  image: string;
  alt: string;
  colors: { name: string; hex: string }[];
  rating: number;
  reviews: number;
  stock: StockStatus;
  weight: string;
  seasons: string[];
  capacity?: string;
  tags: string[];
  specs: { label: string; value: string }[];
};

export type CartLine = {
  product: Product;
  quantity: number;
  color: string;
};

export type KitAnswers = {
  destination: string;
  duration: string;
  people: string;
  season: string;
  budget: string;
};
