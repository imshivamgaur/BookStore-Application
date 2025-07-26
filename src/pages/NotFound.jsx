import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen relative bg-transparent flex flex-col items-center justify-center p-6 text-center">
      {/* Floating book elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
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

      {/* Main Content */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <h1 className="text-6xl font-bold text-gray-800 dark:text-white mb-4">404</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          The page you're looking for isn't here.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
        >
          <Home className="w-5 h-5" />
          Go Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
