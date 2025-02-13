"use client";
import React, { useState } from "react";
import AddProductForm from "../../components/products/AddProductForm";

export default function page() {
  const [showAddProductForm, setShowAddProductForm] = useState(false);

  const handleAddProductClick = () => {
    setShowAddProductForm(true);
  };

  return (
    <>
      <div className="h-[120vh]">
        <button onClick={handleAddProductClick}>Add Product</button>
      </div>
      {showAddProductForm && <AddProductForm />}
    </>
  );
}
