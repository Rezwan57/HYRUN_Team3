"use client";
import React from "react";
import AddProductForm from "./add-product/page";
import { useRouter } from 'next/navigation';

export default function page() {

  const router = useRouter()

  const handleAddProductClick = () => {
    router.push("/admin/products/add-product");
  };

  return (
    <>
      <div className="h-[120vh]">
        <button onClick={handleAddProductClick}>Add Product</button>
      </div>
    </>
  );
}

