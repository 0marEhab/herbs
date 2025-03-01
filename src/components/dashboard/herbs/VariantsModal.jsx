import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/ui/FormInput";
import AddVariant from "./AddVariant";
import VariantsTable from "./VariantsTable";
import axios from "axios";
import summaryApi from "@/common";
import { useCookies } from "react-cookie";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { y: -50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  exit: { y: 50, opacity: 0 },
};

const VariantsModal = ({
  variants: initialVariants = [],
  onClose,
  onEdit,
  onDelete,
  onUpdateVariants,
  productId,
  language,
}) => {
  const [variants, setVariants] = useState(initialVariants);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    productId: productId,
    option: "",
    price: 0,
    stockQuantity: 0,
  });

  const [cookies] = useCookies(["accessToken"]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async () => {
    try {
      const res = await axios.post(`${summaryApi.AddVariant.url}`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.accessToken}`,
        },
      });

      const updatedVariants = [...variants, res.data];
      window.location.reload();
      setVariants(updatedVariants);
      onUpdateVariants(productId, updatedVariants);
      console.log(res.data);
      setShowForm(false);
      setFormData({ option: "", price: 0, stockQuantity: 0 });
    } catch (error) {
      console.error("Error adding variant:", error.response?.data || error);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div
        className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-lg"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">
          {language === "ar" ? "الكميات المتاحة" : "Available Variants"}
        </h2>
        <div className="overflow-x-auto">
          {showForm ? (
            <AddVariant
              onSubmit={handleFormSubmit}
              onCancel={() => setShowForm(false)}
              formData={formData}
              handleChange={handleChange}
            />
          ) : (
            <>
              <Button className="my-2" onClick={() => setShowForm(true)}>
                Add Variant
              </Button>
              <VariantsTable
                variants={variants}
                onEdit={onEdit}
                onDelete={onDelete}
                language={language}
              />
            </>
          )}
        </div>
        <div className="text-center mt-6">
          <motion.button
            onClick={onClose}
            className="px-5 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {language === "ar" ? "إغلاق" : "Close"}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VariantsModal;
