import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/Cart/CartItem';
import CartSummary from '../components/Cart/CartSummary';
import EmptyCart from '../components/Cart/EmptyCart';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, updateQuantity, removeItem, clearCart } = useCart();

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
    }
  };

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="cart-page-container">
        <div className="cart-content-wrapper">
          <div className="cart-header-section">
            <div className="cart-title-area">
              <h1 className="cart-main-title">
                <span className="cart-icon-title">🛒</span>
                Shopping Cart
              </h1>
              <p className="cart-subtitle">Your selected groceries</p>
            </div>
            <Link to="/" className="cart-back-btn">
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
      <div className="cart-content-wrapper">
        
        {/* Header Section */}
        <div className="cart-header-section">
          <div className="cart-title-area">
            <h1 className="cart-main-title">
              <span className="cart-icon-title">🛒</span>
              Shopping Cart
              <span className="cart-item-badge">{itemCount} items</span>
            </h1>
            <p className="cart-subtitle">Review and checkout your items</p>
          </div>
          
          <div className="cart-actions-area">
            <Link to="/" className="cart-back-btn">
              <span className="back-arrow">←</span>
              Continue Shopping
            </Link>
            <button 
              onClick={handleClearCart} 
              className="cart-clear-btn"
              title="Remove all items from cart"
            >
              <span className="clear-icon">🗑️</span>
              Clear Cart
            </button>
          </div>
        </div>

        {/* Cart Content Grid */}
        <div className="cart-grid-layout">
          
          {/* Cart Items Section */}
          <div className="cart-items-section">
            <div className="cart-items-header-row">
              <div className="cart-header-col col-product">Product</div>
              <div className="cart-header-col col-price">Price</div>
              <div className="cart-header-col col-quantity">Quantity</div>
              <div className="cart-header-col col-total">Total</div>
              <div className="cart-header-col col-actions">Actions</div>
            </div>
            
            <div className="cart-items-list">
              {cartItems.map(item => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </div>
            
            <div className="cart-items-footer">
              <div className="cart-total-display">
                <span className="total-label">Subtotal:</span>
                <span className="total-amount">₹{subtotal.toFixed(2)}</span>
              </div>
              <Link to="/products" className="add-more-btn">
                <span className="add-icon">+</span>
                Add More Items
              </Link>
            </div>
          </div>

          {/* Cart Summary Section */}
          <div className="cart-summary-section">
            <CartSummary items={cartItems} />
          </div>
        </div>

        {/* Delivery Features */}
        <div className="cart-features-section">
          <div className="features-title">
            <span className="features-icon">✨</span>
            Why Shop With Us
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <div className="feature-content">
                <h4 className="feature-title">2-Hour Delivery</h4>
                <p className="feature-desc">Get groceries within 2 hours</p>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <div className="feature-content">
                <h4 className="feature-title">Cash on Delivery</h4>
                <p className="feature-desc">Pay when you receive order</p>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔄</div>
              <div className="feature-content">
                <h4 className="feature-title">Easy Returns</h4>
                <p className="feature-desc">24-hour return policy</p>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">💯</div>
              <div className="feature-content">
                <h4 className="feature-title">Quality Guarantee</h4>
                <p className="feature-desc">100% fresh products</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        <div className="cart-recommended-section">
          <div className="recommended-title-area">
            <h3 className="recommended-title">
              <span className="recommended-icon">🔥</span>
              Frequently Bought Together
            </h3>
            <p className="recommended-subtitle">Complete your grocery list</p>
          </div>
          
          <div className="recommended-products">
            <Link to="/products/fruits" className="recommended-product">
              <div className="product-icon">🍎</div>
              <div className="product-info">
                <span className="product-name">Fresh Fruits</span>
                <span className="product-price">From ₹49</span>
              </div>
            </Link>
            
            <Link to="/products/vegetables" className="recommended-product">
              <div className="product-icon">🥕</div>
              <div className="product-info">
                <span className="product-name">Vegetables</span>
                <span className="product-price">From ₹39</span>
              </div>
            </Link>
            
            <Link to="/products/dairy" className="recommended-product">
              <div className="product-icon">🥛</div>
              <div className="product-info">
                <span className="product-name">Dairy Products</span>
                <span className="product-price">From ₹55</span>
              </div>
            </Link>
            
            <Link to="/products/bakery" className="recommended-product">
              <div className="product-icon">🍞</div>
              <div className="product-info">
                <span className="product-name">Bakery Items</span>
                <span className="product-price">From ₹35</span>
              </div>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CartPage;