import { FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp} from "react-icons/fa";
import "./Footer.css";
import { FaTiktok } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Logo & Contact Info */}
        <div className="footer-section">
          <img src="/assets/logo/Logo.png" alt="HYRUN Logo" className="footer-logo" />
        <p className="footer-description">
          Discover the ultimate destination for sneaker enthusiasts. Our vibrant 
          collection offers a curated selection of stylish and high-quality sneakers 
          for every occasion.
        </p>
          <ul className="footer-list">
            <li><a href="#" className="footer-link">Contact</a></li>
            <li><span className="footer-bold">Address:</span> Aston University</li>
            <li><span className="footer-bold">Phone:</span> +0123456789</li>
            <li><span className="footer-bold">Email:</span> hyrunwebsite@gmail.com</li>
          </ul>
          <div className="footer-icons">
            <FaFacebookF className="footer-icon" />
            <FaTwitter className="footer-icon" />
            <FaInstagram className="footer-icon" />
            <FaWhatsapp className="footer-icon" />
            <FaTiktok className="footer-icon" />
          </div>
        </div>

        {/* About Section */}
        <div className="footer-section">
          <h3 className="footer-title">Useful Links</h3>
          <ul className="footer-list">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Delivery Information</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="/contact-us">Contact Us</a></li>
          </ul>
        </div>

        {/* My Account */}
        <div className="footer-section">
          <h3 className="footer-title">My Account</h3>
          <ul className="footer-list">
            <li><a href="#">Sign In</a></li>
            <li><a href="#">View Cart</a></li>
            <li><a href="#">Returns</a></li>
            <li><a href="#">Order Status</a></li>
            <li><a href="#">Help</a></li>
          </ul>
        </div>

        {/* Install App */}
        <div className="footer-section">
          <h3 className="footer-title">Secured Payment Gateways</h3>
          <div className="footer-payments">
            <img src="/assets/SM logos/visa.png.jpg" alt="Visa" className="footer-payment" />
            <img src="/assets/SM logos/mastercard.png" alt="MasterCard" className="footer-payment" />
            <img src="/assets/SM logos/mastero.png.jpg" alt="Maestro" className="footer-payment" />
            <img src="/assets/SM logos/AE.png.jpg" alt="American Express" className="footer-payment" />
          </div>
        </div>
      </div>
      <p className="footer-copyright">Copyright  &copy; 2025 - All Right Reserved.</p>
    </footer>
  );
};

export default Footer;
