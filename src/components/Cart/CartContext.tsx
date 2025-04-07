"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Definir el tipo para los productos del carrito
export interface CartItem {
  id: string;
  name: string;
  size?: string;
  color?: string;
  quantity: number;
  price: number;
  image?: string;
}

// Interface para el contexto del carrito
interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

// Crear el contexto
const CartContext = createContext<CartContextType | undefined>(undefined);

// Props para el provider
interface CartProviderProps {
  children: ReactNode;
}

// Provider component
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  
  // Calcular totales
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart));
      } catch (error) {
        console.error('Error al cargar el carrito desde localStorage:', error);
        setItems([]);
      }
    }
  }, []);

  // Guardar carrito en localStorage cuando cambia
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  // Añadir item al carrito
  const addItem = (newItem: CartItem) => {
    setItems(prevItems => {
      // Verificar si el producto ya existe en el carrito
      const existingItemIndex = prevItems.findIndex(
        item => item.id === newItem.id && 
                item.size === newItem.size && 
                item.color === newItem.color
      );

      if (existingItemIndex > -1) {
        // Si existe, actualizar la cantidad
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += newItem.quantity;
        return updatedItems;
      } else {
        // Si no existe, añadir como nuevo item
        return [...prevItems, newItem];
      }
    });
  };

  // Eliminar item del carrito
  const removeItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Actualizar cantidad de un item
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // Limpiar el carrito
  const clearCart = () => {
    setItems([]);
  };

  // Valor del contexto
  const contextValue: CartContextType = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar el contexto del carrito
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
};