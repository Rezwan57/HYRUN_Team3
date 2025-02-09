'use client'
import React, { useState } from "react";
import "./style.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/contact-us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      setResponseMessage(data.message || "Something went wrong!");
      setFormData({ name: "", email: "", message: "" }); 
    } catch (error) {
      setResponseMessage("Error submitting form. Please try again.");
    }
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Message:</label>
        <textarea name="message" value={formData.message} onChange={handleChange} required />

        <button type="submit">Submit</button>
      </form>
      {responseMessage && <p className="response">{responseMessage}</p>}
    </div>
  );
};

export default ContactForm;