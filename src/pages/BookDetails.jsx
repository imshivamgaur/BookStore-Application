import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Heart, ShoppingCart, BookOpen, Calendar, Hash, Users } from 'lucide-react';
import { books } from '../utils/sampleData';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import toast from 'react-hot-toast';

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  
  const book = books.find(b => b.id === parseInt(id));

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4">
            Book not found
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Back to Home
          </motion.button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      navigate('/login');
      return;
    }
    addToCart(book);
  };

  const handleToggleFavorite = () => {
    if (!isAuthenticated) {
      toast.error('Please login to add favorites');
      navigate('/login');
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
        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="w-5 h-5 text-yellow-400 fill-current opacity-50" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300 dark:text-gray-600" />
      );
    }

    return stars;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -5 }}
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Books
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Book Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative group">
              <motion.img
                src={book.image}
                alt={book.title}
                className="w-full max-w-md h-auto rounded-xl shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.div>

          {/* Book Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Category Badge */}
            <div>
              <span className="inline-block px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-sm font-semibold rounded-full">
                {book.category}
              </span>
            </div>

            {/* Title and Author */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {book.title}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                by <span className="font-semibold">{book.author}</span>
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {renderStars(book.rating)}
              </div>
              <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                {book.rating} out of 5
              </span>
            </div>

            {/* Price */}
            <div className="text-4xl font-bold text-accent-600 dark:text-accent-400">
              ${book.price}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Description
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {book.description}
              </p>
            </div>

            {/* Book Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <Hash className="w-5 h-5 text-gray-500" />
                <span>ISBN: {book.isbn}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <Calendar className="w-5 h-5 text-gray-500" />
                <span>Published: {new Date(book.publishedDate).getFullYear()}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <BookOpen className="w-5 h-5 text-gray-500" />
                <span>{book.pages} pages</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <Users className="w-5 h-5 text-gray-500" />
                <span>Bestseller</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-semibold text-lg"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleToggleFavorite}
                className={`p-4 rounded-xl border-2 transition-all ${
                  isAuthenticated && isFavorite(book.id)
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                    : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-red-500 hover:text-red-600 dark:hover:text-red-400'
                }`}
              >
                <Heart 
                  className={`w-6 h-6 ${
                    isAuthenticated && isFavorite(book.id) ? 'fill-current' : ''
                  }`}
                />
              </motion.button>
            </div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 space-y-3"
            >
              <h4 className="font-semibold text-gray-900 dark:text-white">
                Why choose us?
              </h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Free shipping on orders over $35
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  30-day return policy
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  24/7 customer support
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default BookDetails;