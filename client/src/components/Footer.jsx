import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>We offer the finest antique jewelry auctions, featuring timeless treasures from around the world.</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <p><a href="/">Home</a></p>
          <p><a href="/auctions">Auctions</a></p>
          <p><a href="/collections">Collections</a></p>
          <p><a href="/contact">Contact</a></p>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaLinkedin /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        © 2025 Antique Jewelry. All Rights NOT Reserved.
      </div>
    </footer>
  );
}

export default Footer;
