"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SlBasket } from 'react-icons/sl';
import { IoAdd, IoRemove } from 'react-icons/io5';
import Navbar from '@/components/Navbar';
import Headline from "@/components/Headline";


{/* Mock cart data */}
const initialCartData = [
  {
    id: 1,
    name: 'Running Shoes',
    price: 120,
    image: '/assets/FW/1.png',
    quantity: 2,
  },
  {
    id: 2,
    name: 'Training Shoes',
    price: 100,
    image: '/assets/FW/2.png',
    quantity: 1,
  },
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState(initialCartData);

  const removeItem = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, change) => {
    setCartItems(cartItems.map(item => {
      if (item.id === itemId) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Headline />
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <SlBasket className="text-4xl" /> Your Cart
          </h1>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            {cartItems.length > 0 ? (
              <>
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between border-b py-4">
                    <div className="flex items-center gap-4">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="rounded-lg"
                      />
                      <div>
                        <h2 className="text-xl font-semibold">{item.name}</h2>
                        <p className="text-2xl font-bold text-yellow-600">
                          £{(item.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">
                          £{item.price.toFixed(2)} each
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:bg-gray-200 rounded"
                          aria-label="Decrease quantity"
                        >
                          <IoRemove className="text-gray-600" />
                        </button>
                        <span className="w-8 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:bg-gray-200 rounded"
                          aria-label="Increase quantity"
                        >
                          <IoAdd className="text-gray-600" />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">Your cart is empty.</p>
                <Link href="/" className="text-yellow-500 hover:text-yellow-600 transition-colors">
                  Continue Shopping
                </Link>
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-semibold">Total</span>
                <span className="text-3xl font-bold text-yellow-600">
                  £{calculateTotal().toFixed(2)}
                </span>
              </div>
              <button className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition-colors text-lg font-semibold">
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;