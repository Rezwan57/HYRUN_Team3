import React from "react";
import Allproducts from "@/data/AllProducts";
import "./page.css"; 
import Footer from "@/components/Homepage/Footer";
import Navbar from "@/components/Navbar";
import Headline from "@/components/Headline";
import { FaFilter } from "react-icons/fa";

const ProductsPage = () => {

  return (
    <div className="container">

      <Headline />    
      <Navbar />

      <div className="header-container">

        <h1 className="title">All Products ({Allproducts.length})</h1>
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
        {Allproducts.map((product) => (
          <div key={product.id} className="productCard">
            <img src={product.image} alt={product.name} className="productImage" />

            {/*product.label && <p className="productLabel">{product.label}</p> */}

            <h2 className="productName">{product.name}</h2>
            <p className="productSubcategory">{product.subcategory} </p>
            <p className="productCategory">{product.category} </p>
            
          {/* <p className="productColors">{product.colors} Colours</p> */}

            <p className="productPrice">£{product.price.toFixed(2)}</p>
          </div>
        ))}

      </div>
        <Footer />
    </div>
  );
};

export default ProductsPage;
