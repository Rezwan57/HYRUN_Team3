"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import AddToCart from "../AddToCart";

function NewProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.slice(-4)))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const getImageUrl = (productId) => {
    return `/api/product_image?product_id=${productId}`;
  };

  return (
    <div className="flex flex-col gap-1 w-full h-auto p-4 mr-0 lg:pr-6 lg:p-0 overflow-hidden">
      <div className="relative flex justify-center items-end bg-gradient-to-r from-sky-200 to-[var(--primary)] rounded-3xl lg:rounded-s-none lg:rounded-e-[2rem] w-full h-full lg:pb-2 pb-10 lg:pt-20 pt-28">
        <h1 className="w-full absolute top-0 left-0 text-[4.72rem] lg:text-[18vh] font-bold uppercase text-black leading-[0.7]">
          New Arrival
        </h1>

        <div className="flex lg:flex-row flex-col justify-center w-full items-center">
          {products.map((product, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 justify-center items-center p-2 shadow-xl bg-black rounded-3xl bg-opacity-30 backdrop-blur-xl m-2 hover:scale-110 transition-transform duration-300 cursor-pointer overflow-hidden"
            >
              <span className="flex justify-center items-center">
                <Image
                  width={512}
                  height={512}
                  src={getImageUrl(product.product_id)}
                  alt={product.name}
                  className="lg:w-auto lg:max-w-56 h-auto object-contain rounded-2xl"
                />
              </span>
              <span className="font-bold text-md text-white ">
                {product.name.length > 20 ? product.name.substring(0, 20) + '...' : product.name}
              </span>
              <span className="font-bold text-xl text-white ">
                £{product.selling_price}
              </span>
              
              <AddToCart product={product} className="bg-prime text-black py-3 rounded-2xl w-full hover:bg-sky-600 hover:text-white" />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => window.location.href = '/products'}
        className="flex justify-between items-center self-end w-full lg:w-[35vw] h-auto bg-prime rounded-full p-2 hover:scale-105 hover:bg-sky-600 transition-transform duration-300"
      >
        <span className="p-4"></span>
        <span className="text-xl text-black">Show More</span>
        <span className="bg-sky-800 bg-opacity-40 text-white p-2 rounded-full text-xl">
          <FaArrowRight />
        </span>
      </button>
    </div>
  );
}

export default NewProducts;

