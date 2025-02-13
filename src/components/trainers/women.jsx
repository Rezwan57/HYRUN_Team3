"use client";

import React, { useState } from "react";
import './style.css';
import { FaHeart } from "react-icons/fa";


const shoes = [
  { 
    id: 1, 
    brand: "Nike", 
    name: "Air Max 270", 
    price: "£120", 
    image: "https://www.secretsales.com/cdn-cgi/image/width=960,height=1200,fit=contain,format=auto/https://media.secretsales.com/catalog/product/7/7/771efd407517470ea4d2fcf3c68dd9cf.jpg",
    sizes: [4, 5, 6, 7, 8] 
  },
  { 
    id: 2, 
    brand: "Adidas", 
    name: "Ultraboost 22", 
    price: "£140", 
    image: "https://www.bing.com/th?id=OPEC.FWyjQNHM%2bTPvSw474C474&o=5&pid=21.1&w=148&h=148&qlt=100&dpr=1.6&bw=6&bc=FFFFFF", 
    sizes: [3, 4, 5, 6, 7] 
  },
  { 
    id: 3, 
    brand: "Puma", 
    name: "RS-X", 
    price: "£110", 
    image: "https://th.bing.com/th/id/OIP.TbMdhIA-KFOrKuYrYP7XyAHaHa?w=192&h=191&c=7&r=0&o=5&dpr=1.6&pid=1.7", 
    sizes: [5, 6, 7, 8] 
  },
  { 
    id: 4, 
    brand: "New Balance", 
    name: "574", 
    price: "£95", 
    image: "https://nb.scene7.com/is/image/NB/wl574evg_nb_02_i?$pdpflexf22x$&qlt=80&fmt=webp&wid=880&hei=880", 
    sizes: [3, 4, 5, 6] 
  },
  { 
    id: 5, 
    brand: "ASICS", 
    name: "Gel-Kayano 29", 
    price: "£150", 
    image: "https://www.tradeinn.com/f/14047/140479943/asics-gel-kayano-30-running-shoes.webp", 
    sizes: [4, 5, 6, 7, 8] 
  }
];

const WomenTrainers = () => {
  return (
    <div className="trainers-container">
      <h1 className="trainers-title">Women's Trainers</h1>
      <div className="trainers-grid">
        {shoes.map(shoe => (
          <div key={shoe.id} className="trainer-card">
            <FaHeart className="wishlist-icon" /> {/* Heart icon */}
            <img src={shoe.image} alt={shoe.name} className="trainer-image" />
            <p className="trainer-brand">{shoe.brand}</p>
            <h2 className="trainer-name">{shoe.name}</h2>
            <p className="trainer-sizes">
              {shoe.sizes.map(size => `${size} `).join(', ')}
            </p>
            <p className="trainer-price">{shoe.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WomenTrainers;
