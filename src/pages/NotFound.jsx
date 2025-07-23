import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, Home, Search } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 flex flex-col items-center justify-center p-6 text-center">
      {/* Floating book elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-gray-300 dark:text-gray-700"
            initial={{
              opacity: 0,
              y: Math.random() * 100 - 50,
              x: Math.random() * 100 - 50,
              rotate: Math.random() * 60 - 30,
            }}
            animate={{
              opacity: [0.3, 0.5, 0.3],
              y: [Math.random() * 100 - 50, Math.random() * 100 - 50],
              transition: {
                duration: 15 + Math.random() * 20,
                repeat: Infinity,
                repeatType: "reverse",
              },
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 2 + 1}rem`,
            }}
          >
            <BookOpen />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-md w-full"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
          {/* Error number with book decoration */}
          <div className="relative inline-block mb-6">
            <div className="absolute -left-6 -top-6 text-yellow-400 dark:text-yellow-500">
              <BookOpen size={48} />
            </div>
            <h1 className="text-8xl font-bold text-gray-800 dark:text-white relative z-10">
              404
            </h1>
            <div className="absolute -right-6 -bottom-6 text-blue-400 dark:text-blue-500">
              <BookOpen size={48} />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
            Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The story you're looking for seems to be missing from our library.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
            >
              <Home className="w-5 h-5" />
              <Link to="/">Back to Home</Link>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all"
            >
              <Search className="w-5 h-5" />
              <Link to="/search">Browse Books</Link>
            </motion.button>
          </div>
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-gray-500 dark:text-gray-400 text-sm"
        >
          Lost in the stacks? Our librarians can help.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default NotFound;
