import React, { useState, Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Product from './pages/Product';

// Lazy load pages
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const OrderSuccessPage = lazy(() => import('./pages/OrderSuccessPage'));

// Loading component
const LoadingSpinner = () => (
  <div className="loading-container">
    <div className="spinner">🛒</div>
    <p>Loading groceries...</p>
  </div>
);

function App() {
  const [cartCount, setCartCount] = useState(() => {
    const saved = localStorage.getItem('cartCount');
    return saved ? parseInt(saved) : 0;
  });

  // Listen for cart count updates
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('cartCount');
      setCartCount(saved ? parseInt(saved) : 0);
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also update on route changes
    const interval = setInterval(() => {
      const saved = localStorage.getItem('cartCount');
      const newCount = saved ? parseInt(saved) : 0;
      if (newCount !== cartCount) {
        setCartCount(newCount);
      }
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [cartCount]);

  return (
    <Router>
      <div className="App">
        <Navbar cartCount={cartCount} />
        
        <main style={{ minHeight: '70vh', padding: '2rem 0' }}>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/cart" element={<CartPage />} />
                <Route path="/products" element={<Product />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-success/:orderId" element={<OrderSuccessPage />} />
            


            </Routes>
          </Suspense>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;