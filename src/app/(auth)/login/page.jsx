"use client";

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";

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
        console.log("Stored User:", data.user);  // Debugging
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
    <div className="h-screen px-2 overflow-hidden">
      <div className="row h-full lg:w-full w-screen">
        {/* Left Side - Background Colour (No Text) */}
        <div
          className="col-md-6 d-none d-md-block object-contain h-screen p-2"
          style={{
            borderRadius: "10px 0px 0px 10px",
          }}
        >
          <Image
            src="/assets/FW/auth.jpg"
            width={500}
            height={500}
            alt="alt"
            className="h-full w-full rounded-xl"
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="col-md-6 d-flex align-items-center justify-content-center lg:p-5 p-0 bg-white">
          <div className="w-75">
            <h2 className="fw-bold">
              Welcome Back<span className="text-warning">!</span>
            </h2>
            <p className="text-muted">Log in to Your Account</p>

            {/* Error Message */}
            {error && <p className="text-danger">{error}</p>}

            {/* Login Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="someone@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="at least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Forgot Password */}
              <div className="mb-3 text-end">
                <a href="/forgot-password" className="text-dark fw-bold">
                  Forgot password?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="btn btn-warning w-100"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            {/* Sign Up Link */}
            <p className="mt-3 text-center">
              Don’t have an account?{" "}
              <a href="/signup" className="text-dark fw-bold">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
