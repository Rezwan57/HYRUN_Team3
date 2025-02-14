// CartPage.jsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SlBasket } from 'react-icons/sl';
import Navbar from './Navbar'; // Assuming Navbar is in the same directory

const mockCartData = [
  {
    id: 1,
    name: 'Running Shoes',
    price: 120,
    image: '/assets/products/running-shoes.jpg',
    quantity: 2,
  },
  {
    id: 2,
    name: 'Training Shoes',
    price: 100,
    image: '/assets/products/training-shoes.jpg',
    quantity: 1,
  },
];

export default function CartPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <SlBasket className="text-4xl" /> Your Cart
        </h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          {mockCartData.length > 0 ? (
            mockCartData.map((item) => (
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
                    <p className="text-gray-600">${item.price}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-gray-600">Qty: {item.quantity}</p>
                  <button className="text-red-500 hover:text-red-700">Remove</button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">Your cart is empty.</p>
          )}
          {mockCartData.length > 0 && (
            <div className="mt-6 flex justify-end">
              <button className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600">
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}