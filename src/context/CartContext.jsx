import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  getCartItems, 
  addToCart as addToCartDB, 
  updateCartItem, 
  removeFromCart as removeFromCartDB, 
  clearCart as clearCartDB 
} from '../utils/indexedDB';
import toast from 'react-hot-toast';

const CartContext = createContext();

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadCart() {
      try {
        const items = await getCartItems();
        setCartItems(items);
      } catch (error) {
        console.error('Error loading cart:', error);
        toast.error('Failed to load cart');
      } finally {
        setIsLoading(false);
      }
    }
    loadCart();
  }, []);

  const addToCart = async (book) => {
    try {
      const updatedItem = await addToCartDB(book);
      const existingIndex = cartItems.findIndex(item => item.id === book.id);
      
      if (existingIndex >= 0) {
        const newItems = [...cartItems];
        newItems[existingIndex] = updatedItem;
        setCartItems(newItems);
      } else {
        setCartItems(prev => [...prev, updatedItem]);
      }
      
      toast.success('Added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart');
    }
  };

  const updateQuantity = async (id, quantity) => {
    try {
      if (quantity <= 0) {
        await removeFromCartDB(id);
        setCartItems(prev => prev.filter(item => item.id !== id));
        toast.success('Item removed from cart');
      } else {
        await updateCartItem(id, quantity);
        setCartItems(prev => 
          prev.map(item => 
            item.id === id ? { ...item, quantity } : item
          )
        );
      }
    } catch (error) {
      console.error('Error updating cart:', error);
      toast.error('Failed to update cart');
    }
  };

  const removeFromCart = async (id) => {
    try {
      await removeFromCartDB(id);
      setCartItems(prev => prev.filter(item => item.id !== id));
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove from cart');
    }
  };

  const clearCart = async () => {
    try {
      await clearCartDB();
      setCartItems([]);
      toast.success('Cart cleared');
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart');
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    cartItems,
    isLoading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalPrice,
    getTotalItems,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}