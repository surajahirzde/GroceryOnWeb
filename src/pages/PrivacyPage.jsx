import React, { useEffect, useRef } from 'react';
import './PrivacyPage.css';

const PrivacyPage = () => {
  const headerRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('privacy-visible');
        }
      });
    }, observerOptions);

    sectionsRef.current.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div className="privacy-page-container">
      <div className="privacy-hero-section">
        <div className="privacy-hero-decoration"></div>
        <div className="privacy-hero-content" ref={headerRef}>
          <span className="privacy-hero-badge">Legal Document</span>
          <h1 className="privacy-hero-title">Privacy Policy</h1>
          <p className="privacy-hero-subtitle">Your privacy matters to us. Learn how we protect and handle your personal information.</p>
          <div className="privacy-hero-meta">
            <span className="privacy-meta-item">📅 Last Updated: February 7, 2026</span>
            <span className="privacy-meta-item">⏱️ 8 min read</span>
          </div>
        </div>
        <div className="privacy-floating-shapes">
          <div className="privacy-shape privacy-shape-1"></div>
          <div className="privacy-shape privacy-shape-2"></div>
          <div className="privacy-shape privacy-shape-3"></div>
        </div>
      </div>

      <div className="privacy-content-wrapper">
        <aside className="privacy-table-of-contents">
          <h3>Quick Navigation</h3>
          <nav>
            <a href="#privacy-introduction">Introduction</a>
            <a href="#privacy-information-collection">Information We Collect</a>
            <a href="#privacy-how-we-use">How We Use Your Data</a>
            <a href="#privacy-data-sharing">Data Sharing</a>
            <a href="#privacy-cookies">Cookies & Tracking</a>
            <a href="#privacy-security">Data Security</a>
            <a href="#privacy-your-rights">Your Rights</a>
            <a href="#privacy-contact">Contact Us</a>
          </nav>
        </aside>

        <main className="privacy-policy-main">
          <section id="privacy-introduction" className="privacy-policy-section" ref={addToRefs}>
            <div className="privacy-section-icon">🛡️</div>
            <h2>Introduction</h2>
            <p>Welcome to our Privacy Policy. At FreshMart Grocery, we are committed to protecting your personal information and your right to privacy. This policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase from us.</p>
            <p>By using our services, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our services.</p>
          </section>

          <section id="privacy-information-collection" className="privacy-policy-section" ref={addToRefs}>
            <div className="privacy-section-icon">📋</div>
            <h2>Information We Collect</h2>
            <p>We collect several types of information to provide and improve our services:</p>
            
            <div className="privacy-info-grid">
              <div className="privacy-info-card">
                <h4>Personal Information</h4>
                <ul>
                  <li>Full name and contact details</li>
                  <li>Email address and phone number</li>
                  <li>Delivery address information</li>
                  <li>Payment and billing information</li>
                </ul>
              </div>

              <div className="privacy-info-card">
                <h4>Account Information</h4>
                <ul>
                  <li>Username and password</li>
                  <li>Purchase history and preferences</li>
                  <li>Saved delivery addresses</li>
                  <li>Wishlist and favorite items</li>
                </ul>
              </div>

              <div className="privacy-info-card">
                <h4>Technical Data</h4>
                <ul>
                  <li>IP address and browser type</li>
                  <li>Device information and OS</li>
                  <li>Cookies and usage data</li>
                  <li>Website interaction patterns</li>
                </ul>
              </div>

              <div className="privacy-info-card">
                <h4>Location Data</h4>
                <ul>
                  <li>GPS location (with permission)</li>
                  <li>Delivery zone information</li>
                  <li>Store proximity data</li>
                  <li>Service area verification</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="privacy-how-we-use" className="privacy-policy-section" ref={addToRefs}>
            <div className="privacy-section-icon">⚙️</div>
            <h2>How We Use Your Information</h2>
            <p>We use the collected information for various purposes:</p>
            
            <div className="privacy-usage-list">
              <div className="privacy-usage-item">
                <span className="privacy-usage-number">01</span>
                <div>
                  <h4>Order Processing & Delivery</h4>
                  <p>To process your orders, manage deliveries, and provide customer support.</p>
                </div>
              </div>

              <div className="privacy-usage-item">
                <span className="privacy-usage-number">02</span>
                <div>
                  <h4>Account Management</h4>
                  <p>To create and manage your account, including authentication and security.</p>
                </div>
              </div>

              <div className="privacy-usage-item">
                <span className="privacy-usage-number">03</span>
                <div>
                  <h4>Personalization</h4>
                  <p>To provide personalized recommendations and improve your shopping experience.</p>
                </div>
              </div>

              <div className="privacy-usage-item">
                <span className="privacy-usage-number">04</span>
                <div>
                  <h4>Communication</h4>
                  <p>To send order updates, promotional offers, and important service announcements.</p>
                </div>
              </div>

              <div className="privacy-usage-item">
                <span className="privacy-usage-number">05</span>
                <div>
                  <h4>Analytics & Improvement</h4>
                  <p>To analyze usage patterns and improve our website, products, and services.</p>
                </div>
              </div>
            </div>
          </section>

          <section id="privacy-data-sharing" className="privacy-policy-section" ref={addToRefs}>
            <div className="privacy-section-icon">🔗</div>
            <h2>Data Sharing & Disclosure</h2>
            <p>We may share your information with third parties only in the following circumstances:</p>
            
            <div className="privacy-sharing-box">
              <h4>✅ When We Share Your Data:</h4>
              <ul>
                <li><strong>Service Providers:</strong> Payment processors, delivery partners, and cloud hosting services</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our legal rights</li>
                <li><strong>Business Transfers:</strong> In case of merger, acquisition, or asset sale</li>
                <li><strong>With Your Consent:</strong> When you explicitly authorize us to share your information</li>
              </ul>
            </div>

            <div className="privacy-sharing-box privacy-highlight-box">
              <h4>❌ We Never Share:</h4>
              <ul>
                <li>Your payment information with third parties for marketing purposes</li>
                <li>Personal data with advertisers without anonymization</li>
                <li>Your email or phone number with other users</li>
                <li>Sensitive information without proper security measures</li>
              </ul>
            </div>
          </section>

          <section id="privacy-cookies" className="privacy-policy-section" ref={addToRefs}>
            <div className="privacy-section-icon">🍪</div>
            <h2>Cookies & Tracking Technologies</h2>
            <p>We use cookies and similar tracking technologies to enhance your browsing experience:</p>
            
            <div className="privacy-cookie-types">
              <div className="privacy-cookie-type">
                <h4>Essential Cookies</h4>
                <p>Required for website functionality, including shopping cart and checkout processes.</p>
                <span className="privacy-cookie-badge privacy-cookie-necessary">Necessary</span>
              </div>

              <div className="privacy-cookie-type">
                <h4>Performance Cookies</h4>
                <p>Help us understand how visitors interact with our website by collecting anonymous data.</p>
                <span className="privacy-cookie-badge privacy-cookie-optional">Optional</span>
              </div>

              <div className="privacy-cookie-type">
                <h4>Functional Cookies</h4>
                <p>Remember your preferences and provide enhanced, personalized features.</p>
                <span className="privacy-cookie-badge privacy-cookie-optional">Optional</span>
              </div>

              <div className="privacy-cookie-type">
                <h4>Marketing Cookies</h4>
                <p>Track your activity to deliver relevant advertisements and measure campaign effectiveness.</p>
                <span className="privacy-cookie-badge privacy-cookie-optional">Optional</span>
              </div>
            </div>

            <p className="privacy-cookie-note">You can manage cookie preferences through your browser settings or our cookie consent tool.</p>
          </section>

          <section id="privacy-security" className="privacy-policy-section" ref={addToRefs}>
            <div className="privacy-section-icon">🔒</div>
            <h2>Data Security Measures</h2>
            <p>We implement industry-standard security measures to protect your personal information:</p>
            
            <div className="privacy-security-grid">
              <div className="privacy-security-item">
                <div className="privacy-security-icon">🔐</div>
                <h4>Encryption</h4>
                <p>SSL/TLS encryption for all data transmission</p>
              </div>

              <div className="privacy-security-item">
                <div className="privacy-security-icon">🛡️</div>
                <h4>Secure Storage</h4>
                <p>Encrypted databases with access controls</p>
              </div>

              <div className="privacy-security-item">
                <div className="privacy-security-icon">👁️</div>
                <h4>Monitoring</h4>
                <p>24/7 security monitoring and threat detection</p>
              </div>

              <div className="privacy-security-item">
                <div className="privacy-security-icon">✅</div>
                <h4>Compliance</h4>
                <p>PCI-DSS and GDPR compliance standards</p>
              </div>
            </div>

            <div className="privacy-warning-box">
              <strong>⚠️ Important:</strong> While we strive to protect your personal information, no method of transmission over the internet is 100% secure. Please use strong passwords and keep your account credentials confidential.
            </div>
          </section>

          <section id="privacy-your-rights" className="privacy-policy-section" ref={addToRefs}>
            <div className="privacy-section-icon">⚖️</div>
            <h2>Your Privacy Rights</h2>
            <p>You have the following rights regarding your personal information:</p>
            
            <div className="privacy-rights-container">
              <div className="privacy-right-item">
                <h4>📖 Right to Access</h4>
                <p>Request a copy of the personal data we hold about you</p>
              </div>

              <div className="privacy-right-item">
                <h4>✏️ Right to Rectification</h4>
                <p>Request correction of inaccurate or incomplete information</p>
              </div>

              <div className="privacy-right-item">
                <h4>🗑️ Right to Erasure</h4>
                <p>Request deletion of your personal data under certain conditions</p>
              </div>

              <div className="privacy-right-item">
                <h4>⛔ Right to Restrict</h4>
                <p>Request restriction of processing your personal data</p>
              </div>

              <div className="privacy-right-item">
                <h4>📦 Right to Portability</h4>
                <p>Receive your data in a structured, machine-readable format</p>
              </div>

              <div className="privacy-right-item">
                <h4>🚫 Right to Object</h4>
                <p>Object to processing of your data for certain purposes</p>
              </div>
            </div>

            <p className="privacy-rights-note">To exercise any of these rights, please contact our Privacy Team using the details in the Contact Us section.</p>
          </section>

          <section id="privacy-contact" className="privacy-policy-section" ref={addToRefs}>
            <div className="privacy-section-icon">📞</div>
            <h2>Contact Us</h2>
            <p>If you have any questions or concerns about this Privacy Policy, please contact us:</p>
            
            <div className="privacy-contact-grid">
              <div className="privacy-contact-card">
                <h4>📧 Email</h4>
                <a href="mailto:privacy@freshmart.com">privacy@freshmart.com</a>
              </div>

              <div className="privacy-contact-card">
                <h4>📱 Phone</h4>
                <a href="tel:+1234567890">+1 (234) 567-890</a>
              </div>

              <div className="privacy-contact-card">
                <h4>📍 Address</h4>
                <p>123 Grocery Street<br/>Food City, FC 12345</p>
              </div>

              <div className="privacy-contact-card">
                <h4>⏰ Business Hours</h4>
                <p>Mon-Fri: 9 AM - 6 PM<br/>Sat-Sun: Closed</p>
              </div>
            </div>
          </section>

          <div className="privacy-policy-footer">
            <p>This Privacy Policy is effective as of February 7, 2026. We reserve the right to update this policy at any time. Changes will be posted on this page with an updated revision date.</p>
            <div className="privacy-footer-actions">
              <button className="privacy-btn-download">📄 Download PDF</button>
              <button className="privacy-btn-print">🖨️ Print Policy</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PrivacyPage;