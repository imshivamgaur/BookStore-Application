import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Heart, User, LogOut, BookOpen, Menu, X, Home } from "lucide-react";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
    setMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Main Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-gray-50/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50"
      >
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/"
                className="flex items-center space-x-2 text-blue-600 dark:text-blue-400"
              >
                <BookOpen className="w-7 h-7 md:w-8 md:h-8" />
                <span className="text-xl md:text-2xl font-bold">BookStore</span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
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
            <div className="flex items-center gap-3 md:gap-4">
              <ThemeToggle />

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Desktop Actions */}
              <div className="hidden md:flex">
                {isAuthenticated ? (
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
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {user.name.split(' ')[0]}
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
                ) : (
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
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu - Compact Version */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Compact Menu Panel */}
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 right-0 bg-white/50 dark:bg-gray-950/50 backdrop-blur-md shadow-lg z-50 md:hidden rounded-b-xl"
            >
              <div className="p-4">
                {/* Menu Header with Close Button */}
                <div className="flex justify-end">
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Icon Navigation */}
                <div className="flex justify-around py-4">
                  <Link
                    to="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex flex-col items-center p-2 rounded-lg ${
                      isActive("/") 
                        ? "text-blue-600 dark:text-blue-400" 
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <Home className="w-6 h-6" />
                    <span className="text-xs mt-1">Home</span>
                  </Link>

                  {isAuthenticated && (
                    <>
                      <Link
                        to="/favorites"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex flex-col items-center p-2 rounded-lg ${
                          isActive("/favorites") 
                            ? "text-blue-600 dark:text-blue-400" 
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        <Heart className="w-6 h-6" />
                        <span className="text-xs mt-1">Favorites</span>
                      </Link>

                      <Link
                        to="/cart"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex flex-col items-center p-2 rounded-lg relative ${
                          isActive("/cart") 
                            ? "text-blue-600 dark:text-blue-400" 
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        <ShoppingCart className="w-6 h-6" />
                        {getTotalItems() > 0 && (
                          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {getTotalItems()}
                          </span>
                        )}
                        <span className="text-xs mt-1">Cart</span>
                      </Link>
                    </>
                  )}
                </div>

                {/* User Info at Bottom */}
                {isAuthenticated && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                          <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name.split(' ')[0]}</p>
                        </div>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="text-gray-500 dark:text-gray-400 hover:text-red-500 p-1"
                        title="Logout"
                      >
                        <LogOut className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Auth Buttons */}
                {!isAuthenticated && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex gap-3">
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex-1 text-center px-4 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg text-sm"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex-1 text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;