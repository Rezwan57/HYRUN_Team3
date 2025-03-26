"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  IoMenu,
  IoSearch,
  IoReturnUpBackOutline,
  IoCallOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import { PiStarFourFill, PiHeart } from "react-icons/pi";
import { SlBasket } from "react-icons/sl";
import { VscAccount } from "react-icons/vsc";
import { IoReceiptOutline } from "react-icons/io5";
import { motion } from "framer-motion";


const gender = ["Men", "Women", "Kids"]; // for gender links in the navbar

const categories = [
  { id: 1, name: "Trainers", link: "/products/Trainers/" },
  { id: 2, name: "Running Shoes", link: "/products/RunningShoes/" },
  { id: 3, name: "Football Shoes", link: "/products/FootballShoes/" },
  { id: 4, name: "Walking Boots", link: "/products/WalkingBoots/" },
  { id: 5, name: "Basketball Shoes", link: "/products/BasketballShoes/"},
];

const subcategories = [
  { id: 1, name: "Men", category_id: 1, link: "/products/Trainers/mens" },
  { id: 2, name: "Women", category_id: 1, link: "/products/Trainers/womens" },
  { id: 3, name: "Kids", category_id: 1, link: "/products/Trainers/kids" },
  { id: 4, name: "Men", category_id: 2, link: "/products/RunningShoes/mens" },
  { id: 5, name: "Women", category_id: 2, link: "/products/RunningShoes/womens" },
  { id: 6, name: "Kids", category_id: 2, link: "/products/RunningShoes/kids" },
  { id: 7, name: "Men", category_id: 3, link: "/products/FootballShoes/mens" },
  { id: 8, name: "Women", category_id: 3, link: "/products/FootballShoes/womens" },
  { id: 9, name: "Kids", category_id: 3, link: "/products/FootballShoes/kids" },
  { id: 10, name: "Men", category_id: 4, link: "/products/WalkingBoots/mens" },
  { id: 11, name: "Women", category_id: 4, link: "/products/WalkingBoots/womens" },
  { id: 12, name: "Kids", category_id: 4, link: "/products/WalkingBoots/kids" },
  { id: 13, name: "Men", category_id: 5, link: "/products/BasketballShoes/mens" },
  { id: 14, name: "Women", category_id: 5, link: "/products/BasketballShoes/womens" },
  { id: 15, name: "Kids", category_id: 5, link: "/products/BasketballShoes/kids" },
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
  const [hoveredSubcategory, setHoveredSubcategory] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  let hoverTimeout;
  let categoryTimeout;

  const toggleAccount = () => {
    setShowAccount(!showAccount);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputText(value);

    if (value) {
      setShowFullPageSearch(true);
      const filteredResults = allProducts.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  };

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  const handleMouseEnterCategories = () => {
    clearTimeout(categoryTimeout);
    setShowCategories(true);
  };

  const handleMouseLeaveCategories = () => {
    categoryTimeout = setTimeout(() => {
      setShowCategories(false);
    }, 200);
  };

  const handleMouseEnter = (gender) => {
    clearTimeout(hoverTimeout);
    setHoveredSubcategory(gender);
  };

  const handleMouseLeave = () => {
    hoverTimeout = setTimeout(() => {
      setHoveredSubcategory(null);
    }, 200);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // Fetch all products once on mount
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data); // Store all products
        localStorage.setItem("products", JSON.stringify(data));
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload();
  };

  const getImageUrl = (productId) => {
    return `/api/product_image?product_id=${productId}`;
  };

  return (
    <header className="sticky top-0 z-[999] transition-all duration-300 ease-in-out">
      <nav className="flex lg:grid grid-cols-6 grid-flow-row w-full bg-white bg-opacity-80 backdrop-blur-3xl px-5 py-2 lg:px-0">
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

        <div className="flex items-center justify-end lg:justify-between col-start-2 col-end-7 pr-0 lg:pr-4 py-2 h-14 w-full gap-6">
          {/* menu buttons */}
          <div className="row-span-2 col-span-5 px-2 py-1 hidden lg:flex items-center justify-start text-neutral-700">
            <div className="flex items-center w-full gap-4 text-uppercase">
              <div className="hidden lg:flex items-center justify-around gap-6 w-full">
                <Link
                  href="/"
                  className="flex items-center gap-1 hover:underline"
                >
                  <p>Home</p>
                </Link>

                <div
                  className="relative group"
                  onMouseEnter={handleMouseEnterCategories}
                  onMouseLeave={handleMouseLeaveCategories}
                >
                  <Link
                    href="/"
                    className="flex items-center gap-1 hover:underline"
                  >
                    <p>Categories</p>
                  </Link>

                  {showCategories && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.5 }}
                      className="absolute -left-10 mt-2 w-60 bg-white border rounded-lg shadow-xl z-10 p-2 pointer-events-auto"
                      onMouseEnter={handleMouseEnterCategories}
                      onMouseLeave={handleMouseLeaveCategories}
                    >
                      <Link
                        href="/products"
                        className="block px-4 py-2 hover:bg-gray-100 rounded-md"
                      >
                        All Products
                      </Link>
                      {categories.map((category) => (
                        <Link
                          key={category.id}
                          href={category.link}
                          className="block px-4 py-2 hover:bg-gray-100 rounded-md"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
            
                {genders.map((gender, index) => (
                  <div
                    key={`${gender}-${index}`}
                    className="relative group"
                    onMouseEnter={() => handleMouseEnter(gender)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {/* here below i have made the gender links and below 
                        one also the i have made the new arrivals links*/ }

                    <Link href={`/${gender.toLowerCase()}`}  className="font-medium hover:underline">
                      {gender}
                    </Link>

                    {hoveredSubcategory === gender && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.5 }}
                        className="absolute -left-10 mt-2 w-60 bg-white border rounded-lg shadow-xl z-10 p-2 pointer-events-auto"
                        onMouseEnter={() => handleMouseEnter(gender)}
                        onMouseLeave={handleMouseLeave}
                      >
                        {categories.map((category) => {
                          const subcategoryLink = subcategories.find(
                            (subcategory) =>
                              subcategory.name === gender &&
                              subcategory.category_id === category.id
                          )?.link;

                          return (
                            <Link
                              key={category.id}
                              href={subcategoryLink || category.link}
                              className="block px-4 py-2 hover:bg-gray-100 rounded-md"
                            >
                              {category.name}
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </div>
                ))}

                <Link
                  href="/NewArrivals"
                  className="flex items-center gap-1 hover:underline"
                >
                  <PiStarFourFill className="text-md" />
                  <p>New Arrivals</p>
                </Link>
              </div>
            </div>
          </div>  

          <div className="flex items-center justify-end gap-2 h-full w-auto">
            {/* Search */}
            <div className="hidden lg:flex relative h-full w-auto">
              <IoSearch className="absolute text-xl inset-0 left-1 translate-x-2/4 translate-y-2/4" />
              <input
                type="text"
                className="w-60 h-full top-3 pl-12 pr-4 rounded-full bg-neutral-400 bg-opacity-30 focus:outline-none placeholder:text-neutral-400"
                placeholder="Search for products"
                value={inputText}
                onChange={handleInputChange}
              />
            </div>

            {/* Login */}
            <div className="relative hidden lg:flex items-center justify-end gap-2 h-full w-auto">
              <button
                className="hidden lg:flex items-center justify-between bg-neutral-400 bg-opacity-30 gap-2 h-full w-full rounded-full px-2"
                onClick={() => setShowAccount(!showAccount)}
              >
                <VscAccount className="h-10 w-10" />
                <span className="flex flex-col items-start justify-center ml-1 w-full">
                  {user ? (
                    <span className="text-xs">{user.firstName}</span>
                  ) : (
                    <span>Sign in</span>
                  )}
                </span>
              </button>

              {showAccount && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.5 }}
                  className="absolute hidden lg:flex left-0 top-12 border shadow-xl bg-white rounded-xl p-2 w-40"
                >
                  <ul className="w-full">
                    {user ? (
                      <>
                        <li>
                          <Link
                            href="/user"
                            className="flex items-center justify-start py-2 px-4 hover:bg-gray-100 rounded-md"
                          >
                            <VscAccount className="h-4" />
                            <span className="ml-2">Profile</span>
                          </Link>
                        </li>
                      </>
                    ) : (
                      <li>
                        <Link
                          href="/login"
                          className="flex items-center justify-start py-2 px-4 hover:bg-gray-100 rounded-md"
                        >
                          Sign In
                        </Link>
                      </li>
                    )}
                    <li>
                      <Link
                        href="/orders"
                        className="flex items-center justify-start py-2 px-4 hover:bg-gray-100 rounded-md"
                      >
                        <IoReceiptOutline className="h-4" />
                        <span className="ml-2">Your Orders</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/return"
                        className="flex items-center justify-start py-2 px-4 hover:bg-gray-100 rounded-md"
                      >
                        <IoReturnUpBackOutline className="h-4" />
                        <span className="ml-2">Return</span>
                      </Link>
                    </li>

                    {user && (
                      <li className="border-t border-gray-200 mt-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center justify-start w-full py-2 px-4 hover:bg-gray-100 rounded-md text-left"
                        >
                          <IoLogOutOutline className="h-4" />
                          <span className="ml-2">Logout</span>
                        </button>
                      </li>
                    )}
                  </ul>
                </motion.div>
              )}
            </div>

            {/* other menu */}
            <div className="flex items-center justify-center h-full lg:gap-2 gap-5 w-auto rounded-full bg-neutral-400 lg:bg-opacity-30 bg-opacity-0 bg-none mr-2 px-0 lg:px-4">
              <div className="lg:flex items-center justify-center gap-4 hidden text-sm">
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
                {showAccount && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.5 }}
                    className="absolute flex lg:hidden right-0 top-6 bg-white shadow-xl rounded-xl p-2 w-40"
                  >
                    <ul className="w-full">
                      {user ? (
                        <>
                          <li>
                            <Link
                              href="/user"
                              className="flex items-center justify-start py-2 px-4 hover:bg-gray-100 rounded-md"
                            >
                              <VscAccount className="h-4" />
                              <span className="ml-2">Profile</span>
                            </Link>
                          </li>
                        </>
                      ) : (
                        <li>
                          <Link
                            href="/login"
                            className="flex items-center justify-start py-2 px-4 hover:bg-gray-100 rounded-md"
                          >
                            Sign In
                          </Link>
                        </li>
                      )}
                      <li>
                        <Link
                          href="/orders"
                          className="flex items-center justify-start py-2 px-4 hover:bg-gray-100 rounded-md"
                        >
                          <IoReceiptOutline className="h-4" />
                          <span className="ml-2">Your Orders</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/return"
                          className="flex items-center justify-start py-2 px-4 hover:bg-gray-100 rounded-md"
                        >
                          <IoReturnUpBackOutline className="h-4" />
                          <span className="ml-2">Return</span>
                        </Link>
                      </li>

                      {user && (
                        <li className="border-t border-gray-200 mt-2">
                          <button
                            onClick={handleLogout}
                            className="flex items-center justify-start w-full py-2 px-4 hover:bg-gray-100 rounded-md text-left"
                          >
                            <IoLogOutOutline className="h-4" />
                            <span className="ml-2">Logout</span>
                          </button>
                        </li>
                      )}
                    </ul>
                  </motion.div>
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
        </div>
      </nav>

      {showCategories && (
        <div className="absolute lg:hidden flex h-screen w-full top-full lg:p-auto p-10 lg:pb-0 pb-20 bg-white bg-opacity-70 backdrop-blur-3xl z-10 lg:overflow-hidden overflow-y-auto">
          <div className="flex items-start justify-start flex-wrap gap-0 lg:gap-10 w-full max-w-screen-lg text-black h-screen">

            {genders.map((gender, index) => (
              <div
                key={`${gender}-${index}`}
                className="gender-category w-72 p-2"
              >
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
          className="fixed inset-0 bg-white bg-opacity-10 backdrop-blur-2xl z-[999] flex items-start justify-center h-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowFullPageSearch(false)}
        >
          <motion.div
            className="w-full max-w-2xl p-8"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
          >
            <div className="relative w-full">
              <input
                type="text"
                className="w-full h-12 pl-12 pr-24 rounded-full bg-white focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500"
                value={inputText}
                onChange={handleInputChange}
                placeholder="Search..."
              />
              <IoSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 h-6 w-6" />
              <button
                className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-yellow-400 text-black px-4 py-2 rounded-full"
                onClick={() => setShowFullPageSearch(false)}
              >
                Cancel
              </button>
            </div>

            {searchResults.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Search Results</h2>
                <div className="grid grid-cols-1 gap-4" >
                  {searchResults.map((result) => (
                    
                      <Link
                      key={result.id}
                        href={`/products/${result.gender}/${result.category}/${result.slug}`}
                        className="flex items-start justify-start p-2 gap-2 hover:bg-gray-100 rounded-xl bg-white shadow-xl"
                        onClick={() => setShowFullPageSearch(false)}
                      >
                        <Image
                          width={128}
                          height={128}
                          src={getImageUrl(result.product_id)}
                          alt={result.name}
                          className="w-24 h-24 object-cover rounded-md"
                        />
                        <div className="flex flex-col justify-start items-start  gap-2 p-2">
                          <span className="text-xl font-bold ">{result.name}</span>
                          <span className="text-xl ">£{result.selling_price}</span>
                        </div>
                      </Link>
                
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </header>
  );
}

