import React from 'react';
import "./style.css"
function ContactForm() {
  return (
    <div className="container">
        <h2>Contact Us Form</h2>

        <form action="/submit-form" method="post">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />

            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" rows="4" required></textarea>

            <button type="submit">Submit</button>
        </form>
    </div>
  );
}

export default ContactForm;
