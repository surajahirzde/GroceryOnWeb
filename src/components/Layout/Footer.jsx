import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { to: "/", label: "Home", icon: "🏠" },
    { to: "/products", label: "Products", icon: "🛒" },


    { to: "/about", label: "About Us", icon: "📖" },
    { to: "/contact", label: "Contact", icon: "📞" },

    { to: "/cart", label: "My Cart", icon: "🛍️" }
  ];

  const contactInfo = [
    { icon: "📞", text: "+91 98765 43210" },
    { icon: "📧", text: "support@grocerystore.com" },
    { icon: "📍", text: "123, Grocery Street, Delhi, India" }
  ];

  const deliveryHours = [
    { day: "Monday - Friday", time: "8:00 AM - 10:00 PM" },
    { day: "Saturday - Sunday", time: "9:00 AM - 11:00 PM" }
  ];

  const paymentMethods = ["💳", "🏦", "📱", "💰"];

  return (
    <footer className="footer-section">
      {/* Top Footer */}


      {/* Main Footer */}
      <div className="footer-main">
        <div className="footer-container">
          <div className="footer-grid">
            {/* Logo & Description */}
            <div className="footer-column footer-brand">
              <div className="footer-logo">
                <span className="logo-icon">🛒</span>
                <div className="logo-text">
                  <h3 className="brand-name">GroceryOnWeb</h3>
                  <p className="brand-tagline">Premium Groceries</p>
                </div>
              </div>
              <p className="footer-description">
                Your one-stop destination for fresh groceries delivered to your door in just 2 hours!
                Quality products, affordable prices, and exceptional service.
              </p>
              <div className="footer-social">
                <a href="#" className="social-icon" aria-label="Facebook">📘</a>
                <a href="#" className="social-icon" aria-label="Instagram">📸</a>
                <a href="#" className="social-icon" aria-label="Twitter">🐦</a>
                <a href="#" className="social-icon" aria-label="WhatsApp">💬</a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-column">
              <h4 className="footer-column-title">
                <span className="title-icon">🔗</span>
                Quick Links
              </h4>
              <ul className="footer-links">
                {quickLinks.map((link, index) => (
                  <li key={index} className="footer-link-item">
                    <Link to={link.to} className="footer-link">
                      <span className="link-icon">{link.icon}</span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-column">
              <h4 className="footer-column-title">
                <span className="title-icon">📞</span>
                Contact Us
              </h4>
              <ul className="footer-contacts">
                {contactInfo.map((contact, index) => (
                  <li key={index} className="contact-item">
                    <span className="contact-icon">{contact.icon}</span>
                    <span className="contact-text">{contact.text}</span>
                  </li>
                ))}
              </ul>


            </div>

            {/* Download App */}
            <div className="footer-column">
              <h4 className="footer-column-title mt-30">
                <span className="title-icon">⏰</span>
                Delivery Hours
              </h4>
              <ul className="delivery-hours">
                {deliveryHours.map((hour, index) => (
                  <li key={index} className="delivery-item">
                    <span className="delivery-day">{hour.day}</span>
                    <span className="delivery-time">{hour.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <div className="footer-container">
          <div className="footer-bottom-content">
            <p className="copyright">
              &copy; {currentYear} <span className="copyright-name">FreshCart</span>. All rights reserved.
            </p>

            <div className="footer-bottom-links">
              <a href="#" className="bottom-link">Privacy Policy</a>
              <span className="link-divider">•</span>
              <a href="#" className="bottom-link">Terms of Service</a>
              <span className="link-divider">•</span>
              <a href="#" className="bottom-link">Return Policy</a>
              <span className="link-divider">•</span>
              <a href="#" className="bottom-link">FAQ</a>
            </div>

            <div className="made-with">
              <span className="heart-icon">❤️</span>
              Made with love for fresh groceries
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;