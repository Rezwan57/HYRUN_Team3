import React from 'react';
import "./aboutusStyle.css";

function AboutUs() {
  return (
    <div className="about-us-container">
      <div className="text-section">
        <h1>About Us</h1>
        <p>
          At Hyrun, we create shoes that combine comfort, style, and durability, ensuring every step you take is a confident one.
        </p>
        <p>
          From sustainable materials to innovative designs, we’re dedicated to crafting footwear that supports your journey while caring for the planet.
        </p>
        <p>
          Join the Hyrun community and discover shoes made for you, wherever life takes you.
        </p>
      </div>
      <div className="image-section">
      <img src="/1508-best-comfortable-running-shoes-16395638-main.webp" alt="Hyrun Shoes" />
      </div>
    </div>
  );
}

export default AboutUs;
