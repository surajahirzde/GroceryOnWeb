import React, { memo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Truck, Shield, Leaf, Users, Package, Clock, Award, Star,
  Heart, Target, CheckCircle, MapPin, Phone, Mail, ChevronRight,
  Sparkles, Gem, ThumbsUp, Zap, TrendingUp
} from 'lucide-react';
import './AboutPage.css';

// Memoized components for better performance
const StatCard = memo(({ icon, value, label }) => (
  <div className="stat-card">
    <div className="stat-icon-wrapper">{icon}</div>
    <div className="stat-content">
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  </div>
));

const FeatureCard = memo(({ icon, title, description, color }) => (
  <div className="feature-card" style={{ '--card-color': color }}>
    <div className="feature-icon-wrapper">{icon}</div>
    <div className="feature-content">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
    <div className="feature-badge">
      <CheckCircle size={20} />
    </div>
  </div>
));

const ValueCard = memo(({ icon, title, description, index }) => (
  <div className="value-card">
    <div className="value-icon">{icon}</div>
    <div className="value-content">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
    <div className="value-number">0{index + 1}</div>
  </div>
));

const TeamCard = memo(({ member }) => (
  <div className="team-card">
    <div className="team-image-wrapper">
      <img 
        src={member.image} 
        alt={member.name} 
        className="team-image"
        loading="lazy"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `https://ui-avatars.com/api/?name=${member.name}&background=10b981&color=fff&size=400`;
        }}
      />
      <div className="experience-badge">
        <ThumbsUp size={16} />
        <span>{member.experience}</span>
      </div>
    </div>
    <div className="team-info">
      <h3>{member.name}</h3>
      <p className="team-role">{member.role}</p>
      <div className="team-contact">
        <Mail size={16} />
        <span>{member.name.split(' ')[0].toLowerCase()}@freshcart.com</span>
      </div>
    </div>
  </div>
));

const AboutPage = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  // Preload images on component mount
  useEffect(() => {
    const preloadImages = async () => {
      const imageUrls = [
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
        'https://images.pexels.com/photos/4065181/pexels-photo-4065181.jpeg'
      ];

      const promises = imageUrls.map(url => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = url;
          img.onload = resolve;
          img.onerror = resolve;
        });
      });

      await Promise.all(promises);
      setIsLoaded(true);
    };

    preloadImages();
  }, []);

  const stats = [
    { icon: <Truck />, value: '50K+', label: 'Orders Delivered' },
    { icon: <Users />, value: '25K+', label: 'Happy Families' },
    { icon: <Clock />, value: '98.7%', label: 'On-Time Delivery' },
    { icon: <Leaf />, value: '100%', label: 'Fresh Guarantee' }
  ];

  const features = [
    {
      icon: <Shield />,
      title: 'Quality Assured',
      description: 'Every product undergoes rigorous 3-step quality checks before reaching you',
      color: '#10b981'
    },
    {
      icon: <Package />,
      title: 'Smart Packaging',
      description: 'Temperature-controlled delivery system maintains optimal freshness',
      color: '#3b82f6'
    },
    {
      icon: <Star />,
      title: 'Premium Selection',
      description: 'Curated from certified farms and trusted suppliers nationwide',
      color: '#f59e0b'
    },
    {
      icon: <Heart />,
      title: 'Customer First',
      description: '24/7 dedicated support with instant resolution guarantee',
      color: '#ef4444'
    }
  ];

  const values = [
    {
      icon: <Sparkles />,
      title: 'Freshness First',
      description: 'We deliver farm-fresh produce within hours of harvest with our direct-from-farm network ensuring maximum nutritional value.'
    },
    {
      icon: <Gem />,
      title: 'Trust & Transparency',
      description: 'Complete visibility from farm to your doorstep with real-time tracking and full traceability of every product.'
    },
    {
      icon: <Zap />,
      title: 'Sustainable Choices',
      description: 'Eco-friendly packaging and active support for local farming communities, reducing our carbon footprint daily.'
    }
  ];

  const team = [
    {
      name: 'Priya Sharma',
      role: 'Quality Control Director',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
      experience: '8+ Years'
    },
    {
      name: 'Raj Patel',
      role: 'Operations Director',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      experience: '10+ Years'
    },
    {
      name: 'Anjali Mehta',
      role: 'Customer Experience Head',
      image: 'https://images.pexels.com/photos/4065181/pexels-photo-4065181.jpeg',
      experience: '6+ Years'
    }
  ];

  const milestones = [
    { year: '2020', event: 'Founded in Delhi with a vision to revolutionize grocery shopping' },
    { year: '2021', event: 'Expanded operations to Mumbai & Bangalore with 10,000+ customers' },
    { year: '2022', event: 'Launched mobile app and crossed 50,000 active users milestone' },
    { year: '2023', event: 'Presence in 15 major cities with international supplier partnerships' },
    { year: '2024', event: 'Recognized with multiple awards for service excellence and innovation' }
  ];

  const certifications = [
    { name: 'ISO 9001:2015', description: 'Quality Management System' },
    { name: 'FSSAI Certified', description: 'Food Safety & Standards' },
    { name: 'Green Certified', description: 'Sustainable Operations' }
  ];

  // Loading state
  if (!isLoaded) {
    return (
      <div className="about-page">
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Loading Fresh Content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="about-page" style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.3s ease' }}>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <Award className="badge-icon" />
              <span>Award Winning Service • 2024</span>
            </div>
            
            <h1 className="hero-title">
              More Than Just
              <span className="hero-highlight"> Groceries</span>
            </h1>
            
            <p className="hero-subtitle">
              We're your partners in quality living, delivering farm-fresh produce 
              and premium groceries with care, speed, and unmatched reliability.
            </p>
            
            <div className="hero-actions">
              <button 
                className="btn btn-primary" 
                onClick={() => navigate('/products')}
              >
                Start Shopping
                <ChevronRight size={20} />
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => navigate('/contact')}
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Mission & Vision</h2>
            <p className="section-subtitle">
              Redefining grocery shopping through innovation, quality, and care
            </p>
          </div>
          
          <div className="mission-grid">
            <div className="mission-card">
              <div className="mission-icon">
                <Target />
              </div>
              <h3>Our Mission</h3>
              <p>
                To make premium quality groceries accessible to every household 
                while supporting sustainable farming and reducing food waste 
                through smart technology and efficient logistics.
              </p>
            </div>
            
            <div className="mission-card mission-card-vision">
              <div className="mission-icon">
                <TrendingUp />
              </div>
              <h3>Our Vision</h3>
              <p>
                To become India's most trusted grocery partner, recognized for 
                exceptional quality, innovative delivery solutions, and positive 
                impact on communities and the environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="timeline-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Journey</h2>
            <p className="section-subtitle">
              From humble beginnings to serving thousands of families across India
            </p>
          </div>
          
          <div className="timeline">
            {milestones.map((item, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-marker">
                  <div className="timeline-dot"></div>
                </div>
                <div className="timeline-content">
                  <div className="timeline-year">{item.year}</div>
                  <div className="timeline-event">{item.event}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="values-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-subtitle">
              The principles that guide every decision we make
            </p>
          </div>
          
          <div className="values-grid">
            {values.map((value, index) => (
              <ValueCard key={index} {...value} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose FreshCart?</h2>
            <p className="section-subtitle">
              Experience the difference with our premium services
            </p>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Meet Our Leadership</h2>
            <p className="section-subtitle">
              Passionate experts dedicated to delivering excellence
            </p>
          </div>
          
          <div className="team-grid">
            {team.map((member, index) => (
              <TeamCard key={index} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="certifications-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Certifications & Accolades</h2>
            <p className="section-subtitle">
              Recognized for excellence in quality and service
            </p>
          </div>
          
          <div className="certifications-grid">
            {certifications.map((cert, index) => (
              <div key={index} className="cert-card">
                <div className="cert-icon">✓</div>
                <h3>{cert.name}</h3>
                <p>{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="contact-info-section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-item">
              <div className="contact-icon-wrapper">
                <MapPin className="contact-icon" />
              </div>
              <div className="contact-details">
                <h4>Head Office</h4>
                <p>FreshCart House, Sector 44<br />Gurugram, Haryana 122003</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon-wrapper">
                <Phone className="contact-icon" />
              </div>
              <div className="contact-details">
                <h4>24/7 Support</h4>
                <p>1800-FRESH-CART<br />support@freshcart.com</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon-wrapper">
                <Mail className="contact-icon" />
              </div>
              <div className="contact-details">
                <h4>Business Inquiries</h4>
                <p>partners@freshcart.com<br />vendor@freshcart.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;