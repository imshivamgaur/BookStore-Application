import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, BookOpen } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signup(
        formData.email,
        formData.password,
        formData.confirmPassword
      );

      if (result.success) {
        toast.success("Account created successfully!");
        navigate("/");
      } else {
        toast.error(result.error || "Signup failed");
      }
    } catch (error) {
      toast.error("Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-[70vh] md:min-h-screen bg-transparent flex items-center justify-center p-4 relative">
      {/* Background elements */}
      <div className="absolute top-0 md:top-1/4 left-1/4 w-64 h-64 bg-blue-600/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 md:bottom-1/4 right-1/4 w-72 h-72 bg-purple-600/40 rounded-full blur-3xl" />

      {/* Main container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mx-auto my-8 sm:my-0"
      >
        <motion.div
          className="bg-transparent backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/10"
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="p-6 sm:p-8 md:p-10">
            {/* Header section */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-center mb-6 sm:mb-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex justify-center mb-3 sm:mb-4"
              >
                <div className="p-3 bg-gray-500/10 rounded-full backdrop-blur-sm">
                  <BookOpen className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600" />
                </div>
              </motion.div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Create Your Account
              </h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                Join us to start your reading journey
              </p>
            </motion.div>

            {/* Form section */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Email field */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 dark:text-white rounded-lg bg-white/30 dark:bg-gray-700/30 border border-gray-300/50 dark:border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Email address"
                  />
                </div>
              </motion.div>

              {/* Password field */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                    className="w-full pl-10 pr-4 py-2 dark:text-white rounded-lg bg-white/30 dark:bg-gray-700/30 border border-gray-300/50 dark:border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Password (min 6 characters)"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    {showPassword ? (
                      <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                    ) : (
                      <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                    )}
                  </button>
                </div>
              </motion.div>

              {/* Confirm Password field */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5 }}
              >
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 dark:text-white rounded-lg bg-white/30 dark:bg-gray-700/30 border border-gray-300/50 dark:border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Confirm Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                    ) : (
                      <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                    )}
                  </button>
                </div>
                {formData.password &&
                  formData.confirmPassword &&
                  formData.password !== formData.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      Passwords do not match
                    </p>
                  )}
              </motion.div>

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={
                  isLoading ||
                  (formData.password &&
                    formData.confirmPassword &&
                    formData.password !== formData.confirmPassword)
                }
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex justify-center py-3 px-4 rounded-lg text-sm sm:text-base font-medium text-white bg-blue-600/80 hover:bg-blue-700/80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-500 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                    Creating account...
                  </div>
                ) : (
                  "Sign Up"
                )}
              </motion.button>
            </form>

            {/* Password requirements */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-4 sm:mt-6 bg-blue-50/30 dark:bg-blue-900/20 rounded-lg p-2 sm:p-3 text-center backdrop-blur-sm text-xs sm:text-sm"
            >
              <div className="text-blue-700 dark:text-blue-300 space-y-1 flex flex-col items-start">
                <p className="font-medium mb-1 text-start">
                  Password Requirements:
                </p>
                <div className="flex items-center justify-start gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      formData.password.length >= 6
                        ? "bg-green-500"
                        : "bg-gray-400"
                    }`}
                  ></span>
                  <span>At least 6 characters</span>
                </div>

                <div className="flex items-center justify-start gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      formData.password &&
                      formData.confirmPassword &&
                      formData.password === formData.confirmPassword
                        ? "bg-green-500"
                        : "bg-gray-400"
                    }`}
                  ></span>
                  <span>Passwords must match</span>
                </div>
              </div>
            </motion.div>

            {/* Login link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-4 sm:mt-6 text-center text-xs sm:text-sm"
            >
              <p className="text-gray-600 dark:text-gray-300">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Back to home link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-4 sm:mt-6 text-center text-xs sm:text-sm"
        >
          <Link
            to="/"
            className="inline-flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors group"
          >
            <motion.span
              whileHover={{ x: -3 }}
              className="mr-1 group-hover:-translate-x-0.5 transition-transform"
            >
              ←
            </motion.span>
            Return to homepage
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Signup;
