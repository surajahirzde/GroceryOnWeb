import React from 'react';
import { Link } from 'react-router-dom';
import './CartSummary.css';

const CartSummary = ({ items }) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 499 ? 0 : 40;
  const tax = subtotal * 0.18; // 5% tax
  const total = subtotal + deliveryFee + tax;
  
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  const freeDeliveryRemaining = Math.max(0, 499 - subtotal);
  const isFreeDelivery = deliveryFee === 0;

  return (
    <div className="cart-summary-container">
      {/* Summary Header */}
      <div className="summary-header">
        <h3 className="summary-title">
          <span className="summary-icon">📋</span>
          Order Summary
        </h3>
        <div className="summary-badge">
          {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="summary-price-breakdown">
        <div className="price-row">
          <div className="price-label">
            <span className="label-icon">🛒</span>
            <span className="label-text">Subtotal</span>
            <span className="label-items">({itemCount} items)</span>
          </div>
          <div className="price-value">₹{subtotal.toFixed(2)}</div>
        </div>
        
        <div className="price-row">
          <div className="price-label">
            <span className="label-icon">🚚</span>
            <span className="label-text">Delivery Fee</span>
          </div>
          <div className={`price-value ${isFreeDelivery ? 'free-delivery' : ''}`}>
            {isFreeDelivery ? (
              <>
                <span className="free-text">FREE</span>
                <span className="free-badge">🎉</span>
              </>
            ) : (
              `₹${deliveryFee}`
            )}
          </div>
        </div>
        
        <div className="price-row">
          <div className="price-label">
            <span className="label-icon">🏛️</span>
            <span className="label-text">Tax (18%)</span>
          </div>
          <div className="price-value">₹{tax.toFixed(2)}</div>
        </div>

        {/* Progress Bar for Free Delivery */}
        {!isFreeDelivery && (
          <div className="delivery-progress-container">
            <div className="progress-header">
              <span className="progress-icon">🎁</span>
              <span className="progress-text">
                Add ₹{freeDeliveryRemaining.toFixed(2)} more for FREE delivery!
              </span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${Math.min((subtotal / 499) * 100, 100)}%` }}
              ></div>
            </div>
            <div className="progress-labels">
              <span className="progress-min">₹0</span>
              <span className="progress-target">₹499</span>
            </div>
          </div>
        )}

        {/* Total Section */}
        <div className="price-total-row">
          <div className="total-label">
            <span className="total-icon">💰</span>
            <span className="total-text">Total Amount</span>
          </div>
          <div className="total-value">
            <span className="total-amount">₹{total.toFixed(2)}</span>
            <span className="total-note">(Inclusive of all taxes)</span>
          </div>
        </div>

        {/* Savings Information */}
        <div className="savings-info">
          <div className="savings-item">
            <span className="savings-icon">💎</span>
            <div className="savings-content">
              <span className="savings-title">You Save</span>
              <span className="savings-amount">₹{(items.reduce((sum, item) => sum + ((item.originalPrice || item.price * 1.1) - item.price) * item.quantity, 0)).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <Link 
        to="/checkout" 
        className={`summary-checkout-btn ${items.length === 0 ? 'disabled' : ''}`}
        onClick={(e) => {
          if (items.length === 0) {
            e.preventDefault();
          }
        }}
      >
        {items.length === 0 ? (
          <>
            <span className="btn-icon">🛒</span>
            Cart is Empty
          </>
        ) : (
          <>
            <span className="btn-icon">🔒</span>
            <span className="btn-text">Proceed to Secure Checkout</span>
            <span className="btn-arrow">→</span>
          </>
        )}
      </Link>

      {/* Payment Methods */}
      <div className="payment-methods">
        <h4 className="payment-title">
          <span className="payment-icon">💳</span>
          We Accept
        </h4>
        <div className="payment-icons">
          <span className="payment-method">💳</span>
          <span className="payment-method">🏦</span>
          <span className="payment-method">📱</span>
          <span className="payment-method">💰</span>
          <span className="payment-method">💎</span>
        </div>
        <p className="payment-note">Cash on Delivery Available</p>
      </div>

      {/* Security & Guarantees */}
      <div className="security-section">
        <div className="security-item">
          <span className="security-icon">🔒</span>
          <div className="security-content">
            <h5>100% Secure Checkout</h5>
            <p>Your payment is protected</p>
          </div>
        </div>
        
        <div className="security-item">
          <span className="security-icon">🔄</span>
          <div className="security-content">
            <h5>Easy Returns</h5>
            <p>24-hour return policy</p>
          </div>
        </div>
        
        <div className="security-item">
          <span className="security-icon">💯</span>
          <div className="security-content">
            <h5>Quality Guarantee</h5>
            <p>Fresh products always</p>
          </div>
        </div>
      </div>

      {/* Apply Coupon */}
      <div className="coupon-section">
        <div className="coupon-header">
          <span className="coupon-icon">🎟️</span>
          <span className="coupon-title">Have a coupon code?</span>
        </div>
        <div className="coupon-input-group">
          <input 
            type="text" 
            placeholder="Enter coupon code"
            className="coupon-input"
          />
          <button className="coupon-apply-btn">Apply</button>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;