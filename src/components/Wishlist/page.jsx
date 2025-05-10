'use client';
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import "./page.css";
import { getWishlist, saveWishlist } from './corewishlist';
import AddToCart from "../AddToCart"; 

const Wishlist = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch the wishlist from localStorage
    setItems(getWishlist());
    setIsLoading(false);
    
    // Listen for wishlist updates
    const handleWishlistUpdate = () => {
      setItems(getWishlist());
    };
    
    window.addEventListener('wishlistUpdated', handleWishlistUpdate);
    
    return () => {
      window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
    };
  }, []);

  const removeFromWishlist = (productId) => {
    const updatedWishlist = items.filter((item) => item.product_id !== productId);
    setItems(updatedWishlist);
    saveWishlist(updatedWishlist);
  };

  // Get image URL helper function
  const getImageUrl = (productId) => {
    return `/api/product_image?product_id=${productId}`;
  };

  if (isLoading) {
    return <div className="wishlist-loading">Loading your wishlist...</div>;
  }

  return (
    <div className="wishlist-container">
      <h2 className="wishlist-title">Your Wishlist ({items.length} items)</h2>
      
      {items.length > 0 ? (
        <div className="wishlist-items">
          {items.map((product) => (
            <div key={product.product_id} className="wishlist-item">
              <div className="wishlist-item-image">
                <Image
                  src={getImageUrl(product.product_id)}
                  alt={product.name || "Product image"}
                  width={150}
                  height={150}
                  className="product-image"
                />
              </div>
              
              <div className="wishlist-item-details">
                <h3 className="product-name">{product.name || "Unnamed Product"}</h3>
                {product.category && (
                  <p className="product-category">{product.category}</p>
                )}
                {product.gender && (
                  <p className="product-gender">{product.gender}</p>
                )}
                <p className="product-price">£{product.selling_price || 0}</p>
                
                <div className="wishlist-item-actions">
                  {/* Fixed AddToCart Component usage */}
                  <AddToCart
                    product={{
                      ...product,
                      quantity: 1,
                      selectedSize: product.selectedSize || null,
                      selectedColor: product.selectedColor || null,
                    }}
                    className="add-to-cart-btn"
                  />
                  {/* Remove from wishlist button */}
                  <button
                    className="remove-btn"
                    onClick={() => removeFromWishlist(product.product_id)}
                  >
                    <FaTrash className="btn-icon" /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-wishlist">
          <p>Your wishlist is empty.</p>
          <Link href="/products" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default Wishlist;