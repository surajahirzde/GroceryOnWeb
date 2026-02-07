import React, { useEffect, useRef, useState } from 'react';
import './ReturnsPage.css';

const ReturnsPage = () => {
  const [activeTab, setActiveTab] = useState('eligibility');
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('refund-visible');
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
    <div className="refund-page-container">
      <div className="refund-hero-section">
        <div className="refund-hero-pattern"></div>
        <div className="refund-hero-content">
          <div className="refund-hero-icon-large">💰</div>
          <h1 className="refund-hero-title">Refund & Return Policy</h1>
          <p className="refund-hero-subtitle">We want you to be completely satisfied with your purchase. Here's our hassle-free refund policy.</p>
          <div className="refund-hero-stats">
            <div className="refund-stat-item">
              <span className="refund-stat-number">24hrs</span>
              <span className="refund-stat-label">Processing Time</span>
            </div>
            <div className="refund-stat-divider"></div>
            <div className="refund-stat-item">
              <span className="refund-stat-number">7 Days</span>
              <span className="refund-stat-label">Return Window</span>
            </div>
            <div className="refund-stat-divider"></div>
            <div className="refund-stat-item">
              <span className="refund-stat-number">100%</span>
              <span className="refund-stat-label">Money Back</span>
            </div>
          </div>
        </div>
      </div>

      <div className="refund-content-wrapper">
        <div className="refund-quick-links-sidebar">
          <h3>Quick Links</h3>
          <div className="refund-quick-links">
            <a href="#refund-overview" className="refund-quick-link">
              <span className="refund-link-icon">📋</span>
              <span>Policy Overview</span>
            </a>
            <a href="#refund-eligibility" className="refund-quick-link">
              <span className="refund-link-icon">✅</span>
              <span>Eligibility Criteria</span>
            </a>
            <a href="#refund-process" className="refund-quick-link">
              <span className="refund-link-icon">🔄</span>
              <span>Return Process</span>
            </a>
            <a href="#refund-timeline" className="refund-quick-link">
              <span className="refund-link-icon">⏱️</span>
              <span>Refund Timeline</span>
            </a>
            <a href="#refund-exceptions" className="refund-quick-link">
              <span className="refund-link-icon">⚠️</span>
              <span>Exceptions</span>
            </a>
            <a href="#refund-faq" className="refund-quick-link">
              <span className="refund-link-icon">❓</span>
              <span>FAQs</span>
            </a>
          </div>
        </div>

        <main className="refund-policy-main">
          <section id="refund-overview" className="refund-policy-section" ref={addToRefs}>
            <div className="refund-section-header">
              <span className="refund-section-badge">Start Here</span>
              <h2>Policy Overview</h2>
            </div>
            
            <div className="refund-overview-grid">
              <div className="refund-overview-card refund-primary-card">
                <div className="refund-card-icon">🛡️</div>
                <h3>Our Guarantee</h3>
                <p>We stand behind the quality of our products. If you're not satisfied, we'll make it right with a full refund or replacement.</p>
              </div>

              <div className="refund-overview-card">
                <div className="refund-card-icon">🕐</div>
                <h3>7-Day Returns</h3>
                <p>You have 7 days from delivery to request a return for eligible items. No questions asked for fresh produce issues.</p>
              </div>

              <div className="refund-overview-card">
                <div className="refund-card-icon">💳</div>
                <h3>Easy Refunds</h3>
                <p>Refunds are processed within 24-48 hours and credited back to your original payment method.</p>
              </div>
            </div>

            <div className="refund-info-banner">
              <span className="refund-banner-icon">💡</span>
              <p><strong>Pro Tip:</strong> Keep your order confirmation and packaging for faster processing of returns and refunds.</p>
            </div>
          </section>

          <section id="refund-eligibility" className="refund-policy-section" ref={addToRefs}>
            <div className="refund-section-header">
              <span className="refund-section-badge">Requirements</span>
              <h2>Eligibility Criteria</h2>
            </div>

            <div className="refund-eligibility-tabs">
              <button 
                className={'refund-tab-btn ' + (activeTab === 'eligibility' ? 'refund-tab-active' : '')}
                onClick={() => setActiveTab('eligibility')}
              >
                ✅ Eligible Items
              </button>
              <button 
                className={'refund-tab-btn ' + (activeTab === 'non-eligibility' ? 'refund-tab-active' : '')}
                onClick={() => setActiveTab('non-eligibility')}
              >
                ❌ Non-Eligible Items
              </button>
            </div>

            <div className="refund-tab-content">
              {activeTab === 'eligibility' && (
                <div className="refund-eligibility-list refund-animate-in">
                  <div className="refund-eligibility-item">
                    <div className="refund-item-icon refund-icon-success">✓</div>
                    <div>
                      <h4>Damaged or Defective Products</h4>
                      <p>Items received in damaged condition, with manufacturing defects, or past expiry date.</p>
                    </div>
                  </div>

                  <div className="refund-eligibility-item">
                    <div className="refund-item-icon refund-icon-success">✓</div>
                    <div>
                      <h4>Wrong Items Delivered</h4>
                      <p>If you received incorrect items or quantities different from your order.</p>
                    </div>
                  </div>

                  <div className="refund-eligibility-item">
                    <div className="refund-item-icon refund-icon-success">✓</div>
                    <div>
                      <h4>Quality Issues</h4>
                      <p>Fresh produce that doesn't meet our quality standards or is spoiled upon delivery.</p>
                    </div>
                  </div>

                  <div className="refund-eligibility-item">
                    <div className="refund-item-icon refund-icon-success">✓</div>
                    <div>
                      <h4>Unopened Packaged Goods</h4>
                      <p>Non-perishable items in original, unopened packaging within 7 days of delivery.</p>
                    </div>
                  </div>

                  <div className="refund-eligibility-item">
                    <div className="refund-item-icon refund-icon-success">✓</div>
                    <div>
                      <h4>Missing Items</h4>
                      <p>Items that were paid for but not included in your delivery.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'non-eligibility' && (
                <div className="refund-eligibility-list refund-animate-in">
                  <div className="refund-eligibility-item">
                    <div className="refund-item-icon refund-icon-error">✗</div>
                    <div>
                      <h4>Opened Perishable Items</h4>
                      <p>Fresh fruits, vegetables, dairy, meat, or frozen items that have been opened or consumed.</p>
                    </div>
                  </div>

                  <div className="refund-eligibility-item">
                    <div className="refund-item-icon refund-icon-error">✗</div>
                    <div>
                      <h4>Items Past Return Window</h4>
                      <p>Products for which the 7-day return period has expired.</p>
                    </div>
                  </div>

                  <div className="refund-eligibility-item">
                    <div className="refund-item-icon refund-icon-error">✗</div>
                    <div>
                      <h4>Gift Cards & Vouchers</h4>
                      <p>All gift cards, promotional vouchers, and prepaid cards are non-refundable.</p>
                    </div>
                  </div>

                  <div className="refund-eligibility-item">
                    <div className="refund-item-icon refund-icon-error">✗</div>
                    <div>
                      <h4>Sale/Clearance Items</h4>
                      <p>Items marked as final sale or clearance (unless defective or damaged).</p>
                    </div>
                  </div>

                  <div className="refund-eligibility-item">
                    <div className="refund-item-icon refund-icon-error">✗</div>
                    <div>
                      <h4>Customer Preference Changes</h4>
                      <p>Returns due to change of mind on perishable or opened items.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          <section id="refund-process" className="refund-policy-section" ref={addToRefs}>
            <div className="refund-section-header">
              <span className="refund-section-badge">How It Works</span>
              <h2>Return Process</h2>
            </div>

            <div className="refund-process-timeline">
              <div className="refund-timeline-item">
                <div className="refund-timeline-marker">1</div>
                <div className="refund-timeline-content">
                  <h4>Contact Customer Support</h4>
                  <p>Reach out to us via phone, email, or chat within 7 days of delivery. Provide your order number and reason for return.</p>
                  <div className="refund-contact-options">
                    <span className="refund-contact-chip">📞 Phone</span>
                    <span className="refund-contact-chip">📧 Email</span>
                    <span className="refund-contact-chip">💬 Chat</span>
                  </div>
                </div>
              </div>

              <div className="refund-timeline-item">
                <div className="refund-timeline-marker">2</div>
                <div className="refund-timeline-content">
                  <h4>Verification & Approval</h4>
                  <p>Our team will verify your request. For damaged or defective items, we may request photos for quality assessment.</p>
                  <div className="refund-verification-note">
                    <span className="refund-note-icon">📸</span>
                    <span>Photos help us serve you faster!</span>
                  </div>
                </div>
              </div>

              <div className="refund-timeline-item">
                <div className="refund-timeline-marker">3</div>
                <div className="refund-timeline-content">
                  <h4>Item Collection/Return</h4>
                  <p>For eligible returns, we'll arrange a pickup at your address or you can drop off at our nearest location.</p>
                  <div className="refund-return-methods">
                    <div className="refund-method-box">
                      <span className="refund-method-icon">🚚</span>
                      <span>Free Pickup</span>
                    </div>
                    <div className="refund-method-box">
                      <span className="refund-method-icon">🏪</span>
                      <span>Store Drop-off</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="refund-timeline-item">
                <div className="refund-timeline-marker">4</div>
                <div className="refund-timeline-content">
                  <h4>Quality Check</h4>
                  <p>Once we receive the item, our team will inspect it to ensure it meets return criteria.</p>
                  <span className="refund-check-duration">⏱️ Usually completed within 24 hours</span>
                </div>
              </div>

              <div className="refund-timeline-item">
                <div className="refund-timeline-marker">5</div>
                <div className="refund-timeline-content">
                  <h4>Refund Processing</h4>
                  <p>After approval, your refund will be initiated. You'll receive a confirmation email with refund details.</p>
                  <div className="refund-info-details">
                    <div className="refund-info-item">
                      <span className="refund-info-label">Processing:</span>
                      <span className="refund-info-value">24-48 hours</span>
                    </div>
                    <div className="refund-info-item">
                      <span className="refund-info-label">Bank Credit:</span>
                      <span className="refund-info-value">3-7 business days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="refund-faq" className="refund-policy-section" ref={addToRefs}>
            <div className="refund-section-header">
              <span className="refund-section-badge">Help</span>
              <h2>Frequently Asked Questions</h2>
            </div>

            <div className="refund-faq-container">
              <details className="refund-faq-item">
                <summary>Can I get a replacement instead of a refund?</summary>
                <p>Absolutely! If an item is damaged or defective, we can send you a replacement at no extra cost. Just let our customer support team know your preference when initiating the return.</p>
              </details>

              <details className="refund-faq-item">
                <summary>What if I received a partial order?</summary>
                <p>If items are missing from your order, please contact us immediately. We'll either deliver the missing items at no charge or refund you for those items within 24 hours.</p>
              </details>

              <details className="refund-faq-item">
                <summary>Do I need to pay for return shipping?</summary>
                <p>No! We offer free pickup for all eligible returns. Our delivery partner will collect the items from your address at a time convenient for you.</p>
              </details>

              <details className="refund-faq-item">
                <summary>Can I return items bought during a sale?</summary>
                <p>Yes, sale items are returnable unless specifically marked as "Final Sale" or "Clearance - No Returns." The same 7-day return policy applies to sale purchases.</p>
              </details>
            </div>
          </section>

          <div className="refund-contact-support-section">
            <div className="refund-support-content">
              <h3>Still Have Questions?</h3>
              <p>Our customer support team is here to help you with any refund or return queries.</p>
              <div className="refund-support-buttons">
                <button className="refund-support-btn refund-primary-btn">
                  <span className="refund-btn-icon">💬</span>
                  <span>Live Chat</span>
                </button>
                <button className="refund-support-btn">
                  <span className="refund-btn-icon">📞</span>
                  <span>Call Us</span>
                </button>
                <button className="refund-support-btn">
                  <span className="refund-btn-icon">📧</span>
                  <span>Email Support</span>
                </button>
              </div>
            </div>
            <div className="refund-support-hours">
              <h4>Support Hours</h4>
              <p>Monday - Saturday: 9 AM - 9 PM</p>
              <p>Sunday: 10 AM - 6 PM</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReturnsPage;