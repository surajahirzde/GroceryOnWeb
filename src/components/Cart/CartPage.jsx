import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../components/Cart/CartItem';
import CartSummary from '../components/Cart/CartSummary';
import EmptyCart from '../components/Cart/EmptyCart';
import './CartPage.css';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error('Error parsing cart:', error);
        setCartItems([]);
      }
    } else {
      setCartItems([]);
    }
    setLoading(false);
  }, []);

  // Listen for cart updates
  useEffect(() => {
    const handleStorageChange = () => {
      const savedCart = localStorage.getItem('cartItems');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleUpdateQuantity = (itemId, newQuantity) => {
    const updatedItems = cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    
    const totalCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
    localStorage.setItem('cartCount', totalCount.toString());
    window.dispatchEvent(new Event('storage'));
  };

  const handleRemoveItem = (itemId) => {
    const updatedItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    
    const totalCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
    localStorage.setItem('cartCount', totalCount.toString());
    window.dispatchEvent(new Event('storage'));
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      setCartItems([]);
      localStorage.removeItem('cartItems');
      localStorage.setItem('cartCount', '0');
      window.dispatchEvent(new Event('storage'));
    }
  };

  if (loading) {
    return (
      <div className="cart-loading-container">
        <div className="cart-loading-content">
          <div className="cart-loading-icon">🛒</div>
          <h2 className="cart-loading-text">Loading Your Cart...</h2>
          <p className="cart-loading-subtext">Getting your groceries ready</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-page-container">
        <div className="cart-page-content">
          <div className="cart-page-header">
            <div className="cart-header-main">
              <h1 className="cart-page-title">
                <span className="cart-title-icon">🛒</span>
                Shopping Cart
              </h1>
              <p className="cart-page-subtitle">Your selected groceries</p>
            </div>
            <Link to="/" className="cart-back-shopping">
              <span className="back-arrow">←</span>
              Continue Shopping
            </Link>
          </div>
          <EmptyCart />
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page-container">
      <div className="cart-page-content">
        {/* Header */}
        <div className="cart-page-header">
          <div className="cart-header-main">
            <h1 className="cart-page-title">
              <span className="cart-title-icon">🛒</span>
              Shopping Cart
              <span className="cart-item-count">({cartItems.length} items)</span>
            </h1>
            <p className="cart-page-subtitle">Review your items and checkout</p>
          </div>
          
          <div className="cart-header-actions">
            <Link to="/" className="cart-continue-shopping">
              <span className="continue-icon">←</span>
              Continue Shopping
            </Link>
            <button 
              onClick={handleClearCart} 
              className="cart-clear-all-btn"
              title="Remove all items from cart"
            >
              <span className="clear-icon">🗑️</span>
              Clear Cart
            </button>
          </div>
        </div>

        {/* Main Cart Content */}
        <div className="cart-main-container">
          {/* Cart Items Section */}
          <div className="cart-items-container">
            <div className="cart-items-header">
              <div className="cart-header-item header-product">Product</div>
              <div className="cart-header-item header-price">Price</div>
              <div className="cart-header-item header-quantity">Quantity</div>
              <div className="cart-header-item header-total">Total</div>
              <div className="cart-header-item header-actions">Actions</div>
            </div>
            
            <div className="cart-items-list">
              {cartItems.map((item, index) => (
                <CartItem
                  key={`${item.id}-${index}`}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                />
              ))}
            </div>
            
            <div className="cart-items-footer">
              <Link to="/products" className="cart-add-more-btn">
                <span className="add-icon">+</span>
                Add More Items
              </Link>
              <div className="cart-total-items">
                <span className="total-label">Total Items:</span>
                <span className="total-value">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>
            </div>
          </div>

          {/* Cart Summary Section */}
          <div className="cart-summary-container">
            <CartSummary items={cartItems} />
          </div>
        </div>

        {/* Delivery Features */}
        <div className="cart-features-section">
          <div className="cart-features-title">
            <span className="features-icon">✨</span>
            Why Shop With Us
          </div>
          
          <div className="cart-features-grid">
            <div className="cart-feature-card">
              <div className="feature-icon">🚚</div>
              <div className="feature-content">
                <h4 className="feature-title">2-Hour Delivery</h4>
                <p className="feature-desc">Get your groceries within 2 hours</p>
              </div>
            </div>
            
            <div className="cart-feature-card">
              <div className="feature-icon">💰</div>
              <div className="feature-content">
                <h4 className="feature-title">Cash on Delivery</h4>
                <p className="feature-desc">Pay when you receive your order</p>
              </div>
            </div>
            
            <div className="cart-feature-card">
              <div className="feature-icon">🔄</div>
              <div className="feature-content">
                <h4 className="feature-title">Easy Returns</h4>
                <p className="feature-desc">Return within 24 hours if unsatisfied</p>
              </div>
            </div>
            
            <div className="cart-feature-card">
              <div className="feature-icon">💯</div>
              <div className="feature-content">
                <h4 className="feature-title">Quality Guarantee</h4>
                <p className="feature-desc">100% fresh and quality products</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products (Optional) */}
        <div className="cart-recommended-section">
          <h3 className="recommended-title">
            <span className="recommended-icon">🔥</span>
            You Might Also Like
          </h3>
          <p className="recommended-subtitle">Based on items in your cart</p>
          
          <div className="recommended-items">
            <Link to="/products" className="recommended-item">
              <span className="rec-icon">🥛</span>
              <span className="rec-name">Fresh Dairy</span>
              <span className="rec-price">₹49</span>
            </Link>
            <Link to="/products" className="recommended-item">
              <span className="rec-icon">🍎</span>
              <span className="rec-name">Seasonal Fruits</span>
              <span className="rec-price">₹99</span>
            </Link>
            <Link to="/products" className="recommended-item">
              <span className="rec-icon">🥕</span>
              <span className="rec-name">Fresh Vegetables</span>
              <span className="rec-price">₹69</span>
            </Link>
            <Link to="/products" className="recommended-item">
              <span className="rec-icon">🍞</span>
              <span className="rec-name">Bakery Items</span>
              <span className="rec-price">₹35</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;