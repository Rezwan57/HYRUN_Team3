"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  IoMenu,
  IoSearch,
  IoReturnUpBackOutline,
  IoCallOutline,
} from "react-icons/io5";
import { PiStarFourFill, PiHeart } from "react-icons/pi";
import { SlBasket } from "react-icons/sl";
import { VscAccount } from "react-icons/vsc";
import { MdLocalOffer } from "react-icons/md";
import { IoReceiptOutline } from "react-icons/io5";
import { motion } from "framer-motion";

const navlinks = [
  { id: 1, name: "All Trainers", link: "/trainers/" },
  { id: 2, name: "Running Shoes", link: "/running-shoes/" },
  { id: 3, name: "Featured products", link: "/products" },
  { id: 4, name: "20% off sale", link: "/products/" },
];

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
  const [showCategories, setShowCategories] = useState(false);
  const [showFullPageSearch, setShowFullPageSearch] = useState(false);
  const [showAccount, setShowAccount] = useState(false);

  const toggleAccount = () => {
    setShowAccount(!showAccount);
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
    if (event.target.value) {
      setShowFullPageSearch(true);
    }
  };

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  return (
    <header className="sticky top-0 z-[999] transition-all duration-300 ease-in-out">
      <nav className="flex lg:grid grid-cols-6 grid-flow-row w-full bg-white bg-opacity-80 backdrop-blur-3xl px-5 lg:px-0">
        <div className="row-span-3 flex items-center justify-center">
          <Link href={"/"}>
            <Image
              src="/assets/logo/LogoYDark.png"
              alt="logo"
              width={512}
              height={512}
              className="lg:w-40 w-56 h-auto select-none outline-none"
            />
          </Link>
        </div>

        <div className="flex items-center justify-end lg:justify-between col-start-2 col-end-7 pr-0 lg:pr-4 py-2 h-14 w-full gap-2">
          {/* section 1 */}
          <div className="relative hidden lg:flex items-center justify-end gap-2 h-full w-auto">
            <button
              className="hidden lg:flex items-center justify-between  bg-neutral-400 bg-opacity-30 gap-2 h-full w-full rounded-full px-2"
              onClick={toggleAccount}
            >
              <VscAccount className="h-10 w-10" />
              <span className="flex flex-col items-start justify-center ml-1 w-full">
                <span>Sign in</span>
              </span>
            </button>

            {/* Menu */}
            {showAccount && (
              <div className="absolute hidden lg:flex left-0 top-12 bg-white shadow-xl rounded-xl p-2 w-40">
                <ul>
                  <li>
                    <Link
                      href="/login"
                      className="block py-2 px-4 hover:bg-gray-100"
                    >
                      Sign In
                    </Link>
                  </li>
                  {/*<li>
                    <Link
                      href="/sign-in"
                      className="block py-2 px-4 hover:bg-gray-100"
                    >
                      Orders
                    </Link>
                  </li>
                   <li>
                    <button className="block py-2 px-4 w-full text-left hover:bg-gray-100">
                      Logout
                    </button>
                  </li> */}
                </ul>
              </div>
            )}

            <Link
              href="/offers"
              className="hidden lg:flex items-center justify-between  bg-neutral-400 bg-opacity-30 gap-2 h-full w-auto  rounded-full px-2"
            >
              <MdLocalOffer className="h-5 w-5" />
              <span className="mr-2">Offers</span>
            </Link>
          </div>

          {/* section 2 */}
          <div className="hidden lg:flex relative h-full w-auto">
            <IoSearch className="absolute text-xl inset-0 left-1 translate-x-2/4 translate-y-2/4" />
            <input
              type="text"
              className="w-full h-full top-3 pl-12 pr-24 rounded-full  bg-neutral-400 bg-opacity-30 focus:outline-none "
              placeholder="Search for products"
              value={inputText}
              onChange={handleInputChange}
            />
          </div>

          {/* sectio 3 */}
          <div className="flex items-center justify-center h-full gap-6 w-auto rounded-full   bg-neutral-400  lg:bg-opacity-30 bg-opacity-0 bg-none mr-2 px-0 lg:px-8">
            <div className="lg:flex items-center justify-center gap-4 hidden text-sm">
              <Link
                href="/orders"
                className="flex items-center justify-center gap-1 hover:text-yellow-700"
              >
                <IoReceiptOutline className="h-4" />
                <span className="ml-2">Your Orders</span>
              </Link>
              <span className="h-6 border-r-[1px] border-neutral-300" />
              <Link
                href="/cart"
                className="flex items-center justify-center gap-1 hover:text-yellow-700"
              >
                <SlBasket className="h-4" />
                <span className="ml-2">Cart</span>
              </Link>
              <span className="h-6 border-r-[1px] border-neutral-300" />
              <Link
                href="/wishlist"
                className="flex items-center justify-center gap-1 hover:text-yellow-700"
              >
                <PiHeart className="h-4" />
                <span className="ml-2">Wishlist</span>
              </Link>
              <span className="h-6 border-r-[1px] border-neutral-300" />
              <Link
                href="/return"
                className="flex items-center justify-center gap-1 hover:text-yellow-700"
              >
                <IoReturnUpBackOutline className="h-4" />
                <span className="ml-2">Return</span>
              </Link>
              <span className="h-6 border-r-[1px] border-neutral-300" />
              <Link
                href="/contact-us"
                className="flex items-center justify-center gap-1 hover:text-yellow-700"
              >
                <IoCallOutline className="h-4" />
                <span className="ml-2">Contact us</span>
              </Link>
            </div>

            <div className="relative lg:hidden flex col-start-4 col-end-5 place-self-center">
              <IoSearch
                className="h-6 w-6"
                onClick={() => setShowFullPageSearch(true)}
              />
            </div>

            <div className="relative lg:hidden flex col-start-4 col-end-5 place-self-center">
              <button onClick={toggleAccount}>
                <VscAccount className="h-6 w-6" />
              </button>
                {/* Menu */}
                {showAccount && (
                  <div className="absolute flex lg:hidden right-0 top-6 bg-white shadow-xl rounded-xl p-2 w-40">
                    <ul>
                      <li>
                        <Link
                          href="/login"
                          className="block py-2 px-4 hover:bg-gray-100"
                        >
                          Sign In
                        </Link>
                      </li>
                      {/*<li>
                    <Link
                      href="/sign-in"
                      className="block py-2 px-4 hover:bg-gray-100"
                    >
                      Orders
                    </Link>
                  </li>
                   <li>
                    <button className="block py-2 px-4 w-full text-left hover:bg-gray-100">
                      Logout
                    </button>
                  </li> */}
                    </ul>
                  </div>
                )}
            </div>

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

        <div className="row-span-2 col-span-5 bg-prime px-2 py-1 hidden lg:flex items-center justify-start text-neutral-700">
          <div className="flex items-center w-full px-4 gap-16 text-uppercase">
            <button
              className={`flex items-center gap-1 ${
                showCategories ? "text-yellow-700" : "text-black"
              }`}
              onClick={toggleCategories}
            >
              <IoMenu className="text-2xl" />
              <p>Categories</p>
            </button>

            <div className="flex items-center justify-between w-full px-4">
              {navlinks.map((navlinks, index) => (
                <Link href={navlinks.link} key={index} className="hover:underline">
                  {navlinks.name}
                </Link>
              ))}
              <Link href="/" className="flex items-center gap-1 hover:underline">
                <PiStarFourFill className="text-md" />
                <p>New Arrivals</p>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {showCategories && (
        <div className="absolute h-screen w-full top-full lg:p-auto p-10 lg:pb-0 pb-20 bg-white bg-opacity-70 backdrop-blur-3xl z-10 lg:overflow-hidden overflow-y-auto ">
          <div className="flex items-start justify-start flex-wrap gap-0 lg:gap-10 w-full max-w-screen-lg text-black h-screen ">
            {genders.map((gender) => (
              <div key={gender} className="gender-category w-72 p-2">
                <h2 className="text-left text-4xl mb-5 border-b-[2px] border-yellow-400 py-2">
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
      {showFullPageSearch && (
        <motion.div
          className="fixed inset-0 bg-neutral-400 bg-opacity-80 backdrop-blur-xl z-[999] flex items-start justify-center h-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-2xl p-8 relative"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
          >
            <input
              type="text"
              className="w-full h-12 pl-12 pr-24 rounded-full bg-white focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500"
              value={inputText}
              onChange={handleInputChange}
              placeholder="Search..."
            />
            <IoSearch className="absolute left-12 top-1/2 transform -translate-y-1/2 text-gray-500 h-6 w-6" />
            <button
              className="absolute right-10 top-1/2 transform -translate-y-1/2 bg-yellow-400 text-black px-4 py-2 rounded-full"
              onClick={() => setShowFullPageSearch(false)}
            >
              Cancel
            </button>
          </motion.div>
        </motion.div>
      )}
    </header>
  );
}
