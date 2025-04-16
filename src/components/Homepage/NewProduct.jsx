"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaArrowRight, FaLeaf } from "react-icons/fa";
import AddToCart from "../AddToCart";
import "./NewProducts.css";
 
const Genders = () => {
  return (
    <div className="genders">
      <Link href="/products/mens" className="gender-link">
        <div className="Men's">
          <Image src="/assets/gender/Mens1.jpeg" width={500} height={500} alt="Mens" />
          <div className="gender-name-box">Men's</div>
        </div>
      </Link>
      
      <Link href="/products/womens" className="gender-link">
        <div className="Women's">
          <Image src="/assets/gender/Womens1.jpeg" width={500} height={500} alt="Womens" />
          <div className="gender-name-box">Women's</div>
        </div>
      </Link>
      
      <Link href="/products/kids" className="gender-link">
        <div className="Kid's">
          <Image src="/assets/gender/Kids1.jpeg" width={500} height={500} alt="Kids" />
          <div className="gender-name-box">Kid's</div>
        </div>
      </Link>
    </div>
  );
};
 
const Sports = () => {
  return (
    <div className="genders">
      <Link href="/products/category/trainers" className="sport-link">
        <div className="Trainers">
          <Image src="/assets/gender/Trainers1.avif" width={200} height={200} alt="Trainers" />
          <div className="sport-badge">SPORT</div>
          <div className="sport-name-box">Trainers</div>
        </div>
      </Link>
      
      <Link href="/products/category/basketball" className="sport-link">
        <div className="Basketball">
          <Image src="/assets/gender/Basketball1.avif" width={200} height={200} alt="Basketball" />
          <div className="sport-badge">SPORT</div>
          <div className="sport-name-box">Basketball</div>
        </div>
      </Link>
      
      <Link href="/products/category/walking" className="sport-link">
        <div className="Walking">
          <Image src="/assets/gender/Walking1.avif" width={200} height={200} alt="Walking" />
          <div className="sport-badge">SPORT</div>
          <div className="sport-name-box">Walking</div>
        </div>
      </Link>
      
      <Link href="/products/category/football" className="sport-link">
        <div className="Football">
          <Image src="/assets/gender/Football1.avif" width={200} height={200} alt="Football" />
          <div className="sport-badge">SPORT</div>
          <div className="sport-name-box">Football</div>
        </div>
      </Link>
      
      <Link href="/products/category/running" className="sport-link">
        <div className="Running">
          <Image src="/assets/gender/Running1.jpg" width={200} height={200} alt="Running" />
          <div className="sport-badge">SPORT</div>
          <div className="sport-name-box">Running</div>
        </div>
      </Link>
    </div>
  );
};

function NewArrivals() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        
        if (Array.isArray(data)) {
          setProducts(data.slice(-4));
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
 
  if (loading) return <div className="loading-spinner">Loading new arrivals...</div>;
  if (error) return <div className="error-message">Error loading products: {error}</div>;
 
  return (
    <div className="new-arrivals-container">
      <div className="new-products-header">
        <FaLeaf className="leaf-icon" />
        <div>
          <h1>New Arrivals</h1>
          <p className="section-subtitle">Fresh styles just landed</p>
        </div>
      </div>

      {Array.isArray(products) && products.length > 0 ? (
        <div className="new-arrivals-products-row">
          {products.map((product, index) => (
            <div key={index} className="product-card">
              <div className="product-badge">NEW</div>
              <Link href={`/products/${product.gender}/${product.category}/${product.slug}`} className="product-image-container">
                <Image
                  width={400}
                  height={400}
                  src={getImageUrl(product.product_id)}
                  alt={product.name || 'Product image'}
                  className="product-image"
                  onError={(e) => {
                    e.target.src = '/placeholder-product.jpg';
                  }}
                />
              </Link>
              
              <div className="product-info">
                <h3 className="product-name">
                  {product.name ? (product.name.length > 22 ? `${product.name.substring(0, 22)}...` : product.name) : 'Unnamed Product'}
                </h3>
                <div className="product-meta">
                  <span className="product-price">
                    £{product.selling_price || 'N/A'}
                  </span>
                  <AddToCart product={product} className="add-to-cart-btn" />
                </div>
              </div>
            </div>
          ))}
          <div className="shop-now-container">
            <Link href="/collections/newarrivals" className="shop-now-btn">
              Shop Now
              <FaArrowRight className="arrow-icon" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="no-products">No new arrivals available</div>
      )}
    </div>
  );
}
 
const NewProducts = () => {
  return (
    <div>
      <Genders />
      <NewArrivals />
      <Sports />
    </div>
  );
};

export default NewProducts;