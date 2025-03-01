import React from "react";
import { motion } from "framer-motion";
import { FiEdit, FiTrash } from "react-icons/fi";
import { Percent } from "lucide-react";

export default function CategoryCard({
  title,
  number,
  onEdit,
  onDelete,
  id,
  onPromotions,
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="p-6 bg-white hover:shadow-xl duration-300 shadow-md rounded-2xl w-72 flex flex-col items-center gap-5 border border-gray-200 relative"
    >
      {/* Title Section */}
      <p className="font-semibold text-2xl text-gray-900">{title}</p>

      {/* Number Section */}
      <p className="font-bold text-lg text-gray-600">{number} Product</p>

      {/* Action Buttons */}
      <div className=" flex gap-2">
        <motion.button
          whileHover={{ scale: 1.2 }}
          className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
          onClick={onEdit} // Pass the entire item object
        >
          <FiEdit size={18} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.2 }}
          className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600"
          onClick={onDelete} // Pass the entire item object
        >
          <FiTrash size={18} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.2 }}
          className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600"
          onClick={() => onPromotions(id)} // Pass the entire item object
        >
          <Percent size={18} />
        </motion.button>
      </div>
    </motion.div>
  );
}
