import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  SortAsc,
  ChevronDown,
  Command,
  Star,
  ChevronRight,
} from "lucide-react";
import { categories, sortOptions, books } from "../utils/sampleData"; // Make sure books is imported
import { Link } from "react-router-dom"; // Add this import

function SearchBar({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
}) {
  const searchInputRef = useRef();
  const [isFocused, setIsFocused] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Add this effect for search suggestions
  useEffect(() => {
    let timeoutId;

    const hideSuggestions = () => {
      setShowSuggestions(false);
    };

    if (searchTerm.length > 0) {
      const matchedBooks = books
        .filter(
          (book) =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 5);

      setSuggestions(matchedBooks);
      setShowSuggestions(true);

      // Clear previous timer
      if (timeoutId) clearTimeout(timeoutId);

      // Set new timer
      timeoutId = setTimeout(hideSuggestions, 3000);
    } else {
      setShowSuggestions(false);
    }

    // Cleanup
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [searchTerm, books]);

  // Add this new effect to handle input focus/blur
  useEffect(() => {
    let timeoutId;

    const handleFocus = () => {
      if (searchTerm.length > 0) {
        setShowSuggestions(true);
        // Start new timeout when input is focused
        timeoutId = setTimeout(() => {
          setShowSuggestions(false);
        }, 3000);
      }
    };

    const handleBlur = () => {
      // Clear timeout when input loses focus
      if (timeoutId) clearTimeout(timeoutId);
    };

    if (searchInputRef.current) {
      searchInputRef.current.addEventListener("focus", handleFocus);
      searchInputRef.current.addEventListener("blur", handleBlur);
    }

    return () => {
      if (searchInputRef.current) {
        searchInputRef.current.removeEventListener("focus", handleFocus);
        searchInputRef.current.removeEventListener("blur", handleBlur);
      }
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [searchTerm]);

  // Your existing keydown effect
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="max-w-3xl mx-auto mb-8">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className={`group transition-all duration-500 ${
          isFocused ? "transform scale-105" : ""
        }`}
      >
        {/* Actual input container */}
        <div className="relative focus-within:ring-2 ring-blue-500 backdrop-blur-xl bg-white/50 dark:bg-zinc-950/50 border border-gray-300 dark:border-white/10 rounded-2xl p-1.5 z-10 transition-all shadow-sm dark:shadow-none">
          <div className="flex relative items-center gap-2 md:gap-4">
            {/* Input */}
            <div className="flex-1 flex items-center gap-3 px-2 md:px-4 py-3 relative">
              <Search
                className={`w-5 h-5 transition-colors duration-500 ${
                  isFocused
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search books by title or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => {
                  setIsFocused(true);
                  if (searchTerm.length > 1) setShowSuggestions(true);
                }}
                onBlur={() => {
                  setTimeout(() => setIsFocused(false), 200);
                }}
                className="w-full bg-transparent  text-gray-800 text-[15px] dark:text-white placeholder-gray-500 dark:placeholder-gray-400 md:text-lg focus:outline-none"
              />
            </div>
            {/* Search Suggestions */}

            {showSuggestions && (
              <motion.div
                initial={{ opacity: 0, y: -5, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white/90 dark:bg-gray-500/10 backdrop-blur-lg rounded-xl shadow-xl z-10 border border-gray-200/30 dark:border-gray-700/30 "
              >
                <ul className="py-2 max-h-60 overflow-y-auto overflow-x-hidden custom-scrollbar">
                  {suggestions.map((book) => (
                    <motion.li
                      key={book.id}
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Link
                        to={`/book/${book.id}`}
                        className="block px-4 py-3  hover:bg-gray-100/60 overflow-x-hidden dark:hover:bg-gray-800/60 transition-all duration-200 group"
                        onClick={() => {
                          setSearchTerm(book.title);
                          setShowSuggestions(false);
                        }}
                      >
                        <div className="flex items-center gap-4">
                          <div className="relative flex-shrink-0">
                            <img
                              src={book.image}
                              alt={book.title}
                              className="w-10 h-14 object-cover rounded-lg shadow-sm group-hover:shadow-md transition-shadow"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-lg" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-start text-sm text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {book.title}
                            </div>
                            <div className="text-xs text-start text-gray-500 dark:text-gray-400 mt-1">
                              by {book.author}
                            </div>
                            <div className="flex items-center mt-1.5">
                              <div className="flex items-center mr-2">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-3 h-3 ${
                                      i < Math.floor(book.rating)
                                        ? "text-yellow-400 fill-current"
                                        : "text-gray-300 dark:text-gray-600"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-gray-400 dark:text-gray-500">
                                {book.rating.toFixed(1)}
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors flex-shrink-0" />
                        </div>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
                {suggestions.length === 0 && (
                  <div className="px-4 py-3 text-center text-sm text-gray-500 dark:text-gray-400">
                    No books found. Try different keywords.
                  </div>
                )}
              </motion.div>
            )}

            {/* Rest of your existing code (Filter + Search Button) */}
            <div className="flex items-center gap-2 px-0 md:px-4">
              <div className="hidden px-3 py-2 md:flex items-center gap-1 bg-gray-100 dark:bg-white/5 rounded-xl text-md text-gray-500 dark:text-gray-400">
                <Command className="w-5 h-5" />
                <span>+ K</span>
              </div>

              <div className="hidden md:block w-px h-6 bg-gray-300 dark:bg-white/20"></div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-3 rounded-xl transition-all duration-500 ${
                  showFilters
                    ? "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-white/5 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white"
                }`}
              >
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Your existing Filters Panel */}
        <motion.div
          initial={false}
          animate={{
            height: showFilters ? "auto" : 0,
            opacity: showFilters ? 1 : 0,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          {/* ... (keep your existing filter panel code) ... */}
          <div className="mt-4">
            <div className="backdrop-blur-xlbg-white/80 dark:bg-transparent rounded-xl border border-gray-300 dark:border-gray-700 p-6 shadow-sm dark:shadow-none">
              {/* Two equal-width columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category Filter Column */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full dark:bg-blue-400"></div>
                    <span className="text-sm font-medium text-gray-600 uppercase tracking-wide dark:text-gray-400">
                      Category
                    </span>
                  </div>
                  <div className="relative">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full custom-select appearance-none bg-white dark:bg-zinc-900/30 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-800 dark:text-white text-sm focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-400/20 transition-all duration-500 hover:border-gray-400 dark:hover:border-gray-600 pr-10"
                    >
                      {categories.map((cat) => (
                        <option
                          key={cat}
                          value={cat}
                          className="bg-white dark:bg-[#101010] text-gray-800 dark:text-white"
                        >
                          {cat}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Sort Filter Column */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-3">
                    <SortAsc className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-medium text-gray-600 uppercase tracking-wide dark:text-gray-400">
                      Sort By
                    </span>
                  </div>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full appearance-none bg-white dark:bg-zinc-900/30 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-800 dark:text-white text-sm focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-400/20 transition-all duration-500 hover:border-gray-400 dark:hover:border-gray-600 pr-10"
                    >
                      {sortOptions.map((option) => (
                        <option
                          key={option.value}
                          value={option.value}
                          className="bg-white dark:bg-[#101010] text-gray-800 dark:text-white"
                        >
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Optional status bar at the bottom */}
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse dark:bg-green-400"></div>
                  <span className="text-xs text-green-600 font-medium dark:text-green-400">
                    Filters Active
                  </span>
                </div>
                <button
                  onClick={() => {
                    setSelectedCategory(categories[0]);
                    setSortBy(sortOptions[0].value);
                  }}
                  className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors duration-500 underline underline-offset-2"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default SearchBar;
