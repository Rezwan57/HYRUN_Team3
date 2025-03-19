"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("cart");
    }
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      // Consider product_id, selectedSize, and selectedColor as the unique identifier
      const existingItemIndex = prevCart.findIndex(
        (item) =>
          item.product_id === product.product_id &&
          item.selectedSize === product.selectedSize &&
          item.selectedColor === product.selectedColor
      );

      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        // Increment by the provided quantity or 1 if not specified
        const quantityToAdd = product.quantity || 1;
        updatedCart[existingItemIndex].quantity += quantityToAdd;
        return updatedCart;
      }

      // Add new item with the provided quantity (default to 1 if not specified)
      const quantity = product.quantity || 1;
      const updatedCart = [...prevCart, { ...product, quantity }];
      return updatedCart;
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.product_id !== itemId));
  };

  const updateCartQuantity = (itemId, change) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.product_id === itemId ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
      );
      return updatedCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCartQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};