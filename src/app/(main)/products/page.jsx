'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import "./page.css";
import { FaFilter } from "react-icons/fa";

const ProductsPage = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="container">
      <Breadcrumb />
      <div className="header-container">
        <h1 className="title">All Products ({products.length})</h1>
        <div className="filter-sort-container">
          <button className="filter-button">
            Show Filters <FaFilter size={18} className="filter-icon" />
          </button>
        
          <select className="sort-dropdown">
            <option>Sort By</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="latest">Newest Arrivals</option>
          </select>
        </div>
      </div>

      <div className="productList">
        {products.map((product) => (
          <Link
            href={`/products/${product.id}`}
            key={product.id}
            passHref
            className="productCard"
          >
            <img
              src={product.image_url}
              alt={product.name}
              className="productImage"
            />

            {/*product.label && <p className="productLabel">{product.label}</p> */}

            <h2 className="productName">{product.name}</h2>
            <p className="productSubcategory">{product.subcategory} </p>
            <p className="productCategory">{product.category} </p>

            {/* <p className="productColors">{product.colors} Colours</p> */}

            <p className="productPrice">£{product.selling_price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
