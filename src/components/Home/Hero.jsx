import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const navigate = useNavigate();
  const [currentOffer, setCurrentOffer] = useState(0);

  const features = [
    { 
      icon: '🚚', 
      title: 'Free Delivery', 
      desc: 'On orders above ₹499',
      color: '#2ecc71'
    },
    { 
      icon: '⏰', 
      title: '2-Hour Delivery', 
      desc: 'Guaranteed fast delivery',
      color: '#3498db'
    },
    { 
      icon: '💯', 
      title: '100% Fresh', 
      desc: 'Quality guaranteed',
      color: '#9b59b6'
    },
    { 
      icon: '🔄', 
      title: 'Easy Returns', 
      desc: '24-hour return policy',
      color: '#e74c3c'
    }
  ];

  const offers = [
    { text: 'Get 20% OFF on first order', code: 'WELCOME20' },
    { text: 'Extra 10% OFF with UPI payment', code: 'UPI10' },
    { text: 'Free vegetables on order above ₹999', code: 'VEGGIE100' },
    { text: 'Buy 1 Get 1 Free on Milk Products', code: 'MILKBOGO' }
  ];

  // Auto rotate offers
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % offers.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [offers.length]);

  const handleShopNow = () => {
    navigate('/products');
  };

  const handleDownloadApp = () => {
    window.open('https://play.google.com/store', '_blank');
  };

  return (
    <section className="grocery-hero-section">
      {/* Background Elements */}
      <div className="hero-bg-blur"></div>
      <div className="hero-floating-veg veg1">🥦</div>
      <div className="hero-floating-veg veg2">🍎</div>
      <div className="hero-floating-veg veg3">🥕</div>
      <div className="hero-floating-veg veg4">🥑</div>
      <div className="hero-floating-veg veg5">🍇</div>
      <div className="hero-floating-veg veg6">🍋</div>

      <div className="hero-container">
        {/* Left Content */}
        <div className="hero-content">
          {/* Discount Badge */}
          <div className="hero-discount-badge">
            <div className="discount-badge-content">
              <span className="discount-percent">20% OFF</span>
              <span className="discount-label">On First Order</span>
              <div className="discount-pulse"></div>
            </div>
            <div className="discount-ribbon"></div>
          </div>

          {/* Main Heading */}
          <h1 className="hero-main-title">
            <span className="hero-title-line">Fresh Groceries</span>
            <span className="hero-title-highlight">
              Delivered in <span className="highlight-text">2 Hours</span>
            </span>
          </h1>

          <p className="hero-subtitle">
            Get farm-fresh vegetables, organic fruits, premium dairy products 
            and more delivered right to your doorstep. Quality guaranteed with 
            our 100% freshness promise!
          </p>

          {/* CTA Buttons */}
          <div className="hero-cta-buttons">
            <button 
              className="cta-btn primary-btn"
              onClick={handleShopNow}
            >
              <span className="btn-icon">🛒</span>
              <span className="btn-text">Shop Now</span>
              <span className="btn-arrow">→</span>
            </button>
            
            <button 
              className="cta-btn secondary-btn"
              onClick={handleDownloadApp}
            >
              <span className="btn-icon">📱</span>
              <span className="btn-text">Download App</span>
              <span className="btn-badge">New</span>
            </button>
          </div>

          {/* Trust Badges */}
          <div className="trust-badges">
            <div className="trust-item">
              <div className="trust-icon">✅</div>
              <div className="trust-text">10,000+ Happy Customers</div>
            </div>
            <div className="trust-item">
              <div className="trust-icon">⭐</div>
              <div className="trust-text">4.8/5 Rating</div>
            </div>
            <div className="trust-item">
              <div className="trust-icon">🏆</div>
              <div className="trust-text">Award Winning Service</div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="hero-features-grid">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="feature-card"
                style={{ '--feature-color': feature.color }}
              >
                <div className="feature-icon-wrapper">
                  <span className="feature-icon">{feature.icon}</span>
                </div>
                <div className="feature-content">
                  <h4 className="feature-title">{feature.title}</h4>
                  <p className="feature-desc">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Image Section */}
        <div className="hero-image-section">
          {/* Main Grocery Basket */}
          <div className="grocery-basket">
            <div className="basket-image">
              <img 
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80" 
                alt="Fresh Groceries"
                className="basket-main-img"
              />
              
              {/* Floating Product Images */}
              <div className="floating-product apple">
                <img 
                  src="https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&fit=crop" 
                  alt="Apple"
                />
              </div>
              <div className="floating-product broccoli">
                <img 
                  src="https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=400&fit=crop" 
                  alt="Broccoli"
                />
              </div>
              <div className="floating-product milk">
                <img 
                  src="https://images.unsplash.com/photo-1567306301408-9b74779a11af?w-400&fit=crop" 
                  alt="Milk"
                />
              </div>
              <div className="floating-product bread">
                <img 
                  src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w-400&fit=crop" 
                  alt="Bread"
                />
              </div>
              
              {/* Delivery Info Card */}
              <div className="delivery-card">
                <div className="delivery-icon">🚚</div>
                <div className="delivery-details">
                  <div className="delivery-title">Fast Delivery</div>
                  <div className="delivery-time">Within 2 Hours</div>
                </div>
                <div className="delivery-progress">
                  <div className="progress-bar"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Live Order Stats */}
          <div className="live-stats-card">
            <div className="stats-header">
              <div className="live-indicator">
                <span className="live-dot"></span>
                LIVE ORDERS
              </div>
              <div className="stats-refresh">🔄</div>
            </div>
            <div className="stats-content">
              <div className="stat-item">
                <div className="stat-value">156</div>
                <div className="stat-label">Today's Orders</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">42</div>
                <div className="stat-label">In Delivery</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">2h</div>
                <div className="stat-label">Avg. Delivery Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Offers Marquee */}
      <div className="offers-marquee">
        <div className="marquee-container">
          <div className="marquee-label">
            <span className="flame-icon">🔥</span>
            HOT OFFERS
          </div>
          <div className="marquee-content">
            {offers.map((offer, index) => (
              <div 
                key={index} 
                className={`offer-item ${index === currentOffer ? 'active' : ''}`}
              >
                <div className="offer-badge">🎁</div>
                <div className="offer-text">{offer.text}</div>
                <div className="offer-code">Use code: <strong>{offer.code}</strong></div>
                <button className="offer-copy-btn">📋 Copy</button>
              </div>
            ))}
          </div>
          <div className="offer-indicators">
            {offers.map((_, index) => (
              <button
                key={index}
                className={`offer-dot ${index === currentOffer ? 'active' : ''}`}
                onClick={() => setCurrentOffer(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;