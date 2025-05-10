// FilterSidebar.jsx
"use client";
import React, { useEffect } from 'react';
import "./page.css";

const FilterSidebar = ({ 
  isOpen, 
  onClose, 
  sortBy = "",
  tempSortBy = "",
  setTempSortBy = () => {}, 
  tempFilters = {
    category: "",
    size: "",
    color: "",
    brand: "",
    gender: "",
    minPrice: "",
    maxPrice: ""
  },
  setTempFilters = () => {},
  applyFilters = () => {},
  resetFilters = () => {},
  availableSizes = [], 
  availableColors = [], 
  availableBrands = [],
  availableGenders = [],
  availableCategories = []
}) => {
  // Radio button for sorting options
  const handleSortChange = (value) => {
    setTempSortBy(value);
  };

  // Handler for filter changes with added logging
  const handleFilterChange = (filterType, value) => {
    console.log(`Setting ${filterType} filter to:`, value);
    setTempFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // Log available brands for debugging
  useEffect(() => {
    console.log("Available brands in FilterSidebar:", availableBrands);
  }, [availableBrands]);

  // Default hard-coded options
  const Sizes = ["UK 6 / US 7 / EU 40",
  "UK 6.5 / US 7.5 / EU 40.5","UK 7 / US 8 / EU 41",
  "UK 7.5 / US 8.5 / EU 41.5",
    "UK 8 / US 9 / EU 42",
    "UK 8.5 / US 9.5 / EU 42.5",
    "UK 9 / US 10 / EU 43",
    "UK 9.5 / US 10.5 / EU 43.5",
    "UK 10 / US 11 / EU 44",
    "UK 10.5 / US 11.5 / EU 44.5",
    "UK 11 / US 12 / EU 45",
    "UK 11.5 / US 12.5 / EU 45.5",
    "UK 12 / US 13 / EU 46",
    "UK 12.5 / US 13.5 / EU 46.5",
    "UK 13 / US 14 / EU 47",
    "UK 13.5 / US 14.5 / EU 47.5",
    "UK 14 / US 15 / EU 48",
    "UK 14.5 / US 15.5 / EU 48.5",];
  const Colors = ["Black", "White", "Grey", "Red", "Blue", "Green", "Yellow", "Purple", "Orange", "Pink", "Brown", "Beige", "Navy", "Teal", "Maroon"];
  const Brands = ["Nike", "Puma", "New Balance", "Adidas", "Reebok","Fila"];
  const Genders = ["Men", "Women", "Kids"]; 
  const Categories = ["Trainers", "Running Shoes", "Football Shoes", "Walking Boots", "Basketball Shoes"];

  // Combine hard-coded and dynamic options - make sure to clean and normalize
  const allSizes = [...new Set([...Sizes, ...(availableSizes || [])])];
  const allColors = [...new Set([...Colors, ...(availableColors || [])])];
  const allBrands = [...new Set([...Brands, ...(availableBrands || [])])].map(brand => 
    typeof brand === 'string' ? brand.trim() : brand
  ).filter(Boolean); // Remove empty values
  const allGenders = [...new Set([...Genders, ...(availableGenders || [])])];
  const allCategories = [...new Set([...Categories, ...(availableCategories || [])])];

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="filter-overlay" onClick={onClose}></div>}
      
      {/* Sidebar */}
      <div
        className={`filter-sidebar ${isOpen ? 'open' : ''}`}
        initial={{ x: '-100%', opacity: 0, scale: 0.8 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        exit={{ x: '-100%', opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <div className="filter-sidebar-header">
          <h3>Sort & Filter</h3>
          <button className="close-filter-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="filter-sidebar-content">
          {/* Sort By Section */}
          <div className="sidebar-section">
            <h4>Sort By</h4>
            <div className="sort-options">
              <label className="sort-option">
                <input 
                  type="radio" 
                  name="sort" 
                  value="relevance" 
                  checked={tempSortBy === 'relevance'} 
                  onChange={() => handleSortChange('relevance')}
                />
                <span>Relevance</span>
              </label>
              <label className="sort-option">
                <input 
                  type="radio" 
                  name="sort" 
                  value="price-low-high" 
                  checked={tempSortBy === 'price-low-high'} 
                  onChange={() => handleSortChange('price-low-high')}
                />
                <span>Price: Low to High</span>
              </label>
              <label className="sort-option">
                <input 
                  type="radio" 
                  name="sort" 
                  value="price-high-low" 
                  checked={tempSortBy === 'price-high-low'} 
                  onChange={() => handleSortChange('price-high-low')}
                />
                <span>Price: High to Low</span>
              </label>
              <label className="sort-option">
                <input 
                  type="radio" 
                  name="sort" 
                  value="name-a-z" 
                  checked={tempSortBy === 'name-a-z'} 
                  onChange={() => handleSortChange('name-a-z')}
                />
                <span>Name: A to Z</span>
              </label>
              <label className="sort-option">
                <input 
                  type="radio" 
                  name="sort" 
                  value="name-z-a" 
                  checked={tempSortBy === 'name-z-a'} 
                  onChange={() => handleSortChange('name-z-a')}
                />
                <span>Name: Z to A</span>
              </label>
            </div>
          </div>
          
          {/* Category Filter */}
          <div className="sidebar-section">
            <h4>Category</h4>
            <select 
              className="filter-select"
              value={tempFilters.category || ""}
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              <option value="">All Categories</option>
              {allCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          {/* Size Filter */}
          <div className="sidebar-section">
            <h4>Size</h4>
            <select 
              className="filter-select"
              value={tempFilters.size || ""}
              onChange={(e) => handleFilterChange('size', e.target.value)}
            >
              <option value="">All Sizes</option>
              {allSizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
          
          {/* Color Filter */}
          <div className="sidebar-section">
            <h4>Color</h4>
            <select 
              className="filter-select"
              value={tempFilters.color || ""}
              onChange={(e) => handleFilterChange('color', e.target.value)}
            >
              <option value="">All Colors</option>
              {allColors.map(color => (
                <option key={color} value={color}>{color}</option>
              ))}
            </select>
          </div>
          
          {/* Brand Filter */}
          <div className="sidebar-section">
            <h4>Brand</h4>
            <select 
              className="filter-select"
              value={tempFilters.brand || ""}
              onChange={(e) => handleFilterChange('brand', e.target.value)}
              data-testid="brand-filter"
            >
              <option value="">All Brands</option>
              {allBrands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          {/* Gender filter */}
          <div className="sidebar-section">
            <h4>Gender</h4>
            <select     
              className="filter-select"
              value={tempFilters.gender || ""}
              onChange={(e) => handleFilterChange('gender', e.target.value)}
            >
              <option value="">All Genders</option>
              {allGenders.map(gender => (
                <option key={gender} value={gender}>{gender}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="filter-sidebar-footer">
          <button className="reset-filters-btn" onClick={resetFilters}>Reset</button>
          <button 
            className="apply-filters-btn" 
            onClick={() => { 
              console.log("Applying filters:", tempFilters);
              applyFilters(); 
              onClose && onClose(); 
            }}
          >
            Apply
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;