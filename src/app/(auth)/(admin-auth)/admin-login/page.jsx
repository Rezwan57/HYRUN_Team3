import React from "react";
import { FaUser } from "react-icons/fa";
import { FaKey } from "react-icons/fa";

export default function AdminLogin() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen px-2 overflow-hidden bg-neutral-950 gap-10">
      <div className="text-center flex flex-col gap-2">
        <h1 className="text-white text-4xl font-bold">Admin Login</h1>
        <h3 className="text-white">Login to your Admin Account</h3>
      </div>

      <form action="submit" className="flex flex-col gap-4" autoComplete="off">
        <span className="relative">
          <input
            type="email"
            name=""
            id=""
            className="bg-neutral-700 text-white py-2 rounded-md w-full pl-10 pr-5 outline-none focus:border-yellow-500 "
            autoComplete="off"
          />
          <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
        </span>

        <span className="relative">
          <input
            type="password"
            name=""
            id=""
            className="bg-neutral-700 text-white py-2 rounded-md w-full pl-10 pr-5 outline-none focus:border-yellow-500 "
            autoComplete="off"
          />
          <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
        </span>

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
