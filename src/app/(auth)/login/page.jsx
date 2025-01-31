'use client'

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Both fields are required!");
      return;
    }

    console.log("Logging in with:", { email, password });
    setError(""); // Clear errors on success
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        
        {/* Left Side - Background Colour (No Text) */}
        <div
          className="col-md-6 d-none d-md-block p-0"
          style={{
            backgroundColor: "#f5a623", // Change this to any colour you want
            borderRadius: "10px 0px 0px 10px"
          }}
        />

        {/* Right Side - Login Form */}
        <div className="col-md-6 d-flex align-items-center justify-content-center p-5 bg-white">
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
              <button type="submit" className="btn btn-warning w-100">
                Login
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
