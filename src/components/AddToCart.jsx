'use client';
import { useState, useEffect } from "react";

export default function AddToCartButton({ className, product }) {
  const [cart, setCart] = useState([]);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const addToCart = () => {
    // Check if product exists and has required properties
    if (!product || !product.product_id) {
      console.error('Invalid product data:', product);
      return;
    }

    const productToAdd = {
      id: product.product_id,
      name: product.name || 'Unnamed Product',
      price: product.selling_price || 0,
      image: product.imageUrl || '',
      quantity: product.quantity || 1,
      selectedSize: product.selectedSize || '',
      selectedColor: product.selectedColor || ''
    };

    const existingItemIndex = cart.findIndex((item) => 
      item.id === productToAdd.id && 
      item.selectedSize === productToAdd.selectedSize && 
      item.selectedColor === productToAdd.selectedColor
    );

    let updatedCart;
    if (existingItemIndex >= 0) {
      updatedCart = cart.map((item, index) =>
        index === existingItemIndex 
          ? { ...item, quantity: item.quantity + productToAdd.quantity }
          : item
      );
    } else {
      updatedCart = [...cart, productToAdd];
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  return (
    <button 
      className={className} 
      onClick={addToCart}
      disabled={!product || !product.product_id}
    >
      {addedToCart ? "Added to Cart" : "Add to Cart"}
    </button>
  );
}