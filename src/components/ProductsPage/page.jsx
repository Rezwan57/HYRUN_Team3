"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import FilterSidebar from "@/components/filter_sidebar/page";
import Image from "next/image";
import { FaFilter } from "react-icons/fa";
import "./page.css";

const DynamicPages = () => {
  // Add router for navigation when clearing URL filters
  const router = useRouter();

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

  // All variables we are using in the page
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [colors, setColors] = useState({});
  const [productSizes, setProductSizes] = useState({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  
  // Tracking the manually applied filters
  // This will help us to know if the filter is applied by the user or not
  const [manuallyAppliedFilters, setManuallyAppliedFilters] = useState({
    size: false,
    color: false,
    brand: false,
    gender: false,
    category: false
  });

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
      // Re-determing the parameters after URL change 
      const { gender: newGender, category: newCategory } = determineParameters();
      
      const updatedFilters = {
        ...filters,
        gender: newGender,
        category: newCategory,
      };
      
      // Reset manually applied status for gender and category when URL changes
      setManuallyAppliedFilters(prev => ({
        ...prev,
        gender: false,
        category: false
      }));
      
      setFilters(updatedFilters);
      setTempFilters(updatedFilters);
      
      // Re-apply filters when URL changes
      applyFiltersToProducts(updatedFilters);
    }
  }, [params, initialLoadComplete]);

  // Apply filters when they change
  useEffect(() => {
    if (initialLoadComplete) {
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
    
    // Apply brand filter
    if (activeFilters.brand) {
      const brandId = brandMap[activeFilters.brand];
      if (brandId) {
        result = result.filter(product => product.brand_id === brandId);
      }
    }

    // Apply category filter with improved matching
    if (activeFilters.category) {
      result = result.filter(product => {
        if (!product.category) return false;
        return categoriesMatch(product.category, activeFilters.category);
      });
    }
    
    // Apply gender filter with improved matching
    if (activeFilters.gender) {
      result = result.filter(product => {
        if (!product.gender) return false;
        
        const productGender = normalizeGender(product.gender);
        const filterGender = normalizeGender(activeFilters.gender);
        
        return productGender === filterGender;
      });
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
    
    // Mark any changed filters as manually applied
    Object.keys(tempFilters).forEach(key => {
      if (tempFilters[key] !== filters[key]) {
        setManuallyAppliedFilters(prev => ({
          ...prev,
          [key]: tempFilters[key] !== "" // Only mark as true if the filter has a value
        }));
      }
    });
    
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

  // Check if any filter was manually applied (not from URL)
  const hasManuallyAppliedFilters = () => {
    return manuallyAppliedFilters.size || 
           manuallyAppliedFilters.color || 
           manuallyAppliedFilters.brand ||
           (manuallyAppliedFilters.gender && filters.gender) ||
           (manuallyAppliedFilters.category && filters.category);
  };

  // Remove a filter
  const removeFilter = (key) => {
    // Make a copy of current filters
    const newFilters = {...filters};
    
    // Clear the specified filter
    newFilters[key] = '';
    
    // Mark this filter as not manually applied anymore
    setManuallyAppliedFilters(prev => ({
      ...prev,
      [key]: false
    }));
    
    // If removing a URL parameter filter (gender or category), we should redirect
    if ((key === 'gender' || key === 'category') && manuallyAppliedFilters[key]) {
      // Get the original URL parameters
      const { gender: urlGender, category: urlCategory } = determineParameters();
      
      // If we're removing a filter that wasn't in the original URL, just update the filters
      if ((key === 'gender' && filters.gender !== urlGender) || 
          (key === 'category' && filters.category !== urlCategory)) {
        // Just reset this filter to the original URL value
        newFilters[key] = key === 'gender' ? urlGender : urlCategory;
        setFilters(newFilters);
        return;
      }
      
      // If we're removing a URL parameter, we need to redirect
      // Determine the new URL based on remaining filters
      if (key === 'gender' && newFilters.category) {
        // Redirect to just the category
        router.push(`/products/${newFilters.category}`);
        return;
      } else if (key === 'category' && newFilters.gender) {
        // Redirect to just the gender
        router.push(`/products/${newFilters.gender}`);
        return;
      } else {
        // Redirect to all products
        router.push('/products');
        return;
      }
    }
    
    setFilters(newFilters);
  };

  // Clear all filters - UPDATED FUNCTION
  const clearAllFilters = () => {
    // Get the URL parameters to preserve them
    const { gender: urlGender, category: urlCategory } = determineParameters();
    
    // Reset manually applied status for all filters
    setManuallyAppliedFilters({
      size: false,
      color: false,
      brand: false,
      gender: false,
      category: false
    });
    
    // Only clear the manually applied filters, keep the URL-based ones
    const baseFilters = {
      size: '',
      color: '',
      brand: '',
      gender: urlGender, // Keep the URL gender
      category: urlCategory, // Keep the URL category
    };
    
    setSortBy('relevance');
    setFilters(baseFilters);
    
    // No need to redirect since we're keeping the current URL parameters
  };

  // Format filter display text for better readability
  const formatFilterDisplayText = (key, value) => {
    if (key === 'gender') {
      // Capitalize first letter
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
    
    if (key === 'category') {
      // Convert camelCase to Title Case with spaces
      return value
        .replace(/([A-Z])/g, ' $1')
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    
    return value;
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
            
            {/* Only show actively applied filters (not URL-based ones unless manually applied) */}
            {hasManuallyAppliedFilters() && (
              <div className="active-filters">
                <div className="active-filters-list">
                  {filters.gender && manuallyAppliedFilters.gender && (
                    <span className="active-filter-tag">
                      gender: {formatFilterDisplayText('gender', filters.gender)}
                      <button className="remove-filter" onClick={() => removeFilter('gender')}>×</button>
                    </span>
                  )}
                  
                  {filters.category && manuallyAppliedFilters.category && (
                    <span className="active-filter-tag">
                      category: {formatFilterDisplayText('category', filters.category)}
                      <button className="remove-filter" onClick={() => removeFilter('category')}>×</button>
                    </span>
                  )}
                  
                  {filters.size && manuallyAppliedFilters.size && (
                    <span className="active-filter-tag">
                      size: {filters.size}
                      <button className="remove-filter" onClick={() => removeFilter('size')}>×</button>
                    </span>
                  )}
                  
                  {filters.color && manuallyAppliedFilters.color && (
                    <span className="active-filter-tag">
                      color: {filters.color}
                      <button className="remove-filter" onClick={() => removeFilter('color')}>×</button>
                    </span>
                  )}
                  
                  {filters.brand && manuallyAppliedFilters.brand && (
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
                  <div className="product-image-container">
                    <Image
                      width={1000}
                      height={1000}
                      src={getImageUrl(product.product_id)}
                      alt={product.name}
                      className="productImage"
                    />
                  </div>
                  <div className="productDetails">
                    <h2 className="productName">{product.name}</h2>
                    <p className="productSubcategory">{product.subcategory}</p>
                    <p className="productCategory">{product.category}</p>
                    <div className="productColors">
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