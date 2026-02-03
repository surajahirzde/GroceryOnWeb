import React, { useState } from 'react';
import './AddressForm.css';

const AddressForm = ({ onAddressSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    landmark: '',
    city: '',
    pincode: '',
    state: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddressSubmit(formData);
  };

  return (
    <div className="address-form-container">
      <h3 className="address-form-title">Delivery Address</h3>
      
      <form className="address-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="fullName" className="form-label">Full Name *</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="form-input"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="phone" className="form-label">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="form-input"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Enter 10-digit mobile number"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>
          
          <div className="form-group full-width">
            <label htmlFor="address" className="form-label">Complete Address *</label>
            <textarea
              id="address"
              name="address"
              className="form-textarea"
              value={formData.address}
              onChange={handleChange}
              required
              rows="3"
              placeholder="House no., Building, Street, Area"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="landmark" className="form-label">Landmark</label>
            <input
              type="text"
              id="landmark"
              name="landmark"
              className="form-input"
              value={formData.landmark}
              onChange={handleChange}
              placeholder="Nearby landmark"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="city" className="form-label">City *</label>
            <input
              type="text"
              id="city"
              name="city"
              className="form-input"
              value={formData.city}
              onChange={handleChange}
              required
              placeholder="Enter your city"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="pincode" className="form-label">Pincode *</label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              className="form-input"
              value={formData.pincode}
              onChange={handleChange}
              required
              placeholder="6-digit pincode"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="state" className="form-label">State *</label>
            <select
              id="state"
              name="state"
              className="form-select"
              value={formData.state}
              onChange={handleChange}
              required
            >
              <option value="">Select State</option>
              <option value="Delhi">Delhi</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Gujarat">Gujarat</option>
            </select>
          </div>
        </div>
        
        <button type="submit" className="submit-address-btn">
          Save & Continue
        </button>
      </form>
    </div>
  );
};

export default AddressForm;