import React, { useState } from 'react';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);

  const handleAddToCart = () => {
    if (typeof onAddToCart === 'function') {
      onAddToCart(product, quantity);
      setQuantity(1);
      
      // Show add to cart animation
      const cartAnimation = document.querySelector('.pc-cart-animation');
      if (cartAnimation && event) {
        cartAnimation.style.display = 'block';
        cartAnimation.style.left = `${event.clientX}px`;
        cartAnimation.style.top = `${event.clientY}px`;
        
        setTimeout(() => {
          cartAnimation.style.display = 'none';
        }, 1000);
      }
    }
  };

  // Real product images from Unsplash
  const realProductImages = {
    1: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&auto=format&fit=crop&q=80', // Apples
    2: 'https://images.unsplash.com/photo-1598170845058-78131a90f4bf?w=400&auto=format&fit=crop&q=80', // Carrots
    3: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=400&auto=format&fit=crop&q=80', // Milk
    4: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&auto=format&fit=crop&q=80', // Bread
    5: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&auto=format&fit=crop&q=80', // Eggs
    6: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&auto=format&fit=crop&q=80', // Potatoes
    7: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&auto=format&fit=crop&q=80', // Bananas
    8: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&auto=format&fit=crop&q=80', // Rice
    9: 'https://images.unsplash.com/photo-1559598467-f8b76c8155d0?w=400&auto=format&fit=crop&q=80', // Yogurt
    10: 'https://images.unsplash.com/photo-1533050487297-09b450131914?w=400&auto=format&fit=crop&q=80', // Olive Oil
    11: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=400&auto=format&fit=crop&q=80', // Honey
    12: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=400&auto=format&fit=crop&q=80', // Broccoli
    13: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop&q=80', // Almonds
    14: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&auto=format&fit=crop&q=80', // Orange Juice
    15: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&auto=format&fit=crop&q=80', // Paneer
    16: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&auto=format&fit=crop&q=80', // Tomatoes
    17: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&auto=format&fit=crop&q=80', // Mangoes
    18: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&auto=format&fit=crop&q=80', // Butter
    19: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&auto=format&fit=crop&q=80', // Coffee
    20: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&auto=format&fit=crop&q=80', // Spinach
    21: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&auto=format&fit=crop&q=80', // Cashews
    22: 'https://images.unsplash.com/photo-1604503468505-3c319ca4f5c6?w=400&auto=format&fit=crop&q=80', // Chicken Breast
    23: 'https://images.unsplash.com/photo-1559620192-032c64bc86af?w=400&auto=format&fit=crop&q=80', // Chips
    24: 'https://images.unsplash.com/photo-1596040033221-a1f4f8a8c126?w=400&auto=format&fit=crop&q=80', // Spices
  };

  const getProductImage = () => {
    return realProductImages[product.id] || `https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&auto=format&fit=crop&q=80`;
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={i} className="pc-star-full">★</span>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<span key={i} className="pc-star-half">★</span>);
      } else {
        stars.push(<span key={i} className="pc-star-empty">★</span>);
      }
    }
    return stars;
  };

  return (
    <>
      <div 
        className="pc-card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image Section */}
        <div className="pc-image-section">
          <div className="pc-image-container">
            <div className="pc-image-wrapper">
              <img 
                src={getProductImage()}
                alt={product.name}
                className="pc-image-real"
                loading="lazy"
              />
              
              {/* Product Badges */}
              <div className="pc-badges">
                {product.price < 100 && (
                  <span className="pc-badge pc-best-price">Best Price</span>
                )}
                <span className="pc-badge pc-in-stock">In Stock</span>
                {product.price > 500 && (
                  <span className="pc-badge pc-premium">Premium</span>
                )}
                {product.category === 'Organic' && (
                  <span className="pc-badge pc-organic">Organic</span>
                )}
              </div>
              
              {/* Favorite Button */}
              <button 
                className={`pc-favorite-btn ${isFavorite ? 'pc-active' : ''}`}
                onClick={() => setIsFavorite(!isFavorite)}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <svg className="pc-favorite-icon" viewBox="0 0 24 24" fill="none">
                  {isFavorite ? (
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
                  ) : (
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  )}
                </svg>
              </button>
              
              {/* Quick View Button */}
              <button 
                className="pc-quick-view-trigger"
                onClick={() => setShowQuickView(true)}
              >
                <svg className="pc-quick-view-icon" viewBox="0 0 24 24">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor"/>
                </svg>
                Quick View
              </button>
            </div>
          </div>
          
          {/* Image Hover Overlay */}
          {isHovered && (
            <div className="pc-image-hover-overlay">
              <div className="pc-overlay-content">
                <button className="pc-overlay-btn pc-compare-btn">
                  <svg className="pc-overlay-icon" viewBox="0 0 24 24">
                    <path d="M9.01 14H2v2h7.01v3L13 15l-3.99-4v3zm5.98-1v-3H22V8h-7.01V5L11 9l3.99 4z" fill="currentColor"/>
                  </svg>
                  Compare
                </button>
                <button className="pc-overlay-btn pc-zoom-btn">
                  <svg className="pc-overlay-icon" viewBox="0 0 24 24">
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zm-2.5-7h5v2H7V7z" fill="currentColor"/>
                  </svg>
                  Zoom
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Product Info Section */}
        <div className="pc-info-section">
          {/* Product Header */}
          <div className="pc-header">
            <div className="pc-category-tag">
              <span className="pc-category-text">{product.category}</span>
            </div>
            <h3 className="pc-title">{product.name}</h3>
            <div className="pc-rating">
              <div className="pc-stars">
                {renderStars(product.rating || 4.5)}
              </div>
              <span className="pc-rating-score">{product.rating || 4.5}</span>
              <span className="pc-rating-count">({Math.floor(Math.random() * 100) + 50})</span>
            </div>
          </div>
          
          {/* Product Description */}
          <p className="pc-description">
            {product.description}
            {product.description.length > 60 && (
              <button className="pc-read-more-btn">Read More</button>
            )}
          </p>
          
          {/* Product Features */}
          <div className="pc-features">
            <span className="pc-feature">
              <svg className="pc-feature-icon" viewBox="0 0 24 24">
                <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" fill="currentColor"/>
              </svg>
              Free Delivery
            </span>
            <span className="pc-feature">
              <svg className="pc-feature-icon" viewBox="0 0 24 24">
                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" fill="currentColor"/>
              </svg>
              Easy Returns
            </span>
            <span className="pc-feature">
              <svg className="pc-feature-icon" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor"/>
              </svg>
              Quality Checked
            </span>
          </div>
          
          {/* Price Section */}
          <div className="pc-price-section">
            <div className="pc-price-info">
              <div className="pc-current-price">
                <span className="pc-currency">₹</span>
                <span className="pc-price-value">{product.price}</span>
                <span className="pc-price-unit">/{product.unit || 'kg'}</span>
              </div>
              {product.price > 100 && (
                <div className="pc-original-price">
                  <span className="pc-original-amount">₹{Math.round(product.price * 1.2)}</span>
                  <span className="pc-discount-percent">20% OFF</span>
                </div>
              )}
            </div>
            <div className="pc-price-savings">
              <span className="pc-saving-tag">Save ₹{Math.round(product.price * 0.2)}</span>
            </div>
          </div>
          
          {/* Quantity and Add to Cart */}
          <div className="pc-action-section">
            <div className="pc-quantity-controls">
              <div className="pc-quantity-label">Quantity:</div>
              <div className="pc-quantity-selector">
                <button 
                  className="pc-qty-btn pc-decrease"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity === 1}
                >
                  -
                </button>
                <div className="pc-quantity-display">
                  <span className="pc-quantity-value">{quantity}</span>
                  <span className="pc-quantity-unit">{product.unit || 'kg'}</span>
                </div>
                <button 
                  className="pc-qty-btn pc-increase"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
              <div className="pc-quantity-total">
                Total: <span className="pc-total-price">₹{product.price * quantity}</span>
              </div>
            </div>
            
            <div className="pc-cart-actions">
              <button 
                className="pc-add-to-cart-btn"
                onClick={handleAddToCart}
              >
                <svg className="pc-cart-btn-icon" viewBox="0 0 24 24">
                  <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" fill="currentColor"/>
                </svg>
                <span className="pc-cart-btn-text">Add to Cart</span>
                <span className="pc-cart-btn-quantity">({quantity})</span>
              </button>
              
              <button className="pc-buy-now-btn">
                <svg className="pc-buy-now-icon" viewBox="0 0 24 24">
                  <path d="M13 12h7v1.5h-7zm0-2.5h7V11h-7zm0 5h7V16h-7zM21 4H3c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 15h-9V6h9v13z" fill="currentColor"/>
                </svg>
                Buy Now
              </button>
            </div>
          </div>
          
          {/* Additional Actions */}
          <div className="pc-additional-actions">
            <button className="pc-action-btn pc-wishlist-btn">
              <svg className="pc-action-icon" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
              </svg>
              Save
            </button>
            <button className="pc-action-btn pc-share-btn">
              <svg className="pc-action-icon" viewBox="0 0 24 24">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" fill="currentColor"/>
              </svg>
              Share
            </button>
          </div>
          
          {/* Delivery Info */}
          <div className="pc-delivery-info">
            <svg className="pc-delivery-icon" viewBox="0 0 24 24">
              <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" fill="currentColor"/>
            </svg>
            <span className="pc-delivery-text">
              Delivery in <strong>2 hours</strong> • Free above ₹499
            </span>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {showQuickView && (
        <div className="pc-quick-view-modal">
          <div className="pc-modal-overlay" onClick={() => setShowQuickView(false)}></div>
          <div className="pc-modal-content">
            <button 
              className="pc-modal-close"
              onClick={() => setShowQuickView(false)}
            >
              <svg viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor"/>
              </svg>
            </button>
            <div className="pc-quick-view-content">
              <h3>{product.name}</h3>
              <div className="pc-modal-image">
                <img src={getProductImage()} alt={product.name} />
              </div>
              <div className="pc-modal-details">
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Description:</strong> {product.description}</p>
                <p><strong>Price:</strong> ₹{product.price} per {product.unit || 'kg'}</p>
                <p><strong>Rating:</strong> {product.rating || 4.5} ★ ({Math.floor(Math.random() * 100) + 50} reviews)</p>
                <p><strong>Delivery:</strong> 2 hours • Free above ₹499</p>
              </div>
              <button 
                className="pc-modal-add-to-cart"
                onClick={handleAddToCart}
              >
                Add to Cart - ₹{product.price}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Animation Element */}
      <div className="pc-cart-animation"></div>
    </>
  );
};

export default ProductCard;