import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Eye, BookOpen } from "lucide-react";
import BookCard from "./BookCard";

function BookGrid({ books, isLoading }) {
  const [visibleCount, setVisibleCount] = useState(4);
  const [isExpanding, setIsExpanding] = useState(false);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-200 dark:bg-gray-700 rounded-xl h-96 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  const handleShowMore = () => {
    setIsExpanding(true);
    setVisibleCount((prev) => Math.min(prev + 4, books.length));

    // Reset expanding state after animation
    setTimeout(() => setIsExpanding(false), 500);
  };

  const handleShowLess = () => {
    setVisibleCount(4);
    // Smooth scroll to top of grid
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const visibleBooks = books.slice(0, visibleCount);
  const hasMore = visibleCount < books.length;

  return (
    <div className="space-y-8">
      {/* Books Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        {visibleBooks.map((book, index) => (
          <motion.div
            key={book.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index < 4 ? index * 0.1 : 0,
              duration: 0.5,
            }}
          >
            <BookCard book={book} index={index} />
          </motion.div>
        ))}
      </motion.div>

      {/* Show More/Less Controls */}
      {books.length > 4 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center gap-4"
        >
          {/* Stats */}
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Eye className="w-4 h-4" />
            <span>
              Showing {visibleCount} of {books.length} books
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full max-w-xs bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-blue-800 to-purple-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(visibleCount / books.length) * 100}%` }}
              transition={{ duration: 1 }}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            {hasMore && (
              <motion.button
                onClick={handleShowMore}
                disabled={isExpanding}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 bg-blue-500/20 border border-blue-500 text-blue-700 dark:text-blue-300 font-medium rounded-xl backdrop-blur-md transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isExpanding ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"
                    />
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <span>Show More</span>
                    <motion.div
                      animate={{ y: [0, 2, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </>
                )}
              </motion.button>
            )}

            {visibleCount > 4 && (
              <motion.button
                onClick={handleShowLess}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 bg-blue-500/20 border border-blue-500 text-blue-700 dark:text-blue-300 font-medium rounded-xl backdrop-blur-md transition-all duration-500"
              >
                <span>Show Less</span>
                <motion.div
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ChevronDown className="w-4 h-4 rotate-180" />
                </motion.div>
              </motion.button>
            )}
          </div>

          {/* Additional Info */}
          {!hasMore && books.length > 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-full"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✨
              </motion.div>
              <span>All books loaded!</span>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}

export default BookGrid;
