"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "../../context/CartContext";
import { FiCheckCircle, FiShoppingBag, FiTruck } from "react-icons/fi";
import styles from './page.module.css';

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { cart } = useCart();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get shipping address from localStorage
  const getShippingAddress = () => {
    try {
      const storedAddress = localStorage.getItem("deliveryAddress");
      if (storedAddress) {
        const address = JSON.parse(storedAddress);
        return {
          name: address.fullName || "Customer",
          street: address.street || "N/A",
          city: address.city || "N/A",
          state: address.postcode || "N/A",
          zip: address.postcode || "N/A",
          country: address.country || "N/A",
        };
      }
    } catch (err) {
      console.error("Error parsing deliveryAddress:", err);
    }
    // Always return a default object
    return {
      name: "Customer",
      street: "N/A",
      city: "N/A",
      state: "N/A",
      zip: "N/A",
      country: "N/A",
    };
  };

  // Fetch order data
  useEffect(() => {
    if (!orderId) {
      setError("No order ID provided");
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/orders/${orderId}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch order: ${res.statusText}`);
        }
        const data = await res.json();
        setOrderData(data);
      } catch (err) {
        console.error("Error fetching order:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  // Fallback order data if API fails
  const fallbackOrderData = {
    id: orderId || "Unknown",
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    items: cart.length > 0 ? cart.map(item => ({
      id: item.product_id,
      name: item.name || "Product",
      price: item.selling_price || 0,
      image: item.image || `/api/product_image?product_id=${item.product_id}`,
      quantity: item.quantity || 1,
      color: "N/A",
      size: "N/A",
    })) : [],
    shippingAddress: getShippingAddress(),
    paymentMethod: searchParams.get("method") || "card",
    total: searchParams.get("total") || cart.reduce((sum, item) => sum + (item.selling_price || 0) * (item.quantity || 1), 0).toFixed(2),
  };

  // Use fetched order data or fallback
  const displayOrderData = orderData || fallbackOrderData;

  if (loading) {
    return <div className={styles.container}>Loading order details...</div>;
  }

  if (error) {
    return (
      <div className={styles.container}>
        <h1>Error</h1>
        <p>{error}</p>
        <button
          className={styles.continueShopping}
          onClick={() => window.location.href = "/"}
        >
          Return to Home
        </button>
      </div>
    );
  }

  // Ensure shippingAddress exists
  const shippingAddress = displayOrderData.shippingAddress || {
    name: "Customer",
    street: "N/A",
    city: "N/A",
    state: "N/A",
    zip: "N/A",
    country: "N/A",
  };

  return (
    <div className={styles.container}>

      {/* Success Header */}
      <div className={styles.successHeader}>
        <FiCheckCircle className={styles.successIcon} />
        <h1>Order Confirmed!</h1>
        <p className={styles.successMessage}>
          Thank you for your purchase! We're preparing your order with care and will notify you when it ships.
        </p>
        <div className={styles.orderNumber}>
          Order #: {displayOrderData.id}
        </div>
      </div>

      {/* Order Summary */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <FiShoppingBag className={styles.sectionIcon} />
          Your Order
        </h2>
        <div className={styles.itemsList}>
          {displayOrderData.items.map(item => (
            <div key={item.id} className={styles.item}>
              <img
                src={item.image}
                alt={item.name}
                className={styles.itemImage}
                onError={(e) => e.target.src = '/placeholder-product.jpg'}
              />
              <div className={styles.itemDetails}>
                <h3>{item.name}</h3>
                <div className={styles.itemAttributes}>
                  <span>Color: {item.color}</span>
                  <span>Size: {item.size}</span>
                  <span>Qty: {item.quantity}</span>
                </div>
                <div className={styles.itemPrice}>
                  £{(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* <div className={styles.orderTotal}>
          <div className={styles.totalRow}>
            <span>Subtotal</span>
            <span>£{parseFloat(displayOrderData.total).toFixed(2)}</span>
          </div>
          <div className={styles.totalRow}>
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className={styles.grandTotal}>
            <span>Total</span>
            <span>£{parseFloat(displayOrderData.total).toFixed(2)}</span>
          </div>
        </div> */}
      </div>

      {/* Shipping Info */}
      {/* <div className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <FiTruck className={styles.sectionIcon} />
          Shipping Information
        </h2>
        <div className={styles.shippingInfo}>
          <div className={styles.infoRow}>
            <span>Delivery Method</span>
            <span>Standard Shipping (3-5 business days)</span>
          </div>
          <div className={styles.infoRow}>
            <span>Estimated Delivery</span>
            <span>{displayOrderData.estimatedDelivery}</span>
          </div>
          <div className={styles.infoRow}>
            <span>Shipping Address</span>
            <span>
              {shippingAddress.name}<br />
              {shippingAddress.street}<br />
              {shippingAddress.city}
              {shippingAddress.state && `, ${shippingAddress.state}`}
              {shippingAddress.zip && ` ${shippingAddress.zip}`}
              {shippingAddress.country && <br />}
              {shippingAddress.country}
            </span>
          </div>
          <div className={styles.infoRow}>
            <span>Payment Method</span>
            <span>
              {displayOrderData.paymentMethod === "card"
                ? "Credit Card ending in 4242"
                : displayOrderData.paymentMethod === "paypal"
                  ? "PayPal"
                  : "Google Pay"}
            </span>
          </div>
        </div>
      </div> */}

      {/* Thank You Message */}
      <div className={styles.thankYou}>
        <h2>Thank You for Shopping With Us!</h2>
        <p>
          We appreciate your business. Your support helps us continue doing what we love.
          If you have any questions about your order, please contact our customer service.
        </p>
        <button
          className={styles.continueShopping}
          onClick={() => window.location.href = "/"}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}