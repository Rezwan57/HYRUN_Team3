'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

const Product = () => {
  const params = useParams();
  const { slug } = params;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products?slug=${slug}`);
        const data = await res.json();

        if (data.length > 0) {
          const productData = data[0];
          
          const imageRes = await fetch(`/api/product_image?product_id=${productData.product_id}`);
          const imageBlob = await imageRes.blob();
          const imageUrl = URL.createObjectURL(imageBlob);
          
          setProduct({
            ...productData,
            imageUrl,
          });
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <Image
        src={product.imageUrl} 
        alt={product.name}
        width={400}
        height={400}
      />
      <p>{product.description}</p>
      <p>Price: £{product.selling_price.toFixed(2)}</p>
    </div>
  );
};

export default Product;
