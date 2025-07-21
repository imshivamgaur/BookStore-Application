import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, SortAsc, Command } from "lucide-react";
import { categories, sortOptions } from "../utils/sampleData";

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
    <div className="max-w-4xl mx-auto mb-8">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative group transition-all duration-500 ${
          isFocused ? "transform scale-105" : ""
        }`}
      >
        {/* Background blur border glow */}
        <div className="absolute inset-0 bg-transparent rounded-2xl blur-xl transition-all duration-300 group-hover:blur-lg z-0"></div>

        {/* Actual input container */}
        <div className="relative focus-within:ring-2 ring-blue-500 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-1.5 z-10 transition-all">
          <div className="flex items-center gap-4">
            {/* Input */}
            <div className="flex-1 flex items-center gap-3 px-4 py-3">
              <Search
                className={`w-5 h-5 transition-colors duration-300 ${
                  isFocused ? "text-blue-400" : "text-gray-400"
                }`}
              />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search books by title or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="flex-1 bg-transparent text-white placeholder-gray-400 text-lg focus:outline-none"
              />
            </div>

            {/* Filter + Search Button */}
            <div className="flex items-center gap-2 px-4">
              <div className="hidden px-3 py-2 md:flex items-center gap-1 bg-white/5 rounded-xl text-md text-gray-400">
                <Command className="w-5 h-5" />
                <span>+ K</span>
              </div>

              <div className="w-px h-6 bg-white/20"></div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  showFilters
                    ? "bg-blue-500/20 text-blue-400"
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        <div
          className={`overflow-hidden transition-all duration-500 ${
            showFilters ? "max-h-32 mt-4" : "max-h-0"
          }`}
        >
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex flex-wrap items-center gap-4">
              {/* Category filter */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Category:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-white text-sm focus:outline-none focus:border-blue-400"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="bg-slate-800">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort filter */}
              <div className="flex items-center gap-2">
                <SortAsc className="w-4 h-4 text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-white text-sm focus:outline-none focus:border-blue-400"
                >
                  {sortOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      className="bg-slate-800"
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Book count (example only) */}
              {/* <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm text-gray-400">
                  12 Books Available
                </span>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-xs text-green-400">Free Shipping</span>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default SearchBar;
