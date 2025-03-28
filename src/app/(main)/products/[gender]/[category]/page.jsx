"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`/api/products?category=${category}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching category products:", error));
  }, [category]);

  return (
    <div>
      <h1>Category: {category}</h1>
      <div>
        {products.map((product) => (
          <Link key={product.product_id} href={`/products/${category}/${product.gender}/${product.slug}`}>
            <div>{product.name} - £{product.selling_price}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
