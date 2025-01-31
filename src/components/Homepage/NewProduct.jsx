import Image from "next/image";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import sneakers from "@/data/HeroSectionData";
import './style.css'

function NewProducts() {
  return (
    <div className="flex lg:flex-row flex-col gap-2 lg:gap-0 w-full h-auto p-4 lg:p-0">
      <div className="relative flex justify-center items-end bg-gradient-to-r from-teal-900 to-green-900 rounded-3xl lg:rounded-s-none lg:rounded-e-[2rem] w-full h-full lg:pb-0 pb-10 lg:pt-20 pt-28">
        <h1 className="w-full absolute top-0 left-0 text-[4.72rem] lg:text-[18vh] font-bold uppercase text-white leading-[0.7]">
          New Arrival
        </h1>

        <div className="flex lg:flex-row flex-col justify-center w-full items-center">
          {sneakers.map((sneaker, index) => (
            <div key={index} className="flex flex-col gap-4 justify-center items-center p-2 bg-black rounded-3xl bg-opacity-20 backdrop-blur-xl m-2 hover:scale-110 transition-transform duration-300 cursor-pointer">
              <span className="flex justify-center items-center bg-sky-100 p-4 rounded-2xl">
                <Image
                  src={sneaker.image}
                  width={250}
                  height={250}
                  alt="Shoe"
                  className="lg:w-auto lg:max-w-56 h-auto "
                />
              </span>
              <span className="font-bold text-xl text-white ">{sneaker.name}</span>
              <span className="font-bold text-3xl text-white ">£{sneaker.price}</span>

              <button className="bg-green-500 text-black py-3 rounded-2xl w-full hover:bg-green-600 hover:text-white">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      <button className="flex flex-row lg:flex-col justify-between items-center h-auto bg-green-600 rounded-full mx-0 lg:mx-2 p-2 hover:scale-105 hover:bg-green-900 transition-transform duration-300">
        <span className="p-4"></span>
        <span className="vertical-text text-2xl text-white">
          Show More
        </span>
        <span className="bg-gray-800 bg-opacity-15 text-white p-2 lg:p-5 rounded-full text-2xl">
          <FaArrowRight />
        </span>
      </button>
    </div>
  );
}

export default NewProducts;
