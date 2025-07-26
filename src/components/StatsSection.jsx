import React from "react";
import { motion } from "framer-motion";
import { books } from "../utils/sampleData";

const StatsSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
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
  );
};

export default StatsSection;
