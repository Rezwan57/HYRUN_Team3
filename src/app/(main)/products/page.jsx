"use client";
import DynamicPages from "@/components/ProductsPage/page";

export default function AllproductsPage() {
  return <DynamicPages />;
}





/* below is the 2nd versio of the code /*
/*"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import FilterSidebar from "@/components/filter_sidebar/page";
import "./page.css";
import { FaFilter } from "react-icons/fa";
import Image from "next/image";

const ProductsPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [colors, setColors] = useState({});
  const [productSizes, setProductSizes] = useState({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [tempSortBy, setTempSortBy] = useState('relevance');
  const [filters, setFilters] = useState({
    size: '',
    color: '',
    brand: '',
    gender: '',
    category: ''
  });
  const [tempFilters, setTempFilters] = useState({
    size: '',
    color: '',
    brand: '',
    gender: '',
    category: ''
  });

  // Easy fast way to convert between brand names and IDs in our database
  const brandMap = {
    "Nike": 1,
    "Adidas": 2,
    "Puma": 3,
    "Reebok": 4,
    "New Balance": 5,
    "Fila": 6
  };


  /* We could use this to go from ID back to name, but we're not using it currently
  const brandIdToName = Object.entries(brandMap).reduce(
    (acc, [name, id]) => ({ ...acc, [id]: name }), {}
  );



  // All the available filter options
  const [availableSizes, setAvailableSizes] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);
  const [availableBrands, setAvailableBrands] = useState(['Nike', 'Puma', 'New Balance', 'Adidas', 'Reebok', 'Fila']);
  const [availableGenders, setAvailableGenders] = useState(['Men', 'Women', 'Kids']);
  const [availableCategories, setAvailableCategories] = useState([
    "Trainers", "Running Shoes", "Football Shoes", "Walking Boots", "Basketball Shoes"
  ]);
  const [loading, setLoading] = useState(true);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  
  
  // Everything we need when the page loads
  useEffect(() => {
    fetchProducts();
    fetchAvailableColors();
    fetchAvailableSizes();
  }, []);

  // Update the product display whenever filters change
  useEffect(() => {
    if (initialLoadComplete) {
      applyFiltersToProducts();
    }
  }, [filters, sortBy, initialLoadComplete]);

  // Get color data for products after we've filtered them
  useEffect(() => {
    if (filteredProducts.length > 0) {
      fetchProductColors();
    }
  }, [filteredProducts]);

  // Helper to display shoe sizes in a consistent format
  const formatSize = (uk, us, eu) => {
    return `UK ${uk} / US ${us} / EU ${eu}`;
  };

  // Get all available sizes from our database
  const fetchAvailableSizes = async () => {
    try {
      const res = await fetch("/api/sizes");
      const data = await res.json();
      
      // Make sure sizes match our display format
      const formattedSizes = data.map(size => 
        formatSize(size.uk_size, size.us_size, size.eu_size)
      );
      
      setAvailableSizes(formattedSizes);
    } catch (error) {
      console.error("Error fetching sizes:", error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // First get basic product info
      const res = await fetch("/api/products");
      const data = await res.json();
      const productsWithSizes = await Promise.all(
        data.map(async (product) => {
          try {
            // Then add size info for each product
            const res = await fetch(`/api/product_size?product_id=${product.product_id}`);
            const sizeData = await res.json();
            
            // Convert to our display format
            const sizes = sizeData.map(size => 
              formatSize(size.uk_size, size.us_size, size.eu_size)
            );
            
            // Add to our product object
            product.normalizedSizes = sizes;
            
            // Also keep in our separate sizes lookup
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
      
      setAllProducts(productsWithSizes);
      setFilteredProducts(productsWithSizes);
      
      // Get any filter options from the actual products we have
      extractFilterOptions(productsWithSizes);
      
      setLoading(false);
      setInitialLoadComplete(true);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
      setInitialLoadComplete(true);
    }
  };

  // Get all possible colors
  const fetchAvailableColors = () => {
    fetch("/api/colors")
      .then((res) => res.json())
      .then((data) => {
        const colorNames = data.map(color => color.name || color.color_name).filter(Boolean);
        setAvailableColors(colorNames);
      })
      .catch((error) => console.error("Error fetching colors:", error));
  };

  const extractFilterOptions = (products) => {
    // Build unique list of sizes from what's actually in our products
    const allSizes = [];
    
    products.forEach(product => {
      if (product.normalizedSizes && product.normalizedSizes.length > 0) {
        product.normalizedSizes.forEach(size => {
          // No dupes please
          if (!allSizes.includes(size)) {
            allSizes.push(size);
          }
        });
      }
    });
    
    // Add to our master size list
    setAvailableSizes(prev => [...new Set([...prev, ...allSizes])]);
    
    // Do the same for categories and genders
    const categories = [...new Set(products.map(p => p.category).filter(Boolean))];
    const genders = [...new Set(products.map(p => p.gender).filter(Boolean))];
    
    setAvailableCategories(prev => [...new Set([...prev, ...categories])]);
    setAvailableGenders(prev => [...new Set([...prev, ...genders])]);
  };

  const applyFiltersToProducts = () => {
    setLoading(true);
    
    let result = [...allProducts];
    
    // Go through each filter one by one
    if (filters.brand) {
      const brandId = brandMap[filters.brand];
      if (brandId) {
        result = result.filter(product => product.brand_id === brandId);
      }
    }

    if (filters.category) {
      result = result.filter(product => {
        if (!product.category) return false;
        return product.category.toLowerCase().trim() === filters.category.toLowerCase().trim();
      });
    }
    
    if (filters.gender) {
      result = result.filter(product => {
        if (!product.gender) return false;
        return product.gender.toLowerCase().trim() === filters.gender.toLowerCase().trim();
      });
    }
    
    if (filters.color) {
      result = result.filter(product => {
        const productColors = colors[product.product_id] || [];
        return productColors.some(color => {
          const colorName = (color.name || color.color_name || "").toLowerCase();
          return colorName.includes(filters.color.toLowerCase());
        });
      });
    }
    
    if (filters.size) {
      const sizeToMatch = filters.size.trim();
      
      result = result.filter(product => {
        // Skip products with no size data
        if (!product.normalizedSizes || product.normalizedSizes.length === 0) {
          return false;
        }
        
        // Find any size match
        return product.normalizedSizes.some(size => size === sizeToMatch);
      });
    }
    
    // Finally sort what's left if needed
    // If we have a sort option, apply it
    if (sortBy !== 'relevance') {
      result = sortProducts(result, sortBy);
    }
    
    setFilteredProducts(result);
    setLoading(false);
  };

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

  const fetchProductColors = () => {
    // Only get colors we don't already have to avoid unnecessary API calls
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

  const getImageUrl = (productId) => {
    return `/api/product_image?product_id=${productId}`;
  };

  const openFilter = () => {
    setIsFilterOpen(true);
    setTempSortBy(sortBy);
    setTempFilters({...filters});
  };

  const closeFilter = () => {
    setIsFilterOpen(false);
  };

  const applyFilters = () => {
    setSortBy(tempSortBy);
    setFilters({...tempFilters});
    closeFilter();
  };

  const resetFilters = () => {
    setTempSortBy('relevance');
    setTempFilters({
      size: '',
      color: '',
      brand: '',
      gender: '',
      category: ''
    });
  };

  const clearAllFilters = () => {
    setSortBy('relevance');
    setFilters({
      size: '',
      color: '',
      brand: '',
      gender: '',
      category: ''
    });
  };

  // Check if any filters are active
  const hasActiveFilters = () => {
    return Object.values(filters).some(value => value !== '');
  };

  return (
    <div className="container">
      <Breadcrumb />
      <div className="header-container">
        <h1 className="title">
          {loading ? "Loading Products..." : `All Products (${filteredProducts.length})`}
        </h1>
        <div className="filter-sort-container">
          <button className="filter-button" onClick={openFilter}>
            Show Filters <FaFilter size={18} className="filter-icon" />
          </button>
          
          /* Show filters are currently applied 
          {hasActiveFilters() && (
            <div className="active-filters">
              <div className="active-filters-list">
                {Object.entries(filters).map(([key, value]) => 
                  value ? (
                    <span key={key} className="active-filter-tag">
                      {key}: {value}
                      <button 
                        className="remove-filter" 
                        onClick={() => {
                          setFilters(prev => ({...prev, [key]: ''}));
                        }}
                      >
                        ×
                      </button>
                    </span>
                  ) : null
                )}
              </div>
              <button className="clear-filters" onClick={clearAllFilters}>
                Clear All
              </button>
            </div>
          )}
        </div>
      </div>

      
      {/* Side panel with all our filter options 
      <FilterSidebar
        isOpen={isFilterOpen}
        onClose={closeFilter}
        sortBy={sortBy}
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
                  <p className="productSubcategory">{product.subcategory} </p>
                  <p className="productCategory">{product.category} </p>
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
  );
};

export default ProductsPage; 
*/


/* Below is the previous 1st version of the code before adding the filters
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
            [product.product_id]: data,
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
    <div className="w-full">
      <div className="p-5"> 
        <Breadcrumb />
      </div>
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
            key={product.product_id}
            href={`/products/${product.gender}/${product.category}/${product.slug}`}
            passHref
            className="productCard"
          >
            <span className="aspect-square">
              <Image
                width={1000}
                height={1000}
                src={getImageUrl(product.product_id)}
                alt={product.name}
                className="productImage bg-neutral-100"
              />
            </span>

            <div className="productDetails">
              <h2 className="productName">{product.name}</h2>
              <p className="productSubcategory">{product.subcategory} </p>
              <p className="productCategory">{product.category} </p>

              <div className="productColors flex gap-1 lg:gap-2 mt-2">
                {colors[product.product_id] &&
                  colors[product.product_id].map((color) => (
                    <span
                      key={color.color_id}
                      className="w-3 h-3 lg:h-6 lg:w-6 rounded-full border"
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
*/