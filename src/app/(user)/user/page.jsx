"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../../public/assets/logo/LogoDark.png";
import {
  IoPersonOutline,
  IoLocationOutline,
  IoReceiptOutline,
  IoLogOutOutline,
} from "react-icons/io5";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
      return;
    }
    setUser(JSON.parse(storedUser));
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="flex flex-col items-start justify-start min-h-screen bg-gray-200">
      <header className="flex items-center justify-between w-full bg-white lg:px-10 px-4 py-2">
        <Image
          src={Logo}
          alt="Logo"
          width={200}
          height={200}
          className="lg:w-48 w-32"
        />
        <div className="relative">
          <button
            onClick={handleDropdown}
            className="flex justify-between items-start gap-3 bg-none p-2 lg:p-3 lg:pr-6  rounded-full text-center"
          >
            <span className="bg-sky-400 text-white rounded-full w-10 lg:w-12 h-10 lg:h-12 flex items-center justify-center text-sm lg:text-xl font-semibold">
              {user?.firstName?.[0]}
            </span>

            <div className="hidden lg:flex flex-col justify-start items-start">
              <p className="text-gray-600">
                <span className="text-md lg:text-sm font-bold">
                  {user?.firstName + " " + user?.lastName}
                </span>
              </p>
              <p className="text-sm lg:text-xs text-gray-600">{user?.email}</p>
            </div>
          </button>
          {showDropdown && (
            <div className="absolute flex flex-col lg:left-0 right-0 lg:top-20 top-12 bg-white bg-opacity-25 backdrop-blur-md shadow-lg rounded-lg p-2 gap-1 w-48 lg:w-full">
              <Link className="flex justify-start items-center gap-4 px-3 py-1 hover:bg-neutral-200 rounded-md" href="/user/edit-profile">
                <IoPersonOutline className="text-lg" />
                <p className="flex items-center gap-2 text-gray-600 hover:text-gray-800 py-2">
                  Edit Profile
                </p>
              </Link>
              <Link className="flex justify-start items-center gap-4 px-3 py-1 hover:bg-neutral-200 rounded-md" href="/user/addresses">
                <IoLocationOutline className="text-lg" />
                <p className="flex items-center gap-2 text-gray-600 hover:text-gray-800 py-2">
                  Addresses
                </p>
              </Link>
              <Link className="flex justify-start items-center gap-4 px-3 py-1 hover:bg-neutral-200 rounded-md" href="/user/orders">
                <IoReceiptOutline className="text-lg" />
                <p className="flex items-center gap-2 text-gray-600 hover:text-gray-800 py-2">
                  Order History
                </p>
              </Link>
              <button
                onClick={handleLogout}
                className="flex justify-start items-center gap-2 w-full mt-1 rounded-md bg-neutral-100 text-red-600 hover:text-gray-800 py-3 px-4"
              >
                <IoLogOutOutline className="text-lg" /> Logout
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="w-auto lg:w-full p-4">
        <h2 className="text-4xl font-bold mb-5">User Profile</h2>
        <div className="flex justify-start items-start w-full gap-5 bg-white p-4 lg:p-8 rounded-lg text-center">
          <span className="bg-sky-400 text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl font-semibold">
            {user?.firstName?.[0]}
          </span>

          <div className="flex flex-col items-start gap-1">
            <p className="text-gray-600">
              <span className="text-md lg:text-2xl font-semibold">
                {user?.firstName + " " + user?.lastName}
              </span>
            </p>
            <p className="text-sm lg:text-md text-gray-600">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
