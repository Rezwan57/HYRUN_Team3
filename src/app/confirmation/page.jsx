"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SlBasket } from 'react-icons/sl';
import { IoAdd, IoRemove } from 'react-icons/io5';
import Navbar from '@/components/Navbar';
import Headline from "@/components/Headline";
import Footer from "@/components/Homepage/Footer";
import { useSearchParams } from "next/navigation"; 

// Reuse the same styles as the payment page
const styles = {
  container: {
    padding: "20px",
    maxWidth: "auto",
    margin: "0 auto",
    backgroundColor: "#f9fafb", // Light background color
    minHeight: "100vh", // Full height
  },
  header: {
    display: "flex",
    alignItems: "center",
    fontSize: "24px",
    marginBottom: "20px",
  },
  footer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
  },
  cartIcon: {
    marginRight: "10px",
  },
  productList: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  productItem: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    padding: "10px",
    border: "1px solid #eee",
    borderRadius: "8px",
    backgroundColor: "#fff", // White background for product items
  },
  productImage: {
    borderRadius: "8px",
  },
  productDetails: {
    flex: 1,
    textAlign: "left",
  },
  productName: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: "16px",
    color: "#666",
  },
  productQuantity: {
    fontSize: "14px",
    color: "#666",
  },
  totalContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "30px",
    paddingTop: "20px",
    borderTop: "1px solid #eee",
  },
  totalText: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  totalAmount: {
    fontSize: "20px",
    fontWeight: "bold",
  },
};

const ConfirmationPage = () => {
  const searchParams = useSearchParams(); // Get query parameters
  const cartData = JSON.parse(searchParams.get("cart") || "[]"); // Parse cart data from query params

  // Calculate the total price
  const calculateTotal = () => {
    return cartData.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // If cartData is empty or invalid, show a fallback message
  if (!cartData || cartData.length === 0) {
    return (
      <div style={styles.container}>
        <Navbar />
        <div style={{ padding: "20px" }}>
          <h1 style={styles.header}>
            <span style={styles.cartIcon}>🛒</span> Order Confirmed!
          </h1>
          <p style={styles.message}>No items found in your order. Please try again.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <Navbar />

      {/* Confirmation Content */}
      <div style={{ padding: "20px" }}>
        <h1 style={styles.header}>
          <span style={styles.cartIcon}>🛒</span> Order Confirmed!
        </h1>
        <p style={styles.message}>Thank you for your purchase. Here are the details of your order:</p>

        {/* List of Purchased Products */}
        <div style={styles.productList}>
          {cartData.map((item) => (
            <div key={item.id} style={styles.productItem}>
              <Image
                src={item.image}
                alt={item.name}
                width={80}
                height={80}
                style={styles.productImage}
              />
              <div style={styles.productDetails}>
                <p style={styles.productName}>{item.name}</p>
                <p style={styles.productPrice}>£{(item.price * item.quantity).toFixed(2)}</p>
                <p style={styles.productQuantity}>Qty: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Total Amount */}
        <div style={styles.totalContainer}>
          <span style={styles.totalText}>Total:</span>
          <span style={styles.totalAmount}>£{calculateTotal().toFixed(2)}</span>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ConfirmationPage;