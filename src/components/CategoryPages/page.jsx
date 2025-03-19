"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Allproducts from '@/data/AllProducts';
import Breadcrumb from '@/components/Breadcrumb';
import FilterSidebar from "@/components/filter_sidebar/page";
import "./page.css";

// Banner images mapping
const BANNER_IMAGES = {
  mens: '/assets/gender/men.jpg',
  womens: '/assets/gender/womens.jpg',
  kids: '/assets/gender/kid.jpg',
  trainers: '/assets/gender/kid.jpg',
  default: '/assets/gender/default-banner.jpg'
};

// Comprehensive FilterSection Component
const FilterSection = ({ 
  title, 
  items, 
  currentCategory = '', 
  currentGender = '' 
}) => {
  const generateNavigationUrl = (item) => {
    const normalizedItem = item.toLowerCase().replace(/ /g, '-');
    
    // Routing logic for main/products structure
    if (currentGender) {
      return `/products/${currentCategory}/${normalizedItem}`;
    } else if (currentCategory) {
      return `/products/${currentCategory}/${normalizedItem}`;
    } else {
      return `/products/${normalizedItem}`;
    }
  };

  return (
    <div className="filter-section">
      <h2 className="filter-title">{title}</h2>
      <div className="filter-grid">
        {items.map(item => (
          <Link
            key={item}
            href={generateNavigationUrl(item)}
            className="filter-chip"
          >
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
};

const Banner = ({ gender }) => {
  const normalizedGender = gender.toLowerCase();
  const bannerSrc = BANNER_IMAGES[normalizedGender] || BANNER_IMAGES.default;
  
  return (
    <div className="category-banner">
      <Image
        src={bannerSrc}
        alt={`${gender} collection`}
        width={1200}
        height={300}
        className="banner-image"
        priority
      />
      <div className="banner-content">
        <h2 className="banner-title">
          {gender.charAt(0).toUpperCase() + gender.slice(1)}'s Collection
        </h2>
      </div>
    </div>
  );
};

const ProductCard = ({ product }) => {
  const [isInWishlist, setIsInWishlist] = useState(false);
  
  const toggleWishlist = () => {
    setIsInWishlist(prev => !prev);
  };

  const imageSrc = product.image && product.image.trim() !== "" 
    ? product.image 
    : '/assets/placeholder-product.jpg';

  return (
    <div className="product-card">
      <div className="product-image-container">
        <Image
          src={imageSrc}
          alt={product.name || "Product"}
          fill
          className="product-image"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <button className="wishlist-btn" onClick={toggleWishlist}>
          <span className="heart-icon">{isInWishlist ? "💛" : "♡"}</span>
        </button>
      </div>
      <div className="product-details">
        <h2 className="product-name">{product.name}</h2>
        <p className="product-description">{product.shortDescription}</p>
        <div className="product-footer">
          <span className="product-price">£{product.price.toFixed(2)}</span>
          <button 
            className="add-to-cart-btn"
            onClick={() => console.log('Add to cart:', product.id)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const CategoryPage = ({ category = '', gender = '' }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [genders, setGenders] = useState([]);
  
  const [sortBy, setSortBy] = useState('relevance');
  const [activeFilters, setActiveFilters] = useState({
    size: '',
    color: '',
    brand: '',
    gender: ''
  });
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const [availableSizes, setAvailableSizes] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);
  const [availableBrands, setAvailableBrands] = useState([]);
  const [availableGenders, setAvailableGenders] = useState([]);

  const [tempSortBy, setTempSortBy] = useState('');
  const [tempFilters, setTempFilters] = useState({
    size: '',
    color: '',
    brand: '',
    gender: ''
  });

  useEffect(() => {
    console.log('Current Route Params:', { category, gender });
    console.log('All Products:', Allproducts);

    const normalizedCategory = category 
      ? category.toLowerCase().replace(/-/g, ' ') 
      : '';
    const normalizedGender = gender 
      ? gender.toLowerCase() 
      : '';

    console.log('Normalized Params:', { 
      normalizedCategory, 
      normalizedGender 
    });

    const filtered = Allproducts.filter(product => {
      const productCategory = (product.subcategory || '').toLowerCase().replace(/-/g, ' ');
      const productGender = (product.category || '').toLowerCase();

      console.log('Product Matching:', {
        productCategory,
        productGender,
        inputCategory: normalizedCategory,
        inputGender: normalizedGender
      });

      const matchesCategory = !normalizedCategory || productCategory === normalizedCategory;
      const matchesGender = !normalizedGender || productGender === normalizedGender;

      return matchesCategory && matchesGender;
    });

    console.log('Filtered Products:', filtered);

    setFilteredProducts(filtered);
    
    const uniqueCategories = [...new Set(Allproducts.map(p => 
      p.subcategory?.charAt(0).toUpperCase() + p.subcategory?.slice(1) || "Unknown"
    ))];
    
    const uniqueGenders = [...new Set(Allproducts.map(p => 
      p.category?.charAt(0).toUpperCase() + p.category?.slice(1) || "Unknown"
    ))];
    
    setCategories(uniqueCategories);
    setGenders(uniqueGenders);
    
    setAvailableSizes([...new Set(filtered.flatMap(p => p.sizes || []))].sort());
    setAvailableColors([...new Set(filtered.map(p => p.color || ""))].filter(Boolean).sort());
    setAvailableBrands([...new Set(filtered.map(p => p.brand || ""))].filter(Boolean).sort());
  }, [category, gender]);
  
  useEffect(() => {
    let result = [...filteredProducts];
    
    if (activeFilters.size) {
      result = result.filter(p => 
        p.sizes && p.sizes.includes(activeFilters.size)
      );
    }
    
    if (activeFilters.color) {
      result = result.filter(p => p.color === activeFilters.color);
    }
    
    if (activeFilters.brand) {
      result = result.filter(p => p.brand === activeFilters.brand);
    }

    if (activeFilters.gender) {
      result = result.filter(p => p.category === activeFilters.brand);
    }
    
    switch(sortBy) {
      case 'price-low-high':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    
    setDisplayedProducts(result);
  }, [filteredProducts, sortBy, activeFilters]);

  const renderFilterSections = () => {
    if (!category && categories.length > 0) {
      return (
        <FilterSection
          title="Categories"
          items={categories}
        />
      );
    }
    
    return null;
  };

  // Apply filters and sort logic
  const applyFilters = () => {
    // Logic for applying filters (size, color, brand, gender, sort order)
    console.log("Filters applied", tempFilters, tempSortBy);
    setActiveFilters(tempFilters);
    setSortBy(tempSortBy);
    setIsSidebarOpen(false); // Close the sidebar after applying filters
  };

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

  const resetFilters = () => {
    setTempSortBy('');
    setTempFilters({
      size: '',
      color: '',
      brand: '',
      gender: ''
    });
    setActiveFilters({
      size: '',
      color: '',
      brand: '',
      gender: ''
    });
    setSortBy('relevance');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <main className="category-container">
      <Breadcrumb category={category} gender={gender} />

      {renderFilterSections()}

      {gender && <Banner gender={gender} />}

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

      <div className="page-header">
        <div className="page-title-container">
          <h1 className="page-title">
            {gender ? `${gender.charAt(0).toUpperCase() + gender.slice(1)}'s ` : ''}
            {category ? category.split('-').map(word => 
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ') : 'All Products'}
          </h1>
          <p className="product-count">
            {displayedProducts.length} Product{displayedProducts.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {displayedProducts.length > 0 ? (
        <div className="products-grid">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>No products found matching your filters.</p>
        </div>
      )}
    </main>
  );
};

export default CategoryPage;