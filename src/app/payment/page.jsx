"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { SlBasket } from "react-icons/sl";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Homepage/Footer";
import { useRouter } from "next/navigation";

// Mock items for payment
const initialCartItems = [
  {
    id: 1,
    name: "Running Shoes",
    price: 120,
    image: "/assets/FW/1.png",
    quantity: 2,
  },
  {
    id: 2,
    name: "Training Shoes",
    price: 100,
    image: "/assets/FW/2.png",
    quantity: 1,
  },
];

const PaymentPage = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null); // Track selected payment method
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });
  const [errors, setErrors] = useState({});

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    } else {
      setCartItems(initialCartItems);
    }
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const validateForm = () => {
    const newErrors = {};
    if (selectedPaymentMethod === "card") {
      if (!paymentDetails.cardNumber.match(/^\d{16}$/)) {
        newErrors.cardNumber = "Invalid card number";
      }
      if (!paymentDetails.expiryDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
        newErrors.expiryDate = "Invalid expiry date";
      }
      if (!paymentDetails.cvv.match(/^\d{3}$/)) {
        newErrors.cvv = "Invalid CVV";
      }
      if (!paymentDetails.nameOnCard.trim()) {
        newErrors.nameOnCard = "Name on card is required";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const queryParams = new URLSearchParams({
        cart: JSON.stringify(cartItems),
      });
      if (selectedPaymentMethod === "paypal") {
        // Simulate PayPal redirect (in a real app, you'd redirect to PayPal's API)
        alert("Redirecting to PayPal...");
      } else if (selectedPaymentMethod === "googlepay") {
        // Simulate Google Pay (in a real app, you'd integrate Google Pay API)
        alert("Processing with Google Pay...");
      }
      router.push(`/confirmation?${queryParams.toString()}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
    setErrors({}); // Clear errors when switching methods
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <SlBasket /> Payment
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Payment Form */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Payment Details</h2>

              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">
                  Payments are SSL encrypted so that your credit card and payment details stay safe.
                </p>

                {/* Payment Method Options */}
                <div className="space-y-2">
                  <div
                    className={`border p-4 rounded-lg cursor-pointer ${
                      selectedPaymentMethod === "card" ? "border-yellow-500" : "border-gray-300"
                    }`}
                    onClick={() => handlePaymentMethodSelect("card")}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Credit/Debit Card</span>
                      <div className="flex gap-2">
                        <Image src="/assets/SM logos/visa.svg" alt="Visa" width={30} height={20} />
                        <Image src="/assets/SM logos/amex.svg" alt="Amex" width={30} height={20} />
                        <Image src="/assets/SM logos/mastercard.svg" alt="Mastercard" width={30} height={20} />

                      </div>
                    </div>
                  </div>

                  {/* Card Details Dropdown */}
                  {selectedPaymentMethod === "card" && (
                    <form onSubmit={handlePaymentSubmit} className="mt-4">
                      <div className="mb-4">
                        <label htmlFor="cardNumber" className="block mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          value={paymentDetails.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456"
                          required
                          maxLength="16"
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                        {errors.cardNumber && (
                          <span className="text-red-500 text-sm">{errors.cardNumber}</span>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label htmlFor="expiryDate" className="block mb-1">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            id="expiryDate"
                            name="expiryDate"
                            value={paymentDetails.expiryDate}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            required
                            maxLength="5"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                          />
                          {errors.expiryDate && (
                            <span className="text-red-500 text-sm">{errors.expiryDate}</span>
                          )}
                        </div>

                        <div>
                          <label htmlFor="cvv" className="block mb-1">
                            CVV
                          </label>
                          <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            value={paymentDetails.cvv}
                            onChange={handleInputChange}
                            placeholder="123"
                            required
                            maxLength="3"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                          />
                          {errors.cvv && (
                            <span className="text-red-500 text-sm">{errors.cvv}</span>
                          )}
                        </div>
                      </div>

                      <div className="mb-6">
                        <label htmlFor="nameOnCard" className="block mb-1">
                          Name on Card
                        </label>
                        <input
                          type="text"
                          id="nameOnCard"
                          name="nameOnCard"
                          value={paymentDetails.nameOnCard}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          required
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                        {errors.nameOnCard && (
                          <span className="text-red-500 text-sm">{errors.nameOnCard}</span>
                        )}
                      </div>
                    </form>
                  )}

                  <div
                    className={`border p-4 rounded-lg cursor-pointer ${
                      selectedPaymentMethod === "paypal" ? "border-yellow-500" : "border-gray-300"
                    }`}
                    onClick={() => handlePaymentMethodSelect("paypal")}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">PayPal</span>
                    </div>
                    {selectedPaymentMethod === "paypal" && (
                      <p className="text-sm text-gray-500 mt-2">
                        You will be redirected to PayPal, where you can pay and complete your order.
                      </p>
                    )}
                  </div>

                  <div
                    className={`border p-4 rounded-lg cursor-pointer ${
                      selectedPaymentMethod === "googlepay" ? "border-yellow-500" : "border-gray-300"
                    }`}
                    onClick={() => handlePaymentMethodSelect("googlepay")}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Google Pay</span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePaymentSubmit}
                className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition-colors text-lg font-semibold"
                disabled={!selectedPaymentMethod}
              >
                Pay Now £{calculateTotal().toFixed(2)}
              </button>

              <div className="mt-4 text-center">
                <Link href="/cart" className="text-yellow-600 hover:text-yellow-700">
                  Back to Cart
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              {cartItems.length > 0 ? (
                <>
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 border-b py-4">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="rounded-lg"
                      />
                      <div className="flex-grow">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bold">
                        £{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}

                  <div className="flex justify-between items-center mt-4 pt-4 border-t">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-xl font-bold text-yellow-600">
                      £{calculateTotal().toFixed(2)}
                    </span>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">Your cart is empty.</p>
                  <Link href="/cart" className="text-yellow-500 hover:text-yellow-600 transition-colors">
                    Back to Cart
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentPage;