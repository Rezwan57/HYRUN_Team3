'use client';

import { useState } from 'react';

export default function ReturnsPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const res = await fetch('/api/returns', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      setSubmitted(true);
      form.reset();
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-semibold text-center text-black mb-4 tracking-tight">Returns & Refunds</h1>
      <p className="text-center text-gray-600 mb-10">
        We’re here to make returns easy. You have <strong>14 days</strong> to return your item. Items must be unused,
        in their original packaging, and include proof of purchase.
      </p>

      {submitted && (
        <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6 text-center border border-green-200">
          ✅ Your return request was submitted successfully.
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl border border-gray-100 rounded-2xl p-8 space-y-6"
      >
        <div>
          <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-1">
            Order ID
          </label>
          <input
            type="text"
            name="orderId"
            id="orderId"
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/80 transition"
            placeholder="e.g. #123456"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/80 transition"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
            Reason for Return
          </label>
          <textarea
            name="reason"
            id="reason"
            rows="4"
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/80 transition resize-none"
            placeholder="Tell us why you’re returning the item..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white text-base py-3 rounded-xl hover:bg-gray-800 transition"
        >
          Submit Return Request
        </button>
      </form>
    </div>
  );
}
