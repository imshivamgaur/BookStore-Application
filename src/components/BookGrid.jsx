import React from 'react';
import { motion } from 'framer-motion';
import BookCard from './BookCard';

function BookGrid({ books, isLoading }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {Array.from({ length: 8 }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-200 dark:bg-gray-700 rounded-xl h-96 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20"
      >
        <div className="text-6xl mb-4">📚</div>
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
          No books found
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Try adjusting your search criteria or browse all books
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
    >
      {books.map((book, index) => (
        <BookCard key={book.id} book={book} index={index} />
      ))}
    </motion.div>
  );
}

export default BookGrid;