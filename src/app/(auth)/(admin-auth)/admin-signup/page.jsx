"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { div } from "framer-motion/client";

export default function AdminLogin() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!firstName || !lastName || !username || !password) {
      setError("All fields are required!");
      setSuccess("");
      return;
    }

    // Backend Connection and API Fetch
    try {
      const res = await fetch("/api/admin-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          username,
          password: password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong!");
        setSuccess("");
      } else {
        setSuccess("Account created successfully! You can now log in.");
        setError("");
        setFirstName("");
        setLastName("");
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      setError("Server error. Please try again later.");
      setSuccess("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen px-2 overflow-hidden bg-neutral-950 gap-10">
      <div className="text-center flex flex-col gap-2">
        <h1 className="text-white text-4xl font-bold">Add Admin</h1>
        <h3 className="text-white">Add new Admin Account</h3>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
        autoComplete="off"
      >
        <div className="flex gap-4">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="bg-neutral-700 text-white py-2 rounded-md w-full pl-4 pr-5 outline-none focus:border-yellow-500"
            placeholder="First Name"
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="bg-neutral-700 text-white py-2 rounded-md w-full pl-4 pr-5 outline-none focus:border-yellow-500"
            placeholder="Last Name"
          />
        </div>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="bg-neutral-700 text-white py-2 rounded-md w-full pl-4 pr-5 outline-none focus:border-yellow-500"
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-neutral-700 text-white py-2 rounded-md w-full pl-4 pr-5 outline-none focus:border-yellow-500"
          placeholder="Password"
        />

        {error && <p className="text-red-500">{error}</p>}
        {success && (
          <div className="flex flex-col gap-2">
            <p className="text-green-500">{success}</p>
          </div>
        )}

        <button
          type="submit"
          className="bg-prime text-black py-2 rounded-md w-full hover:bg-yellow-700 hover:text-white transition-all duration-300"
        >
          Add Admin
        </button>
      </form>
    </div>
  );
}
