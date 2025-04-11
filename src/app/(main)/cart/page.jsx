"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SlBasket } from "react-icons/sl";
import { IoAdd, IoRemove } from "react-icons/io5";
import { useCart } from "../../context/CartContext";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const { cart, removeFromCart, updateCartQuantity } = useCart();
  const router = useRouter();

  const handleProceedToCheckout = () => {
    router.push("/checkout");
  };

  const getImageUrl = (productId) =>
    productId ? `/api/product_image?product_id=${productId}` : "/placeholder-image.jpg";

  const calculateTotal = () =>
    cart.reduce((total, item) => total + (Number(item.selling_price) || 0) * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <SlBasket className="text-4xl" /> Your Cart
          </h1>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <div
                  key={`${item.product_id}-${item.selectedSize || "no-size"}-${item.selectedColor || "no-color"}-${index}`}
                  className="flex items-center justify-between border-b py-4"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={getImageUrl(item.product_id)}
                      alt={item.name || "Product Image"}
                      width={80}
                      height={80}
                      className="rounded-lg"
                      unoptimized
                    />
                    <div>
                      <h2 className="text-xl font-semibold">{item.name || "Unnamed Product"}</h2>
                      {/* Display selected size and color */}
                      <p className="text-sm text-gray-600">
                        {(item.selectedSize || item.selectedColor) ? (
                          `${item.selectedSize ? `Size: ${item.selectedSize}` : ""}${
                            item.selectedSize && item.selectedColor ? ", " : ""
                          }${item.selectedColor ? `Color: ${item.selectedColor}` : ""}`
                        ) : (
                          "No size or color selected"
                        )}
                      </p>
                      <p className="text-2xl font-bold text-sky-600">
                        £{((Number(item.selling_price) || 0) * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">
                        £{(Number(item.selling_price) || 0).toFixed(2)} each
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => updateCartQuantity(item.product_id, -1)}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <IoRemove className="text-gray-600" />
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.product_id, 1)}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <IoAdd className="text-gray-600" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product_id)}
                      className="text-red-500 hover:text-red-700 transition-colors text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">Your cart is empty.</p>
                <Link href="/" className="text-prime hover:text-sky-600 transition-colors">
                  Continue Shopping
                </Link>
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-semibold">Total</span>
                <span className="text-3xl font-bold text-sky-600">
                  £{calculateTotal().toFixed(2)}
                </span>
              </div>
              <button
                onClick={handleProceedToCheckout}
                className="w-full bg-prime text-white py-3 rounded-lg hover:bg-sky-600 transition-colors text-lg font-semibold"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
