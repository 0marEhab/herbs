// components/Product/ProductCardSkeleton.js
import React from "react";
import { motion } from "framer-motion";

export default function ProductCardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0.5 }}
      transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
      className="w-64 h-96 bg-gray-200 rounded-lg"
    >
      <div className="w-full h-48 bg-gray-300 rounded-t-lg"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
      </div>
    </motion.div>
  );
}
