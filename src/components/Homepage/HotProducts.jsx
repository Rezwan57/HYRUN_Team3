"use client";
import React, { useState } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Image from "next/image";
import hotProductsData from "@/data/Hotproductsdata";
import "./HotProducts.css";

const BrandLogos = () => {
  return (
    <div className="brand-logos-container">
      <h2 className="brand-logos-title">Brands You Love</h2>
      <div className="brand-logos">
        <img src="/assets/Shoe brand logos/Adidas.svg" alt="Adidas" />
        <img src="/assets/Shoe brand logos/NB.svg" alt="New-Balance" />
        <img src="/assets/Shoe brand logos/puma.svg" alt="Puma" />
        <img src="/assets/Shoe brand logos/rebook.svg" alt="Rebook" />
        <img src="/assets/Shoe brand logos/nike.svg" alt="Nike" />
      </div>
    </div>
  );
};

/* it is scrolling effect 

const ProductSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4; 

  const maxIndex = hotProductsData.length - itemsPerPage;

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1); // Move forward by 1 item
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1); // Move back by 1 item
    }
  };
  */

  const ProductSection = () => {
    return (
      <div className="hot-products-container">
        <span className="hot-products-title">HOT PRODUCTS</span>
        <div className="hot-products">
          {hotProductsData.map((product) => (
            <div key={product.id} className="product-item">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-name">{product.name}</div>
              <div className="product-price">{product.price}</div>
              <button className="add-to-cart">Add to Cart</button>
            </div>
            
          ))}
        </div>
        
        <div className="show-more-container">
        <button className="show-more-button">
          <span className="show-more-arrow">
            <FaArrowRight />
          </span>
        </button>
        </div>
      </div>
    );
  };
  
  
  const HotProducts = () => {
    return (
      <div>
        <BrandLogos />
        <ProductSection />
           </div>
    );
  };
  export default HotProducts;