import React from 'react';
import { Link } from 'react-router-dom';
import './OrderSummary.css';
import { useState } from 'react';

import Payment from '../Checkout/Payment.jsx';



const OrderSummary = ({ items, address, paymentMethod, onPlaceOrder, currentStep = 3 }) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 499 ? 0 : 40;
  const tax = subtotal * 0.18;
  const total = subtotal + deliveryFee + tax;

  const [ payment , setPayment ] = useState(false);



  // Add COD charge if selected
  const finalTotal = paymentMethod === 'cod' ? total + 10 : total;
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  
  const isOrderReady = address && paymentMethod && currentStep === 3;

  const formatAddress = () => {
    if (!address) return 'Not provided';
    return `${address.fullName || address.name}, ${address.address}, ${address.city}, ${address.state} - ${address.pincode}`;
  };

  const getPaymentIcon = () => {
    switch(paymentMethod) {
      case 'cod': return '💰';
      case 'card': return '💳';
      case 'upi': return '📱';
      case 'netbanking': return '🏦';
      default: return '💳';
    }
  };

  const getPaymentText = () => {
    switch(paymentMethod) {
      case 'cod': return 'Cash on Delivery';
      case 'card': return 'Credit/Debit Card';
      case 'upi': return 'UPI Payment';
      case 'netbanking': return 'Net Banking';
      default: return 'Select Payment';
    }
  };

  return (
    <div className="order-summary-card">
      {/* Order Summary Header */}
      <div className="order-summary-header">
        <h3 className="summary-title">
          <span className="summary-icon">📋</span>
          Order Summary
        </h3>
        <div className="summary-badge">
          {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </div>
      </div>

      {/* Items List */}
      <div className="order-items-section">
        <div className="items-header">
          <h4 className="items-title">Your Items</h4>
          <Link to="/cart" className="edit-cart-link">
            <span className="edit-icon">✏️</span>
            Edit Cart
          </Link>
        </div>
        
        <div className="items-list">
          {items.slice(0, 3).map(item => (
            <div key={item.id} className="order-item">
              <div className="item-icon">{item.image || '🛒'}</div>
              <div className="item-details">
                <span className="item-name">{item.name}</span>
                <span className="item-meta">
                  {item.quantity} × ₹{item.price.toFixed(2)}
                </span>
              </div>
              <div className="item-total">₹{(item.price * item.quantity).toFixed(2)}</div>
            </div>
          ))}
          
          {items.length > 3 && (
            <div className="more-items">
              <span className="more-count">+{items.length - 3} more items</span>
              <Link to="/cart" className="view-all-link">View all →</Link>
            </div>
          )}
        </div>
      </div>

      {/* Delivery & Payment Info */}
      <div className="info-sections">
        {/* Delivery Info */}
        <div className="info-section">
          <div className="info-header">
            <span className="info-icon">📍</span>
            <h4 className="info-title">Delivery Address</h4>
            {address && (
              <span className="info-status verified">✓ Verified</span>
            )}
          </div>
          <div className="info-content">
            {address ? (
              <>
                <p className="address-name"><strong>{address.fullName || address.name}</strong></p>
                <p className="address-details">{address.address}</p>
                <p className="address-location">{address.city}, {address.state} - {address.pincode}</p>
                <p className="address-phone">📱 {address.phone}</p>
              </>
            ) : (
              <p className="info-placeholder">Add delivery address to continue</p>
            )}
          </div>
        </div>

        {/* Payment Info */}
        <div className="info-section">
          <div className="info-header">
            <span className="info-icon">💳</span>
            <h4 className="info-title">Payment Method</h4>
          </div>
          <div className="info-content">
            {paymentMethod ? (
              <div className="payment-display">
                <span className="payment-icon">{getPaymentIcon()}</span>
                <div className="payment-details">
                  <p className="payment-method">{getPaymentText()}</p>
                  {paymentMethod === 'cod' && (
                    <p className="payment-note">+ ₹10 COD charge applied</p>
                  )}
                </div>
              </div>
            ) : (
              <p className="info-placeholder">Select payment method</p>
            )}
          </div>
        </div>

        {/* Delivery Time */}
        <div className="delivery-time-section">
          <div className="delivery-icon">⏰</div>
          <div className="delivery-details">
            <h4 className="delivery-title">2-Hour Delivery Guarantee</h4>
            <p className="delivery-time">Delivered within 120 minutes</p>
          </div>
          <div className="delivery-badge">🚚</div>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="price-breakdown-section">
        <h4 className="price-title">Price Details</h4>
        
        <div className="price-rows">
          <div className="price-row">
            <span className="price-label">Subtotal ({itemCount} items)</span>
            <span className="price-value">₹{subtotal.toFixed(2)}</span>
          </div>
          
          <div className="price-row">
            <span className="price-label">Delivery Fee</span>
            <span className={`price-value ${deliveryFee === 0 ? 'free-delivery' : ''}`}>
              {deliveryFee === 0 ? (
                <>
                  <span className="free-text">FREE</span>
                  <span className="free-badge">🎉</span>
                </>
              ) : (
                `₹${deliveryFee}`
              )}
            </span>
          </div>
          
          <div className="price-row">
            <span className="price-label">Tax (5%)</span>
            <span className="price-value">₹{tax.toFixed(2)}</span>
          </div>
          
          {paymentMethod === 'cod' && (
            <div className="price-row cod-charge">
              <span className="price-label">COD Convenience Fee</span>
              <span className="price-value">₹10.00</span>
            </div>
          )}

          {/* Free Delivery Progress */}
          {deliveryFee > 0 && (
            <div className="free-delivery-progress">
              <div className="progress-text">
                <span className="progress-icon">🎁</span>
                Add ₹{(499 - subtotal).toFixed(2)} more for FREE delivery!
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${Math.min((subtotal / 499) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Total Row */}
          <div className="price-row total-row">
            <div className="total-label">
              <span className="total-text">Total Amount</span>
              <span className="total-note">(Inclusive of all taxes)</span>
            </div>
            <div className="total-amount-section">
              <span className="total-amount">₹{finalTotal.toFixed(2)}</span>
              {paymentMethod === 'cod' && (
                <span className="cod-total-note">Pay on delivery</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Place Order Button */}
      <button 
        onClick={() => isOrderReady && setPayment(true)} 
        className={`place-order-btn ${!isOrderReady ? 'disabled' : ''}`}
        disabled={!isOrderReady}
      >
        {isOrderReady ? (
          <>
            <span className="btn-icon">✅</span>
            <span className="btn-text">Place Order & Pay</span>
            <span className="btn-amount">₹{finalTotal.toFixed(2)}</span>
          </>
        ) : (
          <>
            <span className="btn-icon">🔒</span>
            <span className="btn-text">Complete All Steps</span>
          </>
        )}
      </button>

      {payment && <Payment amount={finalTotal} onClose={() => setPayment(false)} />}

      {/* Order Guarantees */}
      <div className="order-guarantees">
        <div className="guarantee-item">
          <span className="guarantee-icon">🔄</span>
          <span className="guarantee-text">Easy returns within 24 hours</span>
        </div>
        <div className="guarantee-item">
          <span className="guarantee-icon">🔒</span>
          <span className="guarantee-text">100% secure payment</span>
        </div>
        <div className="guarantee-item">
          <span className="guarantee-icon">💯</span>
          <span className="guarantee-text">Freshness guaranteed</span>
        </div>
      </div>

      {/* Terms & Conditions */}
      <div className="terms-section">
        <p className="terms-text">
          By placing this order, you agree to our <Link to="/terms" className="terms-link">Terms of Service</Link> 
          and <Link to="/privacy" className="terms-link">Privacy Policy</Link>
        </p>
        <p className="support-text">
          Need help? Call us: <span className="support-phone">📞 1800-123-4567</span>
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;