import React, { useState } from 'react';
import './ContactPage.css';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Send,
  MessageCircle,
  ShoppingBag,
  Truck,
  Shield,
  CheckCircle,
  User,
  Smartphone
} from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactOptions = [
    {
      icon: <Phone />,
      title: 'Call Us',
      text: '24/7 Customer Support',
      info: '1800-FRESH-CART',
      button: 'Call Now',
      color: '#10B981'
    },
    {
      icon: <Mail />,
      title: 'Email Us',
      text: 'Quick Response',
      info: 'help@freshcart.com',
      button: 'Send Email',
      color: '#3B82F6'
    },
    {
      icon: <MessageCircle />,
      title: 'Live Chat',
      text: 'Instant Help',
      info: 'Available Now',
      button: 'Start Chat',
      color: '#8B5CF6'
    }
  ];

  const quickHelp = [
    {
      icon: <ShoppingBag />,
      title: 'Order Issues',
      text: 'Missing items, wrong orders'
    },
    {
      icon: <Truck />,
      title: 'Delivery',
      text: 'Late delivery, tracking'
    },
    {
      icon: <Shield />,
      title: 'Quality Concern',
      text: 'Freshness, damaged items'
    }
  ];

  const storeInfo = {
    address: '123 Fresh Street, Mumbai',
    hours: '6:00 AM - 11:00 PM',
    phone: '+91 98765 43210'
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', phone: '', message: '' });
      }, 3000);
    }
  };

  return (
    <div className="contact-page">
      {/* Header */}
      <div className="contact-header">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Get help with your grocery orders anytime</p>
        </div>
      </div>

      <div className="container">
        {/* Contact Options */}
        <div className="contact-options">
          {contactOptions.map((option, index) => (
            <div key={index} className="option-card">
              <div className="option-icon" style={{ backgroundColor: `${option.color}15` }}>
                <div style={{ color: option.color }}>
                  {option.icon}
                </div>
              </div>
              <h3>{option.title}</h3>
              <p className="option-text">{option.text}</p>
              <p className="option-info">{option.info}</p>
              <button className="option-btn" style={{ backgroundColor: option.color }}>
                {option.button}
              </button>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="contact-content">
          {/* Left - Quick Form */}
          <div className="contact-form-section">
            <div className="form-header">
              <h2>Quick Help Request</h2>
              <p>Fill this form and we'll call you back in 10 minutes</p>
            </div>

            {isSubmitted ? (
              <div className="success-message">
                <CheckCircle size={48} color="#10B981" />
                <h3>Request Sent!</h3>
                <p>We'll call you back shortly at {formData.phone}</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <div className="input-icon">
                    <User size={20} />
                  </div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <div className="input-icon">
                    <Smartphone size={20} />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <div className="input-icon">
                    <MessageCircle size={20} />
                  </div>
                  <textarea
                    name="message"
                    placeholder="What do you need help with?"
                    value={formData.message}
                    onChange={handleChange}
                    rows="3"
                  />
                </div>

                <button type="submit" className="submit-btn">
                  <Send size={20} />
                  Request Call Back
                </button>
              </form>
            )}

            {/* Quick Help Topics */}
            <div className="help-topics">
              <h3>Common Issues</h3>
              <div className="topics-grid">
                {quickHelp.map((topic, index) => (
                  <div key={index} className="topic-card">
                    <div className="topic-icon">
                      {topic.icon}
                    </div>
                    <div>
                      <h4>{topic.title}</h4>
                      <p>{topic.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Store Info */}
          <div className="store-info-section">
            <div className="store-card">
              <div className="store-header">
                <MapPin size={24} color="#10B981" />
                <h2>Visit Our Store</h2>
              </div>

              <div className="store-details">
                <div className="detail-item">
                  <MapPin size={18} />
                  <div>
                    <p className="detail-label">Address</p>
                    <p className="detail-value">{storeInfo.address}</p>
                  </div>
                </div>

                <div className="detail-item">
                  <Clock size={18} />
                  <div>
                    <p className="detail-label">Store Hours</p>
                    <p className="detail-value">{storeInfo.hours}</p>
                    <p className="detail-note">Open all days</p>
                  </div>
                </div>

                <div className="detail-item">
                  <Phone size={18} />
                  <div>
                    <p className="detail-label">Store Phone</p>
                    <p className="detail-value">{storeInfo.phone}</p>
                  </div>
                </div>
              </div>

              <div className="delivery-info">
                <h3>Delivery Information</h3>
                <ul>
                  <li>• 2-hour delivery in metro cities</li>
                  <li>• Free delivery above ₹499</li>
                  <li>• Contactless delivery available</li>
                  <li>• Live order tracking</li>
                </ul>
              </div>

              <div className="emergency-contact">
                <h3>For Urgent Issues</h3>
                <p className="emergency-number">📞 1800-EMERGENCY</p>
                <p className="emergency-note">24/7 emergency support for critical issues</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>What are your delivery timings?</h3>
              <p>We deliver from 6 AM to 11 PM daily. Express delivery available within 90 minutes.</p>
            </div>
            <div className="faq-item">
              <h3>How can I track my order?</h3>
              <p>Use our app or website with your order number to track in real-time.</p>
            </div>
            <div className="faq-item">
              <h3>What's your return policy?</h3>
              <p>Return fresh items within 6 hours, others within 24 hours for quality issues.</p>
            </div>
            <div className="faq-item">
              <h3>Is there a minimum order?</h3>
              <p>Minimum order is ₹199. Free delivery for orders above ₹499.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;