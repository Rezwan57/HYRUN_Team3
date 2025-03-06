'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { IoMdArrowBack } from 'react-icons/io';

const Product = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState('');
  const [additionalImages, setAdditionalImages] = useState([]);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log('Current slug from useParams:', slug); // Debug slug
        const res = await fetch(`/api/products?slug=${slug}`, {
          cache: 'no-store', // Prevent caching
        });
        if (!res.ok) {
          throw new Error(`Product fetch failed with status: ${res.status}`);
        }
        const data = await res.json();
        console.log('Raw API response:', data); // Debug full response

        if (data.length > 0) {
          const productData = data[0];
          console.log('Selected product:', productData); // Debug selected product

          const imageRes = await fetch(`/api/product_image?product_id=${productData.product_id}`);
          const imageBlob = await imageRes.blob();
          const imageArrayBuffer = await imageBlob.arrayBuffer();
          const imageBase64 = `data:image/jpeg;base64,${Buffer.from(imageArrayBuffer).toString('base64')}`;

          const additionalImagesRes = await fetch(`/api/product_image?product_id=${productData.product_id}&all=true`);
          const additionalImagesData = await additionalImagesRes.json();

          const sizesRes = await fetch(`/api/product_size?product_id=${productData.product_id}`);
          const sizesData = await sizesRes.json();
          const colorsRes = await fetch(`/api/product_color?product_id=${productData.product_id}`);
          const colorsData = await colorsRes.json();

          setProduct({
            ...productData,
            imageUrl: imageBase64,
            sizes: sizesData.map((size) => size.uk_size),
            colors: colorsData.map((color) => color.color_name),
          });
          setMainImage(imageBase64);
          setAdditionalImages(additionalImagesData);
          console.log('Main image:', imageBase64);
          console.log('Additional images:', additionalImagesData);
        } else {
          console.log('No product found for slug:', slug);
          setProduct(null);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  const handleAddToCart = () => {
    console.log('Added to cart:', {
      ...product,
      selectedSize,
      selectedColor,
      quantity,
    });
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <Link href="/products" className="inline-flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900">
          <IoMdArrowBack />
          Back to Products
        </Link>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative h-full w-full aspect-square md:h-72 rounded-lg overflow-hidden">
                {mainImage ? (
                  <Image
                    src={mainImage}
                    alt={product.name}
                    fill
                    className="h-full w-full object-cover aspect-square"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    No Image Available
                  </div>
                )}
              </div>
              {additionalImages.length > 1 && (
                <div className="flex gap-4">
                  {additionalImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setMainImage(img)}
                      className={`relative h-16 w-auto aspect-square md:h-20 rounded-lg overflow-hidden border-2 ${
                        mainImage === img ? 'border-yellow-500' : 'border-gray-300 hover:border-gray-400'
                      } transition-colors`}
                    >
                      <Image src={img} alt={`${product.name} view ${index + 1}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-gray-600">{product.description}</p>
              <div className="text-2xl font-bold text-yellow-600">£{product.selling_price}</div>

              {/* Size Selection */}
              <div>
                <h3 className="font-semibold mb-2">Select Size</h3>
                <div className="grid grid-cols-3 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 rounded-md border ${
                        selectedSize === size ? 'border-yellow-500 bg-yellow-50' : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              {product.colors && (
                <div>
                  <h3 className="font-semibold mb-2">Select Color</h3>
                  <div className="flex gap-4">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded-md border ${
                          selectedColor === color ? 'border-yellow-500 bg-yellow-50' : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

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

              <button
                onClick={handleAddToCart}
                className="w-full py-3 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;