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
      className="bg-gray-50 dark:bg-gray-900/80  backdrop-blur-md  border-gray-200 dark:border-gray-700 sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/"
              className="flex items-center space-x-2 text-blue-600 dark:text-blue-400"
            >
              <BookOpen className="w-8 h-8" />
              <span className="text-2xl font-bold">BookStore</span>
            </Link>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors ${
                isActive("/") ? "text-blue-600 dark:text-blue-400" : ""
              }`}
            >
              Home
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/favorites"
                  className={`text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors ${
                    isActive("/favorites") ? "text-blue-600 dark:text-blue-400" : ""
                  }`}
                >
                  Favorites
                </Link>
                <Link
                  to="/cart"
                  className={`text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors ${
                    isActive("/cart") ? "text-blue-600 dark:text-blue-400" : ""
                  }`}
                >
                  Cart
                </Link>
              </>
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <ThemeToggle />

            {isAuthenticated ? (
              <>
                {/* Unified Action Buttons */}
                <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-1">
                  {/* Cart */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="relative p-2"
                  >
                    <Link
                      to="/cart"
                      className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      {getTotalItems() > 0 && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
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
                    className="p-2"
                  >
                    <Link
                      to="/favorites"
                      className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <Heart className="w-5 h-5" />
                    </Link>
                  </motion.div>

                  {/* User Profile */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full bg-white dark:bg-gray-700 shadow-sm"
                  >
                    <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">
                      {user.name.split(' ')[0]} {/* Show only first name */}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleLogout}
                      className="text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors p-1"
                      title="Logout"
                    >
                      <LogOut className="w-4 h-4" />
                    </motion.button>
                  </motion.div>
                </div>
              </>
            ) : (
              <>
                {/* Auth Buttons */}
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/login"
                      className="px-4 py-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors"
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
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium transition-colors shadow-sm"
                    >
                      Sign Up
                    </Link>
                  </motion.div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
}

export default Header;