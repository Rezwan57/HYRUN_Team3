'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { FaKey } from "react-icons/fa";

export default function AdminLogin() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("All fields are required!");
      return;
    }

    try {
      const res = await fetch("/api/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.status === 200) {
        const data = await res.json();
        console.log(data);
        router.push("/admin");
      } else {
        setError("Invalid credentials!");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen px-2 overflow-hidden bg-neutral-950 gap-10">
      <div className="text-center flex flex-col gap-2">
        <h1 className="text-white text-4xl font-bold">Admin Login</h1>
        <h3 className="text-white">Login to your Admin Account</h3>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" autoComplete="off">
        <span className="relative">
          <input
            type="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-neutral-700 text-white py-2 rounded-md w-full pl-10 pr-5 outline-none focus:border-yellow-500 "
            autoComplete="off"
          />
          <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
        </span>

        <span className="relative">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-neutral-700 text-white py-2 rounded-md w-full pl-10 pr-5 outline-none focus:border-yellow-500 "
            autoComplete="off"
          />
          <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
        </span>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="bg-prime text-black py-2 rounded-md w-full hover:bg-yellow-700 hover:text-white transition-all duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
}
