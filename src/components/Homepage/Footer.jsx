import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import "./Footer.css";
import { FaTiktok } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Logo & Contact Info */}
        <div className="footer-section">
          <Image
            src="/assets/logo/Logo.png"
            alt="HYRUN Logo"
            className="footer-logo"
            width={150}
            height={150}
          />
          <p className="footer-description">
            Discover the ultimate destination for sneaker enthusiasts. Our
            vibrant collection offers a curated selection of stylish and
            high-quality sneakers for every occasion.
          </p>
        </div>

        {/* About Section */}
        <div className="footer-section">
          <h3 className="footer-title">Useful Links</h3>
          <ul className="footer-list">
            <li>
              <Link className="hover:underline" href="about-us">About Us</Link>
            </li>
            <li>
              <Link className="hover:underline" href="#">Delivery Information</Link>
            </li>
            <li>
              <Link className="hover:underline" href="#">Privacy Policy</Link>
            </li>
            <li>
              <Link className="hover:underline" href="#">Terms & Conditions</Link>
            </li>
            <li>
              <Link className="hover:underline" href="/contact-us">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* My Account */}
        <div className="footer-section">
          <h3 className="footer-title">My Account</h3>
          <ul className="footer-list">
            <li>
              <Link className="hover:underline" href="/login">Sign In</Link>
            </li>
            <li>
              <Link className="hover:underline" href="#">View Cart</Link>
            </li>
            <li>
              <Link className="hover:underline" href="#">Returns</Link>
            </li>
            <li>
              <Link className="hover:underline" href="#">Order Status</Link>
            </li>
            <li>
              <Link className="hover:underline" href="#">Help</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Secured Payment Gateways</h3>
          <div className="footer-payments">
            <Image
              src="/assets/SM logos/visa.svg"
              width={50}
              height={50}
              alt="Visa"
              className="footer-payment"
            />
            <Image
              src="/assets/SM logos/mastercard.svg"
              width={50}
              height={50}
              alt="MasterCard"
              className="footer-payment"
            />
            <Image
              src="/assets/SM logos/maestro.svg"
              width={50}
              height={50}
              alt="Maestro"
              className="footer-payment"
            />
            <Image
              src="/assets/SM logos/amex.svg"
              width={50}
              height={50}
              alt="American Express"
              className="footer-payment"
            />
          </div>
        </div>

        <div>
          <ul className="footer-list">
            <h3 className="footer-title">Contact</h3>
            <li>
              <span className="footer-bold">Address:</span> Aston University
            </li>
            <li>
              <span className="footer-bold">Phone:</span> +0123456789
            </li>
            <li>
              <span className="footer-bold">Email:</span> hyrunwebsite@gmail.com
            </li>
          </ul>

          <div className="footer-icons">
            <FaFacebookF className="footer-icon" />
            <FaTwitter className="footer-icon" />
            <FaInstagram className="footer-icon" />
            <FaWhatsapp className="footer-icon" />
            <FaTiktok className="footer-icon" />
          </div>
        </div>
      </div>
      <div className="bg-prime">
    <p className="footer-copyright">
          Copyright &copy; 2025 - All Right Reserved.
        </p> 
      </div>
    </footer>
  );
};

export default Footer;