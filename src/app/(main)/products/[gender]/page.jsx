"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import FilterSidebar from "@/components/filter_sidebar/page";
import Image from "next/image";
import "../page.css";

const ProductsByGender = () => {
  const { gender } = useParams();
  const [products, setProducts] = useState([]);
  const [colors, setColors] = useState({});

  useEffect(() => {
    fetch(`/api/products?gender=${gender}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, [gender]);

  useEffect(() => {
    products.forEach((product) => {
      fetch(`/api/product_color?product_id=${product.product_id}`)
        .then((res) => res.json())
        .then((data) => {
          setColors((prev) => ({ ...prev, [product.product_id]: data }));
        });
    });
  }, [products]);

  const getImageUrl = (productId) => `/api/product_image?product_id=${productId}`;

  return (
    <div className="container">
      <Breadcrumb />
      <div className="header-container">
        <h1 className="title">{gender} Products ({products.length})</h1>
      </div>
      <div className="productList">
        {products.map((product) => (
          <Link
            key={product.product_id}
            href={`/products/${product.category}/${product.gender}/${product.slug}`}
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
              <p className="productCategory">{product.category}</p>
              <div className="productColors flex gap-2 mt-2">
                {colors[product.product_id]?.map((color) => (
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

export default ProductsByGender;