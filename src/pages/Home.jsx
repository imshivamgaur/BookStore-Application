import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import BookGrid from '../components/BookGrid';
import { books } from '../utils/sampleData';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('title');
  const [isLoading, setIsLoading] = useState(false);

  const filteredAndSortedBooks = useMemo(() => {
    let filtered = books.filter(book => {
      const matchesSearch = 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === 'All' || book.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    // Sort books
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Discover Your Next 
            <span className="text-primary-600 dark:text-primary-400"> Great Read</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8"
          >
            Explore our curated collection of books across fiction, technology, and biographies. 
            Find your perfect book today.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center gap-8 text-sm text-gray-500 dark:text-gray-400"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
              <span>{books.length} Books Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
              <span>Easy Returns</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Search and Filters */}
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <p className="text-gray-600 dark:text-gray-400">
            Showing {filteredAndSortedBooks.length} of {books.length} books
          </p>
        </motion.div>

        {/* Books Grid */}
        <BookGrid books={filteredAndSortedBooks} isLoading={isLoading} />

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-20 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                {books.length}+
              </div>
              <div className="text-gray-600 dark:text-gray-400">Books</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent-600 dark:text-accent-400 mb-2">
                50K+
              </div>
              <div className="text-gray-600 dark:text-gray-400">Happy Readers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary-600 dark:text-secondary-400 mb-2">
                4.8
              </div>
              <div className="text-gray-600 dark:text-gray-400">Avg Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                24/7
              </div>
              <div className="text-gray-600 dark:text-gray-400">Support</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Home;