import React, { act, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Heart,
  User,
  LogOut,
  BookOpen,
  Menu,
  X,
  Home,
} from "lucide-react";
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
  console.log(isActive("/"));

  return (
    <>
      {/* Main Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 w-full"
      >
        <div className="mx-auto max-w-7xl p-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center w-full bg-gray-500/5 shadow-lg backdrop-blur-lg border border-gray-300/50 dark:border-gray-800/50 p-5 rounded-2xl">
            {/* Logo - Takes 1/3 space */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 1 }}
              transition={{ duration: 0.2 }}
              className="flex-1"
            >
              <Link
                to="/"
                className="flex items-center space-x-2 text-black dark:text-[#f9fafc]"
              >
                <BookOpen className="w-7 h-7 md:w-8 md:h-8" />
                <p className="text-xl md:text-2xl font-bold">
                  100<span className="text-red-500">x</span>Books
                </p>
              </Link>
            </motion.div>

            {/* Desktop Navigation - Takes 1/3 space and centers */}
            <nav className="hidden lg:flex flex-1 justify-center">
              <div className="flex space-x-8">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    to="/"
                    className={`font-medium transition-colors text-black dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 ${
                      isActive("/") ? "!text-blue-500" : ""
                    }`}
                  >
                    Home
                  </Link>
                </motion.div>
                {isAuthenticated && (
                  <>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Link
                        to="/favorites"
                        className={`font-medium transition-colors  dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 ${
                          isActive("/favorites") ? "!text-blue-500" : ""
                        }`}
                      >
                        Favorites
                      </Link>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Link
                        to="/cart"
                        className={`font-medium transition-colors  dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 ${
                          isActive("/cart") ? "!text-blue-500" : ""
                        }`}
                      >
                        Cart
                      </Link>
                    </motion.div>
                  </>
                )}
              </div>
            </nav>

            {/* Actions - Takes 1/3 space and aligns right */}
            <div className="flex-1 flex justify-end items-center gap-4">
              <ThemeToggle />

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 text-black dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Desktop Actions */}
              <div className="hidden lg:flex items-center">
                {isAuthenticated ? (
                  <div className="flex items-center gap-2 bg-gray-500/10 rounded-full px-2 py-1">
                    {/* Cart */}
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="relative p-2"
                    >
                      <Link
                        to="/cart"
                        className="text-black dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        {getTotalItems() > 0 && (
                          <motion.span
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                          >
                            {getTotalItems()}
                          </motion.span>
                        )}
                      </Link>
                    </motion.div>

                    {/* User Profile */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full bg-white/20 dark:bg-gray-500/20 shadow-sm"
                    >
                      <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                        <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="text-sm font-medium text-black dark:text-gray-300">
                        {user.name.split(" ")[0]}
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
              transition={{ duration: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Compact Menu Panel */}
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 right-0 bg-gray-500/5 backdrop-blur-lg shadow-lg z-50 lg:hidden rounded-b-xl"
            >
              <div className="p-8">
                {/* Menu Header with Close Button */}
                <div className="flex justify-end">
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-black dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Icon Navigation */}
                <div className="flex justify-around py-4">
                  <Link
                    to="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex flex-col items-center p-2 rounded-lg text-black dark:text-gray-400 ${
                      isActive("/")
                        ? "!text-blue-700"
                        : ""
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
                        className={`flex flex-col items-center p-2 rounded-lg text-black dark:text-gray-400 ${
                          isActive("/favorites")
                            ? "!text-blue-700"
                            : ""
                        }`}
                      >
                        <Heart className="w-6 h-6" />
                        <span className="text-xs mt-1">Favorites</span>
                      </Link>

                      <Link
                        to="/cart"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex relative flex-col items-center p-2 rounded-lg text-black dark:text-gray-400 ${
                          isActive("/cart")
                            ? "!text-blue-700"
                            : ""
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
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {user.name.split(" ")[0]}
                          </p>
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
