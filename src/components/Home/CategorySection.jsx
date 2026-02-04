import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CategorySection.css';

const CategorySection = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [isVisible, setIsVisible] = useState(false);

  // Categories with REAL high-quality images
  const categories = [
    { 
      id: 1, 
      name: 'Fresh Vegetables', 
      count: 45, 
      icon: '🥦',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&h=600&fit=crop&q=80',
      color: '#27ae60',
      trending: true,
      discount: 15,
      description: 'Farm fresh organic vegetables'
    },
    { 
      id: 2, 
      name: 'Fresh Fruits', 
      count: 32, 
      icon: '🍎',
      image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=800&h=600&fit=crop&q=80',
      color: '#e74c3c',
      trending: true,
      discount: 10,
      description: 'Sweet and juicy seasonal fruits'
    },
    { 
      id: 3, 
      name: 'Dairy Products', 
      count: 28, 
      icon: '🥛',
      image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=800&h=600&fit=crop&q=80',
      color: '#3498db',
      trending: false,
      discount: 5,
      description: 'Fresh milk, cheese, and yogurt'
    },
    { 
      id: 4, 
      name: 'Bakery & Bread', 
      count: 19, 
      icon: '🍞',
      image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=800&h=600&fit=crop&q=80',
      color: '#d35400',
      trending: true,
      discount: 20,
      description: 'Freshly baked bread and pastries'
    },
    { 
      id: 5, 
      name: 'Beverages', 
      count: 67, 
      icon: '🧃',
      image: 'https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=800&h=600&fit=crop&q=80',
      color: '#9b59b6',
      trending: false,
      discount: 12,
      description: 'Refreshing drinks and juices'
    },
    { 
      id: 6, 
      name: 'Snacks & Chips', 
      count: 89, 
      icon: '🍿',
      image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=800&h=600&fit=crop&q=80',
      color: '#f39c12',
      trending: true,
      discount: 25,
      description: 'Crunchy and tasty snacks'
    },
    { 
      id: 7, 
      name: 'Spices & Masalas', 
      count: 42, 
      icon: '🌶️',
      image: 'https://images.unsplash.com/photo-1599909533730-f9c608b0589b?w=800&h=600&fit=crop&q=80',
      color: '#c0392b',
      trending: false,
      discount: 8,
      description: 'Aromatic spices and seasonings'
    },
    { 
      id: 8, 
      name: 'Rice & Grains', 
      count: 54, 
      icon: '🍚',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&h=600&fit=crop&q=80',
      color: '#8e44ad',
      trending: false,
      discount: 7,
      description: 'Premium rice and healthy grains'
    }
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Filter categories
  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterType === 'trending') {
      return matchesSearch && category.trending;
    } else if (filterType === 'discount') {
      return matchesSearch && category.discount > 0;
    }
    
    return matchesSearch;
  });

  const handleViewProducts = (categoryName) => {
    navigate(`/products?category=${categoryName.toLowerCase()}`);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const resetFilters = () => {
    setSearchTerm('');
    setFilterType('all');
  };

  return (
    <section className={`cat-section ${isVisible ? 'cat-visible' : ''}`}>
      <div className="cat-container">
        
        {/* Header */}
        <div className="cat-header">
          <div className="cat-header-content">
            <h2 className="cat-title">
              <span className="cat-title-icon">🛒</span>
              Shop by Category
            </h2>
            <p className="cat-subtitle">
              Browse {categories.length} categories with premium quality products
            </p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="cat-controls">
          <div className="cat-search-box">
            <span className="cat-search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Search categories..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="cat-search-input"
            />
            {searchTerm && (
              <button className="cat-clear-btn" onClick={clearSearch}>✕</button>
            )}
          </div>

          <div className="cat-filter-btns">
            <button 
              className={`cat-filter-btn ${filterType === 'all' ? 'active' : ''}`}
              onClick={() => setFilterType('all')}
            >
              All
            </button>
            <button 
              className={`cat-filter-btn ${filterType === 'trending' ? 'active' : ''}`}
              onClick={() => setFilterType('trending')}
            >
              🔥 Trending
            </button>
            <button 
              className={`cat-filter-btn ${filterType === 'discount' ? 'active' : ''}`}
              onClick={() => setFilterType('discount')}
            >
              🎁 Discount
            </button>
          </div>
        </div>

        {/* Categories Grid */}
        {filteredCategories.length === 0 ? (
          <div className="cat-no-results">
            <div className="cat-empty-icon">🥦</div>
            <h3>No categories found</h3>
            <p>Try adjusting your search</p>
            <button onClick={resetFilters} className="cat-reset-btn">
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="cat-grid">
            {filteredCategories.map((category, index) => (
              <div 
                key={category.id} 
                className="cat-card"
                onClick={() => handleViewProducts(category.name)}
                style={{ 
                  '--delay': `${index * 0.1}s`,
                  '--color': category.color
                }}
              >
                {/* Badges */}
                {(category.trending || category.discount > 0) && (
                  <div className="cat-badges">
                    {category.trending && (
                      <span className="cat-badge trending">🔥 Trending</span>
                    )}
                    {category.discount > 0 && (
                      <span className="cat-badge discount">{category.discount}% OFF</span>
                    )}
                  </div>
                )}

                {/* Image */}
                <div className="cat-image">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    loading="lazy"
                  />
                  <div className="cat-overlay"></div>
                </div>

                {/* Content */}
                <div className="cat-content">
                  <div className="cat-icon">{category.icon}</div>
                  <h3 className="cat-name">{category.name}</h3>
                  <p className="cat-desc">{category.description}</p>
                  <div className="cat-footer">
                    <span className="cat-count">{category.count} Products</span>
                    <span className="cat-arrow">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="cat-view-all">
          <button 
            className="cat-view-all-btn"
            onClick={() => navigate('/products')}
          >
            View All Products
            <span className="cat-btn-arrow">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;