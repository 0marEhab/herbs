import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col font-body items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-9xl font-bold text-gray-600 dark:text-white"
      >
        404
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-xl text-gray-700  dark:text-gray-300 mt-2"
      >
        Oops! The page you are looking for does not exist.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-6"
      >
        <Link
          to="/"
          className="px-6 py-2 text-white bg-gray-800 hover:bg-gray-900 dark:bg-white dark:hover:bg-white rounded-md shadow-md"
        >
          Go Home
        </Link>
      </motion.div>
    </div>
  );
}
