import React from 'react';
import './CartItem.css';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const totalPrice = item.price * item.quantity;

  const handleIncrease = () => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    } else {
      onRemove(item.id);
    }
  };

  const handleRemove = () => {
    if (window.confirm(`Remove ${item.name} from cart?`)) {
      onRemove(item.id);
    }
  };

  return (
    <div className="cart-item-card">
      {/* Item Image */}
      <div className="cart-item-image">
        <div className="cart-image-container">
          <span className="cart-item-emoji">{item.image || '🛒'}</span>
        </div>
      </div>

      {/* Item Details */}
      <div className="cart-item-details">
        <div className="cart-item-header">
          <h3 className="cart-item-name">{item.name}</h3>
          {item.category && (
            <span className="cart-item-category">{item.category}</span>
          )}
        </div>
        
        {item.description && (
          <p className="cart-item-description">{item.description}</p>
        )}
        
        <div className="cart-item-meta">
          <div className="cart-item-price">
            <span className="price-label">Price:</span>
            <span className="price-value">₹{item.price.toFixed(2)}</span>
          </div>
          
          {item.weight && (
            <div className="cart-item-weight">
              <span className="weight-icon">⚖️</span>
              <span className="weight-value">{item.weight}</span>
            </div>
          )}
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="cart-item-quantity">
        <div className="quantity-controls">
          <button 
            onClick={handleDecrease}
            className="qty-btn qty-decrease"
            aria-label="Decrease quantity"
          >
            <span className="qty-icon">−</span>
          </button>
          
          <div className="qty-display">
            <span className="qty-value">{item.quantity}</span>
            <span className="qty-label">items</span>
          </div>
          
          <button 
            onClick={handleIncrease}
            className="qty-btn qty-increase"
            aria-label="Increase quantity"
          >
            <span className="qty-icon">+</span>
          </button>
        </div>
        
        <div className="qty-stats">
          <span className="qty-total">
            ₹{(item.price * item.quantity).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Total Price */}
      <div className="cart-item-total">
        <div className="total-section">
          <span className="total-label">Total:</span>
          <span className="total-amount">₹{totalPrice.toFixed(2)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="cart-item-actions">
        <button 
          onClick={handleRemove}
          className="cart-remove-btn"
          aria-label="Remove item from cart"
          title="Remove item"
        >
          <span className="remove-icon">🗑️</span>
          <span className="remove-text">Remove</span>
        </button>
        
        <button 
          className="cart-save-btn"
          aria-label="Save for later"
          title="Save for later"
        >
          <span className="save-icon">💾</span>
          <span className="save-text">Save</span>
        </button>
      </div>
    </div>
  );
};

export default CartItem;