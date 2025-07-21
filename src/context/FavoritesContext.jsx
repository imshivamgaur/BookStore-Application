import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  getFavorites, 
  addToFavorites as addToFavoritesDB, 
  removeFromFavorites as removeFromFavoritesDB,
  isFavorite as isFavoriteDB
} from '../utils/indexedDB';
import toast from 'react-hot-toast';

const FavoritesContext = createContext();

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadFavorites() {
      try {
        const items = await getFavorites();
        setFavorites(items);
      } catch (error) {
        console.error('Error loading favorites:', error);
        toast.error('Failed to load favorites');
      } finally {
        setIsLoading(false);
      }
    }
    loadFavorites();
  }, []);

  const addToFavorites = async (book) => {
    try {
      await addToFavoritesDB(book);
      setFavorites(prev => [...prev, book]);
      toast.success('Added to favorites!');
    } catch (error) {
      console.error('Error adding to favorites:', error);
      toast.error('Failed to add to favorites');
    }
  };

  const removeFromFavorites = async (id) => {
    try {
      await removeFromFavoritesDB(id);
      setFavorites(prev => prev.filter(item => item.id !== id));
      toast.success('Removed from favorites');
    } catch (error) {
      console.error('Error removing from favorites:', error);
      toast.error('Failed to remove from favorites');
    }
  };

  const isFavorite = (id) => {
    return favorites.some(item => item.id === id);
  };

  const toggleFavorite = async (book) => {
    if (isFavorite(book.id)) {
      await removeFromFavorites(book.id);
    } else {
      await addToFavorites(book);
    }
  };

  const value = {
    favorites,
    isLoading,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}