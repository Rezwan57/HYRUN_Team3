"use client";
import React from 'react';
import "./page.css";


    const FilterSidebar = ({ 
    isOpen, 
    onClose, 
    sortBy,
    tempSortBy,
    setTempSortBy, 
    tempFilters,
    setTempFilters,
    applyFilters,
    resetFilters,
    availableSizes, 
    availableColors, 
    availableBrands,
    availableGenders 
    }) => {
    // Radio button for sorting options
    const handleSortChange = (value) => {
        setTempSortBy(value);
    };

    // Handler for filter changes
    const handleFilterChange = (filterType, value) => {
        setTempFilters(prev => ({
        ...prev,
        [filterType]: value
        }));
    };

    return (
        <>
        {/* Overlay */}
        {isOpen && <div className="filter-overlay" onClick={onClose}></div>}
        
        {/* Sidebar */}
        <div className={`filter-sidebar ${isOpen ? 'open' : ''}`}>
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
            
            {/* Size Filter */}
            <div className="sidebar-section">
                <h4>Size</h4>
                <select 
                className="filter-select"
                value={tempFilters.size}
                onChange={(e) => handleFilterChange('size', e.target.value)}
                >
                <option value="">All Sizes</option>
                <option value="UK 6">UK 6</option>
                <option value="UK 6.5">UK 6.5</option>
                <option value="UK 7">UK 7</option>
                <option value="UK 7.5">UK 7.5</option>
                <option value="UK 8">UK 8</option>
                <option value="UK 8.5">UK 8.5</option>
                <option value="UK 9">UK 9</option>
                <option value="UK 9.5">UK 9.5</option>
                <option value="UK 10">UK 10</option>
                <option value="UK 10.5">UK 10.5</option>
                <option value="UK 11">UK 11</option>
                {availableSizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                ))}
                </select>
            </div>
            
            {/* Color Filter */}
            <div className="sidebar-section">
                <h4>Color</h4>
                <select 
                className="filter-select"
                value={tempFilters.color}
                onChange={(e) => handleFilterChange('color', e.target.value)}
                >
                <option value="">All Colors</option>
                <option value="Black">Black</option>
                <option value="White">White</option>
                <option value="Grey">Grey</option>
                <option value="Red">Red</option>
                {availableColors.map(color => (
                    <option key={color} value={color}>{color}</option>
                ))}
                </select>
            </div>
            
            {/* Brand Filter */}
            <div className="sidebar-section">
                <h4>Brand</h4>
                <select 
                className="filter-select"
                value={tempFilters.brand}
                onChange={(e) => handleFilterChange('brand', e.target.value)}
                >
                <option value="">All Brands</option>
                <option value="Nike">Nike</option>
                <option value="Puma">Puma</option>
                <option value="New Balance">New Balance</option>
                <option value="Adidas">Adidas</option>
                <option value="Reebok">Reebok</option>
                {availableBrands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                ))}
                </select>
            </div>

            {/* gender filter */}
            <div className="sidebar-section">
                <h4>Gender</h4>
                <select     
                className="filter-select"
                value={tempFilters.gender}
                onChange={(e) => handleFilterChange('gender', e.target.value)}
                >
                
                <option value="Mens">Mens</option>
                <option value="Womens">Womens</option>
                <option value="Kids">Kids</option>
                {availableGenders.map(gender => (
                    <option key={gender} value={gender}>{gender}</option>
                ))}
                </select>
            </div>

            </div>
            
            <div className="filter-sidebar-footer">
            <button className="reset-filters-btn" onClick={resetFilters}>Reset</button>
            <button className="apply-filters-btn" onClick={() => { applyFilters(); onClose(); }}>Apply</button>
            </div>
        </div>
        </>
    );
    };

    export default FilterSidebar;
