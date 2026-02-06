import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductsPage.css';
import { 
  Search, 
  Filter, 
  Star, 
  ShoppingBag, 
  Heart,
  Clock,
  Truck,
  Shield,
  ChevronDown,
  Grid,
  List,
  X,
  Plus,
  Minus,
  Leaf,
  Tag,
  Award,
  Check,
  ChevronRight,
  TrendingUp,
  Zap,
  Package
} from 'lucide-react';

const Product = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [wishlist, setWishlist] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  // ✅ 20+ Real Products with Images
  const productData = [
    {
      id: 1, name: 'Organic Apples - Shimla', category: 'fruits', brand: 'Fresh Farms', 
      price: 299, originalPrice: 349, discount: 15, rating: 4.5, reviews: 128,
      image: 'https://images.pexels.com/photos/209339/pexels-photo-209339.jpeg',
      unit: 'kg', stock: 50, delivery: 'Today', tags: ['organic', 'best seller'],
      description: 'Fresh organic Shimla apples, rich in fiber and vitamins.'
    },
    {
      id: 2, name: 'Fresh Broccoli', category: 'vegetables', brand: 'Green Valley', 
      price: 89, originalPrice: 99, discount: 10, rating: 4.3, reviews: 89,
      image: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=500&fit=crop',
      unit: 'piece', stock: 100, delivery: 'Today', tags: ['fresh'],
      description: 'Fresh green broccoli packed with nutrients.'
    },
    {
      id: 3, name: 'Almonds - California', category: 'dry-fruits', brand: 'Nutty World', 
      price: 899, originalPrice: 1099, discount: 18, rating: 4.7, reviews: 256,
      image: 'https://images.pexels.com/photos/11091977/pexels-photo-11091977.jpeg',
      unit: '500g', stock: 30, delivery: 'Tomorrow', tags: ['premium'],
      description: 'Premium California almonds, rich in protein.'
    },
    {
      id: 4, name: 'Basmati Rice - Premium', category: 'staples', brand: 'India Gate', 
      price: 1299, originalPrice: 1499, discount: 13, rating: 4.6, reviews: 345,
      image: 'https://images.pexels.com/photos/8108170/pexels-photo-8108170.jpeg',
      unit: '5kg', stock: 25, delivery: 'Today', tags: ['basmati'],
      description: 'Premium basmati rice with aromatic fragrance.'
    },
    {
      id: 5, name: 'Greek Yogurt', category: 'dairy', brand: 'Amul', 
      price: 199, originalPrice: 249, discount: 20, rating: 4.4, reviews: 167,
      image: 'https://images.pexels.com/photos/4006347/pexels-photo-4006347.jpeg',
      unit: '500g', stock: 45, delivery: 'Today', tags: ['protein'],
      description: 'Creamy Greek yogurt high in protein.'
    },
    {
      id: 6, name: 'Chicken Breast - Boneless', category: 'meat', brand: 'Fresh Chicken', 
      price: 499, originalPrice: 599, discount: 17, rating: 4.5, reviews: 189,
      image: 'https://images.pexels.com/photos/5769373/pexels-photo-5769373.jpeg',
      unit: 'kg', stock: 20, delivery: 'Tomorrow', tags: ['fresh'],
      description: 'Fresh boneless chicken breast.'
    },
    {
      id: 7, name: 'Olive Oil - Extra Virgin', category: 'oils', brand: 'Borges', 
      price: 799, originalPrice: 999, discount: 20, rating: 4.8, reviews: 421,
      image: 'https://images.pexels.com/photos/10048321/pexels-photo-10048321.jpeg',
      unit: '1L', stock: 35, delivery: 'Today', tags: ['healthy'],
      description: 'Premium extra virgin olive oil.'
    },
    {
      id: 8, name: 'Honey - Organic', category: 'honey', brand: 'Nature\'s Nectar', 
      price: 399, originalPrice: 499, discount: 20, rating: 4.6, reviews: 278,
      image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=500&fit=crop',
      unit: '500g', stock: 60, delivery: 'Today', tags: ['organic'],
      description: 'Pure organic honey with natural sweetness.'
    },
    {
      id: 9, name: 'Mangoes - Alphonso', category: 'fruits', brand: 'Farm Fresh', 
      price: 599, originalPrice: 699, discount: 14, rating: 4.9, reviews: 312,
      image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&fit=crop',
      unit: 'kg', stock: 40, delivery: 'Tomorrow', tags: ['seasonal'],
      description: 'Sweet Alphonso mangoes, king of fruits.'
    },
    {
      id: 10, name: 'Spinach - Fresh', category: 'vegetables', brand: 'Green Valley', 
      price: 49, originalPrice: 59, discount: 17, rating: 4.2, reviews: 95,
      image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&fit=crop',
      unit: 'bunch', stock: 80, delivery: 'Today', tags: ['fresh'],
      description: 'Fresh spinach leaves, rich in iron.'
    },
    {
      id: 11, name: 'Paneer - Fresh', category: 'dairy', brand: 'Amul', 
      price: 299, originalPrice: 349, discount: 14, rating: 4.6, reviews: 201,
      image: 'https://images.pexels.com/photos/5953663/pexels-photo-5953663.jpeg',
      unit: '500g', stock: 35, delivery: 'Today', tags: ['fresh'],
      description: 'Fresh paneer for delicious curries.'
    },
    {
      id: 12, name: 'Whole Wheat Bread', category: 'bakery', brand: 'Britannia', 
      price: 55, originalPrice: 65, discount: 15, rating: 4.3, reviews: 156,
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&fit=crop',
      unit: '400g', stock: 70, delivery: 'Today', tags: ['healthy'],
      description: 'Healthy whole wheat bread.'
    },
    {
      id: 13, name: 'Orange Juice - Fresh', category: 'beverages', brand: 'Real', 
      price: 199, originalPrice: 249, discount: 20, rating: 4.5, reviews: 178,
      image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=500&fit=crop',
      unit: '1L', stock: 50, delivery: 'Today', tags: ['fresh'],
      description: 'Freshly squeezed orange juice.'
    },
    {
      id: 14, name: 'Cashews - Premium', category: 'dry-fruits', brand: 'Nutty World', 
      price: 999, originalPrice: 1199, discount: 17, rating: 4.7, reviews: 289,
      image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&fit=crop',
      unit: '500g', stock: 25, delivery: 'Tomorrow', tags: ['premium'],
      description: 'Premium quality cashews.'
    },
    {
      id: 15, name: 'Tomatoes - Fresh', category: 'vegetables', brand: 'Farm Fresh', 
      price: 39, originalPrice: 49, discount: 20, rating: 4.1, reviews: 112,
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&fit=crop',
      unit: 'kg', stock: 120, delivery: 'Today', tags: ['fresh'],
      description: 'Fresh red tomatoes.'
    },
    {
      id: 16, name: 'Butter - Amul', category: 'dairy', brand: 'Amul', 
      price: 299, originalPrice: 349, discount: 14, rating: 4.5, reviews: 198,
      image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=500&fit=crop',
      unit: '500g', stock: 40, delivery: 'Today', tags: ['fresh'],
      description: 'Creamy butter for cooking.'
    },
    {
      id: 17, name: 'Bananas - Fresh', category: 'fruits', brand: 'Farm Fresh', 
      price: 59, originalPrice: 69, discount: 14, rating: 4.3, reviews: 145,
      image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&fit=crop',
      unit: 'dozen', stock: 90, delivery: 'Today', tags: ['fresh'],
      description: 'Fresh ripe bananas.'
    },
    {
      id: 18, name: 'Potatoes - Fresh', category: 'vegetables', brand: 'Farm Fresh', 
      price: 29, originalPrice: 39, discount: 26, rating: 4.0, reviews: 98,
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&fit=crop',
      unit: 'kg', stock: 150, delivery: 'Today', tags: ['fresh'],
      description: 'Fresh potatoes for all dishes.'
    },
    {
      id: 19, name: 'Coffee - Premium', category: 'beverages', brand: 'Nescafe', 
      price: 499, originalPrice: 599, discount: 17, rating: 4.7, reviews: 234,
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&fit=crop',
      unit: '250g', stock: 30, delivery: 'Today', tags: ['premium'],
      description: 'Premium coffee powder.'
    },
    {
      id: 20, name: 'Eggs - Farm Fresh', category: 'dairy', brand: 'Farm Fresh', 
      price: 89, originalPrice: 99, discount: 10, rating: 4.4, reviews: 167,
      image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=500&fit=crop',
      unit: '6 pieces', stock: 80, delivery: 'Today', tags: ['fresh'],
      description: 'Farm fresh eggs.'
    }
  ];

  // ✅ Categories
  const categoryData = [
    { id: 'all', name: 'All Products', icon: '🎯', count: 20 },
    { id: 'fruits', name: 'Fresh Fruits', icon: '🍎', count: 4 },
    { id: 'vegetables', name: 'Vegetables', icon: '🥦', count: 5 },
    { id: 'dairy', name: 'Dairy & Eggs', icon: '🥚', count: 5 },
    { id: 'staples', name: 'Rice & Staples', icon: '🍚', count: 2 },
    { id: 'dry-fruits', name: 'Dry Fruits', icon: '🌰', count: 2 },
    { id: 'beverages', name: 'Beverages', icon: '🥤', count: 2 },
    { id: 'meat', name: 'Meat & Fish', icon: '🍗', count: 1 },
    { id: 'bakery', name: 'Bakery', icon: '🍞', count: 1 },
    { id: 'oils', name: 'Oils', icon: '🫒', count: 1 },
    { id: 'honey', name: 'Honey', icon: '🍯', count: 1 }
  ];

  // ✅ Load initial data
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setProducts(productData);
      setFilteredProducts(productData);
      setCategories(categoryData);
      
      const savedCart = localStorage.getItem('cartItems');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
      
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
      
      setLoading(false);
    }, 800);
  }, []);

  // ✅ Filter products
  useEffect(() => {
    let filtered = [...products];

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'discount':
        filtered.sort((a, b) => b.discount - a.discount);
        break;
      default:
        filtered.sort((a, b) => a.id - b.id);
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, sortBy, searchQuery, priceRange, products]);

  // ✅ Add to Cart
  const handleAddToCart = (product) => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const existingIndex = cartItems.findIndex(item => item.id === product.id);
    
    if (existingIndex > -1) {
      cartItems[existingIndex].quantity += 1;
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    setCartItems(cartItems);
    
    const totalCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    localStorage.setItem('cartCount', totalCount.toString());
    window.dispatchEvent(new Event('storage'));
  };

  // ✅ Toggle Wishlist
  const toggleWishlist = (productId) => {
    const updatedWishlist = wishlist.includes(productId)
      ? wishlist.filter(id => id !== productId)
      : [...wishlist, productId];
    
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  // ✅ Handle Buy Now
  const handleBuyNow = (product) => {
    handleAddToCart(product);
    navigate('/cart');
  };

  // ✅ Clear Filters
  const clearFilters = () => {
    setSelectedCategory('all');
    setPriceRange([0, 5000]);
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="products-page">
      {/* Hero Header */}
      <div className="products-hero">
        <div className="hero-background"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <Award size={18} />
              <span>Premium Quality Groceries</span>
            </div>
            <h1 className="hero-title">Fresh Grocery Store</h1>
            <p className="hero-subtitle">
              Discover premium quality groceries delivered fresh to your doorstep
            </p>
            
            <div className="search-bar">
              <div className="search-wrapper">
                <Search className="search-icon" size={22} />
                <input
                  type="text"
                  placeholder="Search for fruits, vegetables, dairy & more..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                {searchQuery && (
                  <button className="clear-search" onClick={() => setSearchQuery('')}>
                    <X size={20} />
                  </button>
                )}
              </div>
              <button className="search-btn">
                <Search size={20} />
                Search
              </button>
            </div>

            <div className="hero-features">
              <div className="feature-item">
                <div className="feature-icon">
                  <Zap size={20} />
                </div>
                <span>2-Hour Express Delivery</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <Shield size={20} />
                </div>
                <span>100% Fresh Guarantee</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <Leaf size={20} />
                </div>
                <span>Organic Options</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <Package size={20} />
                </div>
                <span>Free Delivery ₹499+</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="products-main container">
        {/* Filters Sidebar */}
        <aside className={`filters-sidebar ${showFilters ? 'show' : ''}`}>
          <div className="sidebar-header">
            <h3>
              <Filter size={20} />
              Filters
            </h3>
            <button className="close-filters" onClick={() => setShowFilters(false)}>
              <X size={22} />
            </button>
          </div>

          <div className="filter-section">
            <h4 className="filter-title">Categories</h4>
            <div className="categories-list">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <span className="category-icon">{category.icon}</span>
                  <span className="category-name">{category.name}</span>
                  <span className="category-count">{category.count}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h4 className="filter-title">Price Range</h4>
            <div className="price-filter">
              <div className="price-display">
                <span className="price-label">₹{priceRange[0]}</span>
                <span className="price-label">₹{priceRange[1]}</span>
              </div>
              <div className="price-sliders">
                <input
                  type="range"
                  min="0"
                  max="5000"
                  step="50"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  className="price-slider"
                />
                <input
                  type="range"
                  min="0"
                  max="5000"
                  step="50"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="price-slider"
                />
              </div>
            </div>
          </div>

          <button className="clear-filters-btn" onClick={clearFilters}>
            <X size={18} />
            Clear All Filters
          </button>
        </aside>

        {/* Products Area */}
        <main className="products-area">
          {/* Controls Bar */}
          <div className="controls-bar">
            <div className="controls-left">
              <button className="filter-toggle-btn" onClick={() => setShowFilters(!showFilters)}>
                <Filter size={20} />
                Filters
              </button>
              <div className="results-count">
                <TrendingUp size={18} />
                Showing <strong>{filteredProducts.length}</strong> of <strong>{products.length}</strong> products
              </div>
            </div>

            <div className="controls-right">
              <div className="view-toggle">
                <button
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  title="Grid View"
                >
                  <Grid size={20} />
                </button>
                <button
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                  title="List View"
                >
                  <List size={20} />
                </button>
              </div>

              <div className="sort-dropdown">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="discount">Best Discount</option>
                </select>
                <ChevronDown size={18} className="dropdown-icon" />
              </div>
            </div>
          </div>

          {/* Products Display */}
          {loading ? (
            <div className="loading-state">
              <div className="loader"></div>
              <p>Loading fresh products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>No products found</h3>
              <p>Try adjusting your filters or search terms</p>
              <button className="reset-btn" onClick={clearFilters}>
                <X size={18} />
                Reset Filters
              </button>
            </div>
          ) : (
            <div className={`products-display ${viewMode}`}>
              {filteredProducts.map(product => {
                const isInWishlist = wishlist.includes(product.id);
                const cartItem = cartItems.find(item => item.id === product.id);
                const quantity = cartItem ? cartItem.quantity : 0;

                return (
                  <article key={product.id} className="product-card">
                    <div className="product-badges">
                      {product.discount > 0 && (
                        <span className="badge discount">
                          <Tag size={14} />
                          {product.discount}% OFF
                        </span>
                      )}
                      {product.tags.includes('organic') && (
                        <span className="badge organic">
                          <Leaf size={14} />
                          Organic
                        </span>
                      )}
                    </div>

                    <button
                      className={`wishlist-btn ${isInWishlist ? 'active' : ''}`}
                      onClick={() => toggleWishlist(product.id)}
                      aria-label="Add to wishlist"
                    >
                      <Heart size={20} fill={isInWishlist ? 'currentColor' : 'none'} />
                    </button>

                    <div className="product-image">
                      <img src={product.image} alt={product.name} loading="lazy" />
                    </div>

                    <div className="product-info">
                      <div className="product-category">{product.category.replace('-', ' ')}</div>
                      <h3 className="product-name">{product.name}</h3>
                      <div className="product-brand">{product.brand}</div>
                      
                      <div className="product-rating">
                        <div className="stars">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              fill={i < Math.floor(product.rating) ? '#FFD700' : 'none'}
                              stroke={i < Math.floor(product.rating) ? '#FFD700' : '#ddd'}
                            />
                          ))}
                        </div>
                        <span className="rating-value">{product.rating}</span>
                        <span className="reviews">({product.reviews})</span>
                      </div>

                      <div className="product-price">
                        <span className="current-price">₹{product.price}</span>
                        {product.originalPrice > product.price && (
                          <span className="original-price">₹{product.originalPrice}</span>
                        )}
                        <span className="price-unit">/{product.unit}</span>
                      </div>

                      <div className="product-meta">
                        <div className="meta-item">
                          <Clock size={16} />
                          <span>{product.delivery}</span>
                        </div>
                        <div className="meta-item stock">
                          <Check size={16} />
                          <span>{product.stock} in stock</span>
                        </div>
                      </div>

                      <div className="product-actions">
                        {quantity > 0 ? (
                          <div className="quantity-controls">
                            <button
                              className="qty-btn"
                              onClick={() => handleAddToCart(product)}
                              aria-label="Add more"
                            >
                              <Plus size={18} />
                            </button>
                            <span className="qty-display">{quantity}</span>
                            <button
                              className="qty-btn"
                              onClick={() => navigate('/cart')}
                              aria-label="View cart"
                            >
                              <ShoppingBag size={18} />
                            </button>
                          </div>
                        ) : (
                          <button
                            className="add-to-cart-btn"
                            onClick={() => handleAddToCart(product)}
                          >
                            <ShoppingBag size={18} />
                            Add to Cart
                          </button>
                        )}
                        <button
                          className="buy-now-btn"
                          onClick={() => handleBuyNow(product)}
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {filteredProducts.length > 12 && (
            <div className="pagination">
              <button className="page-btn disabled">
                <ChevronRight size={18} style={{ transform: 'rotate(180deg)' }} />
                Previous
              </button>
              <button className="page-btn active">1</button>
              <button className="page-btn">2</button>
              <button className="page-btn">3</button>
              <span className="page-dots">...</span>
              <button className="page-btn">5</button>
              <button className="page-btn">
                Next
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </main>

        {/* Cart Summary Sidebar */}
        <aside className="cart-summary-sidebar">
          <div className="cart-header">
            <h3>
              <ShoppingBag size={22} />
              Your Cart
            </h3>
            {cartItems.length > 0 && (
              <div className="cart-count-badge">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </div>
            )}
          </div>

          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <ShoppingBag size={56} />
              <p>Your cart is empty</p>
              <span>Add some fresh products!</span>
            </div>
          ) : (
            <>
              <div className="cart-items-list">
                {cartItems.slice(0, 3).map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="cart-item-details">
                      <h4>{item.name}</h4>
                      <div className="cart-item-meta">
                        <span className="cart-item-price">₹{item.price}</span>
                        <span className="cart-item-qty">×{item.quantity}</span>
                      </div>
                    </div>
                    <div className="cart-item-total">₹{item.price * item.quantity}</div>
                  </div>
                ))}
                {cartItems.length > 3 && (
                  <div className="view-all-items" onClick={() => navigate('/cart')}>
                    View all {cartItems.length} items
                    <ChevronRight size={16} />
                  </div>
                )}
              </div>

              <div className="cart-summary">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹{cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery</span>
                  <span className="free">FREE</span>
                </div>
                <div className="summary-row">
                  <span>Tax (5%)</span>
                  <span>₹{(cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 0.05).toFixed(0)}</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>₹{(cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 1.05).toFixed(0)}</span>
                </div>

                <button className="checkout-btn" onClick={() => navigate('/checkout')}>
                  <Shield size={20} />
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </aside>
      </div>
    </div>
  );
};

export default Product;