"use client";
import { useSearchParams } from "next/navigation";
import { FiCheckCircle, FiShoppingBag, FiTruck } from "react-icons/fi";
import styles from './page.module.css';

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const totalAmount = searchParams.get("total");
  const paymentMethod = searchParams.get("method");

  // Mock order data (usually comes from backend)
  const orderData = {
    id: `#${Math.floor(Math.random() * 1000000)}`,
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    items: [
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
    ],
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001"
    },
    paymentMethod: paymentMethod || "card",
    total: totalAmount || "340.00"
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
          Order #: {orderData.id}
        </div>
      </div>

      {/* Order Summary */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <FiShoppingBag className={styles.sectionIcon} />
          Your Order
        </h2>
        <div className={styles.itemsList}>
          {orderData.items.map(item => (
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

        <div className={styles.orderTotal}>
          <div className={styles.totalRow}>
            <span>Subtotal</span>
            <span>£{orderData.total}</span>
          </div>
          <div className={styles.totalRow}>
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className={styles.grandTotal}>
            <span>Total</span>
            <span>£{orderData.total}</span>
          </div>
        </div>
      </div>

      {/* Shipping Info */}
      <div className={styles.section}>
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
            <span>{orderData.estimatedDelivery}</span>
          </div>
          <div className={styles.infoRow}>
            <span>Shipping Address</span>
            <span>
              {orderData.shippingAddress.name}<br />
              {orderData.shippingAddress.street}<br />
              {orderData.shippingAddress.city}, {orderData.shippingAddress.state} {orderData.shippingAddress.zip}
            </span>
          </div>
          <div className={styles.infoRow}>
            <span>Payment Method</span>
            <span>
              {orderData.paymentMethod === "card"
                ? "Credit Card ending in 4242"
                : orderData.paymentMethod === "paypal"
                  ? "PayPal"
                  : "Google Pay"}
            </span>
          </div>
        </div>
      </div>

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
