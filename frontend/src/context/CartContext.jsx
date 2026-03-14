import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [lastAdded, setLastAdded] = useState(null);
  const { user } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Load cart when user changes
  useEffect(() => {
    if (user) {
      const savedCart = localStorage.getItem(`dairy_cart_${user.username}`);
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      } else {
        setCartItems([]);
      }
      setIsLoaded(true);
    } else {
      setCartItems([]);
      setIsLoaded(false);
    }
  }, [user]);

  // 2. Save cart only after it has been loaded and when items change
  useEffect(() => {
    if (user && isLoaded) {
      localStorage.setItem(`dairy_cart_${user.username}`, JSON.stringify(cartItems));
    }
  }, [cartItems, user, isLoaded]);

  const addToCart = (product) => {
    if (!user) {
      alert("Please login first to add items to the cart.");
      window.location.href = '/login';
      return;
    }
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    
    setLastAdded(product.name);
    setTimeout(() => setLastAdded(null), 2000);
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return removeFromCart(productId);
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const cartTotal = cartItems.reduce(
    (total, item) => total + parseFloat(item.price.replace('₹', '')) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        lastAdded
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
