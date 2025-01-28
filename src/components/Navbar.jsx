"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { PiStarFourFill } from "react-icons/pi";
import { RiShoppingBag4Fill } from "react-icons/ri";
import { FaHeart } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";

const categories = [
  { id: 1, name: "Trainers", link: "/trainers/" },
  { id: 2, name: "Running Shoes", link: "/running-shoes/" },
  { id: 3, name: "Football Shoes", link: "/football-shoes/" },
  { id: 4, name: "Walking Boots", link: "/walking-boots/" },
  { id: 5, name: "Basketball Shoes", link: "/basketball-shoes/" },
];

const subcategories = [
  { id: 1, name: "Men", category_id: 1, link: "/trainers/men" },
  { id: 2, name: "Women", category_id: 1, link: "/trainers/women" },
  { id: 3, name: "Kids", category_id: 1, link: "/trainers/kids" },
  { id: 4, name: "Men", category_id: 2, link: "/running-shoes/men" },
  { id: 5, name: "Women", category_id: 2, link: "/running-shoes/women" },
  { id: 6, name: "Kids", category_id: 2, link: "/running-shoes/kids" },
  { id: 7, name: "Men", category_id: 3, link: "/football-shoes/men" },
  { id: 8, name: "Women", category_id: 3, link: "/football-shoes/women" },
  { id: 9, name: "Kids", category_id: 3, link: "/football-shoes/kids" },
  { id: 10, name: "Men", category_id: 4, link: "/walking-boots/men" },
  { id: 11, name: "Women", category_id: 4, link: "/walking-boots/women" },
  { id: 12, name: "Kids", category_id: 4, link: "/walking-boots/kids" },
  { id: 13, name: "Men", category_id: 5, link: "/basketball-shoes/men" },
  { id: 14, name: "Women", category_id: 5, link: "/basketball-shoes/women" },
  { id: 15, name: "Kids", category_id: 5, link: "/basketball-shoes/kids" },
];

const genders = [...new Set(subcategories.map((sub) => sub.name))];

const CategoryCard = ({ shoeTypeName, link }) => (
  <div className="card">
    <Link href={link} className="hover:text-yellow-600">
      {shoeTypeName}
    </Link>
  </div>
);

export default function Navbar() {
  const [inputText, setInputText] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch); // Toggle the search bar visibility
  };

  return (
    <header className="sticky top-0 z-[999]">
      <nav className="flex lg:grid grid-cols-5 grid-flow-row w-full bg-white bg-opacity-30 backdrop-blur-3xl px-5 lg:px-0">
        <div className="row-span-3 flex items-center justify-center">
          <Link href={"/"}>
            <Image
              src="/assets/logo/LogoDark.png"
              alt="logo"
              width={512}
              height={512}
              className="w-56 h-auto"
            />
          </Link>
        </div>

        <div className="flex justify-end lg:grid grid-cols-5 grid-flow-col col-span-4  lg:px-12 py-2 h-14 w-full gap-4">
          <div className="hidden lg:inline relative col-start-2 col-end-4 place-content-center h-full">
            <IoSearch className="absolute text-xl inset-0 left-1 translate-x-2/4 translate-y-2/4" />
            <input
              type="text"
              className="w-full h-full top-3 pl-12 pr-24 rounded-full bg-neutral-500 bg-opacity-30 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500"
              value={inputText}
              onChange={handleInputChange}
            />
            <button
              className={`absolute right-1 top-1 bg-yellow-400 w-20 h-8 rounded-full transition-transform duration-150 ease-in-out transform ${
                inputText.trim() ? "scale-100" : "scale-0"
              }`}
            >
              Search
            </button>
          </div>

          <div className="relative lg:hidden flex col-start-4 col-end-5 place-self-center">
            <IoSearch className="h-6 w-6" onClick={toggleSearch} />{" "}
            {/* Add click handler to toggle search */}
            {showSearch && (
              <div className="absolute flex gap-2 top-10 right-0 mx-3 translate-x-28 bg-neutral-500 p-2 rounded-full">
                <input
                  type="text"
                  className="w-sreen h-10 pl-6 lg:pl-12 pr-24 rounded-full bg-white focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500"
                  value={inputText}
                  onChange={handleInputChange}
                />
                <button className="flex items-center justify-center bg-yellow-400 w-10 h-10 rounded-full transition-transform duration-150 ease-in-out transform">
                  <IoSearch className="h-6 w-6" />
                </button>
              </div>
            )}
          </div>

          <div className="lg:hidden inline col-start-4 col-end-5 place-self-center">
            <IoPerson className="h-6 w-6" />
          </div>

          <div className="col-start-5 col-end-6 justify-self-end place-self-center flex items-center h-full gap-6">
            <FaHeart className="hidden lg:inline text-2xl cursor-pointer" />
            <RiShoppingBag4Fill className="hidden lg:inline text-2xl cursor-pointer" />
            <button className="hidden lg:inline bg-yellow-400 w-32 h-full rounded-full">
              Login 
            </button>
            <button
              className={`lg:hidden flex items-center gap-1 ${
                showCategories ? "text-black" : "text-neutral-700"
              }`}
              onClick={toggleCategories}
            >
              <IoMenu className="text-3xl" />
            </button>
          </div>
        </div>

        <div className="row-span-2 col-span-4 bg-yellow-400 px-2 py-1 hidden lg:flex items-center justify-start text-neutral-700">
          <div className="flex items-center w-full px-4 gap-16 text-uppercase">
            <button
              className={`flex items-center gap-1 ${
                showCategories ? "text-black" : "text-neutral-700"
              }`}
              onClick={toggleCategories}
            >
              <IoMenu className="text-2xl" />
              <p>Categories</p>
            </button>

            <div className="flex items-center justify-between w-full px-4">
              {categories.map((categories, index) => (
                <Link href={categories.link} key={index}>
                  {categories.name}
                </Link>
              ))}
              <Link href="/" className="flex items-center gap-1">
                <PiStarFourFill className="text-md" />
                <p>New Arrivals</p>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {showCategories && (
        <div className="absolute h-auto lg:h-screen w-full top-full p-10 bg-white bg-opacity-30 backdrop-blur-3xl z-10 m-auto">
          <div className="flex flex-wrap gap-28 w-full max-w-screen-lg p-4 text-black">
            {genders.map((gender) => (
              <div key={gender} className="gender-category">
                <h2 className="text-4xl mb-5 border-b-2 border-neutral-400">
                  {gender}
                </h2>
                <div className="subcategory-cards flex flex-col gap-2 text-xl">
                  {categories.map((category) => (
                    <CategoryCard
                      key={category.id}
                      shoeTypeName={category.name}
                      link={
                        subcategories.find(
                          (subcategory) =>
                            subcategory.name === gender &&
                            subcategory.category_id === category.id
                        ).link
                      }
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
