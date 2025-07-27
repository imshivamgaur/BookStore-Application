import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import SearchBar from "../components/SearchBar";
import BookGrid from "../components/BookGrid";
import { books } from "../utils/sampleData";
import StatsSection from "../components/StatsSection";
import {
  Star,
  Truck,
  RefreshCw,
  BookOpen,
  Search,
  PhoneCall,
} from "lucide-react";
import FloatingBooks from "../components/FloatingBooks";
import FilterControls from "../components/FilterControls";
import { Link } from "react-router-dom";

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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-transparent relative ">
      <div className="container relative mx-auto px-4 sm:px-6 pb-8">
        {/* Background Blur Effect */}
        <motion.div
          className="absolute block bg-[#0001fc] blur-[80px]  md:blur-[100px] opacity-45 h-[5%] md:h-[10%] w-[100%] md:w-[60%] right-0 -rotate-[60deg] md:-rotate-[60deg] -top-20 md:-right-0 rounded-[400%]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.45 }}
          transition={{
            duration: 2,
            ease: "easeInOut",
          }}
        />

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-2 relative min-h-[60vh] md:min-h-[80vh] flex flex-col items-center justify-center"
        >
          <FloatingBooks />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center justify-center mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-900/20 dark:to-indigo-900/20 text-blue-600 dark:text-blue-400 text-sm font-medium border border-blue-100/50 dark:border-blue-800/50 shadow-sm backdrop-blur-sm"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Discover your next adventure
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
          >
            Find Your Next{" "}
            <span className="relative inline-block">
              <span className="relative z-10 font-bold bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text text-transparent">
                Great Read
              </span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Discover our curated collection of fiction and non-fiction books for
            every reader.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm text-gray-600 dark:text-gray-400"
          >
            <motion.div
              whileHover={{ y: -2, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex items-center gap-2 bg-white/80 dark:bg-gray-500/20 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-600/50 transition-all duration-200 cursor-pointer "
            >
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span className="flex items-center gap-1">
                <span className="font-medium text-gray-900 dark:text-white">
                  {books.length}
                </span>{" "}
                Books Available
              </span>
            </motion.div>

            <motion.div
              whileHover={{ y: -2, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex items-center gap-2 bg-white/80 dark:bg-gray-500/20 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-green-200 dark:hover:border-green-600/50 transition-all duration-200 cursor-pointer"
            >
              <Truck className="w-4 h-4 text-green-500" />
              <span>Free Shipping</span>
            </motion.div>

            <motion.div
              whileHover={{ y: -2, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex items-center gap-2 bg-white/80 dark:bg-gray-500/20 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-purple-200 dark:hover:border-purple-600/50 transition-all duration-200 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 text-purple-500" />
              <span>Easy Returns</span>
            </motion.div>

            <motion.div
              whileHover={{ y: -2, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex items-center gap-2 bg-white/80 dark:bg-gray-500/20 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-yellow-200 dark:hover:border-yellow-600/50 transition-all duration-200 cursor-pointer"
            >
              <Star className="w-4 h-4 text-yellow-500" />
              <span>Curated Selection</span>
            </motion.div>
          </motion.div>

          {/* Search and Filters */}
          <div className="mt-12 w-full">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
        </motion.div>

        <FilterControls
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-4 flex justify-center items-center md:p-4"
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
                No books found 🥲
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
