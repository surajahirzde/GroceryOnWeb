import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CategorySection.css';

const CategorySection = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [isLoading, setIsLoading] = useState(false);

  // Enhanced categories with real images
  const categories = [
    { 
      id: 1, 
      name: 'Fresh Vegetables', 
      count: 45, 
      icon: '🥦',
      image: 'https://images.unsplash.com/photo-1598170845058-78131a90f4bf?w=600&fit=crop',
      color: '#27ae60',
      trending: true,
      discount: 15,
      tags: ['Organic', 'Seasonal', 'Local'],
      description: 'Farm fresh organic vegetables delivered daily'
    },
    { 
      id: 2, 
      name: 'Seasonal Fruits', 
      count: 32, 
      icon: '🍎',
      image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=600&fit=crop',
      color: '#e74c3c',
      trending: true,
      discount: 10,
      tags: ['Tropical', 'Imported', 'Sweet'],
      description: 'Sweet and juicy seasonal fruits'
    },
    { 
      id: 3, 
      name: 'Dairy & Eggs', 
      count: 28, 
      icon: '🥛',
      image: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=600&fit=crop',
      color: '#3498db',
      trending: false,
      discount: 5,
      tags: ['Fresh', 'Pasteurized', 'Farm'],
      description: 'Fresh milk, cheese, and eggs'
    },
    { 
      id: 4, 
      name: 'Bakery Items', 
      count: 19, 
      icon: '🍞',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&fit=crop',
      color: '#d35400',
      trending: true,
      discount: 20,
      tags: ['Freshly Baked', 'Artisan', 'Gluten-Free'],
      description: 'Fresh bread and bakery products'
    },
    { 
      id: 5, 
      name: 'Beverages', 
      count: 67, 
      icon: '🧃',
      image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=600&fit=crop',
      color: '#9b59b6',
      trending: false,
      discount: 12,
      tags: ['Cold Drinks', 'Juices', 'Health'],
      description: 'Refreshing drinks and juices'
    },
    { 
      id: 6, 
      name: 'Snacks & Chips', 
      count: 89, 
      icon: '🍿',
      image: 'https://images.unsplash.com/photo-1559620192-032c64bc86af?w=600&fit=crop',
      color: '#f39c12',
      trending: true,
      discount: 25,
      tags: ['Healthy', 'Crispy', 'Tasty'],
      description: 'Crunchy snacks and munchies'
    },
    { 
      id: 7, 
      name: 'Spices & Masalas', 
      count: 42, 
      icon: '🌶️',
      image: 'https://images.unsplash.com/photo-1596040033221-a1f4f8a8c126?w=600&fit=crop',
      color: '#c0392b',
      trending: false,
      discount: 8,
      tags: ['Aromatic', 'Fresh', 'Ground'],
      description: 'Aromatic spices and masalas'
    },
    { 
      id: 8, 
      name: 'Frozen Foods', 
      count: 23, 
      icon: '🧊',
      image: 'https://images.unsplash.com/photo-1615486365945-3d6febc46e3c?w=600&fit=crop',
      color: '#2980b9',
      trending: true,
      discount: 18,
      tags: ['Ready to Cook', 'Frozen', 'Quick'],
      description: 'Frozen vegetables and ready meals'
    },
    { 
      id: 9, 
      name: 'Meat & Seafood', 
      count: 36, 
      icon: '🍗',
      image: 'https://images.unsplash.com/photo-1604503468505-3c319ca4f5c6?w=600&fit=crop',
      color: '#e74c3c',
      trending: true,
      discount: 12,
      tags: ['Fresh', 'Quality', 'Premium'],
      description: 'Premium quality meat and seafood'
    },
    { 
      id: 10, 
      name: 'Rice & Grains', 
      count: 54, 
      icon: '🍚',
      image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=600&fit=crop',
      color: '#8e44ad',
      trending: false,
      discount: 7,
      tags: ['Basmati', 'Organic', 'Whole'],
      description: 'Premium rice and healthy grains'
    },
    { 
      id: 11, 
      name: 'Cooking Oils', 
      count: 31, 
      icon: '🫒',
      image: 'https://images.unsplash.com/photo-1533050487297-09b450131914?w=600&fit=crop',
      color: '#f1c40f',
      trending: false,
      discount: 10,
      tags: ['Healthy', 'Pure', 'Cold Pressed'],
      description: 'Healthy cooking oils for your kitchen'
    },
    { 
      id: 12, 
      name: 'Personal Care', 
      count: 48, 
      icon: '🧴',
      image: 'https://images.unsplash.com/photo-1556228578-9c360e2d0b4a?w=600&fit=crop',
      color: '#3498db',
      trending: true,
      discount: 15,
      tags: ['Organic', 'Natural', 'Safe'],
      description: 'Personal care and hygiene products'
    }
  ];

  // Filter categories
  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (filterType === 'trending') {
      return matchesSearch && category.trending;
    } else if (filterType === 'discount') {
      return matchesSearch && category.discount > 0;
    }
    
    return matchesSearch;
  });

  // Stats calculation
  const totalProducts = categories.reduce((sum, cat) => sum + cat.count, 0);
  const trendingCategories = categories.filter(cat => cat.trending).length;
  const discountCategories = categories.filter(cat => cat.discount > 0).length;

  // Handle category click
  const handleCategoryClick = (categoryId) => {
    setIsLoading(true);
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  // Handle view products
  const handleViewProducts = (categoryName) => {
    navigate(`/products?category=${categoryName.toLowerCase()}`);
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm('');
  };

  // Get active category details
  const getActiveCategory = () => {
    return categories.find(cat => cat.id === activeCategory);
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setFilterType('all');
    setActiveCategory(null);
  };

  return (
    <section className="category-section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="header-left">
            <h2 className="section-title">
              <span className="title-icon">📂</span>
              Shop by Category
            </h2>
            <p className="section-subtitle">
              Browse through {categories.length} categories with {totalProducts}+ fresh products
            </p>
          </div>
          
          <div className="header-right">
            <div className="view-toggle">
              <button 
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid View"
              >
                <span className="btn-icon">⏹️</span>
                Grid
              </button>
              <button 
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                title="List View"
              >
                <span className="btn-icon">📋</span>
                List
              </button>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="stats-bar">
          <div className="stat-card">
            <div className="stat-icon">📂</div>
            <div className="stat-content">
              <div className="stat-value">{filteredCategories.length}</div>
              <div className="stat-label">Categories</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">🛒</div>
            <div className="stat-content">
              <div className="stat-value">{totalProducts}+</div>
              <div className="stat-label">Products</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">🔥</div>
            <div className="stat-content">
              <div className="stat-value">{trendingCategories}</div>
              <div className="stat-label">Trending</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">🎁</div>
            <div className="stat-content">
              <div className="stat-value">{discountCategories}</div>
              <div className="stat-label">On Discount</div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="controls-section">
          <div className="search-container">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input 
                type="text" 
                placeholder="Search categories..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <button className="clear-btn" onClick={clearSearch}>
                  ✕
                </button>
              )}
            </div>
          </div>

          <div className="filter-buttons">
            <button 
              className={`filter-btn ${filterType === 'all' ? 'active' : ''}`}
              onClick={() => setFilterType('all')}
            >
              All Categories
            </button>
            <button 
              className={`filter-btn ${filterType === 'trending' ? 'active' : ''}`}
              onClick={() => setFilterType('trending')}
            >
              <span className="filter-icon">🔥</span>
              Trending
            </button>
            <button 
              className={`filter-btn ${filterType === 'discount' ? 'active' : ''}`}
              onClick={() => setFilterType('discount')}
            >
              <span className="filter-icon">🎁</span>
              Discount
            </button>
          </div>
        </div>

        {/* Active Category Details */}
        {activeCategory && getActiveCategory() && !isLoading && (
          <div className="active-category-modal">
            <div className="modal-content">
              <button 
                className="modal-close"
                onClick={() => setActiveCategory(null)}
              >
                ✕
              </button>
              
              <div className="modal-header">
                <div className="modal-icon" style={{ backgroundColor: `${getActiveCategory().color}20` }}>
                  <span className="modal-emoji">{getActiveCategory().icon}</span>
                </div>
                <div className="modal-title">
                  <h3>{getActiveCategory().name}</h3>
                  <p className="modal-desc">{getActiveCategory().description}</p>
                </div>
              </div>
              
              <div className="modal-body">
                <div className="modal-image">
                  <img src={getActiveCategory().image} alt={getActiveCategory().name} />
                </div>
                
                <div className="modal-details">
                  <div className="detail-row">
                    <span className="detail-label">Total Products:</span>
                    <span className="detail-value">{getActiveCategory().count} items</span>
                  </div>
                  
                  {getActiveCategory().discount > 0 && (
                    <div className="detail-row">
                      <span className="detail-label">Discount:</span>
                      <span className="detail-value discount">{getActiveCategory().discount}% OFF</span>
                    </div>
                  )}
                  
                  <div className="detail-row">
                    <span className="detail-label">Tags:</span>
                    <div className="tags-container">
                      {getActiveCategory().tags.map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="modal-footer">
                <button 
                  className="modal-action-btn secondary"
                  onClick={() => setActiveCategory(null)}
                >
                  Back to Categories
                </button>
                <button 
                  className="modal-action-btn primary"
                  onClick={() => handleViewProducts(getActiveCategory().name)}
                >
                  View {getActiveCategory().count} Products →
                </button>
              </div>
            </div>
            <div className="modal-backdrop" onClick={() => setActiveCategory(null)}></div>
          </div>
        )}

        {/* Categories Display */}
        {isLoading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading category details...</p>
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="no-results">
            <div className="no-results-icon">🥦</div>
            <h3>No categories found</h3>
            <p>Try adjusting your search or filters</p>
            <button 
              onClick={resetFilters}
              className="reset-btn"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className={`categories-container ${viewMode}`}>
            {filteredCategories.map(category => (
              <div 
                key={category.id} 
                className={`category-card ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category.id)}
              >
                {/* Card Badges */}
                <div className="card-badges">
                  {category.trending && (
                    <span className="badge trending">🔥 Trending</span>
                  )}
                  {category.discount > 0 && (
                    <span className="badge discount">{category.discount}% OFF</span>
                  )}
                </div>

                {/* Card Image */}
                <div className="card-image">
                  <img src={category.image} alt={category.name} />
                  <div className="image-overlay"></div>
                  <div className="category-icon">
                    <span style={{ color: category.color, fontSize: '2.5rem' }}>
                      {category.icon}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="card-content">
                  <h3 className="category-name">{category.name}</h3>
                  <p className="category-desc">{category.description}</p>
                  
                  <div className="category-meta">
                    <div className="product-count">
                      <span className="count-number">{category.count}</span>
                      <span className="count-label">products</span>
                    </div>
                    
                    <div className="category-tags">
                      {category.tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <button 
                    className="view-products-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewProducts(category.name);
                    }}
                  >
                    <span className="btn-icon">🛒</span>
                    View Products
                  </button>
                </div>
                
                {/* Hover Effect */}
                <div className="card-hover">
                  <span className="hover-text">Click for details →</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="view-all-section">
          <button 
            className="view-all-btn"
            onClick={() => navigate('/products')}
          >
            Browse All Categories
            <span className="btn-arrow">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;