import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import hotProductsData from '@/data/Hotproductsdata';
import './HotProducts.css';

const BrandLogos = () => {
  return (
    <div className="brand-logos">
      <img src="/assets/Shoe brand logos/Adidas.svg" alt="Adidas" />
      <img src="/assets/Shoe brand logos/NB.svg" alt="New-Balance" />
      <img src="/assets/Shoe brand logos/puma.svg" alt="Puma" />
      <img src="/assets/Shoe brand logos/rebook.svg" alt="Rebook" />
      <img src="/assets/Shoe brand logos/nike.svg" alt="Nike" />
    </div>
  );
};



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