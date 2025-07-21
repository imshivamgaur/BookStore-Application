import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, ArrowLeft, Trash2 } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

function Favorites() {
  const { favorites, removeFromFavorites, isLoading } = useFavorites();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const handleAddToCart = (book) => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }
    addToCart(book);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="text-8xl mb-6"
          >
            ❤️
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-700 dark:text-gray-300 mb-4">
            No favorites yet
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">
            Start building your reading wishlist by adding books to your favorites. 
            Click the heart icon on any book to save it here!
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-semibold"
            >
              <ArrowLeft className="w-5 h-5" />
              Discover Books
            </Link>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Your Favorites
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {favorites.length} {favorites.length === 1 ? 'book' : 'books'} in your favorites
          </p>
        </motion.div>

        {/* Favorites Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {favorites.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                {/* Book Cover */}
                <div className="relative overflow-hidden">
                  <Link to={`/book/${book.id}`}>
                    <motion.img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      whileHover={{ scale: 1.05 }}
                    />
                  </Link>
                  
                  {/* Remove from Favorites */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeFromFavorites(book.id)}
                    className="absolute top-3 right-3 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
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
                      onClick={() => handleAddToCart(book)}
                      className="p-2 bg-accent-500 text-white rounded-full shadow-lg hover:bg-accent-600 transition-colors"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </motion.button>
                  </motion.div>
                </div>

                {/* Book Info */}
                <div className="p-5">
                  <Link to={`/book/${book.id}`}>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {book.title}
                    </h3>
                  </Link>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    by {book.author}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 * i }}
                        >
                          <Heart 
                            className={`w-4 h-4 ${
                              i < Math.floor(book.rating) 
                                ? 'text-red-500 fill-current' 
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                          />
                        </motion.div>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      ({book.rating})
                    </span>
                  </div>

                  {/* Price and Actions */}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-accent-600 dark:text-accent-400">
                      ${book.price}
                    </span>
                    
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAddToCart(book)}
                        className="px-3 py-1 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                      >
                        Add to Cart
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Back to Shopping */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              Continue Browsing
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Favorites;