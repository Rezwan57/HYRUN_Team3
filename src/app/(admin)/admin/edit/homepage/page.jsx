"use client";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function EditHomepage() {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    shortDescription: "",
    price: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updatingProduct, setUpdatingProduct] = useState(null);

  useEffect(() => {
    fetch("/api/edithome")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("brand", formData.brand);
    data.append("shortDescription", formData.shortDescription);
    data.append("price", formData.price);
    if (imageFile) data.append("image", imageFile);

    try {
      let res;
      if (updatingProduct) {
        // Updating existing product
        res = await fetch(`/api/edithome/${updatingProduct.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      } else {
        // Creating new product
        if (!imageFile) {
          alert("Please select an image");
          return;
        }
        res = await fetch("/api/edithome", {
          method: "POST",
          body: data,
        });
      }

      if (res.ok) {
        const result = await res.json();

        if (updatingProduct) {
          // Update product in state
          const updatedProducts = products.map((product) =>
            product.id === updatingProduct.id
              ? { ...formData, id: updatingProduct.id }
              : product
          );
          setProducts(updatedProducts);
        } else {
          // Add new product to state
          const newProduct = await res.json();
          setProducts([...products, newProduct]);
        }

        // Reset everything
        setFormData({ name: "", brand: "", shortDescription: "", price: "" });
        setImageFile(null);
        setIsEditing(false);
        setUpdatingProduct(null);
      } else {
        alert("Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting form.");
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setFormData({ ...product });
    setIsEditing(true);
    setUpdatingProduct(product);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/edithome/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete product");
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleClose = () => {
    setIsEditing(false);
    setSelectedProduct(null);
    setUpdatingProduct(null);
  };

  return (
    <div className="p-4 w-full mx-auto">
      <div className="flex items-center justify-between mb-4 px-5 py-3 bg-neutral-200 rounded-xl">
        <h2 className="text-2xl font-bold ">Edit Homepage</h2>
        <button
          onClick={() => setIsEditing(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add Product
        </button>
      </div>
      <div className="relative">
        <ul className="space-y-2 w-full">
          {products.map((product) => (
            <li
              key={product.id}
              className="flex items-center justify-between gap-4 bg-neutral-100 rounded-xl p-2"
            >
              <div className="flex items-center gap-5">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={100}
                  height={100}
                  className="w-20 h-20 object-contain bg-white rounded-md p-2"
                />
                <div className="flex items-center gap-5">
                  <span className="font-bold">{product.name}</span>
                  <span className="text-sm">{product.brand}</span>
                </div>
              </div>

              <div className="flex items-center gap-8 px-8">
                <button
                  onClick={() => handleEdit(product)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
        {isEditing && (
          <motion.form
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onSubmit={handleSubmit}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 space-y-4 w-120 bg-neutral-800 p-4"
          >
            <h2 className="text-2xl font-bold mb-4">
              {isEditing ? "Edit Product" : "Add Product"}
            </h2>
            <input
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <input
              name="brand"
              placeholder="Brand"
              value={formData.brand}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <textarea
              name="shortDescription"
              placeholder="Short Description"
              value={formData.shortDescription}
              onChange={handleChange}
              rows={3}
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              className="w-full p-2 border rounded"
            />
            <div className="flex items-center justify-start gap-5">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {isEditing ? "Update" : "Upload"}
              </button>
              <button
                onClick={handleClose}
                className="text-red-500 hover:underline"
              >
                Close
              </button>
            </div>
          </motion.form>
        )}
      </div>
    </div>
  );
}
