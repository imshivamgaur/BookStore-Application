import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PhoneCall } from "lucide-react";

const FloatingContact = () => {
  return (
    <motion.div
      className="fixed z-50 bottom-20 shadow-sm hover:shadow-md shadow-blue-500 hover:shadow-blue-600 transition-all duration-500 right-10 backdrop-blur-lg bg-blue-500/20 p-4 rounded-full"
      animate={{
        y: [0, -35, 0, -20, 0], // More subtle floating motion
      }}
      transition={{
        duration: 3, // Longer duration for smoother animation
        repeat: Infinity,
        ease: "easeInOut", // Smoother easing
        repeatType: "reverse", // Creates a continuous loop
      }}
      whileHover={{
        scale: 1.05, // Subtle grow on hover
        transition: { duration: 0.2 },
      }}
    >
      <Link to="/contact">
        <PhoneCall className="w-10 h-10 text-blue-600 dark:text-blue-400" />
      </Link>
    </motion.div>
  );
};

export default FloatingContact;
