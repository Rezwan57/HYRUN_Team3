'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminProfile() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    console.log("Stored admin:", storedAdmin);

    if (!storedAdmin) {
      router.push("/admin-login");
      return;
    }

    try {
      const parsedAdmin = JSON.parse(storedAdmin);
      setAdmin(parsedAdmin);
    } catch (error) {
      console.error("Error parsing admin data:", error);
      localStorage.removeItem("admin");
      router.push("/admin-login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-menu") && showDropdown) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showDropdown]);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    router.push("/admin-login");
  };

  const handleDropdown = () => {
    setShowDropdown(!showDropdown); 
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="admin-profile-container">
      <div className="header">
        <h1>Admin Profile</h1>
      </div>
    </div>
  );
}
