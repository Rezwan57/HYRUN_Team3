"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";
import { SlBasket } from "react-icons/sl";
import styles from './Payment.module.css';

const PaymentPage = () => {
  const router = useRouter();
  const { cart } = useCart();

  const [user, setUser] = useState(null); // State to store user data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });

  // Fetch user data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login"); // Redirect to login if user is not logged in
      return;
    }
    setUser(JSON.parse(storedUser));
    setLoading(false);
  }, [router]);

  const discount = Number(localStorage.getItem("couponDiscount")) || 0;
  const subtotal = cart.reduce((total, item) => total + (Number(item.selling_price) || 0) * item.quantity, 0);
  const totalAmount = subtotal - subtotal * discount;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cardNumber") {
      formattedValue = value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim().slice(0, 19);
    } else if (name === "expiryDate") {
      formattedValue = value.replace(/\D/g, "").replace(/(\d{2})(\d{0,2})/, "$1/$2").slice(0, 5);
    } else if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 4);
    }

    setPaymentDetails(prev => ({ ...prev, [name]: formattedValue }));
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to place an order.");
      return;
    }

    const orderData = {
      customer_name: user.firstName, // Use the user's first name
      customer_email: user.email, // Use the user's email
      cart,
      total_amount: totalAmount,
    };

    console.log("Order Data:", orderData);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();
      if (res.ok) {
        console.log("Order placed successfully:", data);
        router.push(`/confirmation?orderId=${data.order_id}`);
      } else {
        console.error("Error placing order:", data.error);
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred. Please try again.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <SlBasket className={styles.cartIcon} />
        <h1>Checkout</h1>
      </div>

      {/* Order Summary */}
      <div className={styles.orderSummary}>
        <h2>Your Order</h2>

        <div className={styles.itemsContainer}>
          {cart.map(item => (
            <div key={item.product_id} className={styles.itemCard}>
              <img
                src={item.image || `/api/product_image?product_id=${item.product_id}`}
                alt={item.name}
                className={styles.productImage}
                onError={(e) => e.target.src = '/placeholder-product.jpg'}
              />
              <div className={styles.itemDetails}>
                <h3>{item.name}</h3>
                <div className={styles.itemPrice}>
                  <span>£{item.selling_price} × {item.quantity}</span>
                  <span> = £{(item.selling_price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.orderTotal}>
          <span>Subtotal</span>
          <span>£{subtotal.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className={styles.orderTotal}>
            <span>Discount ({(discount * 100).toFixed(0)}%)</span>
            <span>-£{(subtotal * discount).toFixed(2)}</span>
          </div>
        )}
        <div className={styles.orderTotal}>
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className={styles.grandTotal}>
          <span>Total</span>
          <span>£{totalAmount.toFixed(2)}</span>
        </div>
      </div>

      {/* Payment Section */}
      <div className={styles.paymentSection}>
        <h2>Payment Method</h2>

        <div className={styles.paymentMethods}>
          {["card", "paypal", "googlepay"].map(method => (
            <label
              key={method}
              className={`${styles.paymentMethod} ${paymentMethod === method ? styles.active : ''}`}
            >
              <input
                type="radio"
                name="paymentMethod"
                checked={paymentMethod === method}
                onChange={() => setPaymentMethod(method)}
                className={styles.radioInput}
              />
              <span className={styles.paymentLabel}>
                {method === "card" ? "Credit/Debit Card" :
                 method === "paypal" ? "PayPal" : "Google Pay"}
              </span>
            </label>
          ))}
        </div>

        {/* Credit/Debit Card Form */}
        {paymentMethod === "card" && (
          <form onSubmit={handlePaymentSubmit} className={styles.cardForm}>
            <div className={styles.formGroup}>
              <label>Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={paymentDetails.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                required
                className={styles.inputField}
                maxLength={19}
              />
            </div>

            <div className={styles.cardDetails}>
              <div className={styles.formGroup}>
                <label>Expiry Date</label>
                <input
                  type="text"
                  name="expiryDate"
                  value={paymentDetails.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  required
                  className={styles.inputField}
                  maxLength={5}
                />
              </div>

              <div className={styles.formGroup}>
                <label>CVV</label>
                <input
                  type="text"
                  name="cvv"
                  value={paymentDetails.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  required
                  className={styles.inputField}
                  maxLength={4}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Name on Card</label>
              <input
                type="text"
                name="nameOnCard"
                value={paymentDetails.nameOnCard}
                onChange={handleInputChange}
                placeholder="John Doe"
                required
                className={styles.inputField}
              />
            </div>

            <button type="submit" className={styles.payButton}>
              Pay £{totalAmount.toFixed(2)}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;