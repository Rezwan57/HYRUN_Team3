'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import AllProducts from '@/data/AllProducts';
import Image from 'next/image';

const Product = () => {
  const params = useParams();
  const { id } = params;

  const product = AllProducts.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <Image src={product.image} alt={product.name} width={400} height={400} />
      <p>{product.shortDescription}</p>
      <p>Price: £{product.price.toFixed(2)}</p>
    </div>
  );
};

export default Product;
