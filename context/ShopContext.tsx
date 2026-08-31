"use client";

import { CartLine, Product } from "@/types/store";
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

type ShopContextValue = {
  cart: CartLine[];
  favorites: string[];
  isCartOpen: boolean;
  addProduct: (product: Product, color?: string) => void;
  addBundle: (products: Product[]) => void;
  updateQuantity: (id: string, color: string, quantity: number) => void;
  removeFromCart: (id: string, color: string) => void;
  toggleFavorite: (id: string) => void;
  openCart: () => void;
  closeCart: () => void;
  cartCount: number;
  subtotal: number;
};

const ShopContext = createContext<ShopContextValue | null>(null);
const CART_KEY = "waypoint-cart";
const FAVORITES_KEY = "waypoint-favorites";

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const savedCart = window.localStorage.getItem(CART_KEY);
    const savedFavorites = window.localStorage.getItem(FAVORITES_KEY);
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
  }, []);

  useEffect(() => window.localStorage.setItem(CART_KEY, JSON.stringify(cart)), [cart]);
  useEffect(() => window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites)), [favorites]);

  const addProduct = (product: Product, color = product.colors[0]?.name ?? "Standard") => {
    if (product.stock === "out") return;
    setCart((current) => {
      const existing = current.find((line) => line.product.id === product.id && line.color === color);
      if (existing) return current.map((line) => line === existing ? { ...line, quantity: line.quantity + 1 } : line);
      return [...current, { product, quantity: 1, color }];
    });
    setIsCartOpen(true);
  };

  const addBundle = (bundle: Product[]) => {
    setCart((current) => bundle.reduce<CartLine[]>((next, product) => {
      if (product.stock === "out") return next;
      const color = product.colors[0]?.name ?? "Standard";
      const existing = next.find((line) => line.product.id === product.id && line.color === color);
      return existing ? next.map((line) => line === existing ? { ...line, quantity: line.quantity + 1 } : line) : [...next, { product, quantity: 1, color }];
    }, current));
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, color: string, quantity: number) => {
    if (quantity < 1) return removeFromCart(id, color);
    setCart((current) => current.map((line) => line.product.id === id && line.color === color ? { ...line, quantity } : line));
  };
  const removeFromCart = (id: string, color: string) => setCart((current) => current.filter((line) => line.product.id !== id || line.color !== color));
  const toggleFavorite = (id: string) => setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);

  const value = useMemo(() => ({
    cart, favorites, isCartOpen, addProduct, addBundle, updateQuantity, removeFromCart, toggleFavorite,
    openCart: () => setIsCartOpen(true), closeCart: () => setIsCartOpen(false),
    cartCount: cart.reduce((total, line) => total + line.quantity, 0),
    subtotal: cart.reduce((total, line) => total + line.product.price * line.quantity, 0),
  }), [cart, favorites, isCartOpen]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error("useShop must be used within ShopProvider");
  return context;
}
