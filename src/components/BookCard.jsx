import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import toast from 'react-hot-toast';

function BookCard({ book, index }) {
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }
    
    addToCart(book);
  };

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast.error('Please login to add favorites');
      return;
    }
    
    toggleFavorite(book);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="w-4 h-4 text-yellow-400 fill-current opacity-50" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300 dark:text-gray-600" />
      );
    }

    return stars;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group"
    >
      <Link to={`/book/${book.id}`}>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
          {/* Book Cover */}
          <div className="relative overflow-hidden">
            <motion.img
              src={book.image}
              alt={book.title}
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              whileHover={{ scale: 1.05 }}
            />
            
            {/* Favorite Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleToggleFavorite}
              className="absolute top-3 right-3 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Heart 
                className={`w-5 h-5 ${
                  isAuthenticated && isFavorite(book.id)
                    ? 'text-red-500 fill-current'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              />
            </motion.button>

            {/* Category Badge */}
            <div className="absolute top-3 left-3">
              <span className="px-3 py-1 bg-primary-500 text-white text-xs font-semibold rounded-full">
                {book.category}
              </span>
            </div>

            {/* Quick Add to Cart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileHover={{ opacity: 1, y: 0 }}
              className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleAddToCart}
                className="p-2 bg-accent-500 text-white rounded-full shadow-lg hover:bg-accent-600 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>

          {/* Book Info */}
          <div className="p-5">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {book.title}
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
              by {book.author}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center">
                {renderStars(book.rating)}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                ({book.rating})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-accent-600 dark:text-accent-400">
                ${book.price}
              </span>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
              >
                Add to Cart
              </motion.button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default BookCard;