"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Breadcrumb from "../../../../../../components/Breadcrumb";
import AddToCart from "../../../../../../components/AddToCart";
import { IoCheckmarkCircle } from "react-icons/io5";

const Product = () => {
  const { gender, category, slug } = useParams(); // Get all dynamic params
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [additionalImages, setAdditionalImages] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [productGender, setProductGender] = useState("");
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Fetch product using category, gender, and slug
        const res = await fetch(
          `/api/products?category=${category}&gender=${gender}&slug=${slug}`,
          { cache: "no-store" }
        );
        if (!res.ok) {
          throw new Error(`Product fetch failed with status: ${res.status}`);
        }
        const data = await res.json();

        if (data.length > 0) {
          const productData = data[0];

          // Fetch main image
          const imageRes = await fetch(
            `/api/product_image?product_id=${productData.product_id}`
          );
          const imageBlob = await imageRes.blob();
          const imageArrayBuffer = await imageBlob.arrayBuffer();
          const imageBase64 = `data:image/jpeg;base64,${Buffer.from(
            imageArrayBuffer
          ).toString("base64")}`;

          // Fetch additional images
          const additionalImagesRes = await fetch(
            `/api/product_image?product_id=${productData.product_id}&all=true`
          );
          const additionalImagesData = await additionalImagesRes.json();

          // Fetch sizes
          const sizesRes = await fetch(
            `/api/product_size?product_id=${productData.product_id}`
          );
          const sizesData = await sizesRes.json();

          // Fetch colors
          const colorsRes = await fetch(
            `/api/product_color?product_id=${productData.product_id}`
          );
          const colorsData = await colorsRes.json();

          // Fetch gender
          const genderRes = await fetch(
            `/api/product_genders?product_id=${productData.product_id}`
          );
          const genderData = await genderRes.json();

          setProduct({
            ...productData,
            imageUrl: imageBase64,
            sizes: sizesData.map((size) => size.uk_size),
            colors: colorsData.map((color) => color.color_name),
            hex: colorsData.map((color) => color.hex_code),
          });
          setMainImage(imageBase64);
          setAdditionalImages(additionalImagesData);
          setProductGender(genderData.gender_name);
        } else {
          console.log("No product found for slug:", slug);
          setProduct(null);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [category, gender, slug]); // Depend on all params

  // Reset isAdded after 5 seconds
  useEffect(() => {
    if (isAdded) {
      const timer = setTimeout(() => {
        setIsAdded(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isAdded]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Product not found
      </div>
    );
  }

  const handleAddToCartClick = (addToCartFn) => {
    const productWithOptions = {
      ...product,
      quantity,
      selectedSize,
      selectedColor,
    };
    addToCartFn(productWithOptions);
    setIsAdded(true);
  };

  return (
    <div className="flex items-start justify-center min-h-screen">
      <div className="px-4 py-2 w-full lg:w-[90vw]">
        <Breadcrumb />

        <div className="rounded-lg p-6 lg:mt-8 mt-2 space-y-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="flex justify-center items-start flex-col lg:flex-row-reverse gap-2">
              <div className="w-full">
                {mainImage ? (
                  <Image
                    src={mainImage}
                    alt={product.name}
                    className="h-full w-full rounded-xl object-cover"
                    height={1080}
                    width={1080}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    No Image Available
                  </div>
                )}
              </div>
              {additionalImages.length > 1 && (
                <div className="flex flex-row lg:flex-col gap-2">
                  {additionalImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setMainImage(img)}
                      className={`relative h-10 w-auto aspect-square md:h-20 rounded-xl lg:rounded-xl overflow-hidden border-2 ${
                        mainImage === img
                          ? "border-yellow-500"
                          : "border-gray-300 hover:border-gray-400"
                      } transition-colors`}
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
              )}
            </div>

            {/* Product Info */}
            <div className="rounded-xl space-y-6 lg:p-6 p-0">
              <h1 className="text-xl lg:text-3xl font-bold mb-2">
                {product.name}
              </h1>
              <span className="text-xl text-neutral-600 italic">
                For {productGender}
              </span>
              <div className="text-3xl font-bold bg-prime w-fit px-4 py-2 rounded-xl">
                £ {product.selling_price}
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="font-semibold mb-2">Select Size</h3>
                <div className="flex gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-16 py-2 rounded-xl border ${
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
              {product.colors &&
                product.hex &&
                product.colors.length === product.hex.length && (
                  <div>
                    <h3 className="font-semibold mb-2">Select Color</h3>
                    <div className="flex gap-4">
                      {product.colors.map((color, index) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-4 py-2 rounded-xl border flex items-center ${
                            selectedColor === color
                              ? "border-yellow-500 bg-yellow-50"
                              : "border-gray-300 hover:border-gray-400"
                          }`}
                        >
                          <span
                            style={{ backgroundColor: product.hex[index] }}
                            className="w-4 h-4 inline-block rounded-full border border-gray-400 mr-2"
                          />
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              {/* Quantity Selection */}
              <div>
                <h3 className="font-semibold mb-2">Quantity</h3>
                <div className="flex items-center gap-0">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 border rounded-xl hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="w-10 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 border rounded-xl hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="relative">
                <AddToCart
                  product={{
                    ...product,
                    quantity,
                    selectedSize,
                    selectedColor,
                  }}
                  className="w-full py-3 bg-prime text-black rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
                  onAdd={handleAddToCartClick}
                />
              </div>
            </div>
          </div>

          <div>
            <h1 className="text-3xl xl:text-6xl font-bold lg:mb-4 mb-2">
              Details
            </h1>
            <p className="text-sm xl:text-xl text-justify leading-2 text-gray-600">
              {product.description}
            </p>
          </div>
        </div>
      </div>
      {isAdded && (
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="absolute flex items-center justify-start gap-4 left-50 top-50 px-3 py-3 shadow-lg rounded-2xl bg-opacity-20 backdrop-blur-md text-green-600 bg-white h-50 w-80 border-2 border-green-600"
        >
          <IoCheckmarkCircle className="text-5xl text-green-600" />
          <p className="text-md">Added to cart!</p>
        </motion.span>
      )}
    </div>
  );
};

export default Product;