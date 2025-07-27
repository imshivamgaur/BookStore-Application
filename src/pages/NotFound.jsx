import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, Home, Search, ChevronRight } from "lucide-react";

const NotFound = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-[80vh] md:min-h-screen relative bg-transparent flex flex-col items-center justify-center p-6 text-center overflow-hidden">
      {/* Background spotlight effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-transparent rounded-full blur-3xl opacity-30"></div>

      {/* Floating book elements - more refined */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-gray-300/70 dark:text-gray-600/70"
            initial={{
              opacity: 0,
              y: Math.random() * 100 - 50,
              x: Math.random() * 100 - 50,
              rotate: Math.random() * 60 - 30,
            }}
            animate={{
              opacity: [0, 0.5, 0],
              y: [Math.random() * 100 - 50, Math.random() * 100 - 50],
              x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
              transition: {
                duration: 25 + Math.random() * 20,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 2 + 1.5}rem`,
            }}
          >
            <BookOpen />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="relative z-10 max-w-2xl mx-auto"
      >
        {/* Glass search icon */}
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="mb-8 flex justify-center"
        >
          <div className="p-6 bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-lg">
            <Search className=" w-8 h-8 md:w-16 md:h-16 text-blue-600 dark:text-blue-400" />
          </div>
        </motion.div>

        {/* 404 text with stronger gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-6xl md:text-6xl lg:text-8xl font-bold bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent mb-4"
        >
          404
        </motion.h1>

        {/* Subheading with subtle animation */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white/90 mb-4"
        >
          Oops! Page Not Found
        </motion.h2>

        {/* Description with refined text */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-md md:text-lg text-gray-600/90 dark:text-gray-400/90 mb-8 max-w-lg mx-auto leading-relaxed"
        >
          The page you're looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </motion.p>

        {/* Glass morphism button with arrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-block"
        >
          <Link
            to="/"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg border border-white/30 dark:border-gray-700/30 text-gray-800 dark:text-white/90 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium text-lg hover:bg-white/30 dark:hover:bg-gray-800/30"
          >
            <span className="flex items-center gap-2">
              <Home className="w-5 h-5" />
              Return to Homepage
            </span>
            <ChevronRight className="w-5 h-5 opacity-70 group-hover:translate-x-1 group-hover:opacity-100 transition-transform duration-200" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Footer note with subtle animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-6 text-sm text-gray-500/80 dark:text-gray-500/70"
      >
        <span className="inline-block border-b border-gray-300/50 dark:border-gray-600/50 pb-1">
          Need help? Contact our support team
        </span>
      </motion.div>
    </div>
  );
};

export default NotFound;
