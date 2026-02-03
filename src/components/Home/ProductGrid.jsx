import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../Products/ProductCard';
import './ProductGrid.css';

const ProductGrid = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Enhanced product data with real images
  const groceryProducts = [
    {
      id: 1, name: 'Fresh Apples - Shimla', category: 'Fruits', price: 299,
      image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=600&fit=crop',
      description: 'Fresh organic Shimla apples, rich in fiber', rating: 4.5, unit: 'kg'
    },
    {
      id: 2, name: 'Carrots - Organic', category: 'Vegetables', price: 89,
      image: 'https://images.unsplash.com/photo-1598170845058-78131a90f4bf?w=600&fit=crop',
      description: 'Fresh organic carrots', rating: 4.3, unit: 'kg'
    },
    {
      id: 3, name: 'Milk - Amul Gold', category: 'Dairy', price: 60,
      image: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=600&fit=crop',
      description: 'Premium quality milk', rating: 4.6, unit: '1L'
    },
    {
      id: 4, name: 'Whole Wheat Bread', category: 'Bakery', price: 35,
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&fit=crop',
      description: 'Healthy whole wheat bread', rating: 4.2, unit: '400g'
    },
    {
      id: 5, name: 'Fresh Eggs', category: 'Dairy', price: 90,
      image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=600&fit=crop',
      description: 'Farm fresh eggs', rating: 4.7, unit: '6 pieces'
    },
    {
      id: 6, name: 'Fresh Potatoes', category: 'Vegetables', price: 30,
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&fit=crop',
      description: 'Fresh potatoes', rating: 4.1, unit: 'kg'
    },
    {
      id: 7, name: 'Fresh Bananas', category: 'Fruits', price: 50,
      image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&fit=crop',
      description: 'Fresh ripe bananas', rating: 4.4, unit: 'dozen'
    },
    {
      id: 8, name: 'Basmati Rice', category: 'Grains', price: 80,
      image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=600&fit=crop',
      description: 'Premium basmati rice', rating: 4.8, unit: 'kg'
    },
    {
      id: 9, name: 'Greek Yogurt', category: 'Dairy', price: 199,
      image: 'https://images.unsplash.com/photo-1559598467-f8b76c8155d0?w=600&fit=crop',
      description: 'Greek yogurt high in protein', rating: 4.5, unit: '500g'
    },
    {
      id: 10, name: 'Olive Oil', category: 'Oils', price: 799,
      image: 'https://images.unsplash.com/photo-1533050487297-09b450131914?w=600&fit=crop',
      description: 'Extra virgin olive oil', rating: 4.7, unit: '1L'
    },
    {
      id: 11, name: 'Organic Honey', category: 'Honey', price: 399,
      image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=600&fit=crop',
      description: 'Pure organic honey', rating: 4.6, unit: '500g'
    },
    {
      id: 12, name: 'Fresh Broccoli', category: 'Vegetables', price: 99,
      image: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=600&fit=crop',
      description: 'Fresh green broccoli', rating: 4.3, unit: 'piece'
    },
    {
      id: 13, name: 'Almonds', category: 'Dry Fruits', price: 899,
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&fit=crop',
      description: 'California almonds', rating: 4.8, unit: '500g'
    },
    {
      id: 14, name: 'Orange Juice', category: 'Beverages', price: 199,
      image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=600&fit=crop',
      description: 'Fresh orange juice', rating: 4.4, unit: '1L'
    },
    {
      id: 15, name: 'Paneer', category: 'Dairy', price: 299,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&fit=crop',
      description: 'Fresh paneer', rating: 4.6, unit: '500g'
    },
    {
      id: 16, name: 'Tomatoes', category: 'Vegetables', price: 39,
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&fit=crop',
      description: 'Fresh red tomatoes', rating: 4.2, unit: 'kg'
    },
    {
      id: 17, name: 'Mangoes', category: 'Fruits', price: 599,
      image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&fit=crop',
      description: 'Sweet Alphonso mangoes', rating: 4.9, unit: 'kg'
    },
    {
      id: 18, name: 'Butter', category: 'Dairy', price: 299,
      image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600&fit=crop',
      description: 'Creamy butter', rating: 4.5, unit: '500g'
    },
    {
      id: 19, name: 'Coffee', category: 'Beverages', price: 499,
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&fit=crop',
      description: 'Premium coffee powder', rating: 4.7, unit: '250g'
    },
    {
      id: 20, name: 'Spinach', category: 'Vegetables', price: 49,
      image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&fit=crop',
      description: 'Fresh spinach leaves', rating: 4.2, unit: 'bunch'
    },
    {
      id: 21, name: 'Cashews', category: 'Dry Fruits', price: 999,
      image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&fit=crop',
      description: 'Premium cashews', rating: 4.8, unit: '500g'
    },
    {
      id: 22, name: 'Chicken Breast', category: 'Meat', price: 499,
      image: 'https://images.unsplash.com/photo-1604503468505-3c319ca4f5c6?w=600&fit=crop',
      description: 'Boneless chicken breast', rating: 4.5, unit: 'kg'
    },
    {
      id: 23, name: 'Chips', category: 'Snacks', price: 99,
      image: 'https://images.unsplash.com/photo-1559620192-032c64bc86af?w=600&fit=crop',
      description: 'Crunchy potato chips', rating: 4.3, unit: '200g'
    },
    {
      id: 24, name: 'Spices Pack', category: 'Spices', price: 299,
      image: 'https://images.unsplash.com/photo-1596040033221-a1f4f8a8c126?w=600&fit=crop',
      description: 'Assorted spices pack', rating: 4.6, unit: 'set'
    }
  ];

  // Get unique categories
  const categories = ['All', ...new Set(groceryProducts.map(p => p.category))];
  
  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setProducts(groceryProducts);
      setFilteredProducts(groceryProducts);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, sortBy, priceRange, searchQuery, products]);

  const filterProducts = () => {
    let filtered = [...products];

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Price filter
    filtered = filtered.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort products
    filtered = [...filtered].sort((a, b) => {
      switch(sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'name':
          return a.name.localeCompare(b.name);
        default: // featured
          return (b.id % 3) - (a.id % 3);
      }
    });

    setFilteredProducts(filtered);
  };

  const handleAddToCart = (product, quantity) => {
    try {
      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      const existingIndex = cartItems.findIndex(item => item.id === product.id);
      
      if (existingIndex > -1) {
        cartItems[existingIndex].quantity += quantity;
      } else {
        cartItems.push({
          ...product,
          quantity: quantity
        });
      }
      
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      
      const totalCount = cartItems.reduce((total, item) => total + item.quantity, 0);
      localStorage.setItem('cartCount', totalCount.toString());
      window.dispatchEvent(new Event('storage'));
      
      // Show success toast
      showToast(`✅ Added ${quantity} ${product.name} to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      showToast('❌ Error adding to cart', 'error');
    }
  };

  const showToast = (message, type = 'success') => {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `pg-toast ${type}`;
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#2ecc71' : '#e74c3c'};
      color: white;
      padding: 15px 25px;
      border-radius: 10px;
      z-index: 1000;
      animation: pg-slideIn 0.3s ease;
      font-weight: 600;
      box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'pg-slideOut 0.3s ease';
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
  };

  const resetFilters = () => {
    setSelectedCategory('All');
    setPriceRange({ min: 0, max: 5000 });
    setSearchQuery('');
    setSortBy('featured');
  };

  const handleLoadMore = () => {
    // In real app, load more products from API
    showToast('🔄 Loading more products...');
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Fruits': '🍎',
      'Vegetables': '🥦',
      'Dairy': '🥛',
      'Bakery': '🍞',
      'Beverages': '🧃',
      'Grains': '🍚',
      'Oils': '🫒',
      'Honey': '🍯',
      'Dry Fruits': '🌰',
      'Meat': '🍗',
      'Snacks': '🍿',
      'Spices': '🌶️'
    };
    return icons[category] || '🛒';
  };

  return (
    <section className="pg-section" id="products">
      {/* Header */}
      <div className="pg-header">
        <div className="pg-header-content">
          <h1 className="pg-main-title">
            <span className="pg-title-icon">🛒</span>
            Fresh Groceries
          </h1>
          <p className="pg-subtitle">Premium quality products at affordable prices</p>
          
          {/* Search Bar */}
          <div className="pg-search-container">
            <div className="pg-search-box">
              <span className="pg-search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search for fruits, vegetables, dairy..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pg-search-input"
              />
              {searchQuery && (
                <button className="pg-clear-search" onClick={() => setSearchQuery('')}>
                  ✕
                </button>
              )}
            </div>
            <button className="pg-search-btn">Search</button>
          </div>

          {/* Stats */}
          <div className="pg-stats-bar">
            <div className="pg-stat-item">
              <span className="pg-stat-number">{products.length}</span>
              <span className="pg-stat-label">Total Products</span>
            </div>
            <div className="pg-stat-item">
              <span className="pg-stat-number">{categories.length - 1}</span>
              <span className="pg-stat-label">Categories</span>
            </div>
            <div className="pg-stat-item">
              <span className="pg-stat-number">2h</span>
              <span className="pg-stat-label">Delivery Time</span>
            </div>
          </div>
        </div>
      </div>

      <div className="pg-container">
        {/* Filters Sidebar */}
        <div className={`pg-sidebar ${showFilters ? 'pg-active' : ''}`}>
          <div className="pg-sidebar-header">
            <h3>Filters</h3>
            <button className="pg-close-filters" onClick={() => setShowFilters(false)}>
              ✕
            </button>
          </div>

          {/* Category Filters */}
          <div className="pg-filter-section">
            <h4 className="pg-filter-title">Categories</h4>
            <div className="pg-category-filters">
              {categories.map(category => (
                <button
                  key={category}
                  className={`pg-category-filter ${selectedCategory === category ? 'pg-active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  <span className="pg-filter-icon">
                    {category === 'All' ? '✨' : getCategoryIcon(category)}
                  </span>
                  <span className="pg-filter-name">{category}</span>
                  <span className="pg-filter-count">
                    {category === 'All' 
                      ? products.length 
                      : products.filter(p => p.category === category).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Filter */}
          <div className="pg-filter-section">
            <h4 className="pg-filter-title">Price Range</h4>
            <div className="pg-price-filter">
              <div className="pg-price-display">
                <span>₹{priceRange.min}</span>
                <span>₹{priceRange.max}</span>
              </div>
              <div className="pg-price-slider-container">
                <input
                  type="range"
                  min="0"
                  max="5000"
                  step="100"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({...priceRange, min: parseInt(e.target.value)})}
                  className="pg-price-slider"
                />
                <input
                  type="range"
                  min="0"
                  max="5000"
                  step="100"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({...priceRange, max: parseInt(e.target.value)})}
                  className="pg-price-slider"
                />
              </div>
            </div>
          </div>

          {/* Sort Options */}
          <div className="pg-filter-section">
            <h4 className="pg-filter-title">Sort By</h4>
            <div className="pg-sort-options">
              {[
                { value: 'featured', label: 'Featured', icon: '⭐' },
                { value: 'price-low', label: 'Price: Low to High', icon: '💰' },
                { value: 'price-high', label: 'Price: High to Low', icon: '💎' },
                { value: 'rating', label: 'Customer Rating', icon: '⭐' },
                { value: 'name', label: 'Name A-Z', icon: '🔤' }
              ].map(option => (
                <button
                  key={option.value}
                  className={`pg-sort-option ${sortBy === option.value ? 'pg-active' : ''}`}
                  onClick={() => setSortBy(option.value)}
                >
                  <span className="pg-option-icon">{option.icon}</span>
                  <span className="pg-option-label">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          <button className="pg-clear-filters-btn" onClick={resetFilters}>
            <span className="pg-clear-icon">🔄</span>
            Clear All Filters
          </button>
        </div>

        {/* Main Content */}
        <div className="pg-main">
          {/* Controls Bar */}
          <div className="pg-controls-bar">
            <div className="pg-controls-left">
              <button className="pg-filter-toggle" onClick={() => setShowFilters(!showFilters)}>
                <span className="pg-toggle-icon">⚙️</span>
                Filters
              </button>
              <div className="pg-results-count">
                Showing {filteredProducts.length} of {products.length} products
              </div>
            </div>

            <div className="pg-controls-right">
              <div className="pg-sort-dropdown">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="pg-sort-select"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                  <option value="name">Name A-Z</option>
                </select>
                <span className="pg-dropdown-icon">▼</span>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="pg-loading-state">
              <div className="pg-loading-spinner"></div>
              <p>Loading fresh products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="pg-no-results">
              <div className="pg-no-results-icon">🥦</div>
              <h3>No products found</h3>
              <p>Try adjusting your filters or search terms</p>
              <button className="pg-reset-filters-btn" onClick={resetFilters}>
                Reset All Filters
              </button>
            </div>
          ) : (
            <>
              <div className="pg-grid">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>

              {/* Load More */}
              {filteredProducts.length > 0 && (
                <div className="pg-load-more-section">
                  <button className="pg-load-more-btn" onClick={handleLoadMore}>
                    Load More Products
                    <span className="pg-load-icon">↓</span>
                  </button>
                  <p className="pg-load-more-text">
                    Showing {filteredProducts.length} of {products.length} products
                  </p>
                </div>
              )}
            </>
          )}

          {/* Footer Info */}
          <div className="pg-footer-info">
            <div className="pg-info-card">
              <span className="pg-info-icon">🚚</span>
              <div className="pg-info-content">
                <h4>Free Delivery</h4>
                <p>On orders above ₹499</p>
              </div>
            </div>
            <div className="pg-info-card">
              <span className="pg-info-icon">🔄</span>
              <div className="pg-info-content">
                <h4>Easy Returns</h4>
                <p>24-hour return policy</p>
              </div>
            </div>
            <div className="pg-info-card">
              <span className="pg-info-icon">🔒</span>
              <div className="pg-info-content">
                <h4>Secure Checkout</h4>
                <p>100% secure payment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;