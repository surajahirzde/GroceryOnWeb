import React, { useEffect, useRef, useState } from 'react';
import './TermsPage.css';

const TermsPage = () => {
  const [readProgress, setReadProgress] = useState(0);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const sectionsRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      setReadProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('terms-visible');
        }
      });
    }, observerOptions);

    sectionsRef.current.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div className="terms-page-container">
      <div className="terms-read-progress-bar" style={{ width: `${readProgress}%` }}></div>

      <div className="terms-hero-section">
        <div className="terms-hero-grid-bg"></div>
        <div className="terms-hero-content">
          <div className="terms-hero-label">Legal Agreement</div>
          <h1 className="terms-hero-title">Terms & Conditions</h1>
          <p className="terms-hero-description">Please read these terms carefully before using our services. By accessing or using FreshMart Grocery, you agree to be bound by these terms.</p>
          <div className="terms-hero-info-cards">
            <div className="terms-info-card-small">
              <span className="terms-info-icon">📅</span>
              <div>
                <div className="terms-info-title">Effective Date</div>
                <div className="terms-info-value">February 7, 2026</div>
              </div>
            </div>
            <div className="terms-info-card-small">
              <span className="terms-info-icon">📄</span>
              <div>
                <div className="terms-info-title">Version</div>
                <div className="terms-info-value">2.0</div>
              </div>
            </div>
            <div className="terms-info-card-small">
              <span className="terms-info-icon">🌍</span>
              <div>
                <div className="terms-info-title">Jurisdiction</div>
                <div className="terms-info-value">India</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="terms-layout-wrapper">
        <aside className="terms-nav-sidebar">
          <div className="terms-nav-sticky">
            <h3 className="terms-nav-title">Table of Contents</h3>
            <nav className="terms-nav-links">
              <a href="#terms-definitions" className="terms-nav-link">1. Definitions</a>
              <a href="#terms-acceptance" className="terms-nav-link">2. Acceptance of Terms</a>
              <a href="#terms-account" className="terms-nav-link">3. Account Registration</a>
              <a href="#terms-orders" className="terms-nav-link">4. Orders & Pricing</a>
              <a href="#terms-payment" className="terms-nav-link">5. Payment Terms</a>
              <a href="#terms-delivery" className="terms-nav-link">6. Delivery & Returns</a>
              <a href="#terms-user-conduct" className="terms-nav-link">7. User Conduct</a>
              <a href="#terms-intellectual" className="terms-nav-link">8. Intellectual Property</a>
              <a href="#terms-liability" className="terms-nav-link">9. Limitation of Liability</a>
              <a href="#terms-termination" className="terms-nav-link">10. Termination</a>
              <a href="#terms-privacy" className="terms-nav-link">11. Privacy & Data</a>
              <a href="#terms-disputes" className="terms-nav-link">12. Dispute Resolution</a>
              <a href="#terms-changes" className="terms-nav-link">13. Changes to Terms</a>
              <a href="#terms-contact" className="terms-nav-link">14. Contact Information</a>
            </nav>
          </div>
        </aside>

        <main className="terms-main-content">
          <section id="terms-definitions" className="terms-content-section" ref={addToRefs}>
            <div className="terms-section-number">01</div>
            <h2>Definitions</h2>
            <div className="terms-definitions-grid">
              <div className="terms-definition-item">
                <h4>"Service" or "Services"</h4>
                <p>Refers to the FreshMart Grocery online platform, mobile application, and all related services provided for purchasing groceries and related products.</p>
              </div>
              <div className="terms-definition-item">
                <h4>"User", "You", or "Customer"</h4>
                <p>Any individual or entity that accesses or uses our Services, whether as a registered user or guest.</p>
              </div>
              <div className="terms-definition-item">
                <h4>"We", "Us", or "Company"</h4>
                <p>FreshMart Grocery, including all subsidiaries, affiliates, and authorized representatives.</p>
              </div>
              <div className="terms-definition-item">
                <h4>"Content"</h4>
                <p>All text, graphics, images, product descriptions, pricing, and other materials available on our platform.</p>
              </div>
              <div className="terms-definition-item">
                <h4>"Order"</h4>
                <p>A request submitted by a User to purchase products through our Services.</p>
              </div>
              <div className="terms-definition-item">
                <h4>"Products"</h4>
                <p>All groceries, food items, household goods, and other merchandise available for purchase through our platform.</p>
              </div>
            </div>
          </section>

          <section id="terms-acceptance" className="terms-content-section" ref={addToRefs}>
            <div className="terms-section-number">02</div>
            <h2>Acceptance of Terms</h2>
            <p className="terms-section-intro">By accessing, browsing, or using our Services in any manner, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.</p>
            
            <div className="terms-acceptance-box">
              <h4>Your Agreement Includes:</h4>
              <ul className="terms-styled-list">
                <li>Compliance with all applicable laws and regulations</li>
                <li>Acceptance of our Privacy Policy and Cookie Policy</li>
                <li>Agreement to receive communications from us</li>
                <li>Understanding that terms may be updated periodically</li>
                <li>Acknowledgment that you are legally capable of entering into binding contracts</li>
              </ul>
            </div>

            <div className="terms-warning-box">
              <span className="terms-warning-icon">⚠️</span>
              <div>
                <strong>Important:</strong> If you do not agree with any part of these terms, you must immediately discontinue use of our Services. Continued use constitutes full acceptance of all terms and conditions.
              </div>
            </div>
          </section>

          <section id="terms-account" className="terms-content-section" ref={addToRefs}>
            <div className="terms-section-number">03</div>
            <h2>Account Registration & Security</h2>
            
            <div className="terms-two-column-grid">
              <div className="terms-content-block">
                <h4>Registration Requirements</h4>
                <p>To use certain features of our Services, you must create an account. You agree to:</p>
                <ul className="terms-check-list">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain and update your information</li>
                  <li>Keep your password secure and confidential</li>
                  <li>Be at least 18 years of age</li>
                  <li>Have legal capacity to enter contracts</li>
                </ul>
              </div>

              <div className="terms-content-block">
                <h4>Account Security</h4>
                <p>You are responsible for all activities under your account. You must:</p>
                <ul className="terms-check-list">
                  <li>Notify us immediately of unauthorized access</li>
                  <li>Use strong, unique passwords</li>
                  <li>Not share your account credentials</li>
                  <li>Log out after each session on shared devices</li>
                  <li>Monitor account activity regularly</li>
                </ul>
              </div>
            </div>

            <div className="terms-highlight-box">
              <h4>🔐 Account Suspension</h4>
              <p>We reserve the right to suspend or terminate accounts that violate these terms, engage in fraudulent activity, or pose security risks to our platform or other users.</p>
            </div>
          </section>

          <section id="terms-orders" className="terms-content-section" ref={addToRefs}>
            <div className="terms-section-number">04</div>
            <h2>Orders & Pricing</h2>

            <div className="terms-order-process">
              <div className="terms-process-step">
                <div className="terms-step-icon">🛒</div>
                <div className="terms-step-content">
                  <h4>Order Placement</h4>
                  <p>Orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order for any reason.</p>
                </div>
              </div>

              <div className="terms-process-step">
                <div className="terms-step-icon">💰</div>
                <div className="terms-step-content">
                  <h4>Pricing</h4>
                  <p>All prices are listed in Indian Rupees (INR) and include applicable taxes unless stated otherwise.</p>
                </div>
              </div>

              <div className="terms-process-step">
                <div className="terms-step-icon">✅</div>
                <div className="terms-step-content">
                  <h4>Order Confirmation</h4>
                  <p>You will receive an email confirmation once your order is accepted.</p>
                </div>
              </div>

              <div className="terms-process-step">
                <div className="terms-step-icon">📦</div>
                <div className="terms-step-content">
                  <h4>Order Modifications</h4>
                  <p>Once an order is confirmed, modifications may not be possible. Contact customer support immediately.</p>
                </div>
              </div>
            </div>
          </section>

          <section id="terms-payment" className="terms-content-section" ref={addToRefs}>
            <div className="terms-section-number">05</div>
            <h2>Payment Terms</h2>

            <div className="terms-payment-methods-showcase">
              <h4>Accepted Payment Methods</h4>
              <div className="terms-payment-icons">
                <div className="terms-payment-method">
                  <span className="terms-method-emoji">💳</span>
                  <span>Credit/Debit Cards</span>
                </div>
                <div className="terms-payment-method">
                  <span className="terms-method-emoji">🏦</span>
                  <span>Net Banking</span>
                </div>
                <div className="terms-payment-method">
                  <span className="terms-method-emoji">📱</span>
                  <span>UPI</span>
                </div>
                <div className="terms-payment-method">
                  <span className="terms-method-emoji">👛</span>
                  <span>Digital Wallets</span>
                </div>
                <div className="terms-payment-method">
                  <span className="terms-method-emoji">💵</span>
                  <span>Cash on Delivery</span>
                </div>
              </div>
            </div>
          </section>

          <section id="terms-user-conduct" className="terms-content-section" ref={addToRefs}>
            <div className="terms-section-number">07</div>
            <h2>User Conduct & Prohibited Activities</h2>
            
            <p className="terms-section-intro">You agree to use our Services only for lawful purposes. The following activities are strictly prohibited:</p>

            <div className="terms-prohibited-list">
              <div className="terms-prohibited-item">
                <span className="terms-prohibited-icon">🚫</span>
                <div>
                  <h4>Fraudulent Activity</h4>
                  <p>Using false information, stolen payment methods, or engaging in any form of fraud or deception.</p>
                </div>
              </div>

              <div className="terms-prohibited-item">
                <span className="terms-prohibited-icon">🚫</span>
                <div>
                  <h4>Abuse of Services</h4>
                  <p>Exploiting offers, creating multiple accounts, or manipulating our systems.</p>
                </div>
              </div>

              <div className="terms-prohibited-item">
                <span className="terms-prohibited-icon">🚫</span>
                <div>
                  <h4>Harassment</h4>
                  <p>Harassing, threatening, or abusing our staff, delivery partners, or other users.</p>
                </div>
              </div>
            </div>
          </section>

          <section id="terms-contact" className="terms-content-section" ref={addToRefs}>
            <div className="terms-section-number">14</div>
            <h2>Contact Information</h2>

            <div className="terms-contact-intro">
              <p>If you have questions about these Terms and Conditions, please contact us:</p>
            </div>

            <div className="terms-contact-methods">
              <div className="terms-contact-method-card">
                <div className="terms-contact-icon-large">📧</div>
                <h4>Email Support</h4>
                <p className="terms-contact-detail">legal@freshmart.com</p>
                <p className="terms-contact-note">Response within 24-48 hours</p>
              </div>

              <div className="terms-contact-method-card">
                <div className="terms-contact-icon-large">📞</div>
                <h4>Phone Support</h4>
                <p className="terms-contact-detail">+1 (234) 567-890</p>
                <p className="terms-contact-note">Mon-Fri: 9 AM - 6 PM</p>
              </div>

              <div className="terms-contact-method-card">
                <div className="terms-contact-icon-large">📍</div>
                <h4>Mailing Address</h4>
                <p className="terms-contact-detail">FreshMart Grocery Legal Dept.<br/>123 Grocery Street<br/>Food City, FC 12345</p>
                <p className="terms-contact-note">For formal notices</p>
              </div>

              <div className="terms-contact-method-card">
                <div className="terms-contact-icon-large">💬</div>
                <h4>Live Chat</h4>
                <p className="terms-contact-detail">Available on our website</p>
                <p className="terms-contact-note">Instant support 24/7</p>
              </div>
            </div>
          </section>

          <div className="terms-footer-section">
            <div className="terms-acceptance-section">
              <label className="terms-checkbox-container">
                <input 
                  type="checkbox" 
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                />
                <span className="terms-checkbox-label">
                  I have read and agree to the Terms and Conditions
                </span>
                <span className="terms-checkmark"></span>
              </label>
              
              <div className="terms-footer-actions">
                <button className="terms-action-btn terms-secondary-btn">Download PDF</button>
                <button className="terms-action-btn terms-primary-btn" disabled={!acceptedTerms}>
                  Accept Terms
                </button>
              </div>
            </div>

            <div className="terms-footer-info">
              <p>© 2026 FreshMart Grocery. All rights reserved.</p>
              <p className="terms-footer-last-updated">Last updated: February 7, 2026 | Version 2.0</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TermsPage;