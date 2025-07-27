import { ChevronDown, SortAsc } from "lucide-react";
import { motion } from "framer-motion";
import { categories, sortOptions } from "../utils/sampleData"; // Make sure books is imported

const FilterControls = ({ selectedCategory, setSelectedCategory, sortBy, setSortBy }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mb-6 flex justify-between items-center"
      >
        <div className="backdrop-blur-xl w-full bg-white/50 dark:bg-transparent rounded-xl border border-gray-300 dark:border-gray-500/10 py-6 px-4 md:py-6 shadow-sm dark:shadow-none">
          {/* Two equal-width columns */}
          <div className=" flex items-center justify-between ">
            {/* Category Filter Column */}
            <div className="space-y-3 md:min-w-52 ">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full dark:bg-blue-400"></div>
                <span className="text-sm font-medium text-gray-600 uppercase tracking-wide dark:text-gray-400">
                  Category
                </span>
              </div>
              <div className="relative max-w-72">
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
            <div className="space-y-3 md:min-w-52">
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
          <div className="mt-6 pt-4 border-t border-gray-200/50 dark:border-gray-700/50 flex items-center justify-between">
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
      </motion.div>
    </>
  );
};

export default FilterControls;
