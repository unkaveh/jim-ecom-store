"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { Artwork } from '@/types/artwork';

interface CartItem {
  artwork: Artwork;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (artwork: Artwork) => void;
  removeItem: (artworkId: string) => void;
  updateQuantity: (artworkId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (artwork: Artwork) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.artwork.id === artwork.id
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.artwork.id === artwork.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentItems, { artwork, quantity: 1 }];
    });
  };

  const removeItem = (artworkId: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.artwork.id !== artworkId)
    );
  };

  const updateQuantity = (artworkId: string, quantity: number) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.artwork.id === artworkId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce(
    (sum, item) => sum + item.artwork.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}