"use client";

import React, { useState } from "react";
import "./style.css"; 

const ContactForm = () => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [responseMessage, setResponseMessage] = useState('');
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.message) {
            setError("All fields are required!");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/contact-us", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Submission failed. Please try again.");
            }

            setResponseMessage('Thank you for contacting us!');
            setFormData({ name: "", email: "", message: "" });  

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
  
    return (
        <div className="contact-form-container">
            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit} className="contact-form">
                <div className="input-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="input-group">
                    <label htmlFor="message">Message:</label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleChange} required />
                </div>
                <button type="submit" className="submit-button">Submit</button>
            </form>
            {responseMessage && <p className="response-message">{responseMessage}</p>}
        </div>
    );
};

export default ContactForm;
