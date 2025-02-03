import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer_area">
      <div className="footer_info">
        
        {/* Logo & Contact Info */}
        <div className="footer_section">
          <img src="/assets/logo/Logo.png" alt="HYRUN Logo" className="footer_logo" />
          <p className="footer_description">
            Discover the ultimate destination for sneaker enthusiasts. Our vibrant 
            collection offers a curated selection of stylish and high-quality sneakers 
            for every occasion.
          </p>
        </div>

        {/* Useful Links */}
        <div className="footer_section">
          <h3 className="footer_title">Useful Links</h3>
          <ul className="footer_list">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Shop</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="/contact-us">Contact Us</a></li>
          </ul>
        </div>

        {/* My Account */}
        <div className="footer_section">
          <h3 className="footer_title">My Account</h3>
          <ul className="footer_list">
            <li><a href="#">Sign In</a></li>
            <li><a href="#">View Cart</a></li>
            <li><a href="#">Returns</a></li>
            <li><a href="#">Order Status</a></li>
            <li><a href="#">Help</a></li>
          </ul>
        </div>

        {/* Secured Payment Gateways */}
        <div className="footer_section">
          <h3 className="footer_title">Secured Payment Gateways</h3>
          <div className="footer_payments">
            <img src="/assets/SM logos/visa.png.jpg" alt="Visa" className="footer_payment" />
            <img src="/assets/SM logos/mastercard.png" alt="MasterCard" className="footer_payment" />
            <img src="/assets/SM logos/mastero.png.jpg" alt="Maestro" className="footer_payment" />
          </div>
        </div>

        {/* Contact */}
        <div className="footer_section">
          <h3 className="footer_title">Contact</h3>
          <ul className="footer_list">
            <li><span className="footer_bold">Address:</span> Aston University</li>
            <li><span className="footer_bold">Phone:</span> +0123456789</li>
            <li><span className="footer_bold">Email:</span> hyrunwebsite@gmail.com</li>
          </ul>
          <div 
            className="footer_icons">
            <FaFacebookF className="footer-icon" />
            <FaTwitter className="footer-icon" />
            <FaInstagram className="footer-icon" />
            <FaWhatsapp className="footer-icon" />
            
          </div>
        </div>
        
      </div>
      <hr className="footer_line" />
      <div 
          className="footer_copyright">© 2025 HYRUN. All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;