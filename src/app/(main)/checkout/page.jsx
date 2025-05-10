"use client";
import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CheckoutPage = () => {
  const { cart } = useCart();
  const router = useRouter();

  const [address, setAddress] = useState({
    fullName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    postcode: "",
    country: "",
  });

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleCouponChange = (e) => {
    setCouponCode(e.target.value);
  };

  const handleApplyCoupon = () => {
    if (couponCode === "DISCOUNT10") {
      setDiscount(0.1); // 10% discount
    } else {
      alert("Invalid coupon code");
      setDiscount(0);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate required fields
    if (!address.fullName || !address.email) {
      alert("Full Name and Email are required.");
      return;
    }
    console.log("Storing deliveryAddress:", address); // Debug log
    localStorage.setItem("deliveryAddress", JSON.stringify(address));
    localStorage.setItem("couponDiscount", discount);
    localStorage.setItem("couponCode", couponCode);
    router.push("/payment");
  };

  const getImageUrl = (productId) =>
    productId ? `/api/product_image?product_id=${productId}` : "/placeholder-image.jpg";

  const calculateTotal = () => {
    const total = cart.reduce(
      (total, item) => total + (Number(item.selling_price) || 0) * item.quantity,
      0
    );
    return total - total * discount;
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left: Cart Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Your Items</h2>
            {cart.map((item, index) => (
              <div
                key={`${item.product_id}-${index}`}
                className="flex items-center justify-between mb-4"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={getImageUrl(item.product_id)}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded"
                    unoptimized
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity} × £{item.selling_price}
                    </p>
                  </div>
                </div>
                <div className="font-bold text-sky-600">
                  £{(Number(item.selling_price) * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
            <hr className="my-4" />
            <div className="text-xl font-bold text-right text-sky-700">
              Total: £{calculateTotal().toFixed(2)}
            </div>

            {/* Coupon Code */}
            <div className="flex h-10 gap-2 mt-10">
              <input
                type="text"
                name="couponCode"
                value={couponCode}
                onChange={handleCouponChange}
                placeholder="Enter Coupon Code"
                className="w-full border rounded p-2"
              />
              <button
                type="button"
                onClick={handleApplyCoupon}
                className="flex items-center justify-center w-1/3 bg-sky-600 text-sm text-white py-3 rounded hover:bg-sky-700 transition-colors"
              >
                Apply Coupon
              </button>
            </div>
          </div>

          {/* Right: Delivery Address Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={address.fullName}
                onChange={handleChange}
                required
                className="w-full border rounded p-2"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={address.email}
                onChange={handleChange}
                required
                className="w-full border rounded p-2"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={address.phone}
                onChange={handleChange}
                required
                className="w-full border rounded p-2"
              />
              <input
                type="text"
                name="street"
                placeholder="Street Address"
                value={address.street}
                onChange={handleChange}
                required
                className="w-full border rounded p-2"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={address.city}
                onChange={handleChange}
                required
                className="w-full border rounded p-2"
              />
              <input
                type="text"
                name="postcode"
                placeholder="Postcode"
                value={address.postcode}
                onChange={handleChange}
                required
                className="w-full border rounded p-2"
              />
              <select
                name="country"
                value={address.country}
                onChange={handleChange}
                required
                className="w-full border rounded p-2"
              >
                <option value="">Select Country</option>
                <option value="UK">United Kingdom</option>
                <option value="Ireland">Ireland</option>
              </select>

              <button
                type="submit"
                className="w-full bg-prime text-white py-3 rounded hover:bg-sky-600 transition-colors font-semibold"
              >
                Continue to Payment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;