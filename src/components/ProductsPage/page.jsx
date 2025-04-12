"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import FilterSidebar from "@/components/filter_sidebar/page";
import Image from "next/image";
import { FaFilter } from "react-icons/fa";
import "./page.css";

const DynamicPages = () => {
  // Banner images mapping
  const BANNER_IMAGES = {
    Men: '/assets/gender/Men.webp',
    men: '/assets/gender/Men.webp',
    women: '/assets/gender/Women.webp',
    Women: '/assets/gender/Women.webp',
    kids: '/assets/gender/kid.webp',
    Kids: '/assets/gender/kid.webp',
    trainers: '/assets/gender/trainers.png',
    Trainers: '/assets/gender/trainers.png',
    runningshoes: '/assets/gender/running.png', 
    'Running Shoes': '/assets/gender/running.png',
    footballshoes: '/assets/gender/football.jpeg',
    'Football Shoes': '/assets/gender/football.jpeg',
    basketballshoes: '/assets/gender/basketball.png',
    'Basketball Shoes': '/assets/gender/basketball.png',
    walkingboots: '/assets/gender/walking.png',
    'Walking Boots': '/assets/gender/walking.png',
     default: '/assets/gender/allproducts.jpeg',
  };

  // reading the URL parameters
  const params = useParams();
  
  // This function help us to consistent string normalization
  const normalize = (str) => {
    if (!str) return "";
    return str.toLowerCase().replace(/[-_\s]+/g, ' ').trim();
  };

  // This function help us for handling gender normalization
  const normalizeGender = (gender) => {
    if (!gender) return "";
    const normalized = gender.toLowerCase().trim();
    if (normalized === "mens") return "men";
    if (normalized === "womens") return "women";
    return normalized;
  };

  
  const determineParameters = () => {
    
    if (params.gender && params.category) {
      return {
        gender: normalizeGender(params.gender),
        category: normalize(params.category)
      };
    }
    
    // If we have only one parameter, to know if it's gender or category
    if (params.gender && !params.category) {
      const param = params.gender.toLowerCase();
      
      // Check if it's a known gender or not
      const knownGenders = ['men', 'mens', 'women', 'womens', 'kids'];
      if (knownGenders.includes(param) || knownGenders.includes(param.replace('s', ''))) {
        return { gender: normalizeGender(param), category: "" };
      }
      
      // Otherwise, assume it's a category
      return { gender: "", category: normalize(param) };
    }
    
    return { gender: "", category: "" };
  };

  const { gender, category } = determineParameters();
  
  // Function to determine which banner images to display based on active filters
  const getBannerImage = () => {
    if (filters.gender && BANNER_IMAGES[filters.gender]) {
      return BANNER_IMAGES[filters.gender];
    } else if (filters.category && BANNER_IMAGES[filters.category]) {
      return BANNER_IMAGES[filters.category];
    }
    return BANNER_IMAGES.default;
  };

  // Debug logging for me to check parameters working or not 
  // once done i will remove it this code
  console.log("URL parameters:", params);
  console.log("Detected parameters:", { gender, category });


  // All variables we are using in the page
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [colors, setColors] = useState({});
  const [productSizes, setProductSizes] = useState({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  // Set initial filters based on improved URL parameter detection
  const initialFilters = {
    size: "",
    color: "",
    brand: "",
    gender: gender,
    category: category,
  };

  const [filters, setFilters] = useState(initialFilters);
  const [tempFilters, setTempFilters] = useState(initialFilters);
  const [sortBy, setSortBy] = useState("relevance");
  const [tempSortBy, setTempSortBy] = useState("relevance");

  // Brands mapping
  const brandMap = {
    "Nike": 1,
    "Adidas": 2,
    "Puma": 3,
    "Reebok": 4,
    "New Balance": 5,
    "Fila": 6
  };

  // Available filter options
  const [availableSizes, setAvailableSizes] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);
  const [availableBrands, setAvailableBrands] = useState([
    "Nike", "Puma", "New Balance", "Adidas", "Reebok", "Fila"
  ]);
  const [availableGenders, setAvailableGenders] = useState(["Men", "Women", "Kids"]);
  const [availableCategories, setAvailableCategories] = useState([
    "Trainers", "Running Shoes", "Football Shoes", "Walking Boots", "Basketball Shoes"
  ]);

  // Initialize data
  useEffect(() => {
    fetchProducts();
    fetchAvailableColors();
    fetchAvailableSizes();
  }, []);

  // React to URL parameters change
  useEffect(() => {
    if (initialLoadComplete) {
      // Re-determine parameters after URL change
      const { gender: newGender, category: newCategory } = determineParameters();
      
      const updatedFilters = {
        ...filters,
        gender: newGender,
        category: newCategory,
      };
      
      console.log("URL params changed, new detected params:", { newGender, newCategory });
      
      setFilters(updatedFilters);
      setTempFilters(updatedFilters);
      
      // Re-apply filters when URL changes
      applyFiltersToProducts(updatedFilters);
    }
  }, [params, initialLoadComplete]);

  // Apply filters when they change
  useEffect(() => {
    if (initialLoadComplete) {
      console.log("Applying filters:", filters);
      applyFiltersToProducts();
    }
  }, [filters, sortBy, initialLoadComplete]);

  // Fetch colors for products after filtering
  useEffect(() => {
    if (filteredProducts.length > 0) {
      fetchProductColors();
    }
  }, [filteredProducts]);

  // Format size helper function
  const formatSize = (uk, us, eu) => {
    return `UK ${uk} / US ${us} / EU ${eu}`;
  };

  // Fetch available sizes
  const fetchAvailableSizes = async () => {
    try {
      const res = await fetch("/api/sizes");
      const data = await res.json();
      
      const formattedSizes = data.map(size => 
        formatSize(size.uk_size, size.us_size, size.eu_size)
      );
      
      setAvailableSizes(formattedSizes);
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
        .map(color => color.name || color.color_name)
        .filter(Boolean);
      
      setAvailableColors(colorNames);
    } catch (error) {
      console.error("Error fetching colors:", error);
    }
  };

  
  {/*This function is trying to determine if two product categories are similar or the same, 
     even if they aren't written exactly the same way */}

  // Improved category matching function
  const categoriesMatch = (category1, category2) => {
    if (!category1 || !category2) return false;
    
    // Normalize both categories
    const normcategory1 = normalize(category1);
    const normcategory2 = normalize(category2);
    
    // Check for direct match
    if (normcategory1 === normcategory2) return true;
    
    // Handle singular-plural variations
    const singularcategory1 = normcategory1.endsWith('s') ? normcategory1.slice(0, -1) : normcategory1;
    const singularcategory2 = normcategory2.endsWith('s') ? normcategory2.slice(0, -1) : normcategory2;
    
    if (singularcategory1 === singularcategory2) return true;
    
    // Check for substring match
    if (normcategory1.includes(normcategory2) || normcategory2.includes(normcategory1)) return true;
    
    // Handle specific category mappings
    const categoryMappings = {
      'trainers': ['sneakers', 'shoes', 'athletic shoes', 'casual shoes'],
      'running shoes': ['runners', 'running trainers', 'jogging shoes'],
      'football shoes': ['soccer shoes', 'football boots', 'soccer cleats'],
      'walking boots': ['hiking boots', 'trekking boots', 'hiking shoes'],
      'basketball shoes': ['basketball sneakers', 'basketball trainers']
    };
    
    // Check if one is in the other's mapping
    for (const [key, values] of Object.entries(categoryMappings)) {
      if ((normcategory1 === key && values.includes(normcategory2)) || 
          (normcategory2 === key && values.includes(normcategory1))) {
        return true;
      }
    }
    
    // Remove spaces and check again
    const noSpacecategory1 = normcategory1.replace(/\s+/g, '');
    const noSpacecategory2 = normcategory2.replace(/\s+/g, '');
    
    if (noSpacecategory1 === noSpacecategory2) return true;
    
    // Handle camelCase vs space-separated words
    const camelToSpace = (str) => str.replace(/([A-Z])/g, ' $1').toLowerCase().trim();
    
    if (camelToSpace(category1) === normcategory2 || camelToSpace(category2) === normcategory1) return true;
    
    return false;
  };

  // Fetch all products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      // First get basic product info
      const res = await fetch("/api/products");
      const data = await res.json();
      
      console.log("Fetched products:", data.slice(0, 3)); // Log first few products
      
      // Add normalized fields to products for consistent filtering
      const productsWithNormalizedFields = data.map(product => ({
        ...product,
        normalizedGender: normalizeGender(product.gender),
        normalizedCategory: normalize(product.category)
      })); 
      
      // Get sizes for each product
      const productsWithSizes = await Promise.all(
        productsWithNormalizedFields.map(async (product) => {
          try {
            const res = await fetch(`/api/product_size?product_id=${product.product_id}`);
            const sizeData = await res.json();
            
            // Format sizes consistently
            const sizes = sizeData.map(size => 
              formatSize(size.uk_size, size.us_size, size.eu_size)
            );
            
            product.normalizedSizes = sizes;
            
            setProductSizes(prev => ({
              ...prev,
              [product.product_id]: sizes
            }));
            
            return product;
          } catch (error) {
            console.error(`Error processing product ${product.product_id}:`, error);
            product.normalizedSizes = [];
            return product;
          }
        })
      );
      
      // Extract filter options from products
      extractFilterOptions(productsWithSizes);
      
      // Store all products
      setAllProducts(productsWithSizes);
      
      // Log normalized data for debugging
      console.log("Products with normalized fields:", 
        productsWithSizes.slice(0, 3).map(p => ({
          id: p.product_id, 
          name: p.name,
          gender: p.gender,
          normalizedGender: p.normalizedGender,
          category: p.category,
          normalizedCategory: p.normalizedCategory
        }))
      );
      
      // Check for category patterns
      const categoryPatterns = new Set();
      productsWithSizes.forEach(p => {
        if (p.category) {
          categoryPatterns.add(p.category);
        }
      });
      console.log("Available category patterns:", [...categoryPatterns]);
      
      // Initial filter application
      applyFiltersToProducts(initialFilters, productsWithSizes);
      
      setLoading(false);
      setInitialLoadComplete(true);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
      setInitialLoadComplete(true);
    }
  };

  // Extract filter options from products
  const extractFilterOptions = (products) => {
    // Extract sizes
    const sizeSet = new Set();
    products.forEach(product => {
      if (product.normalizedSizes && product.normalizedSizes.length > 0) {
        product.normalizedSizes.forEach(size => {
          sizeSet.add(size);
        });
      }
    });
    setAvailableSizes(prev => [...new Set([...prev, ...sizeSet])]);
    
    // Extract categories
    const categories = [...new Set(products
      .map(p => p.category)
      .filter(Boolean))];
    setAvailableCategories(prev => [...new Set([...prev, ...categories])]);
    
    // Extract genders
    const genders = [...new Set(products
      .map(p => p.gender)
      .filter(Boolean))];
    setAvailableGenders(prev => [...new Set([...prev, ...genders])]);
  };

  // Apply filters to products with improved matching
  const applyFiltersToProducts = (currentFilters = filters, productList = allProducts) => {
    setLoading(true);
    
    let result = [...productList];
    const activeFilters = currentFilters || filters;
    
    console.log("Current filters being applied:", activeFilters);
    
    // Apply brand filter
    if (activeFilters.brand) {
      const brandId = brandMap[activeFilters.brand];
      if (brandId) {
        result = result.filter(product => product.brand_id === brandId);
      }
    }

    // Apply category filter with improved matching
    if (activeFilters.category) {
      console.log(`Filtering by category: '${activeFilters.category}'`);
      
      result = result.filter(product => {
        if (!product.category) return false;
        
        const isMatch = categoriesMatch(product.category, activeFilters.category);
        
        // Log detailed debug info for first few products
        if (product.product_id <= 3) {
          console.log(`Product #${product.product_id} (${product.name})`);
          console.log(`  Product category: '${product.category}'`);
          console.log(`  Filter category: '${activeFilters.category}'`);
          console.log(`  Match: ${isMatch}`);
        }
        
        return isMatch;
      });
      
      console.log(`After category filter: ${result.length} products remain`);
    }
    
    // Apply gender filter with improved matching
    if (activeFilters.gender) {
      console.log(`Filtering by gender: '${activeFilters.gender}'`);
      
      result = result.filter(product => {
        if (!product.gender) return false;
        
        const productGender = normalizeGender(product.gender);
        const filterGender = normalizeGender(activeFilters.gender);
        
        const isMatch = productGender === filterGender;
        
        if (product.product_id <= 3) {
          console.log(`Product #${product.product_id} (${product.name})`);
          console.log(`  Product gender: '${product.gender}'`);
          console.log(`  Normalized product gender: '${productGender}'`);
          console.log(`  Filter gender: '${filterGender}'`);
          console.log(`  Match: ${isMatch}`);
        }
        
        return isMatch;
      });
      
      console.log(`After gender filter: ${result.length} products remain`);
    }
    
    // Apply color filter
    if (activeFilters.color) {
      result = result.filter(product => {
        const productColors = colors[product.product_id] || [];
        return productColors.some(color => {
          const colorName = normalize(color.name || color.color_name || "");
          return colorName.includes(normalize(activeFilters.color));
        });
      });
    }
    
    // Apply size filter
    if (activeFilters.size) {
      const sizeToMatch = activeFilters.size.trim();
      
      result = result.filter(product => {
        if (!product.normalizedSizes || product.normalizedSizes.length === 0) {
          return false;
        }
        
        return product.normalizedSizes.some(size => size === sizeToMatch);
      });
    }
    
    // Apply sorting
    if (sortBy !== 'relevance') {
      result = sortProducts(result, sortBy);
    }
    
    console.log(`Filtered products: ${result.length} out of ${productList.length}`);
    
    setFilteredProducts(result);
    setLoading(false);
  };

  // Sort products
  const sortProducts = (products, sortOption) => {
    const sortedProducts = [...products];
    
    switch (sortOption) {
      case 'price-low-high':
        return sortedProducts.sort((a, b) => a.selling_price - b.selling_price);
      case 'price-high-low':
        return sortedProducts.sort((a, b) => b.selling_price - a.selling_price);
      case 'name-a-z':
        return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-z-a':
        return sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return sortedProducts;
    }
  };

  // Fetch colors for filtered products
  const fetchProductColors = () => {
    filteredProducts.forEach((product) => {
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

  // Get image URL
  const getImageUrl = (productId) => {
    return `/api/product_image?product_id=${productId}`;
  };

  // Filter sidebar controls
  const openFilter = () => {
    setIsFilterOpen(true);
    setTempSortBy(sortBy);
    setTempFilters({...filters});
  };

  const closeFilter = () => {
    setIsFilterOpen(false);
  };

  const applyFiltersCallback = () => {
    setSortBy(tempSortBy);
    setFilters({...tempFilters});
    closeFilter();
  };

  const resetFilters = () => {
    // Reset to current URL parameters only
    const { gender: currentGender, category: currentCategory } = determineParameters();
    
    setTempSortBy('relevance');
    setTempFilters({
      size: '',
      color: '',
      brand: '',
      gender: currentGender,
      category: currentCategory
    });
  };

  const clearAllFilters = () => {
    // Keep only current URL parameters
    const { gender: currentGender, category: currentCategory } = determineParameters();
    
    const baseFilters = {
      size: '',
      color: '',
      brand: '',
      gender: currentGender,
      category: currentCategory
    };
    
    setSortBy('relevance');
    setFilters(baseFilters);
  };

  // Check if any additional filters (beyond URL params) are active
  const hasActiveFilters = () => {
    return filters.size !== '' || 
          filters.color !== '' || 
          filters.brand !== '';
  };

  // Remove individual filter while preserving URL parameters
  const removeFilter = (key) => {
    // Make a copy of current filters
    const newFilters = {...filters};
    
    // Clear the specified filter
    newFilters[key] = '';
    
    // Make sure we preserve URL parameters
    const { gender: currentGender, category: currentCategory } = determineParameters();
    
    if (key === 'gender') {
      newFilters.gender = currentGender;
    }
    
    if (key === 'category') {
      newFilters.category = currentCategory;
    }
    
    setFilters(newFilters);
  };

  // Page title based on active filters
  const getPageTitle = () => {
    if (loading) return "Loading Products...";
    
    let title = "Products";
    
    // Use the active filters instead of just URL parameters
    if (filters.gender && filters.category) {
      // Format gender properly (capitalize first letter, remove trailing 's')
      const formattedGender = filters.gender.charAt(0).toUpperCase() + 
                            filters.gender.slice(1).toLowerCase().replace(/s$/, '');
      
      // Format category properly (capitalize each word)
      const formattedCategory = filters.category
        .replace(/([A-Z])/g, ' $1')
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      title = `${formattedGender}'s ${formattedCategory}`;
    } else if (filters.gender) {
      const formattedGender = filters.gender.charAt(0).toUpperCase() + 
                            filters.gender.slice(1).toLowerCase().replace(/s$/, '');
      title = `${formattedGender}'s Products`;
    } else if (filters.category) {
      const formattedCategory = filters.category
        .replace(/([A-Z])/g, ' $1')
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      title = formattedCategory;
    }
    
    return `${title} (${filteredProducts.length})`;
  };

  return (
    <div className="container">
      <Breadcrumb />
      
      {/* Banner Image Section - Full width */}
      <div className="banner-container">
        <Image
          src={getBannerImage()}
          alt={filters.gender || filters.category || "Products"}
          width={1200}
          height={400} 
          className="banner-image"
          priority
        />
      </div>
      
      {/* doing Content wrapper for controlled width */}
      <div className="content-wrapper">
        <div className="header-container">
          <h1 className="title">{getPageTitle()}</h1>
          <div className="filter-sort-container">
            <button className="filter-button" onClick={openFilter}>
              Show Filters <FaFilter size={18} className="filter-icon" />
            </button>
            
            {/* Showing filters that are currently applied */}
            {hasActiveFilters() && (
              <div className="active-filters">
                <div className="active-filters-list">
                  
                  {/* Only show size, color, and brand filters - not URL parameters */}
                  {filters.size && (
                    <span className="active-filter-tag">
                      size: {filters.size}
                      <button className="remove-filter" onClick={() => removeFilter('size')}>×</button>
                    </span>
                  )}
                  
                  {filters.color && (
                    <span className="active-filter-tag">
                      color: {filters.color}
                      <button className="remove-filter" onClick={() => removeFilter('color')}>×</button>
                    </span>
                  )}
                  
                  {filters.brand && (
                    <span className="active-filter-tag">
                      brand: {filters.brand}
                      <button className="remove-filter" onClick={() => removeFilter('brand')}>×</button>
                    </span>
                  )}
                </div>
                <button className="clear-filters" onClick={clearAllFilters}>
                  Clear All
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Filter sidebar */}
        <FilterSidebar
          isOpen={isFilterOpen}
          onClose={closeFilter}
          sortBy={sortBy}
          tempSortBy={tempSortBy}
          setTempSortBy={setTempSortBy}
          tempFilters={tempFilters}
          setTempFilters={setTempFilters}
          applyFilters={applyFiltersCallback}
          resetFilters={resetFilters}
          availableSizes={availableSizes}
          availableColors={availableColors}
          availableBrands={availableBrands}
          availableGenders={availableGenders}
          availableCategories={availableCategories}
        />
        
        {loading ? (
          <div className="loading">Loading products...</div>
        ) : (
          <div className="productList">
            {filteredProducts.length === 0 ? (
              <div className="no-products">
                <p>No products found matching your filters.</p>
                <button onClick={clearAllFilters} className="reset-button">Reset Filters</button>
              </div>
            ) : (
              filteredProducts.map((product) => (
                <Link
                  key={product.product_id}
                  href={`/products/${product.gender}/${product.category}/${product.slug}`}    
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
                            key={color.color_id || `color-${Math.random()}`}
                            className="h-6 w-6 rounded-full border"
                            style={{ backgroundColor: color.hex_code }}
                          />
                        ))}
                    </div>
                    <p className="productPrice">£{product.selling_price}</p>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicPages;