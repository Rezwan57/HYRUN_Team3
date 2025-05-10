"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaArrowRight, FaLeaf } from "react-icons/fa";
import AddToCart from "../AddToCart";
import "./NewProducts.css";
 
const Genders = () => {
  return (
    <div className="genders">
      <Link href="/products/mens" className="gender-link">
        <div className="Men's">
          <Image src="/assets/gender/Mens1.jpeg" width={500} height={500} alt="Mens" />
          <div className="gender-name-box">Men's</div>
        </div>
      </Link>
      
      <Link href="/products/womens" className="gender-link">
        <div className="Women's">
          <Image src="/assets/gender/Womens1.jpeg" width={500} height={500} alt="Womens" />
          <div className="gender-name-box">Women's</div>
        </div>
      </Link>
      
      <Link href="/products/kids" className="gender-link">
        <div className="Kid's">
          <Image src="/assets/gender/Kids1.jpeg" width={500} height={500} alt="Kids" />
          <div className="gender-name-box">Kid's</div>
        </div>
      </Link>
    </div>
  );
};
 
const Sports = () => {
  return (
    <div className="genders">
      <Link href="/products/category/trainers" className="sport-link">
        <div className="Trainers">
          <Image src="/assets/gender/Trainers1.avif" width={200} height={200} alt="Trainers" />
          <div className="sport-badge">SPORT</div>
          <div className="sport-name-box">Trainers</div>
        </div>
      </Link>
      
      <Link href="/products/category/basketball" className="sport-link">
        <div className="Basketball">
          <Image src="/assets/gender/Basketball1.avif" width={200} height={200} alt="Basketball" />
          <div className="sport-badge">SPORT</div>
          <div className="sport-name-box">Basketball</div>
        </div>
      </Link>
      
      <Link href="/products/category/walking" className="sport-link">
        <div className="Walking">
          <Image src="/assets/gender/Walking1.avif" width={200} height={200} alt="Walking" />
          <div className="sport-badge">SPORT</div>
          <div className="sport-name-box">Walking</div>
        </div>
      </Link>
      
      <Link href="/products/category/football" className="sport-link">
        <div className="Football">
          <Image src="/assets/gender/Football1.avif" width={200} height={200} alt="Football" />
          <div className="sport-badge">SPORT</div>
          <div className="sport-name-box">Football</div>
        </div>
      </Link>
      
      <Link href="/products/category/running" className="sport-link">
        <div className="Running">
          <Image src="/assets/gender/Running1.jpg" width={200} height={200} alt="Running" />
          <div className="sport-badge">SPORT</div>
          <div className="sport-name-box">Running</div>
        </div>
      </Link>
    </div>
  );
};

function NewArrivals() {
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
            <Link
              key={index}
              href={`/products/${product.gender}/${product.category}/${product.slug}`}
              passHref
              className="flex flex-col gap-4 justify-center items-center p-2 shadow-xl bg-black rounded-3xl bg-opacity-30 backdrop-blur-xl m-2 hover:scale-110 transition-transform duration-300 cursor-pointer overflow-hidden"
            >
              <span className="flex justify-center items-center">
                <Image
                  width={512}
                  height={512}
                  src={getImageUrl(product.product_id)}
                  alt={product.name}
                  className="lg:max-w-56 h-auto object-contain rounded-2xl aspect-square"
                />
              </span>
              <span className="font-bold text-md text-white ">
                {product.name.length > 20 ? product.name.substring(0, 20) + '...' : product.name}
              </span>
              <span className="font-bold text-xl text-white ">
                £{product.selling_price}
              </span>
              
              <AddToCart product={product} className="bg-prime text-black py-3 rounded-2xl w-full hover:bg-sky-600 hover:text-white" />
            </Link>
          ))}
        </div>
      </div>

      <button
        onClick={() => window.location.href = '/collections'}
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
 
const NewProducts = () => {
  return (
    <div>
      <Genders />
      <NewArrivals />
      <Sports />
    </div>
  );
};

export default NewProducts;