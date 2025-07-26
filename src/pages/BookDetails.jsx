import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Star,
  Heart,
  ShoppingCart,
  BookOpen,
  Calendar,
  Hash,
  Users,
  ChevronRight,
  Truck,
  Shield,
  RotateCw,
  Headphones,
} from "lucide-react";
import { books } from "../utils/sampleData";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import toast from "react-hot-toast";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const book = books.find((b) => b.id === parseInt(id));

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Book not found
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            Back to Home
          </motion.button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to cart");
      navigate("/login");
      return;
    }
    addToCart(book);
    toast.success("Added to cart!");
  };

  const handleToggleFavorite = () => {
    if (!isAuthenticated) {
      toast.error("Please login to add favorites");
      navigate("/login");
      return;
    }
    toggleFavorite(book);
    const action = isFavorite(book.id) ? "removed from" : "added to";
    toast.success(`Book ${action} favorites!`);
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
        <Star
          key="half"
          className="w-5 h-5 text-yellow-400 fill-current opacity-50"
        />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star
          key={`empty-${i}`}
          className="w-5 h-5 text-gray-300 dark:text-gray-600"
        />
      );
    }

    return stars;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-transparent text-gray-900 dark:text-gray-100 py-8"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -5 }}
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Books</span>
        </motion.button>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Book Image - Improved Layout */}
          <div className="flex-1 flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative w-full max-w-md"
            >
              <div className="aspect-[2/3] w-full flex items-center justify-center bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <motion.img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-contain p-4"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md">
                <span className="font-bold">${book.price}</span>
              </div>
            </motion.div>
          </div>

          {/* Book Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex-1 space-y-6"
          >
            {/* Category Badge */}
            <div>
              <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm font-semibold rounded-full">
                {book.category}
              </span>
            </div>

            {/* Title and Author */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {book.title}
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">
                by <span className="font-semibold">{book.author}</span>
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {renderStars(book.rating)}
              </div>
              <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                {book.rating} out of 5 ({book.reviews} reviews)
              </span>
            </div>

            {/* Description */}
            <div className="prose max-w-none dark:prose-invert">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                About this book
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {book.description}
              </p>
            </div>

            {/* Book Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <Hash className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    ISBN
                  </p>
                  <p className="font-medium">{book.isbn}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Published
                  </p>
                  <p className="font-medium">
                    {new Date(book.publishedDate).getFullYear()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <BookOpen className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Pages
                  </p>
                  <p className="font-medium">{book.pages}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <Users className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Status
                  </p>
                  <p className="font-medium">Bestseller</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-md"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleToggleFavorite}
                className={`flex items-center justify-center gap-2 px-6 py-4 rounded-lg border-2 transition-all ${
                  isAuthenticated && isFavorite(book.id)
                    ? "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
                    : "border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-red-500 hover:text-red-600 dark:hover:text-red-400"
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${
                    isAuthenticated && isFavorite(book.id) ? "fill-current" : ""
                  }`}
                />
                <span className="font-semibold">
                  {isAuthenticated && isFavorite(book.id) ? "Saved" : "Save"}
                </span>
              </motion.button>
            </div>

            {/* Benefits Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-transparent rounded-xl p-6 space-y-4 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
                Our Guarantees
              </h4>
              <ul className="space-y-3">
                {[
                  {
                    icon: <Truck className="w-5 h-5 text-blue-500" />,
                    text: "Free shipping on orders over $35",
                  },
                  {
                    icon: <RotateCw className="w-5 h-5 text-green-500" />,
                    text: "30-day return policy",
                  },
                  {
                    icon: <Shield className="w-5 h-5 text-purple-500" />,
                    text: "Secure checkout",
                  },
                  {
                    icon: <Headphones className="w-5 h-5 text-amber-500" />,
                    text: "24/7 customer support",
                  },
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-0.5">{item.icon}</div>
                    <span className="text-gray-700 dark:text-gray-300">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookDetails;
