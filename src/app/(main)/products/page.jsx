"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import "./page.css";
import FilterSidebar from "@/components/filter_sidebar/page";
import Image from "next/image";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [colors, setColors] = useState({});
  
  // Filter and Sort State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [tempSortBy, setTempSortBy] = useState('');
  const [tempFilters, setTempFilters] = useState({
    size: '',
    color: '',
    brand: '',
    gender: ''
  });

  const [availableSizes, setAvailableSizes] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);
  const [availableBrands, setAvailableBrands] = useState([]);
  const [availableGenders, setAvailableGenders] = useState([]);

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

  // Fetching available filter options (size, color, brand)
  useEffect(() => {
    fetch("/api/available_sizes")
      .then((res) => res.json())
      .then((data) => setAvailableSizes(data))
      .catch((error) => console.error("Error fetching sizes:", error));

    fetch("/api/available_colors")
      .then((res) => res.json())
      .then((data) => setAvailableColors(data))
      .catch((error) => console.error("Error fetching colors:", error));


    fetch("/api/available_brands")
      .then((res) => res.json())
      .then((data) => setAvailableBrands(data))
      .catch((error) => console.error("Error fetching brands:", error));

    fetch("/api/available_genders")
      .then((res) => res.json())
      .then((data) => setAvailableGenders(data))
      .catch((error) => console.error("Error fetching genders:", error));
  }, []);

  const getImageUrl = (productId) => {
    return `/api/product_image?product_id=${productId}`;
  };

  // Apply filters and sort logic
  const applyFilters = () => {
    // Logic for applying filters (size, color, brand, gender, sort order)
    console.log("Filters applied", tempFilters, tempSortBy);
    
  };

  const resetFilters = () => {
    setTempSortBy('');
    setTempFilters({
      size: '',
      color: '',
      brand: '',
      gender: ''
    });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
        <h1 className="title">All Products ({products.length})</h1>
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
              <p className="productSubcategory">{product.subcategory}</p>
              <p className="productCategory">{product.category}</p>

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
