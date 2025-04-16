"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

function Review({ params }) {
  const router = useRouter();
  const { id } = params; // Get the product ID from the URL
  const [review, setReview] = useState(""); // State to store the review text
  const [rating, setRating] = useState(0); // State to store the rating
  const [loading, setLoading] = useState(false); // State to handle loading

  const handleSubmit = async (e) => {
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
      product_id: id, // Use the product ID from the URL
      user_email: user.email,
      review,
      rating,
    };

    try {
      setLoading(true);
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Review submitted successfully!");
        router.push(`/product/${id}`); // Redirect to the product page
      } else {
        console.error("Error submitting review:", data.error);
        alert("Failed to submit review. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Submit Your Review</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "0 auto" }}>
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
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}

export default Review;