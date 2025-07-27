import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard, Banknote, CheckCircle } from "lucide-react";

const CheckoutModal = ({ isOpen, onClose, clearCart }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    zip: "",
    paymentMethod: "card",
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const modalRef = useRef(null);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setStep(1);
        clearCart();
      }, 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative bg-white/80 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-xl w-full max-w-md mx-4 border border-white/20 dark:border-gray-700/50"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>

            <div className="p-6">
              {/* Success Message */}
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8"
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Order Placed!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Your order has been successfully placed.
                  </p>
                </motion.div>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    {step === 1 ? "Shipping Address" : "Payment Method"}
                  </h2>

                  <form onSubmit={handleSubmit}>
                    {step === 1 ? (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2.5 bg-white/50 dark:bg-gray-700/50 border border-gray-300/50 dark:border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Address
                          </label>
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2.5 bg-white/50 dark:bg-gray-700/50 border border-gray-300/50 dark:border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              City
                            </label>
                            <input
                              type="text"
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                              required
                              className="w-full px-3 py-2.5 bg-white/50 dark:bg-gray-700/50 border border-gray-300/50 dark:border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              ZIP Code
                            </label>
                            <input
                              type="text"
                              name="zip"
                              value={formData.zip}
                              onChange={handleChange}
                              required
                              className="w-full px-3 py-2.5 bg-white/50 dark:bg-gray-700/50 border border-gray-300/50 dark:border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div
                          className={`flex items-center p-4 rounded-lg cursor-pointer transition-colors ${
                            formData.paymentMethod === "card"
                              ? "bg-blue-100/50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50"
                              : "bg-white/30 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50 hover:bg-gray-100/50 dark:hover:bg-gray-700/70"
                          }`}
                          onClick={() =>
                            setFormData({ ...formData, paymentMethod: "card" })
                          }
                        >
                          <CreditCard className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3" />
                          <span className="text-gray-900 dark:text-white">
                            Credit/Debit Card
                          </span>
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={formData.paymentMethod === "card"}
                            onChange={() => {}}
                            className="ml-auto h-4 w-4 text-blue-600 dark:text-blue-400 focus:ring-blue-500"
                          />
                        </div>
                        <div
                          className={`flex items-center p-4 rounded-lg cursor-pointer transition-colors ${
                            formData.paymentMethod === "cash"
                              ? "bg-blue-100/50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50"
                              : "bg-white/30 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50 hover:bg-gray-100/50 dark:hover:bg-gray-700/70"
                          }`}
                          onClick={() =>
                            setFormData({ ...formData, paymentMethod: "cash" })
                          }
                        >
                          <Banknote className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3" />
                          <span className="text-gray-900 dark:text-white">
                            Cash on Delivery
                          </span>
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={formData.paymentMethod === "cash"}
                            onChange={() => {}}
                            className="ml-auto h-4 w-4 text-blue-600 dark:text-blue-400 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    )}

                    <div className="mt-8 flex justify-between">
                      {step === 2 && (
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="px-4 py-2.5 bg-white/50 dark:bg-gray-700/50 border border-gray-300/50 dark:border-gray-600/50 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-700/70 transition-colors"
                        >
                          Back
                        </button>
                      )}
                      <button
                        type="submit"
                        className={`px-6 py-2.5 rounded-lg text-white ${
                          step === 1
                            ? "bg-blue-600/90 hover:bg-blue-700/90"
                            : "bg-green-600/90 hover:bg-green-700/90"
                        } transition-colors`}
                      >
                        {step === 1 ? "Continue to Payment" : "Place Order"}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CheckoutModal;
