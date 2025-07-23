import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, Heart, ShoppingCart, Eye } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import toast from "react-hot-toast";

function BookCard({ book, index = 0 }) {
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) return toast.error("Please login to add to cart");
    addToCart(book);
  };

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) return toast.error("Please login to favorite");
    toggleFavorite(book);
  };

  const handleViewDetails = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/book/${book.id}`);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          className="w-4 h-4 text-amber-400 fill-current opacity-50"
        />
      );
    }

    for (let i = 0; i < 5 - Math.ceil(rating); i++) {
      stars.push(
        <Star
          key={`empty-${i}`}
          className="w-4 h-4 text-gray-300 dark:text-gray-600"
        />
      );
    }

    return stars;
  };

  return (
    <div className="relative hover:scale-[103%] w-full max-w-md mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-md dark:shadow-gray-800 hover:shadow-lg transition-all duration-300 overflow-hidden group">
      {/* Book Cover */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full shadow-sm">
            {book.category}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          <button
            onClick={handleToggleFavorite}
            className="p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-md hover:scale-110 transition-all duration-200"
          >
            <Heart
              className={`w-4 h-4 ${
                isAuthenticated && isFavorite(book.id)
                  ? "text-red-500 fill-current"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            />
          </button>
          <button
            onClick={handleViewDetails}
            className="p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-md hover:scale-110 transition-all duration-200"
          >
            <Eye className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Add to Cart Floating */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <button
            onClick={handleAddToCart}
            className="p-2.5 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-700 hover:scale-110 transition-all duration-200"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Book Info */}
      <div className="p-4 flex flex-col text-start">
        <h3 className="font-bold bg text-gray-900 dark:text-white mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200 text-base leading-tight">
          {book.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 font-medium">
          by {book.author}
        </p>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-0.5">
            {renderStars(book.rating)}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            {book.rating.toFixed(1)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-emerald-600">
            ${book.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-95 transition-all duration-200 text-sm font-semibold shadow-sm hover:shadow-md"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
