import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  ArrowLeft,
  Trash2,
  Star,
  Eye,
} from "lucide-react";
import { useFavorites } from "../context/FavoritesContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import toast from "react-hot-toast";
import { useEffect } from "react";

function Favorites() {
  const { favorites, removeFromFavorites, isLoading } = useFavorites();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const handleAddToCart = (book, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error("Please login to add items to cart");
      return;
    }
    addToCart(book);
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen container bg-transparent flex items-center justify-center">
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
        className="min-h-[80vh] md:min-h-screen p-2 md:p-4 flex items-center justify-center"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: [0.9, 1.1, 0.9] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
            className="text-8xl mb-6"
          >
            ❤️
          </motion.div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-700 dark:text-gray-300 mb-4">
            No favorites yet
          </h2>
          <p className="text-gray-500 text-sm md:text-md dark:text-gray-400 mb-8 max-w-md">
            Start building your reading wishlist by adding books to your
            favorites. Click the heart icon on any book to save it here!
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 md:px-8 py-2 md:py-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-semibold"
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
      className="min-h-[90vh] container flex items-center  bg-transparent mx-auto"
    >
      <div className="mx-auto flex-1 px-4 py-8">
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
            {favorites.length} {favorites.length === 1 ? "book" : "books"} in
            your favorites
          </p>
        </motion.div>

        {/* Favorites Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative w-full max-w-md mx-auto bg-gray-500/10 rounded-[48px] dark:shadow-blue-800/50 hover:shadow-md transition-all duration-500 hover:scale-[105%] overflow-hidden group"
            >
              {/* Book Cover */}
              <div className="relative  opacity-80 hover:opacity-100 transition-all duration-500">
                <Link to={`/book/${book.id}`}>
                  <img
                    src={book.images[0]}
                    alt={book.title}
                    className="w-full group-hover:scale-[105%] h-60 object-cover transition-all duration-500"
                  />
                </Link>

                {/* Category */}
                <div className="absolute top-5 left-5">
                  <span className="px-2.5 py-1 bg-blue-600/80 hover:bg-blue-700/800 text-white text-xs font-semibold rounded-full shadow-sm">
                    {book.category}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-5 right-6 flex flex-col gap-2  transition-all duration-500 transform translate-x-2 group-hover:translate-x-0">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      removeFromFavorites(book.id);
                    }}
                    className="p-2.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-md hover:scale-110 transition-all duration-500"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                  <Link
                    to={`/book/${book.id}`}
                    className="p-2.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-md hover:scale-110 transition-all duration-500"
                  >
                    <Eye className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  </Link>
                </div>

                {/* Add to Cart Floating */}
                <div className="absolute bottom-5 right-6 flex flex-col gap-2  transition-all duration-500 transform translate-x-2 group-hover:translate-x-0">
                  <button
                    onClick={(e) => handleAddToCart(book, e)}
                    className="p-2.5 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-700 hover:scale-110 transition-all duration-500"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Book Info */}
              <div className="px-6 py-4 flex flex-col text-start">
                <Link to={`/book/${book.id}`}>
                  <h3 className="font-bold bg text-gray-600 group-hover:text-gray-800 dark:text-gray-400 group-hover:dark:text-white mb-1 transition-colors duration-500 text-base leading-tight">
                    {book.title}
                  </h3>
                </Link>
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
                    onClick={(e) => handleAddToCart(book, e)}
                    className="px-4 py-2 bg-blue-600/80 hover:bg-blue-700/80 text-white rounded-full active:scale-95 transition-all duration-500 text-sm font-semibold shadow-sm hover:shadow-md"
                  >
                    Add to Cart
                  </button>
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
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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
