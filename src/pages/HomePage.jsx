import React, { useState, useEffect } from 'react';
import Hero from '../components/Home/Hero';
import CategorySection from '../components/Home/CategorySection';
import ProductGrid from '../components/Home/ProductGrid';
import './HomePage.css';

const HomePage = () => {
  const [cartCount, setCartCount] = useState(() => {
    const saved = localStorage.getItem('cartCount');
    return saved ? parseInt(saved) : 0;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('cartCount');
      setCartCount(saved ? parseInt(saved) : 0);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <div className="home-page-container">
      <Hero/>
      <CategorySection/>
      <ProductGrid/>
      
      {cartCount > 0 && (
     <div className="home-floating-cart">
  <Link to="/cart" className="home-floating-cart-btn">
    <span className="cart-icon">🛒</span>
    <span className="cart-count">{cartCount} items</span>
    <span className="cart-text">View Cart</span>
    <span className="cart-arrow">→</span>
  </Link>
</div>

      )}
    </div>
  );
};

export default HomePage;