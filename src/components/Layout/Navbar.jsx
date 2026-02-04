import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ cartCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        
        {/* Logo */}
        <div className="logo">
          <Link to="/" onClick={closeMenu}>
            <div className="logo-content">
              <span className="logo-icon">🛒</span>
              <div className="logo-text">
                <h1 className="brand-name">GroceryOnWeb</h1>
                <span className="brand-tag">Fresh & Fast</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="nav-links-desktop">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <span className="link-icon">🏠</span>
            Home
          </Link>

          <Link 
            to="/products" 
            className={`nav-link ${location.pathname === '/products' ? 'active' : ''}`}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <span className="link-icon">🛍️</span>
            Products
          </Link>

          <Link 
            to="/about" 
            className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <span className="link-icon">ℹ️</span>
            About
          </Link>

          <Link 
            to="/contact" 
            className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <span className="link-icon">📞</span>
            Contact
          </Link>
        </div>

        {/* Cart Button */}
        <Link to="/cart" className="cart-link" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div className="cart-button">
            <span className="cart-icon">🛒</span>
            <span className="cart-text">Cart</span>
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount > 99 ? '99+' : cartCount}</span>
            )}
          </div>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        {/* Mobile Menu */}
        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <div className="mobile-header">
            <h3>Menu</h3>
            <button className="close-btn" onClick={closeMenu}>✕</button>
          </div>

          <Link 
            to="/" 
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              closeMenu();
            }} 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            <span className="link-icon">🏠</span>
            <span>Home</span>
          </Link>

          <Link 
            to="/products" 
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              closeMenu();
            }} 
            className={`nav-link ${location.pathname === '/products' ? 'active' : ''}`}
          >
            <span className="link-icon">🛍️</span>
            <span>Products</span>
          </Link>

          <Link 
            to="/about" 
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              closeMenu();
            }} 
            className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
          >
            <span className="link-icon">ℹ️</span>
            <span>About</span>
          </Link>

          <Link 
            to="/contact" 
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              closeMenu();
            }} 
            className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
          >
            <span className="link-icon">📞</span>
            <span>Contact</span>
          </Link>

          <Link 
            to="/cart" 
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              closeMenu();
            }} 
            className={`nav-link cart-mobile ${location.pathname === '/cart' ? 'active' : ''}`}
          >
            <span className="link-icon">🛒</span>
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </Link>

          <div className="mobile-footer">
            <div className="delivery-info">
              <span className="info-icon">🚚</span>
              <span>Free Delivery on ₹499+</span>
            </div>
          </div>
        </div>

        {/* Overlay */}
        {isMenuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}
      </div>
    </nav>
  );
};

export default Navbar;