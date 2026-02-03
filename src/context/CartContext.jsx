// Empty CartContext - Temporary fix
export const useCart = () => {
  // Load cart from localStorage
  const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
  
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  const addToCart = (product, quantity = 1) => {
    const existingIndex = cartItems.findIndex(item => item.id === product.id);
    
    if (existingIndex > -1) {
      cartItems[existingIndex].quantity += quantity;
    } else {
      cartItems.push({ ...product, quantity });
    }
    
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('cartCount', cartItems.reduce((sum, item) => sum + item.quantity, 0).toString());
    window.dispatchEvent(new Event('storage'));
  };
  
  const updateQuantity = (itemId, newQuantity) => {
    const updatedItems = cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    localStorage.setItem('cartCount', updatedItems.reduce((sum, item) => sum + item.quantity, 0).toString());
    window.dispatchEvent(new Event('storage'));
  };
  
  const removeItem = (itemId) => {
    const updatedItems = cartItems.filter(item => item.id !== itemId);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    localStorage.setItem('cartCount', updatedItems.reduce((sum, item) => sum + item.quantity, 0).toString());
    window.dispatchEvent(new Event('storage'));
  };
  
  const clearCart = () => {
    localStorage.removeItem('cartItems');
    localStorage.setItem('cartCount', '0');
    window.dispatchEvent(new Event('storage'));
  };
  
  return {
    cartItems,
    cartCount,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart
  };
};