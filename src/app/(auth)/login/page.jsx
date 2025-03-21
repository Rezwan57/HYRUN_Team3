"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../../public/assets/logo/LogoDark.png";
import { FaArrowLeft } from "react-icons/fa6";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Both fields are required!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_email: email, user_password: password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed. Please try again.");
      }

      console.log("Login Successful!", data);

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        console.log("Stored User:", data.user); // Debugging
      }
      const storedUser = JSON.parse(localStorage.getItem("user"));
      console.log("Stored User:", storedUser);
      window.location.href = "/";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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

      <div className="flex flex-col justify-between items-center w-full lg:w-1/2 h-screen bg-white">
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
        <div className="text-left w-96">
          <h2 className="text-3xl font-bold">
            Welcome Back<span className="text-yellow-500">!</span>
          </h2>
          <p className="text-gray-600">Log in to Your Account</p>

          {/* Error Message */}
          {error && <p className="text-red-500">{error}</p>}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="mt-8 w-auto">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold ml-2 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full h-12 px-4 py-2 rounded-full bg-neutral-200 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500"
                placeholder="someone@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
              />
            </div>

            <div className="mb-1">
              <label className="block text-gray-700 text-sm font-bold ml-2 mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full h-12 px-4 py-2 rounded-full bg-neutral-200 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500"
                placeholder="at least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
              />
            </div>

            {/* Forgot Password */}
            <div className="mb-6 text-right">
              <Link
                href="/forgot-password"
                className="text-gray-700 hover:text-gray-900"
              >
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-prime hover:bg-yellow-700 text-white font-bold py-3 px-4 rounded-full focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="flex items-center justify-center gap-2 mt-6 text-cente">
            <p>Don’t have an account?</p>
            <Link
              href="/signup"
              className="text-amber-600 underline hover:text-gray-900"
            >
              Sign up
            </Link>
          </div>
        </div>

        <span className="mb-4" />
      </div>
    </div>
  );
}
