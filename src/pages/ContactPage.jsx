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
  Smartphone,
  Headphones,
  Zap,
  Award,
  Globe,
  Calendar
} from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactOptions = [
    {
      icon: <Phone />,
      title: 'Call Us',
      text: '24/7 Customer Support',
      info: '9211336188',
      detail: 'Toll-Free Number',
      button: 'Call Now',
      color: '#10B981'
    },
    {
      icon: <Mail />,
      title: 'Email Us',
      text: 'Quick Response Guaranteed',
      info: 'groceryonweb188@gmail.com',
      detail: 'Reply within 2 hours',
      button: 'Send Email',
      color: '#3B82F6'
    },
    {
      icon: <MessageCircle />,
      title: 'Live Chat',
      text: 'Instant Support',
      info: 'Chat Available Soon',
      detail: 'Average wait: 30 sec',
      button: 'Start Chat',
      color: '#8B5CF6'
    },
    {
      icon: <Headphones />,
      title: 'WhatsApp',
      text: 'Quick Queries',
      info: '9211336186',
      detail: 'Message us anytime',
      button: 'WhatsApp Us',
      color: '#25D366'
    }
  ];

  const quickHelp = [
    {
      icon: <ShoppingBag />,
      title: 'Order Issues',
      text: 'Missing items, wrong products',
      color: '#ef4444'
    },
    {
      icon: <Truck />,
      title: 'Delivery Support',
      text: 'Tracking, delays, rescheduling',
      color: '#3b82f6'
    },
    {
      icon: <Shield />,
      title: 'Quality Concerns',
      text: 'Freshness, damaged items',
      color: '#f59e0b'
    },
    {
      icon: <Award />,
      title: 'Refunds',
      text: 'Returns, cancellations, refunds',
      color: '#10b981'
    }
  ];

  const features = [
    {
      icon: <Zap />,
      title: '90-Min Response',
      text: 'Quick resolution guaranteed'
    },
    {
      icon: <Globe />,
      title: 'Multi-Language',
      text: 'Support in 8+ languages'
    },
    {
      icon: <Calendar />,
      title: 'Open 24/7',
      text: 'Always here to help you'
    }
  ];

  const storeInfo = {
    address: '"SCO-4 DAYAL Bagh Market , Sector -39, Faridabad - 121009"',
    hours: '6:00 AM - 11:00 PM',
    phone: '9211336186',
    email: 'groceryonweb188@gmail.com'
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.phone && formData.email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
      }, 4000);
    }
  };

  return (
    <div className="contact-page">
      {/* Hero Header */}
      <section className="contact-hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <Headphones size={18} />
              <span>24/7 Support Available</span>
            </div>
            <h1 className="hero-title">Get In Touch With Us</h1>
            <p className="hero-subtitle">
              Our dedicated support team is here to help you with any questions or concerns
            </p>
          </div>
          
          {/* Features Row */}
          <div className="features-row">
            {features.map((feature, index) => (
              <div key={index} className="feature-item">
                <div className="feature-icon-wrapper">
                  {feature.icon}
                </div>
                <div className="feature-text">
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container">
        {/* Contact Options Cards */}
        <section className="contact-options-section">
          <div className="section-header">
            <h2 className="section-title">Choose Your Preferred Contact Method</h2>
            <p className="section-subtitle">We're available through multiple channels for your convenience</p>
          </div>
          
          <div className="contact-options-grid">
            {contactOptions.map((option, index) => (
              <div key={index} className="option-card" style={{ '--card-color': option.color }}>
                <div className="option-icon-wrapper" style={{ background: `${option.color}15` }}>
                  <div className="option-icon" style={{ color: option.color }}>
                    {option.icon}
                  </div>
                </div>
                <div className="option-content">
                  <h3>{option.title}</h3>
                  <p className="option-text">{option.text}</p>
                  <p className="option-info">{option.info}</p>
                  <p className="option-detail">{option.detail}</p>
                </div>
                <button className="option-btn" style={{ background: option.color }}>
                  {option.button}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Main Content - Form & Info */}
        <section className="contact-main-section">
          <div className="contact-content-grid">
            {/* Left - Contact Form */}
            <div className="contact-form-section">
              <div className="form-card">
                <div className="form-header">
                  <h2>Send Us a Message</h2>
                  <p>Fill out the form below and we'll get back to you within 2 hours</p>
                </div>

                {isSubmitted ? (
                  <div className="success-message">
                    <div className="success-icon">
                      <CheckCircle size={64} />
                    </div>
                    <h3>Message Sent Successfully!</h3>
                    <p>Thank you for contacting us. We've received your message and will respond to <strong>{formData.email}</strong> shortly.</p>
                    <button 
                      className="back-btn"
                      onClick={() => setIsSubmitted(false)}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Full Name *</label>
                        <div className="input-wrapper">
                          <div className="input-icon">
                            <User size={18} />
                          </div>
                          <input
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label>Phone Number *</label>
                        <div className="input-wrapper">
                          <div className="input-icon">
                            <Smartphone size={18} />
                          </div>
                          <input
                            type="tel"
                            name="phone"
                            placeholder="+9211336186"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Email Address *</label>
                      <div className="input-wrapper">
                        <div className="input-icon">
                          <Mail size={18} />
                        </div>
                        <input
                          type="email"
                          name="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Subject *</label>
                      <div className="input-wrapper">
                        <div className="input-icon">
                          <MessageCircle size={18} />
                        </div>
                        <input
                          type="text"
                          name="subject"
                          placeholder="What is this regarding?"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Your Message</label>
                      <div className="input-wrapper">
                        <textarea
                          name="message"
                          placeholder="Tell us more about your query or concern..."
                          value={formData.message}
                          onChange={handleChange}
                          rows="5"
                        />
                      </div>
                    </div>

                    <button type="submit" className="submit-btn">
                      <Send size={20} />
                      Send Message
                    </button>
                  </form>
                )}
              </div>

              {/* Quick Help Topics */}
              <div className="help-topics-card">
                <h3>Need Quick Help?</h3>
                <p className="help-subtitle">Select a topic for instant assistance</p>
                <div className="topics-grid">
                  {quickHelp.map((topic, index) => (
                    <div key={index} className="topic-card" style={{ '--topic-color': topic.color }}>
                      <div className="topic-icon-wrapper">
                        {topic.icon}
                      </div>
                      <div className="topic-content">
                        <h4>{topic.title}</h4>
                        <p>{topic.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right - Store Info & Details */}
            <div className="contact-info-section">
              {/* Store Location Card */}
              <div className="info-card store-location-card">
                <div className="card-header">
                  <div className="header-icon">
                    <MapPin size={24} />
                  </div>
                  <h2>Visit Our Store</h2>
                </div>

                <div className="store-details">
                  <div className="detail-item">
                    <div className="detail-icon">
                      <MapPin size={20} />
                    </div>
                    <div className="detail-content">
                      <p className="detail-label">Store Address</p>
                      <p className="detail-value">{storeInfo.address}</p>
                    </div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-icon">
                      <Clock size={20} />
                    </div>
                    <div className="detail-content">
                      <p className="detail-label">Operating Hours</p>
                      <p className="detail-value">{storeInfo.hours}</p>
                      <p className="detail-note">Open all 7 days a week</p>
                    </div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-icon">
                      <Phone size={20} />
                    </div>
                    <div className="detail-content">
                      <p className="detail-label">Store Contact</p>
                      <p className="detail-value">{storeInfo.phone}</p>
                    </div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-icon">
                      <Mail size={20} />
                    </div>
                    <div className="detail-content">
                      <p className="detail-label">Email Address</p>
                      <p className="detail-value">{storeInfo.email}</p>
                    </div>
                  </div>
                </div>

                <div className="map-placeholder">
                  <img 
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&h=300&fit=crop" 
                    alt="Store Location"
                  />
                  <div className="map-overlay">
                    <MapPin size={32} />
                    <p>View on Maps</p>
                  </div>
                </div>
              </div>

              {/* Delivery Info Card */}
              <div className="info-card delivery-card">
                <h3>Delivery Information</h3>
                <ul className="delivery-list">
                  <li>
                    <CheckCircle size={18} />
                    <span>2-hour express delivery in metro cities</span>
                  </li>
                  <li>
                    <CheckCircle size={18} />
                    <span>Free delivery on orders above ₹499</span>
                  </li>
                  <li>
                    <CheckCircle size={18} />
                    <span>Contactless delivery available</span>
                  </li>
                  <li>
                    <CheckCircle size={18} />
                    <span>Real-time order tracking</span>
                  </li>
                  <li>
                    <CheckCircle size={18} />
                    <span>Temperature-controlled packaging</span>
                  </li>
                </ul>
              </div>

              {/* Emergency Contact Card */}
              <div className="info-card emergency-card">
                <div className="emergency-icon">
                  <Phone size={28} />
                </div>
                <h3>Emergency Support</h3>
                <p className="emergency-number">1800-EMERGENCY</p>
                <p className="emergency-text">
                  24/7 emergency hotline for critical issues like food safety concerns or urgent delivery problems
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section">
          <div className="section-header">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">Quick answers to common questions</p>
          </div>
          
          <div className="faq-grid">
            <div className="faq-item">
              <div className="faq-icon">
                <Clock size={24} />
              </div>
              <h3>What are your delivery timings?</h3>
              <p>We deliver from 6 AM to 11 PM daily. Express delivery is available within 90 minutes for urgent orders in select areas.</p>
            </div>
            
            <div className="faq-item">
              <div className="faq-icon">
                <Truck size={24} />
              </div>
              <h3>How can I track my order?</h3>
              <p>You can track your order in real-time using our mobile app or website. Simply enter your order number or check your account dashboard.</p>
            </div>
            
            <div className="faq-item">
              <div className="faq-icon">
                <Shield size={24} />
              </div>
              <h3>What's your return policy?</h3>
              <p>Fresh items can be returned within 6 hours of delivery, while packaged goods can be returned within 24 hours if there are quality issues.</p>
            </div>
            
            <div className="faq-item">
              <div className="faq-icon">
                <ShoppingBag size={24} />
              </div>
              <h3>Is there a minimum order value?</h3>
              <p>The minimum order value is ₹199. Orders above ₹499 qualify for free delivery. Express delivery has a minimum of ₹299.</p>
            </div>
            
            <div className="faq-item">
              <div className="faq-icon">
                <Award size={24} />
              </div>
              <h3>Do you have a loyalty program?</h3>
              <p>Yes! Our FreshRewards program offers points on every purchase, exclusive discounts, and early access to sales. Sign up for free today.</p>
            </div>
            
            <div className="faq-item">
              <div className="faq-icon">
                <MessageCircle size={24} />
              </div>
              <h3>How do I contact customer support?</h3>
              <p>Contact us via phone (1800-FRESH-CART), email (help@freshcart.com), live chat on our website, or WhatsApp for quick assistance.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactPage;