import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';

function Cart() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, getTotalPrice, isLoading } = useCart();

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

  if (cartItems.length === 0) {
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
            🛒
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-700 dark:text-gray-300 mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">
            Looks like you haven't added any books to your cart yet. 
            Start browsing and find your next great read!
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
              Continue Shopping
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
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Shopping Cart
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          
          {cartItems.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearCart}
              className="px-4 py-2 text-red-600 hover:text-red-700 border border-red-300 hover:border-red-400 rounded-lg transition-colors"
            >
              Clear Cart
            </motion.button>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center gap-6">
                  {/* Book Image */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex-shrink-0"
                  >
                    <Link to={`/book/${item.id}`}>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-28 object-cover rounded-lg shadow-md"
                      />
                    </Link>
                  </motion.div>

                  {/* Book Details */}
                  <div className="flex-1 min-w-0">
                    <Link to={`/book/${item.id}`}>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 hover:text-primary-600 dark:hover:text-primary-400 transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                    </Link>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      by {item.author}
                    </p>
                    <p className="text-lg font-semibold text-accent-600 dark:text-accent-400">
                      ${item.price}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </motion.button>
                    
                    <span className="text-lg font-semibold text-gray-900 dark:text-white min-w-8 text-center">
                      {item.quantity}
                    </span>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </motion.button>
                  </div>

                  {/* Remove Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-red-500 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Item Total */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-right">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 h-fit border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Order Summary
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Shipping</span>
                <span>{getTotalPrice() > 35 ? 'Free' : '$4.99'}</span>
              </div>
              
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Tax</span>
                <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span>
                    ${(getTotalPrice() + (getTotalPrice() > 35 ? 0 : 4.99) + (getTotalPrice() * 0.08)).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-6 px-6 py-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-semibold text-lg flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              Proceed to Checkout
            </motion.button>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4"
            >
              <Link
                to="/"
                className="w-full block text-center px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
              >
                Continue Shopping
              </Link>
            </motion.div>

            {/* Shipping Info */}
            <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-sm text-green-800 dark:text-green-200">
                {getTotalPrice() > 35 ? (
                  <>✓ You qualify for free shipping!</>
                ) : (
                  <>Add ${(35 - getTotalPrice()).toFixed(2)} more for free shipping</>
                )}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default Cart;