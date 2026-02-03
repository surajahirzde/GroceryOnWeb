import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Truck, 
  Shield, 
  Leaf, 
  Users, 
  Package,
  Clock,
  Award,
  Star,
  Heart,
  Target,
  CheckCircle,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  Sparkles,
  Gem,
  ThumbsUp,
  Truck as DeliveryTruck
} from 'lucide-react';
import './AboutPage.css';

const AboutPage = () => {
  const navigate = useNavigate();

  const stats = [
    { icon: <Truck />, value: '50K+', label: 'Orders Delivered', suffix: '' },
    { icon: <Users />, value: '25K+', label: 'Happy Families', suffix: '' },
    { icon: <Clock />, value: '98.7%', label: 'On-Time Delivery', suffix: '' },
    { icon: <Leaf />, value: '100%', label: 'Fresh Guarantee', suffix: '' }
  ];

  const features = [
    {
      icon: <Shield />,
      title: 'Quality Assured',
      description: 'Every product undergoes rigorous 3-step quality checks',
      color: '#10b981'
    },
    {
      icon: <Package />,
      title: 'Smart Packaging',
      description: 'Temperature-controlled delivery system for optimal freshness',
      color: '#3b82f6'
    },
    {
      icon: <Star />,
      title: 'Premium Selection',
      description: 'Curated from certified farms and trusted suppliers',
      color: '#f59e0b'
    },
    {
      icon: <Heart />,
      title: 'Customer First',
      description: '24/7 support with instant resolution guarantee',
      color: '#ef4444'
    }
  ];

  const values = [
    {
      icon: <Sparkles />,
      title: 'Freshness First',
      description: 'We deliver farm-fresh produce within hours of harvest with our direct-from-farm network.'
    },
    {
      icon: <Gem />,
      title: 'Trust & Transparency',
      description: 'Complete visibility from farm to your doorstep with real-time tracking.'
    },
    {
      icon: <Target />,
      title: 'Sustainable Choices',
      description: 'Eco-friendly packaging and support for local farming communities.'
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
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      experience: '6+ Years'
    }
  ];

  const milestones = [
    { year: '2020', event: 'Founded in Delhi with 3 employees' },
    { year: '2021', event: 'Expanded to Mumbai & Bangalore' },
    { year: '2022', event: 'Mobile App Launch & 50K+ Users' },
    { year: '2023', event: '15 Cities & International Suppliers' },
    { year: '2024', event: 'Award Winning Service & Innovation' }
  ];

  const certifications = [
    { name: 'ISO 9001:2015', description: 'Quality Management' },
    { name: 'FSSAI Certified', description: 'Food Safety Standards' },
    { name: 'Green Certified', description: 'Sustainable Operations' }
  ];

  const handleShopNow = () => {
    navigate('/products');
  };

  const handleContact = () => {
    navigate('/contact');
  };

  return (
    <div className="about-page">
      {/* Hero Banner */}
      <section className="hero-banner">
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
                onClick={handleShopNow}
              >
                Start Shopping
                <ChevronRight size={20} />
              </button>
              <button 
                className="btn btn-secondary"
                onClick={handleContact}
              >
                Contact Us
              </button>
            </div>
          </div>
          
          <div className="hero-stats">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon-wrapper">
                  {stat.icon}
                </div>
                <div className="stat-content">
                  <div className="stat-value">
                    {stat.value}
                    <span className="stat-suffix">{stat.suffix}</span>
                  </div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="section-header center">
            <h2 className="section-title">Our Mission & Vision</h2>
            <p className="section-subtitle">
              Redefining grocery shopping through innovation and care
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
                through smart technology.
              </p>
            </div>
            
            <div className="mission-card vision">
              <div className="mission-icon">
                <Sparkles />
              </div>
              <h3>Our Vision</h3>
              <p>
                To become India's most trusted grocery partner, recognized for 
                exceptional quality, innovative delivery solutions, and positive 
                community impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Timeline */}
      <section className="timeline-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Journey</h2>
            <p className="section-subtitle">
              From humble beginnings to serving thousands of families
            </p>
          </div>
          
          <div className="timeline">
            {milestones.map((item, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <div className="timeline-year">{item.year}</div>
                  <div className="timeline-event">{item.event}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <div className="section-header center">
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-subtitle">
              The principles that guide every decision we make
            </p>
          </div>
          
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">
                  {value.icon}
                </div>
                <div className="value-content">
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </div>
                <div className="value-number">0{index + 1}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose FreshCart</h2>
            <p className="section-subtitle">
              Experience the difference in every delivery
            </p>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card" style={{ '--card-color': feature.color }}>
                <div className="feature-icon-wrapper">
                  {feature.icon}
                </div>
                <div className="feature-content">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
                <div className="feature-badge">
                  <CheckCircle size={20} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <div className="section-header center">
            <h2 className="section-title">Meet Our Leadership</h2>
            <p className="section-subtitle">
              Passionate professionals dedicated to your satisfaction
            </p>
          </div>
          
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-image">
                  <img src={member.image} alt={member.name} />
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
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="certifications-section">
        <div className="container">
          <div className="section-header center">
            <h2 className="section-title">Our Certifications</h2>
            <p className="section-subtitle">
              Recognized for excellence and commitment to quality
            </p>
          </div>
          
          <div className="certifications-grid">
            {certifications.map((cert, index) => (
              <div key={index} className="cert-card">
                <div className="cert-icon">
                  <CheckCircle size={32} />
                </div>
                <div className="cert-content">
                  <h3>{cert.name}</h3>
                  <p>{cert.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <div className="cta-content">
              <div className="cta-icon">
                <DeliveryTruck size={48} />
              </div>
              <h2>Ready to Experience Freshness?</h2>
              <p>
                Join our community of 25,000+ happy families enjoying premium groceries 
                delivered right to their doorstep.
              </p>
            </div>
            
            <div className="cta-actions">
              <button 
                className="btn btn-primary" 
                onClick={handleShopNow}
              >
                Start Shopping Now
              </button>
              <button className="btn btn-outline">
                <Phone size={20} />
                Call: 1800-FRESH-CART
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="contact-info">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-item">
              <MapPin className="contact-icon" />
              <div>
                <h4>Head Office</h4>
                <p>FreshCart House, Sector 44, Gurugram, Haryana 122003</p>
              </div>
            </div>
            
            <div className="contact-item">
              <Phone className="contact-icon" />
              <div>
                <h4>24/7 Support</h4>
                <p>1800-FRESH-CART • support@freshcart.com</p>
              </div>
            </div>
            
            <div className="contact-item">
              <Mail className="contact-icon" />
              <div>
                <h4>Business Inquiries</h4>
                <p>partners@freshcart.com • vendor@freshcart.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;