'use client'

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";

export default function Signup() {
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
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
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
      }
    } catch (error) {
      setError("Server error. Please try again later.");
      setSuccess("");
    }
  };

  return (
    <div className="h-screen px-2">
      <div className="row">
        
        {/* Left Side - Background Colour (No Text) */}
        <div
          className="col-md-6 d-none d-md-block object-contain h-screen p-2"
          style={{ // Change this to any colour you want
            borderRadius: "10px 0px 0px 10px"
          }}
        >

            <Image src="/assets/FW/auth.jpg" width={500} height={500} alt="alt" className="h-full w-full rounded-xl"/>
          </div>

        {/* Right Side - Signup Form */}
        <div className="col-md-6 d-flex align-items-center justify-content-center p-5 bg-white">
          <div className="w-75">
            <h2 className="fw-bold">
              Create Your Account<span className="text-warning">!</span>
            </h2>
            <p className="text-muted">Join Our Community!</p>

            {/* Error Message */}
            {error && <p className="text-danger">{error}</p>}

            {/* Signup Form */}
            <form onSubmit={handleSubmit}>
              <div className="row">
                {/* First Name */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    placeholder="Your First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                {/* Last Name */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    placeholder="Your Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="someone@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="at least 8 characters"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              {/* Confirm Password */}
              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  placeholder="repeat your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              {/* Terms and Conditions */}
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  className="form-check-input"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                />
                <label className="form-check-label">
                  I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
                </label>
              </div>

              {/* Signup Button */}
              <button type="submit" className="btn btn-warning w-100">
                Sign up
              </button>
            </form>

            {/* Already have an account? */}
            <p className="mt-3 text-center">
              Already have an account?{" "}
              <a href="/login" className="text-dark fw-bold">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
