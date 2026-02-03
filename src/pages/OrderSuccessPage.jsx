import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { courierData } from '../data';

const OrderSuccessPage = () => {
  const { orderId } = useParams();
  const [courier, setCourier] = useState(null);
  const [estimatedTime, setEstimatedTime] = useState('');

  useEffect(() => {
    // Assign random courier for COD orders
    const randomCourier = courierData[Math.floor(Math.random() * courierData.length)];
    setCourier(randomCourier);
    
    // Set estimated time (1-2 hours)
    const hours = Math.floor(Math.random() * 2) + 1;
    const minutes = Math.floor(Math.random() * 60);
    setEstimatedTime(`${hours} hour${hours > 1 ? 's' : ''} ${minutes} minutes`);
    
    // Clear cart
    localStorage.removeItem('cartItems');
    localStorage.setItem('cartCount', '0');
  }, []);

  return (
    <div className="order-success-page">
      <div className="container">
        <div className="order-success-container">
          <div className="success-header">
            <div className="success-icon">✅</div>
            <h1>Order Confirmed!</h1>
            <p className="order-id">Order ID: {orderId}</p>
          </div>
          
          <div className="success-details">
            <div className="detail-card">
              <h3>📦 Order Details</h3>
              <p>Your order has been confirmed and is being processed.</p>
              <div className="detail-item">
                <span>Estimated Delivery:</span>
                <span className="highlight">{estimatedTime}</span>
              </div>
              <div className="detail-item">
                <span>Payment Status:</span>
                <span className="highlight">Confirmed</span>
              </div>
            </div>
            
            {courier && (
              <div className="detail-card">
                <h3>🚚 Delivery Executive</h3>
                <p>Your courier has been assigned and will contact you soon.</p>
                <div className="courier-info">
                  <div className="courier-detail">
                    <span>Name:</span>
                    <span className="highlight">{courier.name}</span>
                  </div>
                  <div className="courier-detail">
                    <span>Phone:</span>
                    <span className="highlight">{courier.phone}</span>
                  </div>
                  <div className="courier-detail">
                    <span>Vehicle:</span>
                    <span className="highlight">{courier.vehicle}</span>
                  </div>
                  <div className="courier-detail">
                    <span>Rating:</span>
                    <span className="highlight">⭐ {courier.rating}/5</span>
                  </div>
                </div>
                <div className="courier-note">
                  <p>📞 The delivery executive will call you 10 minutes before arrival</p>
                  <p>💰 Please keep exact change ready for cash payment</p>
                </div>
              </div>
            )}
            
            <div className="detail-card">
              <h3>📱 Track Your Order</h3>
              <p>You can track your order in real-time</p>
              <div className="tracking-steps">
                <div className="tracking-step active">
                  <div className="step-circle">1</div>
                  <div className="step-text">
                    <h4>Order Confirmed</h4>
                    <p>Your order is being packed</p>
                  </div>
                </div>
                <div className="tracking-step">
                  <div className="step-circle">2</div>
                  <div className="step-text">
                    <h4>Out for Delivery</h4>
                    <p>Courier will pick up shortly</p>
                  </div>
                </div>
                <div className="tracking-step">
                  <div className="step-circle">3</div>
                  <div className="step-text">
                    <h4>Delivered</h4>
                    <p>Expected in {estimatedTime}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="success-actions">
            <Link to="/" className="btn btn-primary">
              Continue Shopping
            </Link>
            <button 
              onClick={() => window.print()} 
              className="btn btn-secondary"
            >
              Print Receipt
            </button>
            <Link to="/contact" className="btn btn-outline">
              Need Help?
            </Link>
          </div>
          
          <div className="success-footer">
            <p>Thank you for shopping with us! 🛒</p>
            <p>For any queries, call us at <strong>+91 98765 43210</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;