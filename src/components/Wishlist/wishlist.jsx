'use client';
import React, { useState } from 'react';
import "./wishlist.css";

const Wishlist = () => {
    const [items, setItems] = useState([
        { id: 1, name: 'Nike Air Max 270', price: 150 },
        { id: 2, name: 'Adidas Ultra Boost', price: 180 }
    ]);

    const removeFromWishlist = (id) => {
        setItems(items.filter(item => item.id !== id));
        alert('Item removed from wishlist!');
    };

    const addToCart = (id) => {
        alert(`Added item with ID ${id} to cart`);
    };

    return (
        <div className="wishlist-container">
            <h2 className="wishlist-header">Your Wishlist</h2>
            {items.length > 0 ? (
                items.map(item => (
                    <div key={item.id} className="wishlist-item">
                        <h4>{item.name}</h4>
                        <p>£{item.price}</p>  {/* Changed from $ to £ */}
                        <div>
                            <button onClick={() => addToCart(item.id)}>Add to Cart</button>
                            <button onClick={() => removeFromWishlist(item.id)}>Remove</button>
                        </div>
                    </div>
                ))
            ) : (
                <p>Your wishlist is empty.</p>
            )}
        </div>
    );
};

export default Wishlist;
