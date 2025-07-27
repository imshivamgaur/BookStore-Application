import React from "react";
import { motion } from "framer-motion";
import { books } from "../utils/sampleData";

const statsData = [
  {
    value: `${books.length}+`,
    label: "Books",
    color: "text-primary-600 dark:text-primary-400",
  },
  {
    value: "50K+",
    label: "Happy Readers",
    color: "text-accent-600 dark:text-accent-400",
  },
  {
    value: "4.8",
    label: "Avg Rating",
    color: "text-secondary-600 dark:text-secondary-400",
  },
  {
    value: "24/7",
    label: "Support",
    color: "text-primary-600 dark:text-primary-400",
  },
];

const StatsSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mt-20 bg-gray-500/10 rounded-2xl shadow-lg p-8"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {statsData.map((stat, index) => (
          <div key={index}>
            <div className={`text-3xl font-bold mb-2 ${stat.color}`}>
              {stat.value}
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default StatsSection;
