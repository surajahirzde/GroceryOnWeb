import React from 'react';
import { Link } from 'react-router-dom';
import './EmptyCart.css';

const EmptyCart = () => {
  const popularItems = [
    { name: 'Apples', icon: '🍎', category: 'Fruits' },
    { name: 'Carrots', icon: '🥕', category: 'Vegetables' },
    { name: 'Milk', icon: '🥛', category: 'Dairy' },
    { name: 'Bread', icon: '🍞', category: 'Bakery' },
    { name: 'Eggs', icon: '🥚', category: 'Dairy' },
    { name: 'Bananas', icon: '🍌', category: 'Fruits' }
  ];

  return (
    <div className="empty-cart-container">
      <div className="empty-cart-content">
        {/* Animated Cart Icon */}
        <div className="empty-cart-icon-wrapper">
          <div className="empty-cart-icon">🛒</div>
          <div className="cart-icon-shadow"></div>
        </div>

        {/* Main Text */}
        <div className="empty-cart-text">
          <h2 className="empty-cart-title">Your Shopping Cart is Empty</h2>
          <p className="empty-cart-subtitle">
            Looks like you haven't added any groceries to your cart yet
          </p>
          <p className="empty-cart-message">
            Fresh vegetables, juicy fruits, and delicious groceries are waiting for you!
            Start shopping now and get them delivered in just 2 hours.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="empty-cart-actions">
          <Link to="/" className="empty-cart-btn empty-cart-btn-primary">
            <span className="btn-icon">🛍️</span>
            Start Shopping
            <span className="btn-arrow">→</span>
          </Link>
          <Link to="/products" className="empty-cart-btn empty-cart-btn-secondary">
            <span className="btn-icon">📋</span>
            View All Products
          </Link>
        </div>

        {/* Popular Items Section */}
        <div className="empty-cart-popular">
          <div className="popular-header">
            <h3 className="popular-title">
              <span className="popular-icon">🔥</span>
              Popular Items Right Now
            </h3>
            <p className="popular-subtitle">Customers are loving these fresh products</p>
          </div>

          <div className="popular-items-grid">
            {popularItems.map((item, index) => (
              <Link 
                key={index} 
                to={`/products?category=${item.category}`}
                className="popular-item-card"
              >
                <div className="popular-item-icon">{item.icon}</div>
                <div className="popular-item-info">
                  <span className="popular-item-name">{item.name}</span>
                  <span className="popular-item-category">{item.category}</span>
                </div>
                <div className="popular-item-arrow">→</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Delivery Info */}
        <div className="empty-cart-delivery-info">
          <div className="delivery-info-card">
            <div className="delivery-icon">🚚</div>
            <div className="delivery-text">
              <h4>Free Delivery</h4>
              <p>On orders above ₹499</p>
            </div>
          </div>
          
          <div className="delivery-info-card">
            <div className="delivery-icon">⏰</div>
            <div className="delivery-text">
              <h4>2-Hour Delivery</h4>
              <p>Guaranteed fast delivery</p>
            </div>
          </div>
          
          <div className="delivery-info-card">
            <div className="delivery-icon">💯</div>
            <div className="delivery-text">
              <h4>Quality Guaranteed</h4>
              <p>Fresh products every time</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;