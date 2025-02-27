"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import "./page.css";
import { FaFilter } from "react-icons/fa";
import Image from "next/image";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [colors, setColors] = useState({});

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    products.forEach((product) => {
      fetch(`/api/product_color?product_id=${product.product_id}`)
        .then((res) => res.json())
        .then((data) => {
          setColors((prevColors) => ({
            ...prevColors,
            [product.product_id]: data, // Store colors for each product
          }));
        })
        .catch((error) =>
          console.error(
            `Error fetching colors for product ${product.product_id}:`,
            error
          )
        );
    });
  }, [products]);

  const getImageUrl = (productId) => {
    return `/api/product_image?product_id=${productId}`;
  };

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
            href={`/products/${product.slug}`}
            key={product.id}
            passHref
            className="productCard"
          >
            <Image
              width={1000}
              height={1000}
              src={getImageUrl(product.product_id)}
              alt={product.name}
              className="productImage"
            />

            <div className="productDetails">
              <h2 className="productName">{product.name}</h2>
              <p className="productSubcategory">{product.subcategory} </p>
              <p className="productCategory">{product.category} </p>

              <div className="productColors flex gap-2 mt-2">
                {colors[product.product_id] &&
                  colors[product.product_id].map((color) => (
                    <span
                      key={color.color_id}
                      className="h-6 w-6 rounded-full border"
                      style={{ backgroundColor: color.hex_code }}
                    />
                  ))}
              </div>

              <p className="productPrice">£{product.selling_price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
