"use client";
import React, { useState, useEffect } from "react";

export default function AddProductForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "trainers",
    gender: "male",
    brand_id: "",
    price: "",
    stock_quantity: "",
    image_url: "",
  });

  const [brands, setBrands] = useState([]);

  // Fetch brands from API
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await fetch("/api/brands");
        const data = await res.json();
        setBrands(data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchBrands();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      alert("Product added successfully!");
      setFormData({
        name: "",
        description: "",
        category: "trainers",
        gender: "male",
        brand_id: "",
        price: "",
        stock_quantity: "",
        image_url: "",
      });
    } else {
      alert("Error adding product");
    }
  };

  return (
    <div className="absolute top-0 left-0 w-screen h-screen mx-auto flex flex-col justify-center items-center bg-black bg-opacity-20 backdrop-blur-md rounded-lg shadow-lg p-10">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-1/2">
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" required className="w-full p-2 border rounded" />

        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required className="w-full p-2 border rounded"></textarea>

        <select name="category" value={formData.category} onChange={handleChange} required className="w-full p-2 border rounded">
          <option value="trainers">Trainers</option>
          <option value="running-shoes">Running Shoes</option>
          <option value="boots">Boots</option>
          <option value="basketball-shoes">Basketball Shoes</option>
          <option value="football-shoes">Football Shoes</option>
        </select>

        <select name="gender" value={formData.gender} onChange={handleChange} required className="w-full p-2 border rounded">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="kids">Kids</option>
        </select>

        {/* Brand Selection Dropdown */}
        <select name="brand_id" value={formData.brand_id} onChange={handleChange} required className="w-full p-2 border rounded">
          <option value="">Select a Brand</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>

        <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required className="w-full p-2 border rounded" />

        <input type="number" name="stock_quantity" value={formData.stock_quantity} onChange={handleChange} placeholder="Stock Quantity" required className="w-full p-2 border rounded" />

        <input type="text" name="image_url" value={formData.image_url} onChange={handleChange} placeholder="Image URL" className="w-full p-2 border rounded" />

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Add Product</button>
      </form>
    </div>
  );
}
