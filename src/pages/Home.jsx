import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import SearchBar from "../components/SearchBar";
import BookGrid from "../components/BookGrid";
import { books } from "../utils/sampleData";
import StatsSection from "../components/StatsSection";
import { Star, Truck, RefreshCw, BookOpen, Search } from "lucide-react";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("title");
  const [isLoading, setIsLoading] = useState(false);

  const filteredAndSortedBooks = useMemo(() => {
    let filtered = books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || book.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    // Sort books
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title);
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 sm:px-6 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center justify-center mb-6 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Discover your next adventure
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
          >
            Find Your Next{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Great Read</span>
              <span className="absolute bottom-0 left-0 w-full h-3 bg-blue-200 dark:bg-blue-400/80 -rotate-1 -z-0"></span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Explore our handpicked collection of books across all genres. From
            page-turning fiction to mind-expanding non-fiction, we've got
            something for every reader.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm text-gray-600 dark:text-gray-400"
          >
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800/50 px-4 py-2 rounded-full shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="flex items-center gap-1">
                <span className="font-medium text-gray-900 dark:text-white">
                  {books.length}
                </span>{" "}
                Books Available
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800/50 px-4 py-2 rounded-full shadow-sm border border-gray-100 dark:border-gray-700">
              <Truck className="w-4 h-4 text-green-500" />
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800/50 px-4 py-2 rounded-full shadow-sm border border-gray-100 dark:border-gray-700">
              <RefreshCw className="w-4 h-4 text-purple-500" />
              <span>Easy Returns</span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800/50 px-4 py-2 rounded-full shadow-sm border border-gray-100 dark:border-gray-700">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>Curated Selection</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Search and Filters */}
        <div className="mb-8">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-6 flex justify-between items-center"
        >
          <p className="text-gray-600 dark:text-gray-400">
            Showing{" "}
            <span className="font-medium text-gray-900 dark:text-white">
              {filteredAndSortedBooks.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-gray-900 dark:text-white">
              {books.length}
            </span>{" "}
            books
          </p>
          {filteredAndSortedBooks.length > 0 && (
            <div className="text-sm bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full">
              {selectedCategory !== "All" && `${selectedCategory} • `}
              {sortBy === "title" && "Sorted by Title"}
              {sortBy === "price-low" && "Sorted by Price: Low to High"}
              {sortBy === "price-high" && "Sorted by Price: High to Low"}
              {sortBy === "rating" && "Sorted by Rating"}
            </div>
          )}
        </motion.div>

        {/* Books Grid */}
        <BookGrid books={filteredAndSortedBooks} isLoading={isLoading} />

        {/* Empty State */}
        {filteredAndSortedBooks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="mx-auto max-w-md">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                No books found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Try adjusting your search or filter criteria to find what you're
                looking for.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                  setSortBy("title");
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Reset filters
              </button>
            </div>
          </motion.div>
        )}

        {/* Stats Section */}
        <StatsSection />
      </div>
    </div>
  );
}

export default Home;
