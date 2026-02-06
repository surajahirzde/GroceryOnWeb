import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const navigate = useNavigate();
  const [currentOffer, setCurrentOffer] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const features = [
    { 
      icon: '🚚', 
      title: 'Free Delivery', 
      desc: 'On orders above ₹499',
      color: '#10b981'
    },
    { 
      icon: '⏰', 
      title: '2-Hour Delivery', 
      desc: 'Guaranteed fast delivery',
      color: '#3b82f6'
    },
    { 
      icon: '💯', 
      title: '100% Fresh', 
      desc: 'Quality guaranteed',
      color: '#8b5cf6'
    },
    { 
      icon: '🔄', 
      title: 'Easy Returns', 
      desc: '24-hour return policy',
      color: '#ef4444'
    }
  ];

  const offers = [
    { text: 'Get 20% OFF on first order', code: 'WELCOME20', emoji: '🎁' },
    { text: 'Extra 10% OFF with UPI payment', code: 'UPI10', emoji: '💳' },
    { text: 'Free vegetables on order above ₹999', code: 'VEGGIE100', emoji: '🥬' },
    { text: 'Buy 1 Get 1 Free on Milk Products', code: 'MILKBOGO', emoji: '🥛' }
  ];

  // Auto rotate offers
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % offers.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [offers.length]);

  // Entrance animation
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleShopNow = () => {
    navigate('/products');
  };

  return (
    <section className={`hero-section ${isVisible ? 'hero-visible' : ''}`}>
      {/* Animated Background Elements */}
      <div className="hero-background">
        <div className="hero-gradient-orb hero-orb-1"></div>
        <div className="hero-gradient-orb hero-orb-2"></div>
        <div className="hero-gradient-orb hero-orb-3"></div>
      </div>

      {/* Floating Vegetables */}
      <div className="hero-floating-elements">
        <div className="hero-float-item hero-float-1">🥦</div>
        <div className="hero-float-item hero-float-2">🍎</div>
        <div className="hero-float-item hero-float-3">🥕</div>
        <div className="hero-float-item hero-float-4">🥑</div>
        <div className="hero-float-item hero-float-5">🍇</div>
        <div className="hero-float-item hero-float-6">🍋</div>
        <div className="hero-float-item hero-float-7">🍅</div>
        <div className="hero-float-item hero-float-8">🥬</div>
      </div>

      <div className="hero-container">
        {/* Left Content */}
        <div className="hero-content">
          {/* Badge */}
          <div className="hero-badge">
            <div className="hero-badge-glow"></div>
            <span className="hero-badge-icon">🔥</span>
            <span className="hero-badge-text">Fresh Groceries Delivered Fast</span>
          </div>

          {/* Main Heading */}
          <h1 className="hero-title">
            <span className="hero-title-line">Your Fresh</span>
            <span className="hero-title-highlight">
              Grocery Store
            </span>
            <span className="hero-title-line">Delivered in 
              <span className="hero-time-badge"> Minutes</span>
            </span>
          </h1>

          <p className="hero-subtitle">
            Get farm-fresh vegetables, organic fruits, premium dairy products 
            and more delivered right to your doorstep. Quality guaranteed with 
            our 100% freshness promise!
          </p>

          {/* CTA Buttons */}
          <div className="hero-cta-group">
            <button 
              className="hero-btn hero-btn-primary"
              onClick={handleShopNow}
            >
              <span className="hero-btn-icon">🛒</span>
              <span className="hero-btn-text">Start Shopping</span>
              <span className="hero-btn-arrow">→</span>
            </button>
            
            <button 
              className="hero-btn hero-btn-secondary"
              onClick={() => navigate('/products')}
            >
              <span className="hero-btn-icon">📱</span>
              <span className="hero-btn-text">Browse Products</span>
            </button>
          </div>

          {/* Trust Badges */}
          <div className="hero-trust-badges">
            <div className="hero-trust-item">
              <span className="hero-trust-icon">✅</span>
              <span className="hero-trust-text">10,000+ Happy Customers</span>
            </div>
            <div className="hero-trust-divider"></div>
            <div className="hero-trust-item">
              <span className="hero-trust-icon">⭐</span>
              <span className="hero-trust-text">4.8/5 Rating</span>
            </div>
            <div className="hero-trust-divider"></div>
            <div className="hero-trust-item">
              <span className="hero-trust-icon">🏆</span>
              <span className="hero-trust-text">Award Winning</span>
            </div>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="hero-image-section">
          {/* Main Product Showcase */}
          <div className="hero-product-showcase">
            <div className="hero-showcase-card hero-card-main">
              <img 
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80" 
                alt="Fresh Groceries"
                className="hero-showcase-img"
              />
              <div className="hero-showcase-overlay"></div>
            </div>

            {/* Floating Product Cards */}
            <div className="hero-floating-card hero-card-1">
              <img 
                src="https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&fit=crop&q=80" 
                alt="Fresh Apples"
                className="hero-card-img"
              />
              <div className="hero-card-info">
                <span className="hero-card-name">Fresh Apples</span>
                <span className="hero-card-price">₹299/kg</span>
              </div>
            </div>

            <div className="hero-floating-card hero-card-2">
              <img 
                src="https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=400&fit=crop&q=80" 
                alt="Broccoli"
                className="hero-card-img"
              />
              <div className="hero-card-info">
                <span className="hero-card-name">Broccoli</span>
                <span className="hero-card-price">₹89/pc</span>
              </div>
            </div>

            <div className="hero-floating-card hero-card-3">
              <img 
                src="https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=400&fit=crop&q=80" 
                alt="Fresh Milk"
                className="hero-card-img"
              />
              <div className="hero-card-info">
                <span className="hero-card-name">Fresh Milk</span>
                <span className="hero-card-price">₹60/L</span>
              </div>
            </div>

            <div className="hero-floating-card hero-card-4">
              <img 
                src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&fit=crop&q=80" 
                alt="Bread"
                className="hero-card-img"
              />
              <div className="hero-card-info">
                <span className="hero-card-name">Fresh Bread</span>
                <span className="hero-card-price">₹35/pc</span>
              </div>
            </div>

            {/* Delivery Status Card */}
            <div className="hero-delivery-card">
              <div className="hero-delivery-icon-wrapper">
                <span className="hero-delivery-icon">🚚</span>
                <div className="hero-delivery-pulse"></div>
              </div>
              <div className="hero-delivery-info">
                <div className="hero-delivery-title">Fast Delivery</div>
                <div className="hero-delivery-time">Within Minutes</div>
              </div>
              <div className="hero-delivery-progress">
                <div className="hero-progress-bar"></div>
              </div>
            </div>
          </div>

          {/* Live Stats Card */}
          <div className="hero-stats-card">
            <div className="hero-stats-header">
              <div className="hero-stats-live">
                <span className="hero-live-dot"></span>
                <span className="hero-live-text">LIVE ORDERS</span>
              </div>
              <button className="hero-stats-refresh">
                <span className="hero-refresh-icon">🔄</span>
              </button>
            </div>
            <div className="hero-stats-grid">
              <div className="hero-stat-item">
                <div className="hero-stat-value">156</div>
                <div className="hero-stat-label">Today's Orders</div>
              </div>
              <div className="hero-stat-item">
                <div className="hero-stat-value">42</div>
                <div className="hero-stat-label">In Delivery</div>
              </div>
              <div className="hero-stat-item">
                <div className="hero-stat-value">2h</div>
                <div className="hero-stat-label">Avg. Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="hero-features-section">
        <div className="hero-features-grid">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="hero-feature-card"
              style={{ 
                '--feature-color': feature.color,
                '--feature-delay': `${index * 0.1}s`
              }}
            >
              <div className="hero-feature-icon-wrapper">
                <span className="hero-feature-icon">{feature.icon}</span>
                <div className="hero-feature-glow"></div>
              </div>
              <div className="hero-feature-content">
                <h4 className="hero-feature-title">{feature.title}</h4>
                <p className="hero-feature-desc">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Offers Marquee */}
      <div className="hero-offers-section">
        <div className="hero-offers-marquee">
          <div className="hero-offers-label">
            <span className="hero-offers-flame">🔥</span>
            <span className="hero-offers-title">HOT OFFERS</span>
          </div>
          
          <div className="hero-offers-slider">
            <div className="hero-offers-track">
              {offers.map((offer, index) => (
                <div 
                  key={index} 
                  className={`hero-offer-item ${index === currentOffer ? 'hero-offer-active' : ''}`}
                >
                  <span className="hero-offer-emoji">{offer.emoji}</span>
                  <span className="hero-offer-text">{offer.text}</span>
                  <span className="hero-offer-code">
                    <span className="hero-code-label">Code:</span>
                    <span className="hero-code-value">{offer.code}</span>
                  </span>
                  <button className="hero-offer-copy">
                    <span className="hero-copy-icon">📋</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-offers-dots">
            {offers.map((_, index) => (
              <button
                key={index}
                className={`hero-offer-dot ${index === currentOffer ? 'hero-dot-active' : ''}`}
                onClick={() => setCurrentOffer(index)}
                aria-label={`Go to offer ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;