import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddressForm from '../components/Checkout/AddressForm';
import PaymentOptions from '../components/Checkout/PaymentOptions';
import OrderSummary from '../components/Checkout/OrderSummary';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(true);

  // Load cart items
  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCartItems(parsedCart);
      
      if (parsedCart.length === 0) {
        navigate('/cart');
        return;
      }
    } else {
      navigate('/cart');
      return;
    }
    setLoading(false);
  }, [navigate]);

  const handleAddressSubmit = (addressData) => {
    setAddress(addressData);
    setStep(2);
  };

  const handlePaymentSelect = (method) => {
    setPaymentMethod(method);
    setStep(3);
  };

  const handlePlaceOrder = () => {
    // Generate order ID
    const newOrderId = 'GROC' + Date.now().toString().slice(-8);
    setOrderId(newOrderId);
    
    // Save order
    const order = {
      id: newOrderId,
      items: cartItems,
      address,
      paymentMethod,
      date: new Date().toISOString(),
      status: 'confirmed',
      estimatedDelivery: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString()
    };
    
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    localStorage.setItem('orders', JSON.stringify([...existingOrders, order]));
    
    // Clear cart
    localStorage.removeItem('cartItems');
    localStorage.setItem('cartCount', '0');
    window.dispatchEvent(new Event('storage'));
    
    setOrderPlaced(true);
  };

  if (loading) {
    return (
      <div className="checkout-loading">
        <div className="loading-spinner">🛒</div>
        <h2>Loading Checkout...</h2>
        <p>Preparing your order details</p>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="order-success-container">
        <div className="order-success-content">
          <div className="success-animation">
            <div className="success-icon">✅</div>
            <div className="success-circle"></div>
          </div>
          
          <h1 className="success-title">Order Confirmed!</h1>
          <p className="success-subtitle">Your groceries are being prepared</p>
          
          <div className="order-details-card">
            <div className="order-id-display">
              <span className="order-id-label">Order ID:</span>
              <span className="order-id-value">{orderId}</span>
            </div>
            
            <div className="delivery-info">
              <div className="delivery-icon">🚚</div>
              <div className="delivery-details">
                <h4>2-Hour Delivery</h4>
                <p>Estimated delivery: <strong>2 hours</strong></p>
                <p className="delivery-note">Our delivery executive will call you before arrival</p>
              </div>
            </div>
            
            {paymentMethod === 'cod' && (
              <div className="cod-notice">
                <div className="cod-icon">💰</div>
                <div className="cod-details">
                  <h4>Cash on Delivery</h4>
                  <p>Please keep exact change ready for ₹{(cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 40).toFixed(2)}</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="success-actions">
            <button 
              onClick={() => navigate('/orders')}
              className="view-orders-btn"
            >
              <span className="btn-icon">📋</span>
              View My Orders
            </button>
            <button 
              onClick={() => navigate('/')}
              className="continue-shopping-btn"
            >
              <span className="btn-icon">🛍️</span>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 499 ? 0 : 40;
  const tax = subtotal * 0.05;
  const total = subtotal + deliveryFee + tax;

  return (
    <div className="checkout-page-container">
      <div className="checkout-content-wrapper">
        
        {/* Progress Steps */}
        <div className="checkout-progress">
          <div className="progress-steps">
            <div className={`progress-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
              <div className="step-number">1</div>
              <div className="step-info">
                <span className="step-title">Delivery Address</span>
                <span className="step-desc">Where to deliver</span>
              </div>
              <div className="step-icon">📍</div>
            </div>
            
            <div className={`progress-connector ${step >= 2 ? 'active' : ''}`}></div>
            
            <div className={`progress-step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
              <div className="step-number">2</div>
              <div className="step-info">
                <span className="step-title">Payment Method</span>
                <span className="step-desc">How to pay</span>
              </div>
              <div className="step-icon">💳</div>
            </div>
            
            <div className={`progress-connector ${step >= 3 ? 'active' : ''}`}></div>
            
            <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
              <div className="step-number">3</div>
              <div className="step-info">
                <span className="step-title">Review & Place Order</span>
                <span className="step-desc">Final confirmation</span>
              </div>
              <div className="step-icon">📋</div>
            </div>
          </div>
        </div>

        {/* Main Checkout Layout */}
        <div className="checkout-main-layout">
          
          {/* Left: Form Section */}
          <div className="checkout-form-section">
            {step === 1 && (
              <div className="step-content">
                <div className="step-header">
                  <h2 className="step-title">
                    <span className="title-icon">📍</span>
                    Delivery Address
                  </h2>
                  <p className="step-subtitle">Where should we deliver your groceries?</p>
                </div>
                <AddressForm onAddressSubmit={handleAddressSubmit} />
              </div>
            )}
            
            {step === 2 && (
              <div className="step-content">
                <div className="step-header">
                  <h2 className="step-title">
                    <span className="title-icon">💳</span>
                    Payment Method
                  </h2>
                  <p className="step-subtitle">Choose how you want to pay</p>
                </div>
                <PaymentOptions 
                  onPaymentSelect={handlePaymentSelect}
                  totalAmount={total}
                />
              </div>
            )}
            
            {step === 3 && (
              <div className="step-content">
                <div className="step-header">
                  <h2 className="step-title">
                    <span className="title-icon">📋</span>
                    Review Your Order
                  </h2>
                  <p className="step-subtitle">Please verify all details before placing your order</p>
                </div>
                
                <div className="review-section">
                  {/* Address Review */}
                  {address && (
                    <div className="review-card">
                      <div className="review-card-header">
                        <span className="review-icon">📍</span>
                        <h3>Delivery Address</h3>
                      </div>
                      <div className="review-card-content">
                        <p className="address-name"><strong>{address.name}</strong></p>
                        <p className="address-details">{address.address}, {address.city}</p>
                        <p className="address-contact">📱 {address.phone}</p>
                        <button 
                          onClick={() => setStep(1)}
                          className="edit-btn"
                        >
                          <span className="edit-icon">✏️</span>
                          Edit Address
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* Payment Review */}
                  {paymentMethod && (
                    <div className="review-card">
                      <div className="review-card-header">
                        <span className="review-icon">💳</span>
                        <h3>Payment Method</h3>
                      </div>
                      <div className="review-card-content">
                        <div className="payment-method-display">
                          <span className="payment-icon">
                            {paymentMethod === 'cod' ? '💰' : 
                             paymentMethod === 'card' ? '💳' : 
                             paymentMethod === 'upi' ? '📱' : '🏦'}
                          </span>
                          <div className="payment-details">
                            <h4>
                              {paymentMethod === 'cod' ? 'Cash on Delivery' :
                               paymentMethod === 'card' ? 'Credit/Debit Card' :
                               paymentMethod === 'upi' ? 'UPI Payment' : 'Net Banking'}
                            </h4>
                            <p>Selected payment method</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => setStep(2)}
                          className="edit-btn"
                        >
                          <span className="edit-icon">✏️</span>
                          Change Payment
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Navigation Buttons */}
            <div className="navigation-buttons">
              {step > 1 && (
                <button 
                  onClick={() => setStep(step - 1)}
                  className="nav-btn nav-btn-back"
                >
                  <span className="nav-icon">←</span>
                  Back
                </button>
              )}
              
              {step === 3 && (
                <button 
                  onClick={() => navigate('/cart')}
                  className="nav-btn nav-btn-edit"
                >
                  <span className="nav-icon">🛒</span>
                  Edit Cart
                </button>
              )}
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="checkout-summary-section">
            <OrderSummary
              items={cartItems}
              address={address}
              paymentMethod={paymentMethod}
              onPlaceOrder={handlePlaceOrder}
              currentStep={step}
            />
            
            {/* Security Assurance */}
            <div className="security-assurance">
              <div className="security-item">
                <span className="security-icon">🔒</span>
                <span className="security-text">100% Secure Payment</span>
              </div>
              <div className="security-item">
                <span className="security-icon">🔄</span>
                <span className="security-text">Easy Returns</span>
              </div>
              <div className="security-item">
                <span className="security-icon">💯</span>
                <span className="security-text">Quality Guaranteed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cart Summary Mini */}
        <div className="cart-summary-mini">
          <div className="mini-summary-header">
            <span className="mini-icon">🛒</span>
            <span className="mini-title">Your Cart</span>
            <span className="mini-count">{cartItems.length} items</span>
          </div>
          <div className="mini-summary-details">
            <div className="mini-item">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="mini-item">
              <span>Delivery</span>
              <span className={deliveryFee === 0 ? 'free-delivery' : ''}>
                {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
              </span>
            </div>
            <div className="mini-item">
              <span>Tax (5%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="mini-total">
              <span>Total</span>
              <span className="total-amount">₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;