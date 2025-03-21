"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Logo from "../../../../public/assets/logo/LogoDark.png";
import { FaArrowLeft } from "react-icons/fa6";

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("All fields are required!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (!formData.agreeToTerms) {
      setError("You must agree to the terms!");
      return;
    }

    console.log("Signing up with:", formData);
    setError(""); // Clear errors on success

    // Backend Connection and API Fetch
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          user_email: formData.email,
          user_password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong!");
        setSuccess("");
      } else {
        setSuccess("Account created successfully! You can now log in.");
        setError("");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          agreeToTerms: false,
        });
        router.push("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="hidden w-1/2 lg:block h-full p-2">
        <div
          className=" h-full bg-cover bg-no-repeat bg-center rounded-xl"
          style={{
            backgroundImage: "url(/assets/FW/auth.jpg)",
          }}
        />
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex flex-col justify-start items-center w-full lg:w-1/2 h-screen bg-white">
        <div className="flex justify-between items-start w-full p-10">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-auto hover:text-amber-500 transition-colors duration-300"
          >
            <FaArrowLeft className="text-xl" />
            <p>Back to Home</p>
          </Link>
          <Image
            src={Logo}
            alt="Logo"
            width={256}
            height={256}
            className="mb-4"
          />
        </div>
        <div className="w-75">
          <h2 className="text-3xl font-bold mb-2">
            Create Your Account<span className="text-yellow-500">!</span>
          </h2>
          <p className="text-gray-600">Join Our Community!</p>

          {/* Error Message */}
          {error && <p className="text-danger">{error}</p>}

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Name */}
              <div className="mb-3">
                <label className="block ml-2 mb-1 font-bold text-sm text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  className="w-full h-12 px-4 py-2 rounded-full bg-neutral-200 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500"
                  placeholder="Your First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              {/* Last Name */}
              <div className="mb-3">
                <label className="block ml-2 mb-1 font-bold text-sm text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  className="w-full h-12 px-4 py-2 rounded-full bg-neutral-200 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500"
                  placeholder="Your Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="block ml-2 mb-1 font-bold text-sm text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="w-full h-12 px-4 py-2 rounded-full bg-neutral-200 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500"
                placeholder="someone@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="block ml-2 mb-1 font-bold text-sm text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="w-full h-12 px-4 py-2 rounded-full bg-neutral-200 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500"
                placeholder="at least 8 characters"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-3">
              <label className="block ml-2 mb-1 font-bold text-sm text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                className="w-full h-12 px-4 py-2 rounded-full bg-neutral-200 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500"
                placeholder="repeat your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            {/* Terms and Conditions */}
            <div className="mb-3 flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  className="focus:ring-yellow-500 h-4 w-4 text-yellow-600 border-gray-300 rounded"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                />
              </div>
              <div className="ml-3 text-sm">
                <label className="text-gray-700">
                  I agree to the{" "}
                  <Link href="#" className="text-yellow-600 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="text-yellow-600 hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </label>
              </div>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full bg-prime hover:bg-yellow-700 text-white font-bold py-3 px-4 rounded-full focus:outline-none focus:shadow-outline"
            >
              Sign up
            </button>
          </form>

          {/* Already have an account? */}
          <p className="mt-3 text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-amber-600 underline hover:text-gray-900">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

