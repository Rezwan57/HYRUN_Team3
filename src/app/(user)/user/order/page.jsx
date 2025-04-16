"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [currentProductId, setCurrentProductId] = useState(null); 
  const [review, setReview] = useState(""); 
  const [rating, setRating] = useState(0); 
  const [loadingReview, setLoadingReview] = useState(false); 
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
          alert("You must be logged in to view your orders.");
          return;
        }

        const user = JSON.parse(storedUser);
        const res = await fetch(`/api/orders/user-order?email=${user.email}`);
        const data = await res.json();

        if (res.ok) {
          setOrders(data);
        } else {
          console.error("Error fetching orders:", data.error);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleReturn = (orderId, email) => {
    router.push(`/user/returns?orderId=${orderId}&email=${email}`);
  };

  const handleReview = (productId) => {
    setCurrentProductId(productId); // Set the product ID for the review
    setIsModalOpen(true); // Open the modal
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      alert("Please select a rating.");
      return;
    }

    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      alert("You must be logged in to submit a review.");
      return;
    }

    const user = JSON.parse(storedUser);

    const reviewData = {
      product_id: currentProductId,
      user_email: user.email,
      review,
      rating,
    };

    try {
      setLoadingReview(true);
      const res = await fetch("/api/review", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Review submitted successfully!");
        setIsModalOpen(false); // Close the modal
        setReview(""); // Reset the review text
        setRating(0); // Reset the rating
      } else {
        console.error("Error submitting review:", data.error);
        alert("Failed to submit review. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoadingReview(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  if (orders.length === 0) return <p>No orders found.</p>;

  return (
    <div>
      <h1>Your Orders</h1>
      <div>
        {orders.map((order) => (
          <div
            key={order.order_id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
              cursor: "pointer",
            }}
            onClick={() => router.push(`/order/${order.order_id}`)} // Navigate to order details page
          >
            <h2>Order ID: {order.order_id}</h2>
            <p>
              <strong>Date:</strong> {new Date(order.order_date).toLocaleDateString()}
            </p>
            <p>
              <strong>Status:</strong> {order.status}
            </p>
            <p>
              <strong>Total Amount:</strong> £{order.total_amount}
            </p>
            <h3>Items:</h3>
            <ul>
              {order.items.map((item) => (
                <li key={item.product_id} style={{ marginBottom: "10px" }}>
                  {item.quantity} × {item.product_name} @ £{item.price_at_time}
                  <div style={{ marginTop: "5px" }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); 
                        handleReturn(order.order_id, item.product_id);
                      }}
                      style={{
                        marginRight: "10px",
                        padding: "5px 10px",
                        backgroundColor: "#f44336",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Return
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the parent click event
                        handleReview(item.product_id);
                      }}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#4CAF50",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Review
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Review Modal */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "10px",
              width: "400px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <h2>Submit Your Review</h2>
            <form onSubmit={handleSubmitReview}>
              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="rating" style={{ display: "block", marginBottom: "5px" }}>
                  Rating:
                </label>
                <div>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      style={{
                        fontSize: "20px",
                        color: star <= rating ? "#FFD700" : "#ccc",
                        border: "none",
                        background: "none",
                        cursor: "pointer",
                      }}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="review" style={{ display: "block", marginBottom: "5px" }}>
                  Review:
                </label>
                <textarea
                  id="review"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  rows="5"
                  style={{ width: "100%", padding: "10px", fontSize: "16px" }}
                  placeholder="Write your review here..."
                  required
                ></textarea>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)} // Close the modal
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#f44336",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#4CAF50",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  disabled={loadingReview}
                >
                  {loadingReview ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Order;