import React from 'react';
import { Minus, Plus, Trash2, Heart, Package } from 'lucide-react';
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
      {/* Product Image */}
      <div className="cart-item-image">
        <div className="image-wrapper">
          <img
            src={item.image}
            alt={item.name}
            className="product-image"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&fit=crop";
            }}
          />
          {item.category && (
            <span className="category-badge">{item.category}</span>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="cart-item-info">
        <div className="product-details">
          <h3 className="product-name">{item.name}</h3>
          
          {item.description && (
            <p className="product-description">{item.description}</p>
          )}

          <div className="product-meta">
            <span className="price-per-unit">
              ₹{item.price.toFixed(2)}
              {item.unit && <span className="unit">/{item.unit}</span>}
            </span>
            
            {item.weight && (
              <span className="product-weight">
                <Package size={14} />
                {item.weight}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="cart-item-quantity">
        <label className="quantity-label">Quantity</label>
        <div className="quantity-controls">
          <button
            onClick={handleDecrease}
            className="qty-btn qty-decrease"
            aria-label="Decrease quantity"
            disabled={item.quantity === 1}
          >
            <Minus size={16} />
          </button>

          <div className="qty-display">
            <span className="qty-value">{item.quantity}</span>
          </div>

          <button
            onClick={handleIncrease}
            className="qty-btn qty-increase"
            aria-label="Increase quantity"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Subtotal */}
      <div className="cart-item-price">
        <label className="price-label">Subtotal</label>
        <div className="price-value">₹{totalPrice.toFixed(2)}</div>
      </div>

      {/* Actions */}
      <div className="cart-item-actions">
        <button
          onClick={handleRemove}
          className="action-btn remove-btn"
          aria-label="Remove item from cart"
          title="Remove from cart"
        >
          <Trash2 size={18} />
        </button>

        <button
          className="action-btn save-btn"
          aria-label="Save for later"
          title="Save for later"
        >
          <Heart size={18} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;