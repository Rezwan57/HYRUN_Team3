"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaArrowRight, FaFire } from "react-icons/fa";
import AddToCart from "../AddToCart";
import "./HotProducts.css";
 
const BrandLogos = () => {
  return (
    <div className="hp-brand-logos-container">
      <div className="hp-brand-logos">
        <Image src="/assets/Shoe brand logos/Adidas.svg" width={200} height={200} alt="Adidas" />
        <Image src="/assets/Shoe brand logos/NB.svg" width={200} height={200} alt="New-Balance" />
        <Image src="/assets/Shoe brand logos/puma.svg" width={200} height={200} alt="Puma" />
        <Image src="/assets/Shoe brand logos/rebook.svg" width={200} height={200} alt="Rebook" />
        <Image src="/assets/Shoe brand logos/nike.svg" width={200} height={200} alt="Nike" />
      </div>
    </div>
  );
};

function ProductSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        
        if (Array.isArray(data)) {
          const sorted = [...data].sort((a, b) => a.selling_price - b.selling_price);
          setProducts(sorted.slice(0, 4));
        } else {
          setProducts([]);
          console.error("API did not return an array");
        }
      } catch (err) {
        setError(err.message);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
 
    fetchProducts();
  }, []);
 
  const getImageUrl = (productId) => {
    return `/api/product_image?product_id=${productId}`;
  };
 
  if (loading) return <div className="hp-loading-spinner">Loading hot products...</div>;
  if (error) return <div className="hp-error-message">Error loading products: {error}</div>;
 
  return (
    <div className="hp-hot-products-container">
      <div className="hp-hot-products-content">
        <div className="hp-hot-products-header">
          <FaFire className="hp-fire-icon" />
          <div>
            <h1>Hot Products</h1>
            <p className="hp-section-subtitle">Limited time offers</p>
          </div>
        </div>
 
        <div className="hp-horizontal-layout">
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product, index) => (
              <div key={index} className="hp-product-card">
                <div className="hp-product-badge">HOT</div>
                <Link href={`/products/${product.gender}/${product.category}/${product.slug}`} className="hp-product-image-container">
                  <Image
                    width={400}
                    height={400}
                    src={getImageUrl(product.product_id)}
                    alt={product.name || 'Product image'}
                    className="hp-product-image"
                    onError={(e) => {
                      e.target.src = '/placeholder-product.jpg';
                    }}
                  />
                </Link>
                
                <div className="hp-product-info">
                  <h3 className="hp-product-name">
                    {product.name ? (product.name.length > 22 ? `${product.name.substring(0, 22)}...` : product.name) : 'Unnamed Product'}
                  </h3>
                  <div className="hp-product-meta">
                    <span className="hp-product-price">
                      £{product.selling_price || 'N/A'}
                    </span>
                    <AddToCart product={product} className="hp-add-to-cart-btn" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="hp-no-products">No hot products available</div>
          )}
          
          <div className="hp-shop-now-wrapper">
            <Link href="/collections/hotproducts" className="hp-view-more-btn">
              Shop Now
              <FaArrowRight className="hp-arrow-icon" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const HotProducts = () => {
  return (
    <div>
      <BrandLogos />
      <ProductSection />
    </div>
  );
};

export default HotProducts;