
import React from 'react'
import Wishlist from '../../../components/wishlist/wishlist'
import Breadcrumb from '../../../components/Breadcrumb'

function Page() {  
  return (
    <div>
        <Breadcrumb/>
        <Wishlist/>  
    </div>
  );
}

export default Page; 

"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoTrashOutline } from "react-icons/io5";
import { IoMdHeart } from "react-icons/io";

// Mock wishlist data - replace this with data from your backend/API
const initialWishlistItems = [
  {
    id: 1,
    name: "Running Shoes",
    price: 120.0,
    category: "Running",
    rating: 4.5,
    image: "/assets/FW/1.png",
    inStock: true,
  },
  {
    id: 2,
    name: "Training Shoes",
    price: 100.0,
    category: "Training",
    rating: 4.2,
    image: "/assets/FW/2.png",
    inStock: true,
  },
  {
    id: 3,
    name: "Basketball Shoes",
    price: 150.0,
    category: "Basketball",
    rating: 4.7,
    image: "/assets/FW/3.png",
    inStock: false,
  },
];

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);

  const removeFromWishlist = (productId) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== productId));
  };

  const moveToCart = (productId) => {
    // In a real app, this would add to cart and remove from wishlist
    console.log("Moving to cart:", productId);
    removeFromWishlist(productId);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Wishlist Header */}
        <div className="flex items-center gap-3 mb-8">
          <IoMdHeart className="text-3xl text-yellow-500" />
          <h1 className="text-2xl font-bold">My Wishlist</h1>
          <span className="text-gray-500">({wishlistItems.length} items)</span>
        </div>

        {wishlistItems.length === 0 ? (
          // Empty wishlist state
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <IoMdHeart className="text-6xl text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">Browse our products and add your favorites to the wishlist!</p>
            <Link href="/products">
              <button className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors">
                Browse Products
              </button>
            </Link>
          </div>
        ) : (
          // Wishlist items grid
          <div className="grid grid-cols-1 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  {/* Product Image */}
                  <div className="relative w-full sm:w-48 h-48 sm:h-auto">
                    <Link href={`/products/£{item.id}`}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </Link>
                  </div>

                  {/* Product Details */}
                  <div className="flex-grow p-6 flex flex-col sm:flex-row justify-between">
                    <div className="mb-4 sm:mb-0">
                      <Link href={`/products/£{item.id}`}>
                        <h3 className="font-semibold text-lg mb-2 hover:text-yellow-600">{item.name}</h3>
                      </Link>
                      <p className="text-gray-600 mb-2">{item.category}</p>
                      <div className="flex items-center gap-1 mb-2">
                        <div className="text-yellow-500">★</div>
                        <span className="text-sm text-gray-600">{item.rating}</span>
                      </div>
                      <p className="text-lg font-bold text-yellow-600">£{item.price.toFixed(2)}</p>
                      <p className={`text-sm £{item.inStock ? "text-green-600" : "text-red-600"}`}>
                        {item.inStock ? "In Stock" : "Out of Stock"}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-3">
                      <button
                        onClick={() => moveToCart(item.id)}
                        className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                        disabled={!item.inStock}
                      >
                        Move to Cart
                      </button>
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="px-6 py-2 text-gray-600 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                      >
                        <IoTrashOutline />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;

