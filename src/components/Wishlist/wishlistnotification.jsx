'use client';
import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import { getWishlistCount } from './corewishlist';
import './wishlistnotification.css';

const WishlistNotification = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(getWishlistCount());

    const handleStorageChange = () => {
      setCount(getWishlistCount());
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('wishlistUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('wishlistUpdated', handleStorageChange);
    };
  }, []);

  return (
    <div className="wishlist-notification">
      <FaHeart className="wishlist-icon" />
      {count > 0 && <span className="wishlist-count">{count}</span>}
    </div>
  );
};

export default WishlistNotification;
