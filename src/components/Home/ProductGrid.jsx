import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../Products/ProductCard';
import './ProductGrid.css';

const ProductGrid = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Real products with high-quality images
  const groceryProducts = [
    {
      id: 1, name: 'Fresh Apples', category: 'Fruits', price: 299,
      image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&h=600&fit=crop&q=80',
      description: 'Fresh organic Shimla apples', rating: 4.5, unit: 'kg'
    },
    {
      id: 2, name: 'Organic Carrots', category: 'Vegetables', price: 89,
      image: 'https://images.unsplash.com/photo-1447175008436-054170c2e979?w=600&h=600&fit=crop&q=80',
      description: 'Fresh organic carrots', rating: 4.3, unit: 'kg'
    },
    {
      id: 3, name: 'Fresh Milk', category: 'Dairy', price: 60,
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&h=600&fit=crop&q=80',
      description: 'Premium quality milk', rating: 4.6, unit: '1L'
    },
    {
      id: 4, name: 'Whole Wheat Bread', category: 'Bakery', price: 35,
      image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=600&h=600&fit=crop&q=80',
      description: 'Healthy whole wheat bread', rating: 4.2, unit: '400g'
    },
    {
      id: 5, name: 'Farm Fresh Eggs', category: 'Dairy', price: 90,
      image: 'https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=600&h=600&fit=crop&q=80',
      description: 'Farm fresh eggs', rating: 4.7, unit: '6 pcs'
    },
    {
      id: 6, name: 'Fresh Potatoes', category: 'Vegetables', price: 30,
      image: 'https://images.unsplash.com/photo-1596784392945-0f6c0c4a0f30?w=600&h=600&fit=crop&q=80',
      description: 'Fresh potatoes', rating: 4.1, unit: 'kg'
    },
    {
      id: 7, name: 'Ripe Bananas', category: 'Fruits', price: 50,
      image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=600&h=600&fit=crop&q=80',
      description: 'Fresh ripe bananas', rating: 4.4, unit: 'dozen'
    },
    {
      id: 8, name: 'Basmati Rice', category: 'Grains', price: 80,
      image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600&h=600&fit=crop&q=80',
      description: 'Premium basmati rice', rating: 4.8, unit: 'kg'
    },
    {
      id: 9, name: 'Greek Yogurt', category: 'Dairy', price: 199,
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&h=600&fit=crop&q=80',
      description: 'High protein yogurt', rating: 4.5, unit: '500g'
    },
    {
      id: 10, name: 'Olive Oil', category: 'Oils', price: 799,
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&h=600&fit=crop&q=80',
      description: 'Extra virgin olive oil', rating: 4.7, unit: '1L'
    },
    {
      id: 11, name: 'Organic Honey', category: 'Honey', price: 399,
      image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&h=600&fit=crop&q=80',
      description: 'Pure organic honey', rating: 4.6, unit: '500g'
    },
    {
      id: 12, name: 'Fresh Broccoli', category: 'Vegetables', price: 99,
      image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=600&h=600&fit=crop&q=80',
      description: 'Fresh green broccoli', rating: 4.3, unit: 'piece'
    },
    {
      id: 13, name: 'Almonds', category: 'Dry Fruits', price: 899,
      image: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=600&h=600&fit=crop&q=80',
      description: 'California almonds', rating: 4.8, unit: '500g'
    },
    {
      id: 14, name: 'Orange Juice', category: 'Beverages', price: 199,
      image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&h=600&fit=crop&q=80',
      description: 'Fresh orange juice', rating: 4.4, unit: '1L'
    },
    {
      id: 15, name: 'Fresh Paneer', category: 'Dairy', price: 299,
      image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&h=600&fit=crop&q=80',
      description: 'Fresh paneer', rating: 4.6, unit: '500g'
    },
    {
      id: 16, name: 'Red Tomatoes', category: 'Vegetables', price: 39,
      image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=600&h=600&fit=crop&q=80',
      description: 'Fresh red tomatoes', rating: 4.2, unit: 'kg'
    }
  ];

  const categories = ['All', ...new Set(groceryProducts.map(p => p.category))];
  
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setProducts(groceryProducts);
      setFilteredProducts(groceryProducts);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, sortBy, searchQuery, products]);

  const filterProducts = () => {
    let filtered = [...products];

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    filtered = [...filtered].sort((a, b) => {
      switch(sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
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
        cartItems.push({ ...product, quantity });
      }
      
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      const totalCount = cartItems.reduce((total, item) => total + item.quantity, 0);
      localStorage.setItem('cartCount', totalCount.toString());
      window.dispatchEvent(new Event('storage'));
      
      showToast(`✅ Added ${product.name} to cart!`);
    } catch (error) {
      console.error('Error:', error);
      showToast('❌ Error adding to cart', 'error');
    }
  };

  const showToast = (message, type = 'success') => {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      background: ${type === 'success' ? '#10b981' : '#ef4444'};
      color: white;
      padding: 16px 24px;
      border-radius: 12px;
      z-index: 1000;
      font-weight: 600;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 2500);
  };

  return (
    <section className="pg-section">
      <div className="pg-container">
        
        {/* Header */}
        <div className="pg-header">
          <h2 className="pg-title">
            <span className="pg-title-icon">🛒</span>
            Featured Products
          </h2>
          <p className="pg-subtitle">Fresh groceries delivered to your door</p>
        </div>

        {/* Controls */}
        <div className="pg-controls">
          {/* Search */}
          <div className="pg-search">
            <span className="pg-search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pg-search-input"
            />
            {searchQuery && (
              <button className="pg-clear" onClick={() => setSearchQuery('')}>✕</button>
            )}
          </div>

          {/* Category Filter */}
          <div className="pg-category-pills">
            {categories.map(category => (
              <button
                key={category}
                className={`pg-pill ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="pg-sort">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="pg-sort-select"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="pg-loading">
            <div className="pg-spinner"></div>
            <p>Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="pg-empty">
            <div className="pg-empty-icon">🥦</div>
            <h3>No products found</h3>
            <p>Try adjusting your search</p>
          </div>
        ) : (
          <div className="pg-grid">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}

        {/* Info Cards */}
        <div className="pg-info-cards">
          <div className="pg-info-card">
            <span className="pg-info-icon">🚚</span>
            <div>
              <h4>Free Delivery</h4>
              <p>On orders above ₹499</p>
            </div>
          </div>
          <div className="pg-info-card">
            <span className="pg-info-icon">🔄</span>
            <div>
              <h4>Easy Returns</h4>
              <p>24-hour return policy</p>
            </div>
          </div>
          <div className="pg-info-card">
            <span className="pg-info-icon">💯</span>
            <div>
              <h4>100% Fresh</h4>
              <p>Quality guaranteed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;