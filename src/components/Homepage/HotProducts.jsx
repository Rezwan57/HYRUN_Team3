"use client";
import React, { useState } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
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

const ProductSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4; 

  const handleNext = () => {
    if (currentIndex + itemsPerPage < hotProductsData.length) {
      setCurrentIndex(currentIndex + 1); // Move by 1 item
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1); // Move back by 1 item
    }
  };

  return (
    <div className="hot-products-container">
      <h2 className="hot-products-title">HOT PRODUCTS</h2>

      <div className="carousel-container">
        <div
          className="hot-products"
          style={{ transform: `translateX(-${currentIndex * 25}%)` }}
        >
          {hotProductsData.map((product) => (
            <div key={product.id} className="product-item">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-name">{product.name}</div>
              <div className="product-price">{product.price}</div>
              <button className="add-to-cart">Add to Cart</button>
            </div>
          ))}
        </div>
      </div>

      
      <div className="show-more-container">
        <button className="show-more-button" onClick={handlePrevious} disabled={currentIndex === 0}>
          <FaArrowLeft />
        </button>

        <button
          className="show-more-button"
          onClick={handleNext}
          disabled={currentIndex + itemsPerPage >= hotProductsData.length}
        >
          <FaArrowRight />
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
      <div className="section-divider"></div>
    <div className="section-banner">New Arrivals

    </div>
    </div>
    
  );
};

export default HotProducts;