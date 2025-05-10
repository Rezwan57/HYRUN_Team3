"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import FilterSidebar from "@/components/filter_sidebar/page";
import { FaFilter, FaHeart, FaRegHeart, FaTimes, FaFire } from "react-icons/fa";
import styles from "./page.module.css";

const CollectionPage = ({
  pageType,
  title,
  description,
  bannerImage,
  defaultSortBy,
  productLimit
}) => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [colors, setColors] = useState({});
  const [productSizes, setProductSizes] = useState({});
  
  // Improved filters state
  const [filters, setFilters] = useState({ 
    size: '', 
    color: '', 
    brand: '', 
    gender: '', 
    category: '' 
  });
  
  // Temporary filters for the sidebar
  const [tempFilters, setTempFilters] = useState({ 
    size: '', 
    color: '', 
    brand: '', 
    gender: '', 
    category: '' 
  });
  
  const [sortBy, setSortBy] = useState(defaultSortBy || "relevance");
  const [tempSortBy, setTempSortBy] = useState(defaultSortBy || "relevance");
  
  const [availableFilters, setAvailableFilters] = useState({ 
    sizes: [], 
    colors: [], 
    brands: [], 
    genders: [], 
    categories: [] 
  });

  // Add state to track wishlist items - FIXED
  const [wishlistItems, setWishlistItems] = useState([]);
  
  // Initialize wishlist from localStorage on component mount - FIXED
  useEffect(() => {
    // Get wishlist from localStorage if available
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      setWishlistItems(JSON.parse(storedWishlist));
    }
  }, []);

  // Check if a product is in wishlist - FIXED
  const isInWishlist = (productId) => {
    if (!wishlistItems) return false;
    return wishlistItems.some(item => 
      typeof item === 'object' 
        ? item.product_id === productId 
        : item === productId
    );
  };

// This function adds or removes a product from the wishlist
const toggleWishlist = (e, product) => {
  // Stop the default link behavior and prevent any parent click from triggering
  e.preventDefault();
  e.stopPropagation();

  // Get the current wishlist from localStorage, or start with an empty list if nothing is there
  const storedWishlist = localStorage.getItem('wishlist');
  const wishlist = storedWishlist ? JSON.parse(storedWishlist) : [];

  let updatedWishlist;

  // Check if this product is already in the wishlist
  const isAlreadyInWishlist = wishlist.findIndex(item => 
    typeof item === 'object'
      ? item.product_id === product.product_id
      : item === product.product_id
  ) !== -1;

  if (isAlreadyInWishlist) {
    // If it's already in the wishlist, remove it
    updatedWishlist = wishlist.filter(item => 
      typeof item === 'object'
        ? item.product_id !== product.product_id
        : item !== product.product_id
    );
  } else {
    // If it's not in the wishlist, add it (with full product info)
    const newItem = {
      product_id: product.product_id,
      name: product.name,
      category: product.category,
      gender: product.gender,
      selling_price: product.selling_price,
      // You can include more fields here if needed
    };

    updatedWishlist = [...wishlist, newItem];
  }

  // Save the updated wishlist back to localStorage
  localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));

  // Trigger an event to let other parts of the app know the wishlist changed
  window.dispatchEvent(new Event('wishlistUpdated'));

  // Update local state to reflect the changes immediately in the UI
  setWishlistItems(updatedWishlist);
};

  // Brand mapping for consistency
  const brandMap = {
    Nike: 1,
    Adidas: 2,
    Puma: 3,
    Reebok: 4,
    "New Balance": 5,
    Fila: 6,
  };

  // Format size helper function
  const formatSize = (uk, us, eu) => {
    return `UK ${uk} / US ${us} / EU ${eu}`;
  };

  // Helper function for string normalization
  const normalize = (str) => {
    if (!str) return "";
    return str
      .toLowerCase()
      .replace(/[-_\s]+/g, " ")
      .trim();
  };

  // Helper function for gender normalization
  const normalizeGender = (gender) => {
    if (!gender) return "";
    const normalized = gender.toLowerCase().trim();
    if (normalized === "mens") return "men";
    if (normalized === "womens") return "women";
    return normalized;
  };

  // Initialize data
  useEffect(() => {
    fetchProducts();
    fetchAvailableColors();
    fetchAvailableSizes();
  }, []);

  // Fetch available sizes
  const fetchAvailableSizes = async () => {
    try {
      const res = await fetch("/api/sizes");
      const data = await res.json();

      const formattedSizes = data.map((size) =>
        formatSize(size.uk_size, size.us_size, size.eu_size)
      );

      setAvailableFilters(prev => ({
        ...prev,
        sizes: formattedSizes
      }));
    } catch (error) {
      console.error("Error fetching sizes:", error);
    }
  };

  // Fetch available colors
  const fetchAvailableColors = async () => {
    try {
      const res = await fetch("/api/colors");
      const data = await res.json();

      const colorNames = data
        .map((color) => color.name || color.color_name)
        .filter(Boolean);

      setAvailableFilters(prev => ({
        ...prev,
        colors: colorNames
      }));
    } catch (error) {
      console.error("Error fetching colors:", error);
    }
  };

  // Fetch all products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Get basic product info
      const res = await fetch("/api/products");
      const data = await res.json();

      // Add normalized fields to products for consistent filtering
      const productsWithNormalizedFields = data.map((product) => ({
        ...product,
        normalizedGender: normalizeGender(product.gender),
        normalizedCategory: normalize(product.category),
      }));

      // Get sizes for each product
      const productsWithSizes = await Promise.all(
        productsWithNormalizedFields.map(async (product) => {
          try {
            const res = await fetch(
              `/api/product_size?product_id=${product.product_id}`
            );
            const sizeData = await res.json();

            // Format sizes consistently
            const sizes = sizeData.map((size) =>
              formatSize(size.uk_size, size.us_size, size.eu_size)
            );

            product.normalizedSizes = sizes;

            setProductSizes((prev) => ({
              ...prev,
              [product.product_id]: sizes,
            }));

            return product;
          } catch (error) {
            console.error(
              `Error processing product ${product.product_id}:`,
              error
            );
            product.normalizedSizes = [];
            return product;
          }
        })
      );

      // Extract filter options from products
      extractFilterOptions(productsWithSizes);

      let sorted = [...productsWithSizes];

      if (defaultSortBy === "price-low-high") {
        sorted.sort((a, b) => a.selling_price - b.selling_price);
      } else if (defaultSortBy === "price-high-low") {
        sorted.sort((a, b) => b.selling_price - a.selling_price);
      } else if (defaultSortBy === "newest") {
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }

      if (productLimit) {
        sorted = sorted.slice(0, productLimit);
      }

      setAllProducts(sorted);
      setFilteredProducts(sorted);
      setLoading(false);
      
      // Fetch colors for all products
      fetchProductColors(sorted);
    } catch (err) {
      console.error("Error fetching products:", err);
      setLoading(false);
    }
  };

  // Extract filter options from products
  const extractFilterOptions = (products) => {
    // Extract sizes
    const sizeSet = new Set();
    products.forEach((product) => {
      if (product.normalizedSizes && product.normalizedSizes.length > 0) {
        product.normalizedSizes.forEach((size) => {
          sizeSet.add(size);
        });
      }
    });
    
    // Extract categories
    const categories = [
      ...new Set(products.map((p) => p.category).filter(Boolean)),
    ];
    
    // Extract genders
    const genders = [...new Set(products.map((p) => p.gender).filter(Boolean))];
    
    // Extract brands
    const brands = [...new Set(products.map((p) => {
      if (p.brand_id) {
        // Convert brand_id back to brand name
        return Object.keys(brandMap).find(key => brandMap[key] === p.brand_id) || "";
      }
      return p.brand || "";
    }).filter(Boolean))];

    setAvailableFilters(prev => ({
      ...prev,
      sizes: [...new Set([...prev.sizes, ...sizeSet])],
      categories: [...new Set([...prev.categories, ...categories])],
      genders: [...new Set([...prev.genders, ...genders])],
      brands: [...new Set([...prev.brands, ...brands])]
    }));
  };

  // Improved category matching function
  const categoriesMatch = (category1, category2) => {
    if (!category1 || !category2) return false;

    // Normalize both categories
    const normCategory1 = normalize(category1);
    const normCategory2 = normalize(category2);

    // Check for direct match
    if (normCategory1 === normCategory2) return true;

    // Handle singular-plural variations
    const singularCategory1 = normCategory1.endsWith("s")
      ? normCategory1.slice(0, -1)
      : normCategory1;
    const singularCategory2 = normCategory2.endsWith("s")
      ? normCategory2.slice(0, -1)
      : normCategory2;

    if (singularCategory1 === singularCategory2) return true;

    // Check for substring match
    if (
      normCategory1.includes(normCategory2) ||
      normCategory2.includes(normCategory1)
    )
      return true;

    // Handle specific category mappings
    const categoryMappings = {
      trainers: ["sneakers", "shoes", "athletic shoes", "casual shoes"],
      "running shoes": ["runners", "running trainers", "jogging shoes"],
      "football shoes": ["soccer shoes", "football boots", "soccer cleats"],
      "walking boots": ["hiking boots", "trekking boots", "hiking shoes"],
      "basketball shoes": ["basketball sneakers", "basketball trainers"],
    };

    // Check if one is in the other's mapping
    for (const [key, values] of Object.entries(categoryMappings)) {
      if (
        (normCategory1 === key && values.includes(normCategory2)) ||
        (normCategory2 === key && values.includes(normCategory1))
      ) {
        return true;
      }
    }

    return false;
  };

  // Fetch colors for filtered products
  const fetchProductColors = (products = filteredProducts) => {
    products.forEach((product) => {
      if (!colors[product.product_id]) {
        fetch(`/api/product_color?product_id=${product.product_id}`)
          .then((res) => res.json())
          .then((data) => {
            setColors((prevColors) => ({
              ...prevColors,
              [product.product_id]: data,
            }));
          })
          .catch((error) =>
            console.error(
              `Error fetching colors for product ${product.product_id}:`,
              error
            )
          );
      }
    });
  };

  // Apply filters to products
  const applyFilters = () => {
    setLoading(true);
    let result = [...allProducts];

    // Apply brand filter
    if (filters.brand) {
      const brandId = brandMap[filters.brand];
      if (brandId) {
        result = result.filter((product) => product.brand_id === brandId);
      } else {
        result = result.filter((product) => normalize(product.brand) === normalize(filters.brand));
      }
    }

    // Apply category filter with improved matching
    if (filters.category) {
      result = result.filter((product) => {
        if (!product.category) return false;
        return categoriesMatch(product.category, filters.category);
      });
    }

    // Apply gender filter with improved matching
    if (filters.gender) {
      result = result.filter((product) => {
        if (!product.gender) return false;
        const productGender = normalizeGender(product.gender);
        const filterGender = normalizeGender(filters.gender);
        return productGender === filterGender;
      });
    }

    // Apply color filter
    if (filters.color) {
      result = result.filter((product) => {
        const productColors = colors[product.product_id] || [];
        return productColors.some((color) => {
          const colorName = normalize(color.name || color.color_name || "");
          return colorName.includes(normalize(filters.color));
        });
      });
    }

    // Apply size filter
    if (filters.size) {
      const sizeToMatch = filters.size.trim();
      result = result.filter((product) => {
        if (!product.normalizedSizes || product.normalizedSizes.length === 0) {
          return false;
        }
        return product.normalizedSizes.some((size) => size === sizeToMatch);
      });
    }

    // Apply sorting
    if (sortBy !== "relevance") {
      result = sortProducts(result, sortBy);
    }

    setFilteredProducts(result);
    setLoading(false);
  };

  // Sort products
  const sortProducts = (products, sortOption) => {
    const sortedProducts = [...products];

    switch (sortOption) {
      case "price-low-high":
        return sortedProducts.sort((a, b) => a.selling_price - b.selling_price);
      case "price-high-low":
        return sortedProducts.sort((a, b) => b.selling_price - a.selling_price);
      case "name-a-z":
        return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      case "name-z-a":
        return sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
      case "newest":
        return sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      default:
        return sortedProducts;
    }
  };

  // Effect to apply filters when they change
  useEffect(() => {
    applyFilters();
  }, [filters, sortBy]);

  // Filter sidebar controls
  const openFilters = () => {
    setTempFilters({...filters});
    setTempSortBy(sortBy);
    setFiltersOpen(true);
  };

  const closeFilters = () => {
    setFiltersOpen(false);
  };

  const applyFiltersCallback = () => {
    setFilters({...tempFilters});
    setSortBy(tempSortBy);
    setFiltersOpen(false);
  };

  const resetFiltersCallback = () => {
    setTempFilters({ size: '', color: '', brand: '', gender: '', category: '' });
    setTempSortBy('relevance');
  };

  // Remove single filter
  const removeFilter = (filterType) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: ''
    }));
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({ size: '', color: '', brand: '', gender: '', category: '' });
    setSortBy('relevance');
  };

  // Check if any filters are active
  const hasActiveFilters = Object.values(filters).some(filter => filter !== '');

  // Get filter display names
  const getFilterDisplayName = (type, value) => {
    switch(type) {
      case 'size': return `Size: ${value}`;
      case 'color': return `Color: ${value}`;
      case 'brand': return `Brand: ${value}`;
      case 'gender': return `Gender: ${value}`;
      case 'category': return `Category: ${value}`;
      default: return value;
    }
  };

  return (
    <div className={styles["collection-container"]}>
      {/* First part - Header and Banner */}
      <div className={styles["collection-header-container"]}>
        
        <div className={styles["collection-banner"]}>
          <Image
            src={bannerImage}
            alt={title}
            width={1200}
            height={400}
            className={styles["banner-image"]}
            priority
          />
        </div>
      </div>

      {/* Second part - Products Section */}
      <div className={styles["products-section"]}>
        <div className={styles["products-container"]}>
          <div className={styles["collection-controls"]}>
            <h2 className={styles["products-count"]}>
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
            </h2>
            <button onClick={openFilters} className={styles["filter-button"]}>
              <FaFilter className={styles["filter-icon"]} /> Filter & Sort
            </button>
          </div>

          {/* Active filters */}
          {hasActiveFilters && (
            <div className={styles["active-filters"]}>
              {Object.entries(filters).map(([type, value]) => (
                value && (
                  <div key={`filter-${type}`} className={styles["active-filter-tag"]}>
                    {getFilterDisplayName(type, value)}
                    <button 
                      onClick={() => removeFilter(type)} 
                      className={styles["remove-filter"]}
                      aria-label={`Remove ${type} filter`}
                    >
                      <FaTimes />
                    </button>
                  </div>
                )
              ))}
              <button onClick={clearAllFilters} className={styles["clear-filters"]}>
                Clear All
              </button>
            </div>
          )}

          <FilterSidebar
            isOpen={filtersOpen}
            onClose={closeFilters}
            tempFilters={tempFilters}
            setTempFilters={setTempFilters}
            tempSortBy={tempSortBy}
            setTempSortBy={setTempSortBy}
            availableFilters={availableFilters}
            applyFilters={applyFiltersCallback}
            resetFilters={resetFiltersCallback}
          />

          {loading ? (
            <div className={styles["loading-container"]}>
              <div className={styles["loading-spinner"]}></div>
              <p>Loading products...</p>
            </div>
          ) : (
            <div className={styles["products-grid"]}>
              {filteredProducts.length === 0 ? (
                <div className={styles["no-products"]}>
                  <p>No products found matching your filters.</p>
                  <button onClick={clearAllFilters} className={styles["reset-button"]}>
                    Reset Filters
                  </button>
                </div>
              ) : (
                filteredProducts.map(product => (
                  <div className={styles["product-card"]} key={product.product_id}>
                    <Link
                      href={`/products/${product.gender}/${product.category}/${product.slug}`}
                      passHref
                      className={styles["product-link"]}
                    >
                      <div className={styles["product-image-container"]}>
                        <Image
                          src={`/api/product_image?product_id=${product.product_id}`}
                          alt={product.name}
                          width={400}
                          height={400}
                          className={styles["product-image"]}
                        />
                        {/* Product tag for New Arrivals - only shows when pageType is new-arrivals */}
                        {pageType === "new-arrivals" && (
                          <div className={styles["product-tag"] + " " + styles["new-tag"]}>
                            NEW
                          </div>
                        )}
                        {/* Product tag for Hot Products - only shows when pageType is hot-products */}
                        {pageType === "hot-products" && (
                          <div className={styles["product-tag"] + " " + styles["hot-tag"]}>
                            <FaFire className={styles["fire-icon"]} /> HOT
                          </div>
                        )}
                        <button 
                          className={styles["wishlist-button"]}
                          onClick={(e) => toggleWishlist(e, product)}
                          aria-label={isInWishlist(product.product_id) ? "Remove from wishlist" : "Add to wishlist"}
                        >
                          {isInWishlist(product.product_id) ? (
                            <FaHeart className={`${styles["wishlist-icon"]} ${styles["filled"]}`} />
                          ) : (
                            <FaRegHeart className={styles["wishlist-icon"]} />
                          )}
                        </button>
                      </div>
                      <div className={styles["product-details"]}>
                        <span className={styles["product-category"]}>{product.category}</span>
                        <h3 className={styles["product-name"]}>{product.name}</h3>
                        <div className={styles["product-colors"]}>
                          {colors[product.product_id] && colors[product.product_id].map((color, index) => (
                            <span
                              key={`${product.product_id}-color-${index}`}
                              className={styles["color-dot"]}
                              style={{ backgroundColor: color.hex_code }}
                              title={color.name || color.color_name}
                            />
                          ))}
                        </div>
                        <div className={styles["product-price-container"]}>
                          <p className={styles["product-price"]}>£{product.selling_price}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;