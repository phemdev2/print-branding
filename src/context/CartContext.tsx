import React, { createContext, useContext, useState, ReactNode } from "react";
import type { Product, Variant } from "../types";

interface CartItem {
  id: number;
  title: string;
  variant: Variant;
  quantity: number;
  totalPrice: number;
  image: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, variant: Variant, quantity: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product, variant: Variant, quantity: number) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id && item.variant.finish === variant.finish
      );

      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.variant.finish === variant.finish
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          variant,
          quantity,
          totalPrice: (variant.pricePer100 / 100) * quantity,
          image: product.image,
        },
      ];
    });
  };

  const removeFromCart = (id: number) =>
    setCart((prev) => prev.filter((item) => item.id !== id));

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");

  const cartCount = context.cart.reduce((sum, item) => sum + item.quantity, 0);

  return { ...context, cartCount };
};

