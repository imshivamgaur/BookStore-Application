import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "../context/CartContext";
import CheckoutModal from "../components/CheckOutModal";

function Cart() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalPrice,
    isLoading,
  } = useCart();

  //* Modal
  const [showModal, setShowModal] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br bg-transparent flex items-center justify-center">
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
        className="min-h-screen bg-transparent flex items-center justify-center"
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
          <h2 className="text-3xl font-bold text-gray-700 dark:text-zinc-200 mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-500 dark:text-zinc-400 mb-8 max-w-md">
            Looks like you haven't added any books to your cart yet. Start
            browsing and find your next great read!
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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

  console.log("Cart Items:", cartItems);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-transparent"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-zinc-100 mb-2">
              Shopping Cart
            </h1>
            <p className="text-gray-600 dark:text-zinc-400">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in
              your cart
            </p>
          </div>

          {cartItems.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearCart}
              className="px-4 py-2 text-red-600 hover:text-red-700 border border-red-300 hover:border-red-400 rounded-lg transition-colors dark:text-red-400 dark:hover:text-red-300 dark:border-red-700 dark:hover:border-red-600"
            >
              Clear Cart
            </motion.button>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
          {/* Cart Items - Mobile optimized */}
          <div className="lg:col-span-2 space-y-3 md:space-y-4">
            {cartItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-500/10 rounded-lg md:rounded-xl shadow-md md:shadow-lg p-3 md:p-6 border border-gray-200/50 dark:border-zinc-700/50"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-6">
                  {/* Book Image - Mobile centered */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex-shrink-0 self-center sm:self-auto"
                  >
                    <Link to={`/book/${item.id}`}>
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-16 h-20 md:w-20 md:h-28 object-cover rounded-md md:rounded-lg shadow-sm md:shadow-md"
                      />
                    </Link>
                  </motion.div>

                  {/* Book Details - Stacked on mobile */}
                  <div className="flex-1 min-w-0 text-center sm:text-left">
                    <Link to={`/book/${item.id}`}>
                      <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-zinc-100 mb-1 hover:text-primary-600 dark:hover:text-primary-400 transition-colors line-clamp-1">
                        {item.title}
                      </h3>
                    </Link>
                    <p className="text-sm md:text-base text-gray-600 dark:text-zinc-400 mb-2 line-clamp-1">
                      by {item.author}
                    </p>

                    {/* Price and controls - Flex row on mobile */}
                    <div className="flex flex-wrap items-center justify-between sm:justify-start gap-2">
                      <p className="text-base md:text-lg font-semibold text-accent-600 dark:text-accent-400">
                        ${item.price}
                      </p>

                      {/* Quantity Controls - Compact on mobile */}
                      <div className="flex items-center gap-1 md:gap-3">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="p-1 md:p-2 rounded-full bg-gray-100 dark:bg-zinc-700 text-gray-600 dark:text-zinc-300 hover:bg-gray-200 dark:hover:bg-zinc-600 transition-colors"
                        >
                          <Minus className="w-3 h-3 md:w-4 md:h-4" />
                        </motion.button>

                        <span className="text-base font-semibold text-gray-900 dark:text-zinc-100 min-w-6 md:min-w-8 text-center">
                          {item.quantity}
                        </span>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-1 md:p-2 rounded-full bg-gray-100 dark:bg-zinc-700 text-gray-600 dark:text-zinc-300 hover:bg-gray-200 dark:hover:bg-zinc-600 transition-colors"
                        >
                          <Plus className="w-3 h-3 md:w-4 md:h-4" />
                        </motion.button>
                      </div>

                      {/* Remove Button - Smaller on mobile */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 md:p-2 text-red-500 hover:text-red-600 transition-colors dark:text-red-400 dark:hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Item Total - Smaller text on mobile */}
                <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-200/50 dark:border-zinc-700/50 text-right">
                  <span className="text-base md:text-lg font-semibold text-gray-900 dark:text-zinc-100">
                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary - Sticky on mobile too */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-500/10 sticky top-32 md:top-32 rounded-lg md:rounded-xl shadow-md md:shadow-lg p-4 md:p-6 h-fit border border-gray-200/50 dark:border-zinc-700/50"
          >
            <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-zinc-100 mb-4 md:mb-6">
              Order Summary
            </h2>

            {/* Items Details - Compact on mobile */}
            <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-start text-xs md:text-sm"
                >
                  <div className="flex-1 pr-2">
                    <p className="text-gray-900 dark:text-zinc-100 font-medium line-clamp-1">
                      {item.title}
                    </p>
                    <p className="text-gray-500 dark:text-zinc-500 text-xs">
                      Qty: {item.quantity} × ${item.price}
                    </p>
                  </div>
                  <span className="text-gray-900 dark:text-zinc-100 font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200/50 dark:border-zinc-700/50 pt-3 md:pt-4 mb-3 md:mb-4">
              <div className="space-y-2 md:space-y-3">
                <div className="flex justify-between text-gray-600 dark:text-zinc-400 text-sm md:text-base">
                  <span>Subtotal</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-600 dark:text-zinc-400 text-sm md:text-base">
                  <span>Shipping</span>
                  <span>{getTotalPrice() > 35 ? "Free" : "$4.99"}</span>
                </div>

                <div className="flex justify-between text-gray-600 dark:text-zinc-400 text-sm md:text-base">
                  <span>Tax (8%)</span>
                  <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="border-t border-gray-200/50 dark:border-zinc-700/50 pt-3 md:pt-4">
              <div className="flex justify-between text-lg md:text-xl font-bold text-gray-900 dark:text-zinc-100">
                <span>Total</span>
                <span>
                  $
                  {(
                    getTotalPrice() +
                    (getTotalPrice() > 35 ? 0 : 4.99) +
                    getTotalPrice() * 0.08
                  ).toFixed(2)}
                </span>
              </div>
            </div>

            <motion.button
              onClick={() => setShowModal(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-4 md:mt-6 px-4 py-3 md:px-6 md:py-4 bg-primary-600 text-white rounded-lg md:rounded-xl hover:bg-primary-700 transition-colors font-semibold text-base md:text-lg flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
              Proceed to Checkout
            </motion.button>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-3 md:mt-4"
            >
              <Link
                to="/"
                className="w-full block text-center px-4 py-2 md:px-6 md:py-3 border-2 border-gray-300 dark:border-zinc-600 text-gray-700 dark:text-zinc-300 rounded-lg md:rounded-xl hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium text-sm md:text-base"
              >
                Continue Shopping
              </Link>
            </motion.div>

            {/* Shipping Info */}
            <div className="mt-4 md:mt-6 p-2 md:p-4 bg-green-50 dark:bg-green-900/30 rounded-md md:rounded-lg">
              <p className="text-xs md:text-sm text-green-800 dark:text-green-200">
                {getTotalPrice() > 35 ? (
                  <>✓ You qualify for free shipping!</>
                ) : (
                  <>
                    Add ${(35 - getTotalPrice()).toFixed(2)} more for free
                    shipping
                  </>
                )}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <CheckoutModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        clearCart={clearCart}
      />
    </motion.div>
  );
}

export default Cart;
