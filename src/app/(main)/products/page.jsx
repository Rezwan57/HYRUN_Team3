"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import "./page.css";
import FilterSidebar from "@/components/filter_sidebar/page";
import Image from "next/image";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [colors, setColors] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [tempSortBy, setTempSortBy] = useState("");
  const [tempFilters, setTempFilters] = useState({
    size: "",
    color: "",
    brand: "",
    gender: "",
  });

  const [availableSizes, setAvailableSizes] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);
  const [availableBrands, setAvailableBrands] = useState([]);
  const [availableGenders, setAvailableGenders] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data); // Initialize filtered products
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    products.forEach((product) => {
      fetch(`/api/product_color?product_id=${product.product_id}`)
        .then((res) => res.json())
        .then((data) => {
          setColors((prevColors) => ({
            ...prevColors,
            [product.product_id]: data,
          }));
        })
        .catch((error) =>
          console.error(`Error fetching colors for product ${product.product_id}:`, error)
        );
    });
  }, [products]);

  const getImageUrl = (productId) => `/api/product_image?product_id=${productId}`;

  const applyFilters = () => {
    let result = [...products];
    if (tempFilters.gender) {
      result = result.filter((p) => p.gender === tempFilters.gender);
    }
    if (tempFilters.size) {
      // Assuming products have a sizes array or field
      result = result.filter((p) => p.sizes?.includes(tempFilters.size));
    }
    if (tempFilters.color) {
      result = result.filter((p) =>
        colors[p.product_id]?.some((c) => c.hex_code === tempFilters.color)
      );
    }
    if (tempFilters.brand) {
      result = result.filter((p) => p.brand === tempFilters.brand);
    }
    if (tempSortBy === "price-asc") {
      result.sort((a, b) => a.selling_price - b.selling_price);
    } else if (tempSortBy === "price-desc") {
      result.sort((a, b) => b.selling_price - a.selling_price);
    }
    setFilteredProducts(result);
    setIsSidebarOpen(false); // Close sidebar after applying
  };

  const resetFilters = () => {
    setTempSortBy("");
    setTempFilters({ size: "", color: "", brand: "", gender: "" });
    setFilteredProducts(products);
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="container">
      <Breadcrumb />
      <div className="filter-button-container">
        <button onClick={toggleSidebar} className="open-filter-btn">
          Filter & Sort
        </button>
      </div>
      <FilterSidebar
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
        sortBy={tempSortBy}
        tempSortBy={tempSortBy}
        setTempSortBy={setTempSortBy}
        tempFilters={tempFilters}
        setTempFilters={setTempFilters}
        applyFilters={applyFilters}
        resetFilters={resetFilters}
        availableSizes={availableSizes}
        availableColors={availableColors}
        availableBrands={availableBrands}
        availableGenders={availableGenders}
      />
      <div className="header-container">
        <h1 className="title">All Products ({filteredProducts.length})</h1>
      </div>
      <div className="productList">
        {filteredProducts.map((product) => (
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
              <p className="productSubcategory">{product.subcategory}</p>
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

export default ProductsPage;