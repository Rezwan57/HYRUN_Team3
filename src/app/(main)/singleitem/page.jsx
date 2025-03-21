"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Homepage/Footer";
import Navbar from "@/components/Navbar";
import Headline from "@/components/Headline";
import { IoMdArrowBack } from "react-icons/io";

// Mock product data
const product = {
  id: 1,
  name: "Running Shoes",
  selling_price: 120.0,
  description:
    "High-performance running shoes designed for maximum comfort and durability. Features advanced cushioning technology and breathable mesh upper.",
  category: "Running",
  rating: 4.5,
  reviews: 128,
  sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11", "UK 12"],
  colors: ["Black", "White", "Red"],
  image: "/assets/FW/1.png",
  additionalImages: ["/assets/FW/1.png"],
};

// Mock similar products
const products = [
  {
    id: 2,
    name: "Training Shoes",
    selling_price: 100.0,
    rating: 4.2,
    image: "/assets/FW/2.png",
  },
  {
    id: 3,
    name: "Running Shoes Pro",
    selling_price: 150.0,
    rating: 4.7,
    image: "/assets/FW/3.png",
  },
  {
    id: 4,
    name: "Sport Runner",
    selling_price: 130.0,
    rating: 4.4,
    image: "/assets/FW/4.png",
  },
  {
    id: 5,
    name: "Daily Runner",
    selling_price: 110.0,
    rating: 4.3,
    image: "/assets/FW/5.png",
  },
];

const ProductDetailPage = () => {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [mainImage, setMainImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    console.log("Added to cart:", {
      ...product,
      selectedSize,
      selectedColor,
      quantity,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
              <Headline />    
              <Navbar />
        

      {/* Main Content */}
      <div
        className="container mx-auto px-4 py-8"
        style={{ paddingTop: "120px" }} // Adjust this value to match the combined height of Headline and Navbar
      >
        <Link
          href="/products"
          className="inline-flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900"
        >
          <IoMdArrowBack />
          Back to Products
        </Link>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Images - Reduced sizes */}
            <div className="space-y-4">
              <div className="relative h-64 md:h-72 rounded-lg overflow-hidden">
                <Image
                  src={mainImage}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {product.additionalImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setMainImage(img)}
                    className="relative h-16 md:h-20 rounded-lg overflow-hidden border-2 hover:border-yellow-500 transition-colors"
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <div className="text-yellow-500">★</div>
                    <span className="ml-1">{product.rating}</span>
                    <span className="text-gray-500 ml-1">
                      ({product.reviews} reviews)
                    </span>
                  </div>
                  <span className="text-gray-500">|</span>
                  <span className="text-gray-500">{product.category}</span>
                </div>
              </div>

              <p className="text-gray-600">{product.description}</p>

              <div className="text-2xl font-bold text-yellow-600">
                £{product.selling_price.toFixed(2)}
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="font-semibold mb-2">Select Size</h3>
                <div className="grid grid-cols-3 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 rounded-md border ${
                        selectedSize === size
                          ? "border-yellow-500 bg-yellow-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <h3 className="font-semibold mb-2">Select Color</h3>
                <div className="flex gap-4">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-md border ${
                        selectedColor === color
                          ? "border-yellow-500 bg-yellow-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selection */}
              <div>
                <h3 className="font-semibold mb-2">Quantity</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 border rounded-md hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 border rounded-md hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full py-3 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Similar Products Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link href={`/products/${product.id}`} key={product.id}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-40">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1">{product.name}</h3>
                    <p className="text-yellow-600 font-bold">
                      £{product.selling_price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="text-yellow-500">★</div>
                      <span className="text-sm text-gray-600">
                        {product.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
