import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ cartCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        {/* Logo */}
        <div className="logo">
          <Link to="/" onClick={closeMenu}>
            <h1> GroceryStore</h1>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>

        {/* Navigation Links */}
        <div 
          className={`nav-links ${isMenuOpen ? 'active' : ''}`}
          onClick={closeMenu}
        >
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          
          {/* Cart with Badge */}
          <Link to="/cart" className="nav-link cart-link">
            🛒 Cart
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </Link>
          
          {/* Login Button */}
          <Link to="/login" className="nav-link login-btn">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;