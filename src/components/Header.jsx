import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, User, LogOut, BookOpen } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import ThemeToggle from "./ThemeToggle";

function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const { getTotalItems } = useCart();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/"
              className="flex items-center space-x-2 text-primary-600 dark:text-primary-400"
            >
              <BookOpen className="w-8 h-8" />
              <span className="text-2xl font-bold">BookStore</span>
            </Link>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors ${
                isActive("/") ? "text-primary-600 dark:text-primary-400" : ""
              }`}
            >
              Home
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/favorites"
                  className={`text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors ${
                    isActive("/favorites")
                      ? "text-primary-600 dark:text-primary-400"
                      : ""
                  }`}
                >
                  Favorites
                </Link>
                <Link
                  to="/cart"
                  className={`text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors ${
                    isActive("/cart")
                      ? "text-primary-600 dark:text-primary-400"
                      : ""
                  }`}
                >
                  Cart
                </Link>
              </>
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3 sm:gap-4 py-2 px-3 rounded-lg">
            <ThemeToggle />

            {isAuthenticated ? (
              <>
                {/* Cart */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative"
                >
                  <Link
                    to="/cart"
                    className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    <ShoppingCart className="w-6 h-6" />
                    {getTotalItems() > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-3 -right-1.5 bg-accent-500/20 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold"
                      >
                        {getTotalItems()}
                      </motion.span>
                    )}
                  </Link>
                </motion.div>

                {/* Favorites */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link
                    to="/favorites"
                    className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    <Heart className="w-6 h-6" />
                  </Link>
                </motion.div>

                {/* User Info */}
                <div className="flex items-center gap-1">
                  <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300 hidden sm:inline truncate max-w-[80px]">
                    {user.name}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleLogout}
                    className="text-gray-600 dark:text-gray-400 hover:text-red-600 transition-colors"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </motion.button>
                </div>
              </>
            ) : (
              <>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/login"
                    className="px-3 py-1 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm transition-colors"
                  >
                    Login
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/signup"
                    className="px-3 py-1 bg-primary-600 text-white rounded-md hover:bg-primary-700 text-sm transition-colors"
                  >
                    Sign Up
                  </Link>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
}

export default Header;
