import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Star,
  Heart,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Truck,
  RotateCw,
  Shield,
  MapPin,
  Percent,
  Share2,
  Plus,
  Minus,
  BookOpen,
  Calendar,
  Hash,
  Users,
} from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
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

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");

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
    addToCart({ ...book, quantity });
    toast.success("Added to cart!");
  };

  const handleToggleFavorite = () => {
    if (!isAuthenticated) {
      toast.error("Please login to add favorites");
      navigate("/login");
      return;
    }
    toggleFavorite(book);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === book.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? book.images.length - 1 : prev - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentImageIndex(index);
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
        <Star
          key="half"
          className="w-4 h-4 text-yellow-400 fill-current opacity-50"
        />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-transparent text-gray-900 dark:text-gray-100"
    >
      {/* Back Button */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -5 }}
          onClick={() => navigate("/")}
          className="flex gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Books</span>
        </motion.button>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Side - Image Gallery */}
          <div className="lg:w-1/2">
            <div className="sticky top-32">
              {/* Main Image with Swipe Controls */}
              <div className="relative bg-gray-500/10 h-[400px] md:h-[450px] lg:h-[500px] w-auto rounded-xl shadow-lg overflow-hidden border border-gray-200/50 dark:border-gray-700/50">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={book.images[currentImageIndex]}
                    className="flex items-center h-full justify-center p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <img
                      src={book.images[currentImageIndex]}
                      alt={`${book.title} preview ${currentImageIndex + 1}`}
                      className="max-w-full max-h-full object-contain"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                {book.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-700/80 p-2 rounded-full shadow-md hover:bg-white dark:hover:bg-gray-600 transition-colors z-10"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-800 dark:text-gray-200" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-700/80 p-2 rounded-full shadow-md hover:bg-white dark:hover:bg-gray-600 transition-colors z-10"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-800 dark:text-gray-200" />
                    </button>
                  </>
                )}

                {/* Favorite & Share */}
                <div className="absolute top-4 right-4 flex gap-2 z-10">
                  <button
                    onClick={handleToggleFavorite}
                    className={`p-2 rounded-full shadow-md transition-colors ${
                      isAuthenticated && isFavorite(book.id)
                        ? "bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400"
                        : "bg-white/80 dark:bg-gray-700/80 text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isAuthenticated && isFavorite(book.id)
                          ? "fill-current"
                          : ""
                      }`}
                    />
                  </button>
                  <button className="p-2 bg-white/80 dark:bg-gray-700/80 text-gray-600 dark:text-gray-400 rounded-full shadow-md hover:bg-white dark:hover:bg-gray-600 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Thumbnail Gallery */}
              {book.images.length > 1 && (
                <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                  {book.images.map((img, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => goToSlide(index)}
                      className={`flex-shrink-0 w-16 h-20 cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                        currentImageIndex === index
                          ? "border-blue-500"
                          : "border-transparent"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Book Details */}
          <div className="lg:w-1/2 space-y-6">
            {/* Category Badge */}
            <div>
              <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm font-semibold rounded-full">
                {book.category}
              </span>
            </div>

            {/* Title and Author */}
            <div>
              <h1 className="text-3xl sm:text-4xl text-start font-bold text-gray-900 dark:text-white mb-2">
                {book.title}
              </h1>
              <p className="text-lg sm:text-xl text-start text-gray-600 dark:text-gray-400">
                by <span className="font-semibold">{book.author}</span>
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {renderStars(book.rating)}
              </div>
              <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                {book.rating} out of 5 ({book.reviews.toLocaleString()} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                ${book.price}
              </span>
              {book.originalPrice && (
                <span className="text-xl text-gray-500 dark:text-gray-400 line-through">
                  ${book.originalPrice}
                </span>
              )}
              {book.discount && (
                <span className="text-green-600 dark:text-green-400 font-semibold text-lg">
                  {book.discount}% off
                </span>
              )}
            </div>

            {/* Offers */}
            <div className="bg-gray-500/10 rounded-lg p-4 backdrop-blur-sm">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <Percent className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                Available offers
              </h4>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Bank Offer: 10% off on HDFC Bank Credit Cards</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Free delivery on orders above $35</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>No Cost EMI available</span>
                </li>
              </ul>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Quantity
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-200/50 dark:border-gray-700/50 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 border-x border-gray-200/50 dark:border-gray-700/50 min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-900 dark:text-gray-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                  {book.stockCount > 10
                    ? "In Stock"
                    : `Only ${book.stockCount} left`}
                </span>
              </div>
            </div>

            {/* Delivery */}
            <div className="bg-gray-500/10 rounded-lg p-4 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                Delivery
              </h3>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Enter pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full px-4 py-2 bg-transparent border border-gray-500/50 dark:border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                  Check
                </button>
              </div>
              <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span>Free delivery by {book.deliveryTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCw className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>7 days return policy</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span>Secure payment</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
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
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 px-6 py-4 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors font-semibold text-lg shadow-md"
              >
                Buy Now
              </motion.button>
            </div>

            {/* Description */}
            <div className="pt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                About this book
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {book.description}
              </p>
            </div>

            {/* Book Details */}
            <div className="pt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Details
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 p-3 bg-gray-500/10 rounded-lg">
                  <Hash className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      ISBN
                    </p>
                    <p className="font-medium">{book.isbn}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 p-3 bg-gray-500/10 rounded-lg">
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
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 p-3 bg-gray-500/10 rounded-lg">
                  <BookOpen className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Pages
                    </p>
                    <p className="font-medium">{book.pages}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 p-3 bg-gray-500/10 rounded-lg">
                  <Users className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Status
                    </p>
                    <p className="font-medium">Bestseller</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookDetails;