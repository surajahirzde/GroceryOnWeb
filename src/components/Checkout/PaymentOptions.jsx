import React, { useState } from 'react';
import './PaymentOptions.css';

const PaymentOptions = ({ onPaymentSelect }) => {
  const [selectedOption, setSelectedOption] = useState('cod');
  const [upiId, setUpiId] = useState('');

  const paymentMethods = [
    {
      id: 'cod',
      name: 'Cash on Delivery',
      icon: '💰',
      description: 'Pay when you receive your order',
      note: 'Extra ₹10 handling charge'
    },
    {
      id: 'upi',
      name: 'UPI Payment',
      icon: '📱',
      description: 'Pay instantly via UPI',
      note: 'Google Pay, PhonePe, Paytm'
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: '💳',
      description: 'Pay with your card',
      note: 'Visa, MasterCard, RuPay'
    }
  ];

  const handleSelect = (methodId) => {
    setSelectedOption(methodId);
    onPaymentSelect(methodId);
  };

  const handleUpiIdChange = (e) => {
    setUpiId(e.target.value);
  };

  return (
    <div className="payment-options-container">
      <h3 className="payment-title">Select Payment Method</h3>
      
      <div className="payment-methods-grid">
        {paymentMethods.map(method => (
          <div
            key={method.id}
            className={`payment-method-card ${
              selectedOption === method.id ? 'selected' : ''
            }`}
            onClick={() => handleSelect(method.id)}
          >
            <div className="method-header">
              <div className="method-icon-wrapper">
                <span className="method-icon">{method.icon}</span>
              </div>
              
              <div className="method-radio">
                <div className={`radio-circle ${
                  selectedOption === method.id ? 'checked' : ''
                }`}>
                  {selectedOption === method.id && (
                    <div className="radio-dot"></div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="method-details">
              <h4 className="method-name">{method.name}</h4>
              <p className="method-description">{method.description}</p>
              <span className="method-note">{method.note}</span>
            </div>
          </div>
        ))}
      </div>
      
      {selectedOption === 'cod' && (
        <div className="info-message cod-warning">
          <div className="info-icon">⚠️</div>
          <div className="info-content">
            <strong>Cash Payment Instructions</strong>
            <p>Please keep exact change ready for the delivery person</p>
          </div>
        </div>
      )}
      
      {selectedOption === 'upi' && (
        <div className="upi-details-section">
          <h4 className="upi-title">Enter UPI Details</h4>
          <div className="upi-form-group">
            <label htmlFor="upiId" className="upi-label">
              UPI ID <span className="required">*</span>
            </label>
            <input
              type="text"
              id="upiId"
              value={upiId}
              onChange={handleUpiIdChange}
              placeholder="yourname@upi"
              className="upi-input"
              required
            />
            <p className="upi-hint">
              Enter your UPI ID (e.g., username@bankname)
            </p>
          </div>
          
          <div className="upi-providers">
            <div className="provider-icons">
              <div className="provider-icon">G Pay</div>
              <div className="provider-icon">PhonePe</div>
              <div className="provider-icon">Paytm</div>
              <div className="provider-icon">BHIM</div>
            </div>
          </div>
        </div>
      )}
      
      {selectedOption === 'card' && (
        <div className="info-message card-info">
          <div className="info-icon">💳</div>
          <div className="info-content">
            <strong>Secure Card Payment</strong>
            <p>You will be redirected to a secure payment gateway</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentOptions;