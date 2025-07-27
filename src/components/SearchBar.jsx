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
  BrushCleaning,
} from "lucide-react";
import { categories, sortOptions, books } from "../utils/sampleData"; // Make sure books is imported
import { Link } from "react-router-dom"; // Add this import

function SearchBar({ searchTerm, setSearchTerm }) {
  const searchInputRef = useRef();
  const [isFocused, setIsFocused] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Add this effect for search suggestions
  useEffect(() => {
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
    } else {
      setShowSuggestions(false);
    }
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
    <div className="max-w-3xl mx-auto mb-2 md:mb-6 lg:mb-8">
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
                  window.scrollTo({ top: 400, behavior: "smooth" });
                  if (searchTerm.length > 1) setShowSuggestions(true);
                }}
                onBlur={() => {
                  setIsFocused(false);
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
                className="absolute top-full left-0 right-0 mt-2 bg-[#fafafa] dark:bg-[#0a0a0a] backdrop-blur-lg rounded-xl shadow-xl z-10 border border-gray-200/30 dark:border-gray-700/30 "
              >
                <ul className="py-2 max-h-60 overflow-hidden overflow-y-auto">
                  {suggestions.map((book) => (
                    <motion.li
                      key={book.id}
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Link
                        to={`/book/${book.id}`}
                        className="block px-4 py-3 hover:bg-gray-100/60 overflow-x-hidden dark:hover:bg-gray-800/60 transition-all duration-200 group"
                        onClick={() => {
                          setSearchTerm(book.title);
                          setShowSuggestions(false);
                        }}
                      >
                        <div className="flex items-center gap-4">
                          <div className="relative flex-shrink-0">
                            <img
                              src={book.images[0]}
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
              {isFocused ? (
                ""
              ) : (
                <div className="hidden px-3 py-2 md:flex items-center gap-1 bg-gray-100 dark:bg-white/5 rounded-xl text-md text-gray-500 dark:text-gray-400">
                  <span>Ctrl + K</span>
                </div>
              )}

              <button
                onClick={() => {
                  setShowSuggestions(false);
                  setSearchTerm("");
                }}
                className={`p-3 rounded-xl transition-all duration-500 ${
                  showSuggestions
                    ? "bg-blue-100 block text-blue-600 dark:bg-blue-500/20 dark:text-blue-400"
                    : "bg-gray-100 hidden text-gray-500 hover:bg-gray-200 dark:bg-white/5 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white"
                }`}
              >
                <BrushCleaning className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default SearchBar;
