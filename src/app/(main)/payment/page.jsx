"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SlBasket } from "react-icons/sl";
import styles from './Payment.module.css';

const PaymentPage = () => {
  const router = useRouter();

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });

  const cartData = [
    {
      id: 1,
      name: "Nike Air Max Running Shoes",
      price: 120,
      image: "/shoes1.jpg",
      quantity: 2,
      color: "Black/Red",
      size: "US 10"
    },
    {
      id: 2,
      name: "Adidas Training Shoes",
      price: 100,
      image: "/shoes2.jpg",
      quantity: 1,
      color: "White/Blue",
      size: "US 9"
    },
  ];

  const totalAmount = cartData.reduce((total, item) => total + item.price * item.quantity, 0);

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

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    router.push(`/confirmation?total=${totalAmount}&method=${paymentMethod}`);
  };

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
          {cartData.map(item => (
            <div key={item.id} className={styles.itemCard}>
              <img
                src={item.image}
                alt={item.name}
                className={styles.productImage}
                onError={(e) => e.target.src = '/placeholder-product.jpg'}
              />
              <div className={styles.itemDetails}>
                <h3>{item.name}</h3>
                <div className={styles.itemAttributes}>
                  <span>Color: {item.color}</span>
                  <span>Size: {item.size}</span>
                </div>
                <div className={styles.itemPrice}>
                  <span>£{item.price.toFixed(2)} × {item.quantity}</span>
                  <span>£{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.orderTotal}>
          <span>Subtotal</span>
          <span>£{totalAmount.toFixed(2)}</span>
        </div>
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

        {/* PayPal Section */}
        {paymentMethod === "paypal" && (
          <div className={styles.simulatedPayment}>
            <p>You'll be redirected to PayPal to complete your payment</p>
            <button
              className={`${styles.payButton} ${styles.paypalButton}`}
              onClick={handlePaymentSubmit}
            >
              Continue to PayPal
            </button>
          </div>
        )}

        {/* Google Pay Section */}
        {paymentMethod === "googlepay" && (
          <div className={styles.simulatedPayment}>
            <p>You'll be redirected to Google Pay to complete your payment</p>
            <button
              className={`${styles.payButton} ${styles.googlePayButton}`}
              onClick={handlePaymentSubmit}
            >
              Continue to Google Pay
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
